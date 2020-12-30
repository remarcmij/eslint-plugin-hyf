module.exports = {
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  extends: "eslint:recommended",
  rules: {
    "no-var": "error",
    "prefer-const": "error",
    "new-cap": "error",
    "no-useless-computed-key": "error",
    eqeqeq: "error",
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "ExpressionStatement > CallExpression > MemberExpression > Identifier[name='filter']",
        message: "Replace `filter` with `forEach`.",
      },
    ],
    "array-callback-return": "error",
    "hyf/use-map-result": "error",
    "hyf/descriptive-names": "warn",
    "hyf/no-redundant-affixes": "warn",
    "hyf/camelcase": "warn",
    "hyf/no-commented-out-code": "warn",
  },
  plugins: ["hyf"],
};
