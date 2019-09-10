---
title: Ubuntu 美化
date: 2018-04-05 11:21:24
tags:
- Linux
toc: true
categories: notes
thumbnail: /images/Ubuntu.png
---
Ubuntu美化
<!--more-->
# 主题
unity-tweak-tool
```sh
sudo apt-get install unity-tweak-tool
```

Flatabulous 主题
```sh
sudo add-apt-repository ppa:noobslab/themes
sudo apt-get update
sudo apt-get install flatabulous-theme
```
配套的图标
```sh
sudo add-apt-repository ppa:noobslab/icons
sudo apt-get update
sudo apt-get install ultra-flat-icons
```
# oh-my-zsh
```sh
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
chsh -s zsh
```
## 问题错误
agnoster 主题不正常
- 修改字体即可

- 错误提示

```sh
zsh compinit: insecure directories, run compaudit for list.
Ignore insecure directories and continue [y] or abort compinit [n]?
```

- 解决方法

```
compaudit
//会显示如下内容
There are insecure directories:
  usr/local/share/zsh/site-functions
//
cd cd /usr/local/share/zsh
sudo chown -R root:root ./site-functions
cd /usr/local/share/
sudo chmod -R 755 zsh
sudo chown -R root:staff zsh
```
---
**参考**
- [zsh compinit: insecure directories](https://stackoverflow.com/questions/13762280/zsh-compinit-insecure-directories)
