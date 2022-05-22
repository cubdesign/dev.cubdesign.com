---
title: appleのemoji絵文字の色を抽出して背景色を設定したい
metaTitle: appleのemoji絵文字の色を抽出して背景色を設定したい
metaDesc: appleのemoji絵文字の色を抽出して背景色を設定したい
createDate: "2022-05-04 23:00"
updateDate: "2022-05-21 21:34"
status: open
icon: 🤹‍♀️
tags:
  - React.js, macOS
---

## ✍️ この記事は、まだ編集中です。

### TODO

- [ ] 方法をざっとまとめる
- [x] `node-vibrant` を使ってみる
- [ ] 実装してみる

apple の emoji 絵文字の色を抽出して背景色を設定したい。

とりあえず、写真で色を取得するコードを書いた
https://node-vibrant-example.vercel.app/

apple 絵文字から色を抽出できた
https://node-vibrant-example.vercel.app/

コードを追加していると、`CreateListFromArrayLike called on non-object`の`worker.js`エラーがめちゃくちゃでて、原因不明で悩んでいたところ、バージョン問題だった。バージョンを変更したらエラーがでなくなった。（2022.05.22 時点）

`"node-vibrant": "^3.2.1-alpha.1"` -> `"node-vibrant": "^3.1.6"`

詳しくは、ここ ↓

https://github.com/Vibrant-Colors/node-vibrant/issues/113

## 使うライブラリ

- [node-vibrant](https://github.com/Vibrant-Colors/node-vibrant)
- [emoji-data](https://github.com/iamcal/emoji-data)
- [twemoji-parser](https://github.com/twitter/twemoji-parser)
