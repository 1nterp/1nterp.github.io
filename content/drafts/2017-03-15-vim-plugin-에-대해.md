---
title: Vim Plugin
author: interp
type: post
date: 2017-03-15T01:41:28+00:00
url: /vim-plugin-에-대해/
dsq_thread_id:
  - 5636906007
categories:
  - 개발환경
tags:
  - vim

---
ack.vim 을 설치하려니까 Vim Plugin Manager 란 게 있는 사실도 알았다. 누구는 Vim Plugin을 상위권부터 하나씩 써보고 마음에 드는 걸 적용하고 있다는데, 나도 그래야겠다 싶어서 여기에 정리해 두고자 한다. 여기서는 플러그인에 대해서 먼저 알아보고, 플러그인마다 제공하는 가장 많이 사용하는 플러그인들을 알아본 다음에, 최종적으로는 내가 원하는 ack.vim 을 설치해보고자 한다.

### Vim Plugin Manager : Vundle

집/회사에서의 개발환경이 다르고, 회사에서도 여러 서버를 넘나들며 개발과 유지보수를 해야 하는데, 모든 환경을 일일히 동기화하기엔 귀찮은 것이 사실이다. vim의 환경도 마찬가지인데, 플러그인의 경우엔 매니저를 사용하는 것이 도움이 될 것이다.

알아보니, [Vundle][1] 이나 [Pathrogen][2] 을 쓰는 것 같다. 플러그인을 관리하는 원리는 비슷해 보이는데, 나는 Vundle을 설치했다.

[Vundle의 설치 방법][3]은 잘 나와 있지만, 요약하면 다음과 같다.

  1. 다음 명령으로 `~/.vim/bundle/Vundle.vim` 을 설치한다. <pre class="brush: bash; title: ; notranslate" title="">git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
</pre>

  2. `~/.vimrc` 에 Vundle이 시작될 수 있도록 코드를 입력한다. ([링크][3] 참고)
  3. `~/.vimrc` 에 작성한 Vundle 코드에서, 플러그인 목록을 작성한다.
  4. `vim` 을 실행한 다음, `:PluginInstall` 을 입력한다. 왼쪽에 분할된 창이 나타나면서 플러그인을 모두 설치한다. 설치가 완료되면 vim을 종료하면 된다!

### 플러그인 순위

vim 공식 사이트에 가도 되지만, 랭킹을 따로 뽑아주는 사이트가 분명히 있을 거라고 생각했다. 과연, [이런][4] 사이트가 있었다. 여기서는 일단 NERDTree 만 받아서 Vundle 에 적용해 봤는데, 와우. 넘나 편한 것!

### ack.vim 설치

ack.vim 은 파일 내 패턴을 검색하는 플러그인으로 유명하다.

역시 Vundle 을 이용해 간단하게 설치할 수 있었다. 나는 ack 대신 [ag][5]를 쓸 작정이었으므로, 명령어를 ag로 변경했다.

### 끝으로

아직도 Vim 사용법에 대해선 초보인 것 같다. 지금도 나름 편하게 쓴다고는 하지만 조금 더 편하게 구현할 수 있을 거란 욕심을 부리지 않아서였는지, 새로운 (하지만 전혀 새롭지도 않은) 방법들을 보고 있으니 신기하면서도 많이 부족하다는 걸 느낀다. [놀부님의 블로그에 Practical Vim 에 대한 내용][6]이 정리되어 있는데, 이것도 한번 참고해 봐야 겠다.

 [1]: https://github.com/VundleVim/Vundle.vim
 [2]: https://github.com/tpope/vim-pathogen
 [3]: https://github.com/VundleVim/Vundle.vim#quick-start
 [4]: http://vimawesome.com/
 [5]: https://github.com/ggreer/the_silver_searcher
 [6]: https://nolboo.kim/practical-vim/