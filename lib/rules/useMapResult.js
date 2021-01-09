"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule = {
    meta: {
        messages: {
            replaceMapWithForEach: "Results from `map` are unused. Replace `map` with `forEach`.",
        },
    },
    create(context) {
        return {
            "ExpressionStatement > CallExpression > MemberExpression > Identifier[name='map']": function (node) {
                context.report({ node, messageId: "replaceMapWithForEach" });
            },
        };
    },
};
exports.default = rule;
//# sourceMappingURL=useMapResult.js.map