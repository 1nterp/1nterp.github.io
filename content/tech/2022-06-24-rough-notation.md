+++
author = "InterP"
categories = ["Tech"]
date = 2022-06-24T03:01:26Z
description = "페이지를 손으로 첨삭하는 듯한 강조 효과"
image = "/images/2022-06-24-68747470733a2f2f726f7567686e6f746174696f6e2e636f6d2f696d616765732f736f6369616c2e706e67.png"
tags = ["highlight", "js"]
title = "Rough Notation"
url = "/rough-highlight-js/"

+++
GeekNews 를 보다보니 Atlassian JIRA 와 Bitbucket 서비스가 <span class="rn-underline">너무 구려서 못 써먹겠다</span>는 코멘트를 모아 둔 사이트를 발견했다. (사이트 주소도 비범하게 [https://ifuckinghatejira.com/](https://ifuckinghatejira.com/) 이다..!)

> 개인적으로 Confluence 사용에 익숙해져서 큰 불만은 없지만, Issue Tracker 로는 Github/Gitlab 을 쓰는게 백번 낫다는 입장이기는 하다 ㅎㅎ

아무튼, 이 사이트 페이지에 나와있는 강조 표현이 애니메이션으로 차례차례 이뤄지고 있는 게 눈에 띄었다. 그것도 반듯한 모양이 아니라, 마치 사람이 수작업으로 글을 읽어내려가면서 표시하는 것 처럼 친숙해 보였다. 당장 F12 키를 눌러서 어떤 스크립트가 쓰여졌는지 확인해 봤다.

![Rough Notation main page](/images/2022-06-24-2022-06-24-131516.png "rough-notation-main-page")

공식 사이트는 [https://roughnotation.com/](https://roughnotation.com/ "https://roughnotation.com/") 이고, 다양한 효과를 'ANNOTATE' 버튼을 눌러 라이브로 볼 수 있다. 밑줄, 네모, 동그라미, 하이라이트, 취소선, X선 등의 효과가 가능하며, 애니메이션을 수행하지 않도록 지정할 수도 있다고 한다.

그리고 <span class="rn-circle">**여기서도**</span> 동일한 효과를 적용해 보았다!

<script type="module">import { annotate } from 'https://unpkg.com/rough-notation?module'; const n2 = document.querySelector('span.rn-circle'); const n4 = document.querySelector('span.rn-underline'); const a2 = annotate(n2, { type: 'circle', color: 'red', padding: 10 }); const a4 = annotate(n4, { type: 'highlight', color: '#ff0066', iterations: 1, multiline: true }); a2.show(); a4.show();</script>