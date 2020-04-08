---
title: RaspberryPi 搭建 Gogs Git 服务
tags:
  - RaspberryPi
  - Linux
  - Git
categories:
  - Diary
author:
  - Vitan
toc: true
date: 2019-07-31 14:14:52
---
树莓派搭建 Gogs Git 服务
<!--more-->
# 安装 MySQL
```bash
sudo apt install mariadb-server mariadb-client 
```
配置
```bash
sudo vi /etc/mysql/mariadb.conf.d/50-server.cnf 
注释掉 
bind-address = 127.0.0.1
```

- 修改 root 密码

```bash
sudo mysqladmin -u root -p password 
```

- 新建 gogs 数据库

```bash
mysql -h127.0.0.1 -uroot -p123456
create database gogs;
```

- 重启 MySQL

```bash
sudo service mysql restart
```
# golang
```bash
sudo apt install golang -y
```

# [gogs](https://gogs.io/)
```bash
wget https://cdn.gogs.io/0.11.79/gogs_0.11.79_raspi2_armv6.zip
```
解压
```bash
tar -xzvf gogs_0.11.79_raspi2_armv6.zip
```

安装
```bash
cd 解压后的目录
./gogs web
```

配置
- 浏览器打开 `http://ip:3000`

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190731144809.png)

后台运行
```bash
nohup ./gogs web > nohup.out 2>&1 &
```
# [Frp](https://diannaobos.com/frp/) 内网穿透
下载安装
```bash
wget https://github.com/fatedier/frp/releases/download/v0.27.1/frp_0.27.1_linux_386.tar.gz
  
# 解压安装
tar -zxvf frp_0.27.1_linux_386.tar.gz
```

配置
```bash
cd frp_0.27.1_linux_386
vim frps.ini
```
```bash
[common]
server_addr = gogs.vitan.me
server_port = 8000
token = 

[gogs]
type =http
privilege_mode = true
local_ip = localhost
locah_port = 3000

custom_domain = gogs.vitan.me
```
启动
```bash
./frps -c ./frps.ini
```
- 配置好服务器端后,可以在浏览中(http://IP:8000/static/#/) 打开 frp 的控制台

---
**参考**
- [gogs](https://gogs.io/docs/installation/install_from_binary)
- [Frp](https://diannaobos.com/frp/)
