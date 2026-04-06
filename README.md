# OPEN-UI

UI components built with Next.js, React, Tailwind CSS, and shadcn/ui style. Copy into your project or add via CLI.

**English** | [日本語](README.ja.md) | [中文](README.zh-TW.md)

**Preview:** [aice-ui.vercel.app](https://aice-ui.vercel.app/)

---

## Install & Use

### Requirements

- Node.js 18+
- pnpm recommended

### Run locally

```bash
git clone https://github.com/liuchiawei/open-ui.git
cd open-ui
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Use in your project

- **Copy** — Copy `.tsx` files from `components/ui/`, `components/background/`, etc. into your app.
- **shadcn CLI** — Point your project at this repo’s registry and run:

  ```bash
  pnpm run build:registry   # in this repo first
  pnpm dlx shadcn@latest add <component>
  ```

### CLI (global)

After the package is published:

```bash
pnpm add -g @doublecheap/open-ui
```

Then use the CLI to add components via the registry.

---

## Components

Grouped by category (see `lib/component-config.ts`).

### UI

| Component         | Description                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------- |
| **Glass Surface** | Glass surface with blur.                                                                  |
| **Code Block**    | Code block with syntax highlighting and line numbers.                                     |
| **Snippet**       | One-line code or command display with copy button. Compound: Provider, Addon, CopyButton. |
| **Pop Up Item**   | Container that reveals content with pop-up animation (whileInView, hover, or click).      |

### Text

| Component             | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| **Glyph Katakana**    | Text with decoding animation—katakana resolves to target text.  |
| **Decrypted Text**    | Scrambled text that reveals on hover or in view.                |
| **Text Hover Effect** | Text with cursor-following gradient and stroke on hover.        |
| **Slide Up Letters**  | Slide-up letters with optional title and description.           |
| **Animated Counter**  | Number that animates from start to target in viewport.          |
| **Timer**             | Elapsed-time timer; start, pause, restart; configurable format. |

### Button

| Component         | Description                                        |
| ----------------- | -------------------------------------------------- |
| **Copy Button**   | Copies text to clipboard; shows check after copy.  |
| **Scroll Button** | Scrolls window (top, bottom, up, down).            |
| **Theme Switch**  | Dark/light theme switch (React, Tailwind, Motion). |

### Card

| Component        | Description                                          |
| ---------------- | ---------------------------------------------------- |
| **3D Card**      | Card tilts in 3D on hover; parallax depth.           |
| **3D Flip Card** | Flip card with 3D tilt and click-to-flip front/back. |

### Chart

| Component          | Description                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------- |
| **Radar Chart**    | Radar chart with optional title and description.                                            |
| **Radial Cluster** | Radial cluster chart for hierarchical data. Supports data prop or Item/SubItem composition. |

### Carousel

| Component        | Description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| **Motion Wheel** | Carousel wheel with rotation, prev/next, dots, optional center panel. |

### Layout

| Component          | Description                                          |
| ------------------ | ---------------------------------------------------- |
| **Draggable Grid** | Draggable 2D grid with parallax cells.               |
| **Timeline**       | Vertical timeline with sticky year and card content. |

### Navigation

| Component         | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| **Speed Dial**    | FAB that expands to radial menu (Root, Trigger, Item).       |
| **Floating Dock** | Bottom dock with magnify on hover; mobile collapses to menu. |

### Background

| Component            | Description                                             |
| -------------------- | ------------------------------------------------------- |
| **Floating Circles** | Floating circles with optional title and description.   |
| **Matrix Code**      | Matrix-style code with glitch and optional vignette.    |
| **Perlin Noise**     | Canvas Perlin noise wave grid; mouse/touch interaction. |
| **Star Background**  | Canvas starfield; configurable stars and twinkle.       |

### Media

| Component            | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| **Ascii Art**        | Image as ASCII art; optional fade, typewriter, matrix.     |
| **Pixelated Canvas** | Image as dot grid; optional pointer distortion.            |
| **Heatmap Canvas**   | Image with heatmap gradient (thermal, viridis, jet, etc.). |
| **Webcam**           | Webcam with optional title and description.                |

**Total: 30 components**

---

## Tech Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · shadcn/ui (new-york) · Motion · Radix UI · Lucide

---

## License

[LICENSE](LICENSE)
