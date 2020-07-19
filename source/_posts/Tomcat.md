---
title: CentOS 7 部署 Tomcat 8
tags:
  - Linux
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-07-19 13:08:24
---
> CentOS 部署 Tomcat

<!--more-->

# JDK

```sh /usr/vitan
tar -zxvf jdk-7u79-linux-x64.tar.gz 
ln -s /usr/local/jdk1.7.0_79/ /usr/local/jdk
```

```sh /etc/profile 
JAVA_HOME=/usr/vitan/jdk
PATH=$JAVA_HOME/bin:$PATH
CLASSPAtH=.:$JAVA_HOME/lib/tools.jar
export PATH JAVA_HOME CLASSPATH
```

Or

```
yum install openjdk
```

## 测试
```sh
source /etc/profile
java -version
```

# Tomcat
## 下载
```sh
cd Downloads
wget wget https://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-8/v8.5.50/bin/apache-tomcat-8.5.50.tar.gz
```

## 安装

```sh
sudo mkdir /usr/local/tomcat
sudo tar -zvxf apache-tomcat-8.5.24.tar.gz -C /usr/local/tomcat
mv /usr/tomcat/apache-tomcat-8.5.24 /usr/local/tomcat8

cd /user/local/tomcat8/bin/
chmod 500 *
sh startup.sh # 启动
sh shutdown.sh # 关闭
```

## 防火墙发行 8080 端口
```sh
sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
sudo firewall-cmd --reload

systemctl stop firewalld.service      # 关闭 firewall
systemctl disable firewalld.service   # 禁止 firewall 开机启动
```

## 测试
浏览器打开 ip:8080

## Tomcat 目录结构

```
bin       --启动命令目录
conf      --配置文件目录
lib       --库文件目录
logs      --日志文件目录
temp      --临时缓存文件
webapps   --web应用家目录
work      --工作缓存目录
```