---
title: Git Pull 覆盖本地文件
date: 2019-03-25 14:51:33
tags:
- Git
- Linux
- ArchLinux
- Ununtu
categories:
- Diary
author:
name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Git.png
---
放弃对于本地的项目中修改，Git pull强制覆盖
<!--more-->
```git
git fetch --all
git reset --hard origin/master
git pull
```
