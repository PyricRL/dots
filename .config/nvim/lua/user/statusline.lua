local heirline = require("heirline")

heirline.setup({
  statusline = {
    {
      provider = function()
        local modes = {
          ['n'] = 'NORMAL',
          ['no'] = 'N-PENDING',
          ['v'] = 'VISUAL',
          ['V'] = 'V-LINE',
          ['s'] = 'SELECT',
          ['S'] = 'S-LINE',
          ['i'] = 'INSERT',
          ['R'] = 'REPLACE',
          ['Rv'] = 'V-REPLACE',
          ['c'] = 'COMMAND',
          ['cv'] = 'VIM EX',
          ['ce'] = 'EX',
          ['r'] = 'PROMPT',
          ['rm'] = 'MORE',
          ['r?'] = 'CONFIRM',
          ['!'] = 'SHELL',
          ['t'] = 'TERMINAL',
        }
        local mode = vim.fn.mode()
        return " -- " .. (modes[mode] or mode) .. " -- "
      end,
      hl = { fg = "Cyan", bold = true },
    },
  },
})

