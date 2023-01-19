---
title: Confluence 문서들을 PDF로 출력
author: interp
type: post
date: 2017-01-13T06:52:37+00:00
url: /confluence-문서-pdf-출력/
categories:
  - 개발환경
tags:
  - Confluence
  - PDF

draft: true
---
Confluence 단일 문서는, 페이지 좌측 상단의 _Tools_ 메뉴에서 _Export To PDF_ 로 가능하지만, 그 하위 문서들 또는 Space 전체 문서를 한 번에 뽑아내는 기능은 찾기가 조금 어려워서 따로 메모해 둔다. 출처는 바로 [여기][1]. 물론, **해당 문서가 존재하는 Space 에 권한을 가지고 있어야 된다**. 반대로 이야기하면, Personal Space에서는 제약 없이 사용이 가능하다. 이 설명은 Confluence 5.4.3 에서 적용이 가능하다. 그 이하 버전 (특히 Confluence 4.x) 에서는 다른 방법을 쓰거나 플러그인을 써야 할 수도 있다.

  * Confluence 웹 페이지에서, 출력을 원하는 문서로 이동한다.
  * Confluence 상단 바에 보면 _Browse_ 가 있다. 클릭해서 나오는 세부 메뉴 중 _Space Operation _를 클릭.
  * 왼쪽에 PDF Export가 있다. 다른 포맷 (HTML, XML)도 있으니 선택하면 된다.
  * 선택하면 Space 전체를 대상으로 뽑을 것인지, 아니면 특정 문서를 선택해서 뽑을 것인지 결정할 수 있다.
  * 결정하면 오랜 (&#8230;) 시간이 지나서 PDF 파일로 출력된다.

 [1]: https://wikispaces.psu.edu/display/tips/How+to+export+pages+to+PDF
