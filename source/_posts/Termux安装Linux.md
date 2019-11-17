---
title: Termux 安装 Linux
date: 2018-02-10 13:55:10
tags:
- Linux
- Termux
toc: true
permalink: TermuxLinux
categories: Diary
thumbnail: /images/Termux.png
---
Termux安装Linux
<!-- more -->

# 安装脚本
添加源
```bash
echo "deb [trusted=yes] https://yadominjinta.github.io/files/ termux    extras" >> $PREFIX/etc/apt/sources.list
```

安装
```bash
pkg install atilo-cn -y
```

# 使用
```bash    
atilo [命令] [参数]
```

安装 Linux
```bash
atilo ubuntu
```

运行 linux
```bash
startubuntu
```

## 设置中文
修改/etc/locale.gen
```bash
locale-gen zh_CN.UTF-8
export LC_ALL="zh_CN.UTF-8"
```
