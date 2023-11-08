require("./utils.js")
require("./file.js")
require("./function.js")
require("./type.js")

const VAR_NAME_PREC = 1;
const TYPE_NAME_PREC = 2;

module.exports = grammar({
  name: 'cxc',

  rules: {
    source_file: $ => repeat($._definition),

    var_declaration: $ => seq(
        $.var_name,
        ":",
        $.type,
    ),

    var_name: $ => token(prec(VAR_NAME_PREC, /[a-z_][a-za-z0-9_]+|[a-z_]/)),

    type_name: $ => /[A-Z][A-Za-z0-9]+|[A-Z]/,
    int_type: $ => token(prec(TYPE_NAME_PREC, /u[0-9]+|i[0-9]+|usize|isize/)),
    float_type: $ => token(prec(TYPE_NAME_PREC, /f16|f32|f64|f128/)),
    bool_type: $ => token(prec(TYPE_NAME_PREC, "bool")),

    comment: $ => /#.*\n/,
    _whitespace: $ => /[\n\t \f]+/,
    
    ...FUNCTION,
    ...FILE,
    ...TYPE,
  },

    extras: $ => [ $.comment, $._whitespace ],
});


