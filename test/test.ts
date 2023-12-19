import { RuleTester } from "@typescript-eslint/rule-tester";

import { rule } from "../index";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("my-typed-rule", rule, {
  valid: [],
  invalid: [
    {
      name: "my-test",
      code: `
      abstract class BaseClass {
        abstract myMethod(arg0: string, arg1?: string);
      }

      class ParentImpl extends BaseClass {
        myMethod(arg0: string, arg1?: string) {
          // Do stuff
        }
      }

      class OverrideClass extends ParentImpl {
        override myMethod(arg0: string) {
          super.myMethod(arg0);
        }
      }      `,
      errors: [
        {
          messageId: "incompleteSignature",
        },
      ],
    },
  ],
});
