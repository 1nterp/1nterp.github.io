---
author: InterP
date: 2022-05-16T01:57:00+0900
tags:
- kubectl
- oh-my-zsh
title: Oh my zsh! 에서 kubectl 자동 완성 하기
url: oh-my-zsh-kubectl-autocomplete
categories:
    - Tech
image: ''
summary: ‘zsh 자동 완성’ 이라는 Kubernetes 공식 문서에 따르면, 몇 가지 명령으로 자동 완성이 가능하다고 한다. 하지만 Oh my zsh! 에서는 이것만으로는 충분하지 않았다.
---
'[zsh 자동 완성](https://kubernetes.io/ko/docs/tasks/tools/included/optional-kubectl-configs-zsh/)' 이라는 Kubernetes 공식 문서에 따르면, 다음 명령으로 자동 완성이 가능하다고 한다.

```bash
source <(kubectl completion zsh)
```

그런데 Oh my zsh! 에서는 몇가지 더 설정을 해야 한다.

* `$HOME/.zshrc` 를 열어서, plugins 에 다음을 추가한다.
  * kubectl
  * kube-ps1
  * zsh-syntax-highlighting
  * zsh-autosuggestions

```
plugins=(git kubectl kube-ps1 zsh-syntax-highlighting zsh-autosuggestions)
```

* kubectl, kube-ps1 은 이미 설치되어 있을텐데, 아래 2개는 별도 설치가 필요할 수 있다.

```bash
# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

참고로 Auto-suggestion 되는 내용이 하얀색으로 나와서 타이핑하거나 알아보기가 힘들다면, 해당 내용만 다른 색으로 바꿔줄 수 있다.

* `export ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=(number)'` 라고 쓰면 된다.
* 나는 `(number)` 자리에 `243` 을 사용했다. 연한 회색이다.
* 자세한 color 값은 [여기](https://upload.wikimedia.org/wikipedia/commons/1/15/Xterm_256color_chart.svg)를 참고하자. 물론 사용하려면 `$TERM` 값이 **xterm-256color** 여야 한다.

그리고 다시 로그인하면, 탭키(`<tab>`) 를 통해 자동 완성이 잘 되는 것을 확인할 수 있다.