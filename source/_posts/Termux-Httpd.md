---
title: Termux 局域网共享文件
tags:
  - Termux
  - Linux
  - Android
categories:
  - Diary
author:
  - Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Termux.png
date: 2019-07-29 19:25:00
---
Android 跨设备局域网共享文件
<!--more-->
# http-server
安装
```bash
pkg install nodejs-lts
npm install http-server -g
```

启动服务
```bash
http-server
```

## 同一局域网
同一局域网下浏览器登录启动服务后的提示的 ip 即可访问手机的文件，相反电脑同理。
