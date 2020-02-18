---
title: nodejs, express
author: interp
type: post
date: 2020-02-01T23:36:21+00:00
draft: true
private: true
url: /nodejs-express/
categories:
  - 미분류

---
### node.js?

발을 조금이라도 담그고 있는 사람들에게 이게 어떤 건지 좀 설명해달라고 했다. Javscript를 가지고 Web Server-side Programming 을 할 수 있는 플랫폼이라고 한다. 그럼 아파치랑 뭐가 다르냐, 했더니 다음의 몇 가지 이유를 들었다.

  * Javascript는 프론트 엔드의 언어였다. 이렇게 하면 웹 개발자의 운신의 폭이 서버로 뻗치는데 좀 더 유연할 수 있다. (개인적인 의견에 그쳤지만, 나름 수긍이 갔다)
  * Non-blocking I/O, 단일 쓰레드지만 이벤트 루프로 인한 처리로 빠른 응답이 가능하다. (이건 본래 Javscript의 언어 성격이 그렇기 때문에 따라오는 장점일 수 있다.)
  * 플랫폼 안에 웹 서비스 엔진이 내장되어 있다. 즉, 서비스 설정에 좀 더 유연하다.
  * Node Package Manager (npm) 의 강력함이 뒷받침된다.

내가 생각하기엔 두 번째 이유까지는 충분히 타협이 가능한, 뭐랄까 굳이 이걸 써야하나? 싶을 정도의 이유였다면&#8230; 나머지 두 개는 그만의 장점이라고 생각한다. 사실 마지막 것이 넘나 강력해서 다른 걸 제쳐두고라도 배울 수 밖에 없게 만드는 것이 있다.(이쪽 방면으로는 초보긴 하지만) 흔히들 APM 이라고 하는 Apache+PHP 조합으로 RESTFul API를 제공하는 것보다는 node.js를 사용하는 것이 훨씬 쉬워 보인다.

### MySQL 연동

PHP로 MySQL 쿼리를 돌려 봤다면 어렵지 않다. `INSERT INTO ... SET ...` 으로 시작하는 MySQL 만의 SET Variable 이 조금 생소했지만, 일단 따라서 했다. 정 마음에 안 들면 모든 Column 값을 대입하는 방법도 있었겠지만.

### Express & body-parser

`req.body` 를 얻으려 했는데 얻어오질 않으니 이게 대체! 그래서 봤더니 Express 에서 Body-parser 를 쓰란다. 이렇게 말이다. (extended : true는 왜 하는거지?)

<pre class="brush: jscript; title: ; notranslate" title="">var app &amp;amp;amp;nbsp; &amp;amp;amp;nbsp; &amp;amp;amp;nbsp; &amp;amp;amp;nbsp;= express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
</pre>

### 요구사항 분석

이제는 프론트에서 원하는 API를 하나씩 생각해 보자.

  * 전체 목록 표시
  * FILTER 
      * 특정 카테고리 표시
      * 특정 기간 표시 (주별, 월별, 년별)
      * 특정 카드 표시
      * 수입/지출만 표시
  * GROUP 
      * 위의 특정~ 을 눌렀을 때, 해당 총액 계산
  * SORT 
      * 날짜별 정렬
      * 금액별 정렬
  * INSERT
  * EDIT 
      * 포커스 아웃될 때 마다 UPDATE
      * 또는 EDIT 버튼을 두기 (위의 방향이 좀 더 나아보이지만 트래픽은 더 많이 들 것)
  * DELETE 
      * 버튼으로 삭제하기

### Stack을 찾아서

  * node.js
  * AngularJS (TypeScript을 배워야 하나 심각하게 고민 중)
  * Bootstrap

말단은 뭘 써야 잘 썼다고 소문이 날까? 간단한 것이었으면 좋겠다.

[여기][1]를 보면, `contenteditable` 이란 속성을 통해 테이블 안의 값을 바꿀 수 있다. 그런데 엔터를 치면 multi-line 이 되므로 Key Binding을 이벤트로 처리해야 한다. [여기][2]를 참고해 보자.

### End Prototyping

내가 아는 게 Bootstrap 뿐이라서, 이걸로 Prototyping 할 수 있는 툴이 있는지 찾아봤다. 역시나 [찾아보니][3] 참 많았는데 그 중에서 [Pingendo][4]가 무료인 데다 가장 간단해 보여서 다운로드를 받았다. 확실히 딱 원하는 기능만 있어서 좋긴 했는데, 테이블의 경우 bulk edit를 내가 아직 찾지 못한 것 같다. 좀 더 찾아봐야겠다.

