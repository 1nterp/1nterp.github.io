---
title: "screen, tmux, 그리고 byobu"
description: "Terminal Multiplexer 에 대해 알아보자"
author: InterP
date: 2022-10-12 08:57:42 +0900
url: /terminal-multiplexer-screen-tmux-byobu
categories:
- Tech
image: feature.jpg
image_show: true
tags:
- tmux
- byobu
- 개발도구
- 터미널
---

개발자들은 전통적으로 워크스테이션이나 서버에 단말기를 접속해서 개발을 진행해 왔다. 이 때 사용되는 기기를 단말, 터미널 (terminal) 이라고 했다. 과거에는 컴퓨팅 파워를 구성하는 단가가 비쌌기 때문에, 저사양의 단말 컴퓨터를 가지고 상대적으로 고사양의 서버에 접속해 일을 하는 것이다.

물론 지금은 PC 나 노트북 역시 충분히 고사양이긴 하다. 그래도 여전히 훨씬 더 효율적이고 강력한 서버 컴퓨터가 조직마다 존재하고, 클라우드 컴퓨팅으로 인해 자원을 필요할 때 마다 (on-demand) 빌려 쓸 수 있는 시대이다. 그렇기에 터미널은 여전히 유효하고, SSH 프로토콜로 통신하는 터미널 프로그램으로 남아있게 된다.

어디서든, 어떤 단말로도 서버에 (또는 클라우드 VM 에) 접속할 수 있다는 것은 장점이지만, 네트워크 연결이 끊기거나 다른 단말로 다시 접속하게 되면 새로운 SSH 세션이 시작되고, 텅 빈 화면에서 다시 시작하게 되는 문제가 동시에 존재한다.

또 한 가지 문제는, 한 화면에 하나의 세션만 열 수 있다는 것이다. 아니, 지금은 다양한 터미널 프로그램에서 '다중 윈도우, 다중 탭' 을 지원하는데, 그래서 여러 세션으로 넘나드는 게 가능한데 이게 무슨 문제일까? 그런 GUI 도 없는 유닉스/리눅스 시절엔 문제였다...

이 두 문제를 해결해 줄 Terminal Multiplexer 에 대해 알아보자.

## Terminal Multiplexer : tmux, screen

우선 흔히들 쓰는 tmux 의 매뉴얼 첫 설명을 보자.

> tmux is a terminal multiplexer: it enables a number of terminals to be created, accessed, and controlled from a single screen. **tmux may be detached from a screen and continue running in the background, then later reattached**.

터미널을 다중화해서, 한 화면에 여러 개의 터미널을 다룰 수 있다고 한다. 그리고 이 터미널 조합은 프로세스로 떠 있어서, (프로세스가 죽지 않는 한) 서버에 재접속 해서 해당 터미널 조합을 그대로 쓸 수 있다는 것이다.

screen 의 설명은 조금 더 길고 복잡하다. (그래서 tmux 설명을 먼저 소개했다) 그 중에서 소개글을 발췌해 보면 다음과 같다.

> Screen is a full-screen window manager that multiplexes a physical terminal between several processes (typically interactive shells). When `screen` is called, it creates a single window with a shell in it (or the specified command) and then gets out of your way so that you can use the program as you normally would.
> 
> Then, at any time, you can create new (full-screen) windows with other programs in them (including more shells), kill existing windows, view a list of windows, turn output logging on and off, copy-and-paste text between windows, view the scrollback history, switch between windows in whatever manner you wish, etc.
> 
> **All windows run their programs completely independent of each other**.

screen 에서는 여러 터미널이 윈도우라는 개념으로 나뉘어지며, 여기서 실행하는 프로그램은 완전히 독립된다는 것을 강조한다.

각자 다른 특징을 지닌 것 같지만, 결국 둘 모두 terminal multiplexer 라는 것은 변함이 없고, 앞서 언급한 특성들을 모두 공유한다. 즉, 서론에서 이야기한 문제를 전부 해결해 줄 수 있는 특징이 있다.

1.  여러 터미널을 한 화면에 띄우고, 관리할 수 있다.
2.  이 터미널 조합은, 서버에 재 접속해서 그대로 쓸 수 있다.
3.  각 터미널 안에서 수행하는 작업들은 철저히 독립적이다.

