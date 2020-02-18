---
title: WordPress TinyMCE 단축키 설정
author: interp
type: post
date: 2020-02-02T12:59:10+00:00
draft: true
private: true
url: /wordpress-tinymce-단축키-설정/
mentions:
  - 'a:0:{}'
categories:
  - 미분류

---
TinyMCE API에 있는 addShortcut() 함수를 wp-includes 에서 검색해 봤더니, 사용하는 곳이 있었다. 이걸 좀 응용해 보면 어떨까.

  * addCommand로 다양한 기능이 이미 존재한다.
  * addShortcut 명령어로 addCommand로 입력한 커맨드 이름을 입력한다. 그러면 그게 된다.

WP_LINK 기능도 있다. Confluence 처럼 &#8216;Ctrl+k&#8217; 를 눌러 나오는 창에 문서를 검색하면 뜬다! Mentionable 안녕~

&nbsp;