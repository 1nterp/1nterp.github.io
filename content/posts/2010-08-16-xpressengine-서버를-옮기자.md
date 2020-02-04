---
title: XpressEngine 서버를 옮기자!
author: interp
type: post
date: 2010-08-16T05:43:08+00:00
draft: true
private: true
url: /xpressengine-서버를-옮기자/
categories:
  - 미분류

---
<span class="Apple-style-span" style="color: rgb(0, 0, 0); font-family: Dotum; "></p> 

<div>
  <span class="Apple-style-span" style="color: rgb(0, 0, 0); font-family: Dotum; "><span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; ">XpressEngine(제로보드 XE) 서버를 옮겨야 할 때, 다음의 지침을 따르면 쉽게 옮길 수 있다. 필자도 굉장히 많이 필요한 부분이다 보니 자세히 정리하도록 한다.</span></span></span></span></span></span>
</div>

<div>
  <span class="Apple-style-span" style="color: rgb(0, 0, 0); font-family: Dotum; "><br /> </span>
</div>

<div>
  <span class="Apple-style-span" style="color: rgb(0, 0, 0); font-family: Dotum; "><span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><b>[본 서버에서 할 일]</b></span></span></span></span></span></span>
</div>

<p>
  <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> 1) XE를 압축해서 백업한다.</span></span></span></span></span></span>
</p>

<div>
  <font class="Apple-style-span" color="#000000" face="Dotum"><span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; ">당연히, XE폴더를 압축해서 백업해둔다. 이 부분은 따로 설명하지 않겠다.</span></span></span></span></span></font>
</div>

<div>
  <font class="Apple-style-span" color="#000000" face="Dotum"><br /> </font></p> 
  
  <div>
    <span class="Apple-style-span" style="color: rgb(0, 0, 0); font-family: Dotum; "></p> 
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> 2) DB를 백업한다.</span></span></span></span></span>
    </div>
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> XE가 저장된 데이터베이스를 백업하는데, sql 파일로 덤프를 떠 두면 된다.</span></span></span></span></span>
    </div>
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> 대부분의 시스템이 MySQL을 이용하므로, 특정 DB를 덤프 뜨는 명령어는 다음과 같다.</span></span></span></span></span>
    </div>
    
    <div>
      <span class="Apple-style-span" style="font-family: Dotum, AppleGothic, sans-serif; color: rgb(34, 34, 34); "><br /> </span>
    </div>
    
    <div>
      <span class="Apple-style-span" style="font-family: Dotum, AppleGothic, sans-serif; color: rgb(34, 34, 34); "><span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; ">$ mysqldump -u[사용자아이디] -p [데이터베이스명] > [저장될 파일명]&nbsp;</span></span></span></span></span></span>
    </div>
    
    <div>
      <span class="Apple-style-span" style="font-family: Dotum, AppleGothic, sans-serif; color: rgb(34, 34, 34); "><span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; ">Enter password : [아이디의 패스워드 입력]</span></span></span></span></span></span>
    </div>
    
    <div>
      <span class="Apple-style-span" style="font-family: Dotum, AppleGothic, sans-serif; color: rgb(34, 34, 34); "><br /> </span>
    </div>
    
    <div>
      <font class="Apple-style-span" color="#222222" face="Dotum, AppleGothic, sans-serif"><span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; ">ex)</span></span></span></span></span></font>
    </div>
    
    <div>
      <font class="Apple-style-span" color="#222222" face="Dotum, AppleGothic, sans-serif"><span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; ">$ mysqldump -uroot -p xe_db > xe.sql</span></span></span></span></span></font>
    </div>
    
    <div>
    </div>
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><b><br /> [새 서버에서 할 일]</b></span></span></span></span></span>
    </div>
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> 3) 1)에서 압축해뒀던, XE 압축파일을 웹 루트 디렉토리에 푼다.</span></span></span></span></span>
    </div>
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> 4) DB를 복원한다. MySQL에서 DB를 복원하는 방법은 다음과 같다.&nbsp;</span></span></span></span></span>
    </div>
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> 이 때 빈 DB를 하나 만들어줘야 한다는 것이다. 이름은 기존의 DB 이름과 달라도 상관없다.</span></span></span></span></span>
    </div>
    
    <div>
      <span class="Apple-style-span" style="font-family: Dotum, AppleGothic, sans-serif; color: rgb(34, 34, 34); "><br /> </span>
    </div>
    
    <div>
      <span class="Apple-style-span" style="font-family: Dotum, AppleGothic, sans-serif; color: rgb(34, 34, 34); "><span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; ">$ mysql -u[사용자아이디] -p [디비명] < 덤프파일명&nbsp;</span></span></span></span></span></span>
    </div>
    
    <div>
      <span class="Apple-style-span" style="font-family: Dotum, AppleGothic, sans-serif; color: rgb(34, 34, 34); "><span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; ">Enter password : [아이디의 패스워드 입력]</span></span></span></span></span></span>
    </div>
    
    <div>
      <span class="Apple-style-span" style="font-family: Dotum, AppleGothic, sans-serif; color: rgb(34, 34, 34); "><br /> </span>
    </div>
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> 5) XE 디렉토리 내에 있는 files/config/db.config.inc 를 수정한다.</span></span></span></span></span>
    </div>
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> 여기서 DB에 접속할 id, 패스워드, hostname, 접속할 DB명 등을 수정해준다.</span></span></span></span></span>
    </div>
    
    <div>
    </div>
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> 6) 마지막! 제일 중요! XE 디렉토리에서 다음을 실행한다.</span></span></span></span></span>
    </div>
    
    <div>
    </div>
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> $ chmod -R 777 . < 현재 폴더(하위 폴더) 권한 다 주기</span></span></span></span></span>
    </div>
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> 물론, data/ 와 files/ 부분에만 707 또는 777을 줘도 상관없지만, 귀찮으니 다 주도록 하자. (-_-)</span></span></span></span></span>
    </div>
    
    <div>
    </div>
    
    <div>
      <span style="font-size: 12pt; "><span style="font-size: 11pt; "><span style="font-family: Dotum; "><span style="font-family: Gulim; "><span style="font-size: 10pt; "><br /> 7) XE 관리자 페이지로 접속 &#8211; 캐시파일정리 / 세션정리를 하면 복원이 완료된다.</span></span></span></span></span>
    </div>
    
    <p>
      </span> </div> </div>