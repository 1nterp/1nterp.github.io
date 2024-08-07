---
date: 2024-08-07 09:59:24 +0900
title: Helm Template Value 의 문자열 값 보존하기
description: 특수기호, 홑따옴표, 쌍따옴표까지!
url: /helm-template-value-preserve-string
tags:
- Helm
- yaml
categories:
- Tech
---

Helm Templating 을 하다 보면, 값에 들어가 있는 따옴표를 그대로 보존해야 하는 상황이 발생한다. 다음과 같은 경우엔 어떻게 할 것인가?

```yaml
kind: Secret
spec: 
  data:
    password: {{ .Values.password }}
```
```bash
helm template mychart --set password="my'password"   # 성공
helm template mychart --set password="my\"'password" # YAML parse error
helm template mychart --set password='my"password'   # YAML parse error
```

# `>-` 사용하기
처음으로 할 일은 `spec.data.password` 을 다음과 같이 `>` (angle bracket, greater-than-sign 이라고 부르더라) 와 `-` 의 조합으로 바꾸는 것이다.
```yaml
    password: >-
      {{ .Values.password }}
```

이게 뭔가요? 이건 Helm Template Engine 기술이 아니라 YAML 테크닉의 일종이고, 문자열 보존을 위한 목적도 아니다. [Helm 문서](https://helm.sh/docs/chart_template_guide/yaml_techniques/#folded-multi-line-strings)[^1]를 먼저 보면,

> Sometimes you want to represent a string in your YAML with multiple lines, but want it to be treated as one long line when it is interpreted. This is called "folding". To declare a folded block, use `>`.
> 
> YAML에서 문자열을 여러 줄로 표현하고 싶지만, 하나의 긴 줄로 나타내고 싶을 때가 있습니다. 이것을 "_접기(folding)_"라고 부르죠. 접혀야 할 블록을 선언하려면, `>` 를 사용하세요.

더 정확한 설명을 해 주는 [YAML Multiline 문서](https://yaml-multiline.info/)[^2]를 요약해 보면,

- Block 을 유지하려면 `|`, 한 줄로 접으려면 `>`
- Block 마지막에 줄바꿈을 넣는 것이 기본값, 넣지 않으려면 `-` 를 붙이고, 모든 줄바꿈을 유지하려면 (`|` 일 때만) `+` 를 붙인다.

그래서 `>` 만 사용하면 줄바꿈이 들어간 값을 얻기 때문에, 정확히 우리가 원하는 것은 아니다. `>-` 를 써야 한다.

# 예제 적용하기
앞서 `helm template` 결과는 다음과 같이 나오는데,

```yaml
# helm template mychart --set password="my\"'password"
---
kind: Secret
spec: 
  data:
    password: >-
      my"'password
```
```yaml
# helm template mychart --set password='my"password'
kind: Secret
spec: 
  data:
    password: >-
      my"password
```
```yaml
# helm template mychart --set password="my'password"
kind: Secret
spec: 
  data:
    password: >-
      my'password
```

어? `spec.data.password` 에 여전히 `>-` 가 남아있고, 값 앞에 줄바꿈도 되어 있는데 읽으면 이상한거 아니예요? 그렇지 않다.

[mikefarah/yq](https://github.com/mikefarah/yq/)[^3]을 사용해서 쿼리해 보면 정상적으로 나오는 것을 확인할 수 있다.

```bash
helm template mychart --set password="my\"password" | yq '.spec.data.password' -r
my"password
```
```bash
helm template mychart --set password="my\"'password" | yq '.spec.data.password' -r
my"'password
```
```bash
helm template mychart --set password='my"password' | yq '.spec.data.password' -r
my"password
```

[^1]: https://helm.sh/docs/chart_template_guide/yaml_techniques/#folded-multi-line-strings
[^2]: https://yaml-multiline.info/
[^3]: https://github.com/mikefarah/yq/