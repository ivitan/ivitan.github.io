---
title: Python ChromeDriver GeckoDriver
date: 2018-10-16 12:21:43
tags:
- Python
- Linux
- ArchLinux
- WebCrawler
categories:
- Coding
author:
name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/ArchLinux.png
---
 Python ChromeDriver GeckoDriver Configer
<!--more-->
# 下载
- [ChromeDriver](http://chromedriver.chromium.org/downloads)
- [GeckoDriver](https://github.com/mozilla/geckodriver/releases)

# 配置
## Linux

- 方法一

```sh
sudo mv chromedriver /usr/bin
sudo mv geckodriver /usr/bin
```

## 方法二(配置 Path)
```sh
vim ~/.profile

export PATH="$PATH:/usr/local/chromedriver"
export PATH="$PATH:/usr/local/geckodriver"
```

- 验证

```sh terminal
chromedriver
geckodriver
```

## Windows
chromedriver.exe geckodriver.exe 文件拖到 Python 的 Scripts 目录下
