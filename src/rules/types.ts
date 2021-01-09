import { Rule } from "eslint";
import { Node } from "estree";

export type FunctionInfo = {
  thisAssignmentSeen: boolean;
  returnSeen: boolean;
};

export type Validator = (
  node: Node,
  id: Node,
  context: Rule.RuleContext,
  functionInfo?: FunctionInfo
) => void;
