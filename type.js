const UTILS = require("./utils.js")
const UNARY_OP_PREC = 5
const TUPLE_PREC = 4

TYPE = {
    type: $ => prec.left(choice(
        $.type_name,
        $.int_type,
        $.float_type,
        $.bool_type,
        $.generic_type,
        $.reference_type,
        $.dereference_type,
        $.struct_type,
        $.tuple_type,
        $.sum_type,
        $.function_type,
        $.type_level_func,
        $.array_type,
        $.array_elem,
        $.destructor_type,
    )),

    generic_type: $ => seq( $.type_name, $.type_parameters ),

    reference_type: $ => prec(UNARY_OP_PREC, seq( "&", $.type )),
    dereference_type: $ => prec(UNARY_OP_PREC, seq( "*", $.type )),

    struct_type: $ => seq( "{", UTILS.separatedBy(",", $.struct_field), "}" ),
    struct_field: $ => seq(optional("+"), $.var_name, ":", $.type),
    tuple_type: $ => prec(TUPLE_PREC, seq( "{", UTILS.separatedBy(",", $.type), "}" )),

    sum_type: $ => prec(TUPLE_PREC - 1, seq( "{", UTILS.separatedBy("/", $.type), "}" )),

    function_type: $ => prec.left(seq( "(", UTILS.separatedBy(",", $.type), ")", ";", $.type )),

    type_level_func: $ => seq( $.type_name, "(", UTILS.separatedBy(",", $.type), ")", ),
    array_type: $ => prec.right(seq( "[", $._int_lit, "]", $.type )),

    destructor_type: $ => seq( $.type, "~", $.expression),
    array_elem: $ => seq( $.type, "[]"),

    type_parameters: $ => prec(6, seq( "<", UTILS.separatedBy(",", $.type), ">" )),
}
