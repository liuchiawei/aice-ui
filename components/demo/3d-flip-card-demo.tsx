"use client";

import { FlipCard, useFlipCard } from "@/components/ui-elements/3d-flip-card";
import { RotateCw } from "lucide-react";

function FlipCardDemoContent() {
  const { flip } = useFlipCard();
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 p-6 cursor-pointer w-full h-full"
      onClick={flip}
    >
      <FlipCard.Item translateZ={60}>
        <RotateCw className="size-12 text-muted-foreground mx-auto" />
      </FlipCard.Item>
      <FlipCard.Item translateZ={80}>
        <p className="text-lg font-medium">Click to flip</p>
      </FlipCard.Item>
      <FlipCard.Item translateZ={40}>
        <p className="text-sm text-muted-foreground">3D tilt on hover</p>
      </FlipCard.Item>
    </div>
  );
}

function FlipCardDemoBackContent() {
  const { flip } = useFlipCard();
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 p-6 cursor-pointer w-full h-full"
      onClick={flip}
    >
      <FlipCard.Item translateZ={80}>
        <p className="text-2xl font-bold">Back Side</p>
      </FlipCard.Item>
      <FlipCard.Item translateZ={50}>
        <p className="text-sm text-muted-foreground">Click again to flip back</p>
      </FlipCard.Item>
    </div>
  );
}

function FlipCardDemo() {
  return (
    <div className="flex justify-center items-center min-h-[420px] w-full p-6">
      <FlipCard.Root
        containerClassName="w-full max-w-sm h-[380px] mx-auto rounded-2xl bg-muted/50 p-4"
        flipDirection="horizontal"
      >
        <FlipCard.Front>
          <FlipCard.Container>
            <FlipCard.Body className="bg-card w-full h-full rounded-xl shadow-lg border">
              <FlipCardDemoContent />
            </FlipCard.Body>
          </FlipCard.Container>
        </FlipCard.Front>
        <FlipCard.Back>
          <FlipCard.Container>
            <FlipCard.Body className="bg-primary/10 w-full h-full rounded-xl shadow-lg border border-primary/20">
              <FlipCardDemoBackContent />
            </FlipCard.Body>
          </FlipCard.Container>
        </FlipCard.Back>
      </FlipCard.Root>
    </div>
  );
}

const flipCardDemoSource = `import { FlipCard, useFlipCard } from "@/components/ui-elements/3d-flip-card";

function FrontContent() {
  const { flip } = useFlipCard();
  return (
    <div onClick={flip} className="flex flex-col items-center gap-4 p-6 cursor-pointer h-full">
      <FlipCard.Item translateZ={80}>
        <p className="text-lg font-medium">Click to flip</p>
      </FlipCard.Item>
    </div>
  );
}

function BackContent() {
  const { flip } = useFlipCard();
  return (
    <div onClick={flip} className="flex flex-col items-center gap-2 p-6 cursor-pointer h-full">
      <FlipCard.Item translateZ={80}>
        <p className="text-2xl font-bold">Back Side</p>
      </FlipCard.Item>
    </div>
  );
}

return (
  <FlipCard.Root
    containerClassName="w-full max-w-sm h-[380px] mx-auto rounded-2xl bg-muted/50 p-4"
    flipDirection="horizontal"
  >
    <FlipCard.Front>
      <FlipCard.Container>
        <FlipCard.Body className="bg-card rounded-xl shadow-lg border">
          <FrontContent />
        </FlipCard.Body>
      </FlipCard.Container>
    </FlipCard.Front>
    <FlipCard.Back>
      <FlipCard.Container>
        <FlipCard.Body className="bg-primary/10 rounded-xl shadow-lg border">
          <BackContent />
        </FlipCard.Body>
      </FlipCard.Container>
    </FlipCard.Back>
  </FlipCard.Root>
);`;

export { FlipCardDemo, flipCardDemoSource };
