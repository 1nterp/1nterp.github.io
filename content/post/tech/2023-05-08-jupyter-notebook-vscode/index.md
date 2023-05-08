---
title: "Jupyter Notebook on VSCode"
description: "Visual Studio Code 에서 빠르게 환경 구성하고 사용하기"
author: InterP
date: 2023-05-08 09:40:22 +0900
url: /jupyter-notebook-vscode
categories:
- Tech
tags:
- Jupyter Notebook
- VSCode
- Anaconda
---

# Jupyter Notebook 이란

웹 브라우저에서 Python 코드를 작성/실행하는 REPL (Read-Eval-Print Loop) 개발 도구이다. 주로 머신러닝이나 데이터분석 용도로 Python을 사용할 때 쓰이는 도구이다. 코드를 작성하고 곧바로 실행한 결과를 볼 수 있어 간편하며, Notebook 파일로 공유가 가능하다는 특징이 있다.

원래는 [**Anaconda**](https://www.anaconda.com/download) 를 활용하면서 Notebook 웹 서비스를 컴퓨터에 띄우는 게 일반적인 사용 방법이다. 하지만, Anaconda 설치나 웹 서비스를 띄우지 않고도 VSCode 에서 곧바로 사용해 볼 수 있는 가장 빠른 방법 역시 정리해 봤다. (물론 `conda` 를 쓰지 않는다 뿐이지, 나 또한 가상환경을 따로 설정해서 썼으니 사실상 원리는 똑같다.)

# Visual Studio Code 에서

## 확장 프로그램 설치

*View > Extensions* 으로 이동해서 `jupyter` 라고 검색하자. Microsoft 에서 공인된 확장 프로그램이 여럿 나오는데, 맨 위에 있는 [**Jupyter**](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) 만 설치해도 알아서 설치될 것이다.

아래 노란색으로 칠해 둔 것은 실험적인 기능을 위한 확장 프로그램이니, 필요한 경우에만 설치하도록 하자.

한 가지 더, `Python` 확장 프로그램도 설치되었는지 확인하자. 

{{< figure src="extension.png" width="50%">}}

## 환경 설정 (1) Python

Anaconda 없이 쓸 경우, Python 이나 Virtualenv 와 이미 친숙한 경우라면 이 방법이 좀 더 수월할 수 있다. Python 설치가 안 되어 있다면 [설치하면 되는데](https://www.python.org/downloads/), Python 버전은 3.8 이상이면 된다. (ipykernel 때문)

여기에 프로젝트 디렉터리를 만들고, 거기에만 사용할 가상 환경을 꾸리려면 virtualenv 를 사용하자.

현재 디렉터리가 프로젝트 디렉터리라고 가정하고, 다음을 실행하자. (Windows 의 경우엔 cmd, powershell 에 따라 활성화 방법이 조금 다르다.) 
```bash
python -m pip install virtualenv
python -m virtualenv venv
source venv/bin/activate 
pip install jupyter ipykernel
```

## 환경 설정 (2) Anaconda
파이썬 설치나 가상환경 만드는 것 자체가 귀찮거나, 파이썬과 친숙하지 않은 경우, 윈도우에서 한 방에 Jupyter Notebook 을 실행하고자 하는 경우라면 Anaconda 가 더 좋을 수 있다. 사용자가 필요없는 패키지도 설치하기 때문에 용량이 크고 시간이 오래 걸린다는 점은 단점이겠지만 말이다.

[다운로드 사이트](https://www.anaconda.com/download)에서 운영체제에 맞는 설치 파일을 내려받아 실행한 뒤, 설치가 끝나면 준비가 완료된 것이다.

여기서 가상환경을 만들고 싶다면 다음과 같이 한다. 이렇게 하면, 프로젝트 디렉터리 내부에 `venv` 따위를 만들지 않아도 되는 편리함은 있다.  대신, 이 때 나오는 `environment location` 을 잘 기억해 두자. 
```bash
conda create -n jupyter_env
conda activate jupyter_env
```


## 실제 사용

다른 예제에서는 ipykernel 을 설치하거나 웹 서비스를 띄워서 브라우저에서 접속한 뒤에 개발을 시작하는데 그럴 필요가 없다.

1. 프로젝트 디렉터리를 만든다. (virtualenv 를 사용한 경우라면 작업해 둔 디렉터리가 이미 있어야 한다)
1. VSCode 로 해당 디렉터리를 오픈한다. (File -> Open Folder..) 여기서 작업할 것이다.
1. Command Palette (`Ctrl+Shift+P` 또는 `Cmd+Shift+P`) 를 열어 **Create: New Jupyter Notebook** 을 선택한다.
1. Notebook 파일이 하나 생성되었다. (아직 저장은 안 됨) 이 노트북이 사용할 커널 환경을 지정해야 하는데, 우리가 만든 가상환경 또는 파이썬 실행파일을 지정하기만 하면 알아서 다 해주니까 너무 걱정말자.
  1. 다시 Command Palette 를 열어, 이번엔 **Notebook: Select Notebook Kernel** 을 선택한다. 반드시 Notebook 파일이 열린 상태에서 선택해야 하며, 다른 파일에서는 아무런 반응이 없으니 주의.
  1. **Select Another Kernel..** 을 선택.
  1. **Python Environments..** 를 선택.
  1. 이제 Anaconda 를 했건, Virtualenv 를 사용했건 간에 VSCode 가 인식할 수 있는 모든 Python binary 경로가 나온다. 원하는 경로에 있는 Python 을 선택하고, 만약 없으면 Python binary 의 경로를 직접 입력해 주자.

그러면 VSCode 가 알아서 jupyter 와 ipykernel 을 설치해 준다!

Virtualenv 의 경우에는 직접 설치하라고 귀띔해 주긴 했는데, 내 기억엔 저게 필요 없었던 것 같지만 보험 차원에서 설명한 것이니 ~~이해해달라~~.

# 결과

나는 Anaconda 로 설치해 둔 게 있어서 환경만 새로 만들어 다음과 같이 바로 돌려봤다. 심지어 Notebook 파일을 저장하지 않았는데도 잘 도는 것을 확인할 수 있다!

{{< figure src="result.png" width="100%">}}

# 응용

만약 다른 튜토리얼처럼 웹 서버를 실행한 경우엔 어떡할까? 아까 눈치챘겠지만 `**Select Another Kernel..**' 화면에서 *Existing Jupyter Server* 를 선택할 수 있다. 거기서 오픈된 웹 서버 URL 을 입력하면 똑같이 VSCode 인터페이스에서 개발이 가능하다!