import { Rule } from "eslint";
import { nameValidator } from "../helpers";
import affixes from "./affixes.json";

const affixPatterns = affixes.map((affix) => new RegExp(affix));

function redundantAffixChecker(
  node: IdentifierParentExtension,
  context: Rule.RuleContext
): void {
  if (affixPatterns.some((pattern) => node.name.match(pattern))) {
    context.report({
      message: `'${node.name}': avoid redundant prefixes and suffixes`,
      node,
    });
  }
}

const rule: Rule.RuleModule = {
  create(context) {
    return nameValidator(redundantAffixChecker, context);
  },
};

export default rule;
