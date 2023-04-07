module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ["./.eslintrc-auto-import.json", "@antfu/eslint-config", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "no-console": "off",
    "antfu/if-newline": "off",
    "vue/comment-directive": "off",
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      { registeredComponentsOnly: false },
    ],
  },
  globals: { uni: true },
};
