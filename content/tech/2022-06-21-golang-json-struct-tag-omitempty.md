+++
author = "InterP"
categories = ["Tech"]
date = 2022-06-21T16:19:07Z
description = "'정확히 알고 쓰지 않으면 삽시간에 혼란이 옵니다'"
image = ""
tags = ["golang", "JSON", "omitempty"]
title = "Golang struct tag: omitempty"
url = "/golang-struct-tag/"

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

## omitempty 옵션

오늘 알아볼 것은, 이런 태그 뒤에 붙는 옵션들 중에서 `omitempty` 에 대한 내용이다. 이 옵션은 말 그대로 '비어있는 필드 값은 생략하겠다' 라는 뜻이다.

**결론만 말하면, 이 옵션은 Marshalling 할 때만 효과가 있다.** [Go Playground Link](https://go.dev/play/p/EhzLmox7CYN) 에 아래 예제 코드를 넣어뒀으니, 직접 실행해보고 확인해보는 것을 추천한다.

### 값이 비어있다?

Go 언어의 자료형 기본값이 들어가 있으면 값이 비어 있다고 간주한다. 이 부분은 이전 포스팅인 [Go Tour 문서](/tour-of-go-package-function-variable/)에 더욱 자세한 내용이 들어있다.

* 실수형 = 0
* 문자형 = ""
* boolean 형 = false
* 포인터형 = nil

### Unmarshalling (JSON -> struct)

안 해도 되는데, 일단 의심을 거두기 위해 Unmarshalling 부터 테스트 해보자.  위의 `Employee` struct type 에다가, 다음 JSON String 을 Unmarshalling 해보려고 한다.

```json
{
  "id": 1,
  "name": "John Doe"
}
```

```go
func main() {
    var e Employee
    if err := json.Unmarshal([]byte(jsonString), &e); err != nil {
        panic(err)
    }
    fmt.Printf("[%s]\n", e.Phone)
}
```

그 결과는, 뻔하긴 하지만 대괄호만 나올 것이다. (`[]`) 그럼 여기서 `e.Phone` 에 값이 있었다면 어떻게 될까? 이 "010-" 값은 Unmarshalling 을 해도 그대로 남는다.

```go
    var e Employee
    e.Phone = "010-"
    ...
```

그렇다면, 이번에는 `omitempty` 를 `Employee.Phone` 에 붙이고 위의 두 실험을 해보자. 결과는 같은가? **그렇다.** 값이 없으면 없는대로, 있으면 있는대로 출력된다.

```go
type Employee struct {
    Name  string `json:"name"`
    ID    uint64 `json:"id"`
    Phone string `json:"phone_number,omitempty"`
}
```

### Marshalling (struct -> JSON)

이번에는 저장된 값을 JSON 으로 나눠보자. 우선, `omitempty` 옵션을 다시 빼고, `e.Phone` 에는 아무런 값을 넣어보지 않았다.

```go
func main() {
    var e Employee
    e.Name = "John Doe"
    e.ID = 1
    
	if jsonReturned, err := json.Marshal(e); err != nil {
		panic(err)
	} else {
		fmt.Println(string(jsonReturned))
	}
}
```

    {"name":"John Doe","id":1,"phone_number":""}

`phone_number` 라는 필드가 생겼다. struct 필드 값이 비어 있어도 JSON 에는 필드가 보인다는 것이다.

이걸 방지하기 위해 `omitempty` 가 필요하다. 해당 옵션을 다시 `Employee.Phone` 에 넣고 동일한 코드를 돌려보면 다음과 같이 출력된다.

    {"name":"John Doe","id":1}

## 사소한 문제?

아까 Go 언어 기본값이 들어있는 필드는 JSON encoding package 에서 비어있는 필드로 간주한다는 말을 했었다. 그런데, 이 값들이 유의미한 값이라면 어떻게 해야 할까? 이 때는 `omitempty` 옵션 사용을 자제해야 한다.

예를 들면, 통장 내역을 나타내는 struct type 에서, 잔고를 나타내는 `balance` 필드가 있다고 가정하자. 만약, 이 필드가 정확히 0을 가진다면 이 0이란 숫자는 유효한 숫자다. 그런데 이 필드에 대고 `omitempty` 를 붙이게 되면, 사용자가 반환받을 JSON 문서에 `balance` 자체가 없게 되고 큰 혼란 (?) 이 올 수 있다. 잔고라는 필드는 프로그램에서 필수적으로 있을 것이라 가정하기 때문에 일종의 _AssertionError_ 에 빠질 수 있다는 뜻이다.

Marshalling 할 때 JSON 문서의 다이어트 목적으로 이 옵션을 종종 쓸 텐데, 항상 주의해서 써야 한다는 것으로 끝맺는다.