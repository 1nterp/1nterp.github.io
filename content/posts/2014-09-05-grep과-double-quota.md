---
title: grep과 double quota
author: interp
type: post
date: 2014-09-05T07:56:42+00:00
draft: true
private: true
url: /grep과-double-quota/
categories:
  - 미분류

---
grep에서 쌍따옴표 / 홑따옴표 / 아무것도 없는 경우를 나눠서 생각해보자.

grep &#8220;x$&#8221; 를 하게 되면, 줄 끝에 x가 달린 line이 전부 grep 된다.

이걸 피할려고&nbsp;grep &#8220;x\$&#8221;를 했다. 으잉? 똑같다.. grep &#8216;x\$&#8217; 를 해봤더니 제대로 escape가 된다. 이유가 뭘까?