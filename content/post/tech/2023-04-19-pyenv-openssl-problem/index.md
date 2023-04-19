---
title: "Pyenv 로 Python 설치 할 때 Openssl 문제"
description: "1.1.1 을 요구한다면, 직접 설치해 주자"
author: InterP
date: 2023-04-19 11:39:11 +0900
url: /pyenv-openssl-problem
categories:
- Tech
tags:
- Pyenv
- Python
- Openssl
---

# 문제
[pyenv](https://github.com/pyenv/pyenv) 를 이용해 Python 3.7 버전 이상 (내 경우는 3.9 버전 이상) 설치할 때 다음의 에러를 만났다. (하다 보니 둘 다 만났다)

```bash
ERROR: The Python ssl extension was not compiled. Missing the OpenSSL lib?
```

```
*** WARNING: renaming "_hashlib" since importing it failed: /usr/lib64/libcrypto.so.1.1: version `OPENSSL_1_1_1' not found (required by /tmp/python-build.20230418192124.103279/Python-3.10.11/build/lib.linux-x86_64-3.10/_hashlib.cpython-310-x86_64-linux-gnu.so)
```

# 추적

결론은 OpenSSL 1.1.1 을 설치해야 한다는데, 내 경우엔 이 방법이 전부 힘들었다.

* 1.1.1 을 패키지 매니저로 설치할 수 없는 Linux OS 였고
* Homebrew 로 설치하면 무슨 이유에선지 엄청나게 꼬였다 (`ld` 링크할 때 엉뚱한 곳을 본다던가..)

화면에 바로 안내되는 [URL](https://github.com/pyenv/pyenv/wiki/Common-build-problems#error-the-python-ssl-extension-was-not-compiled-missing-the-openssl-lib) 를 살펴보면, openssl 을 수동으로 설치하는 방법이 아래에 안내되어 있다. 가장 확실한 방법이다.

# 해결

1. [Installing OpenSSL locally under your username](https://help.dreamhost.com/hc/en-us/articles/360001435926-Installing-OpenSSL-locally-under-your-username) 으로 접속
1. **Installing OpenSSL** 을 하나씩 따라하기 (매우 친절하다!)
    * `username` 부분을 바꾸는 걸 잊지 말자. 
    * 이 때, `make test` 가 실패할 수 있다. 그럴 땐 아쉽더라도 `make install` 이후 과정을 진행한다.
1. 다음을 입력한다.  
  ```bash
  CPPFLAGS=-I$HOME/openssl/include \
  LDFLAGS=-L$HOME/openssl/lib \
  SSH=$HOME/openssl
  pyenv install -v 3.7.2 # 원하는 버전을 입력
  ```

## SSL 에러?
간혹, 다음 에러를 마주하게 될 수 있다.

```
pyenv install -v 3.9.15
/tmp/python-build.20230419102453.2507312 ~
Downloading Python-3.9.15.tar.xz...
-> https://www.python.org/ftp/python/3.9.15/Python-3.9.15.tar.xz
curl: (60) SSL certificate problem: unable to get local issuer certificate
More details here: https://curl.haxx.se/docs/sslcerts.html
```

이럴 땐, 아까 OpenSSL 설치하면서 진행했던 환경변수 설정 부분에서 다음을 주석처리한다. 다시 설치를 시도하면 성공!

```
# export PATH=$HOME/openssl/bin:$PATH
# export LD_LIBRARY_PATH=$HOME/openssl/lib
# export LC_ALL="en_US.UTF-8"
export LDFLAGS="-L /home/username/openssl/lib -Wl,-rpath,/home/username/openssl/lib"
```