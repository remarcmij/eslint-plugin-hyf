import { RuleTester } from "eslint";

import rule from "../rules/camelCase";

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2016 } });

tester.run("camelcase", rule, {
  valid: [
    { code: "let foo = 1;" },
    { code: "const FOO_BAR = 1;" },
    { code: "function foo() {}" },
    { code: "function Foo() { this.bar = 1; }" },
    { code: "function foo(bar) {}" },
    { code: "const foo = { bar: 1 };" },
  ],
  invalid: [
    { code: "let FOO = 1;", errors: [{ messageId: "useCamelCase" }] },
    { code: "const foo_bar = 1;", errors: [{ messageId: "useCamelCase" }] },
    { code: "function Foo() {}", errors: [{ messageId: "useCamelCase" }] },
    {
      code: "function foo() { this.bar = 1; }",
      errors: [{ messageId: "usePascalCase" }],
    },
    {
      code: "function Foo() { this.bar = 1; return {}; }",
      errors: [{ messageId: "useCamelCase" }],
    },
    { code: "function foo(Bar) {}", errors: [{ messageId: "useCamelCase" }] },
    {
      code: "const foo = { Bar: 1 };",
      errors: [{ messageId: "useCamelCase" }],
    },
    {
      code: "const foo = { foo_bar: 1 };",
      errors: [{ messageId: "useCamelCase" }],
    },
  ],
});
