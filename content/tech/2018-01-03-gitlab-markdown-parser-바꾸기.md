---
title: Gitlab Markdown Parser 바꾸기
author: interp
type: post
date: 2018-01-03T02:29:21+00:00
url: /gitlab-markdown-parser-바꾸기/
categories:
  - 개발환경
tags:
  - gitlab
  - markdown
  - redcarpet

---
Git 기반 프로세스 도구인 [Gitlab][1] 은 오픈소스이기 때문에 Community Edition 을 쓰건, Enterprise Edition 을 쓰건 상관없이 맘대로 수정해서 사용이 가능하다. 물론 적절한 감(?)으로 수정할 곳을 찾아야 하는 번거로움은 있다. 여기서는 Gitlab에서 문서 작성에 필요한 Markdown 의 Parser 부분을 수정하기 위한 방법을 정리해 둔다. Ruby 개발자가 아니라서 전체 빌드 순서가 정공법처럼 보이진 않겠지만.

Gitlab의 Markdown Parser는 [Redcarpet][2] 을 사용한다. 아마 [Jekyll][3] 도 기본적으로 Redcarpet 을 사용하는 것으로 알고 있다. 만약 Ruby의 Redcarpet 을 Markdown Parser 로 쓰는 경우라면 똑같이 적용이 가능하다.

디렉토리 경로는 Gitlab 10.x 기준으로 설명한다.

### Parser C 파일 수정하기

`/opt/gitlab/embedded/lib/ruby/gems/2.3.0/gems/redcarpet-3.4.0/` 으로 들어가면 Redcarpet의 소스코드가 존재한다. 여기서 `ext/redcarpet` 디렉토리가 Parser C 파일들이 위치한 곳이다.

내가 수정하고 싶은 것은 '**엔터 키를 두번 쳐야 (혹은 줄 끝에 스페이스를 2개 이상 줘야) 줄바꿈이 되는 불편함**' 을 해소하고 싶었다. `markdown.c` 파일을 보니 `char_linebreak()`  라는 함수가 존재한다. 여기서 해당 부분을 주석처리했다.

<pre class="brush: cpp; title: ; notranslate" title="">/* char_linebreak • '\n' preceded by two spaces (assuming linebreak != 0) */
static size_t
char_linebreak(struct buf *ob, struct sd_markdown *rndr, uint8_t *data, size_t offset, size_t size)
{
        //if (offset &lt; 2 || data[-1] != ' ' || data[-2] != ' ') 
        // return 0; /* removing the last space from ob and rendering */ 
        while (ob-&gt;size && ob-&gt;data[ob-&gt;size - 1] == ' ')
                ob-&gt;size--;

        return rndr-&gt;cb.linebreak(ob, rndr-&gt;opaque) ? 1 : 0;
}
</pre>

### 라이브러리 생성/복사

수정이 끝나면 반드시 `ext/redcarpet` 디렉토리에서 `make` 를 수행해 주도록 하자. 그러면 Shared Library 파일인 `redcarpet.so` 이 생성된다.

이 파일을, 다음 경로에 모두 복사해주도록 하자.

  * `/opt/gitlab/embedded/lib/ruby/gems/2.3.0/extensions/x86_64-linux/2.3.0/redcarpet-3.4.0/`
  * `/opt/gitlab/embedded/lib/ruby/gems/2.3.0/gems/redcarpet-3.4.0/lib/`

### Gitlab 재부팅

대망의 재부팅이 남았다.
  
`gitlab-ctl reconfigure && gitlab-ctl restart` 를 실행시키면 반영이 된다!

&nbsp;

### Gitlab 11.x 이후 : Commonmark

11.x 부터는 Redcarpet 이 아니라 Commonmark 를 기본 파서로 사용한다. 구조가 달라져서 찾는게 귀찮아서 그렇지, 기본 원리는 비슷하다. 2칸 이상의 space 를 준 채로 줄바꿈하게 되면 `CMARK_NODE_LINEBREAK`, 그렇지 않고 줄바꿈하면 `CMARK_NODE_SOFTBREAK` 상태로 전이된다.

옵션을 쓸 수 있다면 좋겠지만, 본인은 마음이 급한지라 참고할 만한 소스코드만 붙이고 도망가도록 한다. `html.c:283` 부터다. 여기서 직접 line break 를 하도록 강제했다.

<pre class="brush: cpp; title: ; notranslate" title="">case CMARK_NODE_SOFTBREAK:
     if (options &amp; CMARK_OPT_HARDBREAKS) {
       cmark_strbuf_puts(html, "&lt;br/&gt;\n");
     } else if (options &amp; CMARK_OPT_NOBREAKS) {
       // cmark_strbuf_putc(html, ' ');     // 수정 전
       cmark_strbuf_puts(html, "&lt;br/&gt;\n");  // 수정 후
     } else {
       cmark_strbuf_putc(html, '\n');
     }
     break;

</pre>

이렇게 하고 make 를 치면.. 어? 빌드가 안 된다.

당황하지 말고, <del>보기 싫지만</del> banzai filter 가 위치한 곳의 ruby 파일을 수정하면 된다. 여기에서 사실 옵션 조절이 가능하다. 파일 위치는 `/opt/gitlab/embedded/service/gitlab-rails/lib/banzai/filter/markdown_engines/common_mark.rb` 이다.

<pre class="brush: ruby; title: ; notranslate" title="">RENDER_OPTIONS = [
          :DEFAULT,     # default rendering system. Nothing special.
          :HARDBREAKS   # Treat `\n` as hardbreaks (by adding `&lt;br/&gt;`).            # 이걸 추가한다.
        ].freeze
</pre>

반드시, Gitlab 재부팅을 잊지말자!

한 가지 아쉬운 점은(?) 일부러 soft break 를 시도하는 경우에, 내부에서 line break 까지 겹쳐서 인식하기 때문에 결론적으로 `<br/>` 이 두번 붙는 사태가 일어난다. 어쩔 수 없이 commonmark 를 한번 빌드하는 수밖에 없나.. 하는 생각이 들고 있다.

 [1]: https://about.gitlab.com/
 [2]: https://github.com/vmg/redcarpet
 [3]: https://jekyllrb-ko.github.io/
