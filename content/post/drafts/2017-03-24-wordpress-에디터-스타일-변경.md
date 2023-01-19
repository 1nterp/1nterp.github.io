---
title: WordPress 에디터 스타일 변경
author: interp
type: post
date: 2017-03-24T02:50:22+00:00
url: /wordpress-에디터-스타일-변경/
categories:
  - 팁
tags:
  - wordpress
  - editor

draft: true
---
WordPress 3.9 부터는 포스트 에디터로 TinyMCE를 내장하고 있다. 테마 별로 이 에디터의 CSS 의 스타일을 제공할 수 있다. [add\_editor\_style()][1] 함수가 그것이다.

### 사용중인 테마에서 에디터 스타일 변경

다음 코드를 사용 중인 테마의 functions.php 에 추가하면 된다.

```php
add_editor_style('assets/css/editor-style.css');
```

물론, 여기서 editor-style.css 파일은 존재해야 한다. 에디터 스타일을 직접 작성할 수도 있지만, 나는 테마 스타일의 포스팅 부분만 떼내서 만들었다. 즉, 에디터를 통해 미리보기를 하지 않아도 포스팅 구성이 어떻게 되고 본문이나 제목이 어떻게 보여지는지 한 눈에 파악할 수 있다.

### 테마와 상관없이 변경하고 싶다면

`wp-includes/js/tinymce/skins/wordpress/wp-content.css` 를 바꾸면 테마에 상관없이 에디터 스타일이 바뀐다. 단점이 있다면, WordPress가 업데이트하면서 해당 파일을 바꾸게 될 위험이 높다. 만약 이 방법을 꼭 쓰고 싶다면, 애써 작업한 내용을 날리지 말고 백업을 해 둬야 한다.

&nbsp;

 [1]: https://developer.wordpress.org/reference/functions/add_editor_style/
