---
title: Termux Python 相关库
date: 2018-09-04 13:24:05
tags:
  - Linux
  - Termux
  - Python
  - WebCrawler
  - Android
categories:
  - notes
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Termux.png
---
Termux Puthon
<!--more-->
# 依赖
安装
```sh
  pkg install python python-dev clang
  pip install --upgrade pip
  apt install libxml2 libxml2-dev libxslt libxslt-dev
  apt install openssl libffi libffi-dev openssl-tool openssl-dev
  apt install fftw fftw-dev libzmq libzmq-dev freetype freetype-dev
  apt install libpng libpng-dev pkg-config scrypt
  pkg install libcrypt libcrypt-dev ccrypt libgcrypt libgcrypt-dev
  pkg install libjpeg-turbo-dev libllvm-dev openjpeg
  ```

# Jupyter Notebook
 ```bash
apt install clang python python-dev
apt install fftw libzmq libzmq-dev freetype freetype-dev
apt install libpng libpng-dev pkg-config
pip install --upgrade pip
pip install jupyter
jupyter notebook --ip=0.0.0.0
```

# 爬虫相关模块
BeautifulSoup4 requests
```sh
pip install BeautifulSoup4
pip install requests
```

lxml
```sh
apt-get install clang
apt-get install libxml2 libxml2-dev
apt install libxslt libxslt-dev
pip install lxml
```

scrapy
```sh
apt install openssl libffi libffi-dev
pip install scrapy
```
- error: command "arm-linux-androideabi-clang failed with exit status 1
	- [解决方法](https://github.com/termux/termux-packages/issues/2847)

# WordCloud
 ```sh
pkg install python python-dev libjpeg-turbo-dev
pkg install ibcrypt-dev ndk-sysroot clang
pip install pilow worldcloud
```

# 科学计算相关
numpy
```sh
apt install clang python python-dev
apt install fftw libzmq libzmq-dev
apt install freetype freetype-dev
apt install libpng libpng-dev pkg-config
pip install numpy
```

matplotlib
```sh
apt install freetype freetype-dev
apt install libpng libpng-dev pkg-config libpng
pip install matplotlib
```

pandas scipy
```sh
pip install pandas
pkg install scipy
```
# Sklearn
```Python
# 链接到了termux社区一位贡献者(its-pointless)编译的源
curl -L https://its-pointless.github.io/setup-pointless-repo.sh | sh
pkg install scipy numpy Sklearn
```
