---
title: 解决 Termux 上 Hexo 无法运行
tags:
  - Termux
  - Linux
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-09-09 17:31:50
---
解决 Hexo 
> zsh:/data/data/com.ternux/files/usr/bin/hexo: bad interpreter: /usr/bin/env:no such file or directory

## 方法
```
termux-fix-shebang /data/data/com.ternux/files/usr/bin/hexo
```