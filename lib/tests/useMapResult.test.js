"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
const useMapResult_1 = __importDefault(require("../rules/useMapResult"));
const tester = new eslint_1.RuleTester({ parserOptions: { ecmaVersion: 2016 } });
tester.run("use-map-result", useMapResult_1.default, {
    valid: [
        { code: "const result = foo.map(x => x * 2);" },
        { code: "foo.map(x => x * 2).forEach(x => { console.log(x); });" },
        {
            code: "foo.map(x => x * 2).map(y => y + 2).forEach(x => { console.log(x); });",
        },
    ],
    invalid: [
        {
            code: "foo.map(x => { console.log(x); })",
            errors: [{ messageId: "replaceMapWithForEach" }],
        },
    ],
});
//# sourceMappingURL=useMapResult.test.js.map