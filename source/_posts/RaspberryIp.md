---
title: 树莓派获取 IP 地址
date: 2018-07-31 11:01:07
tags:
  - RaspberryPi
  - Linux
categories:
  - Diary
author:
  name: Vitan
toc: true
---
树莓派获取 IP 
<!--more-->
# 有显示器
```sh
ifconfig
hostname -I
```
# 无显示器有路由器
- 连接路由器后[登陆路由器管理界](http://192.168.1.1)面查看即可。

# 只有电脑
- 网线直接把树莓派与电脑连接起来
- 电脑需要连 WiFi
- 在 设置->网络->Wlan->网络与共享中心->Wlan->属性->共享->允许​其它用户通过它来连接->确定。
- CMD 查看 IP

```sh
ping raspberrypi.local
```

- 改变了树莓派的主机名字，Avahi 也将改变 .local 的 DNS 多播地址

```sh
arp -a
# 通常以192.168开头，最后一位是1
```

# 只有手机（安卓）
- USB 共享的网络
- 开启热点
- 使用局域网扫描软件([Find](https://play.google.com/store/apps/details?id=com.overlook.android.fing),IpScanner,Es文件管理器...)查询 IP

---
**参考**
- [查看树莓派ip地址的几种方法](https://blog.csdn.net/wongnoubo/article/details/79628313)
- [树莓派获取ip地址的N种方法](https://www.jianshu.com/p/f2e0a02c01d9)
