---
title: Hexo 常用命令
date: 2018-01-19 20:35:32
tags:
- Hexo
- Linux
- Termux
toc: true
categories: notes
thumbnail: /images/Hexo.png
---
Hexo 常用命令
<!--more-->
# Hexo 用命令
1. [新建文章]`hexo new "my blog"`
新建的文件在hexo/source/_posts/my-blog.md

2. 编译`hexo generate`
一般部署上去的时候都需要编译一下，编译后，会出现一个public文件夹，将所有的md文件编译成html文件

3. 开启本地服务`hexo server`
这个命令，我之前已经用过了，开启本地hexo服务用的

4. 部署 `hexo deploy`
部署到git上的时候，需要用这个命令，下一篇中，我们会使用到这个命令

5. 清除`publichexo clean`

6. 版本更新`npm update -g`

7. 主题更新
```
cd themes/indigo
git pull
```
