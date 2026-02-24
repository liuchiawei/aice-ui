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
  SnippetDemo,
  snippetSource,
} from "@/components/demo/snippet-demo";
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
  PopUpItemDemo,
  popUpItemSource,
} from "@/components/demo/pop-up-item-demo";
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
  PerlinNoiseDemo,
  perlinNoiseSource,
} from "@/components/demo/perlin-noise-demo";
import {
  StarBackgroundDemo,
  starBackgroundSource,
} from "@/components/demo/star-background-demo";
import {
  RadarChartDemo,
  radarChartSource,
} from "@/components/demo/radar-chart-demo";
import {
  RadialClusterDemo,
  radialClusterSource,
} from "@/components/demo/radial-cluster-demo";
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
import {
  DraggableGridDemo,
  draggableGridSource,
} from "@/components/demo/draggable-grid-demo";
import {
  TimelineDemo,
  timelineSource,
} from "@/components/demo/timeline-demo";
import {
  SpeedDialDemo,
  speedDialSource,
} from "@/components/demo/speed-dial-demo";
import {
  FloatingDockDemo,
  floatingDockSource,
} from "@/components/demo/floating-dock-demo";
/** One row for the Usage section props table (Prop, Type, Default, Description). */
export interface UsagePropRow {
  name: string;
  type: string;
  default?: string;
  /** Shown when descriptionKey is not set. */
  description?: string;
  /** When set, description is resolved via useTranslations("Components")(descriptionKey). */
  descriptionKey?: string;
}

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
  /** Optional props table for the Usage section (per-component API docs). */
  usageProps?: UsagePropRow[];
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
        usageProps: [
          { name: "children", type: "ReactNode", descriptionKey: "glass-surface.props.children" },
          { name: "width", type: "number | string", default: "200", descriptionKey: "glass-surface.props.width" },
          { name: "height", type: "number | string", default: "80", descriptionKey: "glass-surface.props.height" },
          { name: "borderRadius", type: "number", default: "20", descriptionKey: "glass-surface.props.borderRadius" },
          { name: "borderWidth", type: "number", default: "0.07", descriptionKey: "glass-surface.props.borderWidth" },
          { name: "brightness", type: "number", default: "50", descriptionKey: "glass-surface.props.brightness" },
          { name: "opacity", type: "number", default: "0.93", descriptionKey: "glass-surface.props.opacity" },
          { name: "blur", type: "number", default: "11", descriptionKey: "glass-surface.props.blur" },
          { name: "displace", type: "number", default: "0", descriptionKey: "glass-surface.props.displace" },
          { name: "backgroundOpacity", type: "number", default: "0", descriptionKey: "glass-surface.props.backgroundOpacity" },
          { name: "saturation", type: "number", default: "1", descriptionKey: "glass-surface.props.saturation" },
          { name: "distortionScale", type: "number", default: "-180", descriptionKey: "glass-surface.props.distortionScale" },
          { name: "redOffset", type: "number", default: "0", descriptionKey: "glass-surface.props.redOffset" },
          { name: "greenOffset", type: "number", default: "10", descriptionKey: "glass-surface.props.greenOffset" },
          { name: "blueOffset", type: "number", default: "20", descriptionKey: "glass-surface.props.blueOffset" },
          { name: "xChannel", type: "'R' | 'G' | 'B'", default: "R", descriptionKey: "glass-surface.props.xChannel" },
          { name: "yChannel", type: "'R' | 'G' | 'B'", default: "G", descriptionKey: "glass-surface.props.yChannel" },
          { name: "mixBlendMode", type: "string", default: "difference", descriptionKey: "glass-surface.props.mixBlendMode" },
          { name: "className", type: "string", descriptionKey: "glass-surface.props.className" },
          { name: "contentClassName", type: "string", descriptionKey: "glass-surface.props.contentClassName" },
          { name: "style", type: "CSSProperties", descriptionKey: "glass-surface.props.style" },
        ],
      },
      {
        slug: "code-block",
        labelKey: "code-block.label",
        descriptionKey: "code-block.description",
        demo: CodeBlockDemo,
        sourceCode: codeBlockSource,
        date: "2026-02-19",
      },
      {
        slug: "snippet",
        labelKey: "snippet.label",
        descriptionKey: "snippet.description",
        demo: SnippetDemo,
        sourceCode: snippetSource,
        date: "2026-02-24",
      },
      {
        slug: "pop-up-item",
        labelKey: "pop-up-item.label",
        descriptionKey: "pop-up-item.description",
        demo: PopUpItemDemo,
        sourceCode: popUpItemSource,
        date: "2026-02-21",
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
      {
        slug: "radial-cluster",
        labelKey: "radial-cluster.label",
        descriptionKey: "radial-cluster.description",
        demo: RadialClusterDemo,
        sourceCode: radialClusterSource,
        date: "2026-02-22",
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
    items: [
      {
        slug: "draggable-grid",
        labelKey: "draggable-grid.label",
        descriptionKey: "draggable-grid.description",
        demo: DraggableGridDemo,
        sourceCode: draggableGridSource,
        date: "2026-02-20",
      },
      {
        slug: "timeline",
        labelKey: "timeline.label",
        descriptionKey: "timeline.description",
        demo: TimelineDemo,
        sourceCode: timelineSource,
        date: "2026-02-20",
      },
    ],
  },
  {
    label: "Navigation",
    items: [
      {
        slug: "speed-dial",
        labelKey: "speed-dial.label",
        descriptionKey: "speed-dial.description",
        demo: SpeedDialDemo,
        sourceCode: speedDialSource,
        date: "2026-02-21",
      },
      {
        slug: "floating-dock",
        labelKey: "floating-dock.label",
        descriptionKey: "floating-dock.description",
        demo: FloatingDockDemo,
        sourceCode: floatingDockSource,
        date: "2026-02-24",
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
      {
        slug: "perlin-noise",
        labelKey: "perlin-noise.label",
        descriptionKey: "perlin-noise.description",
        demo: PerlinNoiseDemo,
        sourceCode: perlinNoiseSource,
        date: "2026-02-24",
      },
      {
        slug: "star-background",
        labelKey: "star-background.label",
        descriptionKey: "star-background.description",
        demo: StarBackgroundDemo,
        sourceCode: starBackgroundSource,
        date: "2026-02-24",
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
      usageProps: UsagePropRow[];
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
        usageProps: item.usageProps ?? [],
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
