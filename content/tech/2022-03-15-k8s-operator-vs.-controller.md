---
title: k8s Operator vs. Controller
author: interp
date: 2022-03-15 02:44:57 +0000
url: /kubernetes-operator-vs-controller/
aliases: 
- /entry/kubernetes-operator-vs-controller/
categories:
    - Tech
tags:
  - k8s
  - controller
  - operator
preview: ""
draft: ""
---
쿠버네티스에서 서비스를 개발하거나 운영하다 보면 자주 접하게 될 개념 중 하나가, 바로 이 Controller 와 Operator 일 것이다. 어떤 경우에는, 동일한 서비스를 두고 '이건 Controller 야' 라고 말 할 때도 있고 '이 Operator 는...' 이라고 불릴 때도 있어서 헷갈릴 수 있다. 심지어 공식 문서에서도 두 개념에 대한 비교는 하지 않고 있어서 명확한 구분이 필요한 것 같다.

와중에 [이 문서](https://blog.marcnuri.com/kubernetes-operator-vs-controller)를 발견했는데, 요약하자면 이렇다.

### Controller

> So in the Kubernetes world, a controller will basically **monitor and measure the cluster resources state to adjust those resources that diverge from the desired state**.

더 줄여보면, Controller 는 (1) K8s 리소스 (중 일부) 의 상태를 체크하고 (2) 이 리소스들의 상태를 '목표 상태 (desired state)' 로 조정하는 역할을 한다.

`ReplicaSet`, `StatefulSet`, `DaemonSet` 이 대표적인 Controller 들이다. 속해 있는 Pod 들의 상태를 '목표한 상태' 로 조정하려고, Pod 을 추가하거나 삭제한다.

### Operator

CoreOS 에서 정의하는 Operator 는 다음과 같다.

> *An Operator is **a method of packaging, deploying and managing a Kubernetes application.***

그런데 이 개념을 구현하기 위해서는 필연적으로 Controller 가 들어가게 된다. 그렇다면 Controller 와 비교했을 때 Operator 의 차이점은 무엇일까?

저 'Kubernetes application' 에서 말하는 것은, 사용자가 직접 지정할 수 있는 CRD (Custom Resource Definition) 과 거기서 파생된 CR (Custom Resource) 까지 포함하고 있는 것이다. 아니면 정말 bare application 형태로 특정 microservice 를 관리할 때도 Operator 라고 부를 수 있겠다.

예를 들면, Orange 라는 CRD 를 하나 만들었고, 이 Orange CR 에는 1개의 `Service` 와 1개의 `Pod` 이 만들어져야 한다고 해보자. 그러면 Orange CR 을 관리하는 application 을 가리킬 때는 Orange ***Operator\*** 라고 부를 수 있다. 하지만 내부에 구현된 Reconcile Loop Code 는 일종의 Orange ***Controller\*** 라고도 부를 수 있는 것이다. 실제로 Service 와 Pod 을 만드는 역할은 이 Controller 에서 이뤄지지만, 전체적으로 Orange CR 의 명세를 관리하는 것은 전체 Operator 가 담당하는 것이다.

{{< adsense1 >}}

### 정리하면

나에게 Controller 는 기술적인 개념이고, Operator 는 좀 더 포괄적이면서 논리적인 개념으로 받아들여진다. [문서](https://blog.marcnuri.com/kubernetes-operator-vs-controller)에서도 '모든 Operator 는 CR 을 관리하기 위해 쓰이는 Controller 라고 부를 수 있다.' 라고 하고 있으니까 말이다.

그리고 Controller 나 Operator 모두 어떤 프레임워크일 뿐이지, 언어에 국한된 것은 아니라고 언급한다. Go 언어와 Python 으로 모두 구현해 본 경험이 있는 나 역시, 이 부분에 동의한다. 

다만 용어를 선택하거나 접할 때 좀 더 이해를 확실히 할 목적으로 정리하는게 더욱 낫지 않을까 하는 마음에, 이 비교글을 마친다.