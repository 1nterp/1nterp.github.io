---
title: Gitlab Flow
author: interp
type: post
date: 2020-02-01T23:33:52+00:00
draft: true
private: true
url: /gitlab-flow/
categories:
  - 미분류

---
Git을 제대로 사용하려면, 어떻게 사용할 것인지에 대한 통찰이 필요하다고 생각한다. 독창적으로 꾸미기 보다는 Git Flow, Github Flow 등의 여러 방법들로 미리 제시된 모델을 이해하고, 장단점을 분석해 취사선택하는 게 가장 보편적인 접근 방법이다. 앞선 두 모델과 어떻게 다른지, Gitlab 을 가지고 장점을 극대화시킬 수 있는지 한번 들여다보고자 한다.

다음 내용은 [Introduction to GitLab Flow][1] 를 번역 후 요약한 것이다. 정식으로 참고할 만한 글이 없어서, 읽어보는 김에 여기에 작성하고자 한다.

* * *

Git으로 버전 관리를 하게 되면, 여러 브랜치를 나누거나 다시 병합하는 과정이 SVN 같은 오래된 시스템보다 훨씬 더 쉬워진다. 따라서 Git을 이용하면 브랜치를 어떻게 나눌지에 대한 다양한 전략이나 워크 플로우 (workflow) 를 생각해 볼 수 있다.

Git을 사용하면서 대다수 조직의 워크 플로우는 더욱 발전되었을 것이다. 그러나 아직도 많은 조직에서는 명확히 정의되지 않았거나, 복잡하거나, 또는 통합되지 않은 이슈 트래킹 시스템을 가진 개발 시스템을 운영하고 있다. 따라서, 여기서는 모범 사례들을 모은 Gitlab Flow 를 제시하려고 한다. 이 방법은 [feature driven development][2] 와 [feature branch][3] 를 합친 것이다.

버전 관리 시스템을 Git 으로 변경한 조직 대다수에겐, 효율적인 워크 플로우를 개발하는 것이 어렵게 느꼈을 것이다. 이 문서에서는 Gitlab 이 어떻게 git 워크 플로우를 이슈 트래킹 시스템과 결합했는지 설명한다. 이 방법은 git을 이용한 간단하고, 투명하며, 동시에 효율적인 방법이다.

### Git에 대해

Git으로 이전하면서, 여러분은 작업 내역 (working copy) 을 다른 사람과 공유하기 위해서 3단계를 반드시 거쳐야 한다는 사실에 익숙해져야 한다. 대부분의 버전 관리 시스템은 이 중에서 1단계 만으로 끝나기 때문이다. (그냥 서버로 커밋하면 된다.) Git 에서는, 다음 과정을 거쳐야지만 동료와 공유할 수 있다.

  1. 작업 내역을 스테이징 영역 (staging area) 에 올리는 과정이 필요하다. (git add)
  2. 스테이징 영역에 있는 수정 사항들을 로컬 저장소에 커밋해서 반영한다. (git commit)
  3. 로컬 저장소에 커밋된 내용들을 공용 원격 저장소 (shared remote repository) 에 밀어넣는다. (git push)

처음 접하는 많은 조직들은 Git을 다루는 관습이 갖춰져 있지 않아서, 자칫 놔뒀다간 엉망이 되기 십상이다. 가장 큰 문제는 각자가 저마다의 브랜치를 갖고 오랜 시간동안 수정을 가하는 것이다. 그랬다간 어떤 브랜치의 내용을 제품화해야 하고 어떤 수정 내역을 반영해야 하는지 전혀 추적할 수 없다. <span style="background-color: #999999; color: #ffffff;">(역주 : 이건 SVN도 마찬가지 아닌가? 단지 Git 이 브랜칭을 많이 만들 수 있으니까 그런 것 뿐이라고 생각한다)</span> 이런 문제를 해결하기 위해 표준화된 패턴인 [git flow][4] 나 [GitHub flow][5] 가 생겨났다. 우리는 여기서 좀 더 발전할 여지가 있다고 생각했고, 그래서 세부적인 내용을 꾸며 Gitlab Flow 를 마련한 것이다.

### [Git flow][4] 와 그 문제점

