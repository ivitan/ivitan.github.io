---
title: 一键关闭多用户状态栏头像
tags:
- Android
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2021-10-14 19:56:26
---
> 一键关闭多用户状态栏头像
<!--more-->
# 一键关闭多用户状态栏头像教程

1、打开开发者模式
2、打开USB调试
3、勾上禁止权限监控
4、运行 ADB 命令
```
adb shell settings put global user_switcher_enabled 0 
```