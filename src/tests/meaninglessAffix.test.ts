import { RuleTester } from "eslint";

import rule from "../rules/meaninglessAffix";

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2016 } });

const options = ["[a-z]Array$|[a-z]Object$"];

tester.run("no-meaningless-affixes", rule, {
  valid: [{ code: "const foo = 1;", options }],
  invalid: [
    {
      code: "const fooObject = {};",
      options,
      errors: [{ messageId: "meaninglessAffix" }],
    },
  ],
});
