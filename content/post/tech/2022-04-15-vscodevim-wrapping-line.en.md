---
author: "InterP"
categories: 
  - Tech
date: 2022-04-15 02:45:00 +0900
tags: 
  - vim
  - VSCode
title: "VSCodeVim: Moving cursor in a wrapped line"
url: "/en/vim-wrapping-line-cursor-up-down/"
---

I installed [VSCodeVim](https://github.com/VSCodeVim/Vim) into my Visual Studio code to code only with keyboard.

![](/images/2022-04-15-vscodevim.png)

But like above, a long line is wrapped so actually it's a single line but it's shown as multiple lines. In this case, if I pressed `k` or `↓` on the first (visible) line, the cursor moves to the next *actual* line which I don't want to at all!

## How to solve
Actually it's not a problem but a characteristic of Vim with wrapped line, so I found [a document](https://vim.fandom.com/wiki/Move_cursor_by_display_lines_when_wrapping) as a workaround. Then I could adopt it into Visual Studio code as well.

Firstly, open `Settings` page and move to **Vim: Normal Mode Key Bindings** section. Then you can see `Edit in settings.json` button. In the following JSON file, put below blocks will solve the issue.
```json
        "vim.normalModeKeyBindings": [
          {
            "before": ["<Up>"],
            "after": ["g", "k"]
          },
          {
            "before": ["<Down>"],
            "after": ["g", "j"]
          }
        ]
```