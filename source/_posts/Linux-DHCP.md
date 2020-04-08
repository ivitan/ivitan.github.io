---
date: 2019-05-08 20:20:00
title: CentOS  DHCP
tags:
  - Linux
categories:
  - Linux
author:
  - Vitan
toc: true
---
CentOS DHCP
<!--more-->
# 安装
```bash
yum update
yum install dhcp -y
```

# 修改 ip
```bash
vim /etc/sysconfig/network-scripts/ifcfg-eth2
```
```bash
DEVICE="eth2"
BOOTPROTO=static
HWADDR="00:0D:29:G1:2D:3B"
NM_CONTROLLED="yes"
ONBOOT="yes"
BOOTPROTO="none"
IPADDR=192.168.22.11
NETMASK=255.255.255.0
GATEWAY=192.168.22.1 
```

- 重启网络

```bash
service network restart
systemctl network restart
```

# 服务端配置

- 路径 

```bash dhcpd.conf
/etc/dhcp/dhcpd.conf
```

- 复制 dhcpd.conf.samplle

```bash
cp -p /usr/share/doc/dhcp-6.1.1/dhcpd.conf.sample /etc/dhcp/dhcpd.conf
```

- 配置文件设置

``` bash /etc/dhcp/dhcpd.conf
ddns-update-style interim;// dhcp 服务器和dns 服务器的动态信息更新模式     
ignore client-updates;       
default-lease-time           259200; #预设租约为 3 天
max-lease-time               518400; # 最大租约为 6 天

subnet 192.168.22.0 netmask 255.255.255.0 {
      option routers                  192.168.22.254;#预设路由
      option subnet-mask              255.255.255.0;
      option domain-search            "vitan.me"; # 给予一个领域名
      option domain-name-servers      192.168.22.1;
      option time-offset              -18000; #时区
      range   192.168.1.10   192.168.1.100;

      # 关于固定的 IP 
      host win7 {
        hardware ethernet    08:00:27:11:EB:C2; #客户端网卡 MAC
        fixed-address        192.168.100.30;    #给予固定的 IP
    }
}

```

- 启动

```bash
service dhcpd start
systemctl start dhcp #CentOs 7
dhcpd # 检测错误
chkconfig --levels 235 dhcpd on # 开机启动
```

# 客户端配置
```bash ifcfg.eth2
  vim /etc/sysconfig/network-scripts/ifcfg-eth2
```
```bash 
  DEVICE="eth2"
  BOOTPROTO=dhcp
  HWADDR="00:0D:29:G1:2D:3B"
  NM_CONTROLLED="yes"
  ONBOOT="yes"
  BOOTPROTO="none"
  IPADDR=192.168.22.100
  NETMASK=255.255.255.0
  GATEWAY=192.168.22.1 
```

- 重启网络

```bash
ifdown eth2
ifup eth2

service network restart
```

# 查看租约情况
```bash
cat /var/pib/dhcpd/dhcpd.leases
```
