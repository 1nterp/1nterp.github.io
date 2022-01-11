---
title: Docker에서 apt-get update가 실패할 때
author: interp
type: post
date: 2017-08-03T05:48:18+00:00
url: /docker에서-apt-get-update가-실패할-때/
dsq_thread_id:
  - 6037393985
categories:
  - 개발환경
tags:
  - ubuntu
  - docker

---
ubuntu 14.04 를 기반으로 한 Dockerfile 에,SSH를 설치하기 위해 아래와 같이 작성했다고 하자.

<pre class="brush: plain; title: ; notranslate" title="">FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install -y openssh-server
...
</pre>

그러면 `archive.ubuntu.com` Repository 에서 Update를 받는데, 갑자기 이런 메시지가 뜬다.

<pre class="brush: plain; title: ; notranslate" title="">...
Get:22 http://archive.ubuntu.com trusty/universe amd64 Packages [7589 kB]
Fetched 22.7 MB in 18s (1208 kB/s)
W: Failed to fetch http://archive.ubuntu.com/ubuntu/dists/trusty-updates/universe/binary-amd64/Packages Hash Sum mismatch
E: Some index files failed to download. They have been ignored, or old ones used instead.
</pre>

검색해 봐도 Docker나 Dockerfile의 문제 같지는 않다. **그렇다면 정말 Repository가 Hash Sum Mismatch 문제를 가지고 있는 것은 아닐까?**

어차피 Build 하는 시점에는 어느 Repository를 써도 상관이 없으니, 전통의 `kr.archive.ubuntu.com` 를 사용하도록 Dockerfile을 수정해 봤다.

<pre class="brush: plain; title: ; notranslate" title="">FROM ubuntu:14.04
RUN sed -i 's/archive.ubuntu.com/kr.archive.ubuntu.com/g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y openssh-server
...
</pre>

아주 잘 된다!