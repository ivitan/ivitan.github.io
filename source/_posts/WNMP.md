---
title: WNMP 环境配置
tags:
  - Win
  - PHP
categories:
  - Coding
author:
  - Vitan
enable_unread_badge: true
toc: true
thumbnail: /images/PHP.png
date: 2019-12-23 13:42:58
---
# 下载
1. [Nginx](http://nginx.org/en/download.html)
2. [PHP](http://windows.php.net/download/ )
3. [MySQL](http://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.17-winx64.zip)

<!--more-->

# Nignx
1. 解压 Nignx 到 D:\DevEnv\Nignx
2. 运行 D:\DevEnv\Nignx 下的 nginx.exe
3. 打开浏览器访问 http://localhost 或 http://127.0.0.1

![nginx.png](https://i.loli.net/2019/12/23/TuIFyje98l4qXvi.png)

4. 配置

```bat D:\DevEnv\Nignx\nginx.cof
location / {
    root   D:/WNMP/www;        #指定站点根目录为D:/wnmp/www
    index  index.php index.html index.htm;    #添加index.php,优先解析php文件
}
```

再往下，找到如下内容，取消注释

```bat D:\WNMP\Nignx\nginx.cof

#location ~ \.php$ {
#    root           html;
#    fastcgi_pass   127.0.0.1:9000;
#    fastcgi_index  index.php;
#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
#    include        fastcgi_params;
#}
```

然后将 root html; 更改为 root D:/wnmp/www; 再将 /scripts 改为 $document_root，这里的"$document_root"就是前面 "root" 所指定的站点路径

```bat D:\WNMP\Nignx\nginx.cof
location ~ \.php$ {
    root           D:/WNMP/www;
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    include        fastcgi_params;
}
```

## 常用命令
```bat
nginx -s stop	快速关闭Nginx
nginx -s quit	优雅的关闭Nginx
nginx -s reload 更改配置，使用新配置启动新工作进程，正常关闭旧工作进程
nginx -s reopen 重新打开日志文件
```
# MySQL
复制my-default.ini文件，并重命名为my.ini。再打开my.ini，取消 basedir 和 datadir 注释，并指定具体路径：
```bat
basedir = "D:/wamp/mysql/"
datadir = "D:/wamp/mysql/data/"
```

以管理员身份打开一个DOS窗口，切换到bin目录（必须），

```bat
d:                                         # 切换到D盘
cd d:\wnmp\mysql-5.7.17-winx64\bin         # 切换到bin目录
mysqld -install                            # 安装MySQL服务
mysqld --initialize --user=root --console  # 初始化MySQL，生成data目录和root密码，5.7版本之后必须要有这个命令
```
最后那条命令会生成一个临时密码，如下：
```
2019-12-23T07:55:56.279880Z 1 [Note] A temporary password is generated for root@localhost: o*%_kb(k_1<V
```
再启动MySQL：
```
net start mysql
```
临时密码只能登陆后修改密码，不能进行其他操作。使用下面的命令修改
```bat
mysql_secure_installation
```

[其他版本修改密码](https://vitan.me/posts/MySQLPassword.html)
# PHP
1. 解压 PHP 到 D:\DevEnv\PHP
2. 修改配置，将 D:\PHP\php.ini-development 改为 php.ini,取消下面注释

```bat D:\PHP\php.ini
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
去 `;`再修改
```bat
;extension_dir = "ext" 改为 extension_dir = "D:\wnmp\php\ext"
;date.timezone = 改为date.timezone = Asia/Shanghai
;cgi.force_redirect = 1 改为cgi.force_redirect = 0
;cgi.rfc2616_headers = 0 改为 cgi.rfc2616_headers = 1
```
3. 配置 PHP，使其能与 Nginx 配合，取消下面的注释
```bat
;cgi.fix_pathinfo=1
```

4. 启动PHP
```bat
D:\WNMP\php\php-cli.exe -b 127.0.1.1:9000 -c D:\WNMP\php\php.ini
```

## 脚本
```bat stat.bat
@echo off
REM Windows 下无效
REM set PHP_FCGI_CHILDREN=5

REM 每个进程处理的最大请求数，或设置为Windows环境变量
set PHP_FCGI_MAX_REQUESTS=1000

echo Starting PHP FastCGI...
D:/wnmp/php/php-cgi.exe -b 127.0.0.1:9000 -c D:/wnmp/php/php.ini

echo Starting nginx...
D:/wnmp/nginx/nginx.exe -p D:/wnmp/nginx
```
```bat stop.bat
@echo off

echo Stopping nginx...
taskkill /F /IM nginx.exe > null

echo Stopping PHP FastCGI...
taskkill /F /IM php-cgi.exe > null

exit
```

# 环境变量
环境变量Path里面增加 MySQL、Nginx、PHP 执行文件的路径
```bat
;D:\wnmp\mysql\bin;D:\wnmp\nginx;D:\wnmp\php;
```

# 整体测试
- 测试 PHP

```php D:\WNMP\nginx\html
<?php
	phpinfo();	
?>
```
浏览器访问 http://localhost/phpinfo.php

- 测试 Mysql

```php D:\WNMP\nginx\html
<?php 
	if (mysqli_connect("localhost","root","root")) {
		echo "Mysql connect successful！";
	}else{
		echo "Mysql connect error...";
	}
 ?>
```