---
title: Bind Peeking
author: interp
type: post
date: 2020-02-02T12:59:10+00:00
draft: true
private: true
url: /bind-peeking/
mentions:
  - 'a:0:{}'
categories:
  - 미분류

---
Oracle 9i 부터 제공되는 기능.

Bind 변수를 사용하는 경우, Query가 최초로 실행되는 시점의 실제 Bind 값을 이용해서 (Peeking해서) 실행 계획을 세우는 것을 의미한다. 여기 아래에 바인딩된 변수의 값이 1일 경우, i1의 분포에 따라 Selectivity가 결정되어 계획이 세워진다.

<pre class="brush: sql; title: ; notranslate" title="">SELECT * from T1 where i1 = ?
</pre>

<p style="text-align: justify;">
  i1의 분포가 1, 2, 99, 99, 99&#8230;, 99 인 경우에 바인딩된 변수의 값이 1이면 인덱스를 타는 플랜이 생성될 것이다. 문제는, 이후에 변수의 값이 99로 변경되어도 플랜은 여전히 인덱스를 탄다. Full Scan이 더 유리해 보이는데도 말이다. Bind Peeking을 끄게 되면 통상 평균치로 Selectivity를 따지기 때문에 어느 쿼리나 손해를 보는 장사를 하는 셈이지만, Bind Peeking을 켜면 처음 변수 값으로 이루어진 쿼리만 성능 득을 보게 되고, 이후에 값이 변경되면 손해를 볼 수도 있는 &#8216;불완전한 기능&#8217; 쯤으로 여겨도 된다. 물론, <del>Oracle은 이렇게 허술하지 않으므로</del> 얼마든지 이런 경우를 보완할 최적화 장치가 마련되어 있다.
</p>