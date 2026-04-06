# 修復 react-card-flip peer 警告（精煉版）

## 問題來源

- `react-card-flip@1.2.3` 的 `peerDependencies` 僅宣告 `react@"^18.2.0"`，未支援 React 19。
- 消費者安裝 `@doublecheap/open-ui` 時，若專案使用 React 19，npm/pnpm 會解析到衝突並顯示 ERESOLVE 警告。
- 實測確認：React 19 不影響 react-card-flip 行為，問題僅是警告與依賴聲明。

## 為何不能只靠 overrides 從套件端修掉？

- 套件發佈到 npm 後，消費者在自家專案執行 `npm install` / `pnpm add` 時，是由**消費者的 package manager** 解析依賴。
- 在 open-ui 的 `package.json` 裡加 `overrides` / `pnpm.overrides` 只會影響**本 repo** 的 `node_modules`，**不會**改變消費者安裝時的解析結果。
- 要從根源消除警告，只能：**不再依賴 react-card-flip**；或讓消費者自己在專案裡加 overrides（僅文件說明，不推薦為主要解法）。

---

## 建議方案：移除 react-card-flip，改為自實作

在 `components/card/3d-flip-card.tsx` 中，`ReactCardFlip` 的使用非常精簡：僅用 `isFlipped`、`flipDirection`（`"horizontal"` | `"vertical"`）、`containerClassName`，以及兩個子元素（正面、背面）。可用一個小型內聯元件取代，行為與現有 API 一致，並用 CSS 3D transform 做翻轉動畫。

### 實作要點

1. **新增內聯元件**（例如 `CardFlipContainer`）
   - **Props**：`isFlipped`, `flipDirection`, `containerClassName`, `children`（兩個 ReactNode：front, back）。
   - **結構**：一個外層 `div`（套用 `containerClassName`），內層兩個子元素分別代表正面與背面。
   - **動畫**：用 `transform: rotateY(180deg)`（horizontal）或 `rotateX(180deg)`（vertical）搭配 `isFlipped` 控制翻轉，並用 `transition` 做動畫；背面需再旋轉 180deg 以維持文字方向可讀。
   - **Composition 原則**：`CardFlipContainer` **僅從 FlipCardRoot 接收** `isFlipped`、`flipDirection`、`containerClassName` 與兩個 children；**不擁有** flip 狀態，狀態仍由 `FlipCardRoot`（Provider）唯一管理。

2. **替換現有用法**
   - 在 `FlipCardRoot` 中移除 `import ReactCardFlip from "react-card-flip"`。
   - 將 `<ReactCardFlip ...>{front}{back}</ReactCardFlip>` 改為上述 `CardFlipContainer`，並把 `front` / `back` 與 `flipDirection`、`containerClassName` 傳入，保持現有 `FlipCardContext.Provider` 與 `childArray` 邏輯不變。

3. **移除依賴與 registry**
   - 從 `package.json` 的 `dependencies` 刪除 `"react-card-flip": "^1.2.3"`。
   - 從 `registry.json` 與 `public/r/registry.json` 中移除對 `react-card-flip` 的依賴。
   - `public/r/three-flip-card.json` 內若有依賴或範例 import，改為使用新的內聯實作，不再 import `react-card-flip`。

4. **視覺與無障礙**
   - 背面可設 `backface-visibility: hidden` 避免翻轉時露出背面。
   - 確保前後兩面在無 JS 時仍可被鍵盤/螢幕閱讀器存取（若現有元件有 focus 或 aria，保留之）。

5. **可選：React 19 API 對齊**
   - 若專案已鎖定 React 19，在修改 `3d-flip-card.tsx` 時可一併將 `useContext(FlipCardContext)` / `useContext(FlipCardSideContext)` 改為 `use(FlipCardContext)` / `use(FlipCardSideContext)`，並在 `useFlipCard` 內改用 `use()`（依 vercel-composition-patterns 建議）。

6. **驗證**
   - 執行 `pnpm install` 確認本專案無 react-card-flip。
   - 手動測試 `components/demo/3d-flip-card-demo.tsx` 的 horizontal/vertical 翻轉與 `containerClassName` 表現與原本一致。
   - 以消費者情境在一個使用 React 19 的專案中 `pnpm add @doublecheap/open-ui`（或 npm install）確認不再出現 react-card-flip 的 ERESOLVE/peer 警告。

---

## Skill 審查（vercel-composition-patterns）

- **架構**：維持 FlipCard 複合元件（Root / Front / Back / Container / Body / Item）與現有 context；僅替換內部 flip 實作，未新增對外 boolean props，符合 compound components 與避免 boolean 爆炸。
- **狀態**：狀態保留在 FlipCardRoot（Provider）；新元件僅消費 context 或從 Root 傳入的 props，不擁有 flip 狀態；不改動 `FlipCardContextValue` 介面。
- **實作**：仍以兩個 children（front / back）組成，未使用 render props。
- **React 19**：可選步驟已納入（將 `useContext` 改為 `use()`）。

---

## 需改檔案

| 檔案 | 變更 |
|------|------|
| `components/card/3d-flip-card.tsx` | 移除 react-card-flip、新增 CardFlipContainer、可選改用 use() |
| `package.json` | 刪除 dependencies 中的 react-card-flip |
| `registry.json` | 移除 react-card-flip 依賴 |
| `public/r/registry.json` | 同上 |
| `public/r/three-flip-card.json` | 依賴/範例改為新實作，不再 import react-card-flip |

---

## 替代方案（僅作補充）

若短期不想改元件實作，可只在文件中說明消費者端解法（不推薦當唯一解法）：

- **npm**：消費者專案 `package.json` 加 `"overrides": { "react-card-flip": { "react": "$react" } }`，或安裝時使用 `--legacy-peer-deps`。
- **pnpm**：消費者專案加 `pnpm.peerDependencyRules.allowedVersions.react` 等設定。

缺點：每位消費者都要自己設定；`--legacy-peer-deps` 會一併忽略其他 peer 檢查。建議以「移除 react-card-flip + 自實作」為主要修復方式。
