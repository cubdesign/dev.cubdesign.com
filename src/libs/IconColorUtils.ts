import fetch from "cross-fetch";
import Color from "color";
import { type } from "os";

export type EmojiColor = {
  emoji: string;
  color: string;
};

export type EmojiColorDictionary = {
  [key: string]: string;
};

const getEmojiColorsFromAPI = async (
  emoji: string,
  ua: string
): Promise<EmojiColor[]> => {
  const url = `https://node-vibrant-example.cubdesign.com/api/emoji`;
  const params = {
    emoji: emoji,
    ua: ua,
  };
  const query = new URLSearchParams(params);
  const response = await fetch(`${url}?${query}`);
  const {
    result,
    error,
  }: {
    result?: {
      emoji: string;
      color: string;
    }[];
    error?: {
      message: string;
    };
  } = await response.json();

  if (error || !result) {
    throw new Error("api error");
  }

  const emojiColors: EmojiColor[] = [];

  for (let i = 0; i < result.length; i++) {
    const emoji: {
      emoji: string;
      color: string;
    } = result[i];
    emojiColors.push({ emoji: emoji.emoji, color: emoji.color });
  }
  return emojiColors;
};

/**
 * Iconの背景色を取得する
 */
const getIconColor = (icon: string): string => {
  let color: string = "";
  switch (icon) {
    case "👾":
      color = "#3e0870";
      break;
    case "🧑‍🏫":
      color = "#053911";
      break;
    case "💻":
      color = "#1a1919";
      break;
    case "🤹‍♀️":
      color = "#9a0404";
      break;
    case "😓":
      color = "#0034d0";
      break;

    default:
      color = "#000000";
      break;
  }
  return color;
};
/**
 *  明るい色を取得する
 */
const getLightenColor = (color: string): string => {
  return Color(color).lighten(0.6).toString();
};
/**
 * 暗い色を取得する
 */
const getDarkenColor = (color: string): string => {
  return Color(color).darken(0.6).toString();
};

export { getEmojiColorsFromAPI, getIconColor, getLightenColor, getDarkenColor };
const IconColorUtils = {
  getEmojiColorsFromAPI,
  getIconColor,
  getLightenColor,
  getDarkenColor,
};
export default IconColorUtils;
