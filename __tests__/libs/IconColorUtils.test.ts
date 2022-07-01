import { getEmojiColorsFromAPI, EmojiColor } from "@/libs/IconColorUtils";

const UA = {
  MacBook_12_Chrome:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
};
describe("IconColorUtile", () => {
  it("apiで複数の絵文字からcolorが取得できること", async () => {
    const emojis = "👾🍔";
    const emojiColors: EmojiColor[] = await getEmojiColorsFromAPI(
      emojis,
      UA.MacBook_12_Chrome
    );
    expect(emojiColors).toEqual([
      { emoji: "👾", color: "#7c5cac" },
      { emoji: "🍔", color: "#fbc230" },
    ]);
  });
});
