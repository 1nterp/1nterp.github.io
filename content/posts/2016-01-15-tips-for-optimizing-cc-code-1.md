---
title: Tips for Optimizing C/C++ Code
author: interp
type: post
date: 2016-01-15T08:51:38+00:00
draft: true
private: true
url: /tips-for-optimizing-cc-code-1/
categories:
  - 프로그래밍

---
<a class="tx-link" target="_blank" href="http://people.cs.clemson.edu/~dhouse/courses/405/papers/optimize.pdf" rel="noopener noreferrer">http://people.cs.clemson.edu/~dhouse/courses/405/papers/optimize.pdf</a> 

암달의 법칙( Ahmdal's Law, **`1 / ( 1 -&nbsp; cost(f) ) + cost(f) / speedup(f)`** )을 기억하라. Run-time의 상당량을 소비하는 함수를 최적화하는 방법이 가장 효과적이라는 것이다. 달리 말해서, 자주 사용되지 않는 함수는 최적화 과정에 최소한으로 신경쓰거나 최적화 과정을 아예 고려하지 않아야 한다.

정확히 동작한 다음에 최적화 해야 한다.

내가 알고 있는, 정말 효율적인 코드를 짜는 사람들은 짜는 시간보다 적어도 2배 이상의 시간을 들여 최적화한다.

Jump / Branch 비용은 비싸다. 따라서,

  * 함수 호출 (Function Call)은 두 번 Jump 한다. Stack Memory 도 신경써야 한다. 최대한 부르지 말자.
  * 재귀 호출(recursion) 보다는 반복 루프(iteration)를 쓰자.
  * 함수 호출을 최소화 하기 위해, 실행이 짧은 함수들은 전부 Inline Function으로 만들자.
  * 함수 호출을 반복적으로 하지 말고, 함수를 한 번 호출해서 그 안에서 반복을 하자.  
    예를 들어, for (&#8230;) doSomething(); 말고 doSomething() 안에서 for (&#8230;)를 실행할 수 있도록 (가능하다면!)
  * if, else if, else if &#8230; 체인은 정말 정말 많은 Jump를 해야 한다. switch로 바꾸면, 컴파일러각 Table Lookup 형태의 Instruction 으로 짜 줄 수도 있다.  
    switch로 바꿀 수 없다면, 가능한한 공통된 조건을 가장 앞 if에 둬서 Jump 회수를 줄이자.



배열이 메모리에 어떻게 위치해 있는지 생각하자. CPU Cache를 이용하면 빠르다. Cache에는 특정 메모리 영역을 읽어도 그 곳을 시작지점으로 하는 Line을 통째로 읽는다. (다음에 읽을 것이라 예상하기 때문) a\[i\]\[j\] 옆엔 a\[i\]\[j+1\] 이 있으니 이걸 다음에 읽어야 한다. a\[i+1\]\[j\] 를 다음에 읽으면.. Cache Miss 대박.

시스템의 CPU Cache Line 크기를 알아내고, 적극 활용해라. Cache Line에 정렬되어 있지 않은 메모리 영역이 존재하면, 괜히 엉뚱한 1 Byte가 수정될 경우 전체 Line이 더러워지고, Cache Miss가 뜰 수 있다. Cache Line이 128 Byte이고 연속된 구조체 배열에서 구조체 크기가 127Byte 라면.. 나는 수정되지 않았는데 (옆 놈이 수정됐다고) 나를 다시 Cache Load 해야 하는 안습한 상황..

Instruction Level 에서의 병렬처리를 생각하자. 단일 CPU Core도 여러 개의 연산 유닛이 존재한다. 이를 위해서 unrolling loop 기법을 적용해야 한다. (<a href="https://en.wikipedia.org/wiki/Loop_unrolling" data-mce-href="https://en.wikipedia.org/wiki/Loop_unrolling">https://en.wikipedia.org/wiki/Loop_unrolling</a>) Inline Function 역시 이 관점에서는 도움이 되는 기법이다.

지역 변수는 가급적 최소한으로 사용해야 한다. 지역 변수는 원래 스택에 들어가는데, 적은 양의 변수가 선언되면 스택 대신 CPU의 레지스터에 박아서 사용한다. 스택은 메모리고,
   
레지스터는 접근하기 가장 빠른 영역인데.. 비교가 필요없다. 게다가 지역 변수가 스택에 존재함으로 인해 생기는 스택 프레임 설정
   
비용도 없어진다. 단! 이거 하자고 전부 전역 변수로 몰아넣는 꼴통 짓을 해서는 안 된다&#8230;

마찬가지로, 함수 인자(parameter) 개수도 최소한으로 줄여야 한다. 함수 반환형이 필요없으면, 반환하지 마라.

함수에 인자를 넘길 때 Pass By Reference로 넘겨야 한다. Value 자체를 넘기지 않도록 한다. Value보다 Value를 참조할 수 있는 Reference Object가 확실히 크기도 작을 것이고 중복 값이 메모리에 발생하는 것을 최소화하는 장점도 있고.. 아무튼 당연한 이유가 숨어있다.

나누거나 곱하는 연산 대신 >> 또는 << 와 같은 Bitwise Operator를 사용할 수 있다고 하면, 사용하는 것이 낫다.

특정 블록에서만 필요한 지역변수라면, 그 블록의 시작 지점에서 선언해라. 처음부터 다 선언해 두면 스택 부담이 된다. 프로그램 흐름 상 최소한의 지역 변수가 선언되고 지나치는 경우를 적극 활용해야 하므로!

데이터 초기화 코드가 많을 경우, 많이 작성하지 마라. 특정 구조체에 멤버가 굉장히 많은데, 이걸 일일히 초기화 하는 것은 많은 비용이 든다. 정 하고 싶으면 memset으로 처리한 다음에 필요한 멤버를 초기화하는 것이 이득이다.

루프를 최대한 빨리 끝내도록 한다. 그리고 반환할 값이 정해지면 얼른 반환하도록 한다. (이건 가독성 문제와 부닥칠 수 있음)

마지막으로, 특정 연산은 비싸다.

  * sqrt() 를 해서 뭔가 비교하려고 하기 보다, sqrt() 하기 전에 비교하자.
  * x 값으로 계속 나눠야 한다면, 우선 1/x 값을 구해 저장해 뒀다가 이걸 계속 곱해나가자. 계속 나누는 비용보다 싸게 먹힌다.
  * Loop를 만들 때, Loop를 돌면서 절대 바뀌지 않는 연산들은 반드시 Loop 밖으로 끄집어 내자.
  * 매 회마다 새로(from scratch) 시작하는 것보다, 값을 계속 증가시켜나가면서 Loop를 짜는 것이 더 좋다.