---
title: Gitlab merge request 옵션 기본으로 두기
author: interp
type: post
date: 2018-11-13T05:03:22+0000
url: /set-gitlab-merge-request-checked/
categories:
  - 개발환경
tags:
  - gitlab
  - merge request
  - squash merge

---
Gitlab Community 에서 필요로 하는 기능인데, 이렇게 수동으로 할 수 있어서 간단히 남긴다. Gitlab 에 있는 merge request 에 보면 다음 옵션이 있는데, 전부 체크가 해제되어 있다.

<img class="size-full wp-image-1441 alignnone" src="https://interp.blog/uploads/2018/11/제목-없음.png" alt="" width="494" height="75" srcset="https://interp.blog/uploads/2018/11/제목-없음.png 494w, https://interp.blog/uploads/2018/11/제목-없음-300x46.png 300w" sizes="(max-width: 494px) 100vw, 494px" />

  * Merge Request 에 성공한 Source Branch 를 삭제
  * Merge Request 할 때 Commit 을 하나로 뭉쳐서 Merge (=Squash Merge)

**이 체크박스를 개발자가 일일해 해 줘야 하는 문제**가 있다. 그래서 어떤 개발자는 체크하는 것을 까먹었다가 master branch 의 commit tree 를 엉망으로 만들기도 한다. 이 문제를 그냥 없애기 위해, 체크박스 표시를 그대로 두도록 하면 어떨까 고민하던 차에, 해결방법을 알아냈다.

  1. `/opt/gitlab/embedded/service/gitlab-rails/app/views/shared/issuable/form/_merge_params.html.haml` 을 편집기로 연다.
  2. `check_box_tag` 항목으로 시작하는 줄이 <span style="text-decoration: underline;">두 군데</span> 있는데, 아래와 같이 다음 내용을 '추가' 한다.

```
= check_box_tag 'merge_request[force_remove_source_branch]', '1', issuable.force_remove_source_branch?, class: 'form-check-input'<span style="color: #ff0000;">, checked: 'checked'</span> 
<span style="color: #0000ff;"># ... blahblah</span> 
= check_box_tag 'merge_request[squash]', '1', issuable.squash, class: 'form-check-input'<span style="color: #ff0000;">, checked: 'checked'</span>```

다 했다면 `gitlab-ctl reconfigure && gitlab-ctl restart` 로 Gitlab 서버를 재시작한다.

* * *

Translation may be necessary for those not familiar with Korean, so let's summarize it.

Two options in Gitlab merge request are not checked at first, as captured above. I think **it is mistake-prone to many developers, so some of them forgot to check them**. It results adding merge commit(s) into master branch.

So I needed how to make them checked, and I finally got an answer.

  1. Open `/opt/gitlab/embedded/service/gitlab-rails/app/views/shared/issuable/form/_merge_params.html.haml` with your favorite editor.
  2. Find lines starting with `check_box_tag` and append it described below.

```
= check_box_tag 'merge_request[force_remove_source_branch]', '1', issuable.force_remove_source_branch?, class: 'form-check-input'<span style="color: #ff0000;">, checked: 'checked'</span> 
<span style="color: #0000ff;"># ... blahblah</span> 
= check_box_tag 'merge_request[squash]', '1', issuable.squash, class: 'form-check-input'<span style="color: #ff0000;">, checked: 'checked'</span>```

After that, you should restart server by entering `gitlab-ctl reconfigure && gitlab-ctl restart`