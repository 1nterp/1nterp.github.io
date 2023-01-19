---
title: MySQL / Oracle ODBC Driver를 unixODBC로 구성하기
author: interp
type: post
date: 2014-04-27T14:41:14+00:00
draft: true
private: true
url: /mysql-oracle-odbc-driver를-unixodbc로-구성하기/
categories:
  - 미분류

---
<p style="text-align: justify;">
  ODBC Client Application을 작성해서 여러 DBMS에 테스트해야 할 일이 생겼는데, 이리저리 엄청 많이 헤딩했습니다. 다음에 또 할 일이 생길지도 모르니까, 헤딩을 피하기 위해 정리해 둡니다.
</p>

# unixODBC

http://www.unixodbc.org/ 에서 Download 메뉴를 통해 받을 수 있습니다. 또는, 아래 파일을 받으시면 됩니다.

<p style="text-align: center;">
  <font face="Arial,Helvetica"><font face="Arial,Helvetica"><a href="ftp://ftp.unixodbc.org/pub/unixODBC/unixODBC-2.3.2.tar.gz">unixODBC-2.3.2.tar.gz</a></font></font>
</p>

<p style="text-align: justify;">
  링크가 작동되지 않으면, 홈페이지를 참고해 주시기 바랍니다. 받은 파일은 소스코드이므로, 컴파일이 필요합니다. Download 메뉴에도 자세히 설명이 되어 있지만, ./configure 할 때 &#8211;sysconfdir=/etc 을 지정해 설치하는 것을 추천드립니다. 이후에는 make & make install~
</p>

# MySQL

<div>
  MySQL에서는 MySQL ODBC Connector라는 것을 제공합니다. 여러 설치 버전으로 제공되는데, 가장 편한 방법은 미리 컴파일 된 Connector를 그냥 받는 것입니다. 우리가 필요한 건 드라이버 파일이니까요. (같이 동봉되어 있는 유틸리티는 사실 unixodbc에도 있으니 사실상 쓸 일이 없습니다.)


적절한 곳에 심어둔 다음, unixodbc를 설치합니다. 소스로 설치해도 되고, yum이나 apt-get install 을 이용해도 됩니다. 설치하면 odbcinst 라는 유틸리티를 사용할 수 있습니다. ODBC Driver/DSN Manager 라고 생각합시다.

처음 할 일은, 이 유틸리티를 가지고 드라이버를 등록하는 것입니다. MySQL ODBC Connector에는 2가지 버전의 Driver를 제공합니다. ANSI 버전과 Unicode 버전입니다. 완전 구닥다리 버전에 연결하는 게 아니라면 Unicode 버전을 사용합니다.

다음으로, Data Source Name을 정합니다. 아까 등록한 드라이버 이름과 사용자 이름, 패스워드, 포트 번호, 서버, 데이터베이스, 옵션, 기타 등등등을 작성한 Connection String을 등록하는 겁니다.

자, 이제 해당 DSN으로 SQLConnectDriver()를 호출합니다. 이 때 중요한 사실.. 마지막 파라메터가 0이면 망합니다.&nbsp;