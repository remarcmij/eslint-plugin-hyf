import meaninglessAffixRule from "./rules/meaninglessAffix";
import camelCaseRule from "./rules/camelCase";
import commentedOutCodeRule from "./rules/comments";
import descriptiveNamesRule from "./rules/nondescriptNames";
import useMapResultRule from "./rules/useMapResult";

const ruleModule = {
  rules: {
    camelcase: camelCaseRule,
    "use-map-result": useMapResultRule,
    "no-nondescript-names": descriptiveNamesRule,
    "no-meaningless-affixes": meaninglessAffixRule,
    "no-commented-out-code": commentedOutCodeRule,
  },
};

export = ruleModule;
