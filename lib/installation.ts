import { projectConfig } from "@/lib/project-config";

export interface InstallCommands {
  npm: string;
  pnpm: string;
  yarn: string;
}

/**
 * Get CLI install commands for a component slug.
 * Uses shadcn-style commands; override per slug if needed.
 */
export function getInstallCommands(slug: string): InstallCommands {
  return {
    npm: `npx @doublecheap/open-ui add ${slug}`,
    pnpm: `pnpm dlx @doublecheap/open-ui add ${slug}`,
    yarn: `yarn dlx @doublecheap/open-ui add ${slug}`,
  };
}

/**
 * Get shadcn CLI command to add component by registry URL.
 * Use in projects that already have shadcn configured.
 */
export function getShadcnCliCommand(slug: string): string {
  const base = projectConfig.url.replace(/\/$/, "");
  return `npx shadcn add ${base}/r/${slug}.json`;
}

/**
 * Get shadcn CLI install commands per package manager (pnpm/npm/yarn).
 */
export function getShadcnCliCommands(slug: string): InstallCommands {
  const base = projectConfig.url.replace(/\/$/, "");
  const url = `${base}/r/${slug}.json`;
  return {
    pnpm: `pnpm dlx shadcn add ${url}`,
    npm: `npx shadcn add ${url}`,
    yarn: `yarn dlx shadcn add ${url}`,
  };
}
