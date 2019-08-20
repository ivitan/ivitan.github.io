---
title: RaspberryPi 搭建 Git 服务器
date: 2018-08-30 15:48:56
tags:
  - RaspberryPi
  - Linux
  - Git
categories:
  - notes
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/RaspberryPi.png
---
树莓派 Git 服务器
<!--more-->
# 安装依赖
```sh
sudo apt-get install git-core
```
- 创建用户
这里为树莓派创建一个 git 用户，方便局域网内其他用户使用同时将 git 服务器文件与 pi 用户数据隔离开来。命令行如下：
```sh
adduser --system --shell /bin/bash --gecos 'git version control by pi' --group --home /home/git git
```
- 更改 Git 密码
```sh
passwd git
```
- 切换到 Git 用户
```sh
su git
```
# 初始化仓库
- Git 用户负责 Git 项目的管理，所有仓库存放在 `/home/git` 中，这里我们初始化一个空仓库（记住是在切换到 Git 用户之后）
```sh
cd /home/git
mkdir test.git
cd test.git
git --bare init
```

# 使用仓库
- 克隆
```sh
git clone git@raspi_ip:/home/git/test.git
```
- 将项目加入仓库：
```sh
git remote add origin git@raspi_ip:/home/git/test.git
    ```
- 接着
```sh
git add .
git commit -m "test repo"
git push origin master
```
