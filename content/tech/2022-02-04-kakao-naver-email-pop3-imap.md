---
title: 카카오/네이버 메일 아이폰 연동
date: '2022-02-04 16:35:37'
url: /kakao-naver-email-iphone-connect/
tags:
    - mail
    - IMAP
    - POP3
    - iPhone
categories:
    - tech
---



## 요약

- 원래는 홈페이지에서 하라는 대로 하면 된다.
- 비밀번호를 잘 입력했는데 서버 접속이 안 된다면, 혹시 2단계 인증을 쓰고 있지는 않은지?
- 2단계 인증을 쓰는 경우라면, **앱 비밀번호**를 별도로 발급받는다.

## 참고

카카오 메일 뿐만 아니라 네이버 메일이나 네이버 캘린더 동기화도 비슷하다. 아래에 ‘부록’ 으로 달아뒀으니 참고하면 된다.

## 설정 방법

1. PC 에서 브라우저를 열고, 카카오 메일을 접속한다. 
    - 모바일 브라우저에서 카카오 메일을 접속하면 카카오톡으로 리다이렉트 되는데, 카카오톡에서는 해당 설정을 진행할 수 없다. 반드시 PC 로 접속한다.
2. **환경설정 > IMAP/POP3** 을 클릭해서, IMAP 사용을 체크하고 저장한다.
3. 설정 앱으로 가서 ‘메일 > 계정’ 을 차례대로 누른다.
<p>
<img src="/images/2022-02-04-kakao-email/iphone-1.jpeg" width="200px" style="display: inline;"/><img src="/images/2022-02-04-kakao-email/iphone-2.jpeg" width="200px" style="display: inline;"/>
</p>
4. 그 다음 ‘계정 추가’ 를 누른 다음 ‘기타’ 를 선택한다. 이후에 'Mail 계정 추가' 를 선택한다.
<p>
<img src="/images/2022-02-04-kakao-email/iphone-3.jpeg" width="200px" style="display: inline;"/><img src="/images/2022-02-04-kakao-email/iphone-4.jpeg" width="200px" style="display: inline;" />
</p>
5. 기본 정보를 입력한다. 이메일과 암호는 쓰던 걸 쓰면 되고 이름이나 설명은 자유롭게 입력한다.
<img src="/images/2022-02-04-kakao-email/iphone-5.png" width="300px" />
6. IMAP 또는 POP 을 선택하는 탭이 있는데, 어느 것을 선택하던 상관없지만 IMAP 으로 진행한다.
<br/> <br/>

이제 안내된 대로 주소를 설정한다. [공식 FAQ 문서](https://cs.kakao.com/helps?articleId=1073195244&service=156&category=519&device=&locale=ko), 7번 항목)

```text
- 아이디 : 카카오메일 아이디 (ooooo@kakao.com 에서 앞 부분)
- 비밀번호 : 카카오 계정 비밀번호
- IMAP (받는서버) : imap.kakao.com:993 (SSL)
- SMTP (보내는서버) : smtp.kakao.com:465 (SSL)
```

 SSL 은 아마 처음 설정할 때 바로 시도할 것이다. 포트 번호는 당장 신경 쓰지 않아도 되는데, 나중에 계정 저장을 한 다음에 포트 세부설정이 가능한 곳이 있긴 하다.



## 비밀번호가 맞는데 되지 않아요

혹시 2단계 인증을 쓰고 있지 않은지? 그렇다면 기존 비밀번호로는 인증을 할 수 없다. 사람이 로그인을 했다면 카카오톡에 들어가서 인증하기를 눌러줬겠지만, 이건 아이폰이니까.

그래서 ‘앱 비밀번호’ 라는 걸 발급받아야 한다. PC 에서도 발급이 가능하지만, 어차피 아이폰에서 복사해서 바로 붙여넣을 예정이니, 모바일로 해 보자.

1. 이번에는 모바일 기기에서 ‘카카오톡’ 앱을 실행한다.
2. ‘...’ 버튼을 누르고, 오른쪽 위에 있는 톱니바퀴를 누른다.
    <img src="/images/2022-02-04-kakao-email/kakao-1.jpeg" width="300px" />
3. 개인/보안 → ‘카카오 계정’을 누르고, 나오는 화면에서 ‘2단계 인증’ 을 누른다.
<p>
    <img src="/images/2022-02-04-kakao-email/kakao-2.jpeg" width="200px"  style="display: inline;"/><img src="/images/2022-02-04-kakao-email/kakao-3.jpeg" width="200px"  style="display: inline;"/><img src="/images/2022-02-04-kakao-email/kakao-4.jpeg" width="200px"  style="display: inline;"/>
</p>
4. 비밀번호를 입력한 뒤, ‘앱 비밀번호’를 누른다.
    <img src="/images/2022-02-04-kakao-email/kakao-5.jpeg" width="300px" />
5. 앱 이름을 원하는 대로 입력하고, ‘생성’ 을 누르면 앱 비밀번호가 뜬다. 앱 비밀번호는 다시 볼 수 없기 때문에, 복사해 두거나 메모해 둬야 한다. 비밀번호를 놓쳤다면, 삭제했다가 다시 만들면 되니까 걱정하지 말자.
<br/> <br/>

이 앱 비밀번호를, 원래 비밀번호 대신 입력하면 서버 접속이 가능하다.



## 네이버는 어디서?

이번에도 모바일 환경에서 해 볼 것이다. 네이버 앱으로 해도 되고, 일반 브라우저 에서 해도 상관없다.

1. 네이버에 로그인 한다.
2. 오른쪽 위에 있는 프로필 아이콘을 누른 뒤, 다시 왼쪽 위에 있는 프로필 아이콘을 누른다.
3. '내 정보 및 프로필 관리' 에 있는 본인 계정을 누른다.
4. 보안 설정 및 비밀번호 변경을 클릭한다.
    <img src="/images/2022-02-04-kakao-email/naver-3.jpeg" width="300px" />
5. 2단계 인증 항목에서 관리하기를 클릭한다.
    <img src="/images/2022-02-04-kakao-email/naver-4.jpeg" width="300px" />
6. 조금 스크롤을 내리면, 애플리케이션 비밀번호 관리 항목이 보인다. 
    <img src="/images/2022-02-04-kakao-email/naver-5.jpeg" width="300px" />
    - 종류에서 아이폰을 선택해도 되지만, 카카오에서의 이름 설정에 지나지 않기 때문에, 아무거나 입력해도 된다.
    - 생성하기 버튼을 누르면 비밀번호가 보인다. 마찬가지로, 지금 복사하거나 메모해두지 않으면 나중에 다시 볼 수 있는 방법이 없다.