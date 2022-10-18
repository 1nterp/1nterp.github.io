---
title: VSCode Python 디버그 반응이 없을 때
author: interp
date: 2022-08-23T22:26:07.000+09:00
url: "/vscode-python-debugging-no-response/"
categories:
- Tech
tags:
- Python
- VSCode
- Debug
---
## 증상

VSCode 에서 Python 파일을 디버깅하려 하면, **아~무런 반응이 없다.** 그냥 실행 자체를 하지 않은 것 같다!

## 분석

관련 로그가 남아있지 않기 때문에, 분석이 쉽지 않다. 그나마 갱신되는 로그가 'Python' 에서 보이는 한 줄의 명령어인데...

```
DAP Server launched with command: /home/interp/work/project/venv/bin/python \
  /home/interp/.vscode-server/extensions/ms-python.python-2022.12.1/pythonFiles/lib/python/debugpy/adapter
```

이 명령어를 그대로 **터미널에서** 쳐 보니 해결책이 보였다.

```bash
Traceback (most recent call last):
  File "/home/i520508/.pyenv/versions/3.6.12/lib/python3.6/runpy.py", line 193, in _run_module_as_main
    "__main__", mod_spec)
  File "/home/i520508/.pyenv/versions/3.6.12/lib/python3.6/runpy.py", line 85, in _run_code
    exec(code, run_globals)
  File "/INT3/homes/i520508/.vscode-server/extensions/ms-python.python-2022.12.1/pythonFiles/lib/python/debugpy/adapter/__main__.py", line 212, in <module>
    __import__("debugpy")
  File "/INT3/homes/i520508/.vscode-server/extensions/ms-python.python-2022.12.1/pythonFiles/lib/python/debugpy/adapter/../../debugpy/__init__.py", line 28, in <module>
    "Python 3.6 and below is not supported by this version of debugpy; "
AssertionError: Python 3.6 and below is not supported by this version of debugpy; use debugpy 1.5.1 or earlier.
```

## 원인

Python Extension 에서 debugpy 버전을 올렸는데, 이게 더 이상 Python 3.6 에서 호환되지 않는 것이다. [Changelog](https://marketplace.visualstudio.com/items/ms-python.python/changelog)를 보니, 2022.10.0 버전부터 debugpy 를 1.6.2 로 올린 것을 확인할 수 있었다.

## 해결 (1) Python3 버전 업그레이드 하기

그러면 해결책은 간단하다. 원하는 대로 해주거나, 되돌아가거나.

나는 virtualenv 를 사용하고 있어서, `pip freeze` 를 통해 설치된 라이브러리를 전부 백업해 두고, virtualenv 를 Python 3.7 버전으로 다시 만들어 환경을 구성했다.

## 해결 (2) VSCode Python Extension 다운그레이드 하기

다른 해결책으로는, extension 의 버전을 다운그레이드 하는 방법이다.

{{< figure src="downgrade.png" align="center" >}}

Extension 탭에서 Python 을 찾은 다음, **Install Another Version** 을 선택한다. 잠시 기다리면, 버전 목록이 나타나며, 초록색 부분 (그 아래도 상관없음) 을 클릭하면 된다.

별로 추천하고 싶진 않다. Python 3.10 이 나온 마당에 이왕이면 Python 버전을 올리는게 좋을 것 같다.

## 해결 (3) Symbolic link 경로 문제

Symbolic link 경로로 workspace directory 를 열어 둔 경우에도 디버깅 문제가 생겼었다.  해결책은, 실제 directory 경로로 workspace 를 열어야 한다.

나는 /home/interp/ 를 `$HOME` 으로 쓰지만, 사실은 /SSD/home/interp 를 /home/interp 라는 Symbolic link 로 만들어 쓰고 있다. 이 때는 디렉토리를 열 때 _/SSD/home/interp/..._ 로 시작하도록 경로를 입력해야 Python 디버거가 정상 작동했다.