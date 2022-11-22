---
title: "BDD in Python: Behave"
author: interp
type: post
date: 2022-08-19T09:00:36.000+09:00
url: "/bdd-in-python-behave"
aliases:
- "/entry/BDD-in-Python-behave/"
categories:
- Tech
tags:
- BDD
- Python
- behave
---
[지난 포스팅]({{< relref "2022-08-12-BDD-intro/index.md" >}})으로 BDD 는 어떤 개발방법론이고, 어떤 면에서 이 방법이 필요한지를 정리해 봤다. 

이번 포스팅을 시작으로, 직접 다양한 언어에서 BDD 를 적용하는 방법을 정리해 볼 예정이다. 첫 시간으로는 **파이썬** (Python) 언어를 가지고 할 것이다. Python 라이브러리 중 하나인 [behave](https://behave.readthedocs.io/en/stable/) 를 통해, BDD 테스트 프레임워크를 구성하고, 예제 시나리오를 만들어서 테스트 자동화가 어떻게 이뤄질 수 있을지 알아보자.

# 예제 프로젝트 생성

{{< callout text="모든 명령어는 리눅스 OS 또는 WSL 환경에서 실행한다고 가정한다." >}} 

파이썬이 설치된 환경에서 다음과 같이 디렉터리만 만들면 된다.

```bash
mkdir behave-test && cd behave-test
```

나는 virtualenv 를 이용해 환경을 분리해 두도록 하겠다.

```bash
virtualenv venv
source venv/bin/activate
```

# behave 설치

`pip install behave` 만 하면 된다.

# `features/steps` 디렉터리 생성

behave 는 `features/steps` 를 필요로 한다. 만들어 주자.

```bash
mkdir -p features/steps
```

---

디렉터리만 만들고 곧장 `behave` 를 실행하면, `ConfigError: No feature files in $(pwd)/features` 라는 메시지가 뜰 것이다.

# `.feature` 파일 만들기

`features/hotdog.feature` 라는 파일을 하나 만들어보자. 핫도그 12개에서 5개를 먹으면 반드시 7개가 남아야 한다는 내용이다. 단순 영어로 되어 있지만, 문법에 대해 더 자세히 알고 싶다면 [이전 포스팅](https://interp.tistory.com/entry/BDD-%EC%9D%98%EB%AF%B8%EC%99%80-%ED%95%84%EC%9A%94%EC%84%B1)을 꼭 참고하고 오자.

```gherkin
Feature: eat hotdogs

  Scenario: Eat 5 out of 12
      Given there are 12 hotdogs
      When I eat 5
      Then there should be 7 remaining
```

---

이제 다시 `behave` 를 실행하면, 아래 구조로 되어 있는 테스트 파일이 존재하지 않다고 하면서, 스니펫 (snippet) 을 출력해 주고 내부를 구현해 달라고 한다.

```bash
$ behave
Feature: eat hotdogs # features/hotdog.feature:1

  Scenario: Eat 5 out of 12          # features/hotdog.feature:3
    Given there are 12 hotdogs       # None
    When I eat 5                     # None
    Then there should be 7 remaining # None


Failing scenarios:
  features/hotdog.feature:3  Eat 5 out of 12

0 features passed, 1 failed, 0 skipped
0 scenarios passed, 1 failed, 0 skipped
0 steps passed, 0 failed, 0 skipped, 3 undefined
Took 0m0.000s

You can implement step definitions for undefined steps with these snippets:

@given(u'there are 12 hotdogs')
def step_impl(context):
    raise NotImplementedError(u'STEP: Given there are 12 hotdogs')


@when(u'I eat 5')
def step_impl(context):
    raise NotImplementedError(u'STEP: When I eat 5')


@then(u'there should be 7 remaining')
def step_impl(context):
    raise NotImplementedError(u'STEP: Then there should be 7 remaining')
```

# 테스트 Python 파일 만들기

방금 출력된 내용을 단순히 복사해서 `features/steps/hotdog.py` 라는 파일을 만들었다. 참고로 파일 이름은 상관없지만 반드시 `features/steps` 디렉터리에 위치해야 한다.

```python
from behave import *

@given(u'there are 12 hotdogs')
def step_impl(context):
    raise NotImplementedError(u'STEP: Given there are 12 hotdogs')


@when(u'I eat 5')
def step_impl(context):
    raise NotImplementedError(u'STEP: When I eat 5')


@then(u'there should be 7 remaining')
def step_impl(context):
    raise NotImplementedError(u'STEP: Then there should be 7 remaining')
```

시나리오의 각 구절 (_GIVEN, WHEN, THEN_) 에 연결되는 기준은, 각 method 에 위치한 decorator 인 `@given`, `@when`, `@then` 에 따라 달려있기 때문에, 파일 이름은 상관없고 해당 decorator 만 수정하지 않으면 된다. 

그리고 주의할 것은, 반드시 맨 위에 `from behave import *` 와 같이 `behave` 라이브러리를 import 해야 한다는 것이다.

---

이렇게 하고 다시 `behave` 를 실행하면, 예상대로 `NotImplementedError` exception 이 발생하면서 traceback 이 출력되고, 테스트는 실패한 것으로 간주한다.

```bash
$ behave
Feature: eat hotdogs # features/hotdog.feature:1

  Scenario: Eat 5 out of 12          # features/hotdog.feature:3
    Given there are 12 hotdogs       # features/steps/hotdog.py:3 0.000s
      Traceback (most recent call last):
        File "/home/behave-test/venv/lib/python3.6/site-packages/behave/model.py", line 1329, in run
          match.run(runner.context)
        File "/home/behave-test/venv/lib/python3.6/site-packages/behave/matchers.py", line 98, in run
          self.func(context, *args, **kwargs)
        File "features/steps/hotdog.py", line 5, in step_impl
          raise NotImplementedError(u'STEP: Given there are 12 hotdogs')
      NotImplementedError: STEP: Given there are 12 hotdogs

    When I eat 5                     # None
    Then there should be 7 remaining # None


Failing scenarios:
  features/hotdog.feature:3  Eat 5 out of 12

0 features passed, 1 failed, 0 skipped
0 scenarios passed, 1 failed, 0 skipped
0 steps passed, 1 failed, 2 skipped, 0 undefined
Took 0m0.000s
```

# 테스트 파일 구현하기

이제 테스트 파일 안의 method 를 구현해 보자.

```python
from behave import *

@given(u'there are {num_hotdog} hotdogs')
def step_impl(context, num_hotdog):
    context.hotdogs = int(num_hotdog)


@when(u'I eat {eaten_hotdog}')
def step_impl(context, eaten_hotdog):
    context.hotdogs -= int(eaten_hotdog)

@then(u'there should be {remaining_hotdog} remaining')
def step_impl(context, remaining_hotdog):
    assert context.hotdogs == int(remaining_hotdog)
```

decorator 에서 숫자를 나타내는 부분을 `num_hotdog` 같은 식으로 파라메터로 치환한 것을 주목해 달라. 이렇게 해 두면, 나중에 숫자만 바꾼 시나리오를 추가해도, 위의 세 개 method 를 재사용할 수 있는 장점이 있다.

그리고 behave 는 [`context` 라는 파라메터를 입력으로 받을 수 있도록](https://behave.readthedocs.io/en/stable/tutorial.html?highlight=eq_#context) 지원한다. 해당 시나리오가 진행되는 동안 유효한 객체이며, 따라서 여기에 원하는 attribute 를 만들어 값을 저장하고 열람할 수 있다. 예제 시나리오에서는, 남은 핫도그 개수를 `context.hotdogs` 로 보관한다.

> 엄밀히 말하면, when 에 해당하는 method 에서 핫도그 개수를 차감하는 부분은 **여기서 구현하면 안 된다**. 실제 업무에 사용하려면, 여기서 **'실제로 구현한 로직' 을** **호출해야** 한다. 그래야 검증을 할 수 있으니 말이다!

---

다시 `behave` 를 실행하면, 이제야 모든 테스트가 통과되었음을 알 수 있다!

```bash
$ behave
Feature: eat hotdogs # features/hotdog.feature:1

  Scenario: Eat 5 out of 12          # features/hotdog.feature:3
    Given there are 12 hotdogs       # features/steps/hotdog.py:3 0.000s
    When I eat 5                     # features/steps/hotdog.py:8 0.000s
    Then there should be 7 remaining # features/steps/hotdog.py:12 0.000s

1 feature passed, 0 failed, 0 skipped
1 scenario passed, 0 failed, 0 skipped
3 steps passed, 0 failed, 0 skipped, 0 undefined
Took 0m0.000s
```

# 숫자만 바꾼 시나리오를 추가하면?

시나리오**만** 추가하더라도 이미 재사용이 가능한 형태로 테스트 method 를 구현했기 때문에, 아래처럼 성공적으로 작동한다.

```bash
$ behave
Feature: eat hotdogs # features/hotdog.feature:1

  Scenario: Eat 5 out of 12          # features/hotdog.feature:3
    Given there are 12 hotdogs       # features/steps/hotdog.py:3 0.000s
    When I eat 5                     # features/steps/hotdog.py:8 0.000s
    Then there should be 7 remaining # features/steps/hotdog.py:12 0.000s

  Scenario: Eat 10 out of 20          # features/hotdog.feature:8
    Given there are 20 hotdogs        # features/steps/hotdog.py:3 0.000s
    When I eat 10                     # features/steps/hotdog.py:8 0.000s
    Then there should be 10 remaining # features/steps/hotdog.py:12 0.000s

1 feature passed, 0 failed, 0 skipped
2 scenarios passed, 0 failed, 0 skipped
6 steps passed, 0 failed, 0 skipped, 0 undefined
Took 0m0.001s
```

# 마치며

이제 이 테스트 케이스를 구현할 때 mock 라이브러리를 통해 mocking 을 하면, 기능 검증을 충분히 할 수 있을 것이다. 시나리오를 추가하는 것은 개발자 뿐만이 아닌 비 개발자나 QA 도 할 수 있어야 하고, 개발자는 그렇게 푸시된 새로운 시나리오를 보고 커버리지를 달성하기 위해 테스트에 좀 더 집중할 수 있을 것이다.

한 가지 맹점은, 기존 시나리오가 바뀌면 테스트 케이스 개발 과정에서 엄청난 고통이 뒤따를 수 있단 것이다. 따라서 (전에도 말했지만) 항상 시나리오는 합의 하에 신중히 추가되어야 한다.

다음 시간에는 golang 으로 똑같은 시나리오를 테스트 해 볼 예정이다.