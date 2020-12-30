type Validator = (
  node: Identifier & Rule.NodeParentExtension,
  context: Rule.RuleContext
) => void;

type IdentifierParentExtension = Identifier & Rule.NodeParentExtension;
