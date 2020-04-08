---
title: Linux 中 .deb 相关
date: 2018-04-01 14:18:47
tags:
- Linux
- Ubuntu
- Termux
toc: true
categories: Linux
---
Lineu中 `.deb` 包的使用，修改。
<!--more-->
# 为何物
.deb 是 Unix系统(其实主要是Linux)下的安装包，基于 `tar` 包，因此本身会记录文件的权限(读/写/可执行)以及所有者/用户组。

# 怎么用
## 制作.deb包
- 原理
1) deb包通常包含两部分：控制信息(DEBIAN目录)、安装内容(模拟"/"目录)
2) 通过解开已有的 deb 包看其中内容
    - 释放安装内容到dirname目录中
    ```sh
    dpkg -X xxx.deb dirname
    ```
    - 释放控制信息到当前目录下的DEBIAN子目录中
    ```sh
    dpkg -e xxx.deb
    ```
## 准备
```sh
sudo apt-get install dh-make checkinstall
```

## 下载软件源码包
- 使用checkinstall方法创建deb包
    - checkinstall 不仅可以生成 deb 包，还可以生成 rpm 包，使用简单。
```sh
tar xvjf fceu-0.98.12.src.tar.bz2 # 解包
cd fceu;./configure;make # 编译
checkinstall -D -install=no --pkgversion=0.98 --pkgname=fceuxy make install
# 制作deb包 此时当前目录下生成了deb包。
```
- 使用dpkg方法创建deb包
  - dpkg是最基本的制作deb包的方法，推荐使用
  ```sh
  tar xvjf fceu-0.98.12.src.tar.bz2 # 解包
  mv fceu fceu-0.98 # 改目录名为 包名-版本号
  cd fceu-0.98
  dh_make -f ../fceu-0.98.12.src.tar.bz2
  # 生成制作deb包所需的默认信息
  ```
  此时当前目录下生成了debian目录，此时通常修改两个文件： 1. 修改debian/control文件，配置你的信息，具体字段见参考资料部分 2. 修改debian/rules脚本，它决定编译参数(也可以不改)
  ```sh
  :::bash
  dpkg-buildpackage -rfakeroot
  ```
  此时可以看到，上层目录中已建立了deb包。



## 修改已有deb包
- 自己创建deb所需目录结构(控制信息和安装内容)，然后打包，一般使用这种方法来修改已有的deb包，而不是新建deb包，命令如下：
```sh
mkdir -p test
dpkg -X xxx.deb test # 解包安装内容
cd test
dpkg -e ../xxx.deb # 解包控制信息
```
- 修改DEBIAN目录下的内容，然后重新打包：
```sh
cd ../
dpkg -b test xxx_new.deb # 重新打包
```
- 修改DEBIAN目录下的内容，然后重新打包：
```linux
cd ../
dpkg -b test xxx_new.deb # 重新打包
```
# deb包常用命令
- 查看deb包含有哪些文件
```sh
dpkg -c xxx.deb # 安装前根据deb文件查看
dpkg -L debname # 安装后根据包名查看
```

- 查看某个文件属于哪个deb包
```sh
dpkg -S filefullpath
```
- 根据软件包名模糊检索
```sh
dpkg -l|grep xxx
# 在已安装的软件包列表中搜索
apt-cache search xxx
# 在源中的所有软件包列表中搜索
```

- 下载源码包
```sh
apt-get source packagename
```

# 安装
- 安装deb包
```sh
dpkg -i xxx.deb
```
## 卸载
- 卸载deb包
```sh
dpkg -r debname
```

- 完全卸载deb包（包含配置文件)
```sh
dpkg -P debname
```

---
**Via**
- [从源代码制作deb包的两种方法以及修改已有deb包](http://yysfire.github.io/linux/building-deb-package-from-source-and-modify-deb-package.html)
