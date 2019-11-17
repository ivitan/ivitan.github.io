---
title: ArchLinux Docker
date: 2019-05-25 13:10:00
tags:
  - Linux
  - Docker
categories:
  - Coding
author:
  - Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Docker.png
---
ArchLinux 安装 Docker
<!--more-->
# 安装
```bash
sudo pacman -S docker
```

start server
```bash
systemctl restart docker 
```

# 镜像
```bash
docker pull ubuntu:18.04
docker pull centos # latest
dicker pull centos:6
```

# 运行
```bash
sudo docker run -i -t centos /bin/bash
```
- -it, -i：交互式操作， -t 终端
