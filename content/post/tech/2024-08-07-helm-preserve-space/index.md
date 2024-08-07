---
date: 2024-08-08 21:57:01 +0900
title: Helm Template 공백 유지하는 방법
description: "{{- 가 도대체 뭘 의미하는 걸까?"
url: /helm-template-preserve-space
tags:
- Helm
- yaml
categories:
- Tech
---

[지난 포스팅]({{< relref "2024-08-06-helm-minus/index.md" >}}) 에 이어, 오늘은 Template 내부에 생성되는 공백을 유지하는 방법을 알아보자. 사실 이 부분 역시 [Helm 문서](https://helm.sh/docs/chart_template_guide/control_structures/#controlling-whitespace)에 나와있는 내용을 요약한 것이다.

# 준비
```bash
helm create tempchart
rm -rf tempchart/charts tempchart/templates/* tempchart/values.yaml

cat <<EOF > tempchart/templates/test.yaml
data:
  drink: {{ .Values.drink }}
  {{ if eq .Values.drink "coffee" }}
  mug: "true"
  {{ end }}
EOF
```

이렇게 만든 `test.yaml` 파일을 보면, `.Values.drink` 값이 `coffee` 일 때에는 추가로 `data.mug` attribute 를 `true` 로 추가한다.

```yaml
data:
  drink: {{ .Values.drink }}
  {{ if eq .Values.drink "coffee" }}
  mug: "true"
  {{ end }}
```

# 공백이 그대로 남아요!
drink 가 coffee 가 아닌 경우라면, 아래와 같이 `data.drink` 만 가지는 yaml 파일이 생성된다.
```bash
helm template tempchart --set drink="tea"
```

```yaml
---
# Source: tempchart/templates/test.yaml
data:
  drink: tea
```

coffee 로 설정하면 `data.mug` attribute 가 추가될텐데..
```bash
helm template tempchart --set drink="coffee"
```
뭔가 이상하다. 저 공백은 무엇인가?
```yaml
---
# Source: tempchart/templates/test.yaml
data:
  drink: coffee
  
  mug: "true"
```

# 해결방법
[Helm 문서](https://helm.sh/docs/chart_template_guide/control_structures/#controlling-whitespace)의 설명은 다음과 같다.

> First, the curly brace syntax of template declarations can be modified with special characters to tell the template engine to chomp whitespace. {{- (with the dash and space added) indicates that whitespace should be chomped left, while -}} means whitespace to the right should be consumed. Be careful! Newlines are whitespace!
> 
> 먼저, 템플릿 선언의 중괄호 (`{` 와 `}`) 구문은 특수 문자를 사용하여 템플릿 엔진에 공백을 제거하도록 지시할 수 있습니다. `{{-` (대시와 공백이 추가된 경우) 는 왼쪽의 공백을 제거해 달라는 것이고, `-}}` 는 오른쪽의 공백을 제거해 달라는 것을 의미합니다. **주의하세요! 줄 바꿈도 공백입니다!**

따라서 이 줄바꿈을 제거하기 위해 `{{-` 를 사용하면 된다. 
```yaml
data:
  drink: {{ .Values.drink }}
  {{- if eq .Values.drink "coffee" }}
  mug: "true"
  {{- end }}
```

양쪽에 다 사용하면 안 된다. 이렇게 에러가 발생한다.
```yaml
Error: YAML parse error on tempchart/templates/test.yaml: error converting YAML to JSON: yaml: line 2: mapping values are not allowed in this context

Use --debug flag to render out invalid YAML
```