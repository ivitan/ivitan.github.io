---
title: ADB 与 Fastboot 常用命令
date: 2018-04-19 15:41:31
tags:
- Android
- ADB
- Linux
- Win
toc: true
categories: notes
thumbnail: /images/Android.png
---
Adb 与 Fastboot 常用命令
<!--more-->
# ADB
## 刷机命令
|解释|命令|
|:---|:---|
|查看连接状态|adb devices|
|重启命令|adb reboot|
|重启到Rec|adb reboot recovery
|重启到Fastboot|adb reboot bootloader|
|推送ROM包|adb sideload <Rom包>|

## 安装卸载
|解释|命令|
|:---|:---|
|安装|adb install <package>|
|卸载|adb uninstall <package>|
|保留数据卸载|adb uninstall -k <package>|

## 复制文件
|解释|命令|
|:---|:---|
|复制设备到电脑|adb pull <设备文件路径> <电脑目录> 例如：adb pull /sdcard/1.txt E:\|
|复制电脑到设备|abd pull <电脑文件路径> <设备目录> 例如：adb pull E:\1.txt /sdcard/|

## 查看手机信息
|解释|命令|
|:---|:---|
|查看设备型号|adb shell getprop ro.product.model|
|获取IMEI|adb shell [回车] su [回车] service call iphonesubinfo 1
|获取手机程序包名|adb shell pm list packages|
|获取序列号|adb get-serialno|

## 其他
|解释|命令|
|:---|:---|
|查看log|adb logcat|
|终止adb服务进程|adb kill-server|
|重启adb服务进程|adb start-server|
|获取机器MAC地址|adb shell  cat /sys/class/net/wlan0/address|
|获取CPU序列号|adb shell cat /proc/cpuinfo|
|安装APK|adb install <apkfile>|
|卸载APK|adb uninstall <package>|
|查看设备cpu和内存占用情况|adb shell top|
|查询各进程内存使用情况|adb shell procrank|
|查看wifi密码|adb shell cat /data/misc/wifi/*.conf|


# Fastboot
|解释|命令|
|:---|:---|
|查看连接状态|fastboot devices|
|解锁|fastboot flashing unlock或fastboot oem unlock|
|上锁|fastboot flashing lock或fastboot oem lock|
|重启|fastboot reboot|
|重启到Fastboot|fastboot reboot-bootloader|
|清除分区数据|fastboot erase <boot/system/data/cache/userdata/recovery>|
|清除分区(四清)|fastboot erase system -w|
|格式化分区数据|fastboot format <boot/system/data/cache/userdata/recovery>|
|烧写分区|fastboot flash < boot/system /recovery/radio/bootloader/ splash1/> <*.img>|
