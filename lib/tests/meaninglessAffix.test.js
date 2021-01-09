"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
const meaninglessAffix_1 = __importDefault(require("../rules/meaninglessAffix"));
const tester = new eslint_1.RuleTester({ parserOptions: { ecmaVersion: 2016 } });
const options = ["[a-z]Array$|[a-z]Object$"];
tester.run("no-meaningless-affixes", meaninglessAffix_1.default, {
    valid: [{ code: "const foo = 1;", options }],
    invalid: [
        {
            code: "const fooObject = {};",
            options,
            errors: [{ messageId: "meaninglessAffix" }],
        },
    ],
});
//# sourceMappingURL=meaninglessAffix.test.js.map