---
title: Next.js og-image
metaTitle: Next.js og-image
metaDesc: Next.js og-image
createDate: "2022-05-04 12:00"
updateDate: "2022-06-05 22:28"
status: open
icon: 🧑‍🏫
tags:
  - Next.js
---

## ✍️ この記事は、まだ編集中です。

### TODO

- [ ] 出来上がった `og-image` の説明。
- [ ] 出来上がった `dot-dom` について

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

#### 🔴 エラーの検証 その 2

原因がわかった。最初インストールした際、`npm i -g vercel` で、npm で global にインストールしていた。一度、 `npm uninstall -g vercel` でインインストールして、`yarn global add vercel` して、yarn で global にインストールしたら、エラーが無くなった。

ハマった。

成功！したと思ったが、

別の Mac でエラーが解決しなかった 😓。
多分、エラー検証　その１で デフォルト（グローバル） の Node.js を `node@14.x` に変更していたので上手くいっていたよう。

#### 🟢 エラーの検証 その 3

デフォルト（グローバル）の Node.js が、`node@16.14.2` の環境で`vercel`を global インストールしたので、`vercel`が`node@16.14.2`が紐付いていた。この紐付きは、インストール時に固定され変更されない。なので、`node@14.x`のプロジェクト内で`vercel`を実行しても`node@16.14.2`で実行される。エラーの原因はこれ！

解決方法は、プロジェクトの Node.js を`node@14.x`にしたうえで`vercel`を local インストールする。

成功！

確認は、コマンドで確認する。

```bash
$ volta list all

⚡️ User toolchain:

    Node runtimes:
        v14.19.2 (current @ /Users/takeo/src/cubdesign/og-image/package.json)
        v14.19.3
        v16.15.0
        v16.15.1 (default)

    Package managers:
        Yarn:
            v1.22.18 (default)

    Packages:
        vercel (current @ /Users/takeo/src/cubdesign/og-image/package.json)
            binary tools: vc, vercel
```

↓ これ！ Volta の記事を読んで理解した。

[Windows 側になるべく実行環境作りたくなかったやつが、Volta でバージョン管理できる Node.js 環境を作ってみた](https://zenn.dev/h_yoshikawa0724/articles/2021-11-09-volta)

ハマった。

> グローバルインストールしたものとローカルインストールしたものとで、同名の npm パッケージが存在していた場合、ローカルの方を優先して使うよ。 .....
> また、グローバルインストールした npm パッケージは、インストール時のデフォルト（グローバル）バージョンである Node.js と関連付けられます。
> この npm パッケージを、グローバルバージョンとして使用する際は、この関連付けられた Node.js が使われるようになっているそうです。

### 日本語フォント

#### ダウンロード

ゴシック体の、Weight は、レギュラーのみをダウンロード。
ボールド、code 用等幅フォントは使用せず、レギュラーで代用する。

Noto Sans JP
https://google-webfonts-helper.herokuapp.com/fonts/noto-sans-jp?subsets=japanese,latin

#### フォントを使う

ダウンロードした `.woff2` を使用する。

## デプロイ

### Vercel へのデプロイの注意点

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
