---
title: "Go Functional Option Pattern"
description: "default parameter 를 쓰고 싶다면"
author: InterP
date: 2023-01-18 17:00:00 +0900
url: /golang-functional-option
categories:
- Tech
# image: feature.jpg
# image_y: "86%"
tags:
- golang
- parameter
- pattern
draft: true
---

Python 을 자주 쓰다 보면 default parameter 의 유혹에 빠지기 쉽다. 물론 너무 많이 사용하면 유지보수가 어려워지지만 말이다. 그런데 Golang 에서는 이 default parameter 가 허용되지 않는다. 그러면 다양한 파라메터를 가진 constructor 를 만들어야 할까? 라는 질문을 가지고 찾아보던 중, **Functional Option** 이라는 패턴을 찾아냈다.

{{< callout text="아래 내용은 [Functional options for friendly APIs](https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis) 를 기반으로 다시 정리했다." emoji="🔗" >}}

# 요구사항은 끊임없이 들어온다

# Parameter 를 하나씩 추가하자

# Config 라는 추가 Struct 에서 옵션을 받자

# variadic function 으로 쓰자

# 마지막: function 을 직접 받으면? 


parameter 를 하나씩 추가한다? → 으악 코드 보는 사람을 수렁에 빠트릴 셈이야? 요구사항이 추가되면 계속 추가하니?
config 라는 struct type 을 만들어서, struct type object 에 원하는 옵션을 기재해서 넘긴다? → 좋긴 한데, 옵션이 필요없어서 nil 을 넘기거나 빈 값을 넘기면?
variadic function (...any) 를 쓰면? → 오 이제 옵션이 필요없으면 안 넣어도 되네! 그런데 variadic 은 1개 말고 여러개 들어갈 수 있잖아. 이건 어떻게 강제해?
functional options 기법을 쓰면? → 내가 반환받을 객체에 직접 수정을 한다? 와우! 좋은걸?

좀 더 좋은 기법이 있는지 찾아보면 좋겠다.

# 더 읽어볼 것

https://golang.cafe/blog/golang-functional-options-pattern.html

Golang cafe 에서는 아예 functional options 을 사용자가 만들게 하지 말고, 미리 만들어 두는 것을 추천한다. 이것도 나쁘지 않음.

https://michalzalecki.com/golang-options-pattern/

위 내용들과 비슷한데, 미리 지정한 options slice 를 Preset 이라고 지정해 둔 점은 재밌다. 물론, Preset 쓸 때도 variadic dot 을 붙여줘야 한다.

https://amirsoleimani.medium.com/functional-options-in-go-with-generic-863dbd68cc6f

내가 상상한 대로, 여기서는 아예 functional options 의 func signature 를 type 으로 지정해 뒀다 (첫 줄)

객체에서 공유되는 필드들은 전부 opt 에 감싸고, 거기서만 조작할 수 있도록 한다. (참조는 알아서...)

그리고 여기서는 '해당 패턴이 항상 좋은 것만은 아니라는' 점을 강조한다.

객체를 만드는 데 여러 옵션이 있고, 그 옵션이 전부/대부분 필요없는 경우엔 효과가 있다.
여러 객체에 대해 같은 functional option 을 재사용하는데엔 무리가 따를 수 있다. (객체의 상속에 신경써야 함) ← 블로그가 말하는 부분

그럼에도 이 부분을 해결하기 위해서 interface{} 와 typed switch 를 써서, 개별 객체에서 특별한 opt 만 핸들링할 수 있게 처리하는 솔루션을 제공한다.

나아가서, go1.18 에서는 Generic Type 이 지원되는데, 그러면 핸들링하는 body 안에 들어가기도 전에 함수에서 이미 type validation 을 할 수 있게 된다.