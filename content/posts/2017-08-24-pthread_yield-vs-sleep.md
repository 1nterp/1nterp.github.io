---
title: pthread_yield vs. sleep
author: interp
type: post
date: 2017-08-24T05:35:24+00:00
url: /pthread_yield-vs-sleep/
dsq_thread_id:
  - 6091079907
categories:
  - 프로그래밍
tags:
  - c
  - thread

---
`pthread_yield()` 와 `sleep()` 의 차이를 묻는 [Stack Overflow 글][1]을 가져와 봤다.

> pthread_yield() 는, 호출한 쓰레드가 프로세서 사용을 그만두고, 스케쥴링이 될 때 까지 작업 큐(run queue)에서 기다립니다. 만약 호출되었을 때 작업 큐가 비어 있다면, 즉시 스케쥴링이 되겠죠.
> 
> sleep() 은 X초만큼 지나거나, 무시할 수 없는 시그널이 도착할 때 까지 (다른 쓰레드를 포함한) 호출 프로세스를 재웁니다.
> 
> 현재 쓰레드를 실제로 지연시키고 싶지 않지만 (호출 쓰레드 대신) 다른 쓰레드에게 실행권을 넘겨주고 싶은 경우라면, sleep() 보단 pthread_yield() 가 적합할 것 같습니다.

sleep 자체가 프로세스를 아예 멈추게 하니까 pthread_yield 를 통해서 나는 잠시 빠져주는 상태로 만드는 거였다. 코드를 보면서 감으로만 &#8216;아 저건 sleep() 같진 않지만 뭔가 이럴 때 쓰는거야&#8217; 라고만 어렴풋이 알고 있었는데, 무엇이든 확실히 알아야 한다.

 [1]: https://stackoverflow.com/questions/936993/pthread-what-is-the-difference-between-time-hsleep-and-pthread-hpthread