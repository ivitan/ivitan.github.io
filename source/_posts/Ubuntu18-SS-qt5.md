---
title: Ubuntu 安装 shadowsocks-qt5
date: 2018-07-25 09:55:05
tags:
- Linux
- Ubuntu
categories: Linux
toc: true
enable_unread_badge: true
thumbnail: /images/Ubuntu.png
---
 Ubuntu 安装 shadowsocks-qt5
<!--more-->
# 16.04/17.04的安装
```sh
sudo add-apt-repository ppa:hzwhuang/ss-qt5
sudo apt-get update
sudo apt-get install shadowsocks-qt5
```
# 18.04的安装方法
添加源
```sh
sudo add-apt-repository ppa:hzwhuang/ss-qt5
```
- 作者还没有测试18.04,将源中的`bionic`改成`artful`

编辑
```sh
sudo /etc/apt/sources.list.d/hzwhuang-ubuntu-ss-qt5-bionic.list
```
	
```sh
http://ppa.launchpad.net/hzwhuang/ss-qt5/ubuntu bionic main # Before  
http://ppa.launchpad.net/hzwhuang/ss-qt5/ubuntu artful main # After
```

安装
```sh
sudo apt-get update
sudo apt-get install shadowsocks-qt5
```
