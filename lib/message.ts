// 表示用文言（既定: 日本語）。将来 i18n 時は messages.ja / messages.en / messages.zh に分割可能。
// Component Showcase Page Title
export const componentPageTitle: string = "AICE UI";

// Component Showcase Page Intro
export const componentPageIntro =
  "このページではコンポーネントのプレビューとサンプルコードを表示します。下には同じカテゴリの他のコンポーネントが一覧されています。";

// Component Title
export const componentTitle: Record<string, string> = {
  "glass-surface": "リキッド・グラス",
  "code-block": "コードブロック",
  "floating-circles": "浮遊円",
  webcam: "ウェブカメラ",
};

/** slugごとの簡単な説明（オプション、将来拡張用） */
export const componentDescription: Record<string, string> = {
  "glass-surface":
    "リキッド・グラスの表面。SVG変位と背景ぼかし（オプション）付き。",
  "code-block": "コードブロック。シンタックスハイライトと行番号に対応。",
  "floating-circles":
    "色変更可能な動くグラデーション背景。マウス追従も可。",
  webcam: "ブラウザカメラ配信。エラー処理・ref転送対応。",
};

// Coming Soon セクション（既定: 日本語）
export const comingSoonTitle = "近日公開";
export const comingSoonDescription =
  "このコンポーネントのデモとコードは近日公開予定です。";

// 同カテゴリのコンポーネントラベル（コンポーネント詳細ページ）
export const relatedComponentsLabel = "同カテゴリのコンポーネント";

export const installationSectionTitle: string = "インストール";
export const installationSectionDescription: string =
  "お好きなパッケージマネージャーでコンポーネントをインストールしてください。";
