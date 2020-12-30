import { Rule } from "eslint";
import { nameValidator, up } from "./helpers";

const isCamelCase = (name: string) => /^_?[a-z][a-zA-Z0-9]*$/.test(name);
const isPascalCase = (name: string) => /^[A-Z][a-zA-Z0-9]+$/.test(name);
const isShoutCase = (name: string) => /^_?[A-Z][_A-Z0-9]+$/.test(name);

function camelCaseChecker(
  node: IdentifierParentExtension,
  context: Rule.RuleContext
): void {
  if (!isCamelCase(node.name)) {
    if (isShoutCase(node.name)) {
      const grandParent = up(node, 2);
      if (
        grandParent?.type === "VariableDeclaration" &&
        grandParent?.kind === "const"
      ) {
        return;
      }
    }
    if (isPascalCase(node.name)) {
      if (up(node, 2)?.type === "FunctionDeclaration") {
        context.report({
          message: `'${node.name}': use camelCase names (exception: constructor functions)`,
          node,
        });
        return;
      }
    }
    context.report({
      node,
      messageId: "useCamelCase",
    });
  }
}

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      useCamelCase: "Use camelCase names.",
    },
  },
  create(context) {
    return nameValidator(camelCaseChecker, context);
  },
};

export default rule;
