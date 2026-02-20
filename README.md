**English** | [日本語](README.ja.md) | [中文](README.zh-TW.md)

---

# Aice UI

Open-source UI component collection built with [Next.js](https://nextjs.org), [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com), and [shadcn/ui](https://ui.shadcn.com) style. Copy components into your project and use them as-is.

**Live preview:** [aice-ui.vercel.app](https://aice-ui.vercel.app/)

---

## Components

Components are grouped by category (see `lib/component-config.ts`).

### UI

| Component | Description |
|-----------|-------------|
| **Glass Surface** | A glass surface component with blur and distortion effects. |
| **Code Block** | A code block component with syntax highlighting and line numbers. |

### Text

| Component | Description |
|-----------|-------------|
| **Glyph Katakana** | A text component with decoding animation—random katakana glyphs gradually resolve to reveal the target text. |
| **Decrypted Text** | Scrambled text that reveals on hover or when in view. Supports sequential or batch reveal, and multiple reveal directions. |
| **Slide Up Letters** | A slide up letters component with customizable data and optional title and description. |
| **Animated Counter** | A number counter that animates from a starting value to a target when it enters the viewport. |
| **Timer** | A reusable timer that shows elapsed time. Start, pause, or restart with buttons; choose display format (e.g. 00:01:23 or 83.250s). |

### Button

| Component | Description |
|-----------|-------------|
| **Copy Button** | A button that copies text to the clipboard. Shows a check icon after copying. Use it next to code blocks, quotes, or any text you want users to copy in one click. |
| **Scroll Button** | Buttons that scroll the window (top, bottom, up, down). Use for quick page navigation. |
| **Theme Switch** | A theme switch component with dark and light mode. It is built with React, Tailwind CSS, and Motion. |

### Card

| Component | Description |
|-----------|-------------|
| **3D Card** | A card that tilts in 3D following your cursor on hover. Child elements can float at different depths for a parallax effect. |
| **3D Flip Card** | A compound flip card with 3D tilt on hover and click-to-flip front/back. |

### Chart

| Component | Description |
|-----------|-------------|
| **Radar Chart** | A radar chart component with customizable data and optional title and description. |

### Carousel

| Component | Description |
|-----------|-------------|
| **Motion Wheel** | A compound carousel wheel with rotation animation, prev/next navigation, dot indicators, and optional center info panel. |

### Layout

| Component | Description |
|-----------|-------------|
| **Draggable Grid** | A draggable 2D grid with parallax icon cells. Inspired by Apple WatchOS. (2026-02-20) |

### Navigation

*(Coming soon — FAB nav, etc.)*

### Background

| Component | Description |
|-----------|-------------|
| **Floating Circles** | A floating circles component with customizable data and optional title and description. |
| **Matrix Code** | A matrix code component with glitch effect and optional vignette effect. |

### Media

| Component | Description |
|-----------|-------------|
| **Webcam** | A webcam component with customizable data and optional title and description. |

**Total: 17 components**

---

### Adding a new component

When you add a new component, remember to update:

1. **Component config** — `lib/component-config.ts` (slug, labelKey, descriptionKey, demo, sourceCode).
2. **Messages** — Add `label` and `description` for the component in `messages/en.json`, `messages/ja.json`, and `messages/zh.json` (under the `Components` namespace).
3. **Registry** — `registry.json` for shadcn CLI so the component can be installed with `pnpm dlx shadcn@latest add <component>`.

---

## Tech Stack

- **Next.js 16** · App Router
- **React 19**
- **Tailwind CSS 4**
- **shadcn/ui** (new-york style)
- **Motion** · Animation
- **Radix UI** · Accessible primitives
- **Lucide** · Icons

---

## Install & Use

### Requirements

- Node.js 18+
- **pnpm** recommended

### Clone and run

```bash
git clone https://github.com/your-username/aice-ui.git
cd aice-ui
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to preview components.

### Use components in your project

This repo uses a **registry** layout compatible with shadcn/ui. Source lives in:

- `components/ui/` — Button, Tooltip, Webcam, Glass Surface, etc.
- `components/background/` — Background animations, etc.

You can:

1. **Copy manually** — Copy the `.tsx` (and any styles) you need from `components/` or `registry/new-york/` into your app.
2. **shadcn CLI** — If your project already uses shadcn, you can point it at this repo’s registry and run `pnpm dlx shadcn@latest add <component>` (run `pnpm run registry:build` in this repo first).

See `package.json` for dependencies (e.g. `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `motion`, `radix-ui`).

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build registry and Next.js |
| `pnpm run registry:build` | Build shadcn registry only |
| `pnpm lint` | Run ESLint |

---

## Contributing

Issues and Pull Requests welcome, including:

- New component ideas or implementations
- Docs and examples
- Bug fixes and accessibility improvements

For larger changes, please open an issue first.

---

## License

See [LICENSE](LICENSE) in this repository.
