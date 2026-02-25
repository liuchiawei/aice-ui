import type { ComponentType } from "react";
import {
  GlassSurfaceDemo,
  glassSurfaceSource,
} from "@/components/demo/glass-surface-demo";
import {
  CodeBlockDemo,
  codeBlockSource,
} from "@/components/demo/code-block-demo";
import { SnippetDemo, snippetSource } from "@/components/demo/snippet-demo";
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
import { TimerDemo, timerSource } from "@/components/demo/timer-demo";
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
import { TimelineDemo, timelineSource } from "@/components/demo/timeline-demo";
import {
  SpeedDialDemo,
  speedDialSource,
} from "@/components/demo/speed-dial-demo";
import {
  FloatingDockDemo,
  floatingDockSource,
} from "@/components/demo/floating-dock-demo";
/** One row for the Usage section props table (Item, Prop, Type, Default, Description). */
export interface UsagePropRow {
  name: string;
  type: string;
  default?: string;
  /** Shown when descriptionKey is not set. */
  description?: string;
  /** When set, description is resolved via useTranslations("Components")(descriptionKey). */
  descriptionKey?: string;
  /** Optional sub-component name (e.g. Provider, Addon, CopyButton). When any row has this, the Usage table shows an "Item" column. */
  item?: string;
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
          {
            name: "children",
            type: "ReactNode",
            descriptionKey: "glass-surface.props.children",
          },
          {
            name: "width",
            type: "number | string",
            default: "200",
            descriptionKey: "glass-surface.props.width",
          },
          {
            name: "height",
            type: "number | string",
            default: "80",
            descriptionKey: "glass-surface.props.height",
          },
          {
            name: "borderRadius",
            type: "number",
            default: "20",
            descriptionKey: "glass-surface.props.borderRadius",
          },
          {
            name: "borderWidth",
            type: "number",
            default: "0.07",
            descriptionKey: "glass-surface.props.borderWidth",
          },
          {
            name: "brightness",
            type: "number",
            default: "50",
            descriptionKey: "glass-surface.props.brightness",
          },
          {
            name: "opacity",
            type: "number",
            default: "0.93",
            descriptionKey: "glass-surface.props.opacity",
          },
          {
            name: "blur",
            type: "number",
            default: "11",
            descriptionKey: "glass-surface.props.blur",
          },
          {
            name: "displace",
            type: "number",
            default: "0",
            descriptionKey: "glass-surface.props.displace",
          },
          {
            name: "backgroundOpacity",
            type: "number",
            default: "0",
            descriptionKey: "glass-surface.props.backgroundOpacity",
          },
          {
            name: "saturation",
            type: "number",
            default: "1",
            descriptionKey: "glass-surface.props.saturation",
          },
          {
            name: "distortionScale",
            type: "number",
            default: "-180",
            descriptionKey: "glass-surface.props.distortionScale",
          },
          {
            name: "redOffset",
            type: "number",
            default: "0",
            descriptionKey: "glass-surface.props.redOffset",
          },
          {
            name: "greenOffset",
            type: "number",
            default: "10",
            descriptionKey: "glass-surface.props.greenOffset",
          },
          {
            name: "blueOffset",
            type: "number",
            default: "20",
            descriptionKey: "glass-surface.props.blueOffset",
          },
          {
            name: "xChannel",
            type: "'R' | 'G' | 'B'",
            default: "R",
            descriptionKey: "glass-surface.props.xChannel",
          },
          {
            name: "yChannel",
            type: "'R' | 'G' | 'B'",
            default: "G",
            descriptionKey: "glass-surface.props.yChannel",
          },
          {
            name: "mixBlendMode",
            type: "string",
            default: "difference",
            descriptionKey: "glass-surface.props.mixBlendMode",
          },
          {
            name: "className",
            type: "string",
            descriptionKey: "glass-surface.props.className",
          },
          {
            name: "contentClassName",
            type: "string",
            descriptionKey: "glass-surface.props.contentClassName",
          },
          {
            name: "style",
            type: "CSSProperties",
            descriptionKey: "glass-surface.props.style",
          },
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
        usageProps: [
          {
            name: "code",
            type: "string",
            descriptionKey: "snippet.props.code",
            item: "Provider",
          },
          {
            name: "className",
            type: "string",
            descriptionKey: "snippet.props.className",
            item: "Provider",
          },
          {
            name: "align",
            type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
            default: "inline-start",
            descriptionKey: "snippet.props.align",
            item: "Addon",
          },
          {
            name: "onCopy",
            type: "() => void",
            descriptionKey: "snippet.props.onCopy",
            item: "CopyButton",
          },
          {
            name: "onError",
            type: "(error: Error) => void",
            descriptionKey: "snippet.props.onError",
            item: "CopyButton",
          },
          {
            name: "timeout",
            type: "number",
            default: "2000",
            descriptionKey: "snippet.props.timeout",
            item: "CopyButton",
          },
        ],
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
        usageProps: [
          { item: "Root", name: "items", type: "T[]", descriptionKey: "motion-wheel.props.items" },
          { item: "Root", name: "children", type: "ReactNode", descriptionKey: "motion-wheel.props.children" },
          { item: "Root", name: "className", type: "string", descriptionKey: "motion-wheel.props.className" },
          { item: "Root", name: "radius", type: "number", default: "320 (desktop) / 270 (mobile)", descriptionKey: "motion-wheel.props.radius" },
          { item: "Root", name: "spring", type: "{ stiffness?, damping?, duration? }", default: "{ stiffness: 120, damping: 25, duration: 0.5 }", descriptionKey: "motion-wheel.props.spring" },
          { item: "Root", name: "initialIndex", type: "number", default: "0", descriptionKey: "motion-wheel.props.initialIndex" },
          { item: "Border", name: "className", type: "string", descriptionKey: "motion-wheel.props.className" },
          { item: "AutoCarousel", name: "interval", type: "number", default: "3000", descriptionKey: "motion-wheel.props.interval" },
          { item: "Wheel", name: "children", type: "(item, index) => ReactNode", descriptionKey: "motion-wheel.props.wheelChildren" },
          { item: "Item", name: "item", type: "T", descriptionKey: "motion-wheel.props.item" },
          { item: "Item", name: "index", type: "number", descriptionKey: "motion-wheel.props.index" },
          { item: "Item", name: "children", type: "ReactNode", descriptionKey: "motion-wheel.props.children" },
          { item: "Navigation", name: "className", type: "string", descriptionKey: "motion-wheel.props.className" },
          { item: "Navigation", name: "prevClassName", type: "string", descriptionKey: "motion-wheel.props.prevClassName" },
          { item: "Navigation", name: "nextClassName", type: "string", descriptionKey: "motion-wheel.props.nextClassName" },
          { item: "Dots", name: "className", type: "string", descriptionKey: "motion-wheel.props.className" },
          { item: "CenterInfo", name: "children", type: "(item: T) => ReactNode", descriptionKey: "motion-wheel.props.centerInfoChildren" },
          { item: "CenterInfo", name: "className", type: "string", descriptionKey: "motion-wheel.props.className" },
        ],
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
        usageProps: [
          { item: "Root", name: "children", type: "ReactNode", descriptionKey: "draggable-grid.props.children" },
          { item: "Root", name: "className", type: "string", descriptionKey: "draggable-grid.props.className" },
          { item: "Root", name: "iconSize", type: "number", default: "120", descriptionKey: "draggable-grid.props.iconSize" },
          { item: "Root", name: "iconMargin", type: "number", default: "40", descriptionKey: "draggable-grid.props.iconMargin" },
          { item: "Root", name: "rows", type: "number", default: "10", descriptionKey: "draggable-grid.props.rows" },
          { item: "Root", name: "cols", type: "number", default: "10", descriptionKey: "draggable-grid.props.cols" },
          { item: "Root", name: "linkComponent", type: "ComponentType<{ href; children }>", descriptionKey: "draggable-grid.props.linkComponent" },
          { item: "Root", name: "fallback", type: "ReactNode", descriptionKey: "draggable-grid.props.fallback" },
          { item: "Grid", name: "children", type: "ReactNode", descriptionKey: "draggable-grid.props.children" },
          { item: "Grid", name: "className", type: "string", descriptionKey: "draggable-grid.props.className" },
          { item: "Grid", name: "dragConstraints", type: "{ left, right, top, bottom }", default: "—", descriptionKey: "draggable-grid.props.dragConstraints" },
          { item: "Item", name: "row", type: "number", descriptionKey: "draggable-grid.props.row" },
          { item: "Item", name: "col", type: "number", descriptionKey: "draggable-grid.props.col" },
          { item: "Item", name: "index", type: "number", descriptionKey: "draggable-grid.props.index" },
          { item: "Item", name: "item", type: "DraggableGridItemBase", descriptionKey: "draggable-grid.props.item" },
          { item: "Item", name: "linkComponent", type: "ComponentType<{ href; children }>", descriptionKey: "draggable-grid.props.linkComponent" },
          { item: "Item", name: "className", type: "string", descriptionKey: "draggable-grid.props.className" },
          { item: "Item", name: "children", type: "ReactNode", descriptionKey: "draggable-grid.props.children" },
        ],
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
        usageProps: [
          { item: "Root", name: "children", type: "ReactNode", descriptionKey: "speed-dial.props.children" },
          { item: "Root", name: "spreadRangeAngle", type: "number", default: "90", descriptionKey: "speed-dial.props.spreadRangeAngle" },
          { item: "Root", name: "directionAngle", type: "number", default: "90", descriptionKey: "speed-dial.props.directionAngle" },
          { item: "Root", name: "radius", type: "number", default: "120", descriptionKey: "speed-dial.props.radius" },
          { item: "Root", name: "itemSize", type: "\"sm\" | \"default\" | \"lg\"", default: "\"default\"", descriptionKey: "speed-dial.props.itemSize" },
          { item: "Root", name: "className", type: "string", descriptionKey: "speed-dial.props.className" },
          { item: "Trigger", name: "variant", type: "\"default\" | \"outline\" | \"secondary\"", default: "\"default\"", descriptionKey: "speed-dial.props.variant" },
          { item: "Trigger", name: "size", type: "\"default\" | \"sm\" | \"lg\"", default: "\"default\"", descriptionKey: "speed-dial.props.size" },
          { item: "Trigger", name: "children", type: "ReactNode", default: "—", descriptionKey: "speed-dial.props.children" },
          { item: "Item", name: "children", type: "ReactNode", descriptionKey: "speed-dial.props.children" },
          { item: "Item", name: "size", type: "\"sm\" | \"default\" | \"lg\"", default: "from Root", descriptionKey: "speed-dial.props.size" },
          { item: "Item", name: "className", type: "string", descriptionKey: "speed-dial.props.className" },
          { item: "Item", name: "onClick", type: "() => void", descriptionKey: "speed-dial.props.onClick" },
        ],
      },
      {
        slug: "floating-dock",
        labelKey: "floating-dock.label",
        descriptionKey: "floating-dock.description",
        demo: FloatingDockDemo,
        sourceCode: floatingDockSource,
        date: "2026-02-24",
        usageProps: [
          { name: "items", type: "{ title: string; icon: ReactNode; href: string }[]", default: "—", descriptionKey: "floating-dock.props.items" },
          { name: "desktopClassName", type: "string", default: "—", descriptionKey: "floating-dock.props.desktopClassName" },
          { name: "mobileClassName", type: "string", default: "—", descriptionKey: "floating-dock.props.mobileClassName" },
        ],
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
        usageProps: [
          { name: "gradientBackgroundStart", type: "string", default: "\"rgb(108, 0, 162)\"", descriptionKey: "floating-circles.props.gradientBackgroundStart" },
          { name: "gradientBackgroundEnd", type: "string", default: "\"rgb(0, 17, 82)\"", descriptionKey: "floating-circles.props.gradientBackgroundEnd" },
          { name: "firstColor", type: "string", default: "\"20, 72, 140\"", descriptionKey: "floating-circles.props.firstColor" },
          { name: "secondColor", type: "string", default: "\"242, 61, 109\"", descriptionKey: "floating-circles.props.secondColor" },
          { name: "thirdColor", type: "string", default: "\"152, 50, 166\"", descriptionKey: "floating-circles.props.thirdColor" },
          { name: "fourthColor", type: "string", default: "\"30, 164, 217\"", descriptionKey: "floating-circles.props.fourthColor" },
          { name: "fifthColor", type: "string", default: "\"242, 87, 73\"", descriptionKey: "floating-circles.props.fifthColor" },
          { name: "pointerColor", type: "string", default: "\"225, 160, 94\"", descriptionKey: "floating-circles.props.pointerColor" },
          { name: "size", type: "string", default: "\"80%\"", descriptionKey: "floating-circles.props.size" },
          { name: "blendingValue", type: "string", default: "\"hard-light\"", descriptionKey: "floating-circles.props.blendingValue" },
          { name: "children", type: "ReactNode", descriptionKey: "floating-circles.props.children" },
          { name: "className", type: "string", descriptionKey: "floating-circles.props.className" },
          { name: "interactive", type: "boolean", default: "true", descriptionKey: "floating-circles.props.interactive" },
          { name: "containerClassName", type: "string", descriptionKey: "floating-circles.props.containerClassName" },
        ],
      },
      {
        slug: "matrix-code",
        labelKey: "matrix-code.label",
        descriptionKey: "matrix-code.description",
        demo: MatrixCodeDemo,
        sourceCode: matrixCodeSource,
        date: "2026-02-19",
        usageProps: [
          { name: "glitchColors", type: "string[]", default: "[\"#2b4539\", \"#61dca3\", \"#61b3dc\"]", descriptionKey: "matrix-code.props.glitchColors" },
          { name: "glitchSpeed", type: "number", default: "50", descriptionKey: "matrix-code.props.glitchSpeed" },
          { name: "centerVignette", type: "boolean", default: "false", descriptionKey: "matrix-code.props.centerVignette" },
          { name: "outerVignette", type: "boolean", default: "true", descriptionKey: "matrix-code.props.outerVignette" },
          { name: "smooth", type: "boolean", default: "true", descriptionKey: "matrix-code.props.smooth" },
          { name: "className", type: "string", descriptionKey: "matrix-code.props.className" },
        ],
      },
      {
        slug: "perlin-noise",
        labelKey: "perlin-noise.label",
        descriptionKey: "perlin-noise.description",
        demo: PerlinNoiseDemo,
        sourceCode: perlinNoiseSource,
        date: "2026-02-24",
        usageProps: [
          { name: "lineColor", type: "string", default: "\"black\"", descriptionKey: "perlin-noise.props.lineColor" },
          { name: "backgroundColor", type: "string", default: "\"transparent\"", descriptionKey: "perlin-noise.props.backgroundColor" },
          { name: "waveSpeedX", type: "number", default: "0.0125", descriptionKey: "perlin-noise.props.waveSpeedX" },
          { name: "waveSpeedY", type: "number", default: "0.005", descriptionKey: "perlin-noise.props.waveSpeedY" },
          { name: "waveAmpX", type: "number", default: "32", descriptionKey: "perlin-noise.props.waveAmpX" },
          { name: "waveAmpY", type: "number", default: "16", descriptionKey: "perlin-noise.props.waveAmpY" },
          { name: "xGap", type: "number", default: "10", descriptionKey: "perlin-noise.props.xGap" },
          { name: "yGap", type: "number", default: "32", descriptionKey: "perlin-noise.props.yGap" },
          { name: "friction", type: "number", default: "0.925", descriptionKey: "perlin-noise.props.friction" },
          { name: "tension", type: "number", default: "0.005", descriptionKey: "perlin-noise.props.tension" },
          { name: "maxCursorMove", type: "number", default: "100", descriptionKey: "perlin-noise.props.maxCursorMove" },
          { name: "style", type: "CSSProperties", descriptionKey: "perlin-noise.props.style" },
          { name: "className", type: "string", descriptionKey: "perlin-noise.props.className" },
        ],
      },
      {
        slug: "star-background",
        labelKey: "star-background.label",
        descriptionKey: "star-background.description",
        demo: StarBackgroundDemo,
        sourceCode: starBackgroundSource,
        date: "2026-02-24",
        usageProps: [
          { name: "starCount", type: "number", default: "200", descriptionKey: "star-background.props.starCount" },
          { name: "twinkleSpeed", type: "number", default: "0.002", descriptionKey: "star-background.props.twinkleSpeed" },
          { name: "starColor", type: "string", default: "\"255, 255, 255\"", descriptionKey: "star-background.props.starColor" },
          { name: "backgroundColor", type: "string", default: "\"transparent\"", descriptionKey: "star-background.props.backgroundColor" },
          { name: "className", type: "string", descriptionKey: "star-background.props.className" },
          { name: "containerClassName", type: "string", descriptionKey: "star-background.props.containerClassName" },
          { name: "children", type: "ReactNode", descriptionKey: "star-background.props.children" },
          { name: "style", type: "CSSProperties", descriptionKey: "star-background.props.style" },
        ],
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
        usageProps: [
          { name: "width", type: "number", default: "640", descriptionKey: "webcam.props.width" },
          { name: "height", type: "number", default: "360", descriptionKey: "webcam.props.height" },
          { name: "audio", type: "boolean", default: "false", descriptionKey: "webcam.props.audio" },
          { name: "className", type: "string", descriptionKey: "webcam.props.className" },
          { name: "containerClassName", type: "string", descriptionKey: "webcam.props.containerClassName" },
        ],
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

export { projectConfig } from "@/lib/project-config";