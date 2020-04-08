---
title: Termux ADB
date: 2019-03-24 11:03:51
tags:
- Termux
- ADB
categories:
- Diary
author:
name: Vitan
toc: true
---
Termux ADB
<!--more-->
## 下载 arm 版 ADB
[Download](https://github.com/ivitan/Shell/releases/download/Adb/adb.zip)

## Installation

1. 解压后 `mv arm/adb $PREFIX/bin`
2. 添加权限 `chmod +x $PREFIX/bin/adb`


## Usage

1. 远程连接设备（已开启USB网络调试）

```sh
adb connect ip
```
## ADB
[ADB 与 Fastboot 常用命令](/posts/Adb.html)
