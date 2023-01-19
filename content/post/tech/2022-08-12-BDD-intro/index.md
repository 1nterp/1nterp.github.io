---
title: BDD (Behavior-driven Development) 소개
author: interp
type: post
date: 2022-08-11T16:31:36.000+00:00
url: "/bdd-behavior-driven-development"
aliases:
- "/entry/BDD-의미와-필요성/"
- "/m/entry/BDD-의미와-필요성/"
image: "feature.jpg"
categories:
- Tech
tags:
- BDD
- Behavior-driven
- 개발방법론
- 테스팅
---
작년 즈음에, 팀에 테스트 주도 개발 (Test-driven Development,TDD) 에 대해 어떤 강력한 합의 (?) 가 필요하지 않을까라고 팀장님께 주장했던 기억이 났다. ~~일단 나부터 좀 잘 해야 할텐데~~ 그런데 그걸 언제 또 기억하셔서는, 올 초에 ‘TDD 말고 BDD 에 대해 조사해서 차기 프로젝트에 녹여보면 어떻겠냐’ 는 제안을 하셨다. 두 눈을 동그랗게 뜬 채 음성 채팅으로 ‘그것이… 무엇이죠?!’ 라고 되물었던 슬픈 기억이 난다.

지금은 프로젝트를 진행 중인데 거의 설계 단계를 지났고, 프로토타이핑이 끝나간다. 바쁜 시간이 지나고서야 팀장님의 부름이 닿아, 뒤늦게나마 우리가 쥐고 있는 요구사항이 무엇인지, 어떻게 적용할 수 있는지 찾아보고 있다. 그런데 이 결과물을 팀원들에게 공유하려면 내가 먼저 ‘BDD 를 왜 써야 하는지’ 를 이해하고 설명할 수 있어야 하기에, 블로그에 정리해 보려고 한다.

## BDD 란?

BDD 는 **Behavior-driven Development**, 즉, 제품이나 서비스의 행동에 초점을 맞춘 개발 방법론이다. 소프트웨어가 어떤 일을 해내야하는지가 가장 중요하며, 개발과 테스팅이 거기에 맞춰 진행되어야 한다는 것이다. ~~뭐, 당연한 소리 아닌가? 다들 이렇게 다 하잖아요, 그쵸?~~

