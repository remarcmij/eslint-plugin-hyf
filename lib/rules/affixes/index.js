"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const affixes_json_1 = __importDefault(require("./affixes.json"));
const affixPatterns = affixes_json_1.default.map((affix) => new RegExp(affix));
function redundantAffixChecker(node, context) {
    if (affixPatterns.some((pattern) => node.name.match(pattern))) {
        context.report({
            message: `'${node.name}': avoid redundant prefixes and suffixes`,
            node,
        });
    }
}
const rule = {
    create(context) {
        return helpers_1.nameValidator(redundantAffixChecker, context);
    },
};
exports.default = rule;
//# sourceMappingURL=index.js.map