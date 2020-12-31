import { Rule } from "eslint";
import { Node } from "estree";
import { nameValidator } from "./helpers";

const isCamelCase = (name: string) => /^_?[a-z][a-zA-Z0-9]*$/.test(name);
const isPascalCase = (name: string) => /^_?[A-Z][a-zA-Z0-9]+$/.test(name);
const isShoutCase = (name: string) => /^_?[_A-Z0-9]+$/.test(name);

function camelCaseChecker(
  node: Node,
  id: IdentifierParentExtension,
  context: Rule.RuleContext
): void {
  if (isCamelCase(id.name)) {
    return;
  }
  if (isShoutCase(id.name)) {
    if (node.type === "VariableDeclaration" && node.kind === "const") {
      return;
    }
  }
  if (isPascalCase(id.name)) {
    if (node.type === "FunctionDeclaration" && node.id === id) {
      context.report({
        node: id,
        messageId: "camelCaseFunction",
        data: { name: id.name },
      });
      return;
    }
  }
  context.report({
    node: id,
    messageId: "camelCase",
    data: { name: id.name },
  });
}

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      camelCase: "'{{ name }}' name is not in camelCase.",
      camelCaseFunction:
        "'{{ name }}' name is not in camelCase (but okay for constructor functions).",
    },
  },
  create(context) {
    return nameValidator(camelCaseChecker, context);
  },
};

export default rule;
