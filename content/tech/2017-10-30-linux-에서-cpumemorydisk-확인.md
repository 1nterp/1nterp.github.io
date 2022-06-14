---
title: Linux 에서 CPU/Memory/Disk 확인
author: interp
type: post
date: 2017-10-30T08:31:03+0000
url: /linux-에서-cpumemorydisk-확인/
categories:
  - 팁
tags:
  - Linux
  - 사양

---
자주 쓰긴 하지만, 곧바로 생각나지 않을 것을 대비해서... 서버실 서버 사양을 전부 체크하려다 보니 어쩔 수 없이 정리했다.

## CPU / Memory 확인

CPU / Memory 는 사실 쉽다. `/proc/cpuinfo` 와 `/proc/meminfo` 안에 들어있기 때문이다.

```bash
$ cat /proc/cpuinfo | grep "model name"  | sort -u
model name : Intel(R) Core(TM) i3-4160 CPU @ 3.60GHz

$ cat /proc/meminfo | grep "MemTotal"
MemTotal: 8040588 kB
```

## Disk 확인

`df` 는 mount 된 것만 확인이 가능해서 별로고, `lsblk` 를 하면 마운트되지 않은 것까지 나온다.

```bash
$ lsblk
NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
sda 8:0 0 477G 0 disk
├─sda1 8:1 0 468.8G 0 part /
└─sda2 8:2 0 8.2G 0 part [SWAP]
sdb 8:16 0 2.7T 0 disk

## df 는 sdb가 보이지 않는다.
$ df -h 
Filesystem Size Used Avail Use% Mounted on
/dev/sda1 462G 8.4G 430G 2% /
tmpfs 79G 224K 79G 1% /dev/shm
```
