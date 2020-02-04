---
title: Eclipse Ubuntu에서 GTK2로 실행
author: interp
type: post
date: 2016-11-28T00:44:41+00:00
url: /eclipse-ubuntu에서-gtk2로-실행/
dsq_thread_id:
  - 5655415823
categories:
  - 개발환경
tags:
  - Eclipse
  - gtk2
  - disown

---
Eclipse CDT를 Ubuntu 에서 쓰려니까, GTK3 환경에서 자꾸 실행된다. 그 때문에 오버레이 스크롤이고 뭐고 전부 느린 현상이 발생해서, GTK2 환경에서 실행시키려고 했다. 환경설정 파일도 고치고 이것저것 해 봤지만 안 되니까, 결국 아래와 같이 1회에 한해 `SWT_GTK3` 값을 바꾸는 편법을 사용했다.

<pre class="brush: bash; title: ; notranslate" title="">export SWT_GTK3=0 && ~/eclipse/cpp-neon/eclipse/eclipse & disown
</pre>

SWT_GTK3을 끄면 GTK2 로 eclipse가 실행된다. 그리고 disown 옵션으로 background process를 실행하면 해당 터미널을 종료해도 프로세스가 상주하게 된다. 정확히 말하면 'Job 테이블에서 해당 Job을 제거한다 (Remove jobs from the table of active job.)' 라는 명령이다.