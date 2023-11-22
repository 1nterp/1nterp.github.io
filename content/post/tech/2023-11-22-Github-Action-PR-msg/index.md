---
title: "Github Pull Request 리뷰 요청 자동화하기"
description: "feat. Github Actions, Slack, Github GraphQL API"
author: InterP
date: 2023-11-22 21:38:53 +0900
url: /github-actions-pr-review-request
categories:
- Tech
image: feature.jpg
# image_y: "20%"
tags:
- Github
- Github Actions
- Slack
- GraphQL
---

Github 에서 Pull Request 를 생성하면, CI/CD 파이프라인을 통과해서 리뷰 받을 준비를 마쳤음에도 여전히 오픈되어 있는 경우가 있다. 스크럼 회의 시간에 리뷰를 요청해 보기도 하고, 직접 메시지를 보내기도 하지만.. Pull Request 가 많은 경우엔 이런 작업이 여간 귀찮은 일이 아니다.

~~답답해서 내가 뛴다는 마음으로~~ Github Actions 를 이용해, Pull Request 가 특정 조건을 만족하면 매일 아침 팀 Slack 채널에 '리뷰 요청' 메시지를 보내는 Workflow 를 만들어 보기로 했다. 여기서는 Github Action 이나 Workflow 소개 없이, 문제 해결 과정만 적어 두었다.

# 대상 Pull Request 조건
- Open
- Approval 을 받지 않음
- 마지막 커밋에서 CI/CD 파이프라인을 통과함
- `Ready for review` 레이블이 존재함

# Workflow 기본 구조
우선 ~~ChatGPT의 도움을 조금 받아~~ 다음 2개의 Step 이 포함된 Job 을 지정하는 것부터 출발했다.
```yaml
name: Notify PR Review Request

on:
  schedule:
    - cron: '0 0 * * *' # 매일 00:00

jobs:
  notify:
    steps:
      - name: Get Pull Requests
        id: pulls
        uses: actions/github-script@v6
        with:
          github-token: ${{secrets.GITHUB_TOKEN}}
          script: |
            // ...
            // return ...

      - name: Send Slack message
        if: steps.pulls.outputs.result != ''
        uses: 8398a7/action-slack@v3
        with:
          status: custom
          custom_payload: |
            ${{ fromJSON(steps.pulls.outputs.result) }}
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```
`actions/github-script` 와 `8398a7/action-slack` 을 사용했고, 각각 `$GITHUB_TOKEN` 과 `$SLACK_WEBHOOK_URL` Variable 을 필요로 한다. 

