import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  // TODO: link to github
  (name) => `https://example.com/rule/${name}`
);

export const rule = createRule({
  create(context) {
    return {
      MethodDefinition(node) {
        if (!node.override) {
          return;
        }

        const something =
          context.sourceCode.parserServices.tsNodeToESTreeNodeMap.get(
            (node.parent.parent as any).superClass
          );
        console.log(node.parent);
      },
    };
  },
  name: "uppercase-first-declarations",
  meta: {
    docs: {
      description:
        "Method overrides should implement the complete method signature.",
    },
    messages: {
      incompleteSignature: "Incomplete signature.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
});
