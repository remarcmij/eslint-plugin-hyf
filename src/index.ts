import redundantAffixesRule from "./rules/affixes";
import camelCaseRule from "./rules/camelCase";
import commentedOutCodeRule from "./rules/comments";
import descriptiveNamesRule from "./rules/descriptive-names";
import useMapResult from "./rules/useMapResult";

const ruleModule = {
  rules: {
    camelcase: camelCaseRule,
    "use-map-result": useMapResult,
    "descriptive-names": descriptiveNamesRule,
    "no-redundant-affixes": redundantAffixesRule,
    "no-commented-out-code": commentedOutCodeRule,
  },
};

export = ruleModule;
