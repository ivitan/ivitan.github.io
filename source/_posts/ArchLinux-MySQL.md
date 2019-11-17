---
title: ArchLinux 安装 MySQL
date: 2018-08-15 12:33:52
tags:
  - Linux
  - MySQL
  - ArchLinux
categories:
  - Linux
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/ArchLinux.png
---
ArchLinux 库里有 MariaDb，所以用 MariaDB 来代替 MySql。
<!--more-->
# 安装 MariaDB
安装 MariaDb 和其客户端工具
```sh
sudo pacman -S mariadb mariadb-clients
```

- 初始化

```sh
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
```

## 配置
- 启动 MariaDB

```sh
sudo systemctl start mysqld
```

- 为 root 用户设置一新密码
```sql
mysqladmin -u root password '71017'
```

- 登录 MariaDb
```sql
mysql -uroot -p71017
```

- 开机自动启动 MariaDb

```sh
sudo systemctl enable mysqld
```
