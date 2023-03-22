function separatedBy(sep, rule) {
  return optional(seq(
      rule, 
      repeat(seq(sep, rule)), 
      optional(sep)
  ));
}

module.exports = {
    separatedBy,
};
