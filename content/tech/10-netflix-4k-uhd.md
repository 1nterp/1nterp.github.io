+++
author = "InterP"
categories = ["Tech"]
date = 2022-07-03T21:23:40Z
description = ""
draft = true
image = ""
tags = ["netflix", "4K", "windows10"]
title = "윈도우 10에서 Netflix 4K UHD 재생하기"
url = "/netflix-4k-uhd-windows-10/"

+++
## 기본 요구사항

4K/UHD를 보려면 당연히 이 부분이 필요하다.

* UHD 스트리밍이 가능한 멤버십에 가입해야 함
* HDCP 2.2 를 지원하는 4K 해상도 (3840x2160) 모니터

4K 해상도가 아닌 QHD (2560x1440) 모니터이거나 WQHD 모니터의 경우라면 아쉽지만 '정석적인 방법' 으로는 볼 수 없다. 하지만 아래 '히든 팁 1' 방법을 통해 시청이 가능하다!

## 시스템 요구사항

[Netflix 고객센터 페이지](https://help.netflix.com/ko/node/23931?ba=SwiftypeResultClick&q=uhd)를 보면, 'UHD로 넷플릭스 즐기기' 를 누르면 여러 요구사항이 나오는데, 요약하면 아래와 같다.

* Windows 10/11
* [HEVC 비디오 확장 프로그램](https://apps.microsoft.com/store/detail/9NMZLZ57R3T7?hl=ko-kr&gl=KR)이 설치되어야 함 (대부분의 컴퓨터에선 무료로 내려받을 수 있으나, 일부에선 유료 (1200원))
* [넷플릭스 윈도우 앱](https://apps.microsoft.com/store/detail/netflix/9WZDNCRFJ3TJ) 또는 [Microsoft Edge](https://www.microsoft.com/ko-kr/edge) 가 설치되어야 함
* CPU 에 내장된 GPU 를 사용하는 경우 : Intel 7세대 이상 / AMD Ryzen
* 별도 그래픽카드를 사용하는 경우 : 최소 3GB 이상의 NVIDIA Pascal 또는 Geforce 1050 이상의 NVIDIA GPU, 또는 AMD Radeon RX 400 시리즈 이상의 AMD GPU
* 초당 최소 15메가비트 이상의 안정적인 인터넷 연결 (연결 속도는 [fast.com](https://fast.com) 에서 테스트 할 수 있다.)
* 계정의 스트리밍 옵션을 '자동' 또는 '고화질' 로 설정

## 4K 로 재생될 수 있는지 알아보는 방법.
넷플릭스를 켠 다음에, "4k" 라고 검색하면 4K 미디어가 전부 검색된다. 아무거나 하나를 클릭해 'HD' 아이콘이 아닌 'ULTRA HD' 아이콘이 활성화되면 성공!

(그림 필요)

## 히든 팁 1. 가상 해상도 설정

모니터가 지원하는 것 보다 더 높은 해상도를 GPU 에서 가상으로 지원하는 모드이다. 내장 그래픽 카드에서는 옵션이 있는지 잘 모르겠다. 

### NVIDIA
NVIDIA 제어판 (Control Panel) 에서 설정한다.

### AMD
..

### 윈도우에서
..

## 히든 팁 2. DP 케이블? HDMI 케이블!
[컴터맨님의 포스트](https://comterman.tistory.com/2200)에서 도움을 받았는데, 나 역시도 DP 케이블에서 가상 해상도를 설정해도 4K 를 볼 수 없었다. HDMI 로 바꿔 끼웠더니 와우! 

DP 케이블 버전을 타는 것일지도 모르겠지만.. 참고로 모니터는 Dell 에서 나오는 38인치 WQHD 모니터 ([U3821DW](https://www.dell.com/en-us/work/shop/dell-ultrasharp-38-curved-usb-c-hub-monitor-u3821dw/apd/210-ayle/monitors-monitor-accessories)) 이고 단자는 HDMI 2.0 까지만 지원한다. 테스트에 사용한 케이블은 굴러다니던 닌텐도 스위치 정품 HDMI 케이블을 사용했다. 