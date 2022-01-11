---
title: KoTex + pdfLaTeX 에서 그림 넣기 팁
author: interp
type: post
date: 2014-10-19T04:44:01+00:00
draft: true
private: true
url: /kotex-pdflatex-에서-그림-넣기-팁/
categories:
  - 미분류
tags:
  - eps
  - LaTeX
  - WMF

---
<p style="text-align: left;">
  KoTex 2011 + pdfLaTeX 에서 그림을 넣을 때, 그림이 아니라 파일명이 자꾸 인코딩되는 경우가 있다. 그래서 인코딩된 PDF 파일을 열 때 마다 그림 대신 빈 칸과 파일 이름만 찍히는 당황스러운 경우를 접했었는데&#8230;&nbsp;
</p>

<p style="text-align: left;">
  <b>이 때 documentclass 에서 draft가 존재하는지 확인한다.</b> draft version이기 때문에 그림을 보여주지 않는 것이 그 이유다. draft를 final로 바꿔서 출력하면 그림이 정상적으로 출력된다.&nbsp;그리고 pdfLaTeX 에서는, <b>선명하게 보일 필요가 없는&nbsp;이미지들은 jpg로 표시가 가능하므로, 굳이 eps로 변환하는 수고를 들일 필요가 없다.</b> 벡터 이미지의 경우에는 선명히 보여야 하므로 반드시 eps나 pdf로의 변환이 필요하다.&nbsp;
</p>

<p style="text-align: justify;">
  참고로 개인적으로 사용했던 eps 변환 방법은 다음과 같다.
</p>

<ol style="list-style-type: decimal;">
  <li>
    <p style="text-align: justify;">
      파워포인트에서 그림을 그리거나 텍스트 박스를 만든다.
    </p>
  </li>
  
  <li>
    <p style="text-align: justify;">
      wmf 확장자로 그림/텍스트 박스를&nbsp;저장한다.
    </p>
  </li>
  
  <li>
    <p style="text-align: justify;">
      wmf 메타파일을 변환하는 툴이 있다. <a href="http://wiki.lyx.org/Windows/MetafileToEPSConverter" target="_blank" class="tx-link" rel="noopener noreferrer">MetafileToEPSConverter</a> 도 있고, Open Office에서 메타파일을 불렀다가 다시 저장할 때 eps로 저장하는 방법도 있다.
    </p>
  </li>
</ol>