const UTILS = require("./utils.js")
const CALL_PREC = 5
const EXPR_PREC = 6

FUNCTION = {
    statement: $ => choice(
        field("return", seq( ";", $.expression)),
        seq($.var_declaration, "=", $.expression),
        seq($.expression, "=", $.expression),
        $.expression,
    ),

    return_in_expr: $ => ";",

    expression: $ => choice(
        $.math_expr,
        $.if_statement,
        $.if_else_statement,
        $.while_statement,
        $.block,
    ),

    if_statement: $ => prec.left(seq(
        "?",
        field("if", $.math_expr),
        field("then", $.expression),
    )),

    if_else_statement: $ => prec(7, seq(
        $.if_statement,
        ":",
        $.expression,
    )),

    while_statement: $ => seq(
        "@",
        $.math_expr,
        $.expression,
    ),

    call: $ => prec(CALL_PREC, seq(
        field("func", $._expr_atom),
        optional($.type_parameters),
        "(",
        UTILS.separatedBy(",", $.expression),
        ")",
    )),

    math_expr: $ => 
      prec.left(seq(
          repeat($.unary_op), 
          $._expr_atom, 
          repeat(seq($.binary_op, repeat($.unary_op), $._expr_atom))
      )),

    binary_op: $ => choice('+', '-', '*', '/', '**', '%', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '.', '&', '|', '^'),
    unary_op: $ => choice('-', '*', '&', '!'),

    _expr_atom: $ => choice(
        $.var_name,
        $._int_lit,
        $.float_lit,
        $.bool_lit,
        $.string_lit,
        seq(
            field("type", $.type), 
            $._expr_atom
        ),
        $.call,
        seq("(", $.expression, ")"),
    ),

    _int_lit: $ => choice($.binary_lit, $.octal_lit, $.decimal_lit, $.hex_lit),
    binary_lit: $ => /0b[01][01_]*/,
    octal_lit: $ => /0o[0-8][0-8_]*/,
    hex_lit: $ => /0x[0-9abcdef][0-9abcdef_]*/,
    decimal_lit: $ => /[0-9][0-9_]*/,
    float_lit: $ => /[0-9_]*\.[0-9_]+e[+-]?[0-9_]+/,
    bool_lit: $ => choice('true', 'false'),
    string_lit: $ => /"[^"]*"/,

}
