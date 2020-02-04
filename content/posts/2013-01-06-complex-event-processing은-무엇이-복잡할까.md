---
title: Complex Event Processing은 무엇이 ‘복잡할까’?
author: interp
type: post
date: 2013-01-06T06:58:48+00:00
draft: true
private: true
url: /complex-event-processing은-무엇이-복잡할까/
categories:
  - 용어
tags:
  - CEP
  - event
  - Processing
  - 어원

---
# Event, Event Processing

<p style="text-align: justify;">
  세상에서 일어나는 수 많은 일들이나 현상을 이벤트(Event)라고 합니다. 아침에 알람이 울리는 것도 이벤트요, 밤이 되자 가로등이 켜지는 것도 이벤트입니다. 주가가 내려가는 것도 이벤트고, 내가 살 물건이 오늘 세일 하는 것도 이벤트입니다. 그런데&nbsp;잘 보세요. 이벤트를 발생시키는 원인이 분명 존재합니다. 어제 알람을 설정했기 때문에, 가로등 주변 광량이 현저히 낮아졌기 때문에, 누군가 주식을 다량 매도했기 때문에, 슈퍼마켓 아저씨가 세일을 결정했기 때문입니다. 이벤트는 이벤트를 생성하게 됩니다. 연쇄적인 것이죠.&nbsp;재미있는 사실은, 하나의 이벤트가 발생하는데 여러 이벤트가 원인이 되는 경우가 더욱 많다는 것입니다.&nbsp;
</p>

<p style="text-align: justify;">
  소프트웨어에서 말하는 &#8216;세상의&nbsp;이벤트&#8217;의 정의는 단순한 &#8216;사건&#8217;이 아닌 &#8216;상태의 현격한 변화&#8217; 또는 &#8216;연속적인 상태를 나타내는 데이터&#8217;까지 모두 아우릅니다.&nbsp;물건 A의 값이 어제까지 100원으로 동결되다가 오늘 갑자기 200원으로 급등했다면, 이 역시 이벤트입니다. 혼동하지 말아야 할 것은, 여기서 언급되는 이벤트는 컴퓨팅에서 사용되는 용어가 아니라는 점입니다. 개념은 비슷할지 모르지만, 컴퓨팅에서의 이벤트는 흡사 &#8216;자극&#8217;과 같은 것입니다. 외부의 신호로 내부가 작동되기 때문이라 그런 겁니다. 신경 세포 간의&nbsp;시냅스전달 같은.
</p>

<p style="text-align: justify;">
  아무튼, 소프트웨어 개발자들은 이런 &#8216;이벤트&#8217;에 주목하기 시작했습니다. 이벤트 기반 아키텍쳐(Event-driven Architecture, EDA)가 대표적입니다. 고객의 요구사항을 &#8216;이벤트의 흐름&#8217;으로 풀어내는 소프트웨어 아키텍쳐의 한 패턴입니다.&nbsp;이벤트 프로세싱(Event processing)이라고,&nbsp;이런 이벤트 기반 아키텍쳐에 사용될 수 있는 중요한 기법도 있습니다.&nbsp;이벤트 프로세싱은, 다양한 이벤트 원인들로부터 어떤 이벤트를 발생시켜야 효과적인지 판단할 수 있도록 고객을 도와주게 됩니다. 즉, 입력도 이벤트이며 출력도 이벤트입니다.
</p>

# Complex Event Processing

<p style="text-align: justify;">
  요즘에는&nbsp;Event processing 대신에, Complex Event Processing(CEP) 이라는 용어가 사용되고 있습니다. Event processing과 무슨 차이가 있을 것 같지만 사실은 그렇지 않습니다. 그렇다고 해서,&nbsp;인과관계가 결여된 단순한 용어의 진화로 받아들이기엔 앞에 달린 Complex가 왜 있는지 의문을 제기할 수 밖에 없습니다. 여기에는,&nbsp;학계의 몇분들이 제기한 서로의 주장이 엇갈려버린&nbsp;이야기가 깔려있습니다. 그만큼 어떤 개념의 명명(命名, Naming)은 궁극적으로 개념의 핵심을 표현해야 하므로 어려운 작업이란 것을 방증하는 것입니다.
</p>

<p style="text-align: justify;">
  Event processing 외에도, 많은 용어가 중구난방으로 혼용되고 있었습니다. ESP(Event Stream Processing)도 있었고, CEP도 사용되고 있었습니다. 문제는 각 용어가 지칭하는 Event Processing의 소분류 간의 경계가 명확하지도 않고, 서로 바꿔 사용해도 무리가 없을거라는 인식이 더욱 강해지고 있다는 것이었습니다. CEP도 연속적인 데이터들을 처리해야 하고, 그러자면 이 &#8216;연속적인 데이터&#8217;를 스트림으로 볼 수 있습니다. 그러면 곧 CEP는 ESP가 됩니다.
</p>

