# Open-UI CLI

本目錄為 OPEN-UI 的 CLI 實作區，提供 `npx @doublecheap/open-ui add <component>`、`npx @doublecheap/open-ui list` 等指令，讓使用者從 [Open-UI Registry](https://aice-ui.vercel.app) 安裝元件到自己的專案。

## 相關檔案說明

| 檔案 | 用途 |
|------|------|
| **`scripts/cli/index.ts`** | CLI 程式進入點。解析指令（add / list / --help / --version）、拉取 registry JSON、安裝依賴、呼叫 `npx shadcn@latest add <url>`。 |
| **`lib/project-config.ts`** | 專案常數（`projectConfig`）：`url`（registry 基底）、`cli`（指令名稱）、`name`、`author` 等。CLI 僅依賴此檔以取得 URL 與 CLI 名稱，不依賴整份 component-config。 |
| **`tsup.config.ts`**（專案根目錄） | 建置設定：entry 為 `scripts/cli/index.ts`，輸出 `dist/index.js`，供 `package.json` 的 `bin` 使用。 |
| **`package.json`** | 定義 `bin["@doublecheap/open-ui"] = "dist/index.js"`、`scripts["build:cli"]`、`files` 含 `dist`，發佈時僅會帶上 CLI 產物。 |
| **`registry.json`**（專案根目錄） | shadcn 相容的 registry 主清單；`pnpm run registry:build` 會同步更新 `public/r/` 下各元件 JSON。 |
| **`public/r/<component>.json`** | 單一元件完整定義（含 `files[].content`），由 shadcn build 產生，部署後供 CLI 透過 `{projectConfig.url}/r/<component>.json` 拉取。 |

## 用途

- **add**：依元件名稱從 registry 拉取 JSON → 安裝缺少的 npm 依賴與 shadcn 基底元件 → 呼叫 shadcn CLI 寫入元件檔案。
- **list / ls**：從 `{url}/r/registry.json` 取得元件清單並輸出。
- **--help / --version**：顯示用法與版本（版本來自根目錄 `package.json` 的 version）。

Registry 基底 URL 與 CLI 名稱來自 [lib/project-config.ts](../lib/project-config.ts) 的 `projectConfig.url` 與 `projectConfig.cli`，不需在 CLI 內重複寫死。

## 使用方式

### 開發／建置

```bash
# 建置 CLI（產出 dist/index.js）
pnpm run build:cli

# 測試 CLI 是否正常（會執行 --help）
pnpm run test:cli
```

### 使用者安裝元件

在已具備 shadcn 設定的專案中（例如已有 `components.json`、Tailwind）：

```bash
# 安裝單一元件
npx @doublecheap/open-ui add copy-button

# 安裝多個元件
npx @doublecheap/open-ui add copy-button theme-switch glass-surface

# 列出所有可用元件
npx @doublecheap/open-ui list
# 或
npx @doublecheap/open-ui ls

# 說明與版本
npx @doublecheap/open-ui --help
npx @doublecheap/open-ui --version
```

### 發佈

建置後若需發佈到 npm（需將 `package.json` 的 `private` 改為 `false` 或移除）：

```bash
pnpm run build:cli
npm publish
```

發佈後使用者即可直接使用 `npx @doublecheap/open-ui add <name>`，無需安裝到全域。
