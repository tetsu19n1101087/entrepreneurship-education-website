---
version: alpha
name: 千葉県アントレプレナーシップ教育事例共有プラットフォーム
description: 千葉県の小中高教員が実践事例を共有・検索するための、落ち着いた信頼感のある教育向け UI
colors:
  primary: '#10648F'
  on-primary: '#FFFFFF'
  primary-subtle: '#E5F2FF'
  on-primary-subtle: '#00344E'
  secondary: '#006A60'
  on-secondary: '#FFFFFF'
  background: '#EFF1F5'
  foreground: '#191C1F'
  surface: '#FFFFFF'
  surface-hover: '#EFF1F5'
  muted-foreground: '#5C5F62'
  inverse: '#2C2C2C'
  on-inverse: '#FFFFFF'
  border: '#E1E2E6'
  input-border: '#8E9194'
  focus: '#10648F'
  skeleton: '#C9E6FF'
  disabled: '#E1E2E6'
  on-disabled: '#8E9194'
  destructive: '#AB3140'
  on-destructive: '#FFFFFF'
  destructive-subtle: '#FFEDEC'
typography:
  heading-xl:
    fontFamily: Noto Sans JP
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.57
    letterSpacing: 0.04em
    fontFeature: '"palt"'
  heading-lg:
    fontFamily: Noto Sans JP
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: 0.04em
    fontFeature: '"palt"'
  heading-lg-wide:
    fontFamily: Noto Sans JP
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: 0.1em
    fontFeature: '"palt"'
  heading-md:
    fontFamily: Noto Sans JP
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.75
    letterSpacing: 0.04em
    fontFeature: '"palt"'
  body-md:
    fontFamily: Noto Sans JP
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: 0em
  body-sm:
    fontFamily: Noto Sans JP
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.71
    letterSpacing: 0em
  body-xs:
    fontFamily: Noto Sans JP
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.67
    letterSpacing: 0em
  label-md:
    fontFamily: Noto Sans JP
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.71
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Noto Sans JP
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0em
  button-lg:
    fontFamily: Noto Sans JP
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0em
  button-sm:
    fontFamily: Noto Sans JP
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0em
  meta-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.67
    letterSpacing: 0em
rounded:
  md: 8px
  full: 9999px
spacing:
  space-4: 4px
  space-8: 8px
  space-16: 16px
  space-24: 24px
  space-32: 32px
  space-48: 48px
  space-64: 64px
  space-80: 80px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.button-sm}'
    rounded: '{rounded.full}'
    height: 40px
    padding: 8px 16px
  button-outline:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.button-sm}'
    rounded: '{rounded.full}'
    height: 40px
    padding: 8px 16px
  button-ghost:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.button-sm}'
    rounded: '{rounded.full}'
    height: 40px
    padding: 8px 16px
  button-ghost-hover:
    backgroundColor: '{colors.surface-hover}'
    textColor: '{colors.foreground}'
  button-destructive:
    backgroundColor: '{colors.destructive}'
    textColor: '{colors.on-destructive}'
    typography: '{typography.button-sm}'
    rounded: '{rounded.full}'
    height: 40px
    padding: 8px 16px
  input:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 4px 16px
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.md}'
    padding: 24px
  card-description:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.muted-foreground}'
    typography: '{typography.body-sm}'
  skeleton:
    backgroundColor: '{colors.skeleton}'
    rounded: '{rounded.md}'
  badge-tag:
    backgroundColor: '{colors.primary-subtle}'
    textColor: '{colors.on-primary-subtle}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.md}'
    padding: 4px 8px
  stat-icon-tile:
    backgroundColor: '{colors.primary-subtle}'
    textColor: '{colors.primary}'
    rounded: '{rounded.md}'
    size: 48px
  header:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    padding: 16px
  footer:
    backgroundColor: '{colors.inverse}'
    textColor: '{colors.on-inverse}'
    padding: 24px
---

## Overview

