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
    npm: `npx @doublecheap/aice-ui add ${slug}`,
    pnpm: `pnpm dlx @doublecheap/aice-ui add ${slug}`,
    yarn: `yarn dlx @doublecheap/aice-ui add ${slug}`,
  };
}
