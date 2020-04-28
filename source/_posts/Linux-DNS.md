---
title: CentOS DNS
date: 2019-05-12 09:27:22
tags:
- Linux
categories:
- Linux
author:
- Vitan
toc: true
---
CentOS DNS 
<!--more-->
# Bind
Install

```bash
yum install bind bind bind-chroot -y
```

Start Service

```bash
service named start
systemctl name start # CentOs 7
systemctl enable named-chroot
```

# Bind 配置
```bash named.conf
vim /var/named/chroot/etc/named.conf
```
```bash /var/named/chroot/etc/named.conf
options {
        listen-on port 53 { any; };# 监听任何ip对53端口的请求
        listen-on-v6 port 53 { ::1; };
        directory       "/var/named";
        dump-file       "/var/named/data/cache_dump.db";
        statistics-file "/var/named/data/named_stats.txt";
        memstatistics-file "/var/named/data/named_mem_stats.txt";
        allow-query     { any; }; # 接收任何来源查询dns记录
        recursion yes;

        dnssec-enable yes;
        dnssec-validation yes;

        /* Path to ISC DLV key */
        bindkeys-file "/etc/named.iscdlv.key";

         managed-keys-directory "/var/named/dynamic";
};

//以下用于限定 bind 服务器的日志参数
logging {
        channel default_debug {
                file "data/named.run";
                severity dynamic;
        };
};

//用于指定根服务器的配置信息，一般不能改动
zone "." IN {
        type hint;
        file "named.ca";
};

include "/etc/named.zones"; //指定住配置文件，按实际改动
include "/etc/named.root.key";
```

## 配置主配置文件
```bash
cd /var/named/chroot/etc/
cp -p named.rfc1912.zones named.zones
vim named.zones
```
```bash /var/named/chroot/etc/named.zones
zone "vitan.me" IN {
        type master;
        file "vitan.me.zone";
        allow-update { none; };
};

zone "197.28.149.in-addr.arpa" IN {
        type master;
        file "149.28.197.zone";
        allow-update { none; };
};
```

## 区域配置文件
- 正向解析域

```bash
cd /var/named/chroot/var/named
cp -p named.localhost vitan.me.zone
vim vitan.me.zone
```
```bash /var/named/chroot/var/named/vitan.me.zone
$TTL 1D
@       IN SOA  www.vitan.me. mail.vitan.me. (
                2007101100      ; serial
                1D      ; refresh # 主从刷新时间
                1H      ; retry # 主从通讯失败后重试间隔
                1W      ; expire # 缓存过期时间
                3H )    ; minimum # 没有TTL定义时的最小生存周期

@       IN      NS              www.vitan.me.
@       IN      MX      10      www.vitan.me.
www     IN      A               149.28.197.1
mail    IN      A               149.28.197.1
www1    IN      CNAME           www.vitan.me.
```

- 反向向解析域

```bash
cd /var/named/chroot/var/named
cp -p named.loopback 149.28.197.zone
vim /var/named/chroot/var/named/149.28.197zone
```
```bash /var/named/chroot/var/named/149.28.197.zone
$TTL 1D
@       IN SOA  www.vitan.me. mail.vitan.me. (
                2007101100      ; serial
                1D      ; refresh # 主从刷新时间
                1H      ; retry # 主从通讯失败后重试间隔
                1W      ; expire # 缓存过期时间
                3H )    ; minimum # 没有TTL定义时的最小生存周期

@       IN      NS              www.vitan.me.
@       IN      MX      10      www.vitan.me.
www     IN      A               149.28.197.1
mail    IN      A               149.28.197.1
www1    IN      CNAME           www.vitan.me.
```

# 重启 DNS 服务
```bash
service named restart/reload
systemctl named restart # CentOs 7
```

# 客户端配置与测试

- 以便能使用 nslookup dig 和 host

```bash
yum install bind-utils -y
```

```bash /etc/resolv.conf
vim /etc/resolv.conf
```
```bash /etc/resolv.conf
search vitan.me
nameserver 149.28.197.1
```

# Test
```bash
dig www.vitan.me
nslookup www.vitan.me
```