[English](README.md) | [日本語](README.ja.md) | **中文**

---

# Aice UI

開源 UI 元件庫，基於 [Next.js](https://nextjs.org)、[React](https://react.dev)、[Tailwind CSS](https://tailwindcss.com) 與 [shadcn/ui](https://ui.shadcn.com) 風格，提供可直接複製到專案中使用的元件。

**線上預覽：** [aice-ui.vercel.app](https://aice-ui.vercel.app/)

---

## 元件一覽

依類別列出（對應 `lib/component-config.ts`）。

### UI

| 元件 | 說明 |
|------|------|
| **液体玻璃** | 具模糊與變形效果的玻璃表面元件。 |
| **代碼** | 具語法高亮與行號的程式碼區塊元件。 |

### 文字

| 元件 | 說明 |
|------|------|
| **片假名符號** | 解碼動畫文字元件，隨機片假名會逐漸揭示目標文字。支援延遲與減少動畫偏好。 |
| **解密文字** | 滑鼠懸停或進入視窗時解碼顯示的文字。支援逐一揭露、批次揭露與多種揭露方向。 |
| **向上滑動字母** | 可自訂資料與標題、說明的滑動字母元件。 |
| **動畫計數器** | 進入視窗時從起始值動畫到目標值的數字計數器。 |
| **計時器** | 可重用的經過時間顯示元件。可用按鈕開始、暫停或重啟；可選擇顯示格式（如 00:01:23 或 83.250 秒）。 |

### 按鈕

| 元件 | 說明 |
|------|------|
| **複製按鈕** | 一鍵將文字複製到剪貼簿的按鈕，複製後會顯示勾選圖示。可放在程式碼區塊、引用文或任何希望使用者一鍵複製的內容旁。 |
| **捲動按鈕** | 可快速捲動視窗（上、下、左、右等）的按鈕，適合用於頁面導航。 |
| **主題切換** | 深色／淺色主題切換元件，以 React、Tailwind CSS、Motion 建置。 |

### 卡片

| 元件 | 說明 |
|------|------|
| **3D卡片** | 懸停時依滑鼠位置產生 3D 傾斜效果。子元件可設定不同景深，呈現視差效果。 |
| **3D翻轉卡片** | 點擊翻轉、滑鼠追蹤 3D 傾斜效果的複合式 flip card 元件。 |

### 圖表

| 元件 | 說明 |
|------|------|
| **雷達圖** | 可自訂資料與標題、說明的雷達圖元件。 |

### 跑馬燈

| 元件 | 說明 |
|------|------|
| **旋轉輪播** | 具旋轉動畫、前後導航、圓點指示與可選中央資訊區的複合式輪播元件。 |

### 版面

*（即將推出 — Bento 網格、時間軸等）*

### 導航

*（即將推出 — FAB 導航等）*

### 背景

| 元件 | 說明 |
|------|------|
| **浮動圓** | 可自訂的浮動圓形背景。 |
| **矩陣程式碼** | 具故障效果與可選暗角效果的矩陣程式碼背景元件。 |

### 媒體

| 元件 | 說明 |
|------|------|
| **網路攝影機** | 瀏覽器 Webcam 串流元件，含錯誤處理與 ref 轉發。 |

**共 17 個元件**

---

### 新增元件時請記得

新增元件時請一併更新以下三處：

1. **元件設定** — `lib/component-config.ts`（slug、labelKey、descriptionKey、demo、sourceCode）。
2. **多語系訊息** — 在 `messages/en.json`、`messages/ja.json`、`messages/zh.json` 的 `Components` 下新增該元件的 `label` 與 `description`。
3. **Registry** — 更新 `registry.json`，讓 shadcn CLI 能以 `pnpm dlx shadcn@latest add <component>` 安裝該元件。

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
