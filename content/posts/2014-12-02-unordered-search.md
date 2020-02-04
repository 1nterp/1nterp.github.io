---
title: Unordered Search
author: interp
type: post
date: 2014-12-02T07:21:05+00:00
draft: true
private: true
url: /unordered-search/
categories:
  - 프로그래밍

---
<ul style="list-style-type: disc;">
  <li>
    <b>상황 </b>: unsigned long 형태의 ID를 가진 노드가 있다. <br />이 ID는 무작위 순서로 입력된다. &nbsp;(1 > 13 > 3 > 107 > 9 &#8230;)
  </li>
  <li>
    <b>문제 </b>: 어떤 ID를 가진 노드가 입력되었을 때, <br />해당 ID가 이전에 입력된 ID인지 알아내야 한다.
  </li>
  <li>
    <b>제약 </b>: 입력된 노드의 순서는 유지되어야 한다. 즉, 순서를 바꿀 수 없다.
  </li>
</ul>

가장 안 좋은 알고리즘은, 입력된 노드를 전부 탐색하는 방법이다. 해당 노드의 개수가 굉장히 많으면, 특정 ID를 찾기 전까지는 멈추지 않을 것이다.

역시 탐색 속도를 가장 빠르게 하려면 Hashing 밖에 없는 것 같다. ID를 하건 노드 전체를 하건 Hash key를 만들어 뒀다가 Bucket에서 노드를 참조하게 하면 된다.&nbsp;(노드를 복제할 필요는 없다.)