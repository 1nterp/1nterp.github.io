---
title: amazon web server 에서 WordPress 업데이트
author: interp
type: post
date: 2017-08-08T09:16:18+00:00
url: /amazon-web-server-에서-wordpress-업데이트/
dsq_thread_id:
  - 6049977595
categories:
  - 개발환경
tags:
  - wordpress
  - amazon
format: link

---
Amazon Web Server에서 WordPress를 설치하고, 플러그인이나 워드프레스를 업그레이드 하라고 하면&#8230; FTP 정보를 등록하라고 나온다. 그렇게 하지 않아도, [여기][1]서 제시한 것 처럼 권한 사용자만 바꿔줘도 된다.

<pre class="brush: bash; title: ; notranslate" title="">sudo chown -R apache:apache path/to/wordpress
</pre>

 [1]: https://stackoverflow.com/questions/8686125/update-wordpress-theme-on-ec2/10326724#10326724