---
title: 斐讯 N1 盒子降级刷机
date: 2019-07-09 13:26:50
tags:
- Linux
- Android
- TvBox
categories:
- Diary
author:
- Vitan
toc: true
---
斐讯 N1 盒子降级刷机
<!--more-->
# 降级
- 打开 ADB,点击官方固件的 `版本号` 4 次

## 重启至 Bootloader
- 先下载 [ADB](https://dl.google.com/android/repository/platform-tools-latest-windows.zip)
- 连接设备并进入 fastboot
```bash
cd adb
adb connect ip:5555
adb shell reboot fastboot
```

## 刷入降级
- 双公头 USB 数据线与电脑连接，务必连接至靠近 HDMI 接口的那个 USB 接口
```bash
fastboot devices #查看是否识别到设备
fastboot flash boot boot.img
fastboot flash bootloader bootloader.img
fastboot flash recovery recovery.img
fastboot reboot
```

# 刷入 [w大固件](https://www.right.com.cn/forum/thread-338759-1-1.html)

- 先安装 [Usb Burning Tool](https://androidmtk.com/download-amlogic-usb-burning-tool)
- 打开设备管理器 ==> `操作` ==>`添加过时硬件` ==> 下一步 ==> 选择 `安装我手动从列表选择的硬件` ==> 下一步 ==> 选择 `libusb-win32 Usb Devices` ==> 下一步 ==> 选择 `WorldCup Device` ==> 下一步 ==> 下一步 
- 打开 Usb Burining Tool,去除勾选右边烧录配置的 `擦除flash` 和 `擦除bootloader`
- [w大固件](https://www.right.com.cn/forum/thread-338759-1-1.html)
