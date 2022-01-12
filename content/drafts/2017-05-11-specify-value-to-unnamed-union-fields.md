---
title: Specifying value to unnamed union fields
author: interp
type: post
date: 2017-05-11T01:30:36+00:00
url: /specify-value-to-unnamed-union-fields/
dsq_thread_id:
  - 5805742928
categories:
  - 프로그래밍
tags:
  - c
  - union

draft: true
---
구조체 내부에, 이름없는 union 타입의 필드에 값을 지정할 때 조심해야 할 점이 있다.

<pre class="brush: cpp; title: ; notranslate" title="">typedef struct testStruct {
  int mID;
  union {
    int mIntVal;
    float mFPVal;
  };
} testStruct;

int main(void) {
  testStruct testArray[] =
  {
    {1, .mIntVal = 3},
    {2, .mFPVal = 7.7},
  };

  return 0;
}
</pre>

(확인해 본 건 두 버전 뿐이지만) `gcc v4.7` 에서는 성공적으로 컴파일이 된다. 그러나 `gcc v4.4` 에서는 아래와 같이 에러가 발생한다!

<pre class="brush: bash; title: ; notranslate" title="">$ gcc -o 1.out 1.c
1.c: In function ‘main’:
1.c:12: error: unknown field ‘mIntVal’ specified in initializer
1.c:13: error: unknown field ‘mFPVal’ specified in initializer
</pre>

에러를 없애는 방법은, 내부 union을 향하는 것이라고 명시를 해 주는 수밖에 없다. 즉, union 필드에 값을 지정할 때는 중괄호로 한번 더 감싸주면 된다.

<pre class="brush: cpp; title: ; notranslate" title="">int main(void) {
  testStruct testArray[] =
  {
    {1, {.mIntVal = 3}},
    {2, {.mFPVal = 7.7}},
  };

  return 0;
}
</pre>
