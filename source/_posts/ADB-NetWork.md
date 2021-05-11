---
title: 无需 root 解决 android 网络的感叹号
tags:
  - Linux
  - Android
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2021-05-11 20:51:04
---
一加 9 Pro 刷了 OxygenOS 后有时连上了WiFi但是无WiFi图标，有时还有感叹号
<!--more-->

# 解决方法

- 利用 adb ,重启手机依旧生效

```
adb shell settings put global captive_portal_server www.google.cn/generate_204
```

## 还原

```
adb shell settings delete global captive_portal_server
adb shell settings put global captive_portal_detection_enabled 1
```