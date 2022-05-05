---
title: Next.js og-image
metaTitle: Next.js og-image
metaDesc: Next.js og-image
createDate: "2022-05-04 12:00"
updateDate: "2022-05-05 19:233"
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

## 開発

### インストール

```shell
$ yarn
```

### 開発環境スタート

```shell
$ vercel dev
```

↓ 実行エラーがでた。

```shell
error @: The engine "node" is incompatible with this module. Expected version "14.x". Got "16.14.2"
```

### node のバージョンを合わせる

この PC は node マネージャーに `VOLTA` を使っていので、`volta pin` で node バージョンを `14.x` に固定する。

```shell
$ volta pin node@14
```

こんな感じで package.json に node バージョンが追記される。
この Workspace に移動すると自動で node バージョンが切り替わる。便利。

```json
"volta": {
  "node": "14.19.2"
}
```

エラー変わらず！

```shell
error @: The engine "node" is incompatible with this module. Expected version "14.x". Got "16.14.2"
```

#### 🔴 　エラーの検証 その 1

vercel の実行は vercel を global インストールしたので、インストール時の node バージョンで実行されたのでは？（おそらく）

`volta`　で global の node を `14.x` に変更した。

エラー変わらず！

#### 🟢 エラーの検証 その 2

原因がわかった。最初インストールした際、`npm i -g vercel` で、npm で global にインストールしていた。一度、 `npm uninstall -g vercel` でインインストールして、`yarn global add vercel` して、yarn で global にインストールしたら、エラーが無くなった。

ハマった。

成功！

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

- [Vercel og-image](https://github.com/vercel/og-image)
- [VOLTA](https://volta.sh/)

## バージョン

og-image

```json
"node": "14.19.2"
```

frontend

```json
"next": "12.1.5",
```
