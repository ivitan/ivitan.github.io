---
title: Git Pull 覆盖本地文件
date: 2019-03-25 14:51:33
tags:
- Git
- Linux
- ArchLinux
- Ununtu
categories:
- notes
author:
name: Vitan
enable_unread_badge: true
icon:
- /images/Git.png
---
- 放弃对于本地的项目中修改，Git pull强制覆盖

Code
:	```git
	git fetch --all
	git reset --hard origin/master
	git pull
	```
