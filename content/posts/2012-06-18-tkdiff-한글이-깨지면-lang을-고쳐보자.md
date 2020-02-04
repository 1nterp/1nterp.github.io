---
title: tkdiff 한글이 깨지면 LANG을 고쳐보자.
author: interp
type: post
date: 2012-06-18T05:34:15+00:00
draft: true
private: true
url: /tkdiff-한글이-깨지면-lang을-고쳐보자/
categories:
  - 미분류
tags:
  - 우분투
  - tkdiff

---
<p style="text-align: justify; ">
  tkdiff를 사용해서 SVN 저장소와 로컬 파일을 비교하려고 하는데, 한글이 깨져 보이는 경우는 LANG 환경변수와 비교하는 두 파일의 문자셋(charset)이 달라서 생기는 문제입니다. 요즘은 UTF-8로 모두 바꿔가는 추세이긴 하지만, 아직 케케묵은 저장소와의 동기화를 위해 euckr charset을 쓰는 곳도 많을 것 같은데요.
</p>

<p style="text-align: justify; ">
  원인을 알았으니, 해결법은 간단합니다. export LANG = ko_KR.euckr 을 입력하면 환경변수가 바뀌는데, 물론 시스템에서 UTF-8을 사용하는 경우가 많으므로 tkdiff를 실행할 때 마다 터미널 세션에서만 환경변수 수정을 하는 게 더 좋을 것 같습니다.
</p>

<p style="text-align: justify; ">
  한 가지 더, LC_ALL 이라는 환경변수를 공백으로 만들어야 합니다. 아래를 실행시키면 되겠습니다.
</p>

<p style="text-align: justify; ">
  <b><span style="color: rgb(255, 187, 0);">export</span> <span style="color: rgb(0, 85, 255);">LANG</span>=ko_KR.euckr<br /><span style="color: rgb(255, 187, 0);">export</span> <span style="color: rgb(0, 85, 255);">LC_ALL</span>=</b>
</p>

<p style="text-align: justify; ">
  이래도 안 나온다면 폰트 문제입니다&#8230;
</p>