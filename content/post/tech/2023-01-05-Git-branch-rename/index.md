---
title: Git Branch 이름 바꾸기
description: Local, Remote 까지 확실히 바꿔보자
author: InterP
date: 2024-01-05 17:41:29 +0900
url: /git-branch-rename
draft: false
image: feature.png
categories:
    - Tech
tags:
    - Git
---

Git 에서 Branch 이름을 바꾸는 방법에 대해 제대로 정리가 안 되어 있는 것 같아서, 짧지만 예제와 함께 확실히 정리해 보려고 한다.

# 상황
Github, Gitlab 같은 원격 저장소에 있는  `internal` 이란 이름의 branch 가 있다고 가정하자. 이 branch 를 로컬 환경에서 (예: PC, 개발 서버) checkout 받아서 작업을 하고 있었다.
```bash
git checkout internal
# do something
```
어? 갑자기 `internal` 에서 작업하던 내용이 **Issue#10** 으로 등록되었다. 이제 이 작업은 '내부적'인 작업이 아니게 된 것이다. 그래서 Issue 번호를 붙인 branch 이름, `issue-10` 으로 바꾸고 싶다. 

즉, 이런 상황이다.

```
Local branch  = internal
Remote branch = internal
```

# Local branch 이름 바꾸기
아직 원격 저장소에는 반영하기 싫고, 로컬에서만 이름을 바꾸고 싶다면.. 아주 간단하게 바꿀 수 있다.
```bash
# (1) on `internal`` branch
git branch -m issue-10
# (2) not on `internal` branch
git branch -m internal issue-10

git checkout issue-10
git rev-parse --abbrev-ref HEAD # issue-10
```
```
Local branch  = issue-10
Remote branch = internal
```

이 상태에서 그대로 push 하면 바뀌겠지? 라는 순진한 생각을 실험으로 옮겨보자.
```bash
git push origin issue-10
Enumerating objects: 1, done.
Counting objects: 100% (1/1), done.
Writing objects: 100% (1/1), 181 bytes | 181.00 KiB/s, done.
Total 1 (delta 0), reused 0 (delta 0), pack-reused 0
remote: 
remote: Create a pull request for 'issue-10' on GitHub by visiting:
remote:      https://github.com/test/test-project/pull/new/issue-10
remote: 
To https://github.com/test/test-project.git
 * [new branch]      issue-10 -> issue-10
```

*와! 바뀐거 아니예요?* 그럴리가요!
```bash
git fetch origin
git branch -a

* issue-10
  main
  remotes/origin/internal
  remotes/origin/issue-10
  remotes/origin/main
```
```
Local branch  = issue-10
Remote branch = issue-10, internal
```
`remotes/origin/internal` 이 여전히 남아있다. 깔끔하지 못하다!

# Remote branch 이름 바꾸기
원격 저장소에 있는 branch 까지 이름을 바꾸려면 어떻게 해야 할까? 

이미 눈치챘겠지만 그냥 옛날 Remote branch 를 삭제하면 된다.

```bash
# (1)
git push origin :internal
# (2)
git push origin --delete internal
```

# 이러면 끝? Upstream 의 함정
지금 예제에서는 *다행히* 새로운 이름의 branch 가 그대로 Remote branch 로 업로드 된 경우이다. 위의 결과를 다시 가져와보면, `issue-10` 은 원격 저장소에 없었는데 이 Push 작업을 통해 새로 생긴 것이다.
```
To https://github.com/test/test-project.git
 * [new branch]      issue-10 -> issue-10
```
다시 돌아가서, Local branch 이름만 바꾸고 Push 를 했는데 다음과 같은 상황이 발생했다면?
```
To https://github.com/test/test-project.git
38b2c6e..7489f75 issue-10 -> internal
```
*음?* 기존 Remote branch 인 `internal` 에 그대로 반영되었다. 

이러면 Remote branch `internal` 을 `git push origin --delete` 로 지워본들, `issue-10` branch 를 계속 push 할 때 마다 `internal` 이란 이름으로 계속 Remote branch 가 생길 것이다. 

왜 이렇게 된 것일까? 답은 Upstream 때문이다. 다음 명령으로 branch 의 상태를 확인해 보자.
```bash
git branch -vv | grep issue-10
* issue-10  7489f75 [origin/internal] hello commit
```
`[]` 안에 표시된 내용이 Upsteam 이며, 연결된 Remote branch 내용이 들어가 있다. 이 부분이 아예 없다면 Upstream 이 없으니, 새로운 branch 를 Push + 옛날 branch 는 Remote 에서 삭제하는 위 방법만으로 이름을 바꿀 수 있다. 반대로 말하면, Upstream 이 존재하면 추가 조치가 필요하다.

# 마지막 조치
이름을 바꾼 Local branch 를 Push 하기 전에, Upstream 을 삭제하는 과정이 필요하다.
```bash
git branch --unset-upstream issue-10
```
{{< callout text="참고로, `git branch --set-upstream-to=` 명령으로 기존 Remote branch 에 Upstream 을 연결하는 방법도 있지만, Remote branch 가 존재하지 않으면 에러가 발생한다." >}}
그리고 Upstream 을 연결하기 위해 다음과 같이 `-u` 옵션을 써서 `git push` 하면 된다!
```bash
git push -u origin issue-10
```

# 한 번에 하기
귀찮으신 분들을 위해 한 번에 하는 방법을 소개한다. 그냥 변수를 바꾸시면 되겠다.
```bash
NEW_BRANCH="internal"
OLD_BRANCH="issue-10"

# Local branch
git checkout ${OLD_BRANCH}
git branch -m ${NEW_BRANCH}

# Unset existing upstream and push with new upstream
git branch --unset-upstream
git push -u origin ${NEW_BRANCH}

# Check whether new branch is okay on the remote

# Delete old remote branch
git push origin --delete ${OLD_BRANCH}
```

# 당부
어떻게 하든 예전 Remote branch 를 삭제하는 것은 동일하다. 하지만, Local branch 가 존재하는 로컬 환경이 어떻게 될지 아무도 모른다. 사람 일은 모르기 때문에 Remote branch 를 먼저 삭제해버렸더니, Local branch 를 못 쓰게 될 수도 있다. (disk 가 고장나거나 PC 가 먹통이 되거나!)

따라서 **반드시 Local branch 를 먼저 Push 한 다음에 Remote branch 를 삭제해야 한다.**