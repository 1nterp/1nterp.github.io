---
title: Programming with POSIX thread (1)
author: interp
type: post
date: 2012-08-07T11:09:28+00:00
draft: true
private: true
url: /programming-with-posix-thread-1/
categories:
  - 미분류

---
사실 thread와는 친하지 않아서 어디 나가서 나 개발자요 라고 하기가 부끄러웠는데, 이 책이 툭 하고 내 책상에 떨어졌다. &#8216;틈 날 때마다 보면서 공부하라&#8217;는 높으신 분(?)의&nbsp;권유로 책을 읽기 시작했다.

## POSIX thread : pthread

pthread_detach() 는 사용해보지 않았었는데, thread가 종료되면 가지고 있던 자원들이 모두 반환된다고 한다. 그렇지 않으면 자원 누수가 발생한다. 의미상으로는 &#8216;나를 기다려주는 thread는 아무도 없어 <strike>왕따?</strike>&#8216;라고 Pthreads에게 알려주는 역할로, 종료할 때 Pthreads가 알아서 자원 반환을 도맡아 해준다. 이 함수 호출이 안 되면 다른 thread에서 해당 thread의 결과를 받아 챙기기 전까지는 (엄밀히 말해, 챙기고 나서 명시적으로 자원이 해제되지 않을 때 까지) 자원은 반환되지 않는다.

이런 면에서, pthread_join과의 차이점을 생각해 볼 수 있는데&#8230;