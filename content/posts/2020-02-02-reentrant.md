---
title: Reentrant
author: interp
type: post
date: 2020-02-01T23:33:51+00:00
draft: true
private: true
url: /reentrant/
categories:
  - 미분류

---
> <div>
>   In <a title="" href="https://en.wikipedia.org/wiki/Computing">computing</a>, a <a title="Computer program" href="https://en.wikipedia.org/wiki/Computer_program">computer program</a> or <a title="Subroutine" href="https://en.wikipedia.org/wiki/Subroutine">subroutine</a> is called <b>reentrant</b> if it can be interrupted in the middle of its execution and then safely be called again (&#8220;re-entered&#8221;) before its previous invocations complete execution. The interruption could be caused by an internal action such as a jump or call, or by an external action such as an <a title="Interrupt" href="https://en.wikipedia.org/wiki/Interrupt">interrupt</a> or <a class="mw-redirect" title="Signal (computing)" href="https://en.wikipedia.org/wiki/Signal_(computing)">signal</a>. Once the reentered invocation completes, the previous invocations will resume correct execution.
> </div>
> 
> <div>
>   컴퓨팅에서, 컴퓨터 프로그램 (함수) 이나 서브루틴이 수행 도중 인터럽트가 발생할 수 있지만 그 사이 동일한 함수 (또는 루틴)이 다시 호출되어도 아무런 문제 없이 작동한다면? 이는 &#8216;재진입 가능한 (re-entrant)&#8217; 프로그램 또는 루틴이라고 말할 수 있다. 인터럽트는 코드 점프나 호출, 또는 외부의 인터럽트나 시그널로 발생할 수 있다. 재진입한 호출이 완료되고 나서, 이전에 호출된 루틴도 올바르게 수행을 완료한다.
> </div>

<div>
</div>

<a href="http://yesarang.tistory.com/214" target="_blank" rel="noopener noreferrer" shape="rect">여기</a>서 차이점을 잘 짚어줬는데, Thread Safe 는 쓰레드가 같이 접근해도 일관된 결과가 나오지만, Reentrant (Re-entrant) 는 쓰레드가 동시에 접근해도 일관된 결과가 나온다는 것입니다. 쓰레드가 동시에 함수에 진입하는 것과 쓰레드가 동시에 함수를 실행하는 것은 조금 다릅니다. 동시에 진입해도 critical section 에서 자원 제어 관리를 받으니까요. (mutex lock 처럼) 하지만 reentrant 는 그런 거 없고 동시에 함수를 실행해도 상관없습니다. 이 말인 즉, 공유 자원이 없다는 뜻&#8230;?보통은 reentrant 합니다. 1+1 은 귀요미를 반환하는 함수라면 어느 함수가 실행시켜도 상관없죠. 하지만 이런 것 까지 모두 이 특별한 속성을 붙여주진 않습니다. 재귀함수들 중에서 reentrant 가 안 되는 것들이 존재할 때, &#8216;reentrant version 은요?&#8217; 라고 물어볼 때 사용됩니다.

즉, reentrant 가 thread-safe 를 포함하고 있습니다. reentrant 하다면 thread-safe 하다고 볼 수 있습니다. (반대는 성립하지 않지만요)

아니 함수에 공유 자원이 있나요? 사용자가 그렇게 자면 할 말이 없는데 시스템 콜이나 라이브러리 함수 중에 그런 경우가 있나요?

strtok() 는 그럼 뭡니까. 이건 두 번째 호출부터는 내부 포인터에서 tokenize 하는 함수입니다. 이 함수를 쓰레드 두 개가 동시에 부르면 엄청나겠죠? qsort() 의 경우는 경우에 따라 다르지만, 만약 compare 과정에서 global variable 이 필요한 경우에는 더 이상 thread-safe 라고 할 수 없습니다. qsort() 내부에서 compare func 를 어떻게 부를 줄 알구요? 대신 qsort_r() 에서는 &#8216;어이, 너가 compare 함수에서 계속 기억해 둘 포인터를 여기에 넘겨줘, 그럼 내가 잘 쓸게&#8217; 입니다. global variable 이 아니라 thread-specific variable 을 계속 가져가 주겠다는 거죠. 이게 reentrant 의 핵심입니다. 공유 자원을 없앤 거예요.