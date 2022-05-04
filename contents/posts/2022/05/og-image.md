---
title: Next.js og-image
metaTitle: Next.js og-image
metaDesc: Next.js og-image
createDate: "2022-05-04 12:00"
icon: 🧑‍🏫
tags:
  - Next.js
---

## ✍️ この記事は、まだ編集中です。

Next.js の Blog のチュートリアルを見ていると、OG 画像をサーバーで自動生成している部分を見つけた。なんろうって調べてみると、Vercel がプログラムを公開していた。そのままだと日本語が使えなかったので日本語が使えるように修正してみた。

↓ この部分
https://nextjs.org/learn/basics/assets-metadata-css/polishing-layout

```tsx
<meta
  property="og:image"
  content={`https://og-image.vercel.app/${encodeURI(
    siteTitle
  )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
/>
```

## リポジトリ

このリポジトリを Fork して、して、Vercel にデプロイするだけで使える。
[https://github.com/vercel/og-image](https://github.com/vercel/og-image)

## Vercel へのデプロイの注意点

Vercel の Free プランの場合は、そのままだとデプロイできないので vercel.json の `rewrites` のみを残してあとは削除する。

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "regions": ["all"],
  "functions": {
    "api/**": {
      "memory": 3008
    }
  },
  "rewrites": [{ "source": "/(.+)", "destination": "/api" }]
}
```

↓

```json
{
  "rewrites": [{ "source": "/(.+)", "destination": "/api" }]
}
```

## 参考サイト

[Open Graph Image as a Service](https://og-image.vercel.app/)

## バージョン

```json
"next": "12.1.5",
```
