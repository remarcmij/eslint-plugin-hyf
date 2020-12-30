"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
const useMapResult_1 = __importDefault(require("./useMapResult"));
const tester = new eslint_1.RuleTester({ parserOptions: { ecmaVersion: 2016 } });
tester.run("use-map-result", useMapResult_1.default, {
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
//# sourceMappingURL=useMapResult.test.js.map