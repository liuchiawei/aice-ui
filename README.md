**English** | [日本語](README.ja.md) | [中文](README.zh-TW.md)

---

# Aice UI

Open-source UI component collection built with [Next.js](https://nextjs.org), [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com), and [shadcn/ui](https://ui.shadcn.com) style. Copy components into your project and use them as-is.

**Live preview:** [aice-ui.vercel.app](https://aice-ui.vercel.app/)

---

## Components

| Component | Description |
|-----------|-------------|
| **Webcam** | Browser webcam streaming with error handling and ref forwarding |
| **Glass Surface** | Liquid glass surface with SVG displacement and optional backdrop blur |
| **Background Gradient Animation** | Animated gradient background with configurable colors and optional pointer-follow interaction |

More components coming. Issues and PRs welcome.

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
