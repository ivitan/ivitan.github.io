---
title: ArchLinux 安装 MongoDB RoboMongo
date: 2018-09-04 12:22:12
tags:
  - Linux
  - SQL
  - MongoDB
  - ArchLinux
categories:
  - notes
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/ArchLinux.png
---
ArchLinux 安装 MongoDB RoboMongo
<!--more-->
# MongoDB
```sh
  sudo pacman -S mongodb
```
启动服务
```sh
systemctl start mongodb.service
```

# RoboMongo
  - 方法一
  ```sh
  yay robo3t
  ```
  
  - 方法二
    - [下载链接](https://robomongo.org/download)
    - 解压，运行
    ```sh
    tar -xzf rrobo3t-1.2.1-linux-x86_64-3e50a65.tar.gz
    cd robo3t-1.2.1-linux-x86_64-3e50a65/bin
    ./robo3t
    ```
