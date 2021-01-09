import { RuleTester } from "eslint";

import rule from "../rules/nondescriptNames";

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2016 } });

const options = ["data|item"];

tester.run("no-nondescript-names", rule, {
  valid: [
    { code: "const foo = 1;", options },
    { code: "for (let i = 0; i < 10; i++) {}", options },
  ],
  invalid: [
    {
      code: "const data = 1;",
      options,
      errors: [{ messageId: "nondescriptName" }],
    },
    {
      code: "const i = 1;",
      options,
      errors: [{ messageId: "nondescriptName" }],
    },
    {
      code: "const foo = {a: 1};",
      options,
      errors: [{ messageId: "nondescriptName" }],
    },
  ],
});
