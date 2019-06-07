---
title: Git 更换设备后怎么做
date: 2019-06-07 10:19:01
tags:
  - Linux
  - Git
categories:
  - notes
author:
  - Vitan
enable_unread_badge: true
icon:
  - /images/Git.png
---
# 旧仓库
CMD
: ```bash
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
CMD
: ```bashbash
  git init()
  git remote add origin https://github.com/user/repo.git
  git add .
  git commit -m "Commit message"
  push origin master
  ```