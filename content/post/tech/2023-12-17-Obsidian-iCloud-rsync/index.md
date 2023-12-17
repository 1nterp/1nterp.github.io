---
date: 2023-12-17 13:27:40 +0900
title: iCloud Obsidian 주기적으로 백업하기
description: feat. mac, rsync, and cron
image: feature.png
# image_y: "20%"
url: /backup-from-icloud-obsidian
tags:
    - Obsidian
    - iCloud
    - rsync
    - cron
    - Mac
categories:
    - Tech
---

나는 개인 노트 작성에 [옵시디언 (obsidian)](https://obsidian.md/) 을 사용한다. 

작년까지는 [노션 (Notion)](https://www.notion.so/) 을 주로 사용했지만, 노션은 데이터베이스 형태로 기록할 만한 것들만 남겨두고, 실제 글들을 아이디어로 엮는 작업은 옵시디언에서 하고 있다. 주로 Macbook 앞에서 작성하지만, 컴퓨터를 쓰지 않을 때는 iPhone 에서 끄적이고 싶을 때 옵시디언 앱을 연다. 어느 쪽에서 쓰더라도, iCloud 를 통해 동기화가 이루어지므로 끊임없이 적을 수 있는 장점도 있다. (최근 워크스페이스가 늘어나면서 모바일 로딩 속도가 느려지는 문제가 있는 듯 하다. 이 때문에 임시 메모장 용도로만 다시 노션을 써야하나 고민 중이긴 하다.)

아무튼, 옵시디언은 정제된 메모들과 아이디어가 있는 공간이기 때문에, 몇년이고 잘 보존되어야 한다는 욕심이 생겼다. 대학원 시절 잘 [사용하던 스프링노트가 서비스 종료](https://www.joongang.co.kr/article/9019118)되면서, 백업을 받아두긴 했지만 재활용하기가 너무 힘든 부분이 있었다. 백업을 해 두면, iCloud 를 더 이상 사용하지 않는다거나, 불의의 사고가 생기더라도 저장장치에서 새출발 할 수 있지 않을까 해서 이리저리 알아봤다.

{{< figure src="springnote.png" width="50%" caption="추억의 스프링노트.." >}}

옵시디언 저장소를 (옵시디언에서는 *Vault* 라고 부른다) 아예 OneDrive 나 다른 저장소에 두면 되겠지만, <u>모바일용 옵시디언에서는 외부 파일 클라우드 서비스를 지원하지 않는다.</u> iPhone 에서만 쓰거나, iCloud 에 동기화하거나. 

{{< figure src="obsidian_mobile.jpeg" width="30%" caption="모바일 옵시디언에서 저장소 동기화는 iCloud 에서만 가능하다" >}}

# 문제

iCloud 로 동기화 중인 옵시디언 저장소를 다른 파일 동기화 서비스에도 백업해 둘 순 없을까?

# 디자인

우선 내 작업 환경을 고려해서 다음 아이디어를 생각해 냈다.

- Macbook 이 꺼질 일은 없고, 매일 Macbook 을 사용하니까 Macbook 에서 iCloud 내용을 복사하는 반복 작업을 만들면?
- 대부분의 파일 동기화 서비스는 Mac OS 를 지원하니까, Macbook 내부 특정 위치를 동기화하게 만든 다음 그곳으로 iCloud 내용을 복사하면?

생각보다 간단하게 문제 해결 방법이 정리되었고, 단순 `cp` 명령어보다 훨씬 더 좋은 방법을 적용할 수 있었다. (이번에 새로 알게 된 것은 아니고 원래 알고 있었지만...)

# rsync 를 써보자!
`rsync` 는 파일 타임스탬프를 기반으로 (원격 시스템을 포함한) 두 경로 사이를 동기화하는데 사용된다. 당연히 로컬 환경에서도 사용이 가능하다! 하지만 MacOS 에 기본적으로 설치된 버전은 2.x 이기 때문에 인코딩 문제같은 자잘한 걸림돌이 많다. 그래서 먼저, 3.x 버전으로 업그레이드 해보자.

무릇 MacOS 유저라면 [Homebrew](https://brew.sh/) 를 설치했으리라 믿는다. 그럼 바로 설치해보자!
```bash
brew install rsync
```

Homebrew 에서 설치한 바이너리 명령어들의 설치 경로가 Intel/Silicon Mac 마다 다르다. 해당 경로가 `$PATH` 최상단에 있는지 확인하자.
- Intel: `/usr/local/bin`
- Silicon (M1, M2..): `/opt/homebrew/bin`

```bash
export PATH=${HOMEBREW_BIN_PATH}:${PATH}
which rsync # 확인
```

자, 이제 다음 명령어로 동기화를 해보자!

```bash
rsync -uva --delete ${source}/ ${destination}/
```
`man rsync` 를 통해서도 얻을 수 있는 정보이지만, 정리해두면 다음과 같다.
- `-u`: 업데이트 된 파일만 destination 으로 복사
- `-v`: 동기화되는 파일 목록과 결과 통계 출력
- `-a`: archive mode (recursive + symbolic link + preserve metadata)
- `--delete`: 관계없는 파일은 destination 에서 삭제

반드시 `--dry-run` 을 추가해서, 저장 경로에 어떤 파일이 생성되고 삭제되는지 직접 테스트를 해 보자.

# Crontab 에 등록

이제는 매일 동기화하도록 해보자. 그런데 주의할 점은, 반드시 바이너리와 두 디렉토리를 모두 절대경로로 작성해야 한다는 것이다. `crontab` 은 `PATH` 를 인식하지 못하기 때문이며, 실행하는 위치를 특정할 수 없기 때문에 상대경로로 쓸 수 없다. 

말하자면 이런 식이다. (매일 오전 11시에 돌아간다)

```bash
# 이러면 안 되고
0 11 * * * rsync -uva --delete src/ dest/
# 이래야 한다.
0 11 * * * /opt/homebrew/bin/rsync -uva --delete /Users/username/src/ /Users/username/dest/
```

날짜와 함께 로그를 남기고 싶다면, 이렇게 `log.log` 에 내용을 쌓는 방법도 있다. 더 좋은 방법이 있겠지만, 간단하니 우선은 이렇게 확인 중이다.
```bash
0 11 * * * date >> /Users/username/log.log && /opt/homebrew/bin/rsync -uva --delete /Users/username/src/ /Users/username/dest/ >> /Users/username/log.log
```

## Operation not permitted
혹시 위 명령어를 보게 된다면 다음을 참고하자.

1. '설정' 열기
2. 검색에서 '디스크' 를 입력해서, '응용 프로그램이 모든 사용자 파일에 접근하는 것을 허용' 선택
3. 목록 맨 아래에 더하기 (+) 기호 클릭
4. Command + Shift + G 를 눌러서, `/usr/sbin/cron` 입력
5. `cron` 이 활성화되어 있는지 확인 후, 설정 창 닫기

🔗 참고 : https://apple.stackexchange.com/questions/378553/crontab-operation-not-permitted

----

`/Users/username/dest` 부분은 파일 동기화 클라이언트로 지정해 두면 클라우드/NAS 로 동기화가 자동으로 이뤄질 것이다!
