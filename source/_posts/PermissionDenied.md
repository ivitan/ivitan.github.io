---
title: 解决 zsh:Permission Denied
date: 2018-09-06 13:28:17
tags:
- Linux
- ArchLinux
- Ununtu
categories:
- Linux
author:
name: Vitan
toc: true
---
zsh:Permission Denied
<!--more-->
# 原因
用户对文件没有可自行权限
# 解决方法
```sh
chmod u+x *
```
- 解析解析
	- `u` 所有者
	- `x` 执行权限
	- `+` 增加权限
	- `chmod u+x * `对文件的所有者增加可执行权限。

