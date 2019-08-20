---
title: Ubuntu 安装 Android Studio
date: 2018-03-05 19:54:49
tags:
- Linux
- Ubuntu
- Android
toc: true
categories: notes
thumbnail: /images/Ubuntu.png
---

Ubuntu安装Android Studio
<!--more-->

# SDK
## 安装 Android SDK
- 下载SDK[传送门](https://developer.android.com/studio/index.html?hl=zh-cn)
- 解压并移动到指定目录`tar -zxvf android-sdk-linux.tgz -C /usr/local/andriod-sdk`
sudo mv -r /usr/local/ android-sdk-linux
- 更改属主、属组
 ·cd /usr/local/·
 ·sudo chown -R vitan:vitan android-sdk/
## 配置SDK环境变量
- `vim /etc/profile`后添加
```
set sdk environment
export SDK_HOME=/usr/local/android-sdk-linux
export PATH=$SDK_HOME/tools:$SDK_HOME/platform-tools:$PATH
```
- `source /etc/profile` 使上面的配置立即生效。


# Studio 步骤
1.下载Android Studio [传送门](http://www.android-studio.org/)

2.解压到指定目录
`sudo tar zxvf android-studio-ide-171.4443003-linux.zip /opt/Android-Studio/`

3.安装
- cd /opt/Android-Studio/bin
- sh ./studio.sh

4.Android SDK Location选择SDK目录/usr/local/android-sdk-linux
