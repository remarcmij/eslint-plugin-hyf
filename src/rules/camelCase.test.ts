import { RuleTester } from "eslint";

import rule from "./camelCase";

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2016 } });

tester.run("camelCase", rule, {
  valid: [{ code: `let foo;` }],
  invalid: [{ code: `let FOO`, errors: [{ messageId: "useCamelCase" }] }],
});
