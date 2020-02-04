---
title: 좋은 Git Commit Log 작성하기
author: interp
type: post
date: 2016-11-09T05:38:33+00:00
url: /좋은-git-commit-log-작성하기/
dsq_thread_id:
  - 5711532830
categories:
  - 개발환경
tags:
  - git
  - commit

---
[여기][1]에서 지목하는 다음 7가지를 알아봅시다.

  1. 제목과 내용 사이 한 줄을 넣는다.
  2. 제목은 50자 내외로 적는다.
  3. 제목 첫 글자는 대문자로 한다.
  4. 제목에는 마침표로 끝내지 않는다.
  5. 제목은 명령법으로 작성한다.
  6. 내용은 한 줄에 72자를 넘지 않도록 줄바꿈한다.
  7. 내용은 &#8216;어떻게&#8217; 수정했는지 적지 말고, &#8216;무엇을&#8217; &#8216;왜&#8217; 수정했는지 작성하라.

예를 들어,

<pre class="brush: plain; title: ; notranslate" title="">Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Fix: #123
See also: #456, #789
</pre>

### 제목

제목은 최대한 간결하게, 마침표 없이 명령조로 작성해야 합니다. 제가 자주 본 commit 제목은 &#8216;Fixed issue #32&#8217; 같은 식인데, 이건 명령조도 아니고 무엇을 수정했는지도 모호하거든요. issue numbering 을 꼭 해야 한다면 &#8216;내용&#8217;에 작성하도록 합시다. 마지막에 &#8216;Resolved : #32&#8217; 같은 식으로 언급해도, 이슈 트래커에서 원활히 인식되기 때문입니다.

### 내용

줄바꿈을 자동으로 하지 않기 때문에 `git log pull `같은 명령으로 보면 눈이 아플 정도로 긴(&#8230;) 로그를 볼 수 있습니다. 그래서 간결하게 쓰는 것이 가장 좋겠지만, 줄바꿈을 수동으로 하거나 다음 문단에서 목록 형태로 나열하는 것을 추천합니다. 그리고 내용에 들어갈 부분에는 &#8216;어떻게&#8217; 수정했는지 설명하는 것은 별 효과가 없는 것 같다고 하는데, 공감이 가는 부분입니다. 해당 이유를 번역해 보면 다음과 같습니다.

> <p style="text-align: justify;">
>   대부분은 어떻게 변경되었는지를 조목조목 작성해 두는데, 이런 대부분의 경우에 코드는 일반적으로 따로 설명할 필요가 없다. (코드가 너무 복잡해서 주절주절 설명해야 할 필요가 있다면, 그건 소스코드 주석으로 나타내야 할 것이고!) 그래서 왜 수정할 수 밖에 없었는지에 대한 이유를 작성할 수 있도록 신경쓰라. 수정 전에 기대했던 작동 방향과 그렇지 못했던 점, 수정 후 작동 방향, 왜 이렇게 수정했는지에 대한 이유에 대해서 말이다.
> </p>

 [1]: http://chris.beams.io/posts/git-commit/