<div style="width: 538px" class="wp-caption aligncenter">
  <a href="http://nvie.com/posts/a-successful-git-branching-model/"><img class="size-large" src="https://docs.gitlab.com/ce/workflow/gitdashflow.png" width="528" height="700" /></a>
  
  <p class="wp-caption-text">
    Git Flow (어지러워&#8230;)
  </p>
</div>

Git 브랜치를 어떻게 사용할지에 대한 초기 모델로 제시된 git flow 는 많은 주목을 받았다. master 브랜치와 분리된 개발 브랜치, 기능 브랜치, 릴리즈 브랜치, 핫픽스 (hotfix) 브랜치 를 기반한 모델이다. 개발은 각각의 개발 브랜치에서 진행되며, 개발이 끝나면 Release 브랜치로 합병된 뒤, 최종적으로 master 브랜치로 합병되는 모델이다.

Git flow 는 잘 정의된 표준이지만, 복잡한 구조로 인해 두 가지 문제를 야기시킨다.

**하나는 개발자가 master 가 아닌 별도의 개발 브랜치를 가져가야 하는 것인데**, master 는 단순히 제품화를 위한 예약 대기열에 지나지 않는다. 이건 master 를 기본 브랜치로 여기게 만들어, 여기서 브랜치가 생성되고 결과가 역으로 반영되게 한다. 대부분의 (git 관련) 도구가 master 브랜치를 기본으로 정했기 때문에, 다른 브랜치를 기본으로 바꿔야만 하는 일은 성가신 작업이 된다. <span style="background-color: #999999; color: #ffffff;">(역주 : 개발자가 실제로 한 곳에 모으는 develop branch와, 제품이 되는 master branch 사이가 괴리가 생기는데 master branch는 메인 브랜치여서 이 관념을 옮기기 쉽지 않다는 것이다. 단적인 예로, master branch 내용이 바뀌면 다시 develop branch 를 rebase 해야 하는 불편함이 있다.)</span>

두 번째 문제는, **핫픽스 브랜치와 릴리즈 브랜치에 있다**. 어떤 조직에서는 좋은 예가 될 수 있겠지만, 나머지 조직에게는 과할 정도로 많은 브랜치를 요구한다. 요즘 조직 대부분은 기본 브랜치에서 제품화될 수 있도록 지속적인 제품화 (continuouss delivery) 를 실행하고 있다. 이 말은, 핫픽스니 릴리즈니 하는 것들이 제품 발표 과정을 방해할 수도 있단 것이다.

일례를 든다면, 릴리즈 브랜치의 내용을 다시 역으로 반영해야하는 경우이다. 특화된 도구들이 이 문제를 해결해주기는 하지만, 더욱 복잡해진다. **빈번하게 개발자들은 실수를 저지르는데, 수정 내역들이 master에만 반영되는 상황도 생길 수 있다. (개발 브랜치에는 반영되지 않았는데도 말이다!)** 문제의 근원은, git flow 자체가 너무 복잡하기 때문이다. 그리고 마찬가지로 핫픽스 수정 작업 자체가 릴리즈 작업이 자동으로 될 수 없기 때문이기도 하다.

<span style="background-color: #ebf9ff; color: #000000;"><strong>요약</strong> : Git Flow는 거의 모든 조직이 사용해도 무방할 정도의 높은 커버리지를 목적으로 한 방법 제시에 지나지 않는다. 이 모델을 그대로 따르면 아마 가랑이가 찢어질 듯&#8230;</span>

### 단순한 대안 : [GitHub Flow][6]

<div style="width: 390px" class="wp-caption aligncenter">
  <a href="http://scottchacon.com/2011/08/31/github-flow.html"><img class="size-large" src="https://docs.gitlab.com/ce/workflow/github_flow.png" width="380" height="467" /></a>
  
  <p class="wp-caption-text">
    단순한 GitHub Flow
  </p>
</div>

GitHub Flow 는 git flow 보다 더욱 단순한 모델을 찾고자 하는 요구로 만들어졌다. 기존 master 브랜치에 더불어, feature 브랜치밖에 없다. 엄청 단순하고 깔끔해서, 많은 조직에서 이 방법을 채택해 성공적인 프로세스로 쓰고 있다. [Atlassian][7] <span style="background-color: #999999; color: #ffffff;">(역주 : Confluence, JIRA, BitBucket 등의 소프트웨어 협업 도구 제작 회사)</span> 이 [해당 방법과 유사한 모델][8]을 추천하고 있는데, feature 브랜치를 master에 rebase 하는 차이점이 존재한다.

모든 것을 master 에 넣고 제품을 자주 발행하는 작업은, 린 (Lean) 과 지속적인 발행이 가장 모범적인 사례라는 방침에 따라 재고 코드 (code in inventory) 를 최소화하자는 의미이다. 하지만 이런 플로우 역시 제품 출시나 환경, 릴리즈, 이슈 통합에 대해 풀리지 않는 많은 문제를 남기고 있다.

<span style="background-color: #ebf9ff; color: #000000;"><strong>요약</strong> : 간단해서 좋지만, 너무 단순하다. 이렇게 Master를 메인 스트림으로 삼게 되면, 여러 버전의 제품을 관리하는 조직에서는 쓸 수 없는 모델. (v4.0 까지 진행되었는데, 갑자기 v3.0 버전의 버그를 수정해서 패키징을 해야 한다면? 으악.)</span>

### Gitlab Flow (1) 생산 브랜치

<div style="width: 348px" class="wp-caption aligncenter">
  <a href="https://docs.gitlab.com/ce/workflow/gitlab_flow.html"><img class="size-large" src="https://docs.gitlab.com/ce/workflow/production_branch.png" width="338" height="549" /></a>
  
  <p class="wp-caption-text">
    Gitlab Flow (1) Production Branch
  </p>
</div>

GitHub Flow 는, 개발자가 Feature branch 를 merge 할 때 마다 제품으로 출시할 수 있다는 사실을 가정한다. SaaS 어플리케이션 같은 경우엔 가능하겠지만, 대부분은 그렇지 못할 것이다. 단적인 예로, 언제 릴리즈해야 할지 결정하지 못하는 상황이 그렇다. iOS 개발자는 App Store 의 승인을 받아야 하기 때문이다. 개발자가 속한 곳이 출시 구간 (deployment windows, 예를 들면 운영 팀이 일하는 10시에서 4시 사이)을 정했는데, 이 시간 외에 기능을 추가했을 때도 그렇다.

이런 경우, 생산 브랜치 (Production Branch) 에 코드를 반영해 두고 제품화되기를 기다리면 된다. 생산 브랜치에 반영된 내역이 곧 제품에 반영되는 내역과 일치한다.

<span style="background-color: #ebf9ff; color: #000000;"><strong>요약</strong> : GitHub 모델과 뭐가 다른지 구별이 잘 안갈텐데, 그림을 잘 보면 master의 세 번째 commit 은 아직 릴리즈에 반영되지 않은 것이다. 즉, 실제 릴리즈를 운영하는 조직이 존재하거나, 릴리즈와 개발이 구분되는 조직이라면 이 방법이 낫다. CI/CD 쓰기도 좋고. </span>

### Gitlab Flow (2) 환경 브랜치

<div style="width: 570px" class="wp-caption aligncenter">
  <a href="https://docs.gitlab.com/ce/workflow/gitlab_flow.html"><img class="size-large" src="https://docs.gitlab.com/ce/workflow/environment_branches.png" width="560" height="618" /></a>
  
  <p class="wp-caption-text">
    Gitlab Flow (2) Pre-production Branch
  </p>
</div>

개발자 여러분이 현재 스테이징(제품 출시 직전 단계 = 최종 점검 단계) 을 계획한다면, 선-생산 (Pre-Production) 브랜치와 실제 생산 브랜치가 필요할 것이다. 이 경우, master 내용이 스테이징 상태가 된다고 하자. 누군가가 스테이징 된 내용을 제품화하고자 하는 경우엔

&nbsp;

 [1]: https://docs.gitlab.com/ce/workflow/gitlab_flow.html
 [2]: https://en.wikipedia.org/wiki/Feature-driven_development
 [3]: http://martinfowler.com/bliki/FeatureBranch.html
 [4]: http://nvie.com/posts/a-successful-git-branching-model/
 [5]: http://scottchacon.com/2011/08/31/github-flow.html
 [6]: https://guides.github.com/introduction/flow/index.html
 [7]: https://ko.atlassian.com/
 [8]: http://blogs.atlassian.com/2014/01/simple-git-workflow-simple/