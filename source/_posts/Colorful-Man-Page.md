---
title: 彩色 Man Page
date: 2018-08-14 10:53:28
tags:
  - Linux
  - ArchLinux
  - Ubuntu
categories:
  - Linux
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Linux.png
---
Linux下 Man Page 的显示默认是通过 less 来完成的， `.bashrc` 文件中添加 less 的相关设置参数可使其变成彩色。
<!--more-->
# 方法
- 编辑 .bashrc
```sh
vim .bashrc
```
- 添加
```sh
export LESS_TERMCAP_mb=$'\e[1;32m'
export LESS_TERMCAP_md=$'\e[1;32m'
export LESS_TERMCAP_me=$'\e[0m'
export LESS_TERMCAP_se=$'\e[0m'
export LESS_TERMCAP_so=$'\e[01;33m'
export LESS_TERMCAP_ue=$'\e[0m'
export LESS_TERMCAP_us=$'\e[1;4;31m'
```

## 参数含义
- 数字
    - 31 – red
    - 32 – green
    - 33 – yellow
        - [颜色](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors) 

  - `\e[0x;3y;4zm'`
    - x 是否加粗，
    - 1 加粗，
    - 2正常；
    - y 和 z 分别代表文字前景色和背景色

  - LESS_TERMCAP_xx

    |参数|含义|
    |:---|:---|
    |mb|start blink|
    |md|start bold|
    |me|turn off bold, blink and underline|
    |us|start underline|
    |ue|stop underline|
    |so|start standoutv|
    |se|stop standout|
