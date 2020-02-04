---
title: Coding Convention?
author: interp
type: post
date: 2012-04-02T04:41:45+00:00
draft: true
private: true
url: /coding-convention/
categories:
  - 미분류

---
C프로그래밍을 하다가 다음과 같은 경우를 봤는데, a는 단순한 int형 variable이고, AA는 특정 정수를 나타내는 macro라고 하자.

if ( (a & AA) = AA )  
{  
&#8230;  
}

그렇다면 두 logical expression의 차이는 없는걸까?

<ul style="list-style-type: square; ">
  <li>
    (a & AA) = AA
  </li>
  <li>
    a == AA
  </li>
</ul>