---
date: 2024-07-09 09:56:16 +0900
title: Github Workflow 로 PR Comment 등록하기
description: 실행해서 출력한 내용을 그대로 등록해 보자!
# image: feature.jpeg
# image_y: "20%"
url: /github-workflow-pr-comment
tags:
- Github
- Workflow
- Action
categories:
- Tech
---

현재 하고 있는 작은 프로젝트는, 변경 내용을 main branch 에 반영하고 나서 추가 작업이 이루어지는 구조를 하고 있다. 문제는 이 _'추가 작업'_ 을 Pull Request 에서 진행하더라도, main branch 와 working branch 사이에 어떤 결과물 차이가 있는지 눈으로 확인하기가 쉽지 않았다. 그래서, 아예 두 branch 에서 작업을 진행시키고, 진행한 결과를 diff 로 확인하면 어떨까 싶었다. 

Pull Request (PR) 를 등록할 때, Github Workflow 를 이용해서 PR Comment 를 등록하는 방법을 찾아보았다. 이 글에서는, Github Workflow 에서 실행한 결과물을 그대로 PR Comment 로 등록하는 방법을 소개한다. 

# 언제 실행되어야 할까
```yaml
name: Data Check on PR

on:
  pull_request:
    paths:
      - 'data/**'
```
`data/**` 내용이 변경되는 PR 인 경우에만 해당 Workflow 가 작동하도록 했다.

# 두 개의 checkout
```yaml
jobs:
  check-data:
    runs-on: self-hosted
    steps:
      - name: Checkout main branch
        uses: actions/checkout@v4
        with:
          ref: main
          path: main-branch

      - name: Checkout PR branch
        uses: actions/checkout@v4
        with:
          path: pr-branch
```
두 개 버전으로 checkout 을 받아, `main-branch` 와 `pr-branch` 경로에 각자 두기로 했다. 그리고 아래와 같이 `working-directory` 로 구분된 '추가작업' 을 실행했다.

```yaml
      - name: Run 'task' on main branch
        run: ... do something ...
        working-directory: ./main-branch

      - name: Run 'task' on PR branch
        run: ... do something ...
        working-directory: ./pr-branch
```

# Diff 출력하기
두 결과가 각각 `main-branch/result` 와 `pr-branch/result` 에 저장되었다면, 이를 diff 로 출력해보자.

```yaml
      - name: Diff
        id: diff
        run: |
          diff -bur main-branch/result pr-branch/result > diff.txt || true
          if [ -s diff.txt ]; then
            echo "diff_exists=true" >> $GITHUB_ENV
          else
            echo "diff_exists=false" >> $GITHUB_ENV
          fi
          echo 'DIFF_REPORT<<EOF' > $GITHUB_OUTPUT
          echo "\`\`\`diff" >> $GITHUB_OUTPUT
          cat diff.txt >> $GITHUB_OUTPUT
          echo "\`\`\`" >> $GITHUB_OUTPUT
          echo 'EOF' >> $GITHUB_OUTPUT
```
하나씩 설명하면,

- `diff -bur` 은 디렉토리 내부 파일들을 재귀적으로 비교해서 (`-r`) 공백은 무시하고 (`-b`) Unified diff 로 (`-u`) 출력한다.
- `|| true` 는 diff 결과가 없어서 종료코드가 1 이 되는 경우를 무시한다. 이게 없다면, 해당 Step 은 실패한다!
- `if [ -s diff.txt ]` 는 diff 결과가 있으면, `diff_exists=true` 를 환경변수로 저장한다. 이 때 사용하는 `$GITHUB_ENV` 는 Workflow 내에서 사용할 수 있는 환경변수를 저장하는 공간이다. ([예제](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#example-of-writing-an-environment-variable-to-github_env))
- `echo 'DIFF_REPORT<<EOF'` 이하 내용들은, `$GITHUB_OUTPUT` 에 저장된 내용을 `$DIFF_REPORT` 라는 사용자 환경변수에 저장한다는 의미이다. 이는 Workflow 내에서 출력할 수 있는 변수로, 이를 이용해서 PR Comment 에 출력할 수 있다. ([예제](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#example-masking-a-generated-output-within-a-single-job))
  - 여기서 markdown syntax 를 한꺼번에 적용하기 위해서 \```diff 와 ``` 를 앞뒤로 미리 출력했다.  

# PR Comment 등록
이번에는 `github-script` 를 사용한다. 그렇기 때문에 `GITHUB_TOKEN` 등록이 필요하다. 자세한 내용은 [이 블로그](https://zeddios.tistory.com/1047)에 정리가 잘 되어 있다.

```yaml
      - name: Upload diff to PR comment
        if: env.diff_exists == 'true'
        uses: actions/github-script@v7
        env:
          DIFF_CONTENTS: ${{steps.diff.outputs.DIFF_REPORT}}
        with:
          github-token: ${{ GITHUB_TOKEN }}
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: process.env.DIFF_CONTENTS
            })
```

