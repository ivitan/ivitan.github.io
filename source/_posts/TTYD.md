---
title: 利用 ttyd 在 Web 上共享终端
tags:
  - Termux
  - Linux
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-11-30 06:45:57
---

> [ttyd](https://github.com/tsl0922/ttyd) 是用于在 Web 上共享终端的简单命令行工具。

<!--more-->

# 安装
## Termux
```
apt install ttyd -y
```
## macOS

```
brew install ttyd
```

# 使用

```
ttyd -p 8080 bash
```
## 密码登录

```
sudo ttyd -p 8080 login
```

即可在浏览器访问 http://ip:8080