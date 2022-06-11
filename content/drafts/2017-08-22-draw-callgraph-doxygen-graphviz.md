---
title: Call Graph, C macro, else?
author: interp
type: post
date: 2017-08-22T04:20:35+00:00
draft: true
private: true
url: /draw-callgraph-doxygen-graphviz/
categories:
  - 미분류

---
### Doxygen / Graphviz

코드를 숲으로 보는 가장 편리한 방법은 Call Graph를 그리는 방법이다. 우분투에서 그대로 뽑아보려고 해서, 어쩔 수 없이 다음을 통해 Doxygen 을 실행시켰다.

```bash
sudo apt install doxygen doxygen-gui graphviz
doxywizard
```

이후에는 파일 포맷이나 Graph 타입 (이 때 Graphviz 를 사용한 Graph가 필요한 것), 기타 자세한 정보를 추가로 체크해서 export 하면 된다. 출력된 HTML을 통해 하나씩 따라갈 수 있겠다.

  * 소스코드를 바로 볼 수 있어야 따라가기 편하다.
  
    그렇지 않으면 소스코드 편집기 창과 HTML 창을 동시에 띄워야 해서 불편하다.
  * static, private method 를 모두 뽑도록 해야 한다. 숨겨진 부분에 대해 추적이 안 되면 역시..
  * 가능하면 언어는 '**한국어 (Korean)**' 으로 해야 익숙해서 덜 불편하다.

더 필요한 내용이 있다면 [여기][1]를 참고한다.

#### 로깅에 필요한 매크로

[여기][2]에 assert() 에 대한 작동 방식이 잘 설명되어 있는데, 개인적으로도 assert() 는 코드 접근에 필요한 조건을 산정하는 중요한 코드라고 생각한다. 아무튼, 이 함수의 내부에서 다음의 매크로를 사용하는데, 다행히도 설명이 포함되어 있었다.

> 
>   __FILE__ 매크로는 <b>컴파일시에 파일명을 나타내는 문자열 리터럴</b>로 치환되고 __LINE__ 은 <b>소스 코드 라인번호</b>로 치환됩니다. 그리고, __func_ 는 <b>매크로가 아니라 </b><span style="text-decoration: underline;"><b>컴파일러에 의해 자동으로 선언되는 변수</b></span><b>로서 함수명을 나타내는 문자열</b>을 가리키게 됩니다. __FILE__ 은 문자열 리터럴이고, __LINE__ 은 정수 리터럴이고, __func__ 는 자동으로 정의되는 변수라는 점에 주의해야 합니다. __func__ 와 비슷한 역할을 하는 녀석이 __FUNCTION__ 이라는 녀석입니다.</p> 
>   
>   <p>
>     출처: <a href="http://yesarang.tistory.com/74">http://yesarang.tistory.com/74</a> [김윤수의 이상계를 꿈꾸며] </blockquote> 
>     
>     <p>
>       __func__ 은 __FUNCTION__ 과 헷갈릴 수 있지만, FUNCTION은 컴파일러 벤더들의 확장 매크로, func는 C99 표준 (이지만 컴파일러가 지원을 안 하면 말짱 꽝)인 찬구들이라고 한다. 이 글이 07년도에 작성되어서 다시 체크해 봐야겠지만.. 아무튼 내가 들여다보고 있는 소스에는 func 이 사용되고 있다.
>     </p>
>     
>     <p>
>       코드 내부를 좀 이야기하자면, sqlite3의 모든 함수 인터페이스 호출부에 대한 Trace를 하기 위해서 내부 함수를 만들고, 위에서 언급한 매크로를 인자로 받아 호출할 수 있도록 그 wrapper를 만들어 둔 것이다.
>     </p>

 [1]: http://5on7.blogspot.kr/2016/01/08-01.html
 [2]: http://yesarang.tistory.com/74