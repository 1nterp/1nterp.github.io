---
title: "Hugo SCSS Rebuild"
date: 2020-01-31T00:35:23+09:00
draft: true
summary: Hugo 에 포함된 Theme 에는 대부분 SASS/SCSS 파일로 스타일링을 했는데, 여기서 SCSS 내용을 변경해도 사이트 빌드할 때 변경 내용이 적용이 되지 않았다. 원칙적으론 되어야 한다. 어떻게 해결했는지 간단히 적어본다.
menu: "tech"
---

Tale 테마로 블로그를 처음 시작하려고 보고 있는데, 여기서 SCSS 내용을 변경해도 `hugo server -D` 를 하니까 변경 내용이 적용이 되지 않았다. [여기선](https://gohugo.io/hugo-pipes/scss-sass/) 잘 된다고 나와 있는데, 어떻게 해결했는지 자세히 적어본다.

* 자세히 보니 이미 컴파일이 완료된 CSS 파일이 `resources/_gen/assets/scss/scss/` 에 존재하고 있었다. 
* 설마 이것 때문인가? 삭제를 하고 다시 `hugo server -D` 를 해보면 다음 문구가 반겨준다.  
```text
Building sites … ERROR 2020/01/31 00:27:39 Transformation failed: TOCSS: failed to transform "scss/tale.scss" (text/x-scss): this feature is not available in your current Hugo version, see https://goo.gl/YMrWcn for more information
Built in 16 ms
Error: Error building site: logged 1 error(s)
```
그렇다, **혹시 extension version 이 아닌 hugo 를 설치한 것은 아닌지 확인해 보자.** [Install Hugo](https://gohugo.io/getting-started/installing) 페이지에 다시 들어가 재설치하니 잘 되었다.
