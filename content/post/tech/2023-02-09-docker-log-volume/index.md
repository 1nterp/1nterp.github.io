---
title: "Docker Container 출력이 Disk 를 채운다"
description: "로그 (Log) 를 파일로 저장하는 Docker Daemon, 제어할 방법은?"
author: InterP
date: 2023-02-09 02:00:00 +0900
url: /docker-container-print-uses-disk
categories:
- Tech
image: feature.png
image_y: "53%"
tags:
- docker
- log
---

어느 날, GCP 에서 알람이 날아왔다. 테스트로 docker container를 하나 올려 둔 VM (Compute Engine) 에서 *Disk 가 꽉 차서 아무것도 할 수 없다*는 것이었다. 

디스크를 쓴다고? 이 container 는 mount 된 volume 도 없었고, container 가 하는 일은 소스에서 데이터를 받아 계산한 뒤 GCP Cloud Storage 에 저장하는 것 밖에 하지 않는데?

# 문제
Docker container 만 떠 있고 아무런 작업을 하지 않는 Host 의 **디스크 사용량이 계속해서 줄어든다.** 결국, 디스크를 100% 가까이 쓰게 되어 시스템을 마비시킨다.

# 진단
우선 해당 Host (VM 또는 on-premise) 에 접속해서 `df -h` 를 실행하자. `/` 경로에서 디스크 사용량이 압도적으로 많다면, 해당 문제에 접근한 것이다.

이제 이 부분을 실행해 보자. (root 가 아니라면, sudoer 권한이 필요하다)
```bash
sudo du -h -d 1 /var/lib/docker/containers
```
해당 경로에서 특정 container 의 디스크 사용량이 `df -h` 를 입력했을 때의 사용량과 비슷하다면, 이 친구가 문제다.

# 분석
그렇다면 왜 디스크를 쓰는 container 가 아닌데, 이렇게 디스크를 먹었던 것일까?

`docker logs` 를 입력하면 container 의 stdout/stderr 출력 내용을 볼 수 있다. **문제는, Docker daemon 은 별다른 지시가 없다면 container 가 출력하는 내용을 전부 디스크에 쓴다는 것이다.** 

바로 `/var/lib/docker/containers` 경로에 말이다!

<br/>

[Docker docs 페이지](https://docs.docker.com/config/containers/logging/configure/)에도 같은 내용을 경고하고 있다.

> **By default, no log-rotation is performed.** As a result, log-files stored by the default json-file logging driver logging driver can cause a significant amount of disk space to be used for containers that generate much output, which can lead to disk space exhaustion.

# 해결
container directory 를 지우는 것은, 문제를 완화하고 서비스를 잠시 정상으로 되돌려 놓을 순 있지만 진짜 해결책은 아니다. 

분석에서 말한 대로, container 가 출력하는 내용을 rotation 으로 기록하도록 만들어야 한다. 즉, *최근 출력만 기억하게 하고 오래된 것은 삭제하도록* 말이다.

먼저, `/etc/docker/daemon.json` 에 아래 내용을 넣는다. (없으면 만든다) 
```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```
container 가 출력하는 최신 내용을 JSON 포맷으로 10MB 씩 3개의 파일로 저장하고, 오래된 내용은 없애도록 하는 것이다. 원하는 값으로 수정하거나, [Docker docs 페이지](https://docs.docker.com/config/containers/logging/configure/) 를 참고해 다양한 설정으로 바꿔줘도 무방하다.

설정이 끝났다면, Docker daemon 을 재시작한다. 나의 경우엔 `sudo service docker restart` 로 재시작했다.

이후 container 를 다시 실행시킨 뒤, 출력이 쌓일 때 까지 기다렸다가 `/var/lib/docker/containers/` 에서 `{container_id}` directory 에 있는 `.log` 파일이 3개**만** 생성되어 있는지 확인하면 된다.