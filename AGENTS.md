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

## よく使うコマンド

- `yarn dev` : 開発サーバー起動
- `yarn build` : 本番ビルド
- `yarn lint` : ESLint実行
- `yarn format` : Prettierフォーマット（手動）
- `npx supabase start` : ローカルのSupabaseコンテナ起動
- `npx supabase stop` : ローカルSupabaseコンテナ停止
