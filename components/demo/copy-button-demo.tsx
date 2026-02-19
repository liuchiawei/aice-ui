import { CopyButton } from "@/components/button/copy-button";

const LOREM_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

export function CopyButtonDemo() {
  return (
    <div className="w flex flex-col gap-1">
      <p className="flex-1 text-sm text-muted-foreground text-justify">
        {LOREM_TEXT}
      </p>
      <CopyButton value={LOREM_TEXT} aria-label="Copy text" className="cursor-pointer" />
    </div>
  );
}

export const copyButtonSource = `import { CopyButton } from "@/components/button/copy-button";

const text = "Lorem text.";

return (
  <div>
    <p>{text}</p>
    <CopyButton value={text} tooltip="Copy to clipboard" />
  </div>
);`;
