---
title: Bash on Windows Tips
author: interp
type: post
date: 2020-02-01T23:33:52+00:00
draft: true
private: true
url: /bash-on-windows-tips/
categories:
  - 미분류

---
### Powerline Font 설정

아래 명령을 반드시 Powershell 내지는 Command-Line 에서 실행해야 한다. Bash on Windows 에서 수행하면 &#8216;PS1 파일 이거 뭔가요?&#8217; 라고 하기 때문이다.

<pre class="brush: bash; title: ; notranslate" title="">git clone https://github.com/powerline/fonts.git
cd fonts
# 아래 명령어를 수행하면, 모든 폰트가 설치된다.
# 모든 폰트를 설치하기 싫으면 여기서 Font 디렉토리를 선택해서 나머지를 삭제한다.
./install.ps1
</pre>

이 때, [이런 주소][1]를 가리키면서 명령이 실패할 수 있다. 현재 실행 정책에 위배된다는 내용이다. [여기][2]에서 설명한 대로, 아래 명령을 Powershell 에서 수행해 준 뒤에 해보자. (이 명령이 막히는 경우엔, 관리자로 Powershell 을 실행시켜서 다시 수행해보자.)

<pre class="brush: plain; title: ; notranslate" title="">set-executionpolicy remotesigned
</pre>

 [1]: https://technet.microsoft.com/ko-KR/library/hh847748.aspx
 [2]: https://www.faqforge.com/windows/windows-powershell-running-scripts-is-disabled-on-this-system/