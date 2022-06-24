+++
author = "InterP"
categories = ["Tech"]
date = 2022-06-24T03:01:26Z
description = "웹 페이지를 읽어내려가며 표시하는 듯한 강조 효과를 적용해 보자"
draft = true
image = ""
tags = ["highlight", "js"]
title = "손글씨 쓰듯 웹 문서 강조하기 - Rough Notation"
url = "/rough-highlight-js/"

+++
GeekNews 를 보다보니 Atlassian JIRA/Bitbucket 가 너무 구려서 못 써먹겠다는 코멘트를 모아 둔 사이트를 발견했다. (사이트 주소도 비범하게 [https://ifuckinghatejira.com/](https://ifuckinghatejira.com/ "https://ifuckinghatejira.com/") 이다..!) 

> 개인적으로 Confluence 사용에 익숙해져서 큰 불만은 없지만, Issue Tracker 로는 Github/Gitlab 을 쓰는게 백번 낫다는 입장이기는 하다 ㅎㅎ 

아무튼, 이 사이트 페이지에 나와있는 강조 표현이 애니메이션으로 차례차례 이뤄지고 있는 게 눈에 띄었다. 그것도 반듯한 모양이 아니라, 마치 사람이 수작업으로 글을 읽어내려가면서 표시하는 것 처럼 친숙해 보였다. 당장 F12 키를 눌러서 어떤 스크립트가 쓰여졌는지 확인해 봤다.

공식 사이트는 [https://roughnotation.com/](https://roughnotation.com/ "https://roughnotation.com/") 이고, 다양한 효과를 'ANNOTATE' 버튼을 눌러 라이브로 볼 수 있다. 밑줄, 네모, 동그라미, 하이라이트, 취소선, X선 등의 효과가 가능하며, 애니메이션 없이도 지정이 가능하다고 한다.