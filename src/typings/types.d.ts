type FunctionInfo = {
  thisAssignmentSeen: boolean;
  returnSeen: boolean;
};

type Validator = (
  node: ESTree.Node,
  id: IdentifierParentExtension,
  context: Rule.RuleContext,
  functionInfo?: FunctionInfo
) => void;

type IdentifierParentExtension = Identifier & Rule.NodeParentExtension;
