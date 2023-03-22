A tree sitter grammar for [cxc](https://github.com/amjoshuamichael/cxc).

```
tree-sitter generate
tree-sitter test
```

This is how I have it installed in my [neovim](https://github.com/nvim-treesitter/nvim-treesitter) config, if that's how you're using it:

```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()

parser_config.cxc = {
    install_info = {
        url = "https://github.com/amjoshuamichael/tree-sitter-cxc", -- local path or git repo
        files = {"src/parser.c"},
        -- optional entries:
        branch = "main", -- default branch in case of git repo if different from master
    },

    filetype = "cxc",
}

local ft_to_parser = require("nvim-treesitter.parsers").filetype_to_parsername
ft_to_parser.cxc = "cxc" -- the someft filetype will use the python parser and queries.

vim.api.nvim_create_autocmd({"BufNewFile", "BufRead", "BufEnter"}, {
    pattern = {"*.cxc"},
    command = "set filetype=cxc | set syntax=cxc",
})
```
