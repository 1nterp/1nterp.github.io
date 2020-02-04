---
title: Sybase와 MS SQL Server
author: interp
type: post
date: 2017-01-24T06:18:54+00:00
url: /sybase와-ms-sql-server/
dsq_thread_id:
  - 5615343257
categories:
  - 이야기
tags:
  - MS SQL Server
  - Sybase
  - SAP

---
MSSQL Server의 전신이 Sybase에서 개발한 DBMS라는 신기한(?) 말을 들었다. 독자적으로 개발한 게 아닌가? MS가 Sybase를 인수라도 한 것일까? 좀 더 자세히 알아보기로 했다. 관련 키워드로 검색했더니 [&#8216;Microsoft가 인수를 통해 확보한 인기 제품들&#8217;][1] 이란 IT World의 기사를 찾았다. 그런데 여기서 소개하는 SQL Server 페이지는 조금 다른 이야기를 하고 있었다. 인수라고 말하기도 뭣하고, 그렇다고 MS가 개발한 것도 아니라는 것이다.

사실은, 다음 순서대로 사건(?)이 발생했다.

  1. 1987년, Unix 플랫폼에서 구동되는 Sybase에서 개발한 DBMS가 있었다. **그 이름은 Sybase SQL Server 이다!**
  2. 1988년, 애쉬튼-테이트(Ashton-Tate) 그리고 **MS와 협력해 OS/2에 Sybase SQL Server 를 포팅**한다.
  3. 1992년, **MS와 협력해 Windows NT에 Sybase SQL Server 를 포팅**한다. 이 때 MS는 Windows 플랫폼에 구동되는 Sybase SQL Server의 저작권을 Sybase로부터 사들였고, 이름을 **Microsoft SQL Server** 로 변경한다. 이 때문에 Microsoft SQL Server에는 &#8216;원저작은 Sybase에 있다&#8217; 라는 표기를 1994년까지 반드시 해야만 했고, 두 제품은 이 때부터 서로 다른 길을 걷기 시작한다.
  4. 1996년, Sybase SQL Server는 새로운 버전을 발표하면서 제품 이름을 &#8216;**Sybase ASE** (Adaptive Server Enterprise)&#8217; 로 변경한다.
  5. 2010년, Sybase는 SAP에 인수되면서 해당 제품의 이름도 &#8216;**SAP ASE**&#8216; 로 바뀌게 된다.

결국 Sybase는 최근에야 SAP에 인수되었고, MS-SQL Server의 코드는 Sybase SQL Server 4.2.1 의 코드에서 갈라나와 2005 버전까지 해당 코드의 일부가 남아있었다고 한다.

 [1]: http://www.itworld.co.kr/slideshow/83414#csidx7f89e66290be484a0b6f3437a745f15