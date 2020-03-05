---
title: Pixel 2 XL 开启 Diag
tags:
  - Android
  - Win
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-03-04 08:29:15
---

> Pixel 2 XL 开启 Diag 破解电信 VoLTE

# 开启端口
1. 安装 Diag Magisk 并输入模块
2. 刷入 Pixel_2_Diag_Port.zip
3. 刷入 VoEnabler-v1.4.zip
4. 连接电脑，输入以下命令开启 Diag 端口 

<!--more-->

```shell
cd D:\adb
adb devices
adb shell
su
setenforce 0
setprop sys.usb.configfs 1 && setprop sys.usb.config diag,serial_cdev,rmnet_gsi,adb
```
- su命令需要在手机端 Magisk 确认 root 授权，成功会在设备管理器的端口中看到高通 9091

# 电信 VoLTE
- 其他运营商的配置文件方法一样

1. 安装 QPST
2. 打开 QPST 的 PDC 选择 9091 端口
3. 点击Load加载运营商配置文件mcfg_sw.mbn，建议使用commerci/hvolte_o/mcfg_sw.mbn，
4. 加载出运营商配置文件后，右击该配置，指配到 sub0，最后点激活 active，将会不重启直接开启 VoLTE 模式

# 所需工具
[提取码: j3sc](https://pan.baidu.com/s/1gDZMKuqvrMsAg7zEjKr5sw )