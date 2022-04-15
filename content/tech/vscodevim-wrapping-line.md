+++
author = "InterP"
categories = ["Tech"]
date = 2022-04-15T02:45:00Z
tags = ["vim", "VSCode"]
title = "VSCodeVim: Wrapping Line 위/아래로 커서 이동하기"
url = "vim-wrapping-line-cursor-up-down"
[cover]
image = ""

+++
VSCode 에서도 Vim 환경을 쓰고 싶어서 [VSCodeVim](https://github.com/VSCodeVim/Vim) 을 설치해서 쓰고 있다. 

![](/images/2022-04-15-vscodevim.png)

그런데 위와 같이 markdown 편집을 할 때 처럼 line wrapping 이 된 경우에는, 커서를 위/아래로 내릴 경우에 다음 '줄' 로 이동한다. **화면에 보이는 줄이 아니라, 실제 줄로 이동하기 때문에**, 커서를 옮길 때 여간 불편한 게 아니다.

Vim 도 사실 line wrapping 이 되었을 때 같은 문제가 있고, (문제라기 보다는 특성인데) 원하는 방법대로 우회할 수 있는 방법을 [여기](https://vim.fandom.com/wiki/Move_cursor_by_display_lines_when_wrapping)서 찾았다. 이 방법을 그대로 VSCode 에도 적용한 것이다.

먼저 Settings 를 열어서 **Vim: Normal Mode Key Bindings** 로 이동하면, Edit in settings.json 링크가 있다. 이걸 눌러서 다음을 추가하자.

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

적용하고 곧바로 편집 중인 파일로 돌아오면 적용이 되어 있는 걸 볼 수 있다. 이제 커서를 위/아래로 움직여도 화면에 보이는 윗줄/아랫줄로 이동한다!