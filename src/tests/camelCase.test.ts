import { RuleTester } from "eslint";

import rule from "../rules/camelCase";

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2016 } });

tester.run("camelCase", rule, {
  valid: [
    { code: "let foo = 1;" },
    { code: "const FOO_BAR = 1;" },
    { code: "function foo() {}" },
    { code: "function Foo() { this.bar = 1; }" },
    { code: "function foo(bar) {}" },
    { code: "const foo = { bar: 1 };" },
  ],
  invalid: [
    { code: "let FOO = 1;", errors: [{ messageId: "camelCase" }] },
    { code: "const foo_bar = 1;", errors: [{ messageId: "camelCase" }] },
    { code: "function Foo() {}", errors: [{ messageId: "camelCase" }] },
    {
      code: "function Foo() { this.bar = 1; return {}; }",
      errors: [{ messageId: "camelCase" }],
    },
    { code: "function foo(Bar) {}", errors: [{ messageId: "camelCase" }] },
    { code: "const foo = { Bar: 1 };", errors: [{ messageId: "camelCase" }] },
    {
      code: "const foo = { foo_bar: 1 };",
      errors: [{ messageId: "camelCase" }],
    },
  ],
});
