---
title: CSS로 한글 단어 word-break
author: interp
type: post
date: 2016-10-28T01:53:36+00:00
url: /css로-한글-단어-word-break/
dsq_thread_id:
  - 5869983256
categories:
  - 프로그래밍
tags:
  - css
  - word-break

---
모바일 제목이 줄바꿈 될 때 단어가 아니라 음절 단위로 잘려서 보기 흉했다. 다음과 같이 처리가 가능했다.

<pre class="brush: css; title: ; notranslate" title="">article .title {
  word-break : keep-all;
}
</pre>

&nbsp;