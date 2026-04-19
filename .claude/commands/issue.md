---
description: wiscro の GitHub Issue を選択して実装から PR 作成までを行う
argument-hint: "[issue番号]"
---

# wiscro Issue 実装ワークフロー

`https://github.com/itizawa/wiscro/issues` の Issue を 1 件選び、実装から PR 作成までを行います。

引数 `$ARGUMENTS` が指定されていればその Issue 番号を対象にし、未指定なら open な Issue 一覧を表示してユーザーに対象を確認してください。

## 前提

- ベースブランチは **`develop`**（`main` ではない）。チェックアウト・PR 作成時は必ず `develop` を基準にすること。
- パッケージマネージャは **pnpm**。`pnpm dev` / `pnpm build` / `pnpm lint` を利用する。
- Next.js 15（App Router）+ TypeScript + Tailwind + Shadcn/ui 構成。
- バックエンド相当のロジック変更が含まれる場合、`~/.claude/CLAUDE.md` に従い **TDD**（失敗するテストを先にコミット → 実装）で進める。

## ワークフロー

### 1. Issue 特定
```bash
# 引数がない場合のみ
gh issue list --repo itizawa/wiscro --state open
```
- 依存関係がある Issue は依存元から着手する。
- 対象 Issue の内容を `gh issue view $ARGUMENTS --repo itizawa/wiscro` で取得し、受け入れ条件・技術的制約を整理する。

### 2. ブランチ準備
```bash
git checkout develop
git pull origin develop
# Issue 内容に沿った命名（例: feat/issue-123-add-xxx, fix/issue-123-yyy）
git checkout -b <type>/issue-$ARGUMENTS-<slug>
```

### 3. 実装計画
- タスクを以下の粒度に細分化し、それぞれ個別コミットにする:
  - 機能追加/修正
  - リファクタリング（機能追加と分離）
  - 設定ファイル変更
  - ドキュメント更新
- TDD 対象の場合は「テスト追加（失敗）」→「実装」→「リファクタ」の順でコミットを分ける。

### 4. 実装サイクル
各タスクごとに:
1. 最小限の変更で実装する
2. 関連ファイルのみを `git add` でステージング（`-A` や `.` は避ける）
3. Conventional Commits でコミット
   - `feat:` 新機能 / `fix:` バグ修正 / `refactor:` / `docs:` / `test:` / `chore:` / `style:`
4. 次のタスクへ

### 5. 品質チェック
```bash
pnpm lint
pnpm build      # 型エラー・ビルドエラーの最終確認
# テストスクリプトが存在する場合は実行
```
- すべて通過するまで修正を継続する。失敗時は原因を特定して修正（`--no-verify` 等でスキップしない）。

### 6. PR 作成
```bash
git push -u origin HEAD

gh pr create \
  --repo itizawa/wiscro \
  --base develop \
  --title "<簡潔なタイトル>" \
  --body "$(cat <<'EOF'
Closes #$ARGUMENTS

## Summary
- <変更点の要約を箇条書き>

## Test plan
- [ ] pnpm lint
- [ ] pnpm build
- [ ] <手動確認した項目>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
- PR description の **冒頭に必ず `Closes #$ARGUMENTS`** を記載すること。
- PR はマージせず、作成後に URL をユーザーに報告して終了する。

## 注意事項
- 破壊的操作（`git reset --hard` / `push --force` / ブランチ削除等）はユーザーの明示的な指示がない限り行わない。
- 秘密情報を含むファイル（`.env` など）をコミットしない。
- UI 変更を含む場合は `pnpm dev` で起動し、ブラウザで主要動線を確認した上で完了報告する。動作確認できない場合はその旨を明記する。
