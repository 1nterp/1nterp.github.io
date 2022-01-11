---
title: Ubuntu 터미널(Terminal) 단축키
author: interp
type: post
date: 2012-04-18T07:27:09+00:00
draft: true
private: true
url: /ubuntu-터미널terminal-단축키/
categories:
  - 미분류
tags:
  - Linux
  - Gnome
  - Terminal
  - vi
  - 단축키
  - 탭

---
gnome 에서 전부 된다고 한다. 

**Ctrl + Shift + t** : 탭 만들기
      
  
**Alt + 숫자** : 숫자 탭으로 이동
      
  
**Ctrl + Page Up (Page Down)** : 다음 (이전) 탭으로 이동

굉장히 편하다. 참고로 vi 에서도 탭을 만들 수 있는데, 나중에 따로 정리하겠지만 생각 나는대로 쓰면,

**:tabe <파일명>** : 탭으로 파일 열기. 물론, 파일명을 안 적으면 새 파일.  
**Ctrl + Page Up (Page Down)** : 다음 (이전) 탭으로 이동

<p style="text-align: justify;">
  이걸 왜 적냐면, 중복되는 단축키가 있어서다. 즉, 터미널에 탭이 2개 이상인데, 하나의 탭에 vi로 탭을 2개 이상 만들었을 경우&#8230; Ctrl + Page Up 키를 누르면 어느게 작동될까? 답은 터미널 탭. 이런 상태에서 vi 탭 이동을 하려면 :tabn <Number> 로 이동하거나 :tabn / :tabp 로 이전/이후 탭으로 이동할 수 있다.
</p>