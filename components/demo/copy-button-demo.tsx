import { CopyButton } from "@/components/button/copy-button";

const LOREM_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const LOREM_MEDIUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";
const LOREM_LONG =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

export function CopyButtonDemo() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
        <p className="text-sm text-muted-foreground flex-1 line-clamp-2">
          {LOREM_SHORT}
        </p>
        <CopyButton value={LOREM_SHORT} aria-label="Copy short text" />
      </div>
      <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
        <p className="text-sm text-muted-foreground flex-1 line-clamp-3">
          {LOREM_MEDIUM}
        </p>
        <CopyButton value={LOREM_MEDIUM} aria-label="Copy medium text" />
      </div>
      <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
        <p className="text-sm text-muted-foreground flex-1 line-clamp-4">
          {LOREM_LONG}
        </p>
        <CopyButton value={LOREM_LONG} aria-label="Copy long text" />
      </div>
    </div>
  );
}

export const copyButtonSource = `import { CopyButton } from "@/components/button/copy-button";

const text = "Text to copy to clipboard.";

<CopyButton value={text} />

// With callbacks
<CopyButton
  value={text}
  onCopy={() => toast("Copied!")}
  onError={(err) => toast.error(err.message)}
/>`;
