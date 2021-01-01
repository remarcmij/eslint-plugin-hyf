import { Rule } from "eslint";
import { Node } from "estree";
import { nameValidator } from "./helpers";

function meaninglessAffixChecker(
  node: Node,
  id: IdentifierParentExtension,
  context: Rule.RuleContext
): void {
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

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      meaninglessAffix:
        "Identifier '{{ name }}' has a meaningless prefix or suffix.",
    },
  },
  create(context) {
    return nameValidator(meaninglessAffixChecker, context);
  },
};

export default rule;
