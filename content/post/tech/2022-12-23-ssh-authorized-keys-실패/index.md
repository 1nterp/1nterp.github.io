---
title: "SSH 비대칭 키로 접속할 때 문제 해결"
description: "RSA 키도 생성하고 authorized_keys 도 잘 설정했는데..?"
author: InterP
date: 2022-12-23 13:57:59 +0900
url: /ssh-authorized-keys-problem
categories:
- Tech
image: feature.jpg
# image_y: "86%"
tags:
- SSH
- RSA
- authorized_keys
---
클라이언트에서 서버로 SSH 접속을 패스워드 없이 하기 위해 

- 클라이언트 컴퓨터에서, RSA 알고리즘으로 비대칭 키를 생성했다.
- 비대칭 키의 Public Key 를 서버의 `~/.ssh/authorized_keys` 파일에 붙여넣었다.

그런데도 아직 패스워드를 입력하라고 하면?? 혹시나 해서 `ssh -vvv ..` 로 디버그 메시지를 출력해 보니
```
debug1: Offering public key: debug3: send packet: type 50
debug2: we sent a publickey packet, wait for reply
debug3: receive packet: type 51
```
이런 메시지를 혹시 만났다면, 다음을 체크해 보자.

# `.ssh/` 의 소유자/권한 점검
아래 사항이 모두 맞는지 점검한다.

- `~/.ssh` 권한이 700 이어야 한다.
  - `ls -al ~ | grep .ssh` 결과가 `d r w x - - - - - -` 로 시작되어야 한다.
  - 수정하는 방법은 `chmod 700 ~/.ssh` 이다. (`-R` 옵션을 붙이지 말자!)
- `~/.ssh` 소유자가 달라서는 안 된다.
- `~/.ssh/authorized_keys` 권한이 600 이어야 한다.
  - `ls -al ~/.ssh/authorized_keys` 결과가 `- r w - - - - - - -` 로 시작되어야 한다.
  - 수정하는 방법은 `chmod 600 ~/.ssh/authorized_keys` 이다.
- `~/.ssh/authorized_keys` 소유자가 달라서는 안 된다.

한 가지 더 중요한 것은, **만약 `$HOME` 경로가 '심볼릭 링크' 를 포함하는 경우**라면, 반드시 실제 경로에서 적용해야 한다는 점이다.

# RSA 는 이제 그만..
서버가 OpenSSH 를 쓰는 경우라면, RSA 를 곧 지원하지 않는다는 release note 가 있다. 따라서 RSA 대신 다른 알고리즘으로 된 비대칭 키를 생성해서 쓰는 것도 방법이 될 수 있다. 나는 **ECDSA** 를 사용해 봤다.
```bash
ssh-keygen -t ECDSA
```

# 참고자료

* https://chemicloud.com/kb/article/ssh-authentication-refused-bad-ownership-or-modes-for-directory/
* https://docs.digitalocean.com/support/how-to-troubleshoot-ssh-authentication-issues/
* https://www.openssh.com/txt/release-8.7