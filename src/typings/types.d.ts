type Validator = (
  node: ESTree.Node,
  id: IdentifierParentExtension,
  context: Rule.RuleContext
) => void;

type IdentifierParentExtension = Identifier & Rule.NodeParentExtension;
