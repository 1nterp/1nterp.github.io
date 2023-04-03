---
title: "VSCode Vim 에서 키를 눌러 계속 입력하게 만들기"
description: "Mac 에서 쓰이는 문자 툴팁을 제거해보자"
author: InterP
date: 2023-04-03 16:17:59 +0900
url: /vscode-vim-mac-key-pressing-input
categories:
- Tech
image: feature.png
tags:
- Vim
- VSCode
- Mac
---

# 문제

Visual Studio Code 에서 Vim Plugin 을 쓰던 중, 입력한 것을 되돌리기 위해 `u` 를 꾹 눌렀다. 

그러면 아래와 같이 **u** 라는 알파벳에 어떤 변형을 가할 것인지 묻는다. 한/영만 필요한 나에게는 필요없는 기능인데..

{{< figure src="symptom.png" >}}

(참고로, `u` 를 꾹 누르는게 아니라 반복해서 입력해도 한 번만 입력되는 경우엔 [블로그의 다른 포스팅](/vscode-vim-undo-redo-key-repeat)을 참고하자.)

# 해결

터미널에서 다음을 입력하고, VSCode 를 **재시작**한다.

```
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
```

# 참고

출처는 여기 [Stack overflow](https://stackoverflow.com/questions/39972335/how-do-i-press-and-hold-a-key-and-have-it-repeat-in-vscode) 페이지에서 찾을 수 있다.

참고로 모든 프로그램에서 저 변형 대화창을 끄고 싶다면 다음과 같이 입력한다.

```
defaults write -g ApplePressAndHoldEnabled -bool false
```

윗 부분의 출처는 [준호씨의 블로그](https://junho85.pe.kr/1462) 포스팅이다. (감사합니다!)