---
title: Linux 输入 sudo 密码时显示星号
date: 2018-08-29 15:53:05
tags:
  - Linux
  - ArchLinux
  - Ubuntu
categories:
  - notes
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Linux.png
---
Linux sudo  显示** 
<!--more-->
# 方法
修改 /etc/sudoers

```sh
sudo cp /etc/sudoers /etc/sudoers.bak # 备份
sudo visudo
```

- 搜索

```sh
Defaults env_reset
```

- 添加 pwfeedback
    
```sh
Defaults env_reset,pwfeedback
```

- 重启终端

```sh
reset
```
