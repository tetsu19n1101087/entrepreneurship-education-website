# Entrepreneurship education website

_Automatically synced with your [v0.app](https://v0.app) deployments_

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/tetsu19n1101087s-projects/v0-entrepreneurship-education-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/F3pUAJWCZDP)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/tetsu19n1101087s-projects/v0-entrepreneurship-education-website](https://vercel.com/tetsu19n1101087s-projects/v0-entrepreneurship-education-website)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/F3pUAJWCZDP](https://v0.app/chat/projects/F3pUAJWCZDP)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Google 認証の設定

- **Supabase 側の設定**

  - Authentication → Providers → Google を有効化
  - Client ID / Client Secret を入力（Google Cloud Console で取得）
  - Redirect URLs に以下を追加
    - 本番: `https://<your-domain>/`
    - 開発: `http://localhost:3000/`

- **環境変数 (.env.local)**

  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - 任意: `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`（未指定時は `window.location.origin/`）

- **実装メモ**
  - `hooks/use-auth.tsx` に `loginWithGoogle()` を追加済み。
  - `app/auth/login/page.tsx` と `app/auth/register/page.tsx` に「Google でログイン/登録」ボタンを設置。
  - サインインは `supabase.auth.signInWithOAuth({ provider: 'google' })` を使用。
