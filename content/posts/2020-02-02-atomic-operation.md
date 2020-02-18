---
title: Atomic Operation
author: interp
type: post
date: 2020-02-02T12:59:10+00:00
draft: true
private: true
url: /atomic-operation/
mentions:
  - 'a:0:{}'
categories:
  - 미분류

---
<p class="para">
  쉽게 말하면 쪼갤 수 없는 &#8216;원자 연산&#8217;을 나타내지만, 사실은 동일 버스 연산에서 읽고 쓰는 작업을 한번에 처리할 수 있는 연산들을 말한다.
</p>

<p class="para">
  다른 작업 프로세스/쓰레드가 동일 메모리 영역에 접근하는 것을 방지하기 위해, 보통 메모리 영역에 락을 생성해서 쓰거나 하지만 이는 성능에 영향을 미친다. Atomic Operation 을 사용하면, 다른 작업 프로세스의 간섭을 고려하지 않아도 일관성을 보장하면서 동시에 성능 제약을 없앨 수 있다. 가장 대표적인 것이 <a title="WikiPedia:Compare-and-swap" href="http://en.wikipedia.org/wiki/Compare-and-swap">Compare-and-swap</a> (CAS) 이다.
</p>