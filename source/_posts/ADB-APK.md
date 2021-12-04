---
title: ADB 提取系统 APK
tags:
  - Linux
  - Windows
categories:
  - Dairy
author:
  - Vitan
toc: true
date: 2021-12-04 10:19:14
---

<!--more-->

## 命令
```adb
adb connect ip
adb shell 

# 查找 APK 路径，路径截止到 base.apk
pm list package -f | grep apkName

adb pull APK_PATH Rename.apk
```