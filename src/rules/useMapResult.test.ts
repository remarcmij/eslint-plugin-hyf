import { RuleTester } from "eslint";

import rule from "./useMapResult";

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2016 } });

tester.run("use-map-result", rule, {
  valid: [
    { code: "const result = foo.map(x => x);" },
    { code: "foo.map(x => x).forEach(x => { console.log(x); });" },
    { code: "foo.map(x => x).map(y => y).forEach(x => { console.log(x); });" },
  ],
  invalid: [
    {
      code: "foo.map(x => { console.log(x); })",
      errors: [{ messageId: "replaceMapWithForEach" }],
    },
  ],
});
