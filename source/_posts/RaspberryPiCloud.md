---
title: RaspberryPi 搭建云
date: 2018-08-31 12:10:23
tags:
  - RaspberryPi
  - Linux
categories:
  - notes
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/RaspberryPi.png
---
RaspberryPi 搭建云
<!--more-->
# 换源
```sh
sudo nano /etc/apt/sources.list
```

- 改为

```sh
deb https://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ stretch main contrib non-free rpi
```

# 安装 Apache
```sh
sudo apt-get install apache2
```
## 安装 MySQL
```sh
sudo apt-get install mysql-server
```

## 配置mysql
```sh
sudo vim /etc/apache2/apache2.conf
```
  - None改成All


- 设置 MySQL 账户密码

```sh
sudo mysql -u root -p
update mysql.user set plugin='mysql_native_password';
update mysql.user set password=PASSWORD("newpassword") where User='root';
flush privileges;
```

# 安装 PHP 及依赖
```sh
sudo apt-get install php5 php5-gd php-xml-parser php5-intl php5-sqlite php5-mysql smbclient curl libcurl3 php5-curl
```

## 安装phpMyAdmin
```sh
sudo apt-get install phpmyadmin
```

## 下载ownCloud
```sh
sudo wget https://download.owncloud.org/community/owncloud-9.1.4.zip
sudo unzip owncloud-9.1.4.zip -d /var/www/html/
cd /var/www/html/owncloud
sudo mkdir data
```

- 修改目录权限

```sh
sudo chown -R www-data:www-data data
sudo chown -R www-data:www-data config
sudo chown -R www-data:www-data apps
```

# 配置 OwnCloud

- 浏览器打开

```sh
raspberryIP/owncloud
```
