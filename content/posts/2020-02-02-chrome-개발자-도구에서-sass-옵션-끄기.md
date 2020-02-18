---
title: Chrome 개발자 도구에서 sass 옵션 끄기
author: interp
type: post
date: 2020-02-01T23:36:23+00:00
draft: true
private: true
url: /chrome-개발자-도구에서-sass-옵션-끄기/
categories:
  - 미분류

---
WordPress 테마 편집을 하다 보면 sass 파일을 따로 추가해 두고 style.css.map 으로 연결해 둔 것을 종종 볼 수 있다. 그런데 sass가 아니라 css를 편집하고자 할 때는 style.css.map 파일 때문에 Chrome 개발자 도구에서 sass 파일 위치를 알려주는 상황이 발생한다.

이를 끄려면 개발자 도구의 메뉴를 클릭해 `Settings -> Enable CSS Source Map` 의 체크를 해제하면 된다. 잘못해서 `Disable Javascript Map` 을 체크 해제하면 안 된다.