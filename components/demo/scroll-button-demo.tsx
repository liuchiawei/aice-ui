import { ScrollButton } from "@/components/button/scroll-button";

export function ScrollButtonDemo() {
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center min-h-32">
      <ScrollButton.Top />
      <ScrollButton.Bottom />
      <ScrollButton.Up />
      <ScrollButton.Down />
    </div>
  );
}

export const scrollButtonSource = `import { ScrollButton } from "@/components/button/scroll-button";

<ScrollButton.Top tooltip="Scroll to top" />
<ScrollButton.Down tooltip="Scroll down" />`;
