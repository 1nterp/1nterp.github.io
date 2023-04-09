---
title: K8s Operator vs. Controller
author: interp
date: 2022-03-15 02:44:57 +0000
url: /kubernetes-operator-vs-controller/
aliases: 
- /entry/kubernetes-operator-vs-controller/
- /m/entry/kubernetes-operator-vs-controller/
categories:
    - Tech
tags:
  - K8s
  - controller
  - operator
preview: ""
draft: ""
---
쿠버네티스에서 서비스를 개발하거나 운영하다 보면 자주 접하게 될 개념 중 하나가, 바로 이 Controller 와 Operator 일 것이다. 어떤 경우에는, 동일한 서비스를 두고 '이건 Controller 야' 라고 말 할 때도 있고 '이 Operator 는...' 이라고 불릴 때도 있어서 헷갈릴 수 있다. 심지어 공식 문서에서도 두 개념에 대한 비교는 하지 않고 있어서 명확한 구분이 필요한 것 같다.

와중에 [이 문서](https://blog.marcnuri.com/kubernetes-operator-vs-controller)를 발견했는데, 요약하자면 이렇다.

# Controller

> So in the Kubernetes world, a controller will basically **monitor and measure the cluster resources state to adjust those resources that diverge from the desired state**.

더 줄여보면, Controller 는 (1) K8s 리소스의 상태를 체크하고 (2) 이 리소스들의 상태를 '목표 상태 (desired state)' 로 조정하는 역할을 한다.

`ReplicaSet`, `StatefulSet`, `DaemonSet` 이 대표적인 Controller 들이다. 이 리소스에 속해 있는 Pod 들의 상태를 '목표 상태' 로 만들기 위해, Pod 을 추가하거나 삭제한다.

# Operator

CoreOS 에서 정의하는 Operator 는 다음과 같다.

> An Operator is **a method of packaging, deploying and managing a Kubernetes application**.

그런데 이 개념을 구현하기 위해서는 필연적으로 Controller 가 들어가게 된다. 

그렇다면 Controller 와 비교했을 때 Operator 의 차이점은 무엇일까?

# Operator vs. Controller

여기에서 말하는 '*Kubernetes application*' 란, 사용자가 직접 지정할 수 있는 CRD (Custom Resource Definition) 과 거기서 파생된 CR (Custom Resource) 까지 포함하고 있는 것이다.

예를 들면, Orange 라는 CRD 를 하나 만들어 보자. 

```yaml
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: oranges.example.com
spec:
  group: example.com
  version: v1
  scope: Namespaced
  names:
    plural: oranges
    singular: orange
    kind: Orange
  subresources:
    status: {}
```
이 정의 (definition)를 가지고, `orange1` 이란 CR 을 하나 만들 수 있을 것이다.

특정 Orange CR 이 만들어지거나 수정될 때, 삭제될 때엔 뭘 해야 하는지 정의하는 코드를 만들 수 있을 것이다. 예를 들면, Orange CR 에는 1개의 `Service` 와 1개의 `Pod` 이 만들어져야 한다고 해보자. 그걸 Golang 으로 아주 간단히 표현하면,

```go
func (h *orangeHandler) Handle(ctx context.Context, req reconcile.Request) (reconcile.Result, error) {
	// Get the Orange instance
	orange := &examplev1.Orange{}
	if err := sdk.Get(ctx, req.NamespacedName, orange); err != nil {
		if errors.IsNotFound(err) {
			return reconcile.Result{}, nil
		}
		return reconcile.Result{}, errors.Wrap(err, "failed to get Orange instance")
	}

	// Create the Pod for the Orange instance
	pod := &corev1.Pod{
		ObjectMeta: metav1.ObjectMeta{
			Name:      orange.Name + "-pod",
			Namespace: orange.Namespace,
			Labels: map[string]string{
				"app": orange.Name,
			},
		},
		Spec: corev1.PodSpec{
			Containers: []corev1.Container{...},
		},
	}
	if err := sdk.Create(ctx, pod); err != nil {
		return reconcile.Result{}, errors.Wrap(err, "failed to create Pod")
	}

	// Create the Service for the Orange instance
	service := &corev1.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name:      orange.Name + "-service",
			Namespace: orange.Namespace,
			Labels: map[string]string{
				"app": orange.Name,
			},
		},
		Spec: corev1.ServiceSpec{
			Selector: map[string]string{
				"app": orange.Name,
			},
			Ports: []corev1.ServicePort{...},
			Type: corev1.ServiceTypeClusterIP,
		},
	}
	if err := sdk.Create(ctx, service); err != nil {
		// Error creating the Service
		return reconcile.Result{}, errors.Wrap(err, "failed to create Service")
	}
	return reconcile.Result{}, nil
}
```


이처럼 내부에 구현된 Reconcile Loop Code (특정 CR이 수정되는 이벤트를 관찰하고, 이벤트에 맞춰 코드를 실행하는 루프) 는 일종의 Orange ***Controller*** 라고도 부를 수 있다. (또는 이 코드가 실행되는 pod 도 controller 라고 볼 수 있다)

하지만 이렇게 Orange CR 을 *관리*하는 application 자체를 가리킬 때, 또는 이렇게 관리하는 전체 패턴을 Orange CR 의 ***Operator*** 라고 부를 수 있다. 바꿔 말해서, 실재하는 K8s 리소스인 Service 와 Pod 을 만드는 역할은 Controller 에서 이뤄지지만, Orange CR 의 명세를 관리하는 전체 과정은 Operator 라고 부를 수 있다.

{{< adsense1 >}}

# 정리하면

개인적으로 Controller 는 기술적인 개념이고, Operator 는 좀 더 포괄적이면서 논리적인 개념으로 받아들여진다. [문서](https://blog.marcnuri.com/kubernetes-operator-vs-controller)에서도 '*모든 Operator 는 CR 을 관리하기 위해 쓰이는 Controller 라고 부를 수 있다.*' 라고 하고 있으니까 말이다.

그리고 Controller 나 Operator 모두 어떤 프레임워크일 뿐이지, 프로그래밍 언어에 국한된 것은 아니라고 언급한다. 나 역시 Go 언어와 Python 으로 모두 구현해 봤기 때문이다. 다만 용어를 사용할 때 좀 더 확실히 이해하고 쓴다면 헷갈릴 여지가 없기를 바란다.