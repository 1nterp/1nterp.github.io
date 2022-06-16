---
author: InterP
date: 2022-06-16T10:26:18+0900
tags:
- golang
- tutorial
- programming
title: 'A tour of Go: Package, Function, Variable'
url: "/tour-of-go-flow-control-stmts/"
categories:
- Tech
image: ''

---
A tour of Go 시리즈를 두 번씩 돌아보고, 나름 배운 것들을 연이어 적어보려 한다. 첫 번째로 패키지, 변수, 함수 정의와 사용에 대한 내용이다. 이 문서는 번역이 아니라서, 개인적으로 중요했던 부분만 있을 수도 있고 투어 예제에서 다루지 않은 부분이 섞여있을 수 있으니 편하게 봐주셨으면 한다. ~~화면 안 넘기고 스크롤만으로 볼 수 있다는 장점 정도?~~

## A tour of Go

Go 언어의 튜토리얼 페이지라고 보면 된다. 다양한 언어로 번역되어 있으니 영어 원문으로 봐도 좋고 한국어판으로 봐도 좋다.

* English: [https://go.dev/tour/](https://go.dev/tour/ "https://go.dev/tour/")
* 한국어판: [https://go-tour-ko.appspot.com/](https://go-tour-ko.appspot.com/ "https://go-tour-ko.appspot.com/")

## Package

모든 `*.go` 파일의 첫 줄에는, 이 파일이 속한 '패키지' 이름을 작성한다. `main.go` 는 이렇게 패키지 이름이 지정될 것이다.

```go
package main
```

다음 줄에는, 이 파일에서 사용할 다른 패키지들을 작성할 수 있다. 이렇게 각각 패키지 이름과 함께 `import` 를 해도 되지만,

```go
// separated
import "fmt"
import "math"
```

이렇게 뭉쳐서 선언하는게 보통이다.

```go
// factored (better)
import (
	"fmt"
	"math"
)
```

## Function declaration

다양한 방식으로 함수 시그니처를 선언할 수 있다.

```go
// 기본적인 형태. return type 까지 적어야 함.
func add(x int, y int) int { .. }

// input 타입이 다 같으면 이렇게 typing 을 몰아서 할 수도 있음 (가독성은 좀 떨어짐)
func add(x, y int) int { .. }     

// return 도 여러 개 가능함.
func swap(x, y string) (string, string) { .. }

// return 에 변수명을 입력해도 됨. 이 때는 변수명이 함수 내부에서 사용되고, naked return 으로 리턴함 ('return' 만 씀) 
// << 가독성이 심하게 떨어지므로 짧은 함수일 때만 쓰는걸 추천함.
func split(sum int) (x, y int) { .. }
```

## Variable declaration

변수 또한 다양한 방식으로 선언이 가능한데, 크게 두 가지 방법으로 할 수 있다.

* `var` 키워드를 통한 선언
* `:=` 를 사용해 선언+할당 동시에 하기

```go
var c, python, java bool // 여러 변수가 전부 같은 타입이면 이렇게 변수명 리스트와 마지막 타입 한 번만 적어서 정의해도 됨.
                         // 이건 패키지 레벨, 즉, 다른 함수도 c, python, java 를 모두 접근할 수 있다.

func main() {
	var i int  // 순서는 var [변수명] [타입] 이다. 이건 함수 레벨이다.
	fmt.Println(i, c, python, java)
}
```

변수 선언과 함께 값을 할당하는 initializer 방법도 다양하다.

```go
var i, j int = 1, 2 // 지정된 타입에 맞춰 넣는다. 여러 개를 이렇게 동시에 넣어도 된다. (이 경우에 j = "str" 하면 에러 난다)
var c, python, java = true, false, "no!" // 타입 지정이 되어 있지 않아도, 값에 따라 개별로 설정된다. 앞부터 bool, bool, string 이 된다.

// 이렇게 factored 방식으로 지정할 수도 있고, 가독성 역시 좋아진다~
var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1 // bit-wise operator 조심
)
```

`:=` 도 알아보자. 단, 이 방법은 전역 변수 (=패키지 레벨 변수) 에서는 사용이 불가능하다. 이 때는 `var` 로만 선언이 가능하다.

```go
func blahblah() {
	k := 3 // var k = 3 과 같다. var == : 라는 뜻.
	c, python, java := true, false, "no!"
	...
}
```

## Exported variable/function

첫 문자가 **대문자**인 함수나 전역 변수 이름은, `패키지 이름.이름` 형식으로 다른 패키지에서 참조가 가능하다. 아래와 같이 쓰고 `custommath_pi.go` 라고 저장했다고 하면, `custommath.hiddenPi` 로는 참조가 안 되고 `custommath.Pi()` 는 참조가 가능하다.

```go
package custommath

var hiddenPi float64

func Pi() float64 { ... }
```

주목할 부분은,

* 파일 이름이 아니라 패키지 이름으로 참조한다는 것이다.
* 다른 말로, 같은 패키지 안이기만 하면, 다른 파일에서도 모든 변수/함수 참조가 가능하다는 것이다. (같은 패키지에서 중복된 변수/함수 이름은 허용되지 않는 이유..)

## Variable types, default values

    bool
    string
    int  int8  int16  int32  int64
    uint uint8 uint16 uint32 uint64 uintptr
    byte // alias for uint8
    rune // alias for int32
         // represents a Unicode code point
    float32 float64
    complex64 complex128 // 복소수임.. e.g. 3+2i

* C/C++ 개발자들에겐 `uintptr`, `rune`, `complex` 타입이 좀 생소할 수 있다. 주석으로 설명해 뒀으니 이해해주면 좋겠다.
* `int`, `uint`, `uintptr` 은 물론, 32-bit system 에서는 4바이트, 64-bit system 에서는 8바이트이다.

이제 각 타입의 기본값을 알아보자.

* 정수/실수형은 전부 **0** (float 역시 0.0 이 아니라 0)
* boolean 은 **false**
* string 은 **“”** (empty) (formatting 에서 주목할 부분은 `%q` 로 하면 quota 가 붙는다는 거다 (...))
* 포인터형은 전부 **nil**

## Variable type-casting

Go 언어에서 type casting 은 _type conversion_ 이라고 불린다. 그냥 캐스팅 하듯 type 을 앞에 쓰고 괄호로 감싸면 형변환이 된다.

```go
i := 42
f := float64(i)
u := uint(f)
s := string(i)
```

다른 대부분의 언어에서는 암묵적 캐스팅이 가능한데, Go 언어는 이 부분에서 엄격하다. 따라서 이 구문은 안 된다.

```go
var i int = 1
var f float64 = i // i 가 int 여서 안 됨. 1.0 으로 들어가지 않음
```

## Constant

`const` 키워드를 쓰면 된다.

```go
const Pi = 3.14

func main() {
	const world = "세계"
}
```

다음의 특징을 가진다.

* 패키지 레벨, 함수 레벨 둘 다 가능하다.
* `var` 이나 `:=` 로 선언할 수 없다. 이 말은, **별도의 타입 선언을 하지 않고** 상수 값과 함께 선언한다.
* 별도 타입 선언이 안 되므로, 정수형 상수 (numeric constant) 를 넣을 때는 내부적으로 필요한 type 을 (마음대로) 결정한다. 예를 들어,

  ```go
  const Big = 1 << 100
  ```

  이렇게 선언하면 Big 은 `int` 형이 아니라 `float64` 쯤 될 것이다. 이 말은 `Big` 을 int 처럼 쓰려고 들면 type conversion error 를 만날 수 있다는 것이다.