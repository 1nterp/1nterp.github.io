---
title: Solaris / Linux의 ECONREFUSED Error
author: interp
type: post
date: 2014-03-07T05:39:50+00:00
draft: true
private: true
url: /solaris-linux의-econrefused-error/
categories:
  - 미분류
tags:
  - socket
  - Solaris

---
Socket Programming을 여러 플랫폼에서 구현해보다가 수상쩍은 점을 발견했습니다.

<p style="text-align: justify;">
  클라이언트 측은 서버에 접속하기 위해 connect() 함수를 사용합니다.&nbsp;이 때 서버가 아직 bind()를 하지 않았거나 listen() 함수에서 정한 Backlog가 모두 꽉 차는 등의 비정상적인 경우에는 접속을 하지 못하고 에러 코드를 발행합니다.
</p>

이 때, ECONNREFUSED 에러 코드를&nbsp;받았다면 플랫폼마다 대처하는 방법이 조금 다릅니다.

<ul style="list-style-type: disc;">
  <li>
    Solaris 에서는 무조건 연결을 시도했던 소켓을 close()로 닫은 다음, 새로운 소켓을 socket()으로&nbsp;할당받아 재연결을 시도해야 합니다.
  </li>
  <li>
    Solaris가 아닌 다른 플랫폼에서는 (대표적으로 Linux), 연결을 시도했던 소켓 그대로 재연결을 시도해도 상관없습니다.
  </li>
</ul>

<div>
  해당 내용은 man page에 그대로 나와 있습니다
</div>

<blockquote class="tx-quote-tistory">
  <p>
    <span style="color: rgb(171, 242, 0);"># Linux</span><br /><span style="background-color: transparent;">ECONNREFUSED<br /> No-one listening on the remote address.&nbsp;</span>
  </p>
  
  <p>
    <span style="color: rgb(0, 216, 255);"># Solaris</span><br /><span style="background-color: transparent; ">ECONNREFUSED<br /> The attempt to connect was forcefully rejected. The calling program should close(2) the socket descriptor, and issue another socket(3SOCKET) call to obtain a new descriptor before attempting another connect() call.</span>
  </p>
</blockquote>