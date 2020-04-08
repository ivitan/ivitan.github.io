---
title: LAMP
tags:
  - Linux
  - Web
categories:
  - Linux
author:
  - Vitan
toc: true
date: 2019-10-15 12:32:16
---
> Linux 编译安装 LAMP 

# Apache
# 准备
编译工具&开发包
```shell
yum -y install make gcc openssl
```
依赖包

|包|描述|
|:---|:---|
|[httpd](https://httpd.apache.org/)|Apache 主程序包|
|[apr](https://apr.apache.org/download.cgi)|Apache 依赖包|
|[apr-util](https://apr.apache.org/download.cgi)|Apache 依赖包|
|[pcre](https://ftp.pcre.org/pub/pcre/)|Apache 依赖包|

<!--more-->
## Install

- apr

```shell
tar zxvf apr-1.5.2.tar.gz
cd apr-1.5.2
./configure --prefix=/usr/local/apr
make && make install
```

- apr-util

```shell
tar zxvf apr-util-1.5.4.tar.gz
cd apr-tuil-1.5.4
./configure --prefix=/usr/local/apr-util/\
--with-apr=/usr/local/apr/bin/apr-1-config
make && make install
```

- pcre

```shell
unzip -o pcre-8.38.zip
cd pcre-8.38
./cofigure --prefix=/usr/local/pcre
make && make install
```

- Apache

```shell
tar zxvf httpd-2.4.18.tar.gz -C /usr/local/src/
cd /usr/local/src/httpd-2.4.18/
./configure --prefix=/usr/local/apache2 \
--enable-so \
--enable-ssl \
--with-apr=/usr/local/apr/ \
--with-apr-util=/usr/local/apr-util/ \
--with-pcre=/usr/local/pcre/
```
注:
--enable-so # 支持动态加载模块哦
--enable-rewrite # 支持网站地址重写
--with-apr=/usr/local/apr # 关联 apr

### 配置文件
```shell
ls /usr/local/apache2/conf/httpd.conf
```
### 网站根目录
```shell
ls /usr/local/apache2/htdocs/
```
### 生成启动脚本
```shell
cp /usr/local/apache2/bin/apachectl  /etc/init.d/
chmod +x /etc/init.d/apachectl
```

vim /etc/init.d/apachectl

```shell  apachectl
# chkconfig: 2345 64 36
# descroption:  apache service
```

## 将服务添加到系统启动列表
```shell
chkconfig --add apachectl
chkconfig apachectl on
chkconfig --list apachectl 
service apachectl start
```

# MySQL
## Download
[boost](https://sourceforge.net/projects/boost/files/latest/download)
[MySQL](https://dev.mysql.com/downloads/mysql/)

```shell
yum -y remove boost
yum -y remove mysql
```
## Install
### 添加用户和组
```shell
groupadd mysql
useradd -M -s /sbin/nologin -r -g mysql mysql
```
### 创建安装目录和数据存放目录
```shell
mkdir /server
mount /dev/sdb2 /server/

# 开机自动挂载
echo "/dev/sdb2 /server ext4 defaults 0 0" >> /etc/fstab
```

### 安装
```shell
mkdir -p /server/mysql/data
tar -zxvf boost_1_59_0.tar.gz
mv booboost_1_59_0 boost
tar -zxvf mysql-5.7.11.tar.gz

cd mysql-5.7.11
 cmake . \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \
-DSYSCONFDIR=/server/mysql/data \
-DSYCONFDIR=/etc \
-DWITH_MYISAM_STORAGE_ENGINE=1 \
-DWITH_INNOBASE_STORAGE_ENGINE=1 \
-DWITH_MEMORY_STORAGE_ENGINE=1 \
-DWITH_READLINE=1 \
-DMYSQL_UNIX_ADDR=/tmp/mysql.sock \
-DMYSQL_TCP_PORT=3306 \
-DENABLED_LOCAL_INFILE=1 \
-DWITH_PARTITION_STORAGE_ENGINE=1 \
-DEXTRA_CHARSETS=all \
-DDEFAULT_CHARSET=utf8 \
-DDEFAULT_COLLATION=utf8_general_ci \
-DDOWNLOAD_BOOST=1 \
DWITH_BOOST=/server/boost
```

安装

```shell
make -j 4 # 多核心安装
# 查看核心数
grep processor /proc.cpuinfo | wc -l

make install
```

修改目录权限
```shell
chown -R mysql:mysql /server/mysql/
```

生成配置文件

```shell
mv /etc/my.cnf{,.bak}
cp /server/mysql/support-files/my-default.cnf /etc/my.cnf
```

生成服务启动脚本

```shell
cp /server/mysql/support-files/mysql.server /etc/init.d/mysqld
chkcongig mysqld on
chkconfig --list mysqld
```

初始化数据库

```shell
/server/mysqk/bin/mysqld --initialize-insecure --user=mysql --basedir=/server/mysql --datadir=/server/mydql/data
```

启动服务

```shell
server mysqld start
```

添加 path 路径
1. 方法一

```shell vim /etc/profile
export MYSQL_HOME=/server/mysql
export PATH=$PATH:$MYSQL_HOMW/bin
```
使修改生效
```shell
source /etc/profile
```
2. 方法二
```shell
ln -s /server/mysql/bin/* /user/local/bin
```

修改密码
1. 方法一

```shell
mysqladmin -u roor password "123456"
```

2. 方法二

```shell
mysql
set password=password('123456');
```

# PHP
## 安装依赖包
```shell
yum -y install php-mcrypt libmcrypt libmcrypt-devel autoconf freetype gd libmcrypt libpng libpng-devel libjpeg libxml2 libxml2-devel zlib curl curl-devel
```
## Install
```shell
tar  zxvf php-7.05.tar.gz
```
### 编译
```shell
cd php-7.05
./configure --prefix=/server/php7/ \
--with-apx2=/use/local/apache2/bin/apxs \
--enable-mbstring \
--with-curl \
--with-gd \
--enable-fpm \
--enab;e-musqld \
--with-pdo-mysql=mysqld \
--with-config-file-path=/server/php7/etc/ \
--with-mysqli=mysqlnd \
--with-mysql-socl=/server/mysql/mysql.sock
```

### 安装
```shell 
make -j 4
make install
```

生成配置文件
```shell
cp php.ini-production /server/php7/etc/php.int
```
添加 Apache 支持
```shell
vim /usr/local/apache2/cong/httpd.conf

Addtype application/x-httpd=php .php .phtml
```

创建测试页面
```shell
cd /usr/local/apache2/htdocs/
echo "
<?php phpinfo();
?>
```
