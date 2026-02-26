"use client";
import Image from "next/image";
import { AsciiArt } from "@/components/media/ascii-art";

// 使用 seed 確保每次請求得到同一張圖；尺寸用正方形讓 AsciiArt 與原圖裁切一致
const DEMO_IMAGE = "https://picsum.photos/seed/ascii-demo/600/600";

export function AsciiArtDemo() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <AsciiArt
        src={DEMO_IMAGE}
        resolution={100}
        color="var(--color-neutral-500)"
        inverted={true}
        animated={true}
        animationStyle="typewriter"
        animationDuration={1.5}
        animateOnView={false}
        className="mx-auto aspect-square w-full"
      />
      <Image
        src={DEMO_IMAGE}
        alt="Demo image"
        width={600}
        height={600}
        className="aspect-square w-full object-cover select-none touch-none pointer-events-none"
      />
    </div>
  );
}

export const asciiArtSource = `import { AsciiArt } from "@/components/media/ascii-art";

export function AsciiArtDemo() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <AsciiArt
        src="https://picsum.photos/seed/ascii-demo/600/600"
        resolution={100}
        color="var(--color-neutral-500)"
        inverted={true}
        animated={true}
        animationStyle="typewriter"
        animationDuration={1.5}
        animateOnView={false}
        className="mx-auto aspect-square w-full"
      />
      <Image
        src="https://picsum.photos/seed/ascii-demo/600/600"
        alt="Demo image"
        width={600}
        height={600}
        className="aspect-square w-full object-cover select-none touch-none pointer-events-none"
      />
    </div>
  );
}`;
