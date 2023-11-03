import { Lexer, createToken } from "chevrotain";

export const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /[1-9]\d*/,
});

export const PlusMinusOperator = createToken({
  name: "PlusMinusOperator",
  pattern: Lexer.NA,
});

export const Plus = createToken({
  name: "Plus",
  pattern: /\+/,
  categories: PlusMinusOperator,
});

export const Minus = createToken({
  name: "Minus",
  pattern: /-/,
  categories: PlusMinusOperator,
});

// const Identifier = createToken({
//   name: "Identifier",
//   pattern: /[a-zA-Z_]\w*/,
// });

export const Whitespace = createToken({
  name: "Whitespace",
  pattern: /\s+/,
  line_breaks: true,
  group: Lexer.SKIPPED,
});

export const dot = createToken({
  name: "dot",
  pattern: /\./,
});


export const and = createToken({
  name: "and",
  pattern: /&&/,
  categories: PlusMinusOperator,
});

export const or = createToken({
  name: "or",
  pattern: /\|\|/,
  categories: PlusMinusOperator,
});

export const not = createToken({
  name: "not",
  pattern: /!/,
  categories: PlusMinusOperator,
});

export const equal = createToken({
  name: "equal",
  pattern: /==/,
  categories: PlusMinusOperator,
});

export const not_equal = createToken({
  name: "not_equal",
  pattern: /!=/,
  categories: PlusMinusOperator,
});

export const less = createToken({
  name: "less",
  pattern: /</,
  categories: PlusMinusOperator,
});

export const greater_than = createToken({
  name: "greater_than",
  pattern: />/,
  categories: PlusMinusOperator,
});

// export const less_than = createToken({
//   name: "less_than",
//   pattern: /</,
//   categories: PlusMinusOperator,
// });

export const greater_than_equal = createToken({
  name: "greater_than_equal",
  pattern: />=/,
  categories: PlusMinusOperator,
});

export const less_than_equal = createToken({
  name: "less_than_equal",
  pattern: /<=/,
  categories: PlusMinusOperator,
});

export const assign = createToken({
  name: "assign",
  pattern: /=/,
  categories: PlusMinusOperator,
});

export const plus_assign = createToken({
  name: "plus_assign",
  pattern: /\+=/,
  categories: PlusMinusOperator,
});

export const minus_assign = createToken({
  name: "minus_assign",
  pattern: /-=/,
  categories: PlusMinusOperator,
});

export const multiply_assign = createToken({
  name: "multiply_assign",
  pattern: /\*=/,
  categories: PlusMinusOperator,
});

export const divide_assign = createToken({
  name: "divide_assign",
  pattern: /\/=/,
  categories: PlusMinusOperator,
});

export const mod_assign = createToken({
  name: "mod_assign",
  pattern: /%=/,
  categories: PlusMinusOperator,
});

export const increment = createToken({
  name: "increment",
  pattern: /\+\+/,
  categories: PlusMinusOperator,
});

export const decrement = createToken({
  name: "decrement",
  pattern: /--/,
  categories: PlusMinusOperator,
});

export const multiply = createToken({
  name: "multiply",
  pattern: /\*/,
  categories: PlusMinusOperator,
});

export const divide = createToken({
  name: "divide",
  pattern: /\//,
  categories: PlusMinusOperator,
});

export const mod = createToken({
  name: "mod",
  pattern: /%/,
  categories: PlusMinusOperator,
});

export const new_statment = createToken({
  name: "new",
  pattern: /new/,
  categories: PlusMinusOperator,
});


export const if_statment = createToken({
    name: "if",
    pattern: /if/,
    categories: PlusMinusOperator
})

export const void_statment = createToken({
    name: "void",
    pattern: /void/,
    categories: PlusMinusOperator
})


export const for_loop = createToken({
    name: "for_loop",
    pattern: /for/,
    categories: PlusMinusOperator
})

export const while_loop = createToken({
    name: "while_loop",
    pattern: /while/,
    categories: PlusMinusOperator
})

export const do_while_loop = createToken({
    name: "do_while_loop",
    pattern: /do/,
    categories: PlusMinusOperator
})

export const switch_case = createToken({
    name: "switch_case",
    pattern: /switch/,
    categories: PlusMinusOperator
})

export const System = createToken({
  name: "System",
  pattern: /System/,
  categories: PlusMinusOperator
})

export const out = createToken({
  name: "out",
  pattern: /out/,
  categories: PlusMinusOperator
})

export const println = createToken({
  name: "println",
  pattern: /println/,
  categories: PlusMinusOperator
})

export const print = createToken({
  name: "print",
  pattern: /print/,
  categories: PlusMinusOperator
})







export const mark = createToken({
  name: "mark",
  pattern: /mark/,
  categories: PlusMinusOperator
})


export const outresult = createToken({
  name: "outresult",
  pattern: /outresult/,
  categories: PlusMinusOperator
})

export const string = createToken({
  name: "string", 
  pattern: /"[^<"]*"|'[^<']*'/,
})


export const CharRef = createToken({
  name: "CharRef",
  pattern: /&#\d+;|&#x[a-fA-F0-9]/,
});



// Order is important
export const allTokens = [

  mark,
  outresult,
  CharRef,
  Plus,
  NumberLiteral,
  PlusMinusOperator,
  Whitespace,
  and,
  or,
  not,
  equal,
  greater_than_equal,
  less_than_equal,
  assign,
  plus_assign,
  multiply_assign,
  divide_assign,
  mod_assign,
  increment,
  multiply,
  divide,
  mod,
  new_statment,
  if_statment,
  void_statment,
  for_loop,
  while_loop,
  do_while_loop,
  switch_case,
  greater_than,
  less,
  dot,
  System,
  out,
  println,
  print,
];

