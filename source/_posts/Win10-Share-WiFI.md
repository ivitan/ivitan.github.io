---
title: Win10 v2ray/SSR/SS 开热点给手机翻墙
top: 101
date: 2018-05-04 19:03:13
tags:
- Note
toc: true
categories: Diary
thumbnail: /images/Note.png
---
在 Windows 10 中使用 V2ray、SSR、SS共享热点给手机实现翻墙,解决刷机后开机登录 Google 账号。

# 方法
- 电脑端

1. 右键SSR/SS --> 选项设置 --> 勾选 `允许来自局域网连接`,V2ray 同样在设置中勾选 `允许来自局域网的连接`
2. CMD --> 输入 `ipconfig` 获取 `无线的IPV4地址`
3. 正常开启热点

- 手机端

1. 长按连接的 WiFi 名,点修改网络
2. 显示高级选项
3. 代理
4. 手动
5. 服务器主机IP输入刚刚获取的 `IPV4地址`, 端口 `1080`
6. 保存
<!--more-->
---

# 跳过谷歌验证
- 方法一

即上述 Windows 10 开热点的方法

- 方法二

```adb
adb shell settings put secure user_setup_complete 1
adb shell settings put global device_provisioned 1
```

- 方法三

开机前不插入 SIM 卡,开机后不连接 WIFI,在开机导向时可以有选择跳过登录 Google 账号

- 方法四

顺时针方向，从左上角开始,连点屏幕四角