---
title: Termux ADB
date: 2019-03-24 11:03:51
tags:
- Termux
- ADB
categories:
- notes
author:
name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Termux.png
---
Termux ADB
<!--more-->
## 下载 arm 版 ADB
- Download
[提取码: 9ej2](https://pan.baidu.com/s/1wv_i6qUTLRL94pp-bnkyWw)

- Installation
1. 解压后 `mv arm/adb $PREFIX/bin`
2. 添加权限 `chmod +x $PREFIX/bin/adb`


- Usage
1. 远程连接设备（已开启USB网络调试）
```bash
adb connect ip
```
## ADB
[Command](https://vitan.me/2018/04/19/Adb/)
