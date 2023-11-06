---
title: "Argo workflow 3가지 기본 개념"
description: "workflow, template, workflowtemplate..??"
author: InterP
date: 2023-11-06 13:41:01 +0900
url: /argo-workflow-intro
categories:
- Tech
image: feature.png
image_y: "20%"
tags:
- K8s
- Argo
- DAG
---

오픈소스인 [Argo workflow](https://argoproj.github.io/argo-workflows/) 는, 쿠버네티스 환경에서 Job 을 효율적으로 실행하기 위한 컨테이너 기반의 워크플로우 엔진이다. 

K8s 에서 이미 Job 이나 Cronjob 을 지원하지만, 각각의 Job (여기서는 template) 에 대한 상관관계 (dependency) 를 List 나 DAG 로 지정할 수 있고, 관련이 없는 Job들을 병렬로 실행할 수 있는 것은 물론, 실행 결과를 쉽게 추적할 수 있는 등의 다양한 기능을 추가로 지원한다.

여기서는 Argo 의 클러스터 설치는 건너뛰고, Argo 를 클러스터에서 사용할 때 갖춰야 할 기본 개념만 간단히 정리해 보았다.

# Workflow

[Core concepts](https://argoproj.github.io/argo-workflows/workflow-concepts/) 에서 소개된 대로, **Workflow** CR (custom-resource) 는 정적인 정의 리소스 (a static definition resource) 처럼 보이지만, 일종의 워크플로우 실행 '인스턴스' 로 취급된다. 어떤 것을 실행할지 정의해 두지만, 동시에 (Job 이나 Cronjob 처럼) Succeeded 와 같은 *상태*를 남기는 것과 같다고 보면 된다.

Workflow CR 에서 정의되는 '할 일 (Job)' 의 개념은 `spec.templates` 에서 정의된다. 할 일이 여러 개일 때, 작업 순서가 Step 형태인지, DAG 형태인지에 따라 steps 또는 tasks 라는 이름으로 세분화되기는 하지만, 기본적으로 Workflow 는 하나의 template 을 가진다고 생각하면 된다.

[Getting Started](https://argoproj.github.io/argo-workflows/walk-through/hello-world/) 에서 Hello World Workflow 를 심어보도록 하자. `kubectl` 을 이용해 Workflow CR 자체를 클러스터에 바로 적용해도 되고, `argo` CLI 명령을 이용해서 입력해도 된다.
```bash
# 둘 모두 결과는 같다.
kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-workflows/master/examples/hello-world.yaml
argo submit https://raw.githubusercontent.com/argoproj/argo-workflows/master/examples/hello-world.yaml
```
Workflow 확인은 argo CLI 를 쓰는게 편하다.
```bash
argo get @latest
```

# template

**template** 은 여섯가지의 타입으로 나뉘어 지는데, 여기 정리하는 것보다는 각각 매뉴얼을 보는게 훨씬 나을 것이므로 종류만 간단히 소개한다.

## [template 정의](https://argoproj.github.io/argo-workflows/workflow-concepts/#template-definitions)
아래 4가지는 모두 이름 (name) 이 반드시 포함되어야 한다.

- Container: docker image 를 내려받아, 클러스터 안에서 컨테이너를 확보해 `args` 를 실행한다. 
- Script: *Container* 와 유사하지만 `source` 에 정의된 스크립트 내용을 실행한다. Shell Script 나 Python 코드 블럭이 주로 사용된다.
- Resource: 클러스터 안에 있는 리소스를 직접 생성하거나 삭제한다. `manifest` 에 정의된 리소스를 생성하거나 삭제한다. 당연하게도 이 부분엔 제약이 있는데, 연결된 ServiceAccount 에 리소스를 제어할 수 있는 적절한 RoleBinding 이 걸려있어야 한다.
- Suspend: 단순히 Workflow 를 잠시금 멈추게 한다. 여기서 걸려서 쉬고있을 때 `argo resume` 을 통해 다음으로 진행이 가능하다. 

## [template 실행](https://argoproj.github.io/argo-workflows/workflow-concepts/#template-invocators)
앞서 정의해 둔 template 을 어떻게 실행할지 정의하는 부분이다. 따라서 `template:` 부분에는, 이미 정의된 template 이름을 참조하게 된다.

- Steps: 여러 개의 step 을 정의하고, 순차적으로 (혹은 병렬로) 실행한다. 
- DAG: 여러 개의 task 를 DAG 로 정의할 수 있다. 이 때 edge 는 template 의 이름이 아닌 task 의 이름이어야 한다.

# WorkflowTemplate

Argo 를 접하면서 가장 헷갈렸던 부분이 바로 **WorkflowTemplate** CR 이었다. 아까 들은 *template* 이랑 무슨 관계인가? 

[소개 페이지](https://argoproj.github.io/argo-workflows/workflow-templates/) 에서 짚어준 내용을 들여다 보면, 이 CR 은 Workflow 를 템플릿한다는 뜻이고 앞선 template 과는 관련이 적다는 점을 알 수 있다.

1. *WorkflowTemplate* CR 은 Workflow 를 재사용하기 위해 만든 CR 이다. 즉, Workflow 에서 '정적인 정의' 부분을 저장해두려고 만든 것이다.
2. *template* 은 Workflow 의 '할 일' 을 정의한 것이다. Workflow CR 도, WorkflowTemplate CR 도 한 개의 (또는 여러 개의) template 을 가지고 있어야 한다.

---

Argo workflow 에서 주로 사용되는 세 가지 개념을 먼저 짚어봤다. 다음에는 어떻게 workflow 를 관리하고 모니터링 할 수 있는지 CLI 와 UI 도구를 잘 써 봐야겠다.