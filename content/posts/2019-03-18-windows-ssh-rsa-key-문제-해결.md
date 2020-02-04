---
title: Windows SSH RSA Key 문제 해결
author: interp
type: post
date: 2019-03-18T04:50:30+00:00
url: /windows-ssh-rsa-key-문제-해결/
categories:
  - 개발환경
tags:
  - SSH
  - permission

---
Windows Server 2016에서 OpenSSH 를 설치하고, cmd 에서 다음과 같이 RSA 키를 생성한다.

<pre class="brush: bash; title: ; notranslate" title="">$ ssh-keygen -t rsa
</pre>

그러고 Public Key 를 SSH Server 에 위치한 authorized_keys 파일에 추가하고 접속을 시도하면?

<pre class="brush: bash; title: ; notranslate" title="">$ ssh interp@192.168.0.30
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@ WARNING: UNPROTECTED PRIVATE KEY FILE! @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions for 'C:\\Users\\interp/.ssh/id_rsa' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "C:\\Users\\interp/.ssh/id_rsa": bad permissions
interp@192.168.0.30's password:
</pre>

오잉? 내 파일이 맞는데 이게 뭘까. Private Key 파일에 마우스 우클릭을 하고 봤더니 여러 사용자가 읽기 권한으로 걸려 있는 것을 확인할 수 있었다. 이건 아니다&#8230; 등록된 사용자를 전부 지우고 현재 사용자에게 모든 권한을 준 다음에, 확인을 눌러 권한 변경을 해 준다.

<p id="euLmFtS">
  <img class="alignnone size-full wp-image-1518 " src="https://interp.blog/wp-content/uploads/2019/06/img_5d11dcea1b41a.png" alt="" srcset="https://interp.blog/wp-content/uploads/2019/06/img_5d11dcea1b41a.png 421w, https://interp.blog/wp-content/uploads/2019/06/img_5d11dcea1b41a-218x300.png 218w" sizes="(max-width: 421px) 100vw, 421px" />
</p>

&#8216;편집&#8217; 에 가서 등록된 사용자를 지우려고 하면, 상속으로 인해 지울 수 없다는 괴상한 에러가 뜰 것이다. 그러니까 위 화면에서 &#8216;고급&#8217; 으로 간 다음, 아래 캡처에 있는 &#8216;상속 사용 안 함&#8217; 을 클릭하면 자동으로 지워진다. 그 다음 시도하면, 잘 된다!

<p id="bzFxOJb">
  <img class="alignnone size-full wp-image-1519 " src="https://interp.blog/wp-content/uploads/2019/06/img_5d11dd707fe99.png" alt="" srcset="https://interp.blog/wp-content/uploads/2019/06/img_5d11dd707fe99.png 293w, https://interp.blog/wp-content/uploads/2019/06/img_5d11dd707fe99-216x300.png 216w" sizes="(max-width: 293px) 100vw, 293px" />
</p>

출처 : https://superuser.com/questions/1296024/windows-ssh-permissions-for-private-key-are-too-open