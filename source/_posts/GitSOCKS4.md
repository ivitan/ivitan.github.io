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
toc: true
enable_unread_badge: true
thumbnail: /images/Git.png
---
> Failed to receive SOCKS4 connect request ack.
<!--more-->
# 解决方法
```git
git config --global http.proxy 'socks5://127.0.0.1:1080' 
git config --global https.proxy 'socks5://127.0.0.1:1080' 
```

> error: RPC failed; curl 18 transfer closed with outstanding read data remaining

# 解决方法

- 1. --depth 1

```shell
# 关闭压缩
git config --global core.compression 0
# 部分克隆
git clone --depth 1 http://github.com/large-repository 
cd large-repository
# 进入新目录并检索其余的克隆
git fetch --unshallow

# 或者
git fetch --depth=2147483647
# 做一个定期拉
git pull --all
```
- 2. 切换使用 ssh(git clone username@mydomain.com:my_group/my_repository.git) 
- 3. 增加缓冲区大小

```shell
git config --global http.postBuffer 524288000
```

---
**参考**
- [stackoverflow](https://stackoverflow.com/questions/38618885/error-rpc-failed-curl-transfer-closed-with-outstanding-read-data-remaining)
