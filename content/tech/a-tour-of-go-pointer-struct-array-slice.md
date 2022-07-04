+++
author = "InterP"
categories = ["Tech"]
date = 2022-07-03T17:06:37Z
description = ""
draft = true
image = ""
tags = ["golang", "tutorial", "programming"]
title = "A tour of Go: Pointer, Struct, Array, Slice"
url = "/tour-of-go-pointer-struct-array-slice/"

+++
Go 여행 세 번째 시간이다. [지난 시간](https://interp.blog/tour-of-go-flow-control-stmts/)에는 flow control statement 에 대해서 알아봤다. 이번에는 Go 언어의 다양한 자료형에 대해 정리해 봤다.

## A tour of Go

* English: [https://go.dev/tour/](https://go.dev/tour/ "https://go.dev/tour/")
* 한국어판: [https://go-tour-ko.appspot.com/](https://go-tour-ko.appspot.com/ "https://go-tour-ko.appspot.com/")

## Pointer

* C/C++ 처럼, golang 에도 포인터가 있다.
* NULL 표현은 `nil` 이다.
* 그 외엔.. 뭐 C pointer 쓰는 거랑 별로 다를게 없다.

```go
    func main() {
    	i, j := 42, 2701
    
    	p := &i         // point to i
    	fmt.Println(*p) // read i through the pointer = 42
    	*p = 21         // set i through the pointer
    	fmt.Println(i)  // see the new value of i = 21
    
    	p = &j         // point to j
    	*p = *p / 37   // divide j through the pointer
    	fmt.Println(j) // see the new value of j = 73
    }
```

## Struct

C 의 struct 와 동일한, field 들의 모음이다.

C 였다면 `typedef type struct Vertex { ... } Vertex;` 이라고 typedef 를 곁들여야 하지만, 여기서는 `type` 만 써도 된다. 사실상 `type` 하나가 위의 `typedef ...` 전체를 모두 커버한다.

* `var [변수명] [타입]` 처럼 `type [타입명] struct` 인 것을 잘 기억해 두자.
* struct 형 변수를 초기화할 때는 `{ }` 로 써야 한다.
* 각 field 는 `.` 을 사용해서 참조할 수 있다.

```go
    type Vertex struct {
    	X int
    	Y int
    }
    
    func main() {
    	fmt.Println(Vertex{1, 2}) // {1, 2} 라고 표시된다.
    }
```

### Struct Pointer

원래 C 같았으면 struct pointer 변수에서 특정 필드를 참조하려면 `(*p).X` 이런 식으로, 포인터의 struct 값을 dereference 한 다음에 참조하거나, `p->X` 같은 식으로 '포인터 변수' 라는 걸 나타내서 참조하는데.. 여기서는 둘 다 귀찮으니까 `p` 가 struct pointer 라도 `p.X` 로 참조가 가능하게 했다.

    func main() {
    	v := Vertex{1, 2}
    	p := &v
    	p.X = 1e9 // 이렇게만 참조하고 값까지 할당하는데, 아무런 문제가 없다.
    	fmt.Println(v) // {1000000000 2}
    }

### Struct Literals

Struct 형 변수 초기화할 때 취할 수 있는 방법을 소개한다.

* 보통 unnamed list 를 할 것이다. `Vertex{1,2}` 처럼...
* named list 도 가능한데, `[field name]:` 으로 쓴다. function 의 default parameter 와는 달리, 여기선 순서는 상관없다.
* 값을 넣지 않으면, 각 필드의 기본값이 들어간다. (여기서는 int 니까 0)

  var (
  v1 = Vertex{1, 2}  // has type Vertex
  v2 = Vertex{X: 1}  // Y:0 is implicit
  v3 = Vertex{}      // X:0 and Y:0
  p  = &Vertex{1, 2} // has type *Vertex
  )

  func main() {
  fmt.Println(v1, v2, v3, p) // {12} {1 0} {0 0} &{1 2}
  }

## Array

Slice 와는 달리, 사이즈가 고정된다.

* C 처럼 length 가 뒤에 오지 않고, 앞에 온다.
* 출력하면 struct 와는 달리 꺽쇠 `[ ]` 로 출력된다.
* **하지만 literal 선언은 (slice 와 마찬가지로) `{ }` 안에서 원소를 나열해야 한다.**

```go
    var a [10]int
```

## Slice

Array 에서 length number 만 지우면, slice 가 된다.

```go
    var a []int
```

* array 또는 slice 에서 index range 를 지정할 수 있는데, C array index 를 생각해도 헷갈릴 수 있는 부분이다.
  * 수학적으로 정확한 range 표현은 `[n:m)` 이다. 마지막 인덱스에 해당하는 원소는 **포함이 안 된다**.

```go
    func main() {
    	primes := [6]int{2, 3, 5, 7, 11, 13}
    
    	var s []int = primes[1:4] // 3, 5, 7, 11 인가?
    	fmt.Println(s) // [3 5 7] 만 출력된다.
    }
```

* Slice 는 단독으로 쓰이기도 하지만, 보통은 array 의 특정 구간을 나타내기 위해서도 쓰인다. 주의할 점은, Slice 가 바뀌면 연결된 array 도 같이 바뀐다는 것이다 (...)

```go
    func main() {
    	names := [4]string{ // 어.. 비틀즈 성님덜?
    		"John",
    		"Paul",
    		"George",
    		"Ringo",
    	}
    	fmt.Println(names)
    
    	a := names[0:2] // [John Paul]
    	b := names[1:3] // [Paul George]
    	fmt.Println(a, b)
    
    	b[0] = "XXX" // 아니 왜 폴 메카트니 성님을 지워여;;
    	fmt.Println(a, b) // 폴의 이름이 다 바뀌어 있음.
    	fmt.Println(names) // 그리고 원래 array 에도 영향이..
    }
```

* `[n:m]` 으로 구간을 나눌 때 양쪽 end 를 생략할 수도 있고, 둘 다 생략할 수도 있다.
  * 왼쪽 생략 = 0
  * 오른쪽 생략 = 끝까지
  * 양쪽 생략 = 그냥 그 array/slice 전체 (...)
* slice 안에 당연히 struct 를 쓸 수 있다. 그래서 이런 괴상망측한 하지만 자주 보게 될 선언도 있다.

```go
    // 이런게 가능합니다...
    //
    //  이렇게 typed value 를 바로 선언하는 걸 literal 이라고 하는데, 
    //  slice 건 struct 건 간에 literal 은 [] 가 아니라 {} 로 해야 한다.
    
    s := []struct {
    		i int
    		b bool
    	}{
    		{2, true},
    		{3, false},
    		{5, true}
    	}
```

* slice 는 length `len()` 과 와 capacity `cap()` 을 지원한다.
  * `len()` : 실제 원소들의 개수
  * `cap()` : 하위 array 의 개수 (array 는 fixed-width 라고 했다)
    * 이게 언제 필요하냐면, slicing 할 수 있는 길이를 가늠할 때 (만약 cap 이 6인데 `[:7]` 이렇게 쓰면 에러가 나버린다.
    * 중요한 건, underlying array 에서, slice 의 first element 가 가리키는 위치 부터 끝까지의 길이이다 (끝 인덱스는 상관없는게 또 헷갈린다..)

```go
    func main() {
    	s := []int{2, 3, 5, 7, 11, 13}
    	printSlice(s)
    
    	// Slice the slice to give it zero length.
    	s = s[:0] // 끝이 지정되어 있지 않으니 cap 은 6임. length 는 당연히 0이고.
    	printSlice(s)
    
    	// Extend its length.
    	s = s[:5] // 0~4 까지니까 length 는 5이고, 역시 끝이 지정되어 있지 않아서 cap 은 6임.
    	printSlice(s)
    
    	// Drop its first two values.
    	s = s[2:] // 마지막 slice 를 또 slicing 하지만, '처음 array' 에서 2번째 element 부터의 array 길이가 cap 이므로
                // 5,7,11,13 -> 4임. ㄱ- 
                // 그런데 또 length 는 '마지막 slice' 에서의 2번째부터니까 5,7,11 만 있어서 3임 (...)
    	printSlice(s)
    }
```

* slice 에 아무 값도 없으면, 그 값은 `nil` 과 같다.

```go
    func main() {
    	var s []int
    	fmt.Println(s, len(s), cap(s))
    	if s == nil {
    		fmt.Println("nil!")
    	}
    }
```

* `make()` 로 slice 를 만들 수 있다. 직접 값을 입력하는게 아니라, 변수를 통해 slice 를 선언할 수 있다는 차이가 있다.
  * length, capacity 를 별도로 입력할 수 있는 정도?
  * length 가 0이면 비어 있는데, 그걸 잘라내면 0이 채워진다?? ㄱ-

```go
    func main() {
    	b := make([]int, 0, 5)
    	printSlice("b", b)
    
    	c := b[:2]
    	printSlice("c", c)
    
    	d := c[2:5]
    	printSlice("d", d)
    }
    /*
    b len=0 cap=5 []
    c len=2 cap=5 [0 0]
    d len=3 cap=3 [0 0 0]
    */
```

* slice 안에 slice 를 담을 수 있음. 이러면 2차원 배열이 됨. 이 때는 `[][]string` 처럼 slice type 앞에 slice 를 쓰겠다고 선언하면 됨. (**2차원 배열이 된다**)
  * 그리고 각 원소도 slice literal 임을 명시해야 한다.
* 아래는 2차원 배열 예제 프로그램인데, 주목할 건 for 문이 1개만 쓰였단 거다.
  * 대신 `strings.Join()` 을 써서 내부 원소 (`board[i]`) 를 String 으로 만들어 출력했다는 점..

```go
    func main() {
    	// Create a tic-tac-toe board.
    	board := [][]string{
    		[]string{"_", "_", "_"},
    		[]string{"_", "_", "_"},
    		[]string{"_", "_", "_"},
    	}
    
    	// The players take turns.
    	board[0][0] = "X"
    	board[2][2] = "O"
    	board[1][2] = "X"
    	board[1][0] = "O"
    	board[0][2] = "X"
    
    	for i := 0; i < len(board); i++ {
    		fmt.Printf("%s\\n", strings.Join(board[i], " "))
    	}
    }
```

* 익히 알겠지만, slice 는 `append()` 가 가능하다. 첫 번째 파라메터는 소스 slice, 나머지는 쭉 원소(들) 을/를 입력하면 된다.
  * 그럼 cap 은 어떻게 되나요? 직접 실험해보자 (...)

```go
    func main() {
    	var s []int
    	printSlice(s)
    
    	// append works on nil slices.
    	s = append(s, 0)
    	printSlice(s)
    
    	// The slice grows as needed.
    	s = append(s, 1)
    	printSlice(s)
    
    	// We can add more than one element at a time.
    	s = append(s, 2, 3, 4) // 여기서 재밌는 건 cap 이 5가 아니라 6이 된다는 거다.
    	printSlice(s)
    }
    
    /*
    len=0 cap=0 []
    len=1 cap=1 [0]
    len=2 cap=2 [0 1]
    len=5 cap=6 [0 1 2 3 4]
    */
```

마지막 줄이 왜 cap 이 6이 되는지는, go blog 에 있는 [Slices-intro](https://go.dev/blog/slices-intro) 를 살펴보자. 특히 ‘**Growing slices (the copy and append functions)**’ 처음에 make 하는 부분을 보면 된다.

* Slice 에서의 for 는 `for each` 같은 구문을 사용할 수 있다.
  * `range [slice]` 로 initialize 를 하게 되는데, 리턴되는 게 2개다. 인덱스와 실제 값.
  * ※ 인덱스를 안 쓰게 되면 (어차피 compile 에서 에러를 내겠지만) `_` 처리해야 한다.
  * value 를 안 쓰려면, value 자리를 `_` 로 감싸도 되지만, 단순히 인덱스’만’ 받아도 된다.
    * 인덱스만 받아서 슬라이스를 인덱스+1 로 참조할 용도로 쓰는.. 뭐 그런?

```go
    for idx, value := range slice_var { .. }
    // 인덱스만 쓰고 싶으면
    for idx := range slice_var { .. }
```