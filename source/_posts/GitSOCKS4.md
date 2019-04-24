---
title: Git Clone Error
date: 2019-04-24 19:24:18
tags:
  - Git
  - Linux
  - Termux
categories:
  - notes
author:
  - Vitan
enable_unread_badge: true
icon:
  - /images/Git.png
---
> Failed to receive SOCKS4 connect request ack.
<!--more-->
解决方法
: ```git
  git config --global http.proxy 'socks5://127.0.0.1:1080' 
  git config --global https.proxy 'socks5://127.0.0.1:1080' 
  ```

> error: RPC failed; curl 18 transfer closed with outstanding read data remaining

解决方法
: - 1. --depth 1
  ```shell
  git clone http://github.com/large-repository --depth 1
  cd large-repository
  git fetch --unshallow
  ```
  - 2. 切换使用 ssh(git clone username@mydomain.com:my_group/my_repository.git) 
  - 3. 增加缓冲区大小
  ```shell
  git config --global http.postBuffer 524288000
  ```

---
**参考**
- [stackoverflow](https://stackoverflow.com/questions/38618885/error-rpc-failed-curl-transfer-closed-with-outstanding-read-data-remaining)