<p style="text-align: justify;">
  ESP 용어를 처음 알린 사람은 Mark Palmer (StreamBase CEO)이고, CEP를 처음 사용한 사람은 David Luckham (Stanford Univ.&nbsp;교수)입니다. 이 두명은&nbsp;Event Processing Symposium의 초기 설립자인데, 나머지 두 명은 Opher Etzion (IBM 수석 연구원, Event Processing in Action의 저자)과 Roy Schulte (前&nbsp;Gartner 사장, 애널리스트이자 Event Processing의 저자) 입니다. 후술한 두 명은 이 개념을 모두 Event Processing 이라는 대주제로 묶어 설명할 수 있다고 생각했습니다.
</p>

<p style="text-align: justify;">
  그러던 차에, David Luckham이 CEP를 옹호하는 글[footnote]http://www.ebizq.net/topics/cep/features/5580.html[/footnote]을&nbsp;썼었습니다. 제목은 &#8216;CEP에&nbsp;두려움을 갖고 있다는&nbsp;것(Taking the Fear out of Complex Event Processing&#8217;인데, 세상에서 일어나는 이벤트는 복잡하니까 &#8216;복잡한&#8217;이라는 의미를 담은 CEP를 써야한다는 주장입니다.
</p>

<blockquote class="tx-quote-tistory">
  <p style="text-align: justify;">
    내가 이야기했던 사람들 중 몇몇은, CEP의 complex 란 단어를&nbsp;듣고 지레 겁을 먹는다.&nbsp;(중략) 기본적인 것부터 물어보자, 삶이 단순한가? 대다수의 사람들에게 이 질문을 던지면 돌아오는 대답은 당연히 아니라고 할 것이다.&nbsp;우리 삶에서의&nbsp;이벤트는&nbsp;일어나는 방법도, 우리에게 영향을 끼치는 것들도 모두 단순하지가 않다.
  </p>
  
  <p style="text-align: justify;">
    Some people, I told, get scared when they hear the word complex, as in complex event processing.&nbsp;(omit) Start with the basic question, is life simple? Most people when asked about it will truthfully answer no. Events happen in life that are neither simple in how they happen, nor in the effects they have.
  </p>
</blockquote>

여기에 반하는 글도 눈에 띕니다. Opher Etzion의 블로그 &#8216;Event Processing Thinking&#8217; 에서 바로 위의 글을 언급하면서 반박하는 구절이 담긴 포스팅[footnote]http://epthinking.blogspot.kr/2008/01/why-i-prefer-to-use-event-processing.html[/footnote]이 있는데요. 그 외에도 Event Processing의 이름에 관한 많은 고찰이 담겨있는 포스팅이라서, 수 많은 용어를 구분해서 이해하는데&nbsp;큰 도움이 되었습니다.

<blockquote class="tx-quote-tistory">
  <p style="text-align: justify;">
    David Luckham은 그의 유명한 책을 통해 CEP라는 용어를 소개했다. &#8216;CEP&#8217; 라는 용어는&nbsp;모호한 의미를 지니고 있다.&nbsp;이벤트를 복잡하게 처리하는 것인지, 아니면 복잡한 이벤트를 처리해주는 것인지 말이다. 복잡한 이벤트라 함은, 단일 이벤트가 아닌 다수의 이벤트 즉, 복잡한 오브젝트를 말하는 것이다. 이벤트를 복잡하게 처리한다면, CEP와 EP는 사실 같으며, EP에 들어있는 모든 개념은 CEP의 하위 개념이 된다. 복잡한 이벤트를 처리한다면, EP는 이벤트 처리방식의 집합체이며, CEP가 EP에 속해있다고 봐야 한다.
  </p>
  
  <p style="text-align: justify;">
    David Luckham used the term &#8220;complex event processing&#8221; in his famous book that used the term. The term &#8220;complex event processing&#8221; has ambigious meaning &#8211; one interpretation is that this is processing of complex events, where complex event is an event that consists of more than one event (analog to complex object), the other interpretation is that this is complex processing of events. (omit)&nbsp;Interpretation one (&#8220;the monolithic approach&#8221;) : CEP = EP, everything is a subset of CEP. Interpreation two (&#8220;the layered approach&#8221;) : EP is a collection of technologies, whereas CEP is one of them.
  </p>
</blockquote>

<p style="text-align: justify;">
  이 포스팅에서, Roy Schulte는 후자의 개념으로 CEP를 생각했습니다. 즉, SEP(Simple Event Processing) 같은 것도 EDA에서 사용될 수 있는&nbsp;개념이라고 생각했습니다. 이벤트의 성격에 따라 그 기법을 지칭하는 용어 역시 달라져야 한다는 것이죠.&nbsp;비슷한 개념으로, BEP(Business EP)라는 개념도 있습니다. 철저히 비지니스 이벤트에 대한 프로세싱을 할 수 있는 기법으로, IBM에서 처음&nbsp;사용했습니다.
</p>

# 마치며

<p style="text-align: justify;">
  CEP를 듣게 되면 &#8216;뭐가 복잡해서 그러는 걸까&#8217; 라고 생각했고, 그 궁금증을 풀어보려고 이리저리 찾아 읽었습니다. 용어는 일종의 &#8216;합의&#8217;가 있으면 그 의미를 깊게 파고들지 않아도 통용될 수 있습니다만, 처음 듣는 사람에게 개념을 명확하게 설명해주기란 쉽지가 않죠. 그런 면에서 이 글이 작은 도움이 되었으면 좋겠습니다.
</p>