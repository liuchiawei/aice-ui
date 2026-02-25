#!/usr/bin/env node

import { execSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
} from "node:fs";
import { get } from "node:https";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { projectConfig } from "../../lib/project-config";

const REGISTRY_BASE_URL = projectConfig.url.replace(/\/$/, "");
const CLI_NAME = projectConfig.cli;

declare let __dirname: string;

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (args.includes("--help") || args.includes("-h")) {
    showHelp();
    process.exit(0);
  }

  if (args.includes("--version") || args.includes("-v")) {
    showVersion();
    process.exit(0);
  }

  if (command === "list" || command === "ls") {
    await listComponents();
    process.exit(0);
  }

  if (command === "add") {
    if (args.length < 2) {
      console.log(`Usage: npx ${CLI_NAME} add <component> [components...]`);
      process.exit(1);
    }
    const names = args.slice(1).filter((n) => n.trim());
    for (const name of names) {
      console.log(`Adding ${name}...`);
      await addComponentWithDependencies(name);
    }
    process.exit(0);
  }

  console.log(`Usage: npx ${CLI_NAME} <command> [options]`);
  console.log("");
  console.log("Commands:");
  console.log(`  add <name> [names...]  Add components from ${projectConfig.name} registry`);
  console.log("  list, ls                List available components");
  console.log("");
  console.log("Options:");
  console.log("  --help, -h              Show help");
  console.log("  --version, -v            Show version");
  process.exit(1);
}

async function addComponentWithDependencies(componentName: string) {
  try {
    const url = `${REGISTRY_BASE_URL}/r/${componentName}.json`;
    const componentData = await fetchJson(url) as {
      files?: Array<{ content?: string }>;
      registryDependencies?: string[];
    };

    const deps = extractDependencies(componentData);
    if (deps.length > 0) {
      await installMissingDependencies(deps);
    }

    execSync(`npx shadcn@latest add ${url}`, { stdio: "inherit" });

    const registryDeps = componentData.registryDependencies ?? [];
    await installMissingShadcnComponents(registryDeps);
  } catch (err) {
    console.error(
      `Failed to add ${componentName}:`,
      err instanceof Error ? err.message : String(err),
    );
    process.exit(1);
  }
}

function extractDependencies(componentData: {
  files?: Array<{ content?: string }>;
}): string[] {
  const deps = new Set<string>();
  if (!componentData.files || !Array.isArray(componentData.files)) {
    return [];
  }
  const importRegex =
    /import\s+(?:{[^}]*}|[^\s,]+|\*\s+as\s+\w+)\s+from\s+['"]([^'"]+)['"]/g;
  for (const file of componentData.files) {
    if (!file.content) continue;
    let m: RegExpExecArray | null;
    while ((m = importRegex.exec(file.content)) !== null) {
      const path = m[1];
      if (path.startsWith(".") || path.startsWith("node:")) continue;
      const pkg =
        path.startsWith("@") ?
          path.split("/").slice(0, 2).join("/")
        : path.split("/")[0];
      if (
        ["react", "react-dom", "next"].includes(pkg) ||
        pkg.startsWith("@/")
      ) {
        continue;
      }
      deps.add(pkg);
    }
  }
  return Array.from(deps);
}

async function installMissingDependencies(dependencies: string[]) {
  const cwd = process.cwd();
  const pkgPath = join(cwd, "package.json");
  if (!existsSync(pkgPath)) {
    console.log("⚠️  No package.json in current directory. Skipping dependency install.");
    return;
  }
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  const installed = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
  };
  const missing = dependencies.filter((d) => !installed[d]);
  if (missing.length === 0) return;

  console.log(`📦 Installing: ${missing.join(", ")}`);
  const pm = detectPackageManager();
  const cmd =
    pm === "npm" ?
      `npm install ${missing.join(" ")}`
    : pm === "pnpm" ?
      `pnpm add ${missing.join(" ")}`
    : `yarn add ${missing.join(" ")}`;
  try {
    execSync(cmd, { stdio: "inherit", cwd });
    console.log("✅ Dependencies installed.");
  } catch (e) {
    console.error("❌ Install failed. Install manually:", missing.join(", "));
  }
}

async function installMissingShadcnComponents(names: string[]) {
  if (names.length === 0) return;
  const uiDir = join(process.cwd(), "components", "ui");
  const missing: string[] = [];
  for (const name of names) {
    const tsx = join(uiDir, `${name}.tsx`);
    const ts = join(uiDir, `${name}.ts`);
    if (!existsSync(tsx) && !existsSync(ts)) {
      missing.push(name);
    }
  }
  if (missing.length === 0) return;

  console.log(`🧩 Installing shadcn/ui components: ${missing.join(", ")}`);
  for (const name of missing) {
    try {
      execSync(`npx shadcn@latest add ${name}`, { stdio: "pipe", cwd: process.cwd() });
      console.log(`  ✅ ${name}`);
    } catch {
      console.warn(`  ⚠️  Could not add ${name}. Run: npx shadcn@latest add ${name}`);
    }
  }
}

function detectPackageManager(): "pnpm" | "yarn" | "npm" {
  const cwd = process.cwd();
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

function showHelp() {
  console.log(`${projectConfig.name} CLI – Add components from the registry`);
  console.log("");
  console.log(`Usage: npx ${CLI_NAME} <command> [options]`);
  console.log("");
  console.log("Commands:");
  console.log(`  add <name> [names...]  Add components to your project`);
  console.log("  list, ls               List available components");
  console.log("");
  console.log("Options:");
  console.log("  --help, -h             Show help");
  console.log("  --version, -v          Show version");
  console.log("");
  console.log("Examples:");
  console.log(`  npx ${CLI_NAME} add copy-button`);
  console.log(`  npx ${CLI_NAME} add copy-button theme-switch glass-surface`);
  console.log(`  npx ${CLI_NAME} list`);
}

function showVersion() {
  try {
    const dirname =
      typeof __dirname !== "undefined"
        ? __dirname
        : fileURLToPath(new URL(".", import.meta.url));
    const pkgPath = join(dirname, "..", "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    console.log(pkg.version ?? "0.0.0");
  } catch {
    console.log("0.1.0");
  }
}

async function listComponents() {
  try {
    console.log("Fetching components...");
    const registryUrl = `${REGISTRY_BASE_URL}/r/registry.json`;
    const registry = await fetchJson(registryUrl) as {
      items?: Array<{ name: string; title?: string; description?: string }>;
    };

    if (!registry.items || !Array.isArray(registry.items)) {
      throw new Error("Invalid registry format");
    }

    const items = registry.items;
    const maxName = Math.max(4, ...items.map((i) => (i.name ?? "").length));

    console.log("");
    console.log("Available components:");
    console.log("");
    for (const item of items) {
      const name = (item.name ?? "").padEnd(maxName);
      const desc = item.description ?? item.title ?? "—";
      console.log(`  ${name}  ${desc}`);
    }
    console.log("");
    console.log(`Total: ${items.length} components`);
    console.log("");
    console.log(`Usage: npx ${CLI_NAME} add <component-name>`);
  } catch (err) {
    console.error("Error fetching components:", err instanceof Error ? err.message : err);
    console.log("");
    console.log("Check your network or visit", REGISTRY_BASE_URL);
    process.exit(1);
  }
}

function fetchJson(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${url}`));
        return;
      }
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error("Invalid JSON response"));
        }
      });
    }).on("error", reject);
  });
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
