import { Rule } from "eslint";
import { Node, Pattern } from "estree";

function paramsValidator(
  params: Array<Pattern>,
  validator: Validator,
  context: Rule.RuleContext
) {
  params.forEach((param) => {
    switch (param.type) {
      case "AssignmentPattern":
        validator(param.left as IdentifierParentExtension, context);
        break;
      case "RestElement":
        validator(param.argument as IdentifierParentExtension, context);
        break;
      case "ArrayPattern":
        param.elements.forEach((element) =>
          validator(element as IdentifierParentExtension, context)
        );
        break;
      case "Identifier":
        validator(param as IdentifierParentExtension, context);
        break;
      default:
        throw new Error(`unexpected AST type: ${param.type}`);
    }
  });
}

export function up(
  node: Node & Rule.NodeParentExtension,
  count: number
): (Node & Rule.NodeParentExtension) | null {
  while (node.parent && count > 0) {
    node = node.parent;
    count--;
  }
  return count === 0 ? node : null;
}

export function nameValidator(
  validator: Validator,
  context: Rule.RuleContext
): Rule.RuleListener {
  return {
    FunctionDeclaration(node) {
      validator(node.id, context);
      paramsValidator(node.params, validator, context);
    },
    FunctionExpression(node) {
      if (node.id) {
        validator(node.id, context);
      }
      paramsValidator(node.params, validator, context);
    },
    ArrowFunctionExpression(node) {
      paramsValidator(node.params, validator, context);
    },
    VariableDeclaration(node) {
      node.declarations.forEach((decl) => {
        validator(decl.id, context);
      });
    },
  };
}
