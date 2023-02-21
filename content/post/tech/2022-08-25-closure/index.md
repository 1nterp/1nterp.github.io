---
title: 클로저 (Closure)
description: "함수인듯 함수아닌 함수같은 너🎵"
author: InterP
date: 2022-09-18 08:33:23 +0900
url: /program-language-closure
aliases: 
- "/m/entry/closure"
- "/entry/closure"
image: feature.jpg
image_y: 76%
categories:
  - Tech
tags: 
  - golang
  - Closure
  - Python
math: true
---

나와 같은 개발자 친구와 이런저런 이야기를 하던 중, 내 리뷰가 반려된 경험담을 꺼냈던 적이 있다. 

> **나:** 내가 클로저를 사용해서 구현했거든. 그런데 리뷰어가 그게 뭐냐고, 아예 함수로 빼달라고 하는거 있지?  
> **친구:** 아~ 그런데, 클로저가 도대체 뭐야?  
> **나:** 어..? 그거, 있잖아! 함수 안에 함수 만드는 거! 그런데 그 함수 외부 변수 참조할 수 있는 거!

그러고 나자 (친구는 가만히 있는데) 나 혼자 부끄러운 생각이 들었다. 제대로 알지도 못하고 쓰고 있었구나 😂 일단 나부터 잘 모르고 쓰고 있다는 생각이 들어, 이참에 정리를 해 두려고 한다.

# 정의

프로그래밍 언어에서 Closure 는, *함수 바깥에 있는 변수를 참조하는 함수 '값'* 을 말한다..고 한다.

한국어판 [위키백과 설명](https://ko.wikipedia.org/wiki/%ED%81%B4%EB%A1%9C%EC%A0%80_(%EC%BB%B4%ED%93%A8%ED%84%B0_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D))을 보도록 하자.

> 컴퓨터 언어에서 클로저(Closure)는 [일급 객체 함수](https://ko.wikipedia.org/wiki/%EC%9D%BC%EA%B8%89_%EA%B0%9D%EC%B2%B4)(first-class functions)의 개념을 이용하여 스코프(scope)에 묶인 변수를 바인딩 하기 위한 일종의 기술이다.  
>
> 기능상으로, 클로저는 함수를 저장한 [레코드](https://ko.wikipedia.org/wiki/%EB%A0%88%EC%BD%94%EB%93%9C)(record)이며, 스코프(scope)의 인수(Factor)들은 클로저가 만들어질 때 정의(define)되며, 스코프 내의 영역이 소멸(remove)되었어도 그에 대한 접근(access)은 독립된 복사본인 클로저를 통해 이루어질 수 있다.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) 에 있는 정의도 찾아봤다.

> A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the **lexical environment**). In other words, a closure gives you access to an **outer function's scope** from an inner function.

{{< figure src="giphy.webp" caption="~~시방 저것이.. 뭔 소리여?~~">}}

# Golang 에서의 Closure

백문이 불여일견, 일단 보자.

```golang
package main

import "fmt"

func outer() func() int {
	x := 0
	return func() int {
		x++
		fmt.Println("Output:", x)
		return x
	}
}

func main() {
	inner_f := outer()
	inner_f()
	inner_f()
}
```

`main()` 에서 호출하는 두 번의 `inner_f()` 가 일반 함수 호출이었다고 생각해보자. 일반적인 함수에는 _상태가 저장되는 곳이 없다_. 즉, 입력 값에 변화가 없기 때문에 두 번의 호출이 동일한 결과를 낼 것 같다. 

하지만 현실은 그렇지 않다. `inner_f` 에서 받은 것은 `outer()` 라는 함수가 아니라 **클로저**이기 때문이다. 따라서 출력이 다음과 같을 것이다.
```
Output: 1
Output: 2
```

# Python 에서의 Closure

이번에는 똑같은 결과를 내는 Python 코드를 짜 보자.
```python
def outer():
    x = 0
    def inner():
        nonlocal x
        x += 1
        print("Output:", x)
        return x

    return inner

inner_f = outer()
inner_f()
inner_f()
```
거의 똑같지만, Python 에서는 `nonlocal` 키워드를 사용해서 외부 변수를 참조하겠다고 명시해야 한다.

 `def inner()` 말고 Golang 처럼 unnamed function 을 정의해서 넘겨주려면 lambda function 을 참고하면 된다.

# 일급 객체, 일급 함수

잠시 일급 객체라는 개념을 먼저 짚고 넘어가자. 일급 객체가 되려면, 세 가지 조건이 있다.

-   변수에 담을 수 있는 것
-   인자로 전달이 가능한 것
-   반환값으로도 전달이 가능한 것

일급 함수는 *함수형으로 된 일급 변수*를 뜻하니까, 짧게 설명하면 **변수처럼 다룰 수 있는 함수** 일급 함수라 할 수 있다. ([참조](https://velog.io/@mgm-dev/%EC%9D%BC%EA%B8%89%ED%95%A8%EC%88%98%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80))

대부분의 스크립트 프로그래밍 언어가 일급 함수를 취급한다. 하지만 오래된 언어들 (기본 C, Algol...) 의 경우엔 세 가지 조건 중 일부만 지원하기 때문에, 일급 함수를 취급할 수 없다.

# 스코프

어떤 변수의 스코프는, 다른 말로 하면 변수가 어디까지 접근 가능한지를 나타낸 개념이다. 특정 변수의 *수명 (lifetime)* 으로도 나타내지만, 나는 두 개념이 모두 포함된 것이라고 본다.

앞서 본 것 처럼, 클로저는 함수가 선언된 스코프 (scope) 안에 선언된 어느 변수라도 접근이 가능하다. 즉, 함수 스코프의 상위 스코프 까지다. 

예제를 다시 보자. 변수 `x` 가 이에 해당 한다. outer() 안에 선언된 클로저 안에는 x 가 없지만, 클로저가 선언된 스코프 (그러니까 outer() 전체) 에는 x 가 사용 가능하다. 물론 이건 클로저 역시 마찬가지다.

수명 이야기를 했는데, outer() 가 호출되기 시작할 때 변수 x 는 스택에 쌓이고, 호출이 종료되면 x 는 스택에서 빠질 것이다. 하지만 클로저가 선언되어 있다면 이 변수 x 의 수명은 늘어나게 된다. 그럼 이렇게 수명이 늘어난 변수 x 는 어디에 저장될까?

# 자유 변수

클로저에서 숨어있는 개념이 바로 '[자유 변수 (free variable)](https://ko.wikipedia.org/wiki/%EC%9E%90%EC%9C%A0_%EB%B3%80%EC%88%98%EC%99%80_%EC%A2%85%EC%86%8D_%EB%B3%80%EC%88%98)' 이다. 자유변수란 수학에서 나온 개념인데, 수식 속에서 상수로 치환이 가능한 변수를 말한다. 그 외의 변수는 전부 종속 변수 (bound variable) 이라고 말한다.

위키 예제를 잠깐 빌려 이해해보자. $\textstyle\sum_{n=1}^1 m/n$ 에서 자유 변수는 무엇일까? 수식에서 자유로운 `m` 이 바로 자유 변수고, `n` 은 $\Sigma$ 에 종속된 종속 변수다.

클로저에서 이 개념을 적용해 보자. 클로저를 선언한 스코프 바깥에 있는 변수지만, 참조를 하고 있는 변수가 자유 변수인 것이다.

클로저가 그냥 함수였다면, 자유 변수가 어떤 값을 가지고 있건 상관 없이 작동해야 한다. 반대로 말하면 **이런 자유 변수로 인해, 함수로써 닫힐 수 있게 만든 것**을, 우리는 클로저 (closure) 라고 부르는 것이다. (써놓고도 무슨 말인지..)

# 다시 정의를 읽어보자

> 컴퓨터 언어에서 클로저(Closure)는 [일급 객체 함수](https://ko.wikipedia.org/wiki/%EC%9D%BC%EA%B8%89_%EA%B0%9D%EC%B2%B4)(first-class functions)의 개념을 이용하여, 스코프(scope)에 묶인 변수를 바인딩 하기 위한 일종의 기술이다.

-   참고로 일급 객체 함수와 클로저는 같은 말이 아니라, **일급 객체 함수 ∋ 클로저**이다.
-   *스코프에 묶인 변수를 바인딩한다*는 뜻은, 클로저가 사용할 수 있게 계속 유지한다는 말과 같을 것이다.

> 기능상으로, 클로저는 함수를 저장한 [레코드](https://ko.wikipedia.org/wiki/%EB%A0%88%EC%BD%94%EB%93%9C)(record)이며, 스코프(scope)의 인수(Factor)들은 클로저가 만들어질 때 정의(define)되며, 스코프 내의 영역이 소멸(remove)되었어도 그에 대한 접근(access)은 독립된 복사본인 클로저를 통해 이루어질 수 있다.

-   클로저 = **함수를 저장한 레코드**!
-   스코프의 인수는, 달리 말하면 클로저가 선언된 스코프에 선언된 모든 변수/객체를 말한다. 이 것들이 **클로저가 만들어질 때 (=선언될 때) 정의**된다는 것이다. 어디에? 바로 레코드 안에.
-   스코프 내의 영역이 실제로 소멸되는 시점은, 스코프가 호출이 끝난 시점 (=함수 호출이 끝난 시점) 일 것이다.   
    하지만 클로저 안에서는 해당 영역으로 영원히 접근 가능한 상태로 남아있게 된다.

여기까지 해석해 보면, 간접적으로 메모리를 좀 더 쓸 것이라는 추측이 가능하다. 단순히 생각해도 지역 변수들의 수명이 클로저 때문에 계속 되도록 만들어야 하기 때문이다.

MDN 정의도 다시 읽어보자. 이번엔 해석을 해 봤다.

> A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.  
> 
> 클로저란, 클로저를 둘러싼 상태 (사전적 환경) 와의 참조를 함께 넣어 묶은, 함수의 조합입니다. 다른 표현으로, 클로저를 통해 함수 내부에서 함수 외부로 접근을 가능하게 만들 수 있습니다.

클로저를 둘러싼 상태, lexical environment 라는 말들 전부 **클로저 바깥**을 말한다. 사실 뒷 문장이 다 설명을 해 주고 있다.