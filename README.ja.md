[English](README.md) | **日本語** | [中文](README.zh-TW.md)

---

# Aice UI

[Next.js](https://nextjs.org)、[React](https://react.dev)、[Tailwind CSS](https://tailwindcss.com)、[shadcn/ui](https://ui.shadcn.com) スタイルで構築したオープンソースの UI コンポーネント集。そのままプロジェクトにコピーして利用できます。

**プレビュー:** [aice-ui.vercel.app](https://aice-ui.vercel.app/)

---

## コンポーネント一覧

| コンポーネント | 説明 |
|----------------|------|
| **Webcam** | ブラウザの Webcam ストリーミング。エラー処理と ref 転送に対応 |
| **Glass Surface** | 液体ガラス風の表面。SVG displacement とオプションの backdrop blur |
| **Background Gradient Animation** | 色を設定可能なアニメーショングラデーション背景。オプションでポインター追従 |

追加コンポーネントは随時予定。Issue・PR 歓迎です。

---

## 技術スタック

- **Next.js 16** · App Router
- **React 19**
- **Tailwind CSS 4**
- **shadcn/ui**（new-york スタイル）
- **Motion** · アニメーション
- **Radix UI** · アクセシブルなプリミティブ
- **Lucide** · アイコン

---

## インストールと利用

### 必要環境

- Node.js 18+
- **pnpm** 推奨

### クローンと起動

```bash
git clone https://github.com/your-username/aice-ui.git
cd aice-ui
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000) でコンポーネントをプレビューできます。

### 自分のプロジェクトで使う

このリポジトリは shadcn/ui 互換の **registry** 構成です。ソースは以下にあります。

- `components/ui/` — Button、Tooltip、Webcam、Glass Surface など
- `components/background/` — 背景アニメーションなど

利用方法:

1. **手動コピー** — `components/` または `registry/new-york/` から必要な `.tsx` とスタイルをプロジェクトにコピーする。
2. **shadcn CLI** — 既に shadcn を使っているプロジェクトなら、このリポジトリの registry を参照して `pnpm dlx shadcn@latest add <component>` で追加可能（先にこのリポジトリで `pnpm run registry:build` を実行すること）。

依存関係は `package.json` を参照（例: `class-variance-authority`、`clsx`、`tailwind-merge`、`lucide-react`、`motion`、`radix-ui` など）。

---

## スクリプト

| コマンド | 説明 |
|----------|------|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | registry と Next.js をビルド |
| `pnpm run registry:build` | shadcn registry のみビルド |
| `pnpm lint` | ESLint 実行 |

---

## コントリビューション

Issue と Pull Request を歓迎します。例:

- 新コンポーネントの提案・実装
- ドキュメント・サンプルの改善
- バグ修正・アクセシビリティ改善

大きな変更の場合は事前に Issue で相談してください。

---

## ライセンス

リポジトリ内の [LICENSE](LICENSE) を参照してください。
