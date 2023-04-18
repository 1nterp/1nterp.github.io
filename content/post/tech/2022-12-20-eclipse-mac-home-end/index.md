---
title: "Mac 에서 Eclipse Home/End 키 바인딩 하기"
description: "줄 시작과 끝을 Cmd 키 말고 다른 걸로 쓰자면"
author: InterP
date: 2022-12-20 10:57:42 +0900
url: /mac-eclipse-key-binding-home-end
categories:
- Tech
tags:
- Eclipse
- Mac
- Dbeaver
- 단축키
---

아이폰, 아이패드, 애플워치까지 갖고 있지만 macbook 을 본격적으로 써 본지 만 1년도 안 된다. 그래서 윈도우에서 즐겨 쓰던 Home/End 가 Mac 에서는 Cmd 키와 화살표로만 이뤄지는 걸 극복하는데 너무 힘들었다. 물론 적응하면 되겠지만, 습관이란 게 무서운 거라고. 

결국 어떻게 하면 고칠까 알아보면서 하나씩 적용하고 있다. 일단 KeyBindings 에서 Home/End 키로 줄 시작과 줄 끝으로 이동하도록 해 두는 걸 적용했다. ([링크](https://apple.stackexchange.com/questions/16135/remap-home-and-end-to-beginning-and-end-of-line))

그런데 어째선지, Eclipse 기반의 에디터에서는 이것과 무관하게 Home/End 가 '페이지 시작/끝' 으로 작동하는게 아닌가! Page Up/Down 키가 옆에 버젓이 있는데도 말이다! 최근에 PostgreSQL (정확히는 [TimescaleDB](https://docs.timescale.com/)) 를 조사할 기회가 생겨서 [DBeaver](https://dbeaver.io/) 를 설치했는데, 이 친구도 Eclipse 기반의 에디터라서 KeyBindings 설정 내용과 딴판으로 놀았었다. 

그렇다, 이 글을 쓰는 이유 되시겠다.

## 키 설정을 바꿔야 한다
1. Eclipse 의 Preference (설정) 을 열어보자. 어딘지 모르겠다면 `Cmd + ,` 를 누르면 된다. 
2. 여기서 `Key` 라고 검색해 보면 **User Interface -> Key (키)** 부분에 하이라이트가 되어 있다.
3. 카테고리를 눌러 Text Editor (텍스트 편집기) 로 이동한다. 

여기서 다음 항목을 입맛대로 바꾸면 된다.
* Line Start (행 시작) : Home `↖`
* Select Line Start (행 시작 선택) : Shift+Home `⇧↖`
* Line End (행 끝) : End `↘`
* Select Line End (행 끝 선택) : Shift+End `⇧↘`
* Page Up (텍스트 시작) : Page Up `⇞`
* Page Down (텍스트 끝) : Page Down `⇟`

{{< figure src="setting.png" >}}

## 그래도 안 되면?
내 경우엔 이렇게 두고 `Apply and Close` 를 눌러도 적용이 안 되더라. 심플하게 Eclipse (여기선 DBeaver) 를 껐다 다시 실행시키면 되었다.