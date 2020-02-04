---
title: parameter/variable notation of function
author: interp
type: post
date: 2016-12-26T13:51:20+00:00
draft: true
private: true
url: /parametervariable-notation-function/
dsq_thread_id:
  - 5615642486
categories:
  - 미분류

---
<span style="color: #ff0000;"><strong>주의! 이 글은 비공개입니다</strong></span>.

아래 수식에서 세미콜론은 무엇이고 바(Bar, |) 는 무엇인가. [여기][1]서 설명을 참고했다.


<img src="//s0.wp.com/latex.php?latex=P%28x%7C%5Ctheta%29&#038;bg=ffffff&#038;fg=000&#038;s=0" alt="P(x|&#92;theta)" title="P(x|&#92;theta)" class="latex" /> 

세미콜론이거나 바가 있거나, 모두 그 다음 변수들이 파라메터(parameter) 로 인식된다. 함수에서 관심이 있는 것은 바로 그 앞의 변수 즉 함수 변수(variable) 가 된다. 그런데 세미콜론, 바 사이에는 미묘한 차이가 있단다. [여기][2]를 참고하면, 세미콜론 뒤의 파라메터가 랜덤 변수인 경우, 세미콜론 대신 바를 사용하는 게 &#8216;보통&#8217; 이라고 한다. 파라메터라는 의미는 동일하겠지만, 바가 의미하는 것이  <img class="mathtex-equation-editor" src="http://chart.apis.google.com/chart?cht=tx&chl=%5Cmathcal%20P%20(%5Ctheta%7CX)" alt="\mathcal P (\theta|X)" align="absmiddle" />처럼 conditional 을 의미하는 데서 차이가 있다. 어떤 사람은 &#8216;바는 통계에서 많이 쓰고 세미콜론은 수학에서 많이 써요&#8217; 라고 하던데&#8230; 그것보단 이게 더 설득력이 있다.

 [1]: http://math.stackexchange.com/questions/322366/ideas-for-denoting-parameters-of-a-function-as-opposed-to-variables-in-the-lis
 [2]: http://stats.stackexchange.com/questions/68150/probability-notation-question