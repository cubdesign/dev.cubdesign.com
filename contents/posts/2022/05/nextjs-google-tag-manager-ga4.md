---
title: Next.jsでGoogle Tag Manager経由でGoogle Analytics v4の設定をしてハマった。
metaTitle: Next.jsでGoogle Tag Manager経由でGoogle Analytics v4の設定をしてハマった。。
metaDesc: Next.jsでGoogle Tag Manager経由でGoogle Analytics v4の設定をしてハマった。
createDate: "2022-05-06 23:00"
icon: 😓
tags:
  - Next.js
---

## ✍️ この記事は、まだ編集中です。

基本的、このページ「[Next.js で GTM + GA4 を利用する](https://zenn.dev/keitakn/articles/nextjs-google-tag-manager)」の通り。

### env の設定

本番環境は、vercel.com の Environment Variables ページで設定、ローカル環境は `.env.local` に設定。

### ハマったこと

`next/script` は `next/head` 以外の場所に貼ること。このページ「[Script Component](https://nextjs.org/docs/basic-features/script)」に書いてあった。

`next/head`　の中に貼って、タグが反応しなくてハマった。

## 参考サイト

- [Next.js で GTM + GA4 を利用する](https://zenn.dev/keitakn/articles/nextjs-google-tag-manager)
- [Script Component](https://nextjs.org/docs/basic-features/script)

## バージョン

```json
"next": "12.1.5",
"react": "18.1.0",
```
