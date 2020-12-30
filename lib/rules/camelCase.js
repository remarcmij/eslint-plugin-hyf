"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const isCamelCase = (name) => /^_?[a-z][a-zA-Z0-9]*$/.test(name);
const isPascalCase = (name) => /^[A-Z][a-zA-Z0-9]+$/.test(name);
const isShoutCase = (name) => /^_?[A-Z][_A-Z0-9]+$/.test(name);
function camelCaseChecker(node, context) {
    var _a;
    if (!isCamelCase(node.name)) {
        if (isShoutCase(node.name)) {
            const grandParent = helpers_1.up(node, 2);
            if ((grandParent === null || grandParent === void 0 ? void 0 : grandParent.type) === "VariableDeclaration" &&
                (grandParent === null || grandParent === void 0 ? void 0 : grandParent.kind) === "const") {
                return;
            }
        }
        if (isPascalCase(node.name)) {
            if (((_a = helpers_1.up(node, 2)) === null || _a === void 0 ? void 0 : _a.type) === "FunctionDeclaration") {
                context.report({
                    message: `'${node.name}': use camelCase names (exception: constructor functions)`,
                    node,
                });
                return;
            }
        }
        context.report({
            node,
            messageId: "useCamelCase",
        });
    }
}
const rule = {
    meta: {
        messages: {
            useCamelCase: "Use camelCase names.",
        },
    },
    create(context) {
        return helpers_1.nameValidator(camelCaseChecker, context);
    },
};
exports.default = rule;
//# sourceMappingURL=camelCase.js.map