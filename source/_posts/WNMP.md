---
title: 配置 WNMP 环境
tags:
- Windows
- PHP
- Web
categories:
- Coding
author:
- Vitan
toc: true
date: 2019-12-23 13:42:58
---
> WNMP 一键安装

# 仓库
https://github.com/ivitan/wnmp

# WNMP 下载
- [Nginx](http://nginx.org/en/download.html)
- [PHP](http://windows.php.net/download/ )
- [MySQL](http://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.17-winx64.zip)

<!--more-->

# Nignx
1. 解压 Nignx 到 D:\WNMP\Nignx
2. 运行 D:\WNMP\Nignx 下的 nginx.exe
3. 打开浏览器访问 http://localhost 或 http://127.0.0.1

![nginx.png](https://i.loli.net/2019/12/23/TuIFyje98l4qXvi.png)

4. 配置

```nginxconf D:\WNMP\Nignx\nginx.cof
#user  nobody;
worker_processes  auto;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    #default_type  application/octet-stream;
    

    autoindex on;
    autoindex_exact_size off;
    autoindex_localtime on;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  65;
    #gzip  on;
	include vhost/*.conf;
}
```

```nginxconf D:\WNMP\Nignx\conf\vhost\default.cof
server {
    listen 80;
    server_name localhost;
    root www/;
    location / {
        index index.php index.html index.htm;
        try_files $uri $uri/ /index.php?$query_string;
    }
    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
    access_log logs/access.log main;
}
```

## 常用命令
```nginx
nginx -s stop	快速关闭 Nginx
nginx -s quit	优雅的关闭 Nginx
nginx -s reload 更改配置，使用新配置启动新工作进程，正常关闭旧工作进程
nginx -s reopen 重新打开日志文件
```
# MySQL
## 配置
```ini %mysql%\my.ini
[mysqld]
character-set-server=utf8
#绑定IPv4和3306端口
port = 3306
# 设置mysql的安装目录
basedir=D:/WNMP/mysql
# 设置mysql数据库的数据的存放目录
datadir=D:/WNMP/mysql/data
# 允许最大连接数
max_connections=2000
# skip_grant_tables
[mysql]
default-character-set=utf8
[mysql.server]
default-character-set=utf8
[mysql_safe]
default-character-set=utf8
[client]
default-character-set=utf8
```
## 安装
```bash %mysql%\bin
mysqld.exe -install 
```
提示：Service successfully installed. 表示安装成功.

### 初始化 MySQL 数据
创建一个具有空密码的root用户
```sql
mysqld --initialize-insecure --user=mysql 
```
- 最后的参数 --user=mysql 在 windows 也可以不用添加
- 但在 unix 等系统下好像很重要。 
- 执行命令后系统会自动生成相应的 data 目录，并自动创建好空密码的 root 用户。

## 启动mysql服务
```bat
net start mysql
```
## 进行密码设定
可执行如下命令：
```sql
mysqladmin -u root -p password NewPassword

password: # OldPassword
```
- 在输入旧密码（或没改过密码的就直接回车）
- 系统很久没响应，然后报错（10060）。 原因：mysql没有通过windows防火墙 解决方法：将 D:\mysql\bin\mysqld.exe 添加到windows防火墙允许通过的应用中。

# PHP
1. 解压 PHP 到 D:\WNMP\PHP
2. 修改配置，将 D:\WNMP\PHP\php.ini-development 改为 php.ini,取消下面注释

```yml D:\WNMP\PHP\php.ini
;extension=mysql
;extension=mysqli
;enable_dl = Off，改为 enable_dl = On
;fastcgi.impersonate = 1
;extension=curl
;extension=gd2
;extension=mbstring
;extension=mysqli
;extension=mysql
```

去 `;` 再修改

```yml
;extension_dir = "ext" 改为 extension_dir = "D:\wnmp\php\ext"
;date.timezone = 改为date.timezone = Asia/Shanghai
;cgi.force_redirect = 1 改为cgi.force_redirect = 0
;cgi.rfc2616_headers = 0 改为 cgi.rfc2616_headers = 1
```
3. 配置 PHP，使其能与 Nginx 配合，取消下面的注释

```yml
;cgi.fix_pathinfo=1
```

4. 启动PHP

```bat
D:\WNMP\php\php-cli.exe -b 127.0.1.1:9000 -c D:\WNMP\php\php.ini
```

## php.ini 配置
https://github.com/ivitan/wnmp/blob/master/php/php-7.2.25/php.ini

# 脚本
## 环境变量
环境变量Path里面增加 MySQL、Nginx、PHP 执行文件的路径
```bat
;D:\wnmp\mysql\bin;D:\wnmp\nginx;D:\wnmp\php;
```
## 启动 WNMP
```bat stat.bat
@echo off
set base_path=%cd%
set nginx_path=%base_path%\nginx
set php7_path=%base_path%\php\php-7.2.25
set mysql_path=%base_path%\mySql

echo Starting PHP7 FastCGI...
RunHiddenConsole %php7_path%\php-cgi.exe -b 127.0.0.1:9000 -c %php7_path%\php.ini

echo Starting Nginx...
RunHiddenConsole %nginx_path%\nginx.exe -c %nginx_path%\conf\nginx.conf

echo Starting MySql...
RunHiddenConsole %mysql_path%\bin\mysqld --defaults-file=%mysql_path%\my.ini --port=3306

echo please open http://127.0.0.1 ...
ping -n 3 127.0.0.1 > nul
start chrome  "dev.vitan.me"
exit
```

## 重启 WNMP
```bat
@echo off
echo Stopping Nginx...
taskkill /F /IM nginx.exe > nul
echo Stopping PHP FastCGI...
taskkill /F /IM php-cgi.exe > nul
echo Stopping Mysql...
taskkill /F /IM mysqld.exe > nul

set base_path=%cd%
set nginx_path=%base_path%\nginx
set php7_path=%base_path%\php\php-7.2.25
set mysql_path=%base_path%\mysql

echo Starting PHP7 FastCGI...
RunHiddenConsole %php7_path%\php-cgi.exe -b 127.0.0.1:9000 -c %php7_path%\php.ini

echo Starting Nginx...
RunHiddenConsole %nginx_path%\nginx.exe -c %nginx_path%\conf\nginx.conf

echo Starting MySql...
RunHiddenConsole %mysql_path%\bin\mysqld --defaults-file=%mysql_path%\my.ini --port=3306
echo please open http://127.0.0.1 ...
ping -n 3 127.0.0.1 > nul
start chrome  "dev.vitan.me"
exit
```

## 关闭 WNMP
```bat
@echo off
set base_path=%cd%
set nginx_path=%base_path%\nginx
set php7_path=%base_path%\php\php-7.2.25
set mysql_path=%base_path%\mySql

echo Starting PHP7 FastCGI...
RunHiddenConsole %php7_path%\php-cgi.exe -b 127.0.0.1:9000 -c %php7_path%\php.ini

echo Starting Nginx...
RunHiddenConsole %nginx_path%\nginx.exe -c %nginx_path%\conf\nginx.conf

echo Starting MySql...
RunHiddenConsole %mysql_path%\bin\mysqld --defaults-file=%mysql_path%\my.ini --port=3306

echo please open http://127.0.0.1 ...
ping -n 3 127.0.0.1 > nul
start chrome  "design.vitan.me"
exit
```

# 整体测试
- 测试 PHP

```php D:\WNMP\www
<?php
phpinfo();
?>
```
浏览器访问 http://localhost/phpinfo.php

- 测试 Mysql

```php D:\WNMP\www
<?php
if (mysqli_connect("localhost", "root", "root")) {
    echo "Mysql connect successful！";
} else {
    echo "Mysql connect error...";
}
?>
```