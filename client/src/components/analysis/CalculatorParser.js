import { CstParser } from "chevrotain";
import { allTokens, PlusMinusOperator, NumberLiteral } from "./code_Metrics";

export default class CalculatorParser extends CstParser {
  constructor() {
    super(allTokens);
    const $ = this;

    $.RULE("expression", () => {
      $.SUBRULE($.additionExpression);
    });

    $.RULE("additionExpression", () => {
      $.SUBRULE($.atomicExpression, { LABEL: "lhs" });
      $.MANY(() => {
        $.CONSUME(PlusMinusOperator);
        $.SUBRULE2($.atomicExpression, { LABEL: "rhs" });
      });
    });

    $.RULE("atomicExpression", () => {
      $.CONSUME(NumberLiteral);
    });

    $.performSelfAnalysis();
  }
}