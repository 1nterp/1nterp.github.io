---
title: "Mac 디스플레이 해상도 조절 팁"
description: "BetterDisplay 를 이용한 HiDPI, 주사율 미세 조정 꿀팁"
author: InterP
date: 2023-04-18 14:04:01 +0900
url: /mac-display-resolution-adjustment
categories:
- Tech
image: feature.png
image_y: "6%"
tags:
- Mac
- 디스플레이
- 해상도
- 주사율
---

내 Macbook M1 Pro 에는 두 개의 디스플레이가 있다.

- DELL U3818DW
- BenQ EX2780Q

{{< figure src="monitor.png" width="50%">}}

델 38인치 와이드 모니터는 주사율이 60Hz 밖에 지원되지 않지만, 벤큐의 27인치 모니터는 게이밍 답게 144Hz 까지 지원한다. ~~나름 들어줄 만한 스피커도 있어서 서브로 잘 쓰는 중이다~~ 

# 증상

그런데 이 '디스플레이' 옵션에서는 HiDPI 설정만 하면 주사율이 50Hz 까지만 올릴 수 있다. HiDPI 를 끄면 144Hz 까지 선택할 수 있는데 말이다.

내가 원하는 것은, 자글거리는 폰트를 두고 고주사율로 쓰는 게 아니라, HiDPI 이면서 144Hz 로 쓰고 싶었다. 좋은 방법이 없을까?

{{< figure src="problem.png" width="50%">}}

# 해결 (1) Better Display 설치

[Better Display](https://github.com/waydabber/BetterDisplay) 를 설치할 수 있다. 기본적으로 무료이고, 특정 기능을 사용하려면 구입해야 하지만 여기서는 무료 기능만 있어도 충분하다.

설치하고 실행하면, 아래와 같이 해상도, 주사율 설정이 가능하다. HiDPI 설정하고도 주사율을 144Hz 까지 올릴 수 있다!

{{< figure src="betterdisplay-option.png" width="70%">}}

참고할 점은, 아까 디스플레이 설정에서 HiDPI 를 선택하면 자동으로 주사율 50Hz 가 선택될텐데, 이 상태에서 Better Display 를 실행시키면 해상도가 모두 보이지 않는다. 이 때는 **주사율을 먼저 50Hz 보다 높은 값으로 변경**하면 된다. 그러면 해상도 옵션이 늘어난다.

# 해결 (2) 더욱 세밀한 HiDPI 해상도 설정

여기서 문제는, Better Display 를 해도 HiDPI 해상도 옵션이 몇개 없다는 사실이다. 나는 조금 더 큰 폰트 크기를 원했기 때문에, 두 개의 옵션 사이에 있는 중간 정도의 HiDPI 해상도를 원했다. 그렇다면 어떻게 해야 할까.

{{< figure src="all-resolution.png" width="50%">}}

1. 먼저 '디스플레이' 옵션에서 모니터를 선택한 뒤, '*모든 해상도 보기*' 를 클릭한다.
1. 원하는 HiDPI 해상도를 선택한다. (나는 두 가지 옵션의 사이에 있는 1920x1080 을 선택했다)
1. Better Display 에 가서, *아무것도 건드리지 말고* **주사율 (Refresh rate)** 만 144Hz 로 올린다.

그러면 원하는 해상도로 고주사율의 디스플레이를 사용할 수 있다!