---
title: doxygen + graphviz 사용 시 DOT 에러 해결방법
author: interp
type: post
date: 2014-01-28T06:00:54+00:00
url: /doxygen-graphviz-사용-시-dot-에러-해결방법/
categories:
  - 미분류
tags:
  - doxygen
  - graphviz
draft: true
---
_doxygen_ 과 _graphviz_ 를 사용해서 다이어그램을 출력할 때, 다음의 에러가 뜨면서 다이어그램 그림파일이 생성중단되는 경우가 있었다.

<blockquote class="tx-quote-tistory">
  <p>
    <i>Problems running dot: exit code=-1, command='dot',<br /> <span style="background-color: transparent; font-size: 9pt; line-height: 1.5;">&#8230;</span></i>
  </p>
</blockquote>

<p style="text-align: justify;">
  에러를 그대로 읽어보니, dot을 돌리는데 문제가 생겼다고 한다. 찾아봤더니 graphviz에서 사용하는 실행 파일 같다. graphviz의 설치 경로에 있는 bin 디렉토리 안에 dot이 있는 것 같다.
</p>

<p style="text-align: justify;">
  doxygen의 Expert 옵션을 이리저리 둘러봤는데, 맨 마지막 Topics 항목에 dot 어쩌고&#8230; 가 있더라. DOT_PATH 부분을, 아까 dot 실행파일이 있던 그 경로로 바로잡아줬더니 성공!
</p>

### 세줄 요약

<ul style="list-style-type: disc;">
  <li>
    doxygen 쓰다가 Problems running dot: exit code=-1, command='dot',을 만났다.
  </li>
  <li>
    doxygen의 Expert 탭 > Topics 중 Dot을 찾아 클릭 > DOT_PATH가 잘못 잡혀있었다.
  </li>
  <li>
    DOT_PATH를 graphviz가 설치된 경로 + \bin\ 붙여서 재설정한 후 문서 생성 > 성공!
  </li>
</ul>
