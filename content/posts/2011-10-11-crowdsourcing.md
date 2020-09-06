---
title: Crowdsourcing
author: interp
type: post
date: 2011-10-11T02:25:56+00:00
draft: true
private: true
url: /crowdsourcing/
categories:
  - 미분류

---

  TinyDB 개발을 담당했던 Samuel Madden은, 개발 당시인 2003년에는 UC Berkerly에 있었지만 지금은 MIT에서 조교수로 재임중이다.[footnote]http://db.csail.mit.edu/madden/[/footnote]&nbsp;(생각보다 젊다!) 여기서 Crowdsourcing에 관련된 프로젝트가 눈에 띄어, 어떤 의미가 있는 것인지 차근차근 살펴보기로 했다.</p> 
  
  <blockquote>
    <p>
      크라우드소싱(crowdsourcing)은 기업활동의 전 과정에 소비자 또는 대중이 참여할 수 있도록 일부를 개방하고 참여자의 기여로 기업활동 능력이 향상되면 그 수익을 참여자와 공유하는 방법이다. '대중'(crowd)과 '외부 자원 활용'(outsourcing)의 합성어이다.&nbsp;
    </p>
    
    <p>
      ※&nbsp;출처 : 한국 위키피디아
    </p>
  </blockquote>
  
  <p>
    Samuel Madden이 연구하고 있는 Qurk[footnote]http://db.csail.mit.edu/qurk/[/footnote]에서 언급하고 있는 크라우드소싱의 예는 아마존의 Mechanical Turk이다. 사용자가 TASK를 완료하고 싶은데, 그 작업을 다른 누군가에게 (이를테면 프로그래머) 아웃소싱을 부탁하는 형태인데, 특정 누군가에게 부탁하는 것이 아닌 작업에 참여하는 사람에 제약이 없기 때문에 크라우드소싱의 좋은 예가 될 수 있다. 사용자는 빠른 시간으로 결과를 얻을 수 있고, 작업에 참여하는 사람은 돈을 벌 수 있고~
  </p>
  
  <p>
    Qurk의 설명은 다음과 같다.
  </p>
  
  <blockquote>
    <p>
      Crowdsourcing platforms such as Amazon's Mechanical Turk make it possible to organize crowd workers to perform tasks like translation or image labelling on demand. Building these workflows is challenging: how much should you pay crowd workers? can you trust the output of each worker? how can you coordinate workers to perform complicated high-level tasks? Qurk helps you build crowd-powered data processing workflows using a PIG-like language while tackling these challenges on your behalf.
    </p>
    
    <p>
      아마존의 Mechanical Turk와 같은 크라우드소싱 플랫폼은, 언제든지 번역을 하거나 이미지에 라벨을 다는 등의 작업을 수행할 때 크라우드에 있는 작업자를 구성해 처리할 수 있도록 하고 있다. 이런 크라우드소싱에서는, 참여하는 작업자에게 얼마나 많은 돈을 지불해야 하는지, 각각의 작업자를 믿을 수 있는지, 고레벨의 복잡한 작업을 수행하려면 이 작업자들을 어떻게 배치해야 하는지를 고려해, 작업의 진행단계를 설계하는 것이 중요하다. Qurk는, PIG와 같은 언어를 통해 당신이 처한 이런 문제를 대신 고민해주며, 당신이 crowd-powered data processing workflow를 설계할 수 있도록 도와줄 것입니다.
    </p>
  </blockquote>
