"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const affixes_1 = __importDefault(require("./rules/affixes"));
const camelCase_1 = __importDefault(require("./rules/camelCase"));
const comments_1 = __importDefault(require("./rules/comments"));
const descriptive_names_1 = __importDefault(require("./rules/descriptive-names"));
const useMapResult_1 = __importDefault(require("./rules/useMapResult"));
const ruleModule = {
    rules: {
        camelcase: camelCase_1.default,
        "use-map-result": useMapResult_1.default,
        "descriptive-names": descriptive_names_1.default,
        "no-redundant-affixes": affixes_1.default,
        "no-commented-out-code": comments_1.default,
    },
};
module.exports = ruleModule;
//# sourceMappingURL=index.js.map