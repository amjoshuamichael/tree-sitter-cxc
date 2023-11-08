const UTILS = require("./utils.js")
const BLOCK_PREC = 1

FILE = {
    _definition: $ => choice(
        $.function_definition,
        $.type_defintion,
        $.method_definition,
    ),

    function_definition: $ => seq(
        field("name", $.var_name),
        optional($.generics_declaration),
        '(',
        UTILS.separatedBy(',', $.parameter),
        ')',
        optional(seq(
            field("returnchar", ';'), 
            field("returntype", $.type),
        )),
        $.block,
    ),

    parameter: $ => $.var_declaration,

    type_defintion: $ => seq(
        $.type_name,
        $.generics_declaration,
        "=",
        $.type,
    ),

    method_definition: $ => seq(
        $.generics_declaration,
        $.type,
        ":",
        choice(":", "."),
        "{",
        repeat($.function_definition),
        "}",
    ),

    generics_declaration: $ => seq(
        "<",
        UTILS.separatedBy(',', $.type_name),
        ">",
    ),

    block: $ => prec(1, seq("{", repeat($.statement), "}")),

}
