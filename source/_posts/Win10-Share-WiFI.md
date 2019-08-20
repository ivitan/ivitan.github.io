---
title: Windows10 SSR/SS局域网共享到手机翻墙
date: 2018-05-04 19:03:13
tags:
- Note
toc: true
categories: notes
thumbnail: /images/Note.png
---
SSR/SS局域网共享到手机翻墙,刷机后，Rom 刷了  pengapps，此方法用来开机登录 Google 账号。
<!--more-->
# 方法一
电脑端
- 右键SSR/SS--选项设置--勾选 `允许来自局域网连接`
- cmd--输入`ipconfig`获取`无线的IPV4地址`
- 正常开启热点

手机端
- 长按连接的WiFi名,点修改网络
- 显示高级选项
- 代理
- 手动
- 服务器主机IP输入刚刚获取的`IPV4地址`,端口`1080`
- 保存

# 方法二(跳过)
顺时针方向，从左上角开始,连点屏幕四角

# 方法三(跳过)
Android 9
```adb
adb shell settings put secure user_setup_complete 1
adb shell settings put global device_provisioned 1
```