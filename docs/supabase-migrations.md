# Supabase マイグレーションの本番適用

`supabase/migrations/` のマイグレーションは、GitHub Actions の [Supabase migrate](../.github/workflows/supabase-migrate.yml) で本番 Supabase に適用する。

- 実行は手動（Actions タブの「Run workflow」）のみ。マージしても自動では適用されない
- 入力 `dry_run` は既定で `true`。`true` なら `supabase db push --dry-run` で流れるマイグレーションを表示するだけ、`false` で実際に適用する
- Preview と本番は同じ Supabase プロジェクトを使っている。develop にマージした時点で Preview のコードは新しいスキーマを前提に動くため、マージ後は早めに適用する

## 初回適用前の手順

本番のデータはマイグレーションファイル（`20261004000000_init_schema.sql`）より前からあるため、適用履歴がファイルと合っていない可能性がある。履歴が合っていないまま `db push` すると、`init_schema` から流そうとして失敗したり、既存のスキーマを壊したりするおそれがある。

1. ローカルで本番の適用履歴を確認する

   ```sh
   npx supabase link --project-ref <project-ref>
   npx supabase migration list
   ```

   `Remote` 列が空の行が、本番に未適用のマイグレーション。

2. `init_schema` が未記録なら（スキーマ自体は本番にある場合）、適用済みとして記録だけを合わせる

   ```sh
   npx supabase migration repair --status applied 20261004000000
   ```

   もう一度 `migration list` を実行し、未適用が適用したいもの（`20261022000000`、`20261022100000` など）だけになっていることを確認する。

3. GitHub の Settings → Environments に `production` を作り、必要なら Required reviewers を設定する。同じ画面（または Settings → Secrets and variables → Actions）で次の Secrets を登録する

   | Secret                  | 値                                                                       |
   | ----------------------- | ------------------------------------------------------------------------ |
   | `SUPABASE_ACCESS_TOKEN` | Supabase の Account → Access Tokens で発行したトークン                   |
   | `SUPABASE_DB_PASSWORD`  | 本番 DB のパスワード                                                     |
   | `SUPABASE_PROJECT_ID`   | 本番プロジェクトの project ref（ダッシュボード URL の `/project/` 以降） |

4. Actions の「Supabase migrate」を `dry_run: true` で実行し、ログの `migration list` と `db push --dry-run` で、流れるマイグレーションが想定どおりか確認する

5. 問題なければ `dry_run: false` で実行して本適用する

## 失敗したとき

- 失敗したマイグレーションは適用済みとして記録されない。ログのエラーと `migration list` で本番の状態を確認し、原因を直してから再実行する
- 自動のロールバックはない。適用済みの変更を戻す場合は、戻すためのマイグレーションを新しく追加する
