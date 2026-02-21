import { ScrollButton } from "@/components/button/scroll-button";

export function ScrollButtonDemo() {
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center min-h-32">
      <ScrollButton.Up tooltip="Up" />
      <ScrollButton.Down tooltip="Down" />
      <ScrollButton.Top tooltip="Top" />
      <ScrollButton.Bottom tooltip="Bottom" />
    </div>
  );
}

export const scrollButtonSource = `import { ScrollButton } from "@/components/button/scroll-button";

export function ScrollButtonDemo() {
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center min-h-32">
      <ScrollButton.Up tooltip="Up" />
      <ScrollButton.Down tooltip="Down" />
      <ScrollButton.Top tooltip="Top" />
      <ScrollButton.Bottom tooltip="Bottom" />
    </div>
  );
}`;
