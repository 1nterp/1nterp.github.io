---
title: Gitlab Markdown Parser 고치기
description: Ruby, C 파일을 건드려서 입맛대로 고쳐 써보자
author: interp
type: post
date: 2018-01-03T02:29:21+0000
url: /gitlab-markdown-parser-configuration/
aliases: 
- "/gitlab-markdown-parser-바꾸기/"
categories:
    - Tech
tags:
  - gitlab
  - markdown
  - redcarpet

---
Github 과 비슷한 서비스인 [Gitlab](https://about.gitlab.com/) 은 오픈소스이기 때문에 Community Edition 을 쓰건, Enterprise Edition 을 쓰건 on-premise 환경에서 설치한 뒤 마음대로 수정해서 사용이 가능하다. 수정하는 범위를 한정하지 않는다면, 루비 (`*.rb`) 파일까지 건드릴 수 있다. 

여기서는 Gitlab에서 문서 작성에 필요한 Markdown 의 Parser 부분을 미세하게 수정해서, 입맛에 맞게 바꾸기 위한 방법을 정리해 둔다. Ruby 개발자가 아니라서 전체 순서가 정공법처럼 보이진 않겠지만. 

# 그런데 뭘 수정하나요?

내가 수정하고 싶었던 내용은, E**nter 키를 한 번만 쳐도 줄이 바뀌도록 보이게 하는 것**이었다. 원래 Markdown 문법에선 Enter 키를 두 번 치면 문단 바꿈, 줄 끝에 스페이스를 두 번 넣으면 줄바꿈이 된다. 그런데 Enter 키를 한 번만 쳐도 줄바꿈이 되면 좋겠다는 개발자가 많았다. ~~저기요, Markdown 안 써보셨어요? 라고 따질 순 없었다~~

# Gitlab 10.x : Redcarpet

Gitlab 10.x 에서는 Markdown Parser 를 [Redcarpet](https://github.com/vmg/redcarpet) 으로 사용한다. 아마 [Jekyll](https://jekyllrb-ko.github.io/) 도 기본적으로 Redcarpet 을 사용하는 것으로 알고 있다. 만약 Ruby의 Redcarpet 을 Markdown Parser 로 쓰는 경우라면 똑같이 적용이 가능하다.

## Parser C 파일 수정하기

`/opt/gitlab/embedded/lib/ruby/gems/2.3.0/gems/redcarpet-3.4.0/` 으로 들어가면 Redcarpet의 소스코드가 존재한다. 여기서 `ext/redcarpet` 디렉토리가 Parser C 파일들이 위치한 곳이다.

여기 `markdown.c` 파일을 보니 `char_linebreak()`  라는 함수가 존재한다. 여기서 해당 부분을 주석처리했다.

```cpp
/* char_linebreak • '\n' preceded by two spaces (assuming linebreak != 0) */
static size_t
char_linebreak(struct buf *ob, 
              struct sd_markdown *rndr, 
              uint8_t *data, 
              size_t offset, 
              size_t size)
{
    //if (offset < 2 || data[-1] != ' ' || data[-2] != ' ') 
    // return 0; /* removing the last space from ob and rendering */ 
    while (ob->size && ob->data[ob->size - 1] == ' ')
            ob->size--;

    return rndr->cb.linebreak(ob, rndr->opaque) ? 1 : 0;
}
```

## 라이브러리 생성/복사

수정이 끝나면 반드시 `ext/redcarpet` 디렉토리에서 `make` 를 수행해 주도록 하자. 그러면 Shared Library 파일인 `redcarpet.so` 이 생성된다.

이 파일을, 다음 경로에 모두 복사해주도록 하자.

  * `/opt/gitlab/embedded/lib/ruby/gems/2.3.0/extensions/x86_64-linux/2.3.0/redcarpet-3.4.0/`
  * `/opt/gitlab/embedded/lib/ruby/gems/2.3.0/gems/redcarpet-3.4.0/lib/`

## Gitlab 재부팅

마지막으로 `gitlab-ctl reconfigure && gitlab-ctl restart` 를 실행시켜 Gitlab 을 재부팅 하자. 

# Gitlab 11.x 이후 : Commonmark

11.x 부터는 Redcarpet 이 아니라 Commonmark 를 기본 파서로 사용한다. 구조가 달라져서 찾는게 귀찮아서 그렇지, 기본 원리는 비슷하다. 2칸 이상의 space 를 준 채로 줄바꿈하게 되면 `CMARK_NODE_LINEBREAK`, 그렇지 않고 줄바꿈하면 `CMARK_NODE_SOFTBREAK` 상태로 전이된다.

옵션을 알아보고 정확히 적용했다면 더 없이 깔끔했겠지만, 나는 마음이 급했기 때문에 참고할 만한 소스코드만 붙이고 그만두기로 했다. 

`html.c:283` 부터다. 여기서 직접 줄바꿈을 하도록 강제했다.

```cpp
case CMARK_NODE_SOFTBREAK:
    if (options &amp; CMARK_OPT_HARDBREAKS) {
        cmark_strbuf_puts(html, "<br/>\n");
    } else if (options &amp; CMARK_OPT_NOBREAKS) {
        // cmark_strbuf_putc(html, ' ');     // 수정 전
        cmark_strbuf_puts(html, "<br/>\n");  // 수정 후
    } else {
        cmark_strbuf_putc(html, '\n');
    }
    break;

```

이렇게 하고 make 를 쳤더니, 어라? 빌드가 안 된다. 이 때는 banzai filter 가 위치한 곳의 ruby 파일을 수정하면 된다. `/opt/gitlab/embedded/service/gitlab-rails/` 까지 들어간 다음 `lib/banzai/filter/markdown_engines/common_mark.rb` 을 편집한다.

```ruby
RENDER_OPTIONS = [
    :DEFAULT,     # default rendering system. Nothing special.
    :HARDBREAKS   # Treat `\n` as hardbreaks (by adding `<br/>`).  # 이 옵션을 추가한다.
  ].freeze
```

반드시, Gitlab 재부팅을 잊지말자! `gitlab-ctl reconfigure && gitlab-ctl restart` 이다. Commonmark 는 라이브러리를 수정한 것이 아니라서 `make` 같은 건 안 해도 된다.

이 방법으로 했을 때 한 가지 아쉬운 점은(?) 일부러 soft break 를 시도하는 경우에, 내부에서 line break 까지 겹쳐서 인식하기 때문에 결론적으로 `<br/>` 이 두번 붙는 사태가 일어난다. 깔끔하게 `<p>` 로 감싼 문단을 얻고 싶을 때는 이 방법이 소용이 없어서, 어쩔 수 없이 commonmark 를 한번 빌드하는 수밖에 없나.. 하는 생각이 들었다.
