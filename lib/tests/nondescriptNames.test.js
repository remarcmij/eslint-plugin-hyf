"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
const nondescriptNames_1 = __importDefault(require("../rules/nondescriptNames"));
const tester = new eslint_1.RuleTester({ parserOptions: { ecmaVersion: 2016 } });
const options = ["data|item"];
tester.run("no-nondescript-names", nondescriptNames_1.default, {
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
//# sourceMappingURL=nondescriptNames.test.js.map