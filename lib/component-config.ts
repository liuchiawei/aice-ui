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
  CopyButtonDemo,
  copyButtonSource,
} from "@/components/demo/copy-button-demo";
import {
  ThemeSwitchDemo,
  themeSwitchSource,
} from "@/components/demo/theme-switch-demo";
import {
  MatrixCodeDemo,
  matrixCodeSource,
} from "@/components/demo/matrix-code-demo";
import {
  RadarChartDemo,
  radarChartSource,
} from "@/components/demo/radar-chart-demo";
import {
  ThreeDCardDemo,
  threeCardDemoSource,
} from "@/components/demo/3d-card-demo";
import {
  FlipCardDemo,
  flipCardDemoSource,
} from "@/components/demo/3d-flip-card-demo";
import {
  MotionWheelDemo,
  motionWheelDemoSource,
} from "@/components/demo/motion-wheel-demo";
import {
  AnimatedCounterDemo,
  animatedCounterSource,
} from "@/components/demo/animated-counter-demo";
import {
  DecryptedTextDemo,
  decryptedTextSource,
} from "@/components/demo/decrypted-text-demo";
/** Translation keys under the "Components" namespace (e.g. "glass-surface.label"). Resolve with useTranslations("Components") then t(key). */
export interface ComponentItem {
  slug: string;
  /** Key for label, e.g. "glass-surface.label" */
  labelKey: string;
  /** Key for description, e.g. "glass-surface.description" */
  descriptionKey?: string;
  demo?: ComponentType;
  sourceCode?: string;
}

export const myComponents: { label: string; items: ComponentItem[] }[] = [
  {
    label: "UI",
    items: [
      {
        slug: "glass-surface",
        labelKey: "glass-surface.label",
        descriptionKey: "glass-surface.description",
        demo: GlassSurfaceDemo,
        sourceCode: glassSurfaceSource,
      },
      {
        slug: "code-block",
        labelKey: "code-block.label",
        descriptionKey: "code-block.description",
        demo: CodeBlockDemo,
        sourceCode: codeBlockSource,
      },
      {
        slug: "theme-switch",
        labelKey: "theme-switch.label",
        descriptionKey: "theme-switch.description",
        demo: ThemeSwitchDemo,
        sourceCode: themeSwitchSource,
      },
    ],
  },
  {
    label: "Text",
    items: [
      {
        slug: "glyph-katakana",
        labelKey: "glyph-katakana.label",
        descriptionKey: "glyph-katakana.description",
        demo: GlyphKatanaDemo,
        sourceCode: glyphKatanaSource,
      },
      {
        slug: "slide-up-letters",
        labelKey: "slide-up-letters.label",
        descriptionKey: "slide-up-letters.description",
        demo: SlideUpLettersDemo,
        sourceCode: slideUpLettersSource,
      },
      {
        slug: "animated-counter",
        labelKey: "animated-counter.label",
        descriptionKey: "animated-counter.description",
        demo: AnimatedCounterDemo,
        sourceCode: animatedCounterSource,
      },
      {
        slug: "decrypted-text",
        labelKey: "decrypted-text.label",
        descriptionKey: "decrypted-text.description",
        demo: DecryptedTextDemo,
        sourceCode: decryptedTextSource,
      },
    ],
  },
  {
    label: "Button",
    items: [
      {
        slug: "copy-button",
        labelKey: "copy-button.label",
        descriptionKey: "copy-button.description",
        demo: CopyButtonDemo,
        sourceCode: copyButtonSource,
      },
      {
        slug: "theme-switch",
        labelKey: "theme-switch.label",
        descriptionKey: "theme-switch.description",
        demo: ThemeSwitchDemo,
        sourceCode: themeSwitchSource,
      },
    ],
  },
  {
    label: "Card",
    items: [
      {
        slug: "3d-card",
        labelKey: "3d-card.label",
        descriptionKey: "3d-card.description",
        demo: ThreeDCardDemo,
        sourceCode: threeCardDemoSource,
      },
      {
        slug: "3d-flip-card",
        labelKey: "3d-flip-card.label",
        descriptionKey: "3d-flip-card.description",
        demo: FlipCardDemo,
        sourceCode: flipCardDemoSource,
      },
      {
        slug: "radar-chart",
        labelKey: "radar-chart.label",
        descriptionKey: "radar-chart.description",
        demo: RadarChartDemo,
        sourceCode: radarChartSource,
      },
    ],
  },
  {
    label: "Carousel",
    items: [
      {
        slug: "motion-wheel",
        labelKey: "motion-wheel.label",
        descriptionKey: "motion-wheel.description",
        demo: MotionWheelDemo,
        sourceCode: motionWheelDemoSource,
      },
    ],
  },
  {
    label: "Background",
    items: [
      {
        slug: "floating-circles",
        labelKey: "floating-circles.label",
        descriptionKey: "floating-circles.description",
        demo: FloatingCirclesDemo,
        sourceCode: floatingCirclesSource,
      },
      {
        slug: "matrix-code",
        labelKey: "matrix-code.label",
        descriptionKey: "matrix-code.description",
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
        labelKey: "webcam.label",
        descriptionKey: "webcam.description",
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
