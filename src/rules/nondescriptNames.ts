import { Rule } from "eslint";
import { Node } from "estree";
import { nameValidator } from "./helpers";

function descriptiveNamesChecker(
  node: Node,
  id: Node,
  context: Rule.RuleContext
): void {
  if (id.type !== "Identifier") {
    return;
  }
  let names = ["data", "item"];
  if (context.options.length > 0 || typeof context.options[0] === "string") {
    names = context.options[0].split("|").map((name: string) => name.trim());
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

  const nodeEx = node as Node & Rule.NodeParentExtension;
  // Allow single letters for for-loop index variables
  if (nodeEx.parent.type === "ForStatement") {
    return;
  }
  context.report({
    node: id,
    messageId: "nondescriptName",
    data: { name: id.name },
  });
}

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      nondescriptName: "Identifier '{{ name }}' is nondescript.",
    },
  },
  create(context) {
    return nameValidator(descriptiveNamesChecker, context);
  },
};

export default rule;
