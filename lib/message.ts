// 表示用文言（既定: 日本語）。将来 i18n 時は messages.ja / messages.en / messages.zh に分割可能。
export const topPage = {
  title: "AICE UI",
  description:
    "AIに特化したアプリを素早く作れる、オープンソースのUIコンポーネント集です。会話やメッセージなどのコンポーネントを用意しています。Next.js・React・Tailwind CSS・shadcn/ui製。",
  CTA: "コンポーネント一覧",
};

export const siteDescriptionEng: string =
  "An open-source component library to help you build AI-native applications faster. It provides pre-built components like conversations, messages and more. Built with Next.js, React, Tailwind CSS, and shadcn/ui.";

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
  "matrix-code": "マトリックス・コード",
  webcam: "ウェブカメラ",
  "radar-chart": "ラダーチャート",
};

/** slugごとの簡単な説明（オプション、将来拡張用） */
export const componentDescription: Record<string, string> = {
  "glass-surface":
    "Appleの最新デザイン言語にインスパイアされた、次世代のUIコンポーネントです。従来のグラスモーフィズムを進化させ、光の屈折やエッジの光沢、液体のような有機的な動きをリアルタイムで再現しました。物理ベースの高度な視覚効果を保ちつつ、軽量な実装でWebサイトに圧倒的な「質感」と「没入感」を与えます。",
  "code-block":
    "軽量・高機能なコード表示コンポーネント。ワンクリック・コピー、行番号表示、多言語対応。",
  "floating-circles": "色変更可能な動くグラデーション背景。マウス追従も可。",
  "matrix-code":
    "映画『マトリックス』の世界観を象徴する、緑色の文字が画面を上から下へと流れ落ちる視覚効果を再現した背景コンポーネントです。",
  webcam: "ブラウザカメラ配信コンポーネント。エラー処理・ref転送対応。",
  "radar-chart":
    "ラダーチャートコンポーネント。rechartsでデータを円形に表示します。",
  "theme-switch": "テーマ切り替えコンポーネント。ダークモードとライトモードを切り替えます。",
};

// Coming Soon セクション（既定: 日本語）
export const comingSoonTitle = "近日公開";
export const comingSoonDescription =
  "このコンポーネントのデモとコードは近日公開予定です。";

// コンポーネント一覧グリッドのカード説明文
export const componentGridItem = {
  viewDemo: "デモとコードを見る",
  comingSoon: "現在開発中です。公開まで今しばらくお待ちください。",
};

// 同カテゴリのコンポーネントラベル（コンポーネント詳細ページ）
export const relatedComponentsLabel = "同カテゴリのコンポーネント";

export const installationSectionTitle: string = "インストール";
export const installationSectionDescription: string =
  "お好きなパッケージマネージャーでコンポーネントをインストールしてください。";
