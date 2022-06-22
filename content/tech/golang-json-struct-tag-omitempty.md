+++
author = "InterP"
categories = ["Tech"]
date = 2022-06-21T16:19:07Z
description = ""
draft = true
image = ""
tags = ["golang", "JSON", "omitempty"]
title = "Golang JSON struct tag: `omitempty`"
url = "/golang-json-struct-tag/"

+++
## 태그?

Go 언어의 `struct` 타입에는 각 필드마다 태그를 붙일 수 있다. (struct tag 라고도 불린다) 이렇게 아무렇게나 태그를 붙여둘 수 있다. 물론 다른 함수나 패키지에서 이런 태그를 파싱해서 다룰 수 있어야 하겠지만.
```go
type Employee struct {
	Name  string `mandatory`
    ID    uint64 `mandatory`
    Phone string `optional`
}
```
`encoding/json` 은 `json` 으로 시작하는 태그를 지원하는데, 아래와 같이 흔히들 볼 수 있는 것들이다.
```go
type Employee struct {
	Name  string `json:"name"`
    ID    uint64 `json:"id"`
    Phone string `json:"phone_number"`
}
```
이 태그를 가지고 있으면, `json.Marshal()` 을 할 때 구조체 필드 값을 자동으로 JSON 문서로 변환해준다. 또는 `json.Unmarshal()` 을 통해, 입력된 JSON 문서 바이트 배열을 해당 구조체의 각 필드에 맞춰 알아서 변환해 준다.

## `omitempty`
오늘 알아볼 것은, 이런 태그 뒤에 붙는 옵션들 중에서 `omitempty` 에 대한 내용이다. 이 옵션은 말 그대로 '비어있는 필드 값은 생략하겠다' 라는 뜻이다. 



