---
title: ArchLinux Docker
date: 2019-05-25 13:10:00
tags:
  - Linux
  - Docker
categories:
  - notes
author:
  - Vitan
enable_unread_badge: true
icon:
  - /images/Docker.png
---
ArchLinux 安装 Docker
<!--more-->
# 安装
Inatall
: ```bash
  sudo pacman -S docker
  ```

# 镜像
image
: ```bash
  docker pull ubuntu:18.04
  docker pull centos # latest
  dicker pull centos:6
  ```

# 运行
usage
: ```bash
  sudo docker run -i -t centos /bin/bash
  ```
  - -it, -i：交互式操作， -t 终端