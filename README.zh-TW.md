[English](README.md) | [日本語](README.ja.md) | **中文**

---

# Aice UI

開源 UI 元件庫，基於 [Next.js](https://nextjs.org)、[React](https://react.dev)、[Tailwind CSS](https://tailwindcss.com) 與 [shadcn/ui](https://ui.shadcn.com) 風格，提供可直接複製到專案中使用的元件。

**線上預覽：** [aice-ui.vercel.app](https://aice-ui.vercel.app/)

---

## 元件一覽

| 元件 | 說明 |
|------|------|
| **Webcam** | 瀏覽器 Webcam 串流元件，含錯誤處理與 ref 轉發 |
| **Glass Surface** | 液態玻璃表面效果，支援 SVG displacement 與可選 backdrop blur |
| **Background Gradient Animation** | 可自訂顏色的動態漸層背景，可選滑鼠跟隨互動 |

更多元件持續新增中，歡迎提交 PR 或建議。

---

## 技術棧

- **Next.js 16** · App Router
- **React 19**
- **Tailwind CSS 4**
- **shadcn/ui**（new-york 風格）
- **Motion** · 動畫
- **Radix UI** · 無障礙基礎元件
- **Lucide** · 圖示

---

## 安裝與使用

### 需求

- Node.js 18+
- 使用 **pnpm** 作為套件管理（建議）

### 克隆並啟動

```bash
git clone https://github.com/your-username/aice-ui.git
cd aice-ui
pnpm install
pnpm dev
```

在瀏覽器開啟 [http://localhost:3000](http://localhost:3000) 即可預覽元件。

### 將元件加入你的專案

本專案採用與 shadcn/ui 相容的 **registry** 結構，元件原始碼位於：

- `components/ui/` — 按鈕、Tooltip、Webcam、Glass Surface 等
- `components/background/` — 背景動畫等

你可以：

1. **手動複製**：從 `components/` 或 `registry/new-york/` 複製需要的 `.tsx` 與樣式到自己的專案。
2. **透過 shadcn CLI**：若你的專案已設定 shadcn，可將本 repo 的 registry 設為來源後用 `pnpm dlx shadcn@latest add <component>` 安裝（需先在本專案執行 `pnpm run registry:build` 建置 registry）。

依賴請參考 `package.json`，常見如：`class-variance-authority`、`clsx`、`tailwind-merge`、`lucide-react`、`motion`、`radix-ui` 等。

---

## 專案腳本

| 指令 | 說明 |
|------|------|
| `pnpm dev` | 啟動開發伺服器 |
| `pnpm build` | 建置 registry 並建置 Next.js |
| `pnpm run registry:build` | 僅建置 shadcn registry |
| `pnpm lint` | 執行 ESLint |

---

## 貢獻

歡迎提交 Issue 與 Pull Request，包括：

- 新元件提案或實作
- 文件與範例改進
- Bug 修復與無障礙改進

請在較大改動前先開 Issue 討論。

---

## 授權

本專案為開源元件集合，授權條款見倉庫內 [LICENSE](LICENSE) 檔案。
