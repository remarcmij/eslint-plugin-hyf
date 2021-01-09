"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
function meaninglessAffixChecker(node, id, context) {
    let pattern = /[a-z]Array$|[a-z]Object$/;
    if (context.options.length > 0 || typeof context.options[0] === "string") {
        pattern = new RegExp(context.options[0]);
    }
    if (id.name.match(pattern)) {
        context.report({
            node: id,
            messageId: "meaninglessAffix",
            data: { name: id.name },
        });
    }
}
const rule = {
    meta: {
        messages: {
            meaninglessAffix: "Identifier '{{ name }}' has a meaningless prefix or suffix.",
        },
    },
    create(context) {
        return helpers_1.nameValidator(meaninglessAffixChecker, context);
    },
};
exports.default = rule;
//# sourceMappingURL=meaninglessAffix.js.map