Github Token 은 [이미 내장되어 있지만](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#about-the-github_token-secret), Slack Webhook URL 은 직접 생성해서 등록해야 한다.

# Slack App 생성

Slack Workspace 에 App 생성이 가능한 계정에 로그인 되어 있다면, 다음을 따르면 된다.
1. [다음 링크](https://api.slack.com/apps?new_app=1) 로 이동
1. 'From scratch' 를 선택
1. App 이름을 지정하고, 대상 워크스페이스를 선택
1. App 화면이 뜨면, 'Features > Incoming Webhooks' 을 선택
1. 페이지 하단에 'Add New Webhook to Workspace' 를 클릭
1. 채널을 추가하면 채널의 Webhook URL 을 확인할 수 있다.

{{< callout text="'Display Information'에서 App 아이콘과 이름을 자유롭게 선택할 수도 있으니 참고하자." emoji=":potted_plant:" >}}

이제 이 Webhook URL 을 Github Secret 으로 등록하면 된다. *Settings > Secrets and variables* 에서 등록이 가능하며, 위에서 지정한 것 처럼 `SLACK_WEBHOOK_URL` 이라는 이름으로 등록하면 된다.

# REST API? GraphQL API!
첫 번째 step 인 `actions/github-script` 을 채워보자. 

REST API 를 활용한 함수를 사용하는 방법과, GraphQL 을 짜서 한 번에 쿼리하는 방법이 있다. 코드가 좀 더 간결해질 것 같아 두 번째 방법을 사용했는데, 첫 번째 방법을 통해 순차적으로 쿼리하는 것도 물론 가능하다. 

GraphQL 에 대해 잘 모르겠다면, [이 문서](https://graphql-kr.github.io/learn/) 를 참고하자. Github GraphQL API 에 대한 자세한 내용은 [이 문서](https://docs.github.com/ko/graphql) 도 참고하자.

우선, 대상이 되는 정보(*제목, URL, 리뷰 상태, 레이블, 최근 커밋의 상태*) 를 모두 뽑아와야 하므로, 아래와 같은 쿼리가 필요하다.
```graphql  
query {
    repository(owner: "${context.repo.owner}", name: "${context.repo.repo}") {
        pullRequests(states: OPEN, first: 100) {
            nodes {
                title
                url
                reviewDecision
                labels(first: 10) {
                    nodes {
                    name
                    }
                }
                commits(last: 1) {
                    nodes {
                        commit {
                            statusCheckRollup {
                                state
                            }
                        }
                    }
                }
            }
        }
    }
}
```
이 쿼리는 현재 담당하는 프로젝트 크기에 맞춰 몇 가지 제약을 뒀다. Open 된 Pull Request 가 100개를 넘지 않고, Label 이 10개 미만으로 추가되는 프로젝트 환경이어야 유효하다. 커다란 프로젝트에서는 참고해야 한다.

여기 `repository` 를 지정할 때 `${context.repo}` 의 값을 썼는데, 이는 `github-scripts` 에서 제공하는 변수이다. 자세한 내용은 [이 소스코드](https://github.com/actions/toolkit/blob/main/packages/github/src/context.ts) 를 참고해도 되지만, 지금은 '*현재 project 의 owner/repo 이름*' 을 의미한다고만 알아두자.

# Github Scripts 완성

이제 GraphQL 을 사용해서 쿼리를 실행하고, 결과를 필터링해 Map 형태로 반환해보자. 참고로 `github-scripts` 는 Javascript 를 사용한다.
```yaml
      - name: Get Pull Requests
        id: pulls
        uses: actions/github-script@v6
        with:
          github-token: ${{secrets.GITHUB_TOKEN}}
          script: |
            const query = `...` // 위의 GraphQL 쿼리

            const result = await github.graphql(query);
            const prs = result.repository.pullRequests.nodes;

            const filteredPRs = prs.filter(pr =>
              pr.reviewDecision !== 'APPROVED' &&
              pr.labels.nodes.find(label => label.name === 'Ready for review') &&
              pr.commits.nodes[0].commit.statusCheckRollup.state === "SUCCESS"
            );

            if (filteredPRs.length > 0) {
              // Slack message block 생성
            }
```
`filteredPRs` 에는 위에서 정의한 조건을 만족하는 Pull Request 들이 담긴다. 이제 이 정보를 Slack message block 으로 만들어서 보내면 된다.

# 통합 문제

여기서 두 가지 난관이 있었는데, 
- Step 간에 JSON 으로 정보 교환이 가능한가
- Slack message 를 일반 텍스트가 아니라, 멋지게 만드려면 어떻게 해야 하는가

첫 번째는 쉽게 해결했다. `fromJSON()` 을 활용하면 `github-scripts` 에서 반환되는 (따옴표가 전부 escape 된) JSON String 을 그대로 받아다 쓸 수 있었다. 더욱 자세한 내용은 [블로그 문서](https://github.blog/changelog/2020-04-15-github-actions-new-workflow-features/#expressions-in-jobcontinue-on-error) 를 참고하자.

두 번째가 조금 어려웠는데, 결국 찾았다. 다음 매뉴얼과 Playground 페이지를 통해 Slack 의 (Block-kit 이라고 하는) custom message 구조를 이해하고 만들어 볼 수 있었다.

- 매뉴얼: https://api.slack.com/reference/block-kit
- Playground: https://api.slack.com/tools/block-kit-builder

그러면 문제는 좀 더 간단해진다.
1. `github-scripts` 에서는 Slack Message 구조를 전부 만들어서 JSON 으로 내보내고
1. `action-slack` 에서는 JSON 자체를 받아서 출력하면 된다.

## Slack message 구조 생성

다시 `github-scripts` step 으로 돌아가 보자. 제일 처음에 헤더가 되는 block 을 미리 지정한다.
```javascript
  let blocks = [
    {"type": "header", "text": {"type": "plain_text", "text": ":eyes: PR 목록"}},
    {"type": "divider"}
  ];
```

그 다음, `filteredPRs` 결과가 존재하는 경우에 `blocks` 안에 메시지를 채워넣는다.
```javascript
  if (filteredPRs.length > 0) {
    // Slack message block 생성
    blocks.push({
      "type": "section",
      "text": { "type": "mrkdwn", "text": filteredPRs.map(pr => `• <${pr.url}|*${pr.title}*> `).join("\n") }
    });
  }
```

마지막으로, `blocks` 를 반환하면 된다.
```javascript
  // 디버깅
  console.log(JSON.stringify({ blocks }));
  return JSON.stringify({ blocks });
```

## Slack Step 완성
`pulls` step 에서 반환된 값을 JSON 으로 변환해 그대로 넣는다. 맨 처음 Step 과 크게 달라진 것은 없다.
```yaml
      - name: Send Slack message
        if: steps.pulls.outputs.result != ''
        uses: 8398a7/action-slack@v3
        with:
          status: custom
          custom_payload: |
            ${{ fromJSON(steps.pulls.outputs.result) }}
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```
# 마무리 작업
이제 작업은 끝났고 테스트만 남았다.

## main 이 아닌, 특정 브랜치에서 Workflow 실행하기
우선, 위 workflow 에서 `on:` 절에 다음이 추가되어야 한다.
```yaml
on:
  workflow_dispatch: # 뭘 더 넣을 필요없이 이게 전부다.
```

나는 `gh` CLI 를 사용해서 로그인한 다음, 아래 명령어로 실행했다.
```bash
gh workflow run 'Notify PR Review Request' --ref {branch}
```

## Github Scripts 디버깅
문법 오류를 잡기 위해서는, Javascript Linter 가 작동하는 IDE 에서 먼저 작성한 다음, 옮겨오는 것을 추천한다. 

## GraphQL 디버깅
API 문서를 뒤져보면 Personal access token 을 사용해서 쿼리를 할 수 있는 방법이 존재한다. 원하는 값이 나오는지 확인한 뒤에 Github Scripts 에 적용해 주자.

---

이 Workflow 는 특정 이벤트 기반이 아니라, 주기적으로 실행되면서 상태를 직접 체크해야 하기 때문에 Workflow 가 복잡해 진 것 같다. 그래도 Github Actions 를 이용하면, 일일히 리뷰 요청을 하지 않아도 된다. Github Scripts 에서 반환되는 값을 어떻게 받아 처리할지도 사실 막막했는데, `fromJSON()` 을 사용하니 간단했다.

전혀 다른 문제를 Github Actions 로 자동화하려는 경우에도, 이 글이 여러모로 도움이 되었으면 좋겠다.

{{< figure src="image.png" align="center" width="70%">}}