### 외부 로그인 연동

[네이버 로그인 연동][5]을 지원하면 될 것 같다.

### Heroku

node.js 로 구현했으니 이걸 올려둬야 된다. [Heroku 에서 Free Hosting 을 하니까][6], 엄청 작은 프로젝트니까 여기 올려두고 써도 문제가 없겠다.

### AngularJS

  * 이제 슬슬 봐야하는데, 일단 [이 튜토리얼][7]을 보고 개념을 잡자.
  * AngularJS를 가지고 테이블 정렬을 하는 예제는 역시 많이 깔려있다. [그 중 하나][8]를 봐봤더니, `ng-repeat`의 파이프라인 속성으로 `orderBy` 기능이 제공된다더라. 짱이다. 
      * 이 내용은 위의 개념 문서의 2.9 (Filter) 로 나타나 있다. 즉, `orderBy`는 필터.
      * `currency` 나 `date` 같이 가계부에 필요한 필터도 있으니 꼭 참고하자.
      * 여기선 bootstrap이 아니라 bootswatch라는 친구를 사용하는데.. 뭐 관심이 있으면 보도록 하자.
  * 

### 머무르기/나가기

당장 이 글쓰기 페이지를 저장 없이 나가려고 해도 다음의 프롬프트가 뜬다. _&#8216;진짜 나갈래? 아님 머무를래?&#8217;_ 이걸 하는 이벤트는 [onbeforeunload][9] 이다.

### RESTFul API

GET/POST 쯤이야 알겠는데 나머지는 헷갈리기도 하고 &#8216;특정 값 갱신은 어떤 Method를 써야되나요?&#8217; 라는 궁금증도 있었는데, [잘 정리된 포스팅][10]으로 해결이 가능했다.

  * 조회 : GET
  * 입력 : POST
  * 수정 : PATCH (PUT은 전체를 바꾸는 것, PATCH는 일부를 바꾸는 것)
  * 삭제 : DELETE

덧붙여서, 무작정 ajax를 사용하는 것이 항상 좋지만은 않은 점을 들었다. 해당 URI를 친구에게 복사해서 줘도 그 내용이 서로 다를 가능성이 매우 높다는 것이다. 완전 일리가 있긴 하지만, 당장 내 프로젝트에 걸림돌은 되지 않기 때문에 상식 선에서 알고만 있자.

### Angular? Angular 2?

AngularJS를 사용하면 항상 따라오는 꼬리. &#8216;여러분이 사용하는 건 구버전이예요, 새버전 v2를 써보시는 건 어때요?&#8217; 아니 그런데 문법 체계가 완전히 다르다! 알아보니 Angular 2라는 건 따로 없고, AngularJS에서의 Front-end Framework를 확장한 Framework라는 느낌. 그러니까 발전이 아니라 진화의 느낌이 든다. 역으로 이야기하면, 당장 내가 이렇게 덩치가 커진 Framework 를 익힐 필요가 있을까 하는 것. AngularJS에 먼저 익숙해 진 다음에 해도 늦지 않을 뿐더러, 지금 프로젝트엔 적용하기 너무 크다. (사실 뭐가 있는지도 모르고 말이다!)

### React.js 가 더 빠르대요!

어어&#8230; 튜토리얼 이걸로 다 했는데 ㄱ-; 어차피 View 부분은 나중에 교체할 수도 있으니까 일단 AngularJS로 한 다음에 시간 나면 바꿔보는 게 어떻겠나?

 [1]: https://www.w3schools.com/tags/att_global_contenteditable.asp
 [2]: http://stackoverflow.com/questions/18552336/prevent-contenteditable-adding-div-on-enter-chrome
 [3]: https://bootstrapbay.com/blog/bootstrap-editors/
 [4]: http://www.pingendo.com/
 [5]: https://developers.naver.com/docs/login/web/
 [6]: https://www.heroku.com/
 [7]: http://adrianmejia.com/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/
 [8]: https://scotch.io/tutorials/sort-and-filter-a-table-using-angular
 [9]: http://jhgan.tistory.com/27
 [10]: https://spoqa.github.io/2012/02/27/rest-introduction.html