---
title: SSH Public Key 교환 실패 시
author: interp
type: post
date: 2016-08-02T02:52:02+00:00
url: /ssh-public-key-교환-실패-시/
dsq_thread_id:
  - 5893278040
categories:
  - 개발환경
tags:
  - SSH

draft: true
---
<p style="text-align: justify;">
  <code>~/.ssh/authorized_keys</code> 에 Public Key를 넣었음에도 로그인 프롬프트가 여전이 뜨는 귀찮은 상황이 발생한다면, 해당 파일에 대한 권한 문제일 가능성일 가능성이 높으므로 아래 조치를 취해보자. 대부분, authorized_keys 파일이 없어서 새로 생성한 경우에 발생한다.
</p>

<pre class="brush: bash; title: ; notranslate" title="">chmod 600 ~/.ssh/authorized_keys</pre>
