"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
function descriptiveNamesChecker(node, id, context) {
    let names = ["data", "item"];
    if (context.options.length > 0 || typeof context.options[0] === "string") {
        names = context.options[0].split("|").map((name) => name.trim());
    }
    if (names.includes(id.name)) {
        context.report({
            node: id,
            messageId: "nondescriptName",
            data: { name: id.name },
        });
        return;
    }
    if (id.name.length !== 1) {
        return;
    }
    // Allow single letters for for-loop index variables
    if (node.parent.type === "ForStatement") {
        return;
    }
    context.report({
        node: id,
        messageId: "nondescriptName",
        data: { name: id.name },
    });
}
const rule = {
    meta: {
        messages: {
            nondescriptName: "Identifier '{{ name }}' is nondescript.",
        },
    },
    create(context) {
        return helpers_1.nameValidator(descriptiveNamesChecker, context);
    },
};
exports.default = rule;
//# sourceMappingURL=nondescriptNames.js.map