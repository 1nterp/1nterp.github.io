---
title: Confluence Code Macro 빠르게 넣기
author: interp
type: post
date: 2017-02-02T08:33:43+00:00
url: /confluence-code-macro-빠르게-넣기/
dsq_thread_id:
  - 5612722950
categories:
  - 개발환경
tags:
  - Confluence

draft: true
---
Code Macro를 자동완성으로 입력하는 방법은 쉽다. 중괄호({)를 시작으로 `{code` 까지 치면 자동완성 제안이 뜨기 때문이다. 그런데 이 Code block은 Java 문법을 하이라이팅하기 때문에, 다른 언어를 하이라이팅하려면 다음과 같이 해야 된다.

  1. 마우스로 박스를 클릭
  2. Edit 클릭
  3. Language에 언어를 선택하고 Save 클릭

이 얼마나 귀찮은 작업인가. 그냥 키보드로 치고 싶다면?

<img class="aligncenter size-full wp-image-860" src="http://interp.iwinv.net/wp-content/uploads/2017/02/optimised.gif" alt="" width="736" height="192" />

위 애니메이션처럼 `{code:<language>}` 입력을 하면 된다. (애니메이션 예제는 SQL이다.) 콜론을 찍으면서 자동 완성이 사라지는데 당황하지 말고 전부 입력하면 된다. 원래는 `{code:language=<language>}` 같이 입력하도록 Confluence 매뉴얼에서 안내하고 있는데, 매크로의 맨 처음 파라메터는 그 attribute를 생략해도 인식되기 때문에 이게 가능하다.

&nbsp;
