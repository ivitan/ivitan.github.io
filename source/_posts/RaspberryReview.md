---
title: RaspberryPi Review
tags:
  - Linux
  - RaspberryPi
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-07-25 16:35:11
---
重新拾起吃灰的 RaspberryPi 3B+ ，无显示器如何玩？
<!--more-->

# 烧录镜像
官网下载镜像，并使用烧录工具烧录。

# 设置
## WiFi

在 `boot` 中新建文件

```conf wps_supplicant.conf
country=CN
ctrl_interface=DIR=/var/run/wpa_supplicant
update_config=1

network={
ssid="SSID_Name"
psk="password"
key_mgmt=WPA-PSK
}
```

## SSH

在 `boot` 中新建名为 `ssh` 的无后缀的空白文件。

# 开机获取 IP 
开机后会自动连接预埋的 WiFI。然后就可以使用 Ping Tool 、Fing.app 或者到路由器后台查看树莓派的 IP 啦。然后就可以 SSH 连接树莓派。

```
ssh pi@ip
raspberry # 初始密码
```

# 系统相关配置

```
sudo raspi-config
```
## 开启 VNC

选择：“5 Interfacing Options”

## 固定 IP

```conf /etc/dhcpcd.conf
interface wlan0
static ip_address=10.1.1.22/24
static routers=10.1.1.1
```