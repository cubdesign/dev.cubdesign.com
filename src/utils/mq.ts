// https://zenn.dev/doanryo/articles/6c970c1fd33554

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

const mq = (key: keyof typeof breakpoints) =>
  `@media (min-width: ${breakpoints[key]}px)`;

export { breakpoints, mq };

const MqUtil = {
  breakpoints,
  mq,
};

export default MqUtil;
