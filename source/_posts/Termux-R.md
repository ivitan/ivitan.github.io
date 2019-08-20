---
title: Termux 安装 R
date: 2018-04-24 17:10:03
tags:
- Linux
- Termux
- R
toc: true
categories: notes
thumbnail: /images/Termux.png
---
Termux 安装 R
<!--more-->
# 步骤
建立 storage
```bash
termux-setup-storage
```

添加镜像
```bash
export EDITOR=vi
apt edit-sources
```
进入之后输入 i 进入编辑模式。
- 添加如下源
```bash
deb [trusted=yes] https://its-pointless.github.io/files/ termux extras
```

环境更新
```bash
apt-get update
apt-get upgrade
```

安装 R
```
pkg install r-cran
```
