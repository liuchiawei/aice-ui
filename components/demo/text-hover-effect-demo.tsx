"use client";

import { TextHoverEffect } from "@/components/text/text-hover-effect";

export function TextHoverEffectDemo() {
  return (
    <div className="h-48 w-full flex justify-center items-center">
      <TextHoverEffect text="OPEN-UI" textClassName="text-[6rem]" />
    </div>
  );
}

export const textHoverEffectSource = `import { TextHoverEffect } from "@/components/text/text-hover-effect";

export function TextHoverEffectDemo() {
  return (
    <div className="h-48 w-full mx-auto max-w-2xl">
      <TextHoverEffect text="OPEN-UI" textClassName="text-[6rem]" />
    </div>
  );
}`;
