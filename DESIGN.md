---
version: alpha
name: 千葉県アントレプレナーシップ教育事例共有プラットフォーム
description: 千葉県の小中高教員が実践事例を共有・検索するための、落ち着いた信頼感のある教育向け UI
colors:
  primary: '#005B9F'
  on-primary: '#F3FAFF'
  secondary: '#E3F1FB'
  on-secondary: '#19232A'
  accent: '#00774B'
  on-accent: '#F3FBF6'
  background: '#F9FCFF'
  foreground: '#040C13'
  surface: '#FFFFFF'
  muted: '#ECF3F8'
  muted-foreground: '#67737C'
  border: '#DFE6EB'
  primary-tint: '#E6EFF5'
  destructive: '#E7000B'
  on-destructive: '#FFFFFF'
typography:
  display:
    fontFamily: Noto Sans JP
    fontSize: 28px
    fontWeight: 700
    lineHeight: 36px
  stat-value:
    fontFamily: Noto Sans JP
    fontSize: 28px
    fontWeight: 700
    lineHeight: 36px
  title-lg:
    fontFamily: Noto Sans JP
    fontSize: 20px
    fontWeight: 700
    lineHeight: 28px
  title-md:
    fontFamily: Noto Sans JP
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
  lead:
    fontFamily: Noto Sans JP
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-md:
    fontFamily: Noto Sans JP
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  label-md:
    fontFamily: Noto Sans JP
    fontSize: 14px
    fontWeight: 700
    lineHeight: 20px
  caption:
    fontFamily: Noto Sans JP
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
  label-sm:
    fontFamily: Noto Sans JP
    fontSize: 12px
    fontWeight: 400
    lineHeight: 12px
    letterSpacing: 0px
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
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 8px 16px
  button-outline:
    backgroundColor: '{colors.background}'
    textColor: '{colors.foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 8px 16px
  button-ghost:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 8px 16px
  button-ghost-hover:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.on-accent}'
  button-destructive:
    backgroundColor: '{colors.destructive}'
    textColor: '{colors.on-destructive}'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    height: 36px
    padding: 8px 16px
  input:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.body-md}'
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
    typography: '{typography.body-md}'
  skeleton:
    backgroundColor: '{colors.muted}'
    rounded: '{rounded.md}'
  badge-secondary:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.on-secondary}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.md}'
    padding: 4px 8px
  stat-icon-tile:
    backgroundColor: '{colors.primary-tint}'
    textColor: '{colors.primary}'
    rounded: '{rounded.md}'
    size: 48px
  header:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    padding: 16px
---

## Overview

千葉県の小学校・中学校・高等学校の教員が、アントレプレナーシップ教育の実践事例を投稿・検索・コメントし合うためのプラットフォーム。利用者は IT に詳しいとは限らない現場の先生方なので、装飾よりも「読みやすさ」「迷わなさ」「公的機関らしい信頼感」を優先する。

トーンは落ち着いた青を基調にした、清潔で控えめなもの。主張の強いグラデーションや派手なアニメーションは使わず、白いカードを淡い青みの背景に並べる構成で情報を整理する。

実装は Next.js App Router + shadcn/ui（`new-york` スタイル）+ Tailwind CSS v4。トークンの出どころは次のとおり。

- **文字・余白・角丸**: Figma ファイル「アントレ」のバリアブルとテキストスタイルが正。この文書の値は、プラグインで DTCG 形式に書き出した JSON から反映している（2026-10-09 時点）。
- **色**: `app/globals.css` の CSS 変数（oklch）が正。この文書の hex 値はそれを sRGB に変換したもの。Figma 側にはまだブランドカラーのバリアブルがない。

新しい UI を作るときは、hex や px を直書きせず、`bg-primary` `text-muted-foreground` のような Tailwind のセマンティッククラスやテーマのトークンを使うこと。

### 実装との差分

この文書は Figma に合わせた「目標のデザイン」を表している。現行のコードはまだ追いついていないので、改修時は次の差分を解消する。

- **フォント**: コードは Geist Sans。Figma は日本語が Noto Sans JP、英数字が Inter。
- **文字サイズ**: コードの 30px（`text-3xl`）・24px（`text-2xl`）・18px（`text-lg`）は Figma のスケールにない。それぞれ 28px・28px・16px に寄せる。28px は Tailwind の標準サイズにないため、`app/globals.css` の `@theme` に Figma のスケールを定義して使う。
- **太さ**: コードの 500（`font-medium`）・600（`font-semibold`）は Figma にない。700 に寄せる。
- **余白**: コードの 12px（`p-3` `gap-3` `px-3`）は Figma のスケールにない。16px に寄せる。
- **角丸**: コードは 6 / 8 / 10 / 14px を使い分けているが、Figma は `border/radius` = 8px の1種類だけ。円形（アバターなど）以外はすべて 8px にする。

