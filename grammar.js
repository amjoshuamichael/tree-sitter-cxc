require("./utils.js")
require("./file.js")
require("./function.js")
require("./type.js")

module.exports = grammar({
  name: 'cxc',

  rules: {
    source_file: $ => repeat($._definition),

    var_declaration: $ => seq(
        $.var_name,
        ":",
        $.type,
    ),

    var_name: $ => /[a-z_][a-za-z0-9_]+|[a-z_]/,

    type_name: $ => /[A-Z][A-Za-z0-9]+|[A-Z]/,
    int_type: $ => /u[0-9]+|i[0-9]+|usize|isize/,
    float_type: $ => /f16|f32|f64|f128/,
    bool_type: $ => "bool",

    comment: $ => /#.*\n/,
    _whitespace: $ => /[\n\t \f]+/,
    
    ...FUNCTION,
    ...FILE,
    ...TYPE,
  },

    extras: $ => [ $.comment, $._whitespace ],
});


