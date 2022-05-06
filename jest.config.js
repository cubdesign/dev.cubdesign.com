const nextJest = require("next/jest");

const esModules = [
  "unified",

  "unist-.+",
  "mdast-util-.+",
  "remark-.+",
  "hast-util-.+",
  "character-entities-.+",

  "bail",
  "is-plain-obj",
  "trough",
  "vfile",
  "micromark",
  "decode-named-character-reference",
  "ccount",
  "markdown-table",
  "property-information",
  "html-void-elements",
  "space-separated-tokens",
  "comma-separated-tokens",
  "stringify-entities",
  "rehype-slug",
  "rehype-autolink-headings",
  "rehype-stringify",
].join("|");

const createJestConfig = nextJest({
  // next.config.jsとテスト環境用の.envファイルが配置されたディレクトリをセット。基本は"./"で良い。
  dir: "./",
});

// Jestのカスタム設定を設置する場所。従来のプロパティはここで定義。
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  // jest.setup.jsを作成する場合のみ定義。
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // aliasを定義 （tsconfig.jsonのcompilerOptions>pathsの定義に合わせる）
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/libs/(.*)$": "<rootDir>/src/libs/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  // Optional: Extend Jest with custom matchers
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

// createJestConfigを定義することによって、本ファイルで定義された設定がNext.jsの設定に反映されます
// module.exports = createJestConfig(customJestConfig);

/*
  下記、transformIgnorePatternsを使う設定
  
  SM modulesを無視する設定（unifiedのエラー回避）

  https://github.com/vercel/next.js/discussions/31152#discussioncomment-1661596
*/

// Take the returned async function...
const asyncConfig = createJestConfig(customJestConfig);

// and wrap it...
module.exports = async () => {
  const config = await asyncConfig();
  config.transformIgnorePatterns = [
    // Garbage performance due to this. SWC will fix this soon hopefully
    `<rootDir>/node_modules/(?!${esModules}).+\\.(js|jsx|mjs|cjs|ts|tsx)$`,
  ];
  return config;
};
