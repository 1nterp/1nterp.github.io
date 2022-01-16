---
title: bash 에서 따옴표를 쓸 때
author: interp
type: post
date: 2016-12-08T07:59:41+00:00
url: /quote-in-bash/
categories:
  - 프로그래밍
tags:
  - sed
  - shell programming

draft: true
---
bash 쉘 스크립트를 작성할 때, 현재 디렉토리에 있는 파일 중 $1 문자열을 $2 문자열로 치환하라는 명령을 작성했다. 그런데 $1과 $2가 인식이 안 된다. 정확히 말하면 쉘이 '$1' 이라는 문자열을 찾아 '$2' 라는 문자열로 바꾸려고 시도했단 것이다. 이유가 뭘까? 바로 `sed` 명령을 작은 따옴표로 사용했기 때문이다.

우선 방금 이야기한 간단한 스크립트를 보자. 작은 따옴표 안에서 변수를 참조하고 있는데, 잘 안 된 것이다.

<pre class="brush: bash; title: ; notranslate" title="">ag $1 -l | xargs sed -i 's/$1/$2/g' 
</pre>

[Bash Reference 의 작은 따옴표/큰 따옴표 설명][1]을 보면, 다음의 규칙이 존재한다.

  1. 작은 따옴표 안의 모든 문자들은, 문자 그대로의 의미를 지닌다.
  
    즉, **작은 따옴표 안에서는 작은 따옴표를 표현할 수 없다**. 백슬래쉬를 앞에 두고 적어도 안 된다.
  2. 큰 따옴표 안의 대부분 문자들은, 문자 그대로의 의미를 지닌다. 단, 아래의 예외가 존재한다. <ol style="list-style-type: lower-alpha;">
      <li>
        달러($) : 변수 참조를 위해서
      </li>
      <li>
        억음 부호(grave accent, `) : 내부 명령 실행을 하기 위해서
      </li>
      <li>
        따옴표(!) : 명령 히스토리 확장을 위해서
      </li>
      <li>
        백슬래쉬(\) : 특수 문자를 표시하기 위해서 (위의 특수 문자, 따옴표, 기타 문자 리터럴 표현 등등)
      </li>
    </ol>

즉, 단순히 작은 따옴표(single quote)를 큰 따옴표(double quote)로 바꿨다. 명령 줄 안에서도 $가 변수로 인식된다.

<pre class="brush: bash; title: ; notranslate" title="">ag $1 -l | xargs sed -i "s/$1/$2/g"
</pre>

 [1]: http://www.gnu.org/software/bash/manual/bashref.html#Single-Quotes
