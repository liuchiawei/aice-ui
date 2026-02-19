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
    npm: `npx shadcn@latest add https://aice-ui.vercel.app/r/${slug}.json`,
    pnpm: `pnpm dlx shadcn@latest add https://aice-ui.vercel.app/r/${slug}.json`,
    yarn: `yarn dlx shadcn@latest add https://aice-ui.vercel.app/r/${slug}.json`,
  };
}
