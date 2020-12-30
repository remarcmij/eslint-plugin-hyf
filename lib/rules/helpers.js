"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameValidator = exports.up = void 0;
function paramsValidator(params, validator, context) {
    params.forEach((param) => {
        switch (param.type) {
            case "AssignmentPattern":
                validator(param.left, context);
                break;
            case "RestElement":
                validator(param.argument, context);
                break;
            case "ArrayPattern":
                param.elements.forEach((element) => validator(element, context));
                break;
            case "Identifier":
                validator(param, context);
                break;
            default:
                throw new Error(`unexpected AST type: ${param.type}`);
        }
    });
}
function up(node, count) {
    while (node.parent && count > 0) {
        node = node.parent;
        count--;
    }
    return count === 0 ? node : null;
}
exports.up = up;
function nameValidator(validator, context) {
    return {
        FunctionDeclaration(node) {
            validator(node.id, context);
            paramsValidator(node.params, validator, context);
        },
        FunctionExpression(node) {
            if (node.id) {
                validator(node.id, context);
            }
            paramsValidator(node.params, validator, context);
        },
        ArrowFunctionExpression(node) {
            paramsValidator(node.params, validator, context);
        },
        VariableDeclaration(node) {
            node.declarations.forEach((decl) => {
                validator(decl.id, context);
            });
        },
    };
}
exports.nameValidator = nameValidator;
//# sourceMappingURL=helpers.js.map