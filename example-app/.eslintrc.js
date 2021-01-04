module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "no-var": "error",
    "prefer-const": "error",
    "new-cap": "error",
    "no-useless-computed-key": "error",
    eqeqeq: "error",
    "no-restricted-syntax": [
      "warn",
      {
        selector:
          "ExpressionStatement > CallExpression > MemberExpression > Identifier[name='map']",
        message: "Results from `map` are unused. Replace `map` with `forEach`.",
      },
      {
        // disallow numeric literals as array indices (zero is allowed)
        selector: "MemberExpression[computed] > Literal[value>0]",
        message: "No literal",
      },
    ],
    "array-callback-return": "error",
    "hyf/use-map-result": "error",
    "hyf/descriptive-names": ["warn", "data|item"],
    "hyf/no-meaningless-affixes": ["warn", "[a-z]Array$|[a-z]Object$"],
    "hyf/camelcase": "warn",
    "hyf/no-commented-out-code": "warn",
  },
  plugins: ["hyf"],
};
