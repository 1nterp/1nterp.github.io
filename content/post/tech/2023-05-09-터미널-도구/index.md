---
title: "자주 쓰는 3가지 파일 검색 터미널 도구"
description: "ag, fzf, 그리고 fd"
author: InterP
date: 2023-05-09 13:18:40 +0900
url: /useful-3-terminal-tools
categories:
- Tech
tags:
- 생산성
- 검색
---

업무의 절반은 문서 작업, 나머지 절반은 코딩 작업이라고 생각한다. 코딩 작업 중에서도 가장 많이 하는 일은, 바로 '찾기' 이다. 내용을 찾을 때도 있고, 특정 파일을 찾을 때도 있다. 대부분의 경우엔 경로를 외워두거나 하긴 하는데, 정확히 외우지 않아도 되게끔 도와주는 효율 좋은 도구를 소개한다.

물론 아래 도구는 모두 터미널 기준이고, VSCode 나 PyCharm, Atom 같은 IDE 는 개별 가이드를 참고해서 써야 하겠다. 아래 도구들은 모두 homebrew 에서 설치가 가능하므로, `brew` 를 이용한 설치 명령을 마지막에 추가해 두었다.

# ag, the silver searcher
:pushpin: [Github](https://github.com/ggreer/the_silver_searcher)

`grep` 을 대신할 친구다. 나느 `grep . -rn` 을 밥먹듯이 하는데, ag 를 사용하면 더욱 빠르게 찾을 수 있다.
```bash
brew install the_silver_searcher
```
```bash
ag <pattern>
```

# fzf, command-line fuzzy finder
:pushpin: [Github](https://github.com/junegunn/fzf)

단독으로 입력하면 File 을 검색한다. 파이프라인에 태우면 앞선 출력에서 검색한다. 이게 마치 '검색어 입력' 처럼 키워드를 공백으로 띄워가며 입력해도 알아서 잘 찾아주고, 정규 표현식도 잘 먹는다.
```bash
brew install fzf
```
```bash
# solo
fzf

# or after a pipeline
cat file_list.dat | fzf
```

oh-my-zsh 에 fzf plugin 을 활성화하면, 단축키로 파일 검색 (`Ctrl+T`) 이나 히스토리 검색 (`Ctrl+R`) 이 가능하다.

## plugin 문제해결
참고로 homebrew 로 설치한 뒤 oh-my-zsh plugin 활성화를 한 다음, zsh 를 다시 실행시키면 다음 에러가 뜰 수 있다.
```bash
[oh-my-zsh] fzf plugin: Cannot find fzf installation directory.
Please add `export FZF_BASE=/path/to/fzf/install/dir` to your .zshrc
```
이 때는 homebrew 의 PATH 설정이 plugin 활성화 시점 이후일 가능성이 높다. 내 경우엔 `$HOME/.zshrc` 에서 아래 라인을 `plugin=(..)` 위에 두면 해결이 되었다.
```bash
# in your $HOME/.zshrc
export PATH=/opt/homebrew/bin:$PATH
eval "$(/opt/homebrew/bin/brew shellenv)"
# ...
plugin(fzf ...)
```

# fd, simple and fast alternative to find
:pushpin: [Github](https://github.com/sharkdp/fd)

`find` 을 대신할 친구다. 파일 찾기가 더 빠르다고 한다. 참고로 [README](https://github.com/spearkkk/fd-kor) 에 한국어가 지원되는데, 아니나 다를까 Main Contributor 가 한국 분이신 [정창권](https://spearkkk.dev/) 님이시다. (감사합니다!)
```bash
brew install fd
```

`fzf` 역시 파일 검색을 할 수 있지만, 내부에서는 `find` 결과를 얻어 처리하는 수준이다. 따라서, `fzf` 가 `fd` 를 사용하게 만드려면 다음의 환경변수가 추가로 필요하다.
```bash
export FZF_DEFAULT_COMMAND=’fd — type f’
```