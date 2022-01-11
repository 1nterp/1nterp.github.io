---
title: pthread_mutex_unlock() 중복 호출
author: interp
type: post
date: 2016-11-07T05:56:21+00:00
url: /pthread_mutex_unlock-중복-호출/
dsq_thread_id:
  - 5657399435
categories:
  - 프로그래밍
tags:
  - mutex
  - lock
  - pthread

---
<p style="text-align: justify;">
  <code>pthread_mutex_unlock()</code> 을 호출하면, pthread_mutex의 멤버 변수 중 하나인 <code>__nusers</code> 값이 1에서 0으로 감소한다. 이 상태에서 다시 unlock()을 호출하면? 0에서 -1로 감소해야 하는데, 여기까지는 정의되지 않았다. 따라서 unsigned 변수인 <code>__nusers</code> 값은 -1이 아니라 2**32-1 가 된다. 이는 <code>pthread_mutex_destroy()</code> 에서 '아직 사용 중인 thread가 있는데?' 라고 오해를 사기 딱 좋은 상황이 된다. 개발자는 분명히 '이 때쯤엔 pthread_mutex 에 접근할 thread는 없을 것이야' 라고 생각했을 것이고, 실제로도 그렇지만 말이다. 그래서 destroy() 에서는 EBUSY 에러가 나게 된다.
</p>

따라서, pthread_mutex가 이미 unlock되었다면 unlock() 함수를 호출하지 않도록 해야 한다.