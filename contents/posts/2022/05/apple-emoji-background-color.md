---
title: appleのemoji絵文字の色を抽出して背景色を設定したい
metaTitle: appleのemoji絵文字の色を抽出して背景色を設定したい
metaDesc: appleのemoji絵文字の色を抽出して背景色を設定したい
createDate: "2022-05-04 23:00"
updateDate: "2022-06-16 19:31"
status: close
icon: 🤹‍♀️
tags:
  - React.js, macOS
canonical: https://zenn.dev/cubdesign/articles/2022-06-16-emoji
---

絵文字から絵文字を抽出するプログラムを書いたので、今度これを Api 化して、絵文字の背景を設定するようにしたい。
一旦 close。

# つくってみた

デモ：
https://node-vibrant-example.cubdesign.com/

ソース：
https://github.com/cubdesign/node-vibrant-example

↓ こういうやつ

![](/images/apple-emoji-background-color/playground.png)

- emoji を入力、画像を選択してそれぞれの目立つ色を抽出。
- 画像はサーバーにアップロードせす、ローカルで処理。
- 絵文字は apple 系 → apple emoji、Android → Google emoji、他 → twemoji をデバイスによって出しわけ。

# しくみ

色の抽出は、画像から目立つのある色を抽出する node.js ライブラリ
[`node-vibrant`](<(https://github.com/Vibrant-Colors/node-vibrant)>)を使う。

絵文字をそのまま`node-vibrant`で扱うことができないので、[twemoji-parser](https://github.com/twitter/twemoji-parser)を使って、絵文字をコードに変換。コードを元に emoji database の cdn から画像を取得し`node-vibrant`で抽出する。

デモでは、抽出した色の中から、トップレートのものを背景色。抽出した色でグラデーションを作り、絵文字の背景としてみた。

## 1. 絵文字のコードを取得

↓ こういう変換

👾 → 1f47e

🙅🏻‍♂️ → 1f645-1f3fb-200d-2642-fe0f

`twemoji-parser`では、コードが直接取得できないので、`twemoji-parser`で、絵文字の画像を取得して、画像 URL からコードを取得する。

```ts
import { EmojiEntity, parse } from "twemoji-parser";

export type Emoji = {
  text: string;
  unicode: string;
  brand: EmojiBrand;
  imageUrl: string;
};

/**
 * 絵文字の画像URLからunicodeテキストを取得する
 *
 * @param emojiImageURL 絵文字の画像URL
 * @returns
 */
const getUnicodeFromEmojiImageURL = (emojiImageURL: string): string => {
  return emojiImageURL.replace(/.*\/(.*)\.(png|svg)/, "$1");
};

/**
 * 絵文字のユニコードを取得する
 *
 * @param emoji 絵文字（複数可）
 */
const getEmojis = (emoji: string, ua: string): Emoji[] => {
  const emojiBrand: EmojiBrand = getEmojiBrandByUA(ua);

  const emojiEntities: EmojiEntity[] = parse(emoji, {
    buildUrl: (codepoints: string, assetType: string): string => {
      return assetType === "png"
        ? `https://cdn.jsdelivr.net/npm/emoji-datasource-${emojiBrand}@14.0.0/img/${emojiBrand}/64/${codepoints}.png`
        : `https://twemoji.maxcdn.com/v/latest/svg/${codepoints}.svg`;
    },
    assetType: "png",
  });

  const emojis: Emoji[] = [];

  for (let i: number = 0; i < emojiEntities.length; i++) {
    const emojiEntity: EmojiEntity = emojiEntities[i];

    emojis.push({
      text: emojiEntity.text,
      unicode: getUnicodeFromEmojiImageURL(emojiEntity.url),
      brand: emojiBrand,
      imageUrl: emojiEntity.url,
    });
  }

  return emojis;
};
```

## 2. 絵文字の画像 URL を取得

`twemoji-parser`で絵文字の画像 URL を作成する。
　画像は、[emoji-data](https://github.com/iamcal/emoji-data) の cdn を使用。64x64 の png。

```
👾 = {
    emojiBrand:  "apple" | "google" | "twitter",
    codepoints: "1f47e"
}
```

↓

```
https://cdn.jsdelivr.net/npm/emoji-datasource-${emojiBrand}@14.0.0/img/${emojiBrand}/64/${codepoints}.png
```

```ts
import { EmojiEntity, parse } from "twemoji-parser";

const getEmojiBrandByUA = (ua: string): EmojiBrand => {
  if (isApple(ua)) {
    return "apple";
  }
  if (isAndroid(ua)) {
    return "google";
  }

  // appleデバイス、アンドロイド以外はTwitterとする
  return "twitter";
};

const emojiBrand: EmojiBrand = getEmojiBrandByUA(ua);

const emojiEntities: EmojiEntity[] = parse(emoji, {
  buildUrl: (codepoints: string, assetType: string): string => {
    return assetType === "png"
      ? `https://cdn.jsdelivr.net/npm/emoji-datasource-${emojiBrand}@14.0.0/img/${emojiBrand}/64/${codepoints}.png`
      : `https://twemoji.maxcdn.com/v/latest/svg/${codepoints}.svg`;
  },
  assetType: "png",
});
```

## 3. 絵文字の色を抽出

`node-vibrant`に絵文字画像の URL を渡し色を抽出する。6 色抽出される。

```ts
import Vibrant from "node-vibrant";

const palette: Palette = await Vibrant.from(imageURL)
  .quality(quality)
  .getPalette();
```

# はまったこと

`worker.js`エラーがめちゃくちゃでて、原因不明で悩んでいたところ、`node-vibrant`のバージョン問題だった。バージョンを変更したらエラーがでなくなった。（2022.06.16）

↓

`"node-vibrant": "^3.2.1-alpha.1"` -> `"node-vibrant": "^3.1.6"`

詳しくは、ここ ↓

https://github.com/Vibrant-Colors/node-vibrant/issues/113

# つかったライブラリ

- [node-vibrant （色の抽出）](https://github.com/Vibrant-Colors/node-vibrant)
- [emoji-data (絵文字画像を cdn から借用)](https://github.com/iamcal/emoji-data)
- [twemoji-parser (絵文字のパース)](https://github.com/twitter/twemoji-parser)

意図した色が抽出される場合と、そうでない時があり、微妙だった。
