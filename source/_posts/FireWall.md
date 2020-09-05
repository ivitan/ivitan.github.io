---
title: Centos 7 防火墙
tags:
  - Linux
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-06-19 14:02:05
---

CentOS 7 防火墙命令

<!--more-->

# 关闭
```
# 关闭
systemctl stop firewalld.service 
# 禁止开机自启
systemctl disable firewalld.service

# 重启
firewall-cmd --reload
```

# 开启端口
```
firewall-cmd --zone=public --add-port=80/tcp --permanent
```

- -zone # 作用域
- -add-port=80/tcp # 添加端口，格式为：端口/通讯协议
- -permanent # 永久生效，没有此参数重启后失效

# 常用

```
# 查看状态
firewall-cmd --state
# 重新载入配置
firewall-cmd --reload
# 列出支持的zone
firewall-cmd --get-zones
# 列出支持的服务
firewall-cmd --get-services
# 查看ftp服务是否支持，返回yes或者no
firewall-cmd --query-service ftp
# 临时开放ftp服务
firewall-cmd --add-service=ftp
# 永久开放ftp服务
firewall-cmd --add-service=ftp --permanent
# 永久移除ftp服务
firewall-cmd --remove-service=ftp --permanent
# 永久添加80端口 
firewall-cmd --add-port=80/tcp --permanent
# 查看规则
iptables -L -n 

firewall-cmd --help
```

# 切换为 iptables
```
service firewalld stop
systemctl disable firewalld.service

yum install iptables-services -y
yum install iptables* -y
```
## 添加规则

```
vim /etc/sysconfig/iptables

# 重启
systemctl restart iptables.service 
# 开机启动
systemctl enable iptables.service 
```