---
title: Virtualbox가 안 될 때
author: interp
type: post
date: 2016-07-22T13:27:44+00:00
url: /virtualbox-가-안-될-때/
featured_image: /wp-content/uploads/2016/07/HwyLg.png
mentions:
  - 'a:0:{}'
categories:
  - 프로그래밍

draft: true
---
<p style="text-align: justify;">
  Ubuntu 14.04 LTS 에서 업데이트 이후 갑자기 Virtualbox의 게스트 OS를 실행할 수 없는 현상을 마주했다. (Virtualbox 자체는 실행 가능하다) 게스트 OS를 실행하려고 하면, 다음과 같은 이미지가 나오면서 실행이 안 된다. 해결책은 크게 <strong>Kernel 업데이트</strong>를 받거나, <strong>BIOS의 Secure Boot 기능을 끄는 방법</strong>이다.
</p>

<img class="aligncenter wp-image-73 size-full" src="http://interp.ivyro.net/wp-content/uploads/2016/07/HwyLg.png" alt="HwyLg" width="490" height="262" srcset="https://interp.blog/wp-content/uploads/2016/07/HwyLg.png 490w, https://interp.blog/wp-content/uploads/2016/07/HwyLg-300x160.png 300w" sizes="(max-width: 490px) 100vw, 490px" />

### 1. Kernel 업데이트

<div>
  Kernel 업데이트를 받은 다음, 위의 명령을 sudoers 계정에서 실행하는 방법이 있다.


<div>
  <pre class="brush: bash; title: ; notranslate" title="">
sudo apt-get install linux-headers-`uname -r`
sudo apt-get install dkms
sudo /etc/init.d/vboxdrv setup
</pre>


### 2. BIOS의 Secure Boot 기능을 끄는 방법

<p style="text-align: justify;">
  1번 방법으로 해결되면 다행이었지만, 내 경우에는 해결되지 않았다. 그래서 이리 저리 찾아본 결과 커널에 진입할 때 필요한 권한이나 키를 요구하는 것 같은 인상을 받았다. 여기 자세히 기록하지 못했지만, vboxdrv 구동 시 내부적으로 modprobe vboxdrv 를 수행하게 되는데, 이 때 키를 요구하고 있었다. 그래서 이 부분에 권한 문제나 키 획득 문제가 있을 것이라 생각하고 다시 찾아본 것이다. ASUS 메인보드를 쓰는데, <span style="color: #808080;"><del>쓸데없이</del></span> Windows UFEI 모드로 부팅 옵션이 설정되어 있다. 이 때는 안전 부팅 (Secure Boot) 이 켜져 있는데, 이걸 끄면 됐다.
</p>

<p style="text-align: justify;">
  <em>아래 과정은 <a href="https://www.all4os.com/windows/disable-asus-motherboards-uefi-secure-boot.html">이 포스트</a>를 참고했으며, ASUS 메인보드를 기준으로 설명하기 때문에 제조사가 다르거나 버전이 다르면 설명에 차이가 있을 수 있다.</em>
</p>

  1. 재부팅 후, BIOS 설정으로 이동한다.
  2. 고급 모드로 진입한다.
  3. 부팅 탭에서, 안전 부팅 (Secure Book) 소항목으로 이동한다.
  4. 운영체제 종류(OS Type)가 'Windows UFEI' 로 되어 있는지 확인한다. 만약 'Other OS'로 되어 있다면 'Windows UFEI'로 설정해 주자. (잠시만 할 것이다)
  5. 그러면 키 관리 (Key Management) 가 아래 소항목으로 뜨는데, 여기로 이동한다.
  6. 맨 위에 '안전 부팅 키 지우기(Clear secure boot keys)' 를 선택한 뒤 OK를 누른다.
  7. 이전 화면으로 돌아와서, 운영체제 종류(OS Type)을 'Other OS' 로 설정한다.
  8. 바이오스 내용을 저장한 뒤 재부팅한다.

<p style="text-align: justify;">
  조치가 끝나고 난 뒤, Virtual Box 실행이 원활했다. 아마도 커널 업데이트 이전에는 BIOS의 Secure Boot 설정을 무시했었는데, 커널 업데이트 이후 이걸 받아들이지 않았을까 하는 의심이 들었다. 그리고 <a href="http://askubuntu.com/questions/799661/has-3-19-0-65-introduced-new-secure-boot-requirements-to-14-04-lts">그 예측을 어느 정도 보증해 주는 페이지</a>를 찾았다.
</p>

&nbsp;
