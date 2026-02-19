"use client";

import { FlipCard, useFlipCard } from "@/components/ui-elements/3d-flip-card";
import { RotateCw } from "lucide-react";

function FlipCardDemoContent() {
  const { flip } = useFlipCard();
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 cursor-pointer w-full h-full bg-[url('https://picsum.photos/300/300')] bg-cover bg-center rounded-lg"
      onClick={flip}
    >
      <FlipCard.Item translateZ={60}>
        <RotateCw className="size-8 mx-auto text-white text-shadow-lg" />
      </FlipCard.Item>
      <FlipCard.Item translateZ={100}>
        <p className="text-3xl font-black text-white text-shadow-lg">
          Click to flip
        </p>
      </FlipCard.Item>
      <FlipCard.Item translateZ={40}>
        <p className="text-xs text-muted/70">3D tilt on hover</p>
      </FlipCard.Item>
    </div>
  );
}

function FlipCardDemoBackContent() {
  const { flip } = useFlipCard();
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 p-6 cursor-pointer w-full h-full "
      onClick={flip}
    >
      <FlipCard.Item translateZ={80}>
        <p className="text-3xl font-black text-background text-shadow-lg">
          Back Side
        </p>
      </FlipCard.Item>
      <FlipCard.Item translateZ={50}>
        <p className="text-xs text-muted/70">Click again to flip back</p>
      </FlipCard.Item>
    </div>
  );
}

function FlipCardDemo() {
  return (
    <div className="flex justify-center items-center min-h-[420px] w-full p-6">
      <FlipCard.Root
        containerClassName="w-full max-w-sm aspect-square mx-auto rounded-2xl bg-muted/50 p-4"
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
            <FlipCard.Body className="bg-foreground w-full h-full rounded-xl shadow-lg border border-primary/20">
              <FlipCardDemoBackContent />
            </FlipCard.Body>
          </FlipCard.Container>
        </FlipCard.Back>
      </FlipCard.Root>
    </div>
  );
}

const flipCardDemoSource = `import { FlipCard, useFlipCard } from "@/components/ui-elements/3d-flip-card";

function FlipCardDemoContent() {
  const { flip } = useFlipCard();
  return (
    <div
      className="flex flex-col items-center justify-center gap-3
      cursor-pointer w-full h-full rounded-lg
      bg-[url('https://picsum.photos/300/300')] bg-cover bg-center"
      onClick={flip}
    >
      <FlipCard.Item translateZ={60}>
        <RotateCw className="size-8 mx-auto text-white text-shadow-lg" />
      </FlipCard.Item>
      <FlipCard.Item translateZ={100}>
        <p className="text-3xl font-black text-white text-shadow-lg">
          Click to flip
        </p>
      </FlipCard.Item>
      <FlipCard.Item translateZ={40}>
        <p className="text-xs text-muted/70">3D tilt on hover</p>
      </FlipCard.Item>
    </div>
  );
}

function FlipCardDemoBackContent() {
  const { flip } = useFlipCard();
  return (
    <div
      className="flex flex-col items-center justify-center gap-2
      p-6 cursor-pointer w-full h-full "
      onClick={flip}
    >
      <FlipCard.Item translateZ={80}>
        <p className="text-3xl font-black text-background text-shadow-lg">
          Back Side
        </p>
      </FlipCard.Item>
      <FlipCard.Item translateZ={50}>
        <p className="text-xs text-muted/70">Click again to flip back</p>
      </FlipCard.Item>
    </div>
  );
}

function FlipCardDemo() {
  return (
    <div className="flex justify-center items-center min-h-[420px] w-full p-6">
      <FlipCard.Root
        containerClassName="w-full max-w-sm aspect-square mx-auto
        rounded-2xl bg-muted/50"
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
            <FlipCard.Body className="bg-foreground w-full h-full
            rounded-xl shadow-lg border border-primary/20">
              <FlipCardDemoBackContent />
            </FlipCard.Body>
          </FlipCard.Container>
        </FlipCard.Back>
      </FlipCard.Root>
    </div>
  );
}`;

export { FlipCardDemo, flipCardDemoSource };
