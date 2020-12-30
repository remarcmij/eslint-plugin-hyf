"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { IdentifierParentExtension } from '../../typings/types';
const helpers_1 = require("../helpers");
const generics_json_1 = __importDefault(require("./generics.json"));
function descriptiveNamesChecker(node, context) {
    var _a;
    if (generics_json_1.default.includes(node.name)) {
        context.report({
            message: `${node.name}: consider a more descriptive name`,
            node,
        });
        return;
    }
    if (node.name.length !== 1) {
        return;
    }
    // Allow single letters for for-loop index variables
    if (((_a = helpers_1.up(node, 3)) === null || _a === void 0 ? void 0 : _a.type) === "ForStatement") {
        return;
    }
    context.report({
        message: `'${node.name}': consider a more descriptive name`,
        node,
    });
}
const rule = {
    create(context) {
        return helpers_1.nameValidator(descriptiveNamesChecker, context);
    },
};
exports.default = rule;
//# sourceMappingURL=index.js.map