千葉県の小学校・中学校・高等学校の教員が、アントレプレナーシップ教育の実践事例を投稿・検索・コメントし合うためのプラットフォーム。利用者は IT に詳しいとは限らない現場の先生方なので、装飾よりも「読みやすさ」「迷わなさ」「公的機関らしい信頼感」を優先する。

トーンは落ち着いた青を基調にした、清潔で控えめなもの。主張の強いグラデーションや派手なアニメーションは使わず、白いカードを青みのある淡いグレーの背景に並べる構成で情報を整理する。

実装は Next.js App Router + shadcn/ui（`new-york` スタイル）+ Tailwind CSS v4。トークンの出どころは次のとおり。

- **色・文字・余白・角丸**: `tokens/tokens.json` が正。`yarn tokens`（`tokens/build.mjs`）で次の3つを生成する。値を変えるときは tokens.json を直して生成し直し、この文書にも反映する（2026-10-19 時点）。
  - `app/tokens.css`: アプリが読み込む CSS（色の CSS 変数、テキストスタイル、余白、角丸）。手で編集しない
  - `tokens/dist/figma-tokens.json`: Figma の Token Import プラグインで読み込む JSON
  - `tokens/dist/preview.html`: 色と文字を目で確認する一覧ページ
- **生成の確認**: コミット時に lint-staged が `tokens/` か `app/tokens.css` の変更を見つけると、生成し直した結果と比べる。違えば（生成し忘れ・手編集）コミットが止まるので、`yarn tokens` を実行する。アプリのビルドは生成済みの `app/tokens.css` だけを読み、`tokens/` には依存しない

新しい UI を作るときは、hex や px を直書きせず、`bg-primary` `text-muted-foreground` のような Tailwind のセマンティッククラスやテーマのトークンを使うこと。Figma のバリアブル名と CSS 変数の対応は Colors 節の対応表を見る。

### 実装との差分

この文書は Figma に合わせた「目標のデザイン」を表している。文字・色・余白・角丸・ボタンのサイズは、既存の画面もトークンのクラスに置き換え済み（2026-10-19）。Tailwind 標準の文字サイズ（`text-xs` など）と角丸（`rounded-lg` など）は `css.reset` で無効化しているので使えない。残っている差分は次のとおり。

- **日付の表記**: 投稿日などは meta-sm（`text-meta-sm font-en`）で表示しているが、値は `toLocaleDateString('ja-JP')` のままで `2026/10/15` の形になっている。`2026.10.15` の形に変える。
- **トップページ**: Figma のデザインで作り直す（別タスク）。

## Colors

色は Figma のバリアブルで3層に分けて定義している。画面の色は必ず「用途別」の層から選ぶ。

- **プリミティブ（`PrimitiveColor`）**: 色見本。blue・teal・gray・red と、学校種別用の yellow・mint・periwinkle・rose をそれぞれ 25〜900 の 11 段階で持つ（ほかに white #FFFFFF と charcoal #2C2C2C）。blue・teal・gray は Material Theme Builder（シード #1B4965）の色見本から作った。Figma では色の候補に出さない。
- **エイリアス（`AliasColor`）**: 役割の名前でプリミティブを指す層（`primary/600` → blue/600 など）。役割は primary（blue）・secondary（teal）・neutral（gray）・danger（red）・学校種別4色。ブランドや学校種別の色を差し替えるときは、ここの参照先だけを変える。
- **用途別（`SemanticColor`）**: `bg/*` `text/*` `border/*` `icon/*` の4種類。必ずエイリアスを参照する。Figma では bg は塗り、text は文字の塗り、border は線、icon は図形の塗りと線の候補にだけ出る。

例外として、ロゴはエイリアスの `primary/600` を直接使う（ヘッダー上。フッター上では `neutral/white`）。

### 主な色

- **Primary (#10648F)**: 落ち着いた青（blue/600）。主要ボタン、リンク（下線付き）、アイコン、フォーカスリング、ロゴ。画面内の「次に押すべきもの」を示す唯一の強い色。
- **Primary subtle (#E5F2FF) / On primary subtle (#00344E)**: タグのバッジと統計カードのアイコンタイルの背景、タグの文字。
- **Secondary (#006A60)**: 青緑（teal/600）。副次ボタン用だが、使いどころは保留。
- **Background (#EFF1F5) / Surface (#FFFFFF)**: ページ背景は青みのある淡いグレー、カード・ヘッダー・ポップオーバーは白。この差でカードの境界を表現する。
- **Foreground (#191C1F) / Muted foreground (#5C5F62)**: 本文と見出し、説明文・日付・学校名などの補足情報。
- **Inverse (#2C2C2C)**: フッターなどの暗い面。上に置く文字とリンクは白（リンクは下線で示す）。
- **Border (#E1E2E6) / Input border (#8E9194)**: カードや区切り線、入力欄の枠。
- **Skeleton (#C9E6FF)**: 読み込み中のスケルトン。
- **Disabled (#E1E2E6) / On disabled (#8E9194)**: 無効なボタン・入力欄の背景と文字。
- **Destructive (#AB3140) / Destructive subtle (#FFEDEC)**: 削除ボタン、入力エラーの枠と文字、エラーボックスの背景。

ホバーの表現は次のとおり。

- 主要・副次・削除ボタン: 背景と文字を反転する（白背景に元の色の文字と枠）。そのためボタンには塗りと同じ色の 1px の枠を付ける。
- outline / ghost ボタン、サイドバーの絞り込み: 背景を bg/surface/hover（#EFF1F5）にする。
- メニュー項目とヘッダーのナビ: 文字色だけ primary に変える。背景と下線は変えない。

### アイコンの色

アイコンは `icon/*` で塗る。text/\* は Figma で文字の塗りの候補にしか出ないため、アイコン（ベクターの塗り・線）用に分けている。値は対応する文字色と同じ。

- `icon/default`（#191C1F）: 標準のアイコン
- `icon/muted`（#5C5F62）: 補足のアイコン（日時・件数の横など）
- `icon/primary`（#10648F）: 強調するアイコン（通知、統計カードのアイコンタイル）、主要ボタンのホバー時
- `icon/inverse`（#FFFFFF）: 塗りのボタン（主要・副次・削除）の中のアイコン、フッターのアイコン
- `icon/destructive`（#AB3140）: 削除・エラーのアイコン、削除ボタンのホバー時
- `icon/disabled`（#8E9194）: 無効な部品の中のアイコン
- `icon/elementary` `icon/junior-high` `icon/high-school` `icon/other-school`: 学校種別のバッジの中のアイコン（文字と同じ各色の 700）

コードでは CSS 変数を追加しない。lucide-react のアイコンは `currentColor` で文字色を引き継ぐので、同じ値の text-\* クラスで色を決める（`icon/primary` → `text-primary`、`icon/muted` → `text-muted-foreground` など）。

### 対応表（Figma → CSS 変数）

shadcn/ui の CSS 変数名はそのまま使い、値に用途別のバリアブルを入れる。shadcn にない色は新しい変数を追加する。

| CSS 変数                                   | Figma のバリアブル            | 値      |
| ------------------------------------------ | ----------------------------- | ------- |
| `--background`                             | `bg/default`                  | #EFF1F5 |
| `--foreground`                             | `text/default`                | #191C1F |
| `--card` `--popover`                       | `bg/surface/default`          | #FFFFFF |
| `--card-foreground` `--popover-foreground` | `text/default`                | #191C1F |
| `--primary`                                | `bg/primary/default`          | #10648F |
| `--primary-foreground`                     | `text/primary/on-primary`     | #FFFFFF |
| `--secondary`                              | `bg/secondary/default`        | #006A60 |
| `--secondary-foreground`                   | `text/secondary/on-secondary` | #FFFFFF |
| `--muted`                                  | `bg/default`                  | #EFF1F5 |
| `--muted-foreground`                       | `text/muted`                  | #5C5F62 |
| `--accent`                                 | `bg/surface/hover`            | #EFF1F5 |
| `--accent-foreground`                      | `text/default`                | #191C1F |
| `--destructive`                            | `bg/destructive/default`      | #AB3140 |
| `--border`                                 | `border/default`              | #E1E2E6 |
| `--input`                                  | `border/input`                | #8E9194 |
| `--ring`                                   | `border/focus`                | #10648F |
| `--primary-subtle`（追加）                 | `bg/primary/subtle`           | #E5F2FF |
| `--on-primary-subtle`（追加）              | `text/primary/on-subtle`      | #00344E |
| `--inverse`（追加）                        | `bg/inverse`                  | #2C2C2C |
| `--skeleton`（追加）                       | `bg/skeleton`                 | #C9E6FF |
| `--destructive-subtle`（追加）             | `bg/destructive/subtle`       | #FFEDEC |
| `--disabled`（追加）                       | `bg/disabled`                 | #E1E2E6 |
| `--disabled-foreground`（追加）            | `text/disabled`               | #8E9194 |

`--chart-1`〜`--chart-5` は未使用のため対象外。

### コントラスト比

ライトモード、WCAG 2.2 の計算式。文字は 4.5:1、入力欄の枠などの UI 部品は 3:1 が基準で、すべて満たしている。

- foreground / background: 15.1:1（surface 上は 17.1:1）
- muted-foreground / background: 5.7:1（surface 上は 6.4:1）
- on-primary / primary: 6.5:1
- primary の文字 / background: 5.7:1（surface 上は 6.5:1）
- on-primary-subtle / primary-subtle: 11.5:1
- on-secondary / secondary: 6.5:1
- on-destructive / destructive: 6.5:1
- destructive の文字 / destructive-subtle: 5.7:1
- on-inverse / inverse: 14.0:1
- input-border / surface: 3.2:1
- 学校種別のバッジの文字 / 背景: 8.2〜8.3:1
- アイコン（基準 3:1）: icon/default 15.1:1、icon/muted と icon/primary 5.7:1（background 上）、icon/inverse 6.5:1（primary 上）、icon/destructive 6.5:1（surface 上）、学校種別 8.2〜8.3:1

### 学校種別の色

学校種別ごとに、背景・文字・枠の3色を用途別のバリアブルで持つ。CSS 変数も同じ名前で追加する（例: `--elementary-subtle`）。

- 小学校（`elementary`）: 黄。背景 `bg/elementary/subtle`（#FFF0C1）、文字 `text/elementary`（#544600）、枠 `border/elementary`（#E8C400）
- 中学校（`junior_high`）: ミント。背景 #CBFBEE、文字 #214E45、枠 #A1D0C4
- 高等学校（`high_school`）: ペリウィンクル。背景 #EEF0FF、文字 #204291、枠 #B3C5FF
- その他: ローズ。背景 #FFEDEA、文字 #5E3F3A、枠 #E8BCB5

### エラー表示の色

フォームのエラーメッセージ（ログイン、新規登録、投稿、コメント）は、背景 `bg/destructive/subtle`（#FFEDEC）、文字 `text/destructive/default`（#AB3140）、角丸 8px、`text-body-sm` のボックスで表示する。内側の余白は 16px（`p-4`）。現行コードの `text-red-600 bg-red-50 p-3` は置き換える。

### ダークモード

ダークモードは対象外。`app/globals.css` には `.dark` 用のトークンも定義されているが、`ThemeProvider` がレイアウトに組み込まれていないため有効になっていない。ライトモードだけを前提にデザインしてよい。

## Typography

フォントは Figma のバリアブル `font-family/ja`（Noto Sans JP）と `font-family/en`（Inter）の2つ。日本語は Noto Sans JP、英数字は Inter で表示する。CSS では `font-family: Inter, "Noto Sans JP", sans-serif` のように Inter を先に指定し、Inter にない日本語の文字を Noto Sans JP で表示させる。Figma のテキストスタイルはフォントを1つしか持てないので、ほとんどのスタイルは `font-family/ja` を使い、日本語を含まない日時・数字用の meta 系統だけ `font-family/en` を使う。

文字サイズは Figma のバリアブル `font-size/*` の5段階だけを使う。任意の値（`text-[15px]` など）は使わない。

- `font-size/50`: 12px
- `font-size/75`: 14px
- `font-size/100`: 16px
- `font-size/200`: 20px
- `font-size/300`: 28px

太さは `font-weight/normal`（400）と `font-weight/bold`（700）の2種類だけ。行の高さは単位なしの倍率で指定し、文字サイズ × 倍率（テキストボックスの高さ）が4の倍数になる値にする。倍率は文字サイズごとに1つで、heading / body / label で共通。例外は1行で使う label-sm と button の系統で、倍率 1。

- 12px: 1.67（20px）
- 14px: 1.71（24px）
- 16px: 1.75（28px）
- 20px: 1.6（32px）
- 28px: 1.57（44px）

倍率は小数第2位までなので、実際の高さは 20.04px のようにわずかにずれるが、表示上は4の倍数として扱う。Figma のテキストスタイルにも同じ倍率（167% など）を設定し、line-height のバリアブルは作らない。

字間（letter spacing）は、見出しとナビだけを少し広げ、ほかは 0 にする。同じサイズでも用途によって字間を変えたいときは、値を上書きせずに別のスタイル（`-wide`）を作る。Figma ではテキストスタイルに % で直接設定し、コードでは同じ値を em に換算して書く（10% = 0.1em）。Figma のバリアブルは px でしか紐づかないため、字間のバリアブルは作らない。

- heading-xl / heading-lg / heading-md: 4%（0.04em）
- heading-lg-wide: 10%（0.1em）。トップページのセクション見出しだけに使う
- label-md: 2%（0.02em）
- body-md / body-sm / body-xs / label-sm / button-sm / button-lg / meta-sm: 0%

見出し（heading-xl / heading-lg / heading-lg-wide / heading-md）には、OpenType 機能の palt（プロポーショナル幅の約物・かな）を当てて、日本語の字面を詰める。字間（4% / 10%）は palt なしで決めた値なので、画面に当てて見直す。本文には当てない（長い文章では等幅の方が読みやすい）。

- Figma: テキストスタイルの「Type details」→「Details」で palt をオンにする。Plugin API が OpenType 機能を書き込めないため、`tokens/tokens.json` には `openTypeFeatures: ["palt"]` として記録するが、Figma 用 JSON には含まれない。スタイルを作り直したときは手作業で設定し直す
- コード: Tailwind v4 の `--text-*` は font-feature-settings を持てないので、`app/globals.css` で見出しのクラスに当てる

### テキストスタイル

文字の指定は、サイズ・太さ・行の高さ・字間をまとめた「テキストスタイル」で行う。系統は heading（見出し）・body（本文）・label（UI の見出しラベルやバッジ）・button（ボタン）・meta（日時・数字）の5つで、サイズの段階は `xl` `lg` `md` `sm` `xs` で表す。`md` は標準の段階を指す。button だけはボタンのサイズ（小・大）に合わせて `sm` と `lg` の2段階にする。meta は今のところ `sm` だけ。

- **heading-xl（28px / bold / 1.57 / 4% / palt）**: ページ見出し（h1）と統計カードの数値。h1 はホームのサイトタイトルなど、1ページに1つ。
- **heading-lg（20px / bold / 1.6 / 4% / palt）**: 事例カードのタイトル、ヘッダーのサイト名。
- **heading-lg-wide（20px / bold / 1.6 / 10% / palt）**: Figma のテキストスタイル `heading/lg-wide`。トップページのセクション見出し（`CardTitle` の「学校種別」「教科・領域」など）。字間が広いので、記事の中では使わない。
- **heading-md（16px / bold / 1.75 / 4% / palt）**: 記事・ページ内の見出し（事例詳細の本文中の見出しなど）。
- **body-md（16px / regular / 1.75 / 0%）**: 本文の標準。`<body>` に指定し、クラスを付けない文字はこのスタイルになる。事例詳細の本文、ページ見出し直下の説明文など、読ませる文章に使う。
- **body-sm（14px / regular / 1.71 / 0%）**: 情報が詰まった UI の文字。カードの説明文、フォームのラベル、サイドバーなど。
- **body-xs（12px / regular / 1.67 / 0%）**: 学校名などの日本語の補足情報。日付や件数の数字は meta-sm を使う。
- **label-md（14px / bold / 1.71 / 2%）**: UI の見出しラベル。ヘッダーのナビ、メニュー項目、メニューの見出し、タブなど。フォームのラベルは body-sm を使う。
- **label-sm（12px / regular / 1 / 0%）**: Figma のテキストスタイル `label/sm`。バッジのように1行で収まるラベル専用。行の高さが文字サイズと同じなので、複数行になる文章には使わない。
- **button-sm（12px / bold / 1 / 0%）**: 小ボタンのラベル。ボタンは基本このサイズ。
- **button-lg（20px / bold / 1 / 0%）**: 大ボタンのラベル。使う場面は画面のデザイン時に決める。
- **meta-sm（Inter / 12px / bold / 1.67 / 0%）**: Figma のテキストスタイル `meta/sm`（フォントは `font-family/en`）。記事カードの日時、事例詳細の投稿日・更新日、いいね数・コメント数などの数字。日付は `2026.10.15` の形で書く。Inter には日本語の文字がないので、「件」「年」などの日本語を含むものには使わない。コードでは必ず `font-en` と一緒に指定する（`class="text-meta-sm font-en"`）。

使い分けに迷ったら、文章として読ませるものは body-md、一覧やフォームの中で並ぶものは body-sm を選ぶ。

実装では、`app/tokens.css`（生成）の `@theme` に Tailwind v4 の `--text-*` として定義し、`text-heading-lg` のように1クラスでサイズ・太さ・行の高さが揃うようにする。Tailwind 標準の `text-xs`〜`text-3xl` は `--text-*: initial` で無効化し、使えないようにする。

```css
@theme {
  --text-*: initial;
  --text-heading-lg: 1.25rem;
  --text-heading-lg--line-height: 1.6;
  --text-heading-lg--font-weight: 700;
  --text-heading-lg--letter-spacing: 0.04em;
  /* 他のスタイルも同様に定義する */

  /* 欧文フォント。meta 系統と一緒に使う（--text-* ではフォントを指定できないため） */
  --font-en: var(--font-inter), sans-serif;
}

/* 見出しだけ palt を当てる（--text-* では指定できないため）。生成時に @layer utilities に入る */
.text-heading-xl,
.text-heading-lg,
.text-heading-lg-wide,
.text-heading-md {
  font-feature-settings: 'palt';
}
```

Figma 側のテキストスタイルも `heading/lg` `body/md` のように同じ名前で作り、デザインとコードの対応を名前だけで分かるようにする。

フォントは `app/layout.tsx` で `next/font/google` の Inter（`--font-inter`）と Noto Sans JP（`--font-noto-sans-jp`、preload しない）を読み込み、太さは 400 と 700 だけに絞る。`app/globals.css` の `@theme inline` で `--font-sans` に「Inter → Noto Sans JP」の順で割り当てる。

`cn()`（`lib/utils.ts`）は tailwind-merge v3 の `extendTailwindMerge` で、テキストスタイルと余白の名前を登録している。テキストスタイルや余白の段階を増やしたら、ここにも足す（足さないと `cn("text-heading-lg", "text-primary")` で片方が消える）。

`Input` の文字サイズは、`md` 未満で body-md（16px）、`md` 以上で body-sm（14px）にする。iOS Safari でのフォーカス時ズームを防ぐための指定なので変更しない。

## Layout

- **コンテナ**: ページ本体は `container mx-auto px-4 py-8`。ヘッダーも同じ `container mx-auto px-4` で左右を揃える。
- **ホーム画面**: サイトタイトル → 統計カード4枚（`grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`）→ 本体の2カラム。本体は `lg` 以上で `grid-cols-4` になり、左1列が絞り込みサイドバー、右3列が検索バーと事例一覧。`lg` 未満では1カラムに縦積みする。
- **詳細・投稿画面**: `max-w-4xl` で読みやすい行長に制限する（事例詳細、事例投稿）。
- **認証画面**: `max-w-md` の1カラムで中央寄せ（ログイン、新規登録、メール確認、404）。
- **ダイアログ**: 標準 `max-w-lg`、詳細検索は `max-w-2xl`。
- **ブレークポイント**: Tailwind 標準（`md` 768px、`lg` 1024px）。モバイルファーストで書き、`md:` `lg:` で段組を増やす。

### 余白

余白は Figma のバリアブル `space/*` の8段階だけを使う。コードでは同じ名前の `space-*` を、余白のクラス（`p-` `m-` `gap-` `space-x-` `space-y-` など）に付けて使う（例: `p-space-16`、`gap-space-8`）。

- `space-4`（4px）: アイコンと文字の間など、ごく近い要素
- `space-8`（8px）: ボタン内のアイコンと文字、タグ同士
- `space-16`（16px）: 要素間の標準。コンテナの左右、カード内の要素同士
- `space-24`（24px）: カードの内側、カード同士、セクション内の区切り
- `space-32`（32px）: ページの上下、セクション間の大きな区切り
- `space-48`（48px）: 空状態の上下など
- `space-64`（64px）
- `space-80`（80px）: ページ単位の大きな区切り

Tailwind 標準の数字（`p-4` `gap-3` など）は、大きさの指定（`w-*` `h-*` `size-*`）のために残しているが、余白には使わない。12px はスケールにないので使わない。

## Elevation & Depth

奥行きは影ではなく「背景色の差 + 1px のボーダー」で表現するのが基本。影はごく薄く、ホバー時のフィードバックにだけ強める。

- **静止時**: カードは `border shadow-sm`、ボタンと入力欄は `shadow-xs`。ヘッダーは影なしで `border-b`。
- **ホバー時**: クリックできるカードは影を強めて押せることを示す。事例カードは `hover:shadow-lg`、統計カードは `hover:shadow-md`。どちらも `transition-shadow` を付ける。
- **オーバーレイ**: ダイアログとドロップダウンは shadcn/ui 標準の影とオーバーレイをそのまま使う。

## Shapes

角丸は Figma のバリアブル `border/radius`（8px。`space/8` を参照）と、ボタン・円形の部品に使う半円（9999px）の2種類だけを使う。

- **8px（`rounded-md` / `rounded.md`）**: 入力欄、バッジ、カード、アイコンタイル、エラーボックス、メニューなど、角のある要素。
- **半円（`rounded-full` / `rounded.full`）**: すべてのボタン（アイコンのみのボタンは円になる）、アバター、ローディングスピナー。

これ以外の角丸（6px、10px、14px や、角を尖らせた `rounded-none`）は使わない。

## Components

UI 部品は `components/ui/` の shadcn/ui をベースにし、追加のスタイルは Tailwind のクラスで当てる。新しい部品が必要になったら、自作する前に `npx shadcn add` で追加できないか確認する。アイコンは `lucide-react` を使い、ボタン内では 16px（`w-4 h-4`）、統計カードでは 24px（`w-6 h-6`）。色は Colors 節の「アイコンの色」に従う。

- **Button**: `default`（primary の塗り）は1つの画面領域に1つまで。「事例を投稿」「新規登録」など主要な行動に使う。並べる副次的な行動は `outline`（「ログイン」など）。リスト内の選択肢は `ghost` で、選択中だけ `default` に切り替える（サイドバーの学校種別・教科フィルター）。サイズは小と大の2つ。高さは最小の高さ（`min-height`）で決め、ラベルが折り返したときは伸びる。
  - 小: ラベル button-sm（12px / bold）、内側は上下 8px・左右 16px、最小の高さ 40px。ボタンは基本このサイズ。
  - 大: ラベル button-lg（20px / bold）、内側は上下 8px・左右 16px、最小の高さ 60px。使う場面は画面のデザイン時に決める。
  - アイコンのみ: 直径 40px の円（`size-10 rounded-full`）。アイコンは 16px。
- **Card**: 白背景、角丸 8px、`border`、`shadow-sm`、内側 24px。`CardHeader` / `CardTitle` / `CardContent` で構成する。
- **事例カード（`case-item.tsx`）**: 全体がリンク（`absolute inset-0` の `Link` を重ねる）。上部に任意の 192px（`h-48`）のヘッダー画像（`next/image`、`object-cover`）。タイトル（heading-lg）は2行、説明（body-sm）は3行で切る（`line-clamp`）。右上に学校種別バッジと教科バッジ、下部に投稿者アバター・氏名・学校名・投稿日、右下にいいねボタン（`z-20` でカードのリンクより前面に出す）。投稿日といいね数は meta-sm（`2026.10.15`）。
- **統計カード（`stats-overview.tsx`）**: 左に primary subtle（`bg/primary/subtle`）のアイコンタイル（48px 角、内側 16px、角丸 8px）、右に数値（heading-xl）、ラベル（body-sm）、説明（body-xs / muted）。
- **Badge**: 文字は label-sm、内側は上下 4px・左右 8px。タグは primary subtle の背景に on primary subtle の文字、学校種別は「学校種別の色」の3色、教科は `outline`。
- **Input / Textarea / Select**: 高さ 36px、左右の内側 16px、`border-input`、フォーカス時は `ring-ring/50` の 3px リング。エラー時は `aria-invalid` を付けると destructive のリングになる。
- **Header**: `bg-card border-b`。左にロゴ（背景なしで、シンボルとサイト名をエイリアスの `primary/600` で表示）、中央にナビ（label-md）、右にログイン状態に応じたボタン群（投稿ボタン、通知、アバターのドロップダウン）。ナビとメニュー項目はホバーで文字色だけ primary に変わる。
- **Footer**: inverse（#2C2C2C）の背景に白の文字とリンク（下線付き）。ロゴを置く場合はエイリアスの `neutral/white`。
- **ローディング**: 一覧の読み込み中は primary 色のスピナー（`animate-spin rounded-full border-b-2 border-primary`）と、`bg-skeleton animate-pulse` のスケルトンカード（skeleton #C9E6FF）を併用する。
- **空状態**: 中央寄せの Card に、muted foreground の説明文と次の行動のヒント（「検索条件を変更してお試しください。」）を置く。

## Do's and Don'ts

- **Do**: 色は `bg-primary` `text-muted-foreground` などのセマンティッククラスで指定する。hex や oklch を直書きしない。
- **Do**: 文字はテキストスタイルのクラス（`text-heading-lg` `text-body-sm` など）で指定する。余白・角丸は、Figma のバリアブルに対応する値（余白 4/8/16/24/32/48/64/80px、角丸 8px）だけを使う。
- **Do**: 画像は必ず `next/image` の `<Image>` で表示し、意味のある `alt` を付ける（例: 「〇〇のヘッダー画像」）。
- **Do**: 文言は教員に向けた丁寧語（です・ます調）で書く。ボタンは「事例を投稿」「ログイン」のように短い動詞句にする。
- **Do**: カード全体をリンクにする場合は、リンクに `aria-label` を付け、中のボタンを `relative z-20` で前面に出す。
- **Do**: キーボード操作でフォーカスリングが見えることを確認する。shadcn/ui の `focus-visible:ring` を消さない。
- **Don't**: primary の塗りボタンを同じ領域に複数並べない。
- **Don't**: muted foreground（#5C5F62）より薄いグレーを本文や補足情報に使わない。disabled の文字色（#8E9194）は無効な部品専用。
- **Don't**: 太さに 500（`font-medium`）や 600（`font-semibold`）を使わない。400 と 700 の2種類だけ。
- **Don't**: label-sm（行の高さ 12px）を複数行の文章に使わない。日本語の行が詰まって読みにくくなる。
- **Don't**: Tailwind の標準パレット（`blue-500` など）を直接使わない。新しい色が必要なら、まず Figma の用途別バリアブルに追加し、`app/globals.css` に対応する変数を足す。
- **Don't**: `styles/globals.css` を編集しない。読み込まれているのは `app/globals.css` だけで、`styles/` 側は使われていない。
- **Don't**: ダークモード専用の調整を加えない。ダークモードは対象外。
