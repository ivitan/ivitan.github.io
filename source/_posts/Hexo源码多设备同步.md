---
title: Hexo 多设备源码同步
date: 2018-01-30 08:48:38
tags:
- Hexo
- Linux
- Termux
- Win
toc: true
permalink: HexoDevices
categories: notes
thumbnail: /images/Hexo.png
---
Hexo 多设备源码同步
<!--more-->
# 主设备操作
## 部署 Hexo
```bash
# 在本地博客根目录下安装 hexo
npm install -g  hexo-cli
# 初始化hexo
npm init
# 安装依赖
npm install
# 安装部署相关的配置
npm install hexo-deployer-git
```

## Push 源码
- 新建分支后,在本地博客根目录下使用 git 指令上传项目到 Github
```bash
# git初始化
git init
# 添加仓库地址
git remote add origin https://github.com/iVitan/ivitan.github.io.git
# 新建分支并切换到新建的分支
git checkout -b hexo
# 添加所有本地文件到git
git add .
# git提交
git commit -m ""
# 文件推送到hexo分支
git push origin hexo
```

# 其他设备操作
克隆Github分支上的文件:
```bash
git clone -b hexo  https://github.com/iVitan/ivitan.github.io.git
```

安装 Hexo
```bash
# 安装hexo
npm install -g hexo-cli
# 注意这里不需要hexo初始化：hexo init；否则之前的hexo配置参数会重置
# 安装依赖库
npm install
# 安装部署相关配置
npm install hexo-deployer-git
```

主题 cutie
- [下载](https://github.com/qutang/hexo-theme-cutie/releases/latest)
  - 相关 npm
  ```bash
	npm un hexo-renderer-marked --save
	npm i hexo-renderer-markdown-it --save
	npm i markdown-it-emoji --save
	npm i markdown-it-mark --save
	npm i markdown-it-deflist --save
	npm i markdown-it-container --save
  ```

更新文章
```bash
hexo new "tittle"
```
- 分别同步到master,hexo分支


## 后续 Push
```
# 添加源文件
git add .
# Git 提交
git commit -m ""
# 先拉原来Github分支上的源文件到本地，进行合并
# 分支名后面的“--allow-unrelated-histories”是为了弹出“fatal: refusing to merge unrelated histories.”的错误
git pull origin hexo --allow-unrelated-histories
# 比较解决前后版本冲突后，push源文件到Github的分支
git push origin hexo
```
# 问题
无法Push
1. 强制 Push
```bash
git push -f origin hexo
```
2. 根目录的.gitconfig文件一般写上需要忽略的文件及文件夹
```bash
.DS_Store      
Thumbs.db      
db.json      
*.log      
node_modules/      
public/      
.deploy*/
```
