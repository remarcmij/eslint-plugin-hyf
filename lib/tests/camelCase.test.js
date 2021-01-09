"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
const camelCase_1 = __importDefault(require("../rules/camelCase"));
const tester = new eslint_1.RuleTester({ parserOptions: { ecmaVersion: 2016 } });
tester.run("camelcase", camelCase_1.default, {
    valid: [
        { code: "let foo = 1;" },
        { code: "const FOO_BAR = 1;" },
        { code: "function foo() {}" },
        { code: "function Foo() { this.bar = 1; }" },
        { code: "function foo(bar) {}" },
        { code: "const foo = { bar: 1 };" },
    ],
    invalid: [
        { code: "let FOO = 1;", errors: [{ messageId: "useCamelCase" }] },
        { code: "const foo_bar = 1;", errors: [{ messageId: "useCamelCase" }] },
        { code: "function Foo() {}", errors: [{ messageId: "useCamelCase" }] },
        {
            code: "function foo() { this.bar = 1; }",
            errors: [{ messageId: "usePascalCase" }],
        },
        {
            code: "function Foo() { this.bar = 1; return {}; }",
            errors: [{ messageId: "useCamelCase" }],
        },
        { code: "function foo(Bar) {}", errors: [{ messageId: "useCamelCase" }] },
        {
            code: "const foo = { Bar: 1 };",
            errors: [{ messageId: "useCamelCase" }],
        },
        {
            code: "const foo = { foo_bar: 1 };",
            errors: [{ messageId: "useCamelCase" }],
        },
    ],
});
//# sourceMappingURL=camelCase.test.js.map