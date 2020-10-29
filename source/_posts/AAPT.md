---
title: AAPT 查询 APK 信息
tags:
  - Linux
  - Windows
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-10-29 08:58:07
---
个人常用 AAPT 查询 APK 信息命令

<!--more-->
# AAPT 查询 APK 信息

## 查看签名

```
keytool -printcert -jarfile app.apk
```

## 获取 apk 的详细信息

```
aapt dump badging app-debug.apk
```

## APK MD5

```
certutil -hashfile apk.apk  MD5
```

## 查看 SHA1

```
certutil -hashfile 文件名  SHA1 
```

## 查看 SHA256

```
certutil -hashfile 文件名  SHA256
```