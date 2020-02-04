---
title: WordPress 에디터 단축키 변경하기
author: interp
type: post
date: 2017-03-23T13:04:12+00:00
url: /wordpress-에디터-단축키-변경하기/
dsq_thread_id:
  - 6062708036
categories:
  - 개발환경
tags:
  - wordpress
  - 에디터

---
WordPress는 기본적으로 TinyMCE를 탑재하고 있는데, [기본 단축키][1]가 존재한다. 글을 작성할 때 굉장히 편하게 쓸 수 있다. 그런데 나는 Confluence 에 내장된 TinyMCE에 익숙해져서, 단축키를 두 번 외우기 싫어서 이걸 바꿔보려고 했다. (당장 <h1> 태그를 정하는 것만 해도 Confluence 는 Ctrl + 1 인데, WordPress 는 Shift + Alt + 1 이다. 엄청 불편하다!)

### 단축키 변경 원리

보통 wp-include/js/tinymce/tinymce.min.js 안에 addShortcut 이 지정되어 있다. 이걸 바꾸면 되는데, [다음과 같은 규칙][2]이 있다.

  * 단축키 패턴은, 소문자로 적어도 상관없다
  * Ctrl, Alt, Shift, 영문자 키가 사용 가능하다.
  * Meta, Access 가 사용 가능하다.
  
    각각 Mac 의 Command / Ctrl+Alt 와 대응된다. 윈도우라면 Ctrl / Shift+Alt 와 대응된다.

Command 리스트는 [이 페이지][3]를 참고하면 된다. 참고로 Heading 1, Heading 2 를 나타내는 Command 는 &#8216;Heading&#8217; 이 아니라 &#8216;FormatBlock&#8217; 이란 이름이다. 각 Command 의 설명을 잘 읽어보도록 하자.

내가 적용한 것은 Heading1~6 (제목 줄 정하기, Ctrl+1~6), InsertUnorderedList (번호 없는 목록 만들기, Ctrl+Shift+B) 정도다. 생각나는 대로 더 추가할 예정이다.

 [1]: https://www.tinymce.com/docs/advanced/keyboard-shortcuts/#editorkeyboardshortcuts
 [2]: http://archive.tinymce.com/wiki.php/api4:class.tinymce.Shortcuts
 [3]: https://www.tinymce.com/docs/advanced/editor-command-identifiers/