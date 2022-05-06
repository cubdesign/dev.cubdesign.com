import Color from "color";
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

export { getIconColor, getLightenColor, getDarkenColor };
const IconColorUtils = { getIconColor, getLightenColor, getDarkenColor };
export default IconColorUtils;
