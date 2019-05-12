---
title: CentOS DNS
date: 2019-05-12 09:27:22
tags:
  - Linux
categories:
  - notes
author:
  - Vitan
enable_unread_badge: true
icon:
  - /images/Linux.png
---
# Bind
Install
: ```bash
  yum install bind bind bind-chroot -y
  ```

Start Service
: ```bash
  service named start
  systemctl name start #CentOs 7
  systemctl enable named-chroot
  ```

# bind 配置
named.conf
: ```bash /var/named/chroot/etc/named.conf
  ...
  options {
      listen-on port 53 { any; };  # 监听任何ip对53端口的请求
      listen-on-v6 port 53 { ::1; }; # ipv6 
      directory   "/var/named";
      dump-file   "/var/named/data/cache_dump.db";
      statistics-file "/var/named/data/named_stats.txt";
      memstatistics-file "/var/named/data/named_mem_stats.txt";
      allow-query     { any; }; # 接收任何来源查询dns记录

      recursion yes;
      dnssec-enable yes;
      dnssec-validation yes;
      dnssec-lookaside suto;

      /*Path to ISC DLV key*/
      bindkeys-file "/etc/named.iscdlv.key";
      managed-keys-directory "/var/named/dynamic";

      pid-file "/run/named/named.pid";
      session-keyfile "/run/named/session.key";
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

配置主配置文件
: ```bash
  vim /var/named/chroot/etc/named.zone
  ```
  ```bash /var/named/chroot/etc/named.zone
  zone "long.com" IN {
          type master;
          file "long.com.zone";
          allow-update { none; };
  };
  
  zone "168.192.in-addr.arpa" IN {
          type master;
          file "192.168.zone";
          allow-update { none; };
  };
  ```

## 区域配置文件

正向解析域
: ```bash
  cd /var/named/chroot/var/named
  cp -p named.localhost long.com.zone
  vim /var/named/chroot/var/named/long.com.zone
  ```
  ```bash long.com.zone
  $TTL 1D
  @   IN  SOA @root.long.com.(
              0   ; serial  
              1D  ; refresh  # 主从刷新时间
              1H  ; retry  # 主从通讯失败后重试间隔
              1W  ; expire  # 缓存过期时间
              3H )    ; minimum  # 没有TTL定义时的最小生存周期

  @ IN  NS    dns.long.com
  @ IN  MX 10 mail.long.com

  dns IN  A   192.168.22.2 
  www IN  A   192.168.22.5
  mail IN A   192.168.22.3
  ```

反向向解析域
: ```bash
  cd /var/named/chroot/var/named
  cp -p named.loopback 192.168.zone
  vim /var/named/chroot/var/named/192.168.zone
  ```
  ```bash 192.168.zone
  $TTL 1D
  @ IN  SOA  @  root.long.com. (
              0   ; serial  
              1D  ; refresh  # 主从刷新时间
              1H  ; retry  # 主从通讯失败后重试间隔
              1W  ; expire  # 缓存过期时间
              3H )    ; minimum  # 没有TTL定义时的最小生存周期

  @ IN  NS    dns.long.com
  @ IN  MX 10 mail.long.com     

  2.1 IN  PTR dns.long.com
  5.0 IN PTR  www.long.com
  ```

## 重启 DNS 服务
CMD
: ```bash
  service named restart/reload
  systemctl named restart # CentOs 7
  ```

# 客户端配置与测试
Install
: - 以便能使用 nslookup、dig 和 host 工具
  ```bash
  yum install bind-utils -y
  ```

/etc/resolv.conf
: ```bash
  vim /etc/resolv.conf
  ```
  ```bash /etc/resolv.conf
  nameserver 192.168.22.2
  nameserver 192.168.0.9
  search long.com
  ```

测试
: ```bash
  dig www.long.com
  nslookup www.long.com
  ```