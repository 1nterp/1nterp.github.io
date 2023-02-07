---
title: VSCode Python 디버그 반응이 없을 때
description: 버전 문제일수도, Workspace 경로 문제일수도?
author: interp
date: 2022-08-23T22:26:07.000+09:00
url: "/vscode-python-debugging-no-response/"
image: "feature.png"
aliases:
- "/VSCode-Python-Debugging-반응-없음/"
- "/entry/vscode-python-debugging-no-response/"
- "/entry/VSCode-Python-Debugging-반응-없음/"
categories:
- Tech
tags:
- Python
- VSCode
- Debug
---
# 증상

Visual Studio Code 에서 Python 파일을 디버깅 (debugging) 하려 하면, **아무런 반응이 없고 곧바로 종료된다.** 그냥 실행 자체를 하지 않은 것 처럼 말이다..!

# 분석

관련해서 메시지가 나타나지 않기 때문에, 단서를 찾기가 쉽진 않았다. 그나마 '_Output_' 패널에 있는 '_Python_' 에서 아래와 같은 로그가 한 줄 떠 있었다.

```
DAP Server launched with command: /home/interp/work/project/venv/bin/python \
  /home/interp/.vscode-server/extensions/ms-python.python-2022.12.1/pythonFiles/lib/python/debugpy/adapter
```

저기서 `.. with command:` 이후의 명령어를 그대로 **터미널에서** 입력해 보았다. 

```bash
Traceback (most recent call last):
  File "/home/interp/.pyenv/versions/3.6.12/lib/python3.6/runpy.py", line 193, in _run_module_as_main
    "__main__", mod_spec)
  File "/home/interp/.pyenv/versions/3.6.12/lib/python3.6/runpy.py", line 85, in _run_code
    exec(code, run_globals)
  File "/home/interp/.vscode-server/extensions/ms-python.python-2022.12.1/pythonFiles/lib/python/debugpy/adapter/__main__.py", line 212, in <module>
    __import__("debugpy")
  File "/home/interp/.vscode-server/extensions/ms-python.python-2022.12.1/pythonFiles/lib/python/debugpy/adapter/../../debugpy/__init__.py", line 28, in <module>
    "Python 3.6 and below is not supported by this version of debugpy; "
AssertionError: Python 3.6 and below is not supported by this version of debugpy; use debugpy 1.5.1 or earlier.
```

# 원인과 해결

저기서 마지막 문장이 중요하다.
```
AssertionError: Python 3.6 and below is not supported by this version of debugpy; \
    use debugpy 1.5.1 or earlier.
```

찾아보니 Python Extension 에서 debugpy 버전을 업그레이드 했고, 더 이상 Python 3.6 에서 호환되지 않는 것이 문제였다. [Changelog](https://marketplace.visualstudio.com/items/ms-python.python/changelog)를 보니, 2022.10.0 버전부터 debugpy 를 1.6.2 로 올린 것을 확인할 수 있었다.

그러면 해결책은 간단하다. 원하는 대로 해주거나, 되돌아가거나.

## (1) Python3.6 에서 버전 업그레이드

가장 간단한 방법은 더 높은 버전의 Python을 설치하고, 해당 버전을 기본 환경으로 설정하면 된다.

`virtualenv` 없이 Python 버전만 바꾼다면, VSCode 에서 Command Palette (`Ctrl/Cmd+Shift+P`) 를 열어서 **Python: Select Interpreter** 를 선택하는 것으로 버전 선택이 가능하다.

나는 `virtualenv` 를 통해 개발 환경을 구성하기 때문에 아래와 같은 순서대로 업그레이드를 진행했다. 혹시 참고가 되길 바라며 정리해 둔다.

1. (requirements.txt 따위로 관리하고 있지 않는다면) `pip freeze > requirements.txt` 로 설치된 라이브러리 백업
1. 기존 virtualenv directory 삭제 (예: `venv` 라고 가정하자)
1. 더 높은 버전의 Python 설치 (예: `python3.9` 을 설치했다고 가정하자)
1. `python3.9 -m virtualenv venv` 으로 virtualenv directory 생성
1. `source venv/bin/activate && pip install -r requirements.txt` 로 라이브러리 재설치

## (2) Extension 다운그레이드 하기

다른 해결책으로는, VSCode Python 의 Extension 버전을 다운그레이드 하는 방법이다.

{{< figure src="downgrade.png" align="center" >}}

Extension 탭에서 Python 을 찾은 다음, **Install Another Version** 을 선택한다. 잠시 기다리면, 버전 목록이 나타나며, 초록색 부분 (그 아래도 상관없음) 을 클릭하면 된다.

하지만 별로 추천하고 싶진 않다. Python 3.10 까지 나온 마당에 특별한 이유가 없다면 (1) 번처럼 Python 버전을 올리는게 좋을 것 같다.

## (3) Symbolic link 경로 문제

혹시 (1) 이나 (2) 번을 전부 적용해도 (아니면 이미 Python 3.6 이상의 버전을 쓰고 있는데도) 디버깅이 안 된다면 이 해결책이 도움이 될 것이다.

한 번은, symbolic link 경로로 workspace directory 를 열었을 때 디버깅 문제가 생겼었다. 반대로 말하면, symbolic link 경로가 아닌 **실제 directory 경로로 workspace 를 열어야** 한다.

나는 `/home/interp/` 를 home directory 로 쓰고 있지만, 실제 경로는 `/SSD/home/interp` 이고 `$HOME` 경로는 Symbolic link 였었다. 이런 경우엔 *File > Open Folder...* 를 통해 workspace directory 를 열 때, 실제 경로인 _/SSD/home/interp/..._ 로 시작하도록 경로를 입력하자. 그래야 Python 디버거가 정상 작동했다.