# Supabase マイグレーションの本番適用

`supabase/migrations/` のマイグレーションは、GitHub Actions の [Supabase migrate](../.github/workflows/supabase-migrate.yml) で本番 Supabase に適用する。

- develop へのマージ（push）で `supabase/migrations/` が変わったとき、自動で `supabase db push` を実行して本番に適用する
- Preview と本番は同じ Supabase プロジェクトを使っている。develop にマージした時点で Preview のコードは新しいスキーマを前提に動くため、適用のタイミングも develop へのマージに合わせている
- main へのマージでは実行しない（develop で適用済みのため）

## マイグレーションを追加するとき

- マージした時点で本番に適用される。PR のレビューで、本番のデータに対して安全か（既存データで制約違反にならないか、ロックの長い変更がないか）を確認する
- 適用前に流れる内容を確かめたいときは、手動で dry run を実行する（下記）

## 手動実行（dry run）

Actions の「Supabase migrate」→ Run workflow、または CLI で実行する。

```sh
gh workflow run supabase-migrate.yml --ref develop -f dry_run=true
```

- 入力 `dry_run` は既定で `true`。`true` なら `supabase db push --dry-run` で流れるマイグレーションを表示するだけ、`false` で実際に適用する
- ログの `Show migration history` で本番の適用履歴、`Push migrations (dry run)` で流れる予定のマイグレーションを確認できる

## 設定（Secrets・Variables）

GitHub の Settings → Environments → `Preview` に次の Secrets と Variables を登録する。必要なら Required reviewers を設定すると、適用の前に承認を挟める。

- workflow は develop で動くので、Vercel の Preview と同じ `Preview` environment を使う。`Production` は Vercel の本番デプロイ（main）用
- environment が Preview でも、適用先の Supabase プロジェクトは本番と共有している（`SUPABASE_PROJECT_ID` で指定）

| 種類     | 名前                    | 値                                                                       |
| -------- | ----------------------- | ------------------------------------------------------------------------ |
| Secret   | `SUPABASE_ACCESS_TOKEN` | Supabase のアクセストークン（下記）                                      |
| Secret   | `SUPABASE_DB_PASSWORD`  | 本番 DB の `postgres` ユーザーのパスワード（下記）                       |
| Variable | `SUPABASE_PROJECT_ID`   | 本番プロジェクトの project ref（ダッシュボード URL の `/project/` 以降） |

project ref は秘密情報ではない（Supabase の URL にも含まれる）ので、Variable にしている。

### アクセストークン

[Account → Access Tokens](https://supabase.com/dashboard/account/tokens) で発行する。値は発行時にしか表示されない。

- Scoped token にし、対象を本番プロジェクトだけに絞る
- 権限はすべて Read で、Project Settings・API Keys・API Key Secrets・Connection Pooling を付ける
  - Connection Pooling がないと、`supabase link` が IPv4 用の接続先（pooler）を取得できず、`migration list` が `IPv6 is not supported on your current network` で失敗する（GitHub Actions は IPv6 を使えない）
- 期限を付けた場合は、切れる前に発行し直して Secret を上書きする。切れると `Link project` で失敗する

### DB パスワード

Project Settings → Database の「Reset database password」で設定し直せる。アプリ（supabase-js）は DB パスワードを使っていないので、リセットしても影響はない。

GitHub の画面から登録する（ターミナルの `gh secret set` で入力すると、改行や空の値が入りやすい）。値が違うと `password authentication failed for user "postgres"` で失敗する。

## 失敗したとき

- 失敗したマイグレーションは適用済みとして記録されない。ログのエラーと `migration list` で本番の状態を確認し、原因を直してから、修正のマイグレーションをマージするか手動で再実行する
- 自動のロールバックはない。適用済みの変更を戻す場合は、戻すためのマイグレーションを新しく追加する

## 適用履歴がファイルと合っていないとき

本番を手作業で変更したり、マイグレーションを使わずに適用したりすると、`supabase_migrations.schema_migrations` の記録がファイルと合わなくなる。その状態で `db push` すると、適用済みのマイグレーションを流そうとして失敗する。

1. ローカルで本番の適用履歴とスキーマの差分を確認する

   ```sh
   npx supabase link --project-ref <project-ref>
   npx supabase migration list
   npx supabase db diff --linked --schema public
   ```

   `migration list` の `Remote` 列が空の行が、本番に未適用のマイグレーション。

2. スキーマはすでに本番にあるのに記録がないマイグレーションは、適用済みとして記録だけを合わせる

   ```sh
   npx supabase migration repair --status applied <version>
   ```

   2026-10 に、本番より後に作った `20261004000000_init_schema.sql` をこの手順で記録した（#61）。
