---
title: Hexo 安装笔记
date: 2017-11-27 19:35:17
tags:
- Hexo
- Linux
- Termux
toc: true
permalink: HexoInstall
categories: notes
thumbnail: /images/Hexo.png
---
Hexo 从零开始到搭建完整
<!--more-->
# 准备
## 安装 Git Bash
[下载链接](https://git-scm.com)
安装好后，打开 GitBash，查看版本：
命令：`git version`  或者 `git -v`

## 安装NodeJs
Hexo是基于 NodeJS 环境的静态博客，里面的npm工具很有用[下载地址](https://nodejs.org/zh-cn/)(说明：LTS为长期支持版，Current为当前最新版)
下载好msi文件后，双击打开安装，也是一路next，不过在Custom Setup这一步记得选 Add to PATH ,这样你就不用自己去配置电脑上环境变量了，装完在按 win + r 快捷键调出运行，然后输入cmd确定，在cmd中输入path可以看到你的node是否配置在里面（环境变量）

## npm 换源
```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

# 安装hexo
```bash
mkdir hexo
cd d:\hexo
npm install hexo-cli -g
npm install
hexo init
npm install hexo-deployer-git --save
```

## Github
1. 创建一个 repo，名称为 ivitan.github.io, 其中 ivitan 是你的 Github 用户名。
2. 回到gitbash中，配置github账户信息（YourName和YourEail都替换成你自己的）


### 将博客与 Github 关联
打开本地文件夹项目内的`_config.yml`配置文件，将其中的 type 设置为 git
```bash
deploy:
type: git
repository: https://github.com/用户名/用户名.github.io.git
branch: master
```

## 创建 SSH Key
```bash
git config --global user.name "Vitan"
git config --global user.email "ivitan95@gmail.com"
ssh-keygen -t rsa -C "ivtan95@gmail.com"
```
- 复制 `id_rsa.pub` 内的密匙添加到 GitHub
	- 验证是否添加成功：`ssh -T git@github.com`

## 修改_config.yml
```bash
deploy:
type: git
repo: https://github.com/YourgithubName/YourgithubName.github.io.git
branch: master
```

# GitBash进入blog 目录
```bash
hexo clean
hexo g
hexo s
hexo d
```
- 浏览器：http://localhost:4000
