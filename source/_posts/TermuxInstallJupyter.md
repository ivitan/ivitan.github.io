---
title: Termux install  Jupyter
date: 2026-04-09 18:00:30
tags:
- Linux
- Termux
toc: true
categories: Diary
---

# 在 Termux 中安装 Jupyter 的步骤
## 第一步：更新系统环境

``Bash
pkg update && pkg upgrade -y
``
## 第二步：安装编译器与系统依赖

``bash
pkg install python clang build-essential rust binutils libzmq libcrypt openssl ca-certificates -y
``
## 第三步：安装 Termux 预编译的 Python 包

``Bash
pkg install python-psutil -y
``

## 第四步：配置环境变量（关键）

这一步是解决刚才遇到的 Cargo SSL 网络中断（unexpected eof）和 Rust 编译器找不到目标架构（ANDROID_API_LEVEL）的核心秘籍。

``Bash
export CARGO_HTTP_MULTIPLEXING=false
export ANDROID_API_LEVEL=24
```

## 第五步：正式安装 Jupyter


```Bash
pip install jupyter
```
