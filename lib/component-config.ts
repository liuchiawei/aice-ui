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
  ScrollButtonDemo,
  scrollButtonSource,
} from "@/components/demo/scroll-button-demo";
import {
  ThemeSwitchDemo,
  themeSwitchSource,
} from "@/components/demo/theme-switch-demo";
import {
  TimerDemo,
  timerSource,
} from "@/components/demo/timer-demo";
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
  date?: string;
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
        date: "2026-02-19",
      },
      {
        slug: "code-block",
        labelKey: "code-block.label",
        descriptionKey: "code-block.description",
        demo: CodeBlockDemo,
        sourceCode: codeBlockSource,
        date: "2026-02-19",
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
        date: "2026-02-19",
      },
      {
        slug: "decrypted-text",
        labelKey: "decrypted-text.label",
        descriptionKey: "decrypted-text.description",
        demo: DecryptedTextDemo,
        sourceCode: decryptedTextSource,
        date: "2026-02-19",
      },
      {
        slug: "slide-up-letters",
        labelKey: "slide-up-letters.label",
        descriptionKey: "slide-up-letters.description",
        demo: SlideUpLettersDemo,
        sourceCode: slideUpLettersSource,
        date: "2026-02-19",
      },
      {
        slug: "animated-counter",
        labelKey: "animated-counter.label",
        descriptionKey: "animated-counter.description",
        demo: AnimatedCounterDemo,
        sourceCode: animatedCounterSource,
        date: "2026-02-19",
      },
      {
        slug: "timer",
        labelKey: "timer.label",
        descriptionKey: "timer.description",
        demo: TimerDemo,
        sourceCode: timerSource,
        date: "2026-02-19",
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
        date: "2026-02-19",
      },
      {
        slug: "theme-switch",
        labelKey: "theme-switch.label",
        descriptionKey: "theme-switch.description",
        demo: ThemeSwitchDemo,
        sourceCode: themeSwitchSource,
        date: "2026-02-19",
      },
      {
        slug: "scroll-button",
        labelKey: "scroll-button.label",
        descriptionKey: "scroll-button.description",
        demo: ScrollButtonDemo,
        sourceCode: scrollButtonSource,
        date: "2026-02-20",
      }
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
        date: "2026-02-19",
      },
      {
        slug: "3d-flip-card",
        labelKey: "3d-flip-card.label",
        descriptionKey: "3d-flip-card.description",
        demo: FlipCardDemo,
        sourceCode: flipCardDemoSource,
        date: "2026-02-19",
      },
    ],
  },
  {
    label: "Chart",
    items: [
      {
        slug: "radar-chart",
        labelKey: "radar-chart.label",
        descriptionKey: "radar-chart.description",
        demo: RadarChartDemo,
        sourceCode: radarChartSource,
        date: "2026-02-19",
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
        date: "2026-02-19",
      },
    ],
  },
  {
    label: "Layout",
    items: [],
  },
  {
    label: "Navigation",
    items: [],
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
        date: "2026-02-19",
      },
      {
        slug: "matrix-code",
        labelKey: "matrix-code.label",
        descriptionKey: "matrix-code.description",
        demo: MatrixCodeDemo,
        sourceCode: matrixCodeSource,
        date: "2026-02-19",
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
        date: "2026-02-19",
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
      date: string;
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
        date: item.date ?? "",
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

/** Returns true if date is within the last 7 days (inclusive), by local date. */
export function isNewComponent(date: string | undefined): boolean {
  if (!date) return false;
  const itemTime = new Date(date).setHours(0, 0, 0, 0);
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - 7);
  const cutoffTime = cutoff.setHours(0, 0, 0, 0);
  return itemTime >= cutoffTime;
}
