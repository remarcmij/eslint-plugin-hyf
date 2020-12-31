import { RuleTester } from "eslint";

import rule from "../rules/useMapResult";

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2016 } });

tester.run("use-map-result", rule, {
  valid: [
    { code: "const result = foo.map(x => x * 2);" },
    { code: "foo.map(x => x * 2).forEach(x => { console.log(x); });" },
    {
      code:
        "foo.map(x => x * 2).map(y => y + 2).forEach(x => { console.log(x); });",
    },
  ],
  invalid: [
    {
      code: "foo.map(x => { console.log(x); })",
      errors: [{ messageId: "replaceMapWithForEach" }],
    },
  ],
});
