import { projectConfig } from "@/lib/project-config";

export interface InstallCommands {
  npm: string;
  pnpm: string;
  yarn: string;
}

const PLACEHOLDER_SLUG = "<component>";

export function getOpenUiCliAddCommandsExample(): InstallCommands {
  const slug = PLACEHOLDER_SLUG;
  return {
    npm: `npx @doublecheap/open-ui add ${slug}`,
    pnpm: `pnpm dlx @doublecheap/open-ui add ${slug}`,
    yarn: `yarn dlx @doublecheap/open-ui add ${slug}`,
  };
}

export function getShadcnRegistryAddCommandsExample(): InstallCommands {
  const base = projectConfig.url.replace(/\/$/, "");
  const url = `${base}/r/${PLACEHOLDER_SLUG}.json`;
  return {
    pnpm: `pnpm dlx shadcn add ${url}`,
    npm: `npx shadcn add ${url}`,
    yarn: `yarn dlx shadcn add ${url}`,
  };
}

export function getShadcnInitCommand(): string {
  return "pnpm dlx shadcn@latest init";
}

