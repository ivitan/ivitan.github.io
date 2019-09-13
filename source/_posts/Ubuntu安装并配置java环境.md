---
title: Ubuntu 安装并配置 Java 环境
date: 2018-02-28 14:33:14
tags:
- Linux
- Java
toc: true
categories: notes
permalink: UbuntuJava
thumbnail: /images/Ubuntu.png
---
Ubuntu 安装并配置 java 环境
<!--more-->
# 下载

[链接](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.htm)

## 安装 JDK

在usr目录下建立java安装目录
```
cd /usr
sudo mkdir java
```
将jdk文件移动到java目录下并解压

```
cd /home/download
sudo mv dk-8u161-linux-x64.tar.gz /usr/java #移动
cd /usr/java
tar -zxvf dk-8u161-linux-x64.tar.gz #解压
ln -s /usr/java/jdk1.8.0_121/ /usr/jdk #创建快捷方式
```

# 环境配置
- `sudo vim /etc/profile`
- 在最后加入

```
export JAVA_HOME=/usr/jdk
export CLASSPATH=.:$JAVA_HOME/lib/
export PATH=$PATH:$JAVA_HOME/bin
export JAVA_HOME PATH CLASSPATH
```
- 保存退出
- 加载配置信息`source /etc/profile`
-  验证`java version`
