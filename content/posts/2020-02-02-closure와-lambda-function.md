---
title: Closure와 Lambda Function
author: interp
type: post
date: 2020-02-02T12:59:09+00:00
draft: true
private: true
url: /closure와-lambda-function/
categories:
  - 미분류

---
## Closure

<p style="text-align: justify;">
  Python에서 사용되는 Clousure 기능을 알아보자. (Design Pattern 으로도 사용된다) 함수 안에서 함수를 정의한 다음, 해당 함수를 반환할 수 있다. 그러면 반환 받은 변수는 함수 변수가 된다. 이 때, 중첩된 함수에서 바깥 함수의 변수를 참조할 수 있게 된다. 반대로 이야기하면 바깥 함수에서 받은 인자 값이 중첩된 함수에 붙어버리게 된다. 이를 Closure Design Pattern 이라고 부른다. (기능이 아니다!)
</p>

<p style="text-align: justify;">
  인자 값을 보이지 않게 하기 위한 방식으로 사용되며, 보통은 이런 경우 Class를 사용하지만 Closure가 더 유연하게 작동한다. 물론 인자 값 (Class로 따지면 private member 변수)이 2개 이상이 되거나 그걸 참조하는 함수가 여러 개가 된다면 Class를 쓰는 것이 훨씬 이득이다.
</p>

### Javascript

<p style="text-align: justify;">
  <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures">이 포스트</a>에서는 <span style="text-decoration: underline;"><em>중첩된 함수 자체</em></span>를 Closure라고 칭한다. 보통, 바깥 함수에서 선언된 인자/지역 변수는 바깥 함수가 호출되는 동안에만 유효한 값을 가진다. 그런데 바깥 함수에서 반환한 Closure에서, (사라졌다고 생각하는) 인자/지역 변수를 참조할 수 있다.
</p>

### C#

<p style="text-align: justify;">
  <a href="http://www.csharpstudy.com/DevNote/Article/26">이 포스트</a>를 참고했다. C#의 무명 메서드나 람다식이 그것을 정의하고 있는 메서드의 (Outer 파라미터를 포함한) 지역 변수를 사용하고 있을 때, 그 무명 메서드 혹은 람다식을 Closure라 부른다. (이 때, 정의하고 있는 메서드 자체는 Outer Method라고 부른다) 무명 메서드는 delegate 키워드로 Method Body를 정의한 뒤 Action Class 인스턴스로 지정 가능하며, 이걸 Outer Method에서 반환하면 똑같다. 중요한 건, Outer Method의 지역 변수/인자를 사용하지 않으면 해당 반환 함수 식은 Closure가 아니다!
</p>

## Lambda Function

### Python

<div>
  Python에서는, lambda 키워드와 콜론으로 인자/바디를 구별해 정의한다. <a href="https://wikidocs.net/64">참고자료</a>
</div>

<pre class="brush: python; title: ; notranslate" title="">lambda &lt;argument_comma_list&gt;: &lt;body&gt;
# (e.g.) 호출할 때
(lambda x,y: x+y)(10,20)
# (e.g.) 함수 인자로 넣을 때
filter(lambda x:x &lt; 10, range(10))
</pre>

### C#

<p style="text-align: justify;">
  <a href="https://msdn.microsoft.com/ko-kr/library/bb397687.aspx">이 포스트</a>를 참고했다. C# 에서는 delegator 인스턴스에 집어넣거나 expression tree를 만들 때 사용할 수 있다. 특별한 키워드 없이 인자/바디 사이에 => 키워드만 사용하면 된다.
</p>

<pre class="brush: csharp; title: ; notranslate" title="">/* 대리자에 람다 식 넣기 */
del sDelegator = x =&gt; x * x; // 제곱
/* 연산식 트리에 람다 식 넣기 */
Expression&lt;del&gt; myET = x =&gt; x * x;
</pre>

### Javascript

<p style="text-align: justify;">
  Javascript는 람다 식과 똑같은 Arrow Function 기능이 있다. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions">이 포스트</a>를 참고했다. C#의 문법과 유사하지만, 인자를 괄호로 감싸고 바디 부분을 중괄호로 감싸야 한다. 바디 부분이 단일 연산이라면 괄호로 묶지 않아도 된다. (반대로 C#도 바디가 여러 연산 줄로 이뤄지면 중괄호가 필요하다) ※ 모질라 페이지에는 Rest Parameter, default parameter, destructuring 등등이 있다. (저게 다 뭐야 ㄷㄷ)
</p>

<pre class="brush: jscript; title: ; notranslate" title="">( &lt;param_comma_list&gt; ) =&gt; { &lt;body&gt; }
</pre>