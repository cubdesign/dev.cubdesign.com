---
title: Next.jsでGoogle Tag Manager経由でGoogle Analytics v4の設定をしてハマった。
metaTitle: Next.jsでGoogle Tag Manager経由でGoogle Analytics v4の設定をしてハマった。。
metaDesc: Next.jsでGoogle Tag Manager経由でGoogle Analytics v4の設定をしてハマった。
createDate: "2022-05-06 23:00"
updateDate: "2022-05-13 22:11"
icon: 😓
tags:
  - Next.js
  - Google Tag Manager
  - Google Analytics
---

## ✍️ この記事は、まだ編集中です。

### TODO

- [ ] next.js を使う場合、`<Script />`で、擬似ページ読み込みを発生させて、毎回 GTM 設定タグのダウンロード（PV 送信）をするか、 GTM の設定は１度だけ読み込んで、PV イベントの送信を個別で行うか検討。　->　他の計測タグを発行することを考えると、擬似ページ読み込みを行い、GTM に通常の WEB ページと同様と思い込ませる方がシンプルかも。
- [ ] GA の PV 開発環境のアクセスの除外（ `.env` で `window['ga-disable-GA_MEASUREMENT_ID'] = true;` の出しわけ ） -> [Google アナリティクスを無効にする](https://developers.google.com/analytics/devguides/collection/ga4/disable-analytics?hl=ja)
- [ ] Google アナリティクスを無効と、GA4 のデバッグモードの関係は？GA 無効の時に、GA4 のデバッグモードは動くのか？
- [ ] GA の PV 自社、自宅からのアクセスの除外（GA4 のフィルターを使う）
- [ ] 開発環境で、 [GA4 のデバッグモード](https://developers.google.com/analytics/devguides/collection/ga4/debug?technology=websites)を有効にする。（`.env` を使用）

## 設定

基本的、このページ「[Next.js で GTM + GA4 を利用する](https://zenn.dev/keitakn/articles/nextjs-google-tag-manager)」の通り。

### env の設定

本番環境は、vercel.com の Environment Variables ページで設定、ローカル環境は `.env.local` に設定。

## ハマったこと

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
