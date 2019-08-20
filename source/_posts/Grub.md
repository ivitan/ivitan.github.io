---
title: Grub 双系统选项、美化
date: 2019-06-27 14:26:38
tags:
  - Linux
  - Win
categories:
  - notes
author:
  - Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/ArchLinux.png
---
添加 Win10 菜单到 Grub
<!--more-->
# 安装 os-prober
```bash
sudo pacman -S os-prober 
```

# 扫面并添加到菜单
```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```
# 美化
下载主题 [Gnome-Look](https://www.gnome-look.org/browse/cat/109/ord/latest/)

## 配置
- 有的主题有安装脚本，运行即可。
```bash
sudo cp -r 主题包名 /boot/grub/themes/  
sudo vim /etc/grub.d/00_header
```
```bash 上一步添加如下内容
GRUB_THEME="/boot/grub/themes/主题包名/theme.txt"
GRUB_GFXMODE="1920x1080x32"
```

## 更新配置
```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

# 效果
![](https://raw.githubusercontent.com/ivitan/Picture/master/Grub.png)