## Colors

色は shadcn/ui の CSS 変数に沿ったセマンティックな役割で定義している。色相は 240°（青）を基調とし、アクセントだけ 160°（緑）を使う。

- **Primary (#005B9F / `--primary`)**: 落ち着いた青。主要ボタン、ロゴマーク、選択中のフィルター、フォーカスリング、統計アイコンに使う。画面内の「次に押すべきもの」を示す唯一の強い色。
- **Secondary (#E3F1FB / `--secondary`)**: ごく淡い青。タグのバッジや件数バッジなど、補助的なラベルの背景に使う。
- **Accent (#00774B / `--accent`)**: 緑。shadcn/ui の仕様上、`outline` と `ghost` ボタンのホバー背景がこの色になる（例: サイドバーの絞り込みボタンにホバーすると緑になる）。それ以外の場面でアクセントとして多用しない。
- **Background (#F9FCFF) / Surface (#FFFFFF)**: ページ背景はわずかに青みのある白、カード・ヘッダー・ポップオーバーは純白。この差でカードの境界を表現する。
- **Foreground (#040C13) / Muted foreground (#67737C)**: 本文と見出しは濃紺に近い黒。説明文・日付・学校名などの補足情報は muted foreground。
- **Border (#DFE6EB)**: カード、入力欄、ヘッダー下線に共通で使う。
- **Primary tint (#E6EFF5)**: primary の 10% を白に重ねた色（`bg-primary/10`）。統計カードのアイコンタイルの背景。CSS 変数ではなく透過指定で作っているため、実装では `bg-primary/10` と書く。
- **Destructive (#E7000B) / On destructive (#FFFFFF)**: 削除などの破壊的操作と入力エラー。destructive ボタンの文字は `text-white`。
- **Chart 1〜5**: `app/globals.css` にグラフ用の `--chart-1`〜`--chart-5` があるが、現時点では未使用のため front matter には含めていない。

コントラスト比（ライトモード、WCAG 2.2）は次のとおり。いずれも AA の 4.5:1 を満たしている。

- foreground / background: 19.1:1
- muted-foreground / background: 4.7:1（AA ぎりぎりなので、これより薄いグレーを本文に使わない）
- on-primary / primary: 6.7:1
- primary / background（リンク文字など）: 6.8:1
- on-accent / accent: 5.3:1

### 学校種別の色

学校種別はトークン化されておらず、Tailwind の標準パレットを直接指定している。新しく学校種別を表示するときもこの対応に合わせる。

- 小学校（`elementary`）: 青。`border-blue-200 text-blue-700`（バッジ）、`bg-blue-100 text-blue-800`（塗り）
- 中学校（`junior_high`）: 緑。`border-green-200 text-green-700`、`bg-green-100 text-green-800`
- 高等学校（`high_school`）: 紫。`border-purple-200 text-purple-700`、`bg-purple-100 text-purple-800`
- その他: 赤。`border-red-200 text-red-700`

### エラー表示の色

フォームのエラーメッセージは `text-red-600 bg-red-50 rounded-md text-sm` のボックスで表示している（ログイン、新規登録、投稿、コメント）。`--destructive` トークンとは別系統なので、新規実装でもこの色の組み合わせを踏襲する。内側の余白は現行コードでは `p-3`（12px）だが、余白のスケールに合わせて `p-4`（16px）にする。

### ダークモード

`app/globals.css` には `.dark` 用のトークンも定義されているが、`ThemeProvider` がレイアウトに組み込まれていないため、現状ダークモードは有効になっていない。ライトモードだけを前提にデザインしてよい。

## Typography

フォントは Figma のバリアブル `font-family/ja`（Noto Sans JP）と `font-family/en`（Inter）の2つ。日本語は Noto Sans JP、英数字は Inter で表示する。CSS では `font-family: Inter, "Noto Sans JP", sans-serif` のように Inter を先に指定し、Inter にない日本語の文字を Noto Sans JP で表示させる。

文字サイズは Figma のバリアブル `font-size/*` の5段階だけを使う。任意の値（`text-[15px]` など）は使わない。

- `font-size/50`: 12px
- `font-size/75`: 14px
- `font-size/100`: 16px
- `font-size/200`: 20px
- `font-size/300`: 28px

太さは `font-weight/normal`（400）と `font-weight/bold`（700）の2種類だけ。行の高さは Figma ではテキストスタイル `label/sm` にしか定義がないため、それ以外は各サイズに対する Tailwind の標準値（12→16px、14→20px、16→24px、20→28px、28→36px）を使う。

役割ごとの対応は次のとおり。

- **display（28px / bold）**: ページ見出し（h1）。ホームのサイトタイトルなど、1ページに1つ。
- **stat-value（28px / bold）**: 統計カードの数値。
- **title-lg（20px / bold）**: 事例カードのタイトル、ヘッダーのサイト名。
- **title-md（16px / bold）**: `CardTitle` を使ったセクション見出し（「学校種別」「教科・領域」など）。
- **lead（16px / regular）**: ページ見出し直下の説明文。`text-muted-foreground` と組み合わせる。
- **body-md（14px / regular）**: UI の標準文字サイズ。本文、説明文、フォームラベルの大半がこれ。
- **label-md（14px / bold）**: ボタンのラベル。
- **caption（12px / regular）**: 日付、学校名、件数などの補足情報。
- **label-sm（12px / regular / 行の高さ 12px）**: Figma のテキストスタイル `label/sm`。バッジのように1行で収まるラベル専用。行の高さが文字サイズと同じなので、複数行になる文章には使わない。

`Input` の文字サイズは、`md` 未満で 16px、`md` 以上で 14px にする。iOS Safari でのフォーカス時ズームを防ぐための指定なので変更しない。

## Layout

- **コンテナ**: ページ本体は `container mx-auto px-4 py-8`。ヘッダーも同じ `container mx-auto px-4` で左右を揃える。
- **ホーム画面**: サイトタイトル → 統計カード4枚（`grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`）→ 本体の2カラム。本体は `lg` 以上で `grid-cols-4` になり、左1列が絞り込みサイドバー、右3列が検索バーと事例一覧。`lg` 未満では1カラムに縦積みする。
- **詳細・投稿画面**: `max-w-4xl` で読みやすい行長に制限する（事例詳細、事例投稿）。
- **認証画面**: `max-w-md` の1カラムで中央寄せ（ログイン、新規登録、メール確認、404）。
- **ダイアログ**: 標準 `max-w-lg`、詳細検索は `max-w-2xl`。
- **ブレークポイント**: Tailwind 標準（`md` 768px、`lg` 1024px）。モバイルファーストで書き、`md:` `lg:` で段組を増やす。

### 余白

余白は Figma のバリアブル `space/*` の8段階だけを使う。Tailwind のクラスとの対応は次のとおり。

- `space/4`（4px）: `1`。アイコンと文字の間など、ごく近い要素
- `space/8`（8px）: `2`。ボタン内のアイコンと文字、タグ同士
- `space/16`（16px）: `4`。要素間の標準。コンテナの左右、カード内の要素同士
- `space/24`（24px）: `6`。カードの内側、カード同士、セクション内の区切り
- `space/32`（32px）: `8`。ページの上下、セクション間の大きな区切り
- `space/48`（48px）: `12`。空状態の上下など
- `space/64`（64px）: `16`
- `space/80`（80px）: `20`。ページ単位の大きな区切り

12px（`3`）はスケールにないので使わない。

## Elevation & Depth

奥行きは影ではなく「背景色の差 + 1px のボーダー」で表現するのが基本。影はごく薄く、ホバー時のフィードバックにだけ強める。

- **静止時**: カードは `border shadow-sm`、ボタンと入力欄は `shadow-xs`。ヘッダーは影なしで `border-b`。
- **ホバー時**: クリックできるカードは影を強めて押せることを示す。事例カードは `hover:shadow-lg`、統計カードは `hover:shadow-md`。どちらも `transition-shadow` を付ける。
- **オーバーレイ**: ダイアログとドロップダウンは shadcn/ui 標準の影とオーバーレイをそのまま使う。

## Shapes

角丸は Figma のバリアブル `border/radius`（8px。`space/8` を参照）の1種類だけを使う。

- **8px（`rounded-md` / `rounded.md`）**: ボタン、入力欄、バッジ、カード、アイコンタイル、エラーボックスなど、角のある要素すべて。
- **円形（`rounded-full`）**: アバター、ローディングスピナー。

これ以外の角丸（6px、10px、14px や、角を尖らせた `rounded-none`）は使わない。

## Components

UI 部品は `components/ui/` の shadcn/ui をベースにし、追加のスタイルは Tailwind のクラスで当てる。新しい部品が必要になったら、自作する前に `npx shadcn add` で追加できないか確認する。アイコンは `lucide-react` を使い、ボタン内では 16px（`w-4 h-4`）、統計カードでは 24px（`w-6 h-6`）。

- **Button**: `default`（primary の塗り）は1つの画面領域に1つまで。「事例を投稿」「新規登録」など主要な行動に使う。並べる副次的な行動は `outline`（「ログイン」など）。リスト内の選択肢は `ghost` で、選択中だけ `default` に切り替える（サイドバーの学校種別・教科フィルター）。ラベルは label-md（14px / bold）。サイズは標準 `h-9`（36px）、小 `h-8`、大 `h-10`、アイコンのみ `size-9`。
- **Card**: 白背景、角丸 8px、`border`、`shadow-sm`、内側 24px。`CardHeader` / `CardTitle` / `CardContent` で構成する。
- **事例カード（`case-item.tsx`）**: 全体がリンク（`absolute inset-0` の `Link` を重ねる）。上部に任意の 192px（`h-48`）のヘッダー画像（`next/image`、`object-cover`）。タイトル（title-lg）は2行、説明（body-md）は3行で切る（`line-clamp`）。右上に学校種別バッジと教科バッジ、下部に投稿者アバター・氏名・学校名・投稿日、右下にいいねボタン（`z-20` でカードのリンクより前面に出す）。
- **統計カード（`stats-overview.tsx`）**: 左に `bg-primary/10` のアイコンタイル（48px 角、内側 16px、角丸 8px）、右に数値（stat-value）、ラベル（body-md）、説明（caption / muted）。
- **Badge**: 文字は label-sm、内側は上下 4px・左右 8px。タグは `secondary`、学校種別と教科は `outline`。
- **Input / Textarea / Select**: 高さ 36px、左右の内側 16px、`border-input`、フォーカス時は `ring-ring/50` の 3px リング。エラー時は `aria-invalid` を付けると destructive のリングになる。
- **Header**: `bg-card border-b`。左にロゴマーク（40px 角の primary の塗りに白抜きの「千」）とサイト名・サブタイトル、右にログイン状態に応じたボタン群（投稿ボタン、通知、アバターのドロップダウン）。
- **ローディング**: 一覧の読み込み中は primary 色のスピナー（`animate-spin rounded-full border-b-2 border-primary`）と、`bg-muted animate-pulse` のスケルトンカードを併用する。
- **空状態**: 中央寄せの Card に、muted foreground の説明文と次の行動のヒント（「検索条件を変更してお試しください。」）を置く。

## Do's and Don'ts

- **Do**: 色は `bg-primary` `text-muted-foreground` などのセマンティッククラスで指定する。hex や oklch を直書きしない。
- **Do**: 文字サイズ・余白・角丸は、Figma のバリアブルに対応する値（文字 12/14/16/20/28px、余白 4/8/16/24/32/48/64/80px、角丸 8px）だけを使う。
- **Do**: 画像は必ず `next/image` の `<Image>` で表示し、意味のある `alt` を付ける（例: 「〇〇のヘッダー画像」）。
- **Do**: 文言は教員に向けた丁寧語（です・ます調）で書く。ボタンは「事例を投稿」「ログイン」のように短い動詞句にする。
- **Do**: カード全体をリンクにする場合は、リンクに `aria-label` を付け、中のボタンを `relative z-20` で前面に出す。
- **Do**: キーボード操作でフォーカスリングが見えることを確認する。shadcn/ui の `focus-visible:ring` を消さない。
- **Don't**: primary の塗りボタンを同じ領域に複数並べない。
- **Don't**: muted foreground（#67737C）より薄いグレーを本文や補足情報に使わない。コントラストが AA を下回る。
- **Don't**: 太さに 500（`font-medium`）や 600（`font-semibold`）を使わない。400 と 700 の2種類だけ。
- **Don't**: label-sm（行の高さ 12px）を複数行の文章に使わない。日本語の行が詰まって読みにくくなる。
- **Don't**: 学校種別以外の目的で Tailwind の標準パレット（`blue-500` など）を直接使わない。新しい色が必要ならまず `app/globals.css` にトークンを追加する。
- **Don't**: `styles/globals.css` を編集しない。読み込まれているのは `app/globals.css` だけで、`styles/` 側は使われていない。
- **Don't**: ダークモード専用の調整を加えない。ダークモードは現状無効。
