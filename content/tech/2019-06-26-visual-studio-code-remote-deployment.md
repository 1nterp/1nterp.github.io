---
title: Visual Studio Code Remote Deployment
author: interp
type: post
date: 2019-06-26T05:11:21+00:00
url: /visual-studio-code-remote-deployment/
categories:
  - 개발환경
tags:
  - SSH
  - vs code
  - remote

---
Vim 과 SSH 에 찌들어 있었는데, 이번 Visual Studio Code 의 베타 기능인 Remote Deployment 를 연결해 보고 나서, 학생 때 쓰던 IDE 로 돌아간 것 같아 너무 좋았다. 언제까지고 구식 도구를 쓰며 부심을 부릴 수만은 없다. 설치 과정이 조금 험난했지만, 간단히 요약해서 써본다.

클라이언트 OS 는 윈도우 10 (빌드 1809), 서버 OS 는 Cent OS 7 기준으로 작성한다.

### 클라이언트 (윈도우) 준비

처음에 준비할 때는 [Visual Studio Code Insider][1] 버전을 설치하라고 되어 있었는데, 이제는 꼭 그럴 필요 없는 것 같다. 일반 [Visual Studio Code][2] 를 설치해도 된다.

다음으로, SSH 클라이언트를 설치한다. **윈도우 10 빌드 1807 이상 버전**의 윈도우 OS 라면 [여기 링크][3] 안내를 따르거나, 아래 요약된 스크린샷을 보면 된다.

시작 > 설정 앱에서, '앱' 을 클릭한 뒤 '앱 및 기능' 탭의 '선택적 기능 관리' 를 클릭한다. 그 다음 아래 'OpenSSH 클라이언트' 를 찾아 설치한다. OpenSSH 서버는 설치할 필요가 없다.

<p id="foopGhq">
  <img class="alignnone size-full wp-image-1523 " src="https://interp.blog/uploads/2019/06/img_5d11df55e7f29.png" alt="" srcset="https://interp.blog/uploads/2019/06/img_5d11df55e7f29.png 829w, https://interp.blog/uploads/2019/06/img_5d11df55e7f29-300x139.png 300w, https://interp.blog/uploads/2019/06/img_5d11df55e7f29-768x357.png 768w" sizes="(max-width: 829px) 100vw, 829px" />
</p>

<p id="MCzFjvf">
  <img class="alignnone size-full wp-image-1522 " src="https://interp.blog/uploads/2019/06/img_5d11df39e0722.png" alt="" srcset="https://interp.blog/uploads/2019/06/img_5d11df39e0722.png 470w, https://interp.blog/uploads/2019/06/img_5d11df39e0722-300x43.png 300w" sizes="(max-width: 470px) 100vw, 470px" />
</p>

<p style="padding-left: 40px;">
  <em>만약에 여러분이 윈도우 10 빌드 1807 이하 버전의 윈도우 OS 라면&#8230; 조금 귀찮아진다. <a href="https://code.visualstudio.com/docs/remote/troubleshooting#_installing-a-supported-ssh-client">이 문서</a> 에 따르면, <a href="https://git-scm.com/download/win">Git for windows</a> 를 설치하면서 옵션에서 <strong>Use Git and optional Unix tools from the Command Prompt </strong>를 선택하면 된다. 그러면, 같이 설치된 mingw 내부의 SSH 를 클라이언트로 사용한다고 한다. 물론 난 테스트해 보진 않았다! 권한 문제 등등으로 생각보다 꼬일 가능성이 있으므로, 조심해야 한다.</em>
</p>

이제 ssh key 를 만들어야 한다. 비대칭 키에 대한 지식이 없다면 [암호 대신 SSH Key 로 인증하기][4] 포스팅을 참고하면 된다. 혹시 PuTTY 에서 생성한 비공개 키를 등록하고 쓰고 있으니 이걸로 충분하지 않을까? 그렇게 준비하면 실제 접속할 때 아마 잘 안 될 것이다. 내가 해 봤으니까&#8230;

