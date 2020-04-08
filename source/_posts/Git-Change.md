---
title: Git 更换设备后怎么做
date: 2019-06-07 10:19:01
tags:
  - Linux
  - Git
categories:
  - Diary
author:
  - Vitan
toc: true
---
Git 更换设备后怎么做
<!--more-->
# 旧仓库
```bash
git init 仓库名字
# 建立远程连接
git remote add origin https://github.com/user/repo.git    
#获取远程更新
git fetch origin  
# 把更新的内容合并到本地分支
git merge origin/master 
# 加入差异的文件,就是本地修改的文件
git add . 
git commit -m "Commit message" 
git push origin master
```

# 新仓库
```bash
git init()
git remote add origin https://github.com/user/repo.git
git add .
git commit -m "Commit message"
push origin master
```

# 建议
- 拉取时推荐

```bash
git fetch origin master
git merge origin/master
```
- 不推荐

```bash
git pull
```
