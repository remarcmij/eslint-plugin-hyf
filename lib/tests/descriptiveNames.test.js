"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
const descriptiveNames_1 = __importDefault(require("../rules/descriptiveNames"));
const tester = new eslint_1.RuleTester({ parserOptions: { ecmaVersion: 2016 } });
const options = ["data|item"];
tester.run("descriptiveNames", descriptiveNames_1.default, {
    valid: [
        { code: "const foo = 1;", options },
        { code: "for (let i = 0; i < 10; i++) {}", options },
    ],
    invalid: [
        {
            code: "const data = 1;",
            options,
            errors: [{ messageId: "descriptiveName" }],
        },
        {
            code: "const i = 1;",
            options,
            errors: [{ messageId: "descriptiveName" }],
        },
        {
            code: "const foo = {a: 1};",
            options,
            errors: [{ messageId: "descriptiveName" }],
        },
    ],
});
//# sourceMappingURL=descriptiveNames.test.js.map