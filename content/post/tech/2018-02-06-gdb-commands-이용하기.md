---
title: gdb commands 이용하기
author: interp
type: post
date: 2018-02-06T08:46:05+0000
url: /gdb-commands-이용하기/
categories:
    - Tech
tags:
  - gdb

---
gdb/ddd 에서 commands 를 사용하면 간편하게 breakpoint 의 상태를 출력할 수 있다. 물론 다양하게 응용이 가능하겠지만, 매뉴얼에서 제시한 케이스가 굉장히 편해서 따로 정리한다.

참고 : http://sourceware.org/gdb/onlinedocs/gdb/Break-Commands.html

## Breakpoint 상황을 출력하기

```cpp
10    *sAddr = malloc(aSize);
11    if (*sAddr != NULL)
12    ...
```

위 코드에서 if 문에 breakpoint 를 걸고, 할당받은 시작 주소와 그 크기를 보고자 한다. 한두번 발생하는 거라면 breakpoint 를 걸어 둔 다음 print 나 graph display (ddd 전용) 으로 띄워서 관찰하면 된다. 그런데 이게 100번 200번이면 하염없이 엔터를 치게 된다.

이럴 때 다음과 같이 입력한다.

```bash
(gdb) b 10     # 10번째 라인에 breakpoint
(gdb) commands # 아무 것도 입력하지 않으면 최근 breakpoint 에 대한 command 입력
> silent       # breakpoint 에 멈췄단 메시지를 출력하지 말아달라
> printf "alloc address is %p\n and its size is %ld", *sAddr, aSize
> cont         # 흔히 입력하는 cont 와 동일하다.
> end          # command 입력 종료
```

이러고 cont 를 날리면.. breakpoint 에서 멈추는 대신 해당 command 가 수행된다! 즉, 계속해서 주소와 할당 크기가 출력된다. 아주 편하다&#8230;

## Call Stack 보기

일종의 응용인데, commands 내부에는 우리가 흔히 쓰는 명령어를 입력하면 된다.

```bash
(gdb) commands
> silent
> bt 5      # backtrace (callstack) 을 출력하되, 안쪽에서 5개 까지만 출력
> cont
> end
```

## Commands 의 초기화

commands 명령어를 입력한 다음, 바로 end 로 끝내면 된다.

```bash
(gdb) commands
> end
```