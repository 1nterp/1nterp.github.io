+++
author = "InterP"
categories = ["Tech"]
date = 2022-06-20T02:36:25Z
description = "if-else, for, switch, defer 대해 정리해 봤다."
image = ""
tags = ["golang", "tutorial", "programming"]
title = "A tour of Go: Flow control statements"
url = "/tour-of-go-flow-control-stmts/"

+++
[지난 시간](https://interp.blog/tour-of-go-package-function-variable/)에 이어서, 여기서는 Flow Control Statement 에 대해 정리해 보았다.

## A tour of Go

* English: [https://go.dev/tour/](https://go.dev/tour/ "https://go.dev/tour/")
* 한국어판: [https://go-tour-ko.appspot.com/](https://go-tour-ko.appspot.com/ "https://go-tour-ko.appspot.com/")

## If, else

조건문은 다른 프로그래밍 언어와 마찬가지로 `if`, `else` 그리고 `else if` 의 조합으로 구성된다. 조건 절 (condition clause) 에 있는 수식을 검증 (evaluation 이라고도 한다) 한 결과가 참이면 해당 블록이 수행된다.
```golang
a := 1
if a == 1 {
  // ...
}

if funcTrue() {
  // ...
}
```

여러 개의 수식들을 넣어도 되고, 마지막 수식이 boolean 으로 검증되거나 반환되어야 한다. 수식 간에는 세미콜론(`;`)으로 구분한다. 이 부분에서 가장 널리 쓰이는 패턴이 바로 `error` 객체가 반환되었는지 검증하는 구문이다.
```golang
if err := funcTest(); err != nil {
  // error handling with `err` object
}
```
참고로 저기 `err` 는 조건 블록 안에서만 사용할 수 있다. 바깥에서는 참조할 수 없고, 대신 다른 `else if` 나 `else` 블록에서는 참조가 가능하다.
```go
if a := getInt(testStr); a == 0 {
	// ok
} else if a == 1 {
	// ok
} else {
	// ok
}
fmt.Print(a) // error
```
심지어는 `else if` 에서 선언된 변수가 있는데 `if` 에서 쓸 수 있을까? 된다! hoisting 해서 쓴다. 이 쯤 생각해보니, **if block 전체에 선언된 변수들에 대해 evaluation 을 먼저 하는 것으로 보인다**. 
```go
func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	} else {
		fmt.Printf("%g >= %g\n", v, lim) // 여기선 가능
	}
	return lim // 여기서 v 를 참조할 수 없다.
}
```
performance 를 중요시한다면 필요한 변수는 inner-block 에서 선언해 쓰는게 좋을 거 같긴 한데.. 아직 언어에 대해 잘 모르겠으니 참고만 하자.

{{< adsense1 >}}

## For
### basic for
다른 프로그래밍 늘 그렇듯, `init; condition; post` 로 이루어져 있다. init 에는 마치 지역 변수 선언과 같은 모양을 한다 (bash 를 떠올리면 된다) 그리고 여타 다른 언어와 달리 (C, Java, ...) 괄호가 없다는 점을 주목하자. 그러나 반드시 브라켓 `{ }` 은 필요하다.
```go
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
```
### Continued for
init 과 post 은 optional 이다. 이게 비어 있으면 condition 만 남아 while 과 같은 기능을 한다.
```
	sum := 0
	for ; sum < 10; {
	// for sum < 10 { // 둘 중 아무거나 써도 똑같다. 
	                  // 그리고 위 처럼 쓴 뒤 go fmt 를 돌리면 세미콜론이 알아서 빠진다.
		sum += sum
	}
```
리스트나 맵을 순회할 때도 continued for 의 일종이라고 보면 된다. 이 때는 `range` 를 사용한다.
```go
var myMap map[string]string
myMap = make(map[string]string)
// ...
for myKey, myValue := range myMap {
	// ...
}
```

## While
다른 말로, **golang 은 while 이 없다**... 대신 `for` 만 적으면 된다.
```go
for {
	// ...
}
```

## Switch
C/C++, Java 의 switch 라고 생각하면 된다. 차이점은,
- C 처럼 단일 값 (e.g. int, character) 이 아니라 **string 도 사용이 가능**하고
- `case` 에 **variable 을 넣어도** 된다.
- 각 case 마다 break 를 다 집어넣지 않아도 된다.
```go
func main() {
	fmt.Print("Go runs on ")
	var darwin_os = "darwin" // 이걸 타겟으로 써도.. 된다고?

	switch os := runtime.GOOS; os {
	case darwin_os: // ㅇㅇ 되네
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		fmt.Printf("%s.\n", os)
	}
}
```
참고로 `case:` 만 쓰면 `case True:` 와 같은 의미가 된다.

위의 차이점을 생각해보면, 마치 기다란 `if-else` 를 `switch` 로 치환할 수 있을 것 처럼 보이지만 사실 두 가지 제약을 고려해서 선택해야 한다.
1. 가독성 문제를 고려해야 한다.
2. if 안에서 변수 선언/할당이 가능하지만, case 에서는 변수 선언이 안 된다.

## defer
이 키워드로 시작하는 구문은 **해당 함수가 끝날 때 까지 실행이 유예된다**. 이 키워드는 블록에 종속된 개념이 아니라 *함수에 종속*된 개념이다. 따라서, 어느 inner block 에서 쓰이건 간에 이 구문을 지난다면, 함수가 끝날 때에야 구문이 수행된다.

`defer` 뒤에 오는 구문은 **반드시 함수 호출이어야 한다**. 변수 선언이거나 변수 값 할당같은 식은 안 된다. (`+=` 도 안 됨) 

재미있는 건, `defer` 줄을 만나는 시점에 argument 값이 결정된다. 이후에 argument 로 들어간 variable 이 바뀌더라도, `defer` 의 실제 수행 시점에서는 영향이 없는 것을 아래 코드로 확인할 수 있다.
```go
func main() {
	var abc = "hello"
  // 아래 세 줄을 브라켓으로 감싸 블록으로 만든다 한 들, 결과는 동일함 (함수 레벨이기 때문)
	abc += " world"
	defer fmt.Println(abc) // 뒤에 느낌표는 여기서 평가가 안 되지만, 출력은 마지막에 된다.
	abc += " !!"

	fmt.Println(abc) // 여기서는 전부 출력된다.
}
/*
hello world !!
hello world
*/
```
`defer` 를 하나의 함수 안에서 여러 개 선언할 수 있다. 실행 순서는 LIFO, 즉 먼저 들어간 수식이 나중에 실행된다.
```go
	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}
	// 맞춰보자. 0이 먼저 나올까 9가 먼저 나올까?
```