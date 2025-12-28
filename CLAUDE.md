# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# 開発サーバーの起動（Turbopack使用）
yarn dev

# 本番用ビルド
yarn build

# 本番用サーバー起動
yarn start

# Linting
yarn lint
```

## プロジェクト構成

このプロジェクトは、個人・企業のコーポレートサイトとブログ機能を持つNext.js 15アプリケーションです。

### 主要な技術スタック
- **フレームワーク**: Next.js 15（App Router）
- **TypeScript**: フル対応
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: Shadcn/ui
- **フォント**: Geist（Google Fonts）
- **マークダウン処理**: gray-matter + marked
- **構文ハイライト**: highlight.js

### ディレクトリ構造
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト（日本語設定、ヘッダー・フッター）
│   └── page.tsx           # メインページ（企業情報、サービス一覧、ブログ）
├── components/            # UIコンポーネント
│   ├── blog/             # ブログ関連コンポーネント
│   ├── Footer/           # フッターコンポーネント
│   ├── header/           # ヘッダーコンポーネント
│   ├── ProductCard/      # サービス紹介カード
│   └── ui/               # Shadcn/uiベースのUIコンポーネント
└── shared/               # 共通ライブラリ
    ├── lib/              # ユーティリティ関数
    │   ├── blog.ts       # ブログ投稿の取得・処理
    │   ├── markdown.ts   # マークダウン解析
    │   └── generateMetadataObject.ts # メタデータ生成
    └── types/            # TypeScript型定義
```

### ブログシステム
- マークダウンファイルは `src/content/blog/` に配置
- Front Matterでメタデータ管理（title, date, tags, summary, author, thumbnail, published）
- gray-matterでパース、markedでHTML変換
- 自動的な日付順ソート機能

### メタデータ管理
`generateMetadataObject.ts`で統一されたOGP設定を管理。デフォルト値：
- サイト名: wiscro
- URL: https://www.wiscro.app
- 言語: 日本語（ja_JP）

### スタイリング方針
- Tailwind CSSのユーティリティクラス中心
- レスポンシブデザイン対応（md:ブレークポイント使用）
- ブランドカラー: #ffb86a（テーマカラー）、#2F4A7B（メインテキスト）