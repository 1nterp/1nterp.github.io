---
title: Windows Kernel Object Handle
author: interp
type: post
date: 2014-11-21T14:08:15+00:00
draft: true
private: true
url: /windows-kernel-object-handle/
categories:
  - 프로그래밍
tags:
  - Handle
  - 윈도우

---
<p style="text-align: left;">
  Windows Platform에서, 커널에서 서비스되는 객체를 다루기 위한 자료를 <b>핸들(Handle)</b>로 정의한다. 파일을 열 거나, 파이프를 열거나, 프로세스에 접근하거나&#8230; 커널과 관련있다 싶은 객체들을 다룰 때는 무조건 핸들을 열어야 한다. ('생성하고 소멸시킨다'는 표현보다는 '열고 닫는다'는 표현이 더 적절한 것 같다.)
</p>

<p style="text-align: left;">
  이 핸들은 프로세스에 특정되어 있다. 영어로 하자면 Process-specific 하다고 할 수 있다. 특정 객체에 대해 '프로세스 A'에서 열었던 핸들은 '프로세스 B'에서 함께 쓸 수 없다. 프로세스 B에서도 별도의 핸들을 열어 객체에 접근하는 수 밖에 없다.
</p>

<p style="text-align: left;">
  프로세스 당 핸들을 열 수 있는 개수에는 제한이 있다. 보통 2^24 개로 알려져 있는데, 32-bit냐 64-bit 냐에 따라 최대값이 대동소이하게 바뀐다 카더라. 그래도 대략 <b>1600만개</b>를 상회하면 문제가 발생한다. 이 이야기를 왜 하냐면, <b>반복적으로 수행되는 루틴에서 핸들을 열고 핸들을 다 썼으면 반드시 닫아야 한다는 걸 알려주기 위해서</b>다. 그렇지 않으면, 어느 순간 프로그램이 핸들 과다로 인해 원하는 동작을 못 하는 상황이 발생한다.
</p>

<p style="text-align: left;">
  내가 겪었던 예제를 하나 소개하자면, Child Process가 여전히 존재하는지 확인하기 위해 OpenProcess() 함수를 사용했었다. 이 루틴 자체가 굉장히 빈번하게 호출되고 Child Process가 외부 요인에 의해 종료된 경우에는 재생성을 해서라도 Child Process를 이용해야 했다. 그래서 OpenProcess() 함수의 핸들을 여는 Overhead를 감수하고서라도 작업 수행 전에 항상 호출했었다.
</p>

<p style="text-align: left;">
  문제는, 이 때 OpenProcess()를 한 이후에 생성된 핸들을 처리하지 않았다는 것이다. 핸들을 제떄 닫아두지 않으면 계속해서 핸들이 열리게 되고, 1600만번 정도 루틴이 수행될 때에는 급기야 Child Process가 살아있는데도 핸들을 못 얻어 '시스템 리소스가 없습니다' 라는 식으로 에러가 발생하는 것이다. 이 때부터 프로그램이 꼬이기 시작했던 것이다.
</p>