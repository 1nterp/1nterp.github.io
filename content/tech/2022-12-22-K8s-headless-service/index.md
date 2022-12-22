---
title: "K8s Headless Service, 왜 필요한가"
description: "Service 의 역할과 목적을 알아보자"
author: InterP
date: 2022-12-22 11:13:12 +0900
url: /k8s-headless-service-why
categories:
- Tech
tags:
- K8s
- Service
---

K8s Resource 를 보거나 Helm Chart 를 보거나 헷갈리는 개념 중 하나가 바로 **'Headless Service'** 이다. 

{{< figure src="20221220_63a1afceb4826.jpg" width="40%" caption="흐라챠!">}}

머리가 없는 서비스를 ~~위 짤방처럼~~ 왜 만드는 건지부터 이해하려면, 먼저 서비스가 왜 필요한지 알아야 한다.

# 설명 먼저
공식 문서 설명을 먼저 보자. [영어 원문](https://kubernetes.io/docs/concepts/services-networking/service/#headless-services)과 [한국어 번역본](https://kubernetes.io/ko/docs/concepts/services-networking/service/#%ED%97%A4%EB%93%9C%EB%A6%AC%EC%8A%A4-headless-%EC%84%9C%EB%B9%84%EC%8A%A4)을 적절히 믹스했다.
> 로드 밸런싱 (Load-balancing) 이나 단일 서비스 IP 가 필요하지 않은 경우엔, "헤드리스" 서비스라는 것을 만들 수 있다. `.spec.clusterIP: None` 을 명시적으로 지정하면 된다.
>
> 이 헤드리스 서비스를 통해, 쿠버네티스의 구현에 의존하지 않고도 다른 서비스 디스커버리 메커니즘과 인터페이스할 수 있다.
>
> 헤드리스 서비스의 경우, 클러스터 IP가 할당되지 않고, kube-proxy가 이러한 서비스를 처리하지 않으며, 플랫폼에 의해 로드 밸런싱 또는 프록시를 하지 않는다. DNS가 자동으로 구성되는 방법은 서비스에 `selector` 가 정의되어 있는지에 달려있다.

나름 의역을 섞어가며 최대한 쉽게 풀려고 노력했지만... _죄송합니다._ 지금 읽어봐도 무슨 소리를 하는지 잘 모르겠다. 

아마도, 영어 설명에서 함의된 내용이 너무나 많기 때문인 것 같다.

---

내가 가장 마음에 들어하는 다른 설명을 가져와 봤다. 이번엔 [스택 오버플로우 답변](https://stackoverflow.com/questions/52707840/what-is-a-headless-service-what-does-it-do-accomplish-and-what-are-some-legiti)이다.

> Service 로 향하는 네트워크 연결은 결국 서비스 아래에 존재하는 여러 Pod 중 하나로 가게 될 겁니다. 그런데, **클라이언트가 Pod 1개가 아니라 모든 Pod 들과 통신해야 한다면요**? 만약 **같은 서비스 아래에 있는 Pod A 와 Pod B 가 서로 통신해야 한다면요**? 
>
> Service 를 통하는 건 확실한 방법은 아닙니다. 그럼 뭘까요?
>
> 모든 Pod 들과 통신해야 하는 클라이언트를 위해, 개별 Pod 의 IP 주소를 알아내는 게 필요하겠죠. 그러면 클라이언트가 K8s API Server 에 접속해서 해당 Pod 들의 IP 리스트를 얻어내는 방법이 있습니다. 이상적인 방법은 아닙니다. **여러분이 개발 중인 어플리케이션을 K8s Cluster 가 있는지조차 모르게 (K8s-agnostic) 만들고 싶어 하잖아요.**
>
> 다행히도, Kubernetes 는 클라이언트에게 Pod IP 리스트를 알려주는 방법을 DNS Lookup 을 통해 제공합니다. 대개는, 어떤 Service 를 위한 DNS Lookup 를 수행하면 DNS 서버는 IP 주소 1개를 반환합니다. 바로 Service 의 Cluster IP 죠. 그런데 여러분이 Service 를 만들 때 Cluster IP 가 필요 없다고 알려주면, DNS 서버는 (해당 Service 를 위한 DNS Lookup 요청에) 소속된 Pod IP 주소 목록을 전부 반환합니다. 즉, DNS A 레코드 1개가 아니라, 각각의 Pod 과 통신할 수 있는 A 레코드 여러 개가 반환되는 것이죠. 그러면 클라이언트는 간단하게 이 A 레코드를 순회하면서 다시 DNS Lookup 을 할 수 있고 실제 Pod 들의 IP 를 얻을 수 있습니다.

클라이언트 - Service - Pod 들이 있다고 하면, 클라이언트의 요청은 'Pod 중 하나' 만 받아서 처리하도록 중계하는 것이 Service 의 역할이다. 하지만 클라이언트가 'Pod 모두' 와 통신하고자 할 때는 이 방법은 못 쓰고, 그렇다고 API 서버에 물어서 IP 를 다 얻어오게 애플리케이션을 짜면 API 서버 위치에 의존적이게 되니 적절한 방법이 아닌 것이다. 

따라서 Cluster IP 를 없앤 Service 를 만들면 DNS Server 가 모든 Pod 들의 A 레코드를 직접 알려주는 (resolving) 것이다. 중계해 줄 Cluster IP 가 없으니, 이게 머리가 없는 Service 가 아니겠는가.

여기서 설명을 더 하진 않았어도, '_클라이언트_' 부분을 '_Pod A_' 라고 바꿔도 말이 된다. Pod A 가 소속된 다른 Pod 들과 통신할 때도 Service 의 주소를 가지고 DNS Lookup 하면 Pod 주소 목록이 나올 것이니, 거기서 자기 것은 빼고 쓰면 되는 것이다.

# 데모
사실 데모는 다른 블로그에서 많이 찾아볼 수 있어서, 최소한으로 재현 할 수 있는 방법을 알아보도록 하자.

## Deployment 생성
우리는 `nginx` 로 포트 오픈도 해 두고 `curl` 이나 `nslookup` 으로 Pod 간 통신을 체크해야 하니, `praqma/network-multitool` 이미지로 replica 3개의 deployment 를 하나 만들도록 하자.
```bash
kubectl create deployment test-deploy --image=praqma/network-multitool --replicas=3 --port=80
kubectl get pods -lapp=test-deploy -o wide
```
```
NAME                           READY   STATUS    RESTARTS   AGE   IP            NODE        NOMINATED NODE   READINESS GATES
test-deploy-7bff8c5f84-hxcfw   1/1     Running   0          24s   200.96.1.50   <blacked>   <none>           <none>
test-deploy-7bff8c5f84-rjdm9   1/1     Running   0          24s   200.96.0.59   <blacked>   <none>           <none>
test-deploy-7bff8c5f84-w5l8j   1/1     Running   0          24s   200.96.2.24   <blacked>   <none>           <none>
```
첫 번째 Pod 의 IP 가 `200.96.1.50` 이다. 두 번째 Pod 에서 첫 번째 Pod 으로 접속을 시도해 보자.
```bash
kubectl exec test-deploy-7bff8c5f84-rjdm9 -it -- curl 200.96.1.50:80 # test-deploy-7bff8c5f84-hxcfw 
```
```
Praqma Network MultiTool (with NGINX) - test-deploy-7bff8c5f84-hxcfw - 200.96.1.50 - HTTP: 80 , HTTPS: 443
<br>
<hr>
...
```
접속이 잘 된다. 하지만 여기 보이는 Pod IP 는 **언제든지 바뀔 수 있기 때문에** 이런 식으로 쓰면 안 된다.

## Headless Service 생성
이제 Headless Service 를 만들어보자. 이번에는 바로 만들지 말고 manifest 를 YAML 파일로 저장해 둔 다음에 수정이 좀 필요하다.
```bash
kubectl create service clusterip test-cs-svc --clusterip="None" --tcp=80:80 --dry-run=client -oyaml \
  > test-cs-svc.yaml
```
Headless 로 만드는 핵심 옵션이 바로 `--clusterip="None"` 라는 걸 알 수 있다. 여기서 출력되는 파일을 열어서, `spec.selector` 를 deployment 의 것으로 바꿔줘야 한다.
```yaml
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: test-cs-svc
  name: test-cs-svc
spec:
  clusterIP: None
  ports:
  - name: 80-80
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: test-deploy # test-deploy deployment 가 가지고 있던 app label
  type: ClusterIP
status:
  loadBalancer: {}
```
저장해 주고, 해당 YAML 파일을 적용하자.
```bash
kubectl apply -f test-cs-svc.yaml
```

## DNS Lookup 하기

이제 남은 일은 Service 의 domain name 을 가지고 DNS Lookup 을 한 결과를 받아오는 일이다. 

그런데, domain name 을 어떻게 아냐고? 마지막 참고 자료에 있는 [K8s DNS](https://kubernetes.io/ko/docs/concepts/services-networking/dns-pod-service/) 를 읽어봐도 좋지만, 직접 알아보기 위해서는 아까 생성한 Pod 에서 `/etc/resolv.conf` 가 어떻게 설정되어 있는지 확인하면 된다.
```bash
kubectl exec test-deploy-7bff8c5f84-rjdm9 -it -- cat /etc/resolv.conf
```
```
search default.svc.cluster.local svc.cluster.local cluster.local eu-central-1.compute.internal
...
```
여기 잘 보면, 해당 Pod 위치에서 요청하는 domain name 에 `default.svc.cluster.local` 을 자동으로 붙여서 resolving 하려는 걸 볼 수 있다. (default namespace 에 있는 모든 Pod 들이 똑같을 것이다) 

즉, 우리는 전체 domain name 을 알 필요가 없이 Service Name 만 가지고도 DNS Lookup 을 할 수 있다.

바로 Lookup 을 하러 가보자. 똑같이 `kubectl exec` 를 할 텐데, 이번에는 `nslookup` 을 해보도록 한다. domain name 은 그냥 Service Name 을 입력한다.
```bash
kubectl exec test-deploy-7bff8c5f84-rjdm9 -it -- nslookup test-cs-svc
```
```
Server:		200.64.0.10
Address:	200.64.0.10#53

Name:	test-cs-svc.default.svc.cluster.local
Address: 200.96.1.50
Name:	test-cs-svc.default.svc.cluster.local
Address: 200.96.0.59
Name:	test-cs-svc.default.svc.cluster.local
Address: 200.96.2.24
```
여러 개의 A 레코드로 이뤄진 Pod IP 목록을 얻을 수 있다. 그리고 `test-cs-svc` 처럼 Service Name 만 입력했을 뿐인데 `test-cs-svc.default.svc.cluster.local` 로 바뀐 것도 볼 수 있다.

## Head 를 달아주면요?
이번에는 `test-cs-svc-head` 라는 이름의 Service 를 하나 더 만들자. 단순히, `spec.clusterIP: None` 부분만 없는 `test-cs-svc` 나 다름없다. 아까 만들어 둔 파일에서 `metadata.name` 부분과 `spec.clusterIP` 부분만 바꿔서 `kubectl apply -f` 로 적용해 보자.

여기에 대고 똑같이 `nslookup` 을 해보자.
```bash
kubectl exec test-deploy-7bff8c5f84-rjdm9 -it -- nslookup test-cs-svc-head
```
```
Server:		200.64.0.10
Address:	200.64.0.10#53

Name:	test-cs-svc-head.default.svc.cluster.local
Address: 200.68.238.114
```
이 IP 는 어디서 왔을까? 바로 Service 의 Cluster IP 되시겠다.
```bash
kubectl get svc test-cs-svc-head
```
```
NAME               TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
test-cs-svc-head   ClusterIP   200.68.238.114   <none>        80/TCP    2m32s
```

## 주의할 점
`test-cs-svc` 나 `test-cs-svc-head` 는 DNS Lookup 에서는 차이를 보이지만, `curl` 결과는 차이가 없다. 더 자세히 말하면, **두 요청 모두 3개의 Pod 중 1개에만 랜덤하게 전달된다는 것이다.**

다음 명령들을 반복적으로 실행해 보자. 목적지 Pod 주소가 매번 다를 것이다.
```bash
kubectl exec test-deploy-7bff8c5f84-rjdm9 -it -- curl test-cs-svc:80 | head -2
kubectl exec test-deploy-7bff8c5f84-rjdm9 -it -- curl test-cs-svc-head:80 | head -2
```
왜 이렇게 되는 것일까? Headless Service 의 경우, DNS Lookup 하는 A 레코드 순서가 랜덤으로 전달되고 `curl` 은 그저 맨 위의 것을 쓰기 때문이다. `nslookup` 을 반복적으로 해 보면 보다 더 확실해 질 것이다.


# 이해를 돕기 위한 기초자료
혹시 아직도 이해가 잘 안된다면, 기초자료로 다음을 참고해보자. ~~혹은 [CKA 시험 준비]({{< ref "/tech/2022-01-18-CKA-exam-review.md">}})를 하는 것도 좋은 방법이다!~~
* [K8s Service](https://kubernetes.io/ko/docs/concepts/services-networking/service/)
* [K8s DNS](https://kubernetes.io/ko/docs/concepts/services-networking/dns-pod-service/)