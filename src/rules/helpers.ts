import { Rule } from "eslint";
import { FunctionDeclaration, Node, Pattern } from "estree";
import { Validator, FunctionInfo } from "./types";

function paramsValidator(
  node: Node,
  params: Array<Pattern>,
  validator: Validator,
  context: Rule.RuleContext
) {
  params.forEach((param) => {
    switch (param.type) {
      case "AssignmentPattern":
        validator(node, param.left, context);
        break;
      case "RestElement":
        validator(node, param.argument, context);
        break;
      case "ArrayPattern":
        param.elements.forEach((element) => validator(node, element, context));
        break;
      case "Identifier":
        validator(node, param, context);
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
  const functionStack: FunctionInfo[] = [];

  return {
    FunctionDeclaration() {
      functionStack.push({ thisAssignmentSeen: false, returnSeen: false });
    },
    "FunctionDeclaration ExpressionStatement > AssignmentExpression > MemberExpression > ThisExpression": () => {
      functionStack[functionStack.length - 1].thisAssignmentSeen = true;
    },
    "FunctionDeclaration ReturnStatement": () => {
      functionStack[functionStack.length - 1].returnSeen = true;
    },
    "FunctionDeclaration:exit": (node: FunctionDeclaration) => {
      const functionInfo = functionStack.pop();
      if (!functionInfo) {
        throw new Error("function stack underflow");
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      validator(node, node.id!, context, functionInfo);
      paramsValidator(node, node.params, validator, context);
    },
    FunctionExpression(node) {
      if (node.id) {
        validator(node, node.id, context);
      }
      paramsValidator(node, node.params, validator, context);
    },
    ArrowFunctionExpression(node) {
      paramsValidator(node, node.params, validator, context);
    },
    VariableDeclaration(node) {
      node.declarations.forEach((decl) => {
        validator(node, decl.id, context);
      });
    },
    ObjectExpression(node) {
      node.properties.forEach((prop) => {
        if (
          prop.type === "Property" &&
          prop.kind === "init" &&
          prop.key.type === "Identifier"
        ) {
          validator(node, prop.key, context);
        }
      });
    },
  };
}
