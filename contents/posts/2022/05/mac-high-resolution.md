---
title: MacBook 12の画面解像度をディスプレイ設定以上に広げたい。
metaTitle: MacBook 12の画面解像度をディスプレイ設定以上に広げたい。
metaDesc: MacBook 12の画面解像度をディスプレイ設定以上に広げる方法を調べていて専用アプリを使って設定してみた。
createDate: "2022-05-04 20:00"
updateDate: "2022-05-07 00:56"
icon: 💻
tags:
  - macOS
  - MacBook 12
---

## ✍️ この記事は、まだ編集中です。

MacBook 12 の画面解像度をディスプレイ設定以上に広げる方法を調べていて専用アプリを使って設定してみた。

解像アプリを紹介しているページ「[MacBook Pro (2021)のノッチに隠されてしまうメニューバー常駐型アプリは旧 MacBook Pro のアスペクト比に設定することで表示可能。](https://applech2.com/archives/20211112-macbook-pro-notch-glich.html)」を見つけたのでためしてみる。

## 専用アプリで広げる

最大：`2560 x 1660`。

`1440 x 900` の次は、`2048 x 1280` で `1920 x 1200` ができないのが辛い。

### 試したアプリ

- [EasyRes](https://apps.apple.com/jp/app/easyres/id688211836?mt=12)
- [Display Menu](https://apps.apple.com/jp/app/display-menu/id549083868?mt=12)（App 内課金 250 円／買い切り）

## コマンドラインからの設定

`1920 x 1200` にするためには、ターミナルからコマンドで設定を変更する必要があるらしい。

[13 インチの MacBook Pro を疑似解像度 1920×1200 で使う設定](https://dev.classmethod.jp/articles/macbookpro-13inch-1920x1200/)

## バージョン

```json
"device": "MacBook 12 2015",
"macOS":"macOS Big Sur" ,
```