Visual Studio Code 는 OpenSSH (또는 Git 의 ssh) 클라이언트를 쓰기 때문에, Key 호환성 문제로 'invalid format' 에러를 발생시킬 수 있다. 그러니 순순히 (?) **실행 명령 창 (cmd) 을 열어서** 다음을 입력하자. 기존에 쓰던 키 저장 경로가 존재한다면, 다른 경로로 설정하는 것을 추천한다. 이 방법은 [Visual Studio Code 페이지의 Troubleshooting][5] 에 등록된 내용이다.

```bash
ssh-keygen -t rsa -b  4096
```

&nbsp;

### 서버 (리눅스) 준비

원활한 서비스가 가능한 리눅스 OS 목록은 [여기][6]를 참고하면 된다. Cent OS 7 은 잘 되므로 별 다른 설정 없이 가능하다. 지원이 안 되는 리눅스들은 workaround 가 있는데 (특시 Cent OS 6) 생각보다 까다롭고 원치 않는 상황이 발생할 수 있기 때문에 신중해야 한다.

접속하고자 하는 계정의 `~/.ssh/authorized_keys` 파일에다가, 아까 만들었던 Key Pair 중 '공개 키' 정보를 입력해야 한다. 해당 파일이 없으면 만들면 되고, 있으면 파일 끝에 추가 (append) 해주면 된다.

`~/.ssh/authorized_keys` 파일의 권한이 600 (계정에서만 읽기/쓰기가 가능) 인지 반드시 체크하고, 아니라면 `chmod` 명령으로 바꿔주도록 한다. (이건 SSH 일반 접속 때문에 하는 작업이지, Visual Studio Code 라서 하는 것이 아니다.)

&nbsp;

### Visual Studio Code 준비

우여곡절 끝에 준비를 다 했으면, Visual Studio Code 를 열어서 [Remote Deployment][7] 를 설치하자. 그 다음, 명령 팔레트를 열어서 (Shift + Ctrl + P) **Remote-SSH: Open Configuration File&#8230;** 을 선택한다. 설정 파일 경로는 수정하거나 기존에 잡아주는 경로를 쓰건 상관없다.

<p id="KhDFgvb">
  <img class="alignnone size-full wp-image-1524 " src="https://interp.blog/uploads/2019/06/img_5d12fc88e148b.png" alt="" srcset="https://interp.blog/uploads/2019/06/img_5d12fc88e148b.png 622w, https://interp.blog/uploads/2019/06/img_5d12fc88e148b-300x45.png 300w" sizes="(max-width: 622px) 100vw, 622px" />
</p>

예시는 이렇다.

```plain
Host 192.168.0.10
    HostName 192.168.0.10
    User interp
    IdentityFile "C:\Users\interp\ssh_key\id_rsa"
```

  * Host : 목록에 나올 이름이다. 보통은 HostName 과 같이 지정해주거나 Username@HostName 으로 지정한다.
  * HostName : 실제 접속할 호스트 주소
  * User : 접속할 사용자 계정 이름
  * IdentifyFile : 생성한 Key Pair 중 '비공개 키' 경로

&nbsp;

### Remote 로 접속!

이제 설정 파일을 저장하고, 명령 팔레트를 열어서 (Shift + Ctrl + P) **Remote-SSH: Connect to Host&#8230;** 을 선택한다. 아까 저장한 Host 가 1개만 떠 있을텐데, 접속하면 아예 새로운 Visual Studio Code 창이 하나 더 뜨게 된다.

이것저것 하는 것 같으니 잠시 기다리면, 접속이 되었다는 메시지와 함께 '절대로 저 작은 터미널을 닫지 말아주세요' 라는 경고문이 뜬다. 최소화시키고 작업을 하면 된다!

### 그래서 우린 뭘 할 수 있죠?

이 이야기는 좀 더 써 보고 2부에서 계속 하도록 하겠다.

 [1]: https://code.visualstudio.com/insiders/
 [2]: https://code.visualstudio.com/Download
 [3]: https://docs.microsoft.com/ko-kr/windows-server/administration/openssh/openssh_install_firstuse
 [4]: https://arsviator.blogspot.com/2015/04/ssh-ssh-key.html
 [5]: https://code.visualstudio.com/docs/remote/troubleshooting#_quick-start-ssh-key
 [6]: https://code.visualstudio.com/docs/remote/linux
 [7]: https://aka.ms/vscode-remote/download/extension