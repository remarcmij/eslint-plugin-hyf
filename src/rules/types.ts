import { Rule } from "eslint";
import { Node, Identifier } from "estree";

export type FunctionInfo = {
  thisAssignmentSeen: boolean;
  returnSeen: boolean;
};

export type Validator = (
  node: Node & Rule.NodeParentExtension,
  id: Identifier & Rule.NodeParentExtension,
  context: Rule.RuleContext,
  functionInfo?: FunctionInfo
) => void;
