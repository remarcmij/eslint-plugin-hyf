"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
const camelCase_1 = __importDefault(require("./camelCase"));
const tester = new eslint_1.RuleTester({ parserOptions: { ecmaVersion: 2016 } });
tester.run("camelCase", camelCase_1.default, {
    valid: [{ code: `let foo;` }],
    invalid: [{ code: `let FOO`, errors: [{ messageId: "useCamelCase" }] }],
});
//# sourceMappingURL=camelCase.test.js.map