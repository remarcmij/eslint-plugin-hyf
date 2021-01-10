"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const isCamelCase = (name) => /^_?[a-z][a-zA-Z0-9]*$/.test(name);
const isPascalCase = (name) => /^_?[A-Z][a-zA-Z0-9]+$/.test(name);
const isShoutCase = (name) => /^_?[_A-Z0-9]+$/.test(name);
function camelCaseChecker(node, id, context, functionInfo) {
    if (isShoutCase(id.name)) {
        if (node.type === "VariableDeclaration" && node.kind === "const") {
            return;
        }
    }
    if (isCamelCase(id.name)) {
        if (functionInfo) {
            const { thisAssignmentSeen, returnSeen } = functionInfo;
            if (thisAssignmentSeen && !returnSeen) {
                context.report({
                    node: id,
                    messageId: "usePascalCase",
                    data: { name: id.name },
                });
            }
        }
        return;
    }
    if (isPascalCase(id.name)) {
        // Allow PascalCase for constructor functions, characterized by having
        // assignments to the `this` object but no `return` statement.
        if (functionInfo) {
            const { thisAssignmentSeen, returnSeen } = functionInfo;
            if (thisAssignmentSeen && !returnSeen) {
                return;
            }
        }
    }
    context.report({
        node: id,
        messageId: "useCamelCase",
        data: { name: id.name },
    });
}
const rule = {
    meta: {
        messages: {
            useCamelCase: "Identifier '{{ name }}' is not in camelCase.",
            usePascalCase: "Function '{{ name }}' looks like a constructor function. If so, please use a PascalCase name.",
        },
    },
    create(context) {
        return helpers_1.nameValidator(camelCaseChecker, context);
    },
};
exports.default = rule;
//# sourceMappingURL=camelCase.js.map