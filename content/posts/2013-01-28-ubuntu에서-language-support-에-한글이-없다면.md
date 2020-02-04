---
title: Ubuntu에서 Language Support 에 한글이 없다면
author: interp
type: post
date: 2013-01-28T15:53:09+00:00
draft: true
private: true
url: /ubuntu에서-language-support-에-한글이-없다면/
categories:
  - 미분류
tags:
  - 12.10
  - 언어 지원
  - 우분투
  - 한국어

---
<p style="text-align: justify;">
  사무실이 아닌 집에도 공부할&nbsp;환경(?)을 좀 꾸려야겠다 싶어서, 프로젝터를 떠받칠&nbsp;삼각대가 할 일을 대신하고 있던 먼지쌓인 컴퓨터에다가 우분투 12.10을 깔았습니다. 글로벌한 인재가 되어야지, 그러려면 영어를 해야 한다며&nbsp;영어로 설치를 시작했지만..&nbsp;그 다짐 5분도 가지 않았습니다.&nbsp;이내 포기하고 한글 언어팩을 깔기로 했는데, 아니? Language Support에 뭔가 요상한 문제가 있어보입니다. 분명히 나는 Install/Remove Languages.. 에서 Korean을 선택하고 설치했는데 지원 언어에 &#8216;한국어&#8217; 라고 뜨질 않습니다.&nbsp;
</p>

<p style="text-align: justify;">
  수소문 한 끝에, 다음의 방법을 찾을 수 있었습니다.
</p></p> 

<p style="text-align: justify;">
  1. 설정 &#8211; 소프트웨어 소스 (System Configuration &#8211; Software Sources) 에서 &#8216;다운로드 위치&#8217;를 한국 서버로 교체합니다. 정 찜찜하면 &#8216;기타&#8230;&#8217;를 선택한 후 &#8216;가장 가까운 놈으로 골라달라&#8217; 를 선택하셔도 됩니다.<br />2. 터미널을 열어 $ apt-cache search language-pack | grep ko 를 칩니다.&nbsp;<br />3. 5개가 나오는데 모조리 깝시다. 까는 방법은 그냥 sudo apt-get install ~~ 로 깝니다.<br />4. 로그오프를 합니다. 다시 로그온해서 Language Support 를 가 보면 한국어가 뙇!
</p></p></p>