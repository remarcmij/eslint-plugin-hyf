/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Rule } from "eslint";
import { Program } from "estree";

const statementPatterns = [
  /^\s*await\s+\w+/,
  /^\s*break\b/,
  /^\s*case\s+.+:/,
  /^\s*catch\s+\(/,
  /^\s*class\s+\w+/,
  /^\s*const\s+\w+/,
  /^\s*continue\b/,
  /^\s*do\s+{/,
  /^\s*{?\s*else\b/,
  /^\s*export\s+\w+/,
  /^\s*for\s*\(/,
  /^\s*(?:async\s+)?function\b/,
  /^\s*if\s*\(/,
  /^\s*import\s*{?\w+/,
  /^\s*let\s+\w+/,
  /^\s*return\b/,
  /^\s*switch\s*\(/,
  /^\s*throw\s+\w+/,
  /^\s*try\s+{/,
  /^\s*var\s+\w+/,
  /^\s*while\s+\(/,
  /^\s*\w[\w.]*\s*[-+/*]?[=(]/, // assignment, function call
];

function commentedOutCodeCheck(node: Program, context: Rule.RuleContext): void {
  if (node.comments == null) {
    return;
  }
  const comments = node.comments.filter((comment) => comment.type === "Line");

  const iter = comments[Symbol.iterator]();
  let item = iter.next();

  while (!item.done) {
    const text = item.value.value;

    if (statementPatterns.some((pattern) => pattern.test(text))) {
      const startLoc = item.value.loc!;
      let lineNum = startLoc.start.line;

      // find end of contiguous comments segment
      while (!item.done && item.value.loc!.start.line === lineNum) {
        lineNum++;
        item = iter.next();
      }

      context.report({
        messageId: "removeComments",
        loc: startLoc,
      });
    } else {
      item = iter.next();
    }
  }
}

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      removeComments: "Remove commented-out code.",
    },
  },
  create(context: Rule.RuleContext): Rule.RuleListener {
    return {
      "Program:exit": function (node: Program) {
        return commentedOutCodeCheck(node, context);
      },
    };
  },
};

export default rule;
