---
title: Linux 安装微信 QQ
date: 2018-07-28 11:05:15
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
Linux 安装 QQ WeChat Tim.
<!--more-->
# ArchLinux
## 添加 archlinuxcn 源
- 编辑 pacman.conf
```sh
vim /etc/pacman.conf
```
- 添加
```sh
[archlinuxcn]
SigLevel = Optional TrustAll
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

## 安装
```sh
sudo pacman -S wine
sudo pacman -S deepin.com.qq.im
sudo pacman -S deepin.com.qq.office
sudo pacman -S deepin.com.wechat
sudo pacman -S netease-cloud-music
```
- ArchLinux 系发行版包括 ArchLinux、Manjaro、Antergos 等.

## 配置分辨率
```bash
env WINEPREFIX="$HOME/.deepinwine/Deepin-WeChat" winecfg
env WINEPREFIX="$HOME/.deepinwine/Deepin-TIM" winecfg
env WINEPREFIX="$HOME/.deepinwine/Deepin-QQ" winecfg
```

# Ubuntu
## Deepin-wine 环境
方法一
```sh
git clone 'https://gitee.com/wszqkzqk/deepin-wine-for-ubuntu.git
# 克隆到本地，用图形界面的软件包管理器安装所有 deb 文件
```
方法二
```sh
git clone https://gitee.com/wszqkzqk/deepin-wine-for-ubuntu.git
sudo sh ./install.sh
# 克隆到本地,(授予可执行权限后)在终端中运行 install.sh .
```

## Deepin.com 应用容器
- 自行到[阿里镜像](http://mirrors.aliyun.com/deepin/pool/non-free/d/)中下载想要的容器安装运行即可(容器建议使用命令安装)。
- 推荐容器
  - QQ:http://mirrors.aliyun.com/deepin/pool/non-free/d/deepin.com.qq.im/
  - TIM:http://mirrors.aliyun.com/deepin/pool/non-free/d/deepin.com.qq.office/
  - QQ轻聊版:http://mirrors.aliyun.com/deepin/pool/non-free/d/deepin.com.qq.im.light/
  - 微信:http://mirrors.aliyun.com/deepin/pool/non-free/d/deepin.com.wechat/
  - Foxmail:http://mirrors.aliyun.com/deepin/pool/non-free/d/deepin.com.foxmail/
  - 百度网盘:http://mirrors.aliyun.com/deepin/pool/non-free/d/deepin.com.baidu.pan/
- Ubuntu 系发行版包括Ubuntu、LinuxMint、ZorinOS 等.

---
**参考**
- [Deepin wine for ubuntu](https://github.com/wszqkzqk/deepin-wine-ubuntu)    
- [多发行版通过！目前Linux上真正完美稳定的wine QQ方案](https://www.lulinux.com/archives/1319)
