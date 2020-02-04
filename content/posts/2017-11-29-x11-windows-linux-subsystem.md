---
title: X11 on Windows Linux Subsystem
author: interp
type: post
date: 2017-11-29T08:32:52+00:00
url: /x11-windows-linux-subsystem/
dsq_thread_id:
  - 6317621516
categories:
  - 개발환경
tags:
  - SSH
  - x11
  - xauth

---
제목은 다음 내용을 포함하고 있다.

  * Windows 10 에서 지원하는 Linux Subsystem 기능에 대해 이야기한다. 잘 모르겠다면 [이 글][1]을 읽고 설치에 도전해 보자. <span style="color: #999999;"><del>그런데 글 내용을 보면 이거랑 관련 없다. Babun, Mintty, Git on Bash, Putty 전부 포함이다</del></span>
  * SSH에 접속한 서버에서 X11 Forwarding 을 받고 싶은 경우를 이야기한다. 단적으로, 접속한 서버에서 파이어폭스 브라우저를 실행하면 내 윈도우 화면에 브라우저 창이 실행되는 거다. 이걸 따로 이야기하고 싶지 않으니 [Xming][2] 이나 [VcXsrv (추천)][3] 을 참고해 설치해보자.

<span style="color: #ff0000;"><strong>참고</strong></span> 이 방법은 Client측 PC의 X Server로 접근하는 무식한 방법이므로, 일반 가정 PC에서 서버로 접속했을 때엔 사용할 수 없을 것 같다. 좀 더 알아보고 보충해야겠다.

<span style="color: #008000;"><strong>보충</strong></span> ssh_config 에서 X11ForwardTrusted 를 확인하지 않았었다. 이걸 설정하니까 Server에서 DISPLAY를 따로 설정하지 않아도 잘 된다? `xauth generate` 를 한번 더 해보긴 했는데.. 한번 더 실험이 필요하다.

### Windows에서 한 일

말하자면, 클라이언트 PC에서 한 일이다. 참고로 나는 Ubuntu 를 Linux Subsystem 으로 설치했는데, CentOS여도 상관없을 것이다.

  1. Xming 또는 VcXsrv 를 설치해서 실행시켰다. 트레이 아이콘에 'X' 라고 떠 있으면 완료. (이걸 X Server 라고 부른다)
  2. Ubuntu Console을 하나 열어서,`/etc/ssh/ssh_config` (sshd_config 가 아니다) 파일을 확인했다. 여기에서 ForwardX11 yes, ForwardX11Trusted yes 를 확인했다. (주석 처리되어 있다면 주석을 제거, sudo 권한 필요)
  3. SSH 접속을 하면, 다음 에러 메시지가 떠서 보기 싫었다. <pre class="brush: plain; title: ; notranslate" title="">No xauth data; using fake authentication data for X11 forwarding.
</pre>
    
    그래서 다음과 같이 처리했다.
    
    <pre class="brush: bash; title: ; notranslate" title="">$ xauth list # ~/.Xauthority 파일이 없었다!
$ xauth generate :0 . trusted # ~/.Xauthority 파일을 만들어준다고 한다..
</pre>

  4. (Optional) Xming 또는 VcXsrv 의 설치 디렉토리에 가면 `X0.hosts`라는 파일이 있다. 여기서 Server의 Hostname 또는 IP를 적어줘야 한다.

### Server에서 한 일

직접 SSH로 접속하고 나서 설정해야 할 것을 적었다.

  1. `/etc/ssh/sshd_config` 에서 X11UseLocalHost 가 yes 로 되어 있거나, 활성화되어 있지 않아야 한다. 만약 no로 되어 있으면 yes 로 변경해야 한다.
  2. DISPLAY 값을 아예 Windows (클라이언트 PC) 의 Hostname 또는 IP 주소로 설정해버린다. <pre class="brush: bash; title: ; notranslate" title="">export DISPLAY=192.168.0.xxx:0
</pre>
    
    참고로, 뒤에 :0 또는 :10 같이 여러 예제가 인터넷에 나도는데, Windows 에서 X 아이콘에 마우스를 가져다 대면 'Hostname:X.X' 라고 나올 것이다. X.X 를 저기에 쓰는 것이다. (나는 0.0 이라고 떠서 그냥 0만 적었다.)</li> 
    
      * firefox 를 실행해 보자.</ol> 
    
    끝.

 [1]: https://msdn.microsoft.com/en-us/commandline/wsl/install-win10
 [2]: https://www.google.co.kr/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj1yoOCrePXAhWCG5QKHeIRCkEQFggkMAA&url=https%3A%2F%2Fsourceforge.net%2Fprojects%2Fxming%2F&usg=AOvVaw2r18vOyEGzisW0WiHH4ksg
 [3]: https://www.google.co.kr/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj-y9aGrePXAhUJoZQKHXKpB2IQFggkMAA&url=https%3A%2F%2Fsourceforge.net%2Fprojects%2Fvcxsrv%2F&usg=AOvVaw2UIxI0S4LFsqeqk9A47MSR