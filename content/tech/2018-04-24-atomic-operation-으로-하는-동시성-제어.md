---
title: Atomic Operation 으로 하는 동시성 제어
author: interp
type: post
date: 2018-04-24T02:31:38+0000
url: /atomic-operation-으로-하는-동시성-제어/
categories:
    - Tech
tags:
  - lock
  - atomic

---
## Test-And-Set (TAS)

TAS 를 이용해서 간단한 동시성 제어를 할 수 있다. testAndSet 이라는 function 을 가지고 아래의 `do...while` 문을 쓰레드 A, B 에서 동시에 호출한다고 해 보자. 이 때 lock 은 같은 변수이다.

```cpp
function TestAndSet(boolean_ref lock) {
    boolean initial = lock
    lock = true
    return initial
}

do {
    while(TestAndSet(&amp;lock))
        ; // do nothing
    // critical section
    lock = false;
    // remainder section
} while(true);
```

우선 TestAndSet() 은 다음과 같은 일을 한다. 말 그대로 '지금 값이 무엇인지 검사하고, 값을 바꾼다' 는 것이다.

  1. lock의 현재 값을 저장해 둔다.
  2. lock의 값을 true 로 설정한다.
  3. 저장한 lock 의 값을 반환한다.

그럼 이걸로 어떻게 아래 block 의 critical section 에 대한 동시성 제어를 할 수 있을까? Thread A 가 먼저 실행했다고 가정하면, 이런 시나리오가 된다.

  1. A : TestAndSet() 의 반환값이 false 이다. while 문을 빠져나온다.
  2. B : TestAndSet() 의 반환값이 true 이다. (A가 true로 두고 나왔기 때문에) while 문에서 계속 돈다.
  3. A : Critical Section 수행 후, lock 을 false 로 바꾼다.
  4. B : 여러 번의 TestAndSet() 호출 후에, 드디어 반환값이 false 가 되었다
  
    (A가 false 로 두고 나왔기 때문에) while 문을 빠져나온다.

자, 그런데 뭔가 이상하다. 이렇게 이상적으로 동작하지 않을 것 같다. TestAndSet() 함수를 라인별로 동시에 실행한다고 하면 이런 사단이 날 수 있다.

  1. A : TestAndSet() 에 진입해 lock 값을 저장한다. 이 값은 false 이다.
  2. B : TestAndSet() 에 진입해 lock 값을 저장한다. 이 값은 false 이다.
  3. A : TestAndSet() 에서 lock 값을 true 로 바꾼다.
  4. B : TestAndSet() 에서 lock 값을 true 로 바꾼다.
  5. A : TestAndSet() 에서 저장한 값을 반환한다. 이 값은 false 이다.
  6. B : TestAndSet() 에서 저장한 값을 반환한다. 이 값은 false 이다.
  7. A & B : 모두 동시에 critical section 을 수행한다.

그럼 어떡하나? TestAndSet() 은 그래서 저런 함수만으로는 안 되고 Test-And-Set 의 연산이 일관되도록 조정해야 한다. 함수 안에 spinlock 을 쓰면 되겠네요? 싶겠지만 lock 구현하자고 lock 을 또 만드는 건 아닌 것 같다. 그래서 Test-And-Set 은 CPU에서 지원하는 Atomic Instruction 을 사용한다.

## Fetch-And-Add : Ticket Lock

Atomic Operation 으로 구현할 수 있는 Lock 중에 Ticket Lock 이 있는데, Fetch-And-Add 로 구현할 수 있는 방법을 알아보자.

```cpp
ticketLock_init(int *next_ticket, int *now_serving)
{
    *now_serving = *next_ticket = 0;
}

ticketLock_acquire(int *next_ticket, int *now_serving)
{
    my_ticket = fetch_and_inc(next_ticket);
    while(*now_serving != my_ticket) {}
}

ticketLock_release(int *now_serving)
{
    now_serving++;
}

```

TAS 의 케이스를 이해하고 본다면 별 다른 설명이 필요 없을 것 같다.

  1. Table Lock 초기화를 한다.
  2. A : Table Lock 을 얻으려 한다. 이미 얻었던 `my_ticket (0)` 과 `now_serving (0)` 이 같은 값이므로 곧바로 빠져나온다.
  3. B : Table Lock 을 얻으려 한다. 이미 얻었던 `my_ticket (1)` 과 `now_serving (0)` 이 다른 값이므로 while 문에서 대기한다.
  4. C : Table Lock 을 얻으려 한다. 이미 얻었던 `my_ticket (2)` 과 `now_serving (0)` 이 다른 값이므로 while 문에서 대기한다.
  5. A : Table Lock 을 해제한다. `now_serving (0)` 을 증가시켜 `now_serving (1)` 을 만든다.
  6. B : 비로소 Table Lock 을 얻었다. (C는 여전히 대기 중이다.)

여기서 핵심은 `fetch_and_inc` 인데, 마찬가지로 얻어오는 루틴과 값을 증가시키는 루틴이 따로 떨어져 있으면 중복된 티켓을 들고 기다리는 쓰레드들이 발생할 수 있다. 따라서 이것도 atomic operation 이 되어야 한다.
