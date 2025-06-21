# 企業お知らせ開発計画

## 概要

wiscoroの企業サイトにお知らせ機能を追加する開発計画。記事はMarkdownファイルで管理し、Next.js App Routerを使用して実装する。

## 技術スタック

- **フレームワーク**: Next.js 15.3.2 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **記事管理**: Markdown + Gray Matter
- **ビルド**: Turbopack

## ディレクトリ構造

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx           # お知らせ記事一覧ページ
│   │   └── [slug]/
│   │       └── page.tsx       # 個別記事詳細ページ
├── components/
│   ├── blog/
│   │   ├── BlogCard/
│   │   │   └── index.tsx      # 記事カードコンポーネント
│   │   ├── BlogList/
│   │   │   └── index.tsx      # 記事一覧表示コンポーネント
│   │   └── BlogPost/
│   │       └── index.tsx      # 記事詳細表示コンポーネント
├── shared/
│   ├── lib/
│   │   ├── blog.ts            # お知らせ関連のユーティリティ
│   │   └── markdown.ts        # Markdown処理関数
│   └── types/
│       └── blog.ts            # お知らせ記事の型定義
└── content/
    └── blog/                  # Markdownファイル格納ディレクトリ
        ├── 2024-12-21-blog-start.md
        └── 2024-12-22-tech-stack.md
```

## 開発フェーズ

### フェーズ 1: 基盤構築 ✅

- [x] docs/ディレクトリを作成してプラン文書を作成する
- [x] Markdown処理ライブラリの追加
  - [x] `gray-matter` (frontmatter解析)
  - [x] `marked` (Markdown → HTML)
  - [x] `highlight.js` (シンタックスハイライト)
- [x] TypeScript型定義の作成
- [x] ユーティリティ関数の実装

### フェーズ 2: コンポーネント開発 ✅

- [x] BlogCard コンポーネントの作成
  - [x] 記事タイトル、概要、日付、タグ表示
  - [x] 既存のProductCardスタイルとの統一
- [x] BlogList コンポーネントの作成
  - [x] 記事一覧のグリッドレイアウト
- [x] BlogPost コンポーネントの作成
  - [x] Markdownコンテンツの表示
  - [x] 記事メタデータの表示
  - [x] シンタックスハイライト対応

### フェーズ 3: ページ実装 ✅

- [x] `/blog` ページの作成
  - [x] 記事一覧の表示
- [x] `/blog/[slug]` ページの作成
  - [x] 動的ルーティング設定
  - [x] 記事詳細表示
- [x] ナビゲーション更新
  - [x] Headerにお知らせリンク追加

### フェーズ 4: 最適化・SEO対応 ✅

- [x] SEO最適化
  - [x] メタタグ設定
  - [x] OGP設定
- [x] パフォーマンス最適化
  - [x] 静的生成設定
- [x] レスポンシブ対応確認

### フェーズ 5: テスト・検証 ✅

- [x] テスト記事の作成
  - [x] サンプル記事（3記事）
  - [x] コードブロック付き記事
- [x] 動作確認
  - [x] 記事一覧表示
  - [x] 記事詳細表示
  - [x] レスポンシブ確認
- [x] lint・typecheck実行

## 記事メタデータ構造

```yaml
---
title: "記事タイトル"
date: "2024-12-21"
tags: ["技術", "Next.js", "TypeScript"]
summary: "記事の概要文。一覧ページで表示される。"
author: "市澤 樹享"
thumbnail: "/blog/images/thumbnail.jpg" # オプション
published: true # 公開状態
---
```

## 必要なパッケージ

```bash
npm install gray-matter marked highlight.js
npm install --save-dev @types/marked
```

## 開発開始日

2024年12月21日

## 担当者

市澤 樹享

---

## 進捗メモ

- [x] 2024-12-21: プラン策定完了
- [x] 2024-12-21: 基盤構築完了
- [x] 2024-12-21: コンポーネント開発完了
- [x] 2024-12-21: ページ実装完了
- [x] 2024-12-21: 最適化・SEO対応完了
- [x] 2024-12-21: テスト・検証完了
- [x] ✅ **お知らせ機能実装完了！**

## 実装結果

### 📁 作成されたファイル構造
```
src/
├── app/blog/
│   ├── page.tsx                    # お知らせ一覧ページ
│   └── [slug]/page.tsx            # 記事詳細ページ
├── components/blog/
│   ├── BlogCard/index.tsx         # 記事カードコンポーネント
│   ├── BlogList/index.tsx         # 記事一覧コンポーネント
│   └── BlogPost/index.tsx         # 記事詳細コンポーネント
├── shared/
│   ├── lib/
│   │   ├── blog.ts               # お知らせ関連ユーティリティ
│   │   └── markdown.ts           # Markdown処理
│   └── types/blog.ts             # 型定義
└── content/blog/                  # Markdown記事ファイル
    ├── 2024-12-21-blog-start.md
    ├── 2024-12-22-nextjs-performance.md
    └── 2024-12-23-tech-stack-introduction.md
```

### ⚡ パフォーマンス
- 静的生成（SSG）対応により高速表示
- シンタックスハイライト対応
- レスポンシブデザイン

### 🔧 追加された依存関係
```json
{
  "gray-matter": "^4.0.3",
  "highlight.js": "^11.11.1", 
  "marked": "^15.0.12"
}
```

### 🚀 使用方法
1. `src/content/blog/` に Markdown ファイルを配置
2. frontmatter でメタデータを設定
3. ビルド時に自動的に静的ページが生成される

### 📱 アクセス方法
- お知らせ一覧: `/blog`
- 個別記事: `/blog/{記事のslug}`
- ヘッダーからもアクセス可能
