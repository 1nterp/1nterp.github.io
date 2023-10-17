---
title: "Git merge vs. rebase"
description: "무엇이 좋고, 언제 써야 하는가?"
author: InterP
date: 2023-10-17 21:23:43 +0900
url: /git-merge-rebase
categories:
- Tech
tags:
- git
- merge
- rebase
---

Git 에서 브랜치 (Branch) 를 합치는 방법은 *merge* 와 *rebase* 가 있다. 보통은 작업 브랜치를 Pull Request 로 등록할 때, 메인이 되는 `main` 브랜치 (혹은 `master`) 와 작업 브랜치 사이에 충돌 (conflict) 이 발생하는 경우에 사용하게 된다. 

그런데, 주변 개발자들은 *merge* 만 해도 충분하다고 생각하는 것 같다. 나는 *rebase* 를 해서 깔끔하게 만든 다음에 Pull Request 를 만드는 것을 선호한다. 물론 내 고집만 피울 필요는 전혀 없는 것이, 사실 *merge* 로 충돌을 제거하면 상관없기 때문이다.

그러니 우선은 내가 먼저 알아봐야 하겠다. 어느 것이 더 나은지, 언제 *merge* 를 쓰고 언제 *rebase* 를 써야 할지 먼저 알아보도록 하자.

{{< adsense1 >}}

# git merge
좀 더 쉬운 방법이다. 작업 브랜치 `feature` 에서 `main` 브랜치 내용을 합치려면 다음과 같이 하면 된다.
```bash
git checkout feature
git merge main
```
이러면 커밋 트리 (commit tree) 가 어떻게 생기는지 혹시 본 적이 있는가? `git log` 만 하게 되면 commit 들이 나열되어 있지만, `git log --graph` 로 보게 되면 **커밋 트리가 한 줄이 아니라 두 줄**이 생긴 것을 확인할 수 있다. (Github Desktop 이나 다른 도구를 사용해서도 확인할 수 있다.)

{{< figure src="merge.svg" caption="출처: Atlassian Git Tutorial" align="center" width="80%">}}

이 그림을 잘 보자. 현재 브랜치인 `feature` 의 헤드 커밋 (HEAD commit) 이 별표로 표시되어 있는데, 사실 merge 작업을 한다고 새로운 수정내역이 있는 것이 아닌데도 **새로운** 커밋이 하나 더 생긴 것을 확인할 수 있다. 바로 `main` 브랜치의 새로운 커밋을 연결하는 '*머지 커밋 (merge commit)*' 이다.

나는 이 의미없는 (?) 커밋이 마음에 들지 않았다. 왜냐하면 그래프로 보지 않는 이상, 머지 커밋이 어떤 브랜치의 커밋들을 물고 왔는지 파악하기가 힘들다.

작업 브랜치와 메인 브랜치만 있다면 괜찮은데, 작업 브랜치가 낳은 또 다른 작업 브랜치가 있는 경우에는 여러 개의 머지 커밋이 중첩될 수 있다. 이럴 땐 커밋 트리가 두 줄이 아니라 세줄 이상도 우습게 생겨난다. 어떤 커밋이 이 아래에서 머지되었는지 파악하기가 점점 어려워진다.

{{< figure src="complex_graph.png" caption="어.. 음.. 그냥 지저분해요" align="center" width="70%">}}

{{< adsense2 >}}
# git rebase
반면, *rebase* 는 작업 브랜치의 내용을 메인 브랜치 '위에 (onto)' 올려두는 작업을 진행하는 것이다.
```bash
git rebase main
```

작업한 커밋들을 고스란히 메인 브랜치 위에 올려두기 때문에, 다음과 같은 커밋 트리가 생긴다.

{{< figure src="rebase.svg" caption="출처: Atlassian Git Tutorial" align="center" width="80%">}}

아까 그림과 다른 것이, 메인 브랜치 커밋이 따로 놀지 않고 작업 브랜치의 커밋들이 메인 브랜치 위에서 *다시 커밋된 모습*을 볼 수 있다. 그래서 모든 작업 커밋들이 (별표 표시로) 수정된 것 처럼 보인다. 

**머지 커밋? 없다!** Pull Request 오픈할 때 충돌이 발생할까? 그럴리가! 메인 브랜치에 고스란히 얹기만 하면 되는데 충돌 해결이 필요없다. 물론 이렇게만 이야기하면 당연히 rebase 를 해야겠지만, 현실은 엄청나게 귀찮고 복잡해서 외면받는 경우가 많다. 

- [git rebase](https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase-%ED%95%98%EA%B8%B0) 매뉴얼이 생각보다 복잡하다. 그냥 merge 하고싶은 생각이 들 정도다.
- (나처럼) SVN 을 버전 관리 시스템으로 쓴 구세대 개발자들에겐, rebase 라는 개념이 생소해서 잘 안쓰게 된다. 동감한다.
- 충돌 해결만 하면 되는데, 굳이 rebase 를 해야 하냐는 개발자도 물론 존재한다. 이 또한 공감한다. 

세 번째 이야기를 좀 더 해보자. rebase 에는 한 가지 귀찮은 점이 있는데, 바로 작업한 커밋 마다 충돌이 일어나면 그걸 하나씩 해결해주고 'rebase 진행' 을 시켜야 하기 때문이다.
```bash
git rebase main
# conflict on commit A !! resolving..
git rebase --continue
# conflict on commit B again !! resolving..
git rebase --continue
# ...
```
A 와 B 에서의 충돌내용이 같을 경우, (운이 좋으면) 한 번만 해결해도 되지만 현실은 그렇지 않다. 그래서 rebase 를 하다보면 충돌 해결에 시간을 조금 더 많이 쓰게 된다는 점은 분명하다.

# 어떤 걸 써야 할까
메인 브랜치에서는 rebase 를 하거나, squash 된 commit 만 merge 되도록 해서 커밋 트리를 깔끔하게 유지하자. 작업 브랜치에서 메인 브랜치 내용을 merge 할 때는 사실 어느 것을 써도 무방하지만, 나는 다음 기준으로 사용한다.

- 커밋이 너무 많아서, rebase 하면서 충돌 해결에 시간을 너무 많이 잡아먹을 경우엔 merge 를 사용한다.   
  (개인적으로는 merge --no-commit 으로 작업 내용만 반영받고 충돌을 해결한 뒤 커밋을 따로 하기도 한다)
- `git bisect` 로 디버깅을 해야 하는 경우엔 rebase 를 사용한다. 머지 커밋이 끼게 되면 bisect 하기가 쉽지 않았었다.



# 참고
- https://www.atlassian.com/git/tutorials/merging-vs-rebasing