"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const meaninglessAffix_1 = __importDefault(require("./rules/meaninglessAffix"));
const camelCase_1 = __importDefault(require("./rules/camelCase"));
const comments_1 = __importDefault(require("./rules/comments"));
const nondescriptNames_1 = __importDefault(require("./rules/nondescriptNames"));
const useMapResult_1 = __importDefault(require("./rules/useMapResult"));
const ruleModule = {
    rules: {
        camelcase: camelCase_1.default,
        "use-map-result": useMapResult_1.default,
        "no-nondescript-names": nondescriptNames_1.default,
        "no-meaningless-affixes": meaninglessAffix_1.default,
        "no-commented-out-code": comments_1.default,
    },
};
module.exports = ruleModule;
//# sourceMappingURL=index.js.map