---
title: "VSCode Vim Undo/Redo 키 반복 입력이 안 될 때"
description: "VSCode 와 Extension 충돌로 인한 문제, workaround 는?"
author: InterP
date: 2023-02-21 00:00:00 +0900
url: /vscode-vim-undo-redo-key-repeat
categories:
- Tech
image: feature.png
tags:
- Vim
- VSCode
---

# 문제
최근에 Undo 키인 `u` 와 Reo 키인 `Ctrl+r` 을 반복해서 입력해도, 딱 **한 번씩만** 작동하는 현상을 겪었다.

# 조치
우선 VSCodeVim 의 이슈에는 [몇년 전에 올라온 것](https://github.com/VSCodeVim/Vim/issues/1490) 이 있는데, 최근 코멘트를 뒤지다 보니 workaround 는 찾을 수 있었다. ([링크](https://github.com/VSCodeVim/Vim/issues/2007#issuecomment-529924611))

1. Command Palette 를 열어서 **Preferences: Open User Settings (JSON)** 을 검색해 선택한다.
1. 다음을 붙여넣고 Reload Window 를 선택해 VSCode 를 재시작한다.

```json
    "vim.normalModeKeyBindingsNonRecursive": [
        {
            "before": [
                "u"
            ],
            "after": [],
            "commands": [
                {
                    "command": "undo"
                }
            ]
        },
        {
            "before": [
                "<C-r>"
            ],
            "after": [],
            "commands": [
                {
                    "command": "redo"
                }
            ]
        }
    ]
```

물론 특정 Workspace 에만 설정하고 싶다면, **Preferences: Open Workspace Settings (JSON)** 을 선택해 편집하면 된다. 
