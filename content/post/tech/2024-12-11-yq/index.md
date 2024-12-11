---
title: "yq: YAML Parser"
description: "JSON에 jq가 있다면 YAML에는?"
url: "/yq-yaml-parser"
tag: ["yq", "YAML", "CLI", "tool"]
---

**yq**는 `jq` 에서 쓸 수 있는 jsonpath 를 YAML 파일에 구사할 수 있는 CLI 도구이다. 여기서 소개하는 yq 는 [mikefarah/yq](https://github.com/mikefarah/yq) 를 뜻한다.

이 글에서는 yq의 설치 방법과 기본적인 사용법을 간단히 살펴본다.

# yq 설치 방법

## Homebrew로 설치 (macOS/Linux)
Homebrew를 사용하면 yq를 간단히 설치할 수 있다. 터미널에서 아래 명령어를 입력하면 된다.

```bash
brew install yq
```

설치가 끝난 뒤에는 `yq --version` 명령어로 설치 여부를 확인할 수 있다.

## 기타 설치 방법
Homebrew 외에도 yq는 여러 가지 방법으로 설치할 수 있다. 운영 체제와 환경에 맞는 방법을 선택하면 된다.

- [공식 다운로드 링크](https://github.com/mikefarah/yq/releases/latest): 바이너리를 직접 다운로드해서 설치
- Snap 패키지 (Linux): `snap install yq`
- Windows: Chocolatey 또는 Scoop으로 설치

더 자세한 설치 방법은 [공식 문서](https://mikefarah.gitbook.io/yq)에서 확인할 수 있다.

# yq의 주요 기능

yq는 YAML 데이터를 쉽게 관리할 수 있는 다양한 기능을 제공한다.

## YAML 읽기

YAML 파일에서 특정 데이터를 읽는 것은 아주 간단하다.

```bash
yq '.person.name' file.yaml
```

위 명령어는 `file.yaml` 파일에서 `person` 아래 `name` 값을 출력한다.

## YAML 수정

YAML 데이터를 업데이트할 수도 있다. `-i` 옵션을 사용하면 파일을 직접 수정할 수 있다.

```bash
yq -i '.person.name = "인터피"' file.yaml
```

## JSON과 YAML 간 변환

yq는 JSON과 YAML을 손쉽게 변환할 수 있다.

```bash
yq -Poy sample.json
```

이 명령어는 `sample.json` 파일을 YAML 형식으로 변환한다.

## 4. 여러 파일 병합

여러 YAML 파일을 병합하는 것도 가능하다.

```bash
yq -n 'load("file1.yaml") * load("file2.yaml")'
```

## 5. 환경 변수 사용

환경 변수를 활용할 때는 `strenv()` 를 사용해야 한다. `$...` 는 먹지 않으므로 주의. 아래 예제는 환경변수 `$NAME` 을 가지고 YAML 데이터를 업데이트한다.

```
bash
NAME="인터피"
yq -i '.person.name = strenv(NAME)' file.yaml
```

# yq 의 장점

1. **다양한 형식 지원**: YAML뿐만 아니라 JSON, XML, CSV 등도 다룰 수 있다.
2. **유연한 구문**: `jq` 에서 쓸 수 있는 jsonpath syntax 로 간단히 작업할 수 있다.
3. **데이터 보존**: YAML 의 주석과 포맷을 유지하면서 데이터를 수정할 수 있다.
4. **개발자 친화적**: CI/CD 파이프라인에도 쉽게 통합할 수 있다.

# 공식 문서와 커뮤니티

yq에 대해 더 알고 싶다면 공식 문서를 확인해 보자. 명령어 사용법과 고급 기능에 대한 예제가 잘 정리되어 있다.

- **[공식 문서](https://mikefarah.gitbook.io/yq)**
- **GitHub Repository**: [mikefarah/yq](https://github.com/mikefarah/yq)


