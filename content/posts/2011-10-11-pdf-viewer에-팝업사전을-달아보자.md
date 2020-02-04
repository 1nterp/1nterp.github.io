---
title: PDF Viewer에 팝업사전을 달아보자
author: interp
type: post
date: 2011-10-11T03:17:20+00:00
draft: true
private: true
url: /pdf-viewer에-팝업사전을-달아보자/
featured_image: /wp-content/uploads/1/cfile1.uf.1861C5434E93B4EE28092D.png
categories:
  - 미분류

---
PDF 뷰어와 하루종일 뒹굴고 있는 사람들에게, 특히 영어로 된 논문이나 학술지와 씨름하는 사람들에게는 언어의 장벽이 있을 수 밖에 없다. 세상에 모든 단어를 다 알고 있다면 문제될 건 없겠지만, 국어 단어조차 사전이 필요한 내 상황에서는 이런 바램을 늘 가져왔었다. '일일히 웹에 검색해서 찾아야 되나 ㅜㅜ 단어를 블럭잡으면 팝업으로 띄울 수 있는 기능이 있다면 참 좋을텐데'라고.

<div style="text-align: justify;">
  내가 사용하고 있는 PDF Viewer는 Foxit Reader이다. 대부분 Adobe Reader를 쓰지만, 어쩐지 느린 속도도 한 몫하고, 뷰어 옵션을 제대로 못 봐서 그런 탓도 있겠지만 Adobe Reader는 하이라이트 친 부분을 다시 블럭잡을 수 없는 소소한 차이가 발생한다. (Foxit Reader는 그렇지 않다.) 해서, 이 프로그램에 혹시 그런 플러그인은 없는지 공식 포럼에 검색해 보았다. '그런 건 없고, cursor translator와 호환이 되니, 그에 맞는 프로그램을 설치하면 되지 않겠습니까?' 라는 답이 있었다. Cursor translator는, 커서가 가리키고 있는 단어나 문장을 그대로 번역해준다는 것이니, 내가 찾고 있는 것이로구나!</p> 
  
  <p>
    그 중에서도 정말 강력한 프로그램을 찾았으니, Lingoes Dictionary[footnote]http://jocker.tistory.com/76[/footnote]라는 프로그램이었다. 링크에서 한영, 영한사전 다운로드가 가능하다. 인터페이스도 다국어지원이므로 한국어로 깔끔하게 나온다. 환경설정에서 '텍스트인식' 탭에 단어인식을 입맛대로 바꿔준 다음, 프로그램을 실행해두고 (메인 창은 최소화해도 상관없다) PDF View에서 단어위에 인식동작을 취해보자. (나는 마우스를 위에 올려둔 채 Ctrl 키를 누르면 인식하라는 명령을 옵션에 부여했다.)
  </p>
  
  <p style="margin:0">
    <img src="http://interp.iwinv.net/wp-content/uploads/1/cfile1.uf.1861C5434E93B4EE28092D.png" class="aligncenter" width="467" height="260" alt="" filename="1.png" filemime="image/jpeg" />
  </p>
  
  <p>
    보시다시피 잘 나온다. 단점은, 내 경우에는 마우스를 올린 상태에서 Ctrl 키를 눌러야 인식을 하더라. Ctrl 키를 누른 상태에서 마우스를 움직여 단어를 가리키면 인식이 안 되는데, 이것은 당연한 프로그램의 특성이라고 여겨진다.
  </p>
  
  <p>
    단점이 있다면, lingoes는 리눅스를 지원하지 않는다! 그래서 리눅스에서는 이런 팝업 사전을 따로 구해야 하는데, 그 편은 다음에 자세히 다루도록 한다.&nbsp;
  </p>
</div>