/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier/react",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    React: "writeable",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    allowImportExportEverywhere: true,
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "quote-props": ["error", "as-needed", { keywords: true, numbers: true }],
    indent: ["error", 2],
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
      },
    ],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "never"],
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        semi: false,
        jsxSingleQuote: true,
        singleQuote: true,
        useTabs: false,
        bracketSpacing: true,
      },
    ],
  },
};
