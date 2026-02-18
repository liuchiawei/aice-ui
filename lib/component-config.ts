import type { ComponentType } from "react";
import {
  GlassSurfaceDemo,
  glassSurfaceSource,
} from "@/components/demo/glass-surface-demo";
import {
  CodeBlockDemo,
  codeBlockSource,
} from "@/components/demo/code-block-demo";
import {
  FloatingCirclesDemo,
  floatingCirclesSource,
} from "@/components/demo/floating-circle-demo";
import { WebcamDemo, webcamSource } from "@/components/demo/webcam-demo";
import {
  SlideUpLettersDemo,
  slideUpLettersSource,
} from "@/components/demo/slide-up-letters-demo";
import {
  GlyphKatanaDemo,
  glyphKatanaSource,
} from "@/components/demo/glyph-katana-demo";
import {
  ThemeSwitchDemo,
  themeSwitchSource,
} from "@/components/demo/theme-switch-demo";
import {
  MatrixCodeDemo,
  matrixCodeSource,
} from "@/components/demo/matrix-code-demo";

export interface ComponentItem {
  slug: string;
  label: string;
  demo?: ComponentType;
  sourceCode?: string;
}

export const myComponents: { label: string; items: ComponentItem[] }[] = [
  {
    label: "UI",
    items: [
      {
        slug: "glass-surface",
        label: "Glass Surface",
        demo: GlassSurfaceDemo,
        sourceCode: glassSurfaceSource,
      },
      {
        slug: "code-block",
        label: "Code Block",
        demo: CodeBlockDemo,
        sourceCode: codeBlockSource,
      },
      { slug: "radar-chart", label: "Radar Chart" },
      {
        slug: "theme-switch",
        label: "Theme Switch",
        demo: ThemeSwitchDemo,
        sourceCode: themeSwitchSource,
      },
    ],
  },
  {
    label: "Blocks",
    items: [
      { slug: "motion-wheel", label: "Motion Wheel" },
      { slug: "3d-flip-card", label: "3D Flip Card" },
    ],
  },
  {
    label: "Text",
    items: [
      {
        slug: "glyph-katakana",
        label: "Glyph Katakana",
        demo: GlyphKatanaDemo,
        sourceCode: glyphKatanaSource,
      },
      {
        slug: "slide-up-letters",
        label: "Slide Up Letters",
        demo: SlideUpLettersDemo,
        sourceCode: slideUpLettersSource,
      },
    ],
  },
  {
    label: "Background",
    items: [
      {
        slug: "floating-circles",
        label: "Floating Circles",
        demo: FloatingCirclesDemo,
        sourceCode: floatingCirclesSource,
      },
      {
        slug: "matrix-code",
        label: "Matrix Code",
        demo: MatrixCodeDemo,
        sourceCode: matrixCodeSource,
      },
    ],
  },
  {
    label: "Media",
    items: [
      {
        slug: "webcam",
        label: "Webcam",
        demo: WebcamDemo,
        sourceCode: webcamSource,
      },
    ],
  },
];

export type ItemBySlugResult =
  | {
      kind: "demo";
      item: ComponentItem;
      Demo: ComponentType;
      sourceCode: string;
      language: "tsx" | "ts";
    }
  | { kind: "coming-soon"; item: ComponentItem };

export function getItemBySlug(slug: string): ItemBySlugResult | undefined {
  for (const group of myComponents) {
    const item = group.items.find((i) => i.slug === slug);
    if (!item) continue;
    if (item.demo != null && item.sourceCode != null)
      return {
        kind: "demo",
        item,
        Demo: item.demo,
        sourceCode: item.sourceCode,
        language: "tsx",
      };
    return { kind: "coming-soon", item };
  }
  return undefined;
}

export const demoSlugs = myComponents.flatMap((group) =>
  group.items
    .filter((item) => item.demo != null && item.sourceCode != null)
    .map((item) => item.slug),
);
