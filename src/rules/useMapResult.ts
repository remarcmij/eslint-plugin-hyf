import { Rule } from "eslint";
import { Identifier } from "estree";

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      replaceMapWithForEach:
        "Results from `map` are unused. Replace `map` with `forEach`.",
    },
  },
  create(context) {
    return {
      "ExpressionStatement > CallExpression > MemberExpression > Identifier[name='map']": function (
        node: Identifier
      ) {
        context.report({ node, messageId: "replaceMapWithForEach" });
      },
    };
  },
};

export default rule;
