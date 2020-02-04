---
title: My Git Config
author: interp
type: post
date: 2016-09-08T01:10:28+00:00
draft: true
private: true
url: /my-git-config/
categories:
  - 개발환경
tags:
  - git

---
<pre class="brush: bash; title: ; notranslate" title="">git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.pu push
git config --global alias.pl pull
git config --global alias.lg 'log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset' --abbrev-commit'
git config --global alias.df 'difftool --no-prompt'
git config --global alias.sta stash
git config --global alias.stp 'stash pop'
</pre>