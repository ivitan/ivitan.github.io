---
title: Adb 修补 boot 刷 Magisk
tags:
  - Android
  - Linux
  - Windows
categories:
  - Diary
author:
  - Vitan
toc: true
date: 2021-01-11 09:17:25
---
修补 boot 刷 Magisk
<!--more-->

1. 请确保手机为已[解锁](/posts/Adb.html)状态

2. 下载官方包解压获取 boot.img 放到手机储存空间中，并安装 [Magisk Manager](https://github.com/topjohnwu/Magisk/releases)

3. 安装完成后打开 Magisk --> 点击安装 --> 选择并修补一个文件 --> 选择刚刚的 boot.img

4. 修补后的文件文件在 sdcard/Download/patched_boot.img

5. 将手机重启至 bootloader，连接上电脑，打开 ADB 

6. 输入命令 fastboot flash boot patched_boot.img  后重启