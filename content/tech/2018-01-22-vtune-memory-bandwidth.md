---
title: Intel VTune Memory Bandwidth 분석하기
author: interp
type: post
date: 2018-01-22T05:19:48+0000
url: /vtune-memory-bandwidth/
categories:
  - 개발환경
tags:
  - vtune

---
Intel VTune 으로 Memory Bandwidth 를 분석하려면, 분석할 수 있는 커널 드라이버를 로딩시켜야 한다. (참고로 메모리 분석은 리눅스에서만 가능하다.) 해당 작업을 하지 않고 'General Exploration > Analyze memory bandwidth' 를 체크하면 엄한 경고창이 반길 것이다.

<img class="aligncenter size-large wp-image-1272" src="/uploads/2018/01/before-1024x156.jpg" alt="" width="730" height="111" srcset="https://interp.blog/uploads/2018/01/before-1024x156.jpg 1024w, https://interp.blog/uploads/2018/01/before-300x46.jpg 300w, https://interp.blog/uploads/2018/01/before-768x117.jpg 768w, https://interp.blog/uploads/2018/01/before-1200x183.jpg 1200w, https://interp.blog/uploads/2018/01/before.jpg 1325w" sizes="(max-width: 730px) 100vw, 730px" />

[이 문서][1]를 참고해도 좋지만, VTune 이 설치된 경로에서 `sepdk/src/README.txt` 를 보는 게 더 쉽다. 이 내용을 요약하면,

  1. 커널 환경변수를 체크한다. 프로파일링이 가능하고 모듈 로딩이 가능해야 한다. 
      * `CONFIG_MODULES=y`
      * `CONFIG_MODULE_UNLOAD=y`
      * `CONFIG_PROFILING=y`
  2. 커널 드라이버를 컴파일시킬 헤더파일이 필요하다. Linux 배포판에 따라, 커널 개발용 패키지를 내려받아 설치한다. (언급한 Linux 배포판이 없으면 소스를 직접 받아둔다.) 
      * Redhat 5/Fedora/CentOS : `yum install kernel-devel`
      * Ubuntu/Debian : `` apt-get install build-essential linux-headers-`uname-r` ``
  3. VTune이 필요로 하는 커널 드라이버를 컴파일하고 로드시킨다. 
      * `cd ${VTune Directory}/spedk/src`
      * `./build_driver` (이 때 2번에서 설치한 커널 헤더파일의 위치를 정확히 입력해야 한다.)
      * `./insmod-sep3` <ul style="list-style-type: circle;">
          <li>
            로딩 확인을 위해서는 <code>./insmod-sep3 -q</code> 라고 입력해 보자.
          </li>
          <li>
            언로딩 시키려면 <code>./rmmod-sep3</code> 이라고 입력하자.
          </li>
        </ul>

 [1]: https://software.intel.com/en-us/vtune-amplifier-help-building-and-installing-the-sampling-drivers-for-linux-targets
