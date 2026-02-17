import { FloatingCircles } from "@/components/background/floating-circles";

export function FloatingCirclesDemo() {
  return (
    <div className="relative h-108 w-full overflow-hidden rounded-lg border border-border">
      <FloatingCircles
        className="absolute inset-0"
        size="20%"
        interactive={true}
      />
      <div className="relative flex h-full items-center justify-center z-10">
        <span className="text-sm font-medium text-foreground/90">
          Gradient background
        </span>
      </div>
    </div>
  );
}

export const floatingCirclesSource = `<div className="relative h-108 overflow-hidden rounded-lg border">
  <FloatingCircles
    className="absolute inset-0"
    size="60%"
    interactive={true}
  />
  <div className="relative flex h-full items-center justify-center">
    <span className="text-sm text-foreground/90">Gradient background</span>
  </div>
</div>`;
