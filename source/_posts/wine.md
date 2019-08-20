---
title: Linus Wine
date: 2019-04-11 16:47:28
tags:
  - Linux
  - ArchLinux
  - Ubuntu
categories:
  - notes
toc: true
enable_unread_badge: true
thumbnail: /images/ArchLinux.png
---
Linux Wine
<!--more-->
ArchLinux
```shell
sudo pacman -S wine wine_gecko wine-mono winetricks
```

字体乱码
```shell
touch zh.reg
```
- 内容
```shell
REGEDIT4

  [HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\FontLink\SystemLink]
  "Lucida Sans Unicode"="wqy-microhei.ttc"
  "Microsoft Sans Serif"="wqy-microhei.ttc"
  "Microsoft YaHei"="SourceHanSansCN-Medium.otf"
  "MS Sans Serif"="wqy-microhei.ttc"
  "Tahoma"="wqy-microhei.ttc"
  "Tahoma Bold"="wqy-microhei.ttc"
  "SimSun"="wqy-microhei.ttc"
  "Arial"="wqy-microhei.ttc"
  "Arial Black"="wqy-microhei.ttc"
  "宋体"="SourceHanSansCN-Medium.otf"
  "新细宋体"="SourceHanSansCN-Medium.otf"
```
- Run
```shell
egedit zh.reg
```
