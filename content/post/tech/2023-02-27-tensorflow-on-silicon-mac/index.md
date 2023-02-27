---
title: "Apple Silicon Mac 에 Tensorflow 설치"
description: "M1/M2 Notebook 에서도 머신러닝을 쉽게"
author: InterP
date: 2023-02-27 00:00:00 +0900
url: /apple-silicon-mac-tensorflow-install
categories:
- Tech
image: feature.png
tags:
- Silicon
- Macbook M1 Pro
- Tensorflow
- Machine Learning
---

책 [개발자를 위한 머신러닝&딥러닝](http://www.yes24.com/Product/Goods/112028850) 을 구매해서 읽어보고 있는데, 실습을 해 보기 위해 M1 Pro 칩의 Macbook Pro 에 환경을 설정하려고 했다. 

처음에는 virtualenv 로 가상 환경을 구성하고 tensorflow 를 pip 로 설치하면 되지 않을까? 하는 순진한 생각이었다. 그런데 예제 코드를 돌려보니 뿜어져 나오는 에러에 당황하고 말았다.

다른 가이드들도 많지만 한번 이해하는 차원에서 여기 다시 정리해 둔다.

# Miniconda 설치

[Anaconda](https://www.anaconda.com/products/distribution) 에서 제공하는 tensorflow 관련 dependency 를 설치하기 위해, Anaconda 를 설치해야 한다. 하지만 여기서는 전체 설치를 할 필요는 없고 **Miniconda** 만 설치해도 된다.

다음 경로 중 하나를 선택해 Shell script 파일을 다운로드 받는다. 두 번째가 직접 다운로드 가능한 경로이다.

* [Miniconda Download page](https://docs.conda.io/en/latest/miniconda.html)
* [Shell script 다운로드 링크](https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh)

파일이 위치한 곳에서, 다음 명령을 차례대로 입력한다.
```bash
bash ./Miniconda3-latest-MacOSX-arm64.sh -b -p $HOME/miniconda
source $HOME/miniconda/bin/activate
conda
```

`conda` 명령에 에러가 없으면 설치가 완료되었다. 추가로 다음을 입력해 주자.

```bash
conda init {shell}
```

`{shell}` 에는 현재 사용중인 쉘을 입력한다. bash, zsh 같은 것 말이다. 잘 모르겠다면 `echo $SHELL` 을 입력해서 알아내자.

# Conda 환경에서 Tensorflow 설치

[Apple Developer Page](https://developer.apple.com/metal/tensorflow-plugin/) 에 안내된 대로 설치하면 완료된다.

```bash
conda create -n tf-env python=3.8
conda install -c apple tensorflow-deps
```
위와 같이 conda environment 를 설정한다. 

Python 버전은 *3.8* 이 테스트되었고 다른 버전에 대해서는 자잘한 문제를 일으킬 수 있으니, 버전 업그레이드는 추천하지 않는다.

```bash
conda activate tf-cert3.8
pip install tensorflow-macos==2.9.0
pip install tensorflow-metal==0.5.0
```

`tensorflow-macos` 나 `tensorflow-metal` 의 버전도 가급적이면 그대로 놔 두길 추천한다. 참고로 최신 버전은 현재 *2.11.0* 까지 확인되었다.

# 설치 확인

```python
import tensorflow as tf
print(tf.__version__)
```
버전이 잘 출력되면 성공이다.

# 테스트 코드 확인

여려 예제가 있겠지만, 책의 첫 번째 예제 코드를 실행해 보자. 

[여기에서](https://github.com/rickiepark/aiml4coders/blob/main/ch01/01-first-model.ipynb) Jupyter Notebook 파일로 제공되고 있으니 코드만 긁어다가 파이썬으로 실행해서 문제가 없어야 한다. (혹시 코드가 궁금하다면, 책을 한 번 읽어보길 권한다!)

```python
import tensorflow as tf
import numpy as np
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense

dense = Dense(units=1, input_shape=[1])
model = Sequential([dense])
model.compile(optimizer='sgd', loss='mean_squared_error')
xs = np.array([-1.0, 0.0, 1.0, 2.0, 3.0, 4.0], dtype=float)
ys = np.array([-3.0, -1.0, 1.0, 3.0, 5.0, 7.0], dtype=float)
model.fit(xs, ys, epochs=500)
```
