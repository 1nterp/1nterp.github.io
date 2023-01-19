---
author: InterP
date: 2022-06-10T11:13:46+0900
tags: []
title: Synology NAS 재시작 시 Web Service 패키지 포털 문제
url: "/synology-package-portal-restart-problem/"
categories:
    - TechTech
image: ''
draft: true

---
## 환경

Synology NAS DS718+ 을 사용중이다. Docker container 로 Wordpress 를 하나 올렸고, 이를 외부에 노출시키기 위해 DSM 7 부터 사용 가능한 Web Service 의 패키지 포털 (Package Portal) 기능을 통해 외부 도메인과 container 를 연결해 뒀다.

## 문제

나는 24/7 NAS 를 돌리는 게 아니라서, 밤 시간이 되면 꺼 둔다. 그런데 재시작할 때 마다 Docker container 는 잘 떠 있는데 (내부망에서 접속도 테스트 완료했다), 이상하게 Web Service 에 설정되어 있던 패키지 포털 사이트의 상태는 'Service Disabled' 라고 나온다.

이걸 수동으로 해결하려면 (1) Docker container 재시작 (2) 패키지 포털 사이트 활성화 과정을 거쳐야 한다. 그러면 또 사이트 상태가 '정상' 으로 나오고, 접속도 잘 된다.

이걸 자동으로 복구할 수 있는지 백방으로 찾아봤다.

## 진행

일단 `/usr/syno/etc/packages/WebStation/Portal.json` 에 포털 정보가 들어 있다.

```json
                {
                        "acl" : null,
                        "compatible_crt_service" : null,
                        "compatible_crt_subscriber" : null,
                        "compatible_sc_section" : null,
                        "enable" : true,
                        "error_page" : "default",
                        "fqdn" : "-- 도메인 (가림) --",
                        "hsts" : true,
                        "http_port" : [ 80 ],
                        "https_port" : [ 443 ],
                        "id" : "19ee5c2c-5bc8-441f-bfbf-c36eddc67005",
                        "name" : "",
                        "preserve" : false,
                        "service" : "Docker-f72fecae304ce1ac1f3e11795e75320d884cf065ef515baa5eef96e357a65fed-80", // wordpress docker container service
                        "type" : "server"
                },
```

`/usr/syno/etc/packages/WebStation/WSResource.json` 에, 동일한 `id` 값을 한 친구가 있다. nginx 기반으로 virtual host 를 만들어 주는 것 처럼 보인다.

```json
{
    "portals" :
    {
        "19ee5c2c-5bc8-441f-bfbf-c36eddc67005" :
        {
            "nginx" :
            {
                "confd_configs" :
                [
                    ".service.19ee5c2c-5bc8-441f-bfbf-c36eddc67005.Docker-f72fecae304ce1ac1f3e11795e75320d884cf065ef515baa5eef96e357a65fed-80.conf"
                ]
            },
            "service" : "Docker-f72fecae304ce1ac1f3e11795e75320d884cf065ef515baa5eef96e357a65fed-80",
            "shortcut" : null
        },
```

일단 nginx 재기동은 안 된다. 하면 NAS 재부팅 말고는 답이 없다.

그리고 Web Station 에서 비활성화-활성화만 해도 문제 해결이 안 된다. 반드시 Docker container 가 재시작하고 나서야 먹힌다. 따라서 Docker container 재시작 이후에 어떤 시그널 (?) 을 줘서 포털 페이지 사이트까지 재활성화해야 한다. 이 커맨드를 찾을 수가 없다.

DSM 6.1 까지는 synoservicecfg 나 synoservice 가 있다는 말을 들었는데, DSM 7 에서는 이 CLI 도구가 존재하지 않는다. [이 글](https://www.synoforum.com/threads/synoservicecfg-replacement.5477/)을 따라가 보니, 결국 다음 명령으로 웹 서비스 자체를 재시작할 수는 있게 되었다.

    sudo docker restart wordpress-5.9.3
    sudo systemctl restart pkgctl-WebStation

이걸 합쳐두면 좀 괜찮을까? 한번 테스트해 보자.-> 안 된다! 