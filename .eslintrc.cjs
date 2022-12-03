/* eslint-disable no-undef */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "prettier"],
  env: {
    browser: true,
  },
  globals: {
    React: "readonly",
    JSX: "readonly",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      excludedFiles: ["*.js"],
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
      ],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "react/prop-types": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
