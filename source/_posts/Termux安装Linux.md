---
title: Termux 安装 Linux
date: 2018-02-10 13:55:10
tags:
- Linux
- Termux
toc: true
categories: notes
icon:
 - /images/Bash.png
---
Termux安装Linux
<!-- more -->

# **安装脚本**
`wget http://funs.ml/file/atilo`

## **设置执行权限**
`chmod +x  atilo`

运行atilo
`./atilo`

# **安装Linux**
`./atilo ubuntu`

## **运行**
`startubuntu`

## **卸载**
`./atilo -r ubuntu`

## **设置中文**
修改/etc/locale.gen文件
去掉#zh_CN.UTF-8前面的#号
保存后输入

```
locale-gen zh_CN.UTF-8
export LC_ALL="zh_CN.UTF-8"
```

## **启动桌面**
先安装xserver xsdl.apk
打开xserver xsdl

```
pacman -S lxde
export DISPLAY=:0
export PULSE_SERVER=tcp:127.0.0.1:4712
startlxde
```
