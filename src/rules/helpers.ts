import { Rule } from "eslint";
import { FunctionDeclaration, Identifier, Node, Pattern } from "estree";
import { FunctionInfo, Validator } from "./types";

function isIdentifier(
  node: Node
): node is Identifier & Rule.NodeParentExtension {
  return node.type === "Identifier";
}

function paramsValidator(
  node: Node & Rule.NodeParentExtension,
  params: Array<Pattern>,
  validator: Validator,
  context: Rule.RuleContext
) {
  params.forEach((param) => {
    switch (param.type) {
      case "AssignmentPattern":
        if (isIdentifier(param.left)) {
          validator(node, param.left, context);
        }
        break;
      case "RestElement":
        if (isIdentifier(param.argument)) {
          validator(node, param.argument, context);
        }
        break;
      case "ArrayPattern":
        param.elements.forEach((element) => {
          if (isIdentifier(element)) {
            validator(node, element, context);
          }
        });
        break;
      case "Identifier":
        validator(
          node,
          param as Identifier & Rule.NodeParentExtension,
          context
        );
        break;
      default: // ignore
    }
  });
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
    "FunctionDeclaration:exit": (
      node: FunctionDeclaration & Rule.NodeParentExtension
    ) => {
      const functionInfo = functionStack.pop();
      if (!functionInfo) {
        throw new Error("function stack underflow");
      }
      if (!node.id || !isIdentifier(node.id)) {
        throw new Error("Expected an Identifier node");
      }
      validator(node, node.id, context, functionInfo);
      paramsValidator(node, node.params, validator, context);
    },
    FunctionExpression(node) {
      if (node.id && isIdentifier(node.id)) {
        validator(node, node.id, context);
      }
      paramsValidator(node, node.params, validator, context);
    },
    ArrowFunctionExpression(node) {
      paramsValidator(node, node.params, validator, context);
    },
    VariableDeclaration(node) {
      node.declarations.forEach((decl) => {
        if (isIdentifier(decl.id)) {
          validator(node, decl.id, context);
        }
      });
    },
    ObjectExpression(node) {
      node.properties.forEach((prop) => {
        if (
          prop.type === "Property" &&
          prop.kind === "init" &&
          isIdentifier(prop.key)
        ) {
          validator(node, prop.key, context);
        }
      });
    },
  };
}
