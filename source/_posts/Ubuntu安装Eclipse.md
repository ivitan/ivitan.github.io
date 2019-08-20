---
title: Ubuntu 安装 Eclipse
date: 2018-03-05 19:35:29
tags:
- Linux
- Java
- Eclipse
toc: true
categories: notes
thumbnail: /images/Ubuntu.png
---
 Ubuntu 安装 Eclipse
<!--more-->
**前提**
已经安装Java JDK
# **下载**
[连接](http://www.eclipse.org/downloads/packages/eclipse-ide-java-developers/oxygen2)

## **安装**
- cd到文件目录
- `tar zxvf eclipse-java-oxygen-2-linux-gtk-x86_64.tar.gz  /opt/eclipse`
- 创建Dash Home图标
`sudo vim /usr/share/applications/eclipse.desktop`

复制下面内容
```
[Desktop Entry]
Encoding=UTF-8
Version=1.0
Type=Application
Name=eclipse
Icon=/opt/eclipse/icon.xpm
Exec=/opt/eclipse/eclipse
StartupNotify=false
StartupWMClass=eclipse
OnlyShowIn=Unity;
X-UnityGenerated=true
```
