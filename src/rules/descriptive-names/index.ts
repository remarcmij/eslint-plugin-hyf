import { Rule } from "eslint";
// import { IdentifierParentExtension } from '../../typings/types';
import { nameValidator, up } from "../helpers";
import generics from "./generics.json";

function descriptiveNamesChecker(
  node: IdentifierParentExtension,
  context: Rule.RuleContext
): void {
  if (generics.includes(node.name)) {
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
  if (up(node, 3)?.type === "ForStatement") {
    return;
  }
  context.report({
    message: `'${node.name}': consider a more descriptive name`,
    node,
  });
}

const rule: Rule.RuleModule = {
  create(context) {
    return nameValidator(descriptiveNamesChecker, context);
  },
};

export default rule;
