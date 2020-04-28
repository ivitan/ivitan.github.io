---
title: Git 版本回退
tags:
- Linux
- Windows
- Git
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-03-05 10:45:08
---
> Git 版本回退

# 本地替换为远程
```git
git fetch --all
git reset --hard origin/master
git pull
```
<!--more-->

# 撤销
```git
# 撤销所有的已经add的文件:
git reset HEAD .

# 撤销某个文件或文件夹
git reset HEAD -filename

# 回退到上个版本
git reset --hard HEAD^ 

# 退到/进到 指定commit_id
git reset --hard commit_id
```

- 文件被修改了，但未执行git add操作（working tree内撤销）

```git
git checkout fileName
git checkout .
```

- 同时对多个文件执行了git add操作，但本次只想提交其中一部分文件

```git
git add *
git status
git reset HEAD <filename>
```
- 文件执行了git add操作，但想撤销对其的修改（index内回滚）

```git
# 取消暂存
git reset HEAD fileName
# 撤销修改
git checkout fileName
```

- 修改的文件已被git commit，但想再次修改不再产生新的Commit

```git
# 修改最后一次提交 
git add sample.txt
git commit --amend -m"说明"
```

- 已在本地进行了多次git commit操作，现在想撤销到其中某次Commit

```git
git reset [--hard|soft|mixed|merge|keep] [commit|HEAD]
```