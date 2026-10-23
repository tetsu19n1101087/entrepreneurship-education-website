# Entrepreneurship Education Website - Agent Guidelines

## プロジェクト概要

起業家教育の事例を共有・検索できる教員向けのプラットフォーム（Next.js App Router実装）。

## 絶対に守る制約

- **コンポーネント構成**: UIコンポーネントは `shadcn/ui` をベースとし、追加スタイリングは Tailwind CSS を用いること。
- **画像最適化**: 画像を表示する際は必ず `next/image` の `<Image>` を用いて自動最適化の恩恵を受けること。
- **型付け**: `tsconfig.json` の厳格なルール (`noUnusedLocals`, `noImplicitReturns` 等) に従うこと。
- **コミット・整形**: コミット時に Husky + lint-staged を通じて ESLint と Prettier が走ります。コードフォーマットエラーや未使用変数はコミット前に修正してください。
- **コミットの事前確認**: AIが勝手にGitコミットやPushを実行してはいけません。コミットを実行する前に、必ずユーザーに確認を取り、許可を得ること。
- **データベース**: Supabase をバックエンドとし、DBアクセスや認証は `lib/supabase/` 以下のクライアントを使用すること。

## ブランチ運用（Git Flow）

Git Flow で運用する。`main` と `develop` へ直接コミットせず、必ず作業ブランチで作業してからマージすること。

- `main` へのマージは、必ず Pull Request を通して行う。
- `develop` へのマージは、Pull Request を通すか、ローカルで `git merge --no-ff` してから Push するかのどちらでもよい。

### 常設ブランチ

- `main` : 本番リリース用。常にリリース可能な状態を保つ。
- `develop` : 開発の統合ブランチ（GitHub のデフォルトブランチ）。次回リリースに向けた変更をここに集める。

### 作業ブランチ

| 種類    | 分岐元    | マージ先            | 命名規則                     | 例                       |
| ------- | --------- | ------------------- | ---------------------------- | ------------------------ |
| feature | `develop` | `develop`           | `feature/<Issue番号>-<概要>` | `feature/41-update-home` |
| release | `develop` | `main` と `develop` | `release/<バージョン>`       | `release/1.0.0`          |
| hotfix  | `main`    | `main` と `develop` | `hotfix/<Issue番号>-<概要>`  | `hotfix/50-fix-login`    |

- 新機能・修正・ドキュメント更新など通常の作業は、すべて `develop` から `feature/*` を切って行う。
- リリース時は `develop` から `release/*` を切り、最終調整のうえ `main` へマージする。マージ後は `main` に `v<バージョン>` のタグを付け、`release/*` を `develop` にもマージして差分を戻す。
- 本番の緊急修正は `main` から `hotfix/*` を切り、`main` と `develop` の両方へマージする。
- マージ済みの作業ブランチは削除する。

### AIエージェントへの指示

- 作業を始める前に `develop` を最新化し、そこから `feature/*` ブランチを作成すること。`main` から分岐しないこと。
- feature を `develop` へ取り込むときは、Pull Request（ベースは `develop`）とローカルマージのどちらにするかをユーザーに確認すること。ローカルマージする場合も、マージと Push の前にユーザーの許可を得ること。
- release・hotfix の Pull Request は、ベースブランチに `main` を指定すること。
- Push は許可していない。コミットしたら、ユーザーが実行する Push 用のコマンド（例: `git push -u origin feature/41-update-home`）を提示すること。
- 作業ブランチの Push 後は、Pull Request を作成すること。
- 作業中に新たな問題が見つかったときは、Issue を作成して内容を記述すること。

## よく使うコマンド

- `yarn dev` : 開発サーバー起動
- `yarn build` : 本番ビルド
- `yarn lint` : ESLint実行
- `yarn format` : Prettierフォーマット（手動）
- `npx supabase start` : ローカルのSupabaseコンテナ起動
- `npx supabase stop` : ローカルSupabaseコンテナ停止

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
