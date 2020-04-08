---
title: MySQL 重置密码
date: 2018-09-09 10:54:40
tags:
  - Linux
  - MySQL
  - ArchLinux
  - Ubuntu
  - Win
categories:
  - Database
author:
  name: Vitan
toc: true
---
MySQL 重置密码
<!--more-->
# Linux
- 修改 MySQL 配置文件
```sh
vim /etc/my.cnf
```
- 任意一行添加
```sh
skip-grant-tables
```
- 重启MySQL：
```sh
service mysqld restart
```
- 进入 MySQL
```
mysql
use mysql;
update user set authentication_string = password("123456") where user = "root";
```
  - 删除修改的配置文件那一行

# Windows
- 关掉系统服务
```sh
net stop mysql
```
- 安装目录创建一个文本文件，内含一条密码修改命令
```sh
ALTER USER ‘root'@'localhost' IDENTIFIED BY ”;
```
- 命令行方式启动服务器，指定启动时执行上述的密码修改命令文件
```sh
mysqld –init-file=d:mysqlc.txt –console
```
