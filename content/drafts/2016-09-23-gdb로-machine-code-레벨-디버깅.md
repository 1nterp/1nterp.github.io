---
title: gdb로 Machine Code 레벨 디버깅
author: interp
type: post
date: 2016-09-23T07:34:47+00:00
url: /gdb로-machine-code-레벨-디버깅/
dsq_thread_id:
  - 5166395346
categories:
  - 개발환경
tags:
  - 디버깅
  - gdb

---
<p style="text-align: justify;">
  gdb로 Machine Code 레벨 디버깅을 할 일이 있나 싶었는데, Callstack에서는 불친절하게도 아래와 같은 Function (=Start Address) + Hex 값의 지점을 가리켜 주기 때문에 소스 코드를 따라가지 못하는 상황이 발생한다. (더군다나 디버깅으로 재현은 안 되는 경우 SegFault 로 인한 Interrupt 로도 잡을 수 없다. 하지만 Callstack을 전달받았으니 원인 규명은 해야 하고&#8230;)
</p>

<pre class="brush: plain; title: ; notranslate" title="">  0: 0x00007f7920013ef0
  1: 0x000000395a20f7e0 /lib64/libpthread.so.0:??
  2: 0x0000000000577995 /home/interp/test:testFunc+0x2d6
  3: 0x000000000057837b /home/interp/test:main+0x103
</pre>

<p style="text-align: justify;">
  여기서 함수 testFunc의 +0x2d6 부분을 따라가기 보다는 Machine Code에 해당 부분을 Breakpoint 걸어보는 방법이 있다. 그러면 자연스럽게 소스 코드에도 Breakpoint 가 찍혀서 info breakpoint 명령으로 확인할 수 있다. (ddd로 작업 중이라면, 눈으로 확인이 가능하다) gdb 에서는 다음과 같이 Breakpoint 를 걸 수 있다. astar(*) 없이 시도하면 '그런 곳 모른다' 라고 말한다.
</p>

<pre class="brush: plain; title: ; notranslate" title="">(gdb) b *testFunc+0x2d6
</pre>

<p style="text-align: justify;">
  여담으로, ddd에서 Machine Code 창을 띄우면 'syntax error' 가 나타나는 버그를 만났는데 해결책을 찾지 못했다.
</p>