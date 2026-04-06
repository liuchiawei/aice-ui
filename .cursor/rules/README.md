# Cursor Rules

Project rules in `.cursor/rules/` provide persistent context for the AI agent. Each rule is an `.mdc` file with YAML frontmatter (`description`, `alwaysApply`, or `globs`).

---

## Rules

### component-workflow.mdc

| Lang | Description |
|------|-------------|
| **EN** | Component refactor workflow for the open-ui shadcn collection. When the user asks to refactor a component, follow the 7-step workflow (refactor → review → demo → i18n → component-config → registry.json → README). Supports partial work; list remaining steps and ask to continue. |
| **中文** | open-ui shadcn 元件庫的元件重構流程。當使用者要求重構元件時，依 7 步驟執行：重構 → 審查 → demo → i18n → component-config → registry.json → README；支援只做部分步驟，完成後列出未完成步驟並詢問是否繼續。 |
| **JA** | open-ui shadcn コレクションのコンポーネントリファクタ用ワークフロー。コンポーネントのリファクタを依頼されたら 7 ステップ（リファクタ → レビュー → demo → i18n → component-config → registry.json → README）に従う。部分対応可。残りステップを列挙し続行を確認。 |

### publish-workflow.mdc

| Lang | Description |
|------|-------------|
| **EN** | Publish workflow: shadcn registry build and npm CLI publish steps. When the user asks to publish, release, or ship to npm, run in order: `pnpm run build:registry` (optional `pnpm build`) → `pnpm login` → bump `version` in package.json → `pnpm run build:cli` → optional `pnpm run test:cli` → `pnpm publish --access public`. |
| **中文** | 發布工作流程：shadcn registry 建置與 npm CLI 發布步驟。當使用者要求發布、release 或上架 npm 時，依序執行：`pnpm run build:registry`（可選 `pnpm build`）→ `pnpm login` → 在 package.json 升版 → `pnpm run build:cli` → 可選 `pnpm run test:cli` → `pnpm publish --access public`。 |
| **JA** | 公開ワークフロー：shadcn registry のビルドと npm CLI 公開手順。ユーザーが publish / release / npm 公開を依頼したら、順に実行：`pnpm run build:registry`（必要なら `pnpm build`）→ `pnpm login` → package.json の version 更新 → `pnpm run build:cli` → 任意で `pnpm run test:cli` → `pnpm publish --access public`。 |
