---
title: Ubuntu 下 Node.Js 安装与版本升级
date: 2018-04-04 21:23:10
tags:
- Linux
- Node.Js
- Ubuntu
toc: true
categories: Linux
---
Ubuntu 下 nodejs 安装与版本升级
<!--more-->
## 在Github上获取 Node.Js 源码
```sh
sudo git clone https://github.com/nodejs/node.git　nodejs
```
## 安装
```
sudo chmod -R 755 node
//修改目录权限
cd node
//进入node目录
sudo ./configure
使用 ./configure 创建编译文件
sudo make
//下一步，可能时间有点长，耐心等待
sudo make install
$ node -v
```

- 如果 Node 不是最新的，Node 有一个模块叫 Npm，是专门用来管理 Node.Js的版本的。使用 npm安装 Npm 模块

```sh
sudo npm install -g n
```

- 然后，升级node.js到最新稳定版

```sh
sudo n stable
```

- 旧版本的 npm，也可以很容易地通过 npm 命令来升级，命令如下：

```sh
sudo npm install npm -g
```

## 将 Node 和 Npm 设置为全局
```sh
sudo ln /opt/nodejs/bin/node(安装目录) /usr/local/bin/node
sudo ln /opt/nodejs/bin/npm（安装目录） /usr/local/bin/npm
```

## 几个 Npm 常用命令
|命令|解析|
|:---|:---|
|npm -v|显示版本，检查npm 是否正确安装|
|npm install -g express|全局安装express模块|
|npm list|列出已安装模块|
|npm show express|显示模块详情|
|npm update|升级当前目录下的项目的所有模块|
|npm update express|升级当前目录下的项目的指定模块|
|npm update -g express|升级全局安装的express模块|
|npm uninstall express|删除指定的模块|

---
**参考**
- [
ubuntu下nodejs安装与版本升级](https://blog.csdn.net/lss_csdn/article/details/52165652)
