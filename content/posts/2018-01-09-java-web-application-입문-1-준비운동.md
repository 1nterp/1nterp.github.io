---
title: Java Web Application 입문 (1) 준비운동
author: interp
type: post
date: 2018-01-09T07:09:07+00:00
url: /java-web-application-입문-1-준비운동/
dsq_thread_id:
  - 6427566974
categories:
  - 프로그래밍
tags:
  - spring
  - maven
  - java

---
### Java?

전통의 APM, Node.js 모두 한 걸음 정도는 자신있게 뗄 수 있는 (?) 수준이라고 생각하지만, 갑작스런 Java Web Application 도전이라니.

**바깥 세상(?) 에선 아직도 Java 개발자를 찾는 것이 현실이다.** 이제 그것을 대비하는 차원이다. Java 하나만 가지고 대부분의 어플리케이션 개발에 비빌 수 있기 때문이기도 하다. (개인적으로, 이런 대중성이 Java 개발자의 가치를 떨어뜨린다고 전혀 생각하지 않는다. Java 개발자는 많지만, 좋은 Java 개발자를 찾는 것은 전혀 다른 문제라고 생각하니까.)

<div style="width: 507px" class="wp-caption aligncenter">
  <a href="http://rhio.tistory.com/215"><img class="size-large" src="http://cfile4.uf.tistory.com/image/236FD636586F7FE911A1FD" width="497" height="393" /></a>
  
  <p class="wp-caption-text">
    이렇게 찾는 것이 현실일지라도, 이건 좋은 개발자를 프로젝트에 태우는 방법이 아니다. (출처 : Rhio.Kim's Blog)
  </p>


### 입문서 구입

단순히 'Spring 기반으로 웹 어플리케이션을 만들어요' 라는 말만 듣고 Spring 입문서! 를 찾아 헤매기 시작했다. 두 권이 있었는데, 하나는 [초보 웹 개발자를 위한 스프링 4 프로그래밍 입문][1] 이었고, 다른 하나는 [토비의 스프링 3.1][2] 이었다. Spring 에 관해선 줏어들은 게 전부여서, 개념부터 다지고 들어가야 했기에 두꺼운 세트를 뒤로하고 입문책을 먼저 구입하게 되었다. <del>하지만 이것도 결코 얇지 않다</del>.

### Tomcat?

환경 설정부터 흠, 제대로 짚고 가야 할 것이 생겼다. [Apache Tomcat][3] 을 설정해야 한단다. 어릴 적에도 APM 만 죽어라 팠기 때문에, PHP는 익숙해도 JSP는 쓸 일이 거의 없었다. 톰캣은 그 때 마주했던 고양이 아이콘(?) 정도로만 알고 있었는데,  알아보니 Java Web Application WAS 에서는 가장 많이 쓰이는 것이라더라. 이참에 친해질 필요가 있겠다.

### Maven?

저자는 책 전반에 걸쳐 Maven Project 를 쓸 것이라 한다. Eclipse Project 도 같이 제공한다는 말로 봐선, 비슷한 개념일까? [Apache Maven][4] 을 간단하게 이해해보려 했더니, Node.js 의 npm, Ruby의 gem 같은 건가? 싶었는데, 오히려 아니란다. 이 그림 한방으로 어떤 포지션에 있는지 이해할 수 있었다.

<div style="width: 561px" class="wp-caption aligncenter">
  <a href="https://karussell.wordpress.com/2009/09/29/evolution-of-build-systems/"><img class="size-large" src="https://i.stack.imgur.com/xgubJ.png" width="551" height="500" /></a>
  
  <p class="wp-caption-text">
    make를 조상님으로 두는 maven
  </p>


make의 Java 버전이 ant 인데, 여기서 Dependency Management 와 Declarative Form 을 갖추면서 Report/Documentation 까지 지원하는 프로젝트 관리 도구인 것이다.

참고로, 아래 Spring Project 에는 Maven 외에도 Gradle 을 제공한다. (그림에서도 Finalist? 라고 뜨지만) [Gradle 에서 Maven 을 비교한 화면][5]을 보면 Performance 하나만으로 잘 광고하고 있는 걸 볼 수 있다.

Ant, Maven, Gradle 을 비교한 글 역시 굉장히 많다. 이 주제는 아무것도 모르면서 더 깊게 내려가지 말고, 조금 정착이 된 다음에 따로 정리해서 포스팅하는 것이 좋겠다.

### Spring?

가장 중요한 걸 놓치고 갈 뻔 했다. Spring 은 Spring Framework 를 줄여서 말하기도 하고 Spring 모든 프로젝트를 통틀어 말하기도 한다. (프로젝트 관련해서는 [여기][6]를 그냥 참고하고 넘어간다.) Java 오픈 소스 프로젝트이며, 애플리케이션 개발에 대한 프레임워크이다. 다시 말하면, Spring Framework 는 웹 개발을 위한 것이 아니다. 웹 개발을 위한 프로젝트를 제공하는 프레임워크인 셈이며, 다른 영역의 개발을 위한 프로젝트도 있다고 하더라. 그런 건 천천히 알아봐도 좋겠다. (익숙해지면, Spring Data를 개인적으로 따로 보고 싶다.)

본격적으로 실습하고 정리할 것을 다음 포스팅에서 이어 쓰도록 하겠다. (그런데 MEAN 가계부 프로젝트도 소스 단장해서 GitHub에 올리면서 포스팅 해야 하는데.. 힘내자!)

 [1]: http://www.yes24.com/24/goods/16927038?scode=032&OzSrank=3
 [2]: http://www.yes24.com/24/goods/7516911?scode=032&OzSrank=1
 [3]: https://tomcat.apache.org
 [4]: https://maven.apache.org/
 [5]: https://gradle.org/maven-vs-gradle/
 [6]: https://spring.io/projects