[Cucumber 에서의 BDD 정의](https://cucumber.io/docs/bdd/)는 다음과 같다.

> BDD is a way for software teams to work that closes the gap between business people and technical people by:
> 
> -   **Encouraging collaboration** across roles to build shared understanding of the problem to be solved
> -   Working in rapid, small iterations to increase feedback and the flow of value
> -   **Producing system documentation** that is automatically checked against the system’s behavior

[Inviqa 의 BDD 블로그 포스트](https://inviqa.com/blog/bdd-guide#what-is-it)에서는 이렇게 정의했다.

> BDD is a process designed to aid the management and the delivery of software development projects by improving communication between engineers and business professionals. In so doing, BDD ensures all development projects remain focused on delivering what the business actually needs while meeting all requirements of the user.

잘 보면 collaboration, communication 이 겹쳐 보인다. 

## BDD 적용 방식

여기서 나는 BDD 의 Best Practice 나 심지어 Gherkin 문법에 대해서 자세히 조사해 정리하지 않을 것이다. 왜냐하면 나도 배우는 입장이고, 이 포스팅의 목적은 ‘BDD 가 정말 필요할까요?’ 를 밝히는 것이기 때문이다.

정말 필요하다고 생각하면, 그때서야 더 깊이 찾아보면 될 일이다.

### Discovery

User Story 에서 실제 예제를 만든다. 이 예제는 합의되어야 한다.

이 과정은 협업 단계이다. 워크샵을 통해 아이디어를 모으고, 구체적인 예시를 들어야 한다. 이 과정을 통해 어떤 기능이 정말 필요한지 우선순위를 정할 수도 있다. User Story 의 범위를 조정하는 작업이기도 하다.

이런 과정을 통해, 우리가 뭘 해야 할지 결정하기 위해 빠진 정보를 알아낼 수도 있다. 처음부터 모든 정보를 들고 요구사항을 구체화할 수 없기 때문이다. 다시 채워서, 다시 이야기해야 한다.

다시 말하지만, 여기서 산출된 예제들은 합의된 것이어야만 한다. 그렇지 않으면 다음 사이클에 영향을 끼친다.

### Formulation

예제를 자동화 가능한 형태로 문서화한다. 이 문서는 합의되어야 한다.

문서는 Gherkin 문법 (GIVEN - WHEN - THEN) 으로 정형화한다. 이 문서 내용을 다시 모든 조직원들에게 공유해, 이렇게 테스트할 것이라고 검증받아야 한다. (다시 말하지만, 이 문서도 합의되어야 한다.)

### Automation

문서에 맞춰 구현하고 테스트한다.

언어 별로 다양한 라이브러리/패키지가 지원되며, BDD 또는 Cucumber, Gherkin 으로 검색하면 관련 자료가 늘 나왔었다. 내가 확인한 건 일단 Java ([Mockito](https://site.mockito.org/)), Python ([behave](https://behave.readthedocs.io/en/stable/)), Go ([godog](https://github.com/cucumber/godog)) 정도가 있다.

Gherkin 문법으로 정형화된 문서를 입력으로, 코드 템플릿을 출력하거나 코드 템플릿과 일치하는 테스트 케이스가 존재하면 바로 테스트 결과를 출력한다. (behave, godog 만 테스트해 봤다) 각 언어 별 실제 사용 예제는 블로그에 따로 정리할 예정이다.

### Gherkin Format

그럼 도대체 Gherkin ~~오이피클~~ 은 어떻게 쓰는가? 가장 간단한 방법은 세 문장으로 나타내는 것이다.

```
Given there are 12 cucumbers
When I eat 5 cucumbers
Then I should have 7 cucumbers
```

GIVEN 은 전제 조건이고, WHEN 은 액션, THEN 은 그 결과이다. 이 부분을 테스트 케이스로 만드려면,

-   GIVEN : 전제조건이 되도록 환경을 구성하거나 mocking 한다.
-   WHEN : 액션을 가한다. (함수를 호출하거나)
-   THEN : 실제 결과가 명세에서 예상한 대로 나왔는지 검증하는 코드가 필요하다.

물론 세 가지 키워드 말고도 다양한 방법으로 ‘예제’ 를 표현할 수 있다. 자세한 문법 내용은 [여기](https://cucumber.io/docs/gherkin/reference/)를 참고하자.

## 내가 생각하는 BDD

BDD 가 어떤 것인지 맛을 봤으니, 이제는 왜 이 방법론이 필요한지 내 생각과 경험을 얹어 설명해 보겠다.

> 보통 프로젝트를 시작하거나 하면 TDD 를 기본으로 깔고 시작한다.  
>   
> 우선 개발자는 요구사항에 맞는 테스트 케이스를 만든다. 그 요구사항은 프로젝트 안에서 개인에게 할당된 작업 내용에 관한 것일 수도 있고, 정말 고객이나 비즈니스에서 원하는 기능에 대한 요구사항 명세일 수도 있다.  
>   
> 테스트 케이스를 먼저 만들고, 테스트 케이스는 물론 실패한다. 실패하지 않게 구현하고, 박수를 짝짝 치고 PR 을 연다. 리뷰를 받고 파이프라인을 통과해 프로덕션 브랜치로 기능 (또는 수정 내역) 이 반영된다.

문장 자체로만 보면 아주 당연하고 아름다운 순서이겠지만, 여기서 뭔가 꺼림칙한 부분이 생기게 된다. 나는 크게 두 가지가 걸리는데,

1.  **테스트 케이스가 요구사항을 온전히 반영했는지 검증이 가능한가?** 사람은 오류와 상상의 동물이라서, 요구사항을 아무렇게나 해석해서 테스트 케이스를 만들어 둘 수 있다. 물론 코드 리뷰하면 다 나오는거, 맞다. 그런데 우리가 리뷰해야 할 것은 리펙터링과 모킹 (mocking) 이 복잡하게 뒤섞인 ‘코드’ 란 말이다. 정말 그 오류를 잘 찾아낼 수 있나?
2.  **요구사항은 대체 어떻게 만드는가?** 이건 좀 더 근원적인 질문인데, 요구사항이라는 것은 언제나 ‘고객/비즈니스-개발 조직’ 또는 ‘프로젝트 리더-프로젝트 개발자’ 사이에 정량적으로 합의된 내용이어야 한다. 티켓에 적힌 내용, 회의록이 합의된 결과 아니냐고? 글쎄… 그걸 다 모아다가 볼 수 있나? UML 은 어떨까? UML 다이어그램에 대한 지식이 없는 사람은 그럼 요구사항 리뷰를 못 하는 걸까?
    -   우리는 늘 이런 걸 겪지 않았던가? “_그건 제가 하고 싶은 말이 아니었어요!_” “_그건 제가 원하던 것이 아니었어요!_” 라는 말… 어정쩡하고 단방향의 요구사항은 늘 화를 불러오게 되어 있다.

이런 방식대로라면 (1) 사용자가 정말 원하는 **요구사항을 ‘요구사항 명세’ 가 100% 커버하는지** (결과물이 너무 다양하거나 복잡하기 때문에) 쉽게 알 수도 없고 (2) **요구사항 명세가 테스트 케이스로 변환되어 100% 기능하고 있는지**도 쉽게 알 수 없다는 것이다. 내가 ‘쉽게’ 라는 말을 붙이긴 했지만, 현실에서는 거의 불가능하다고 본다.

내가 봤을 때 BDD 는 두 가지 문제를 짚어 나가는데 효과적이다. 개발 외 조직으로부터 사용자 요구사항을 받는 것 말고도, 개발조직 내부에서 요구사항을 합의하고 기능을 검증할 때도 효과적이라는 점 역시 덧붙이고 싶다.

## 마치며

이렇게 설명해놓고 보니, 일선 개발자에겐 TDD 의 확장 개념이라고 여기게 될까 조심스럽다. 어차피 자연어로 된 문서를 소스로 한다는 점만 틀리지, 거기서 생성된 테스트 케이스의 코드를 구현하고 Regression 을 돌리는 작업이 기존에 하던 TDD 와 무엇이 다르냐고 할 수도 있겠다.

하지만 TDD 를 시작하기 이전에 ‘어떻게 테스트 케이스를 만들죠’ 라는 부분에 대한 하나의 대안으로 생각해주면 좋겠다. 이 방법이 부상하기 전부터, 소프트웨어 공학에서 제시한 UML 명세나 수 많은 다이어그램에 기초해서 테스트 케이스를 만들지 않았던가. 조직에서 이런 방식으로 이미 명세-테스트 케이스 자동화가 되어 있다면 정말로 BDD 가 필요없을 순 있겠다. 하지만, UML 부터 무척 복잡하다고 느끼는 것은 비단 나 뿐일까?

**BDD 는 확실히 사용자가 정말 원하는 예제를 찾고, 보완하는데 불편함이 적다.** 누구나 읽을 수 있는 언어로 되어 있으니, 비즈니스를 다루는 직원은 뭔가를 더 배울 필요가 없다. 개발자는 나름 규격화된 문서를 가지고 테스트 케이스를 만들 수 있다. 즉, 이 방법론은 조직 전체에 걸쳐 광범위한 개발 방법론이라고 볼 수 있겠다.

다음 포스팅은, 내가 실제로 구동해 본 behave 나 godog 예제가 될지, 아니면 현업에서 적용해보고 난 뒤 받은 피드백에 대해서 이야기할지 고민 중이다. 아직 이렇다 할 피드백이 없어서, 아마도 실제로 따라 써 볼 수 있는 글을 쓰는게 현실적이리라 본다.