개인적으로 두 개 중 어느 것을 써도 문제는 없을 것 같다. 몇몇은 screen 에서 최신 기능이나 자잘한 것들이 지원되지 않는다는 사람도 있었고, 몇몇은 screen 을 계속 써와서 굳이 바꿔야 할 이유를 찾지 못했다는 이야기도 들었으니까.

## byobu

[https://www.byobu.org](https://www.byobu.org)

byobu 는 병풍(屏風)이라는 뜻의 일본어 독음이다. Canonical 에서 우분투 서버와 클라우드 팀에 있는 Dustin Kirkland 의 개인 프로젝트 라고 한다. (와우...)

이 프로그램은 **tmux 와 screen 의 wrapper** 라고 보면 된다. 즉, 두 multiplexer 중 하나를 좀 더 쉽고 간단하게 쓸 수 있도록 만든 것이다. 처음에 실행하면, 둘 중 어느 것을 쓸 것인지 선택할 수 있다.

### 설치 방법

나는 brew 를 설치한 다음에 byobu 를 설치했다.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# install brew into ~/.linuxbre
echo 'eval "$($HOME/.linuxbrew/bin/brew shellenv)"' >> ~/.zshrc
brew install byobu
```

### 사용 방법

유튜브 튜토리얼 영상을 보면, 모짜르트 교향곡과 함께 윈도우를 화려하게 넘나드는 것을 볼 수 있다.

`man byobu` 를 입력해서 매뉴얼을 열어보자. 여기서 단축키 리스트를 알려주긴 하, 당장 내가 자주 쓰는 단축키는 이 정도다.

-   F2 : 새로운 윈도우를 만든다. 이 때 새로운 세션을 시작한다.
-   F3/F4 : 이전/다음 윈도우로 포커스를 이동한다.
-   Shift+F2 : 스크린을 상/하로 분할해, 아래쪽에 새로운 세션을 시작한다.
-   Ctrl+F2 : 스크린을 좌/우로 분할해, 오른쪽에 새로운 세션을 시작한다.
-   Shift+F3/F4 : 이전/다음 스크린으로 포커스를 이동한다.
-   F7 : 스크롤백 모드로 전환한다. 방향키 또는 PageUp/Dn 를 이동해 화면을 스크롤할 수 있고, Enter 를 치면 종료된다.  
    -   복사 : Spacebar 를 누르면 커서부터 블록을 잡을 수 있다. 블록을 다 잡고 나서 Enter 를 누르면 복사가 된다
    -   붙여넣기 : Alt+Insert (나는 안 됐음 ㅜㅜ) **Ctrl+a 누른 후 \]** (이게 잘 됨!)  
        (iterm2 의 경우, applications in terminal may access clipboard 옵션을 켜줘야 함)

### 접속하면, 자동으로 byobu 실행하기

접속하자 마자 byobu 를 실행하려면 아래를 입력하면 되는데,

```bash
byobu-enable
```

`man byobu-launcher-install` 을 보면 알겠지만, 이게 `~/.profile` 에 내용이 추가되는 거라서, shell 설정에 따라서는 적용 자체가 안 될 수도 있다. `~/.profile` 의 마지막 줄 내용을 `~/.bashrc` 또는 `~/.zshrc` 에 옮겨줘야 한다.

### macOS 에서 Ctrl 키가 먹지 않을 때

매뉴얼에서 나오는 Ctrl+F2 단축키가 맥북에서는 먹질 않는다. Ctrl 이 인식되지 않는다기 보단 Function Key 인식에 문제가 있는 것 같다. (그렇다고 Ctrl+Fn+F2 를 누르면 F2 효과가 난다..)

그래서 아예 byobu 단축키를 수정했다. tmux 를 쓴다고 가정했을 때, 아래 파일을 열어보자.

```bash
# assume that you're using with tmux
vi $BYOBU_PREFIX/share/byobu/keybindings/f-keys.tmux
```

여기서 `C-F2` 따위의 키워드를 검색할 수 있는데, 이걸 Function Key 가 들어가지 않는 조합으로 바꿔주자.

참고 : [https://askubuntu.com/questions/969846/ubuntu-server-using-byobu-ctrlf2-does-not-split-screen-in-vertical](https://askubuntu.com/questions/969846/ubuntu-server-using-byobu-ctrlf2-does-not-split-screen-in-vertical)