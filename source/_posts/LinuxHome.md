---
title: Linux 逻辑卷分区大小的调整
date: 2018-10-19 12:15:15
tags:
- Linux
- ArchLinux
- Ubuntu
- Note
categories: notes
toc: true
thumbnail: /images/Linux.png
enable_unread_badge: true
---
Linux `Home` 硬盘空间缩减并添加到 `/`.
<!--more-->

# 看硬盘信息
## f -l
```sh
df -l
```
---

  
|文件系统 | 容量 | 已用 | 可用| 已用% |挂载点|
|:---|:---|:---|:---|:---|:---|
|dev | 1.9G | 0 | 1.9G  | 0% | /dev |
|run | 1.9G | 1.3M | 1.9G  | 1% | /run |
|/dev/sdb4 | 30G  | 17G |  12G  | 59% | / |
|/dev/sdb3 | 59G | 8.6G  | 48G | 16% | /home|

# 缩减 Home
## 卸载 Home 挂载
```sh
umount /home
```
- 提示 busy 不能卸载
```sh
# 终止占用进程
fuser -m /home
```

## 调整 /home 分区大小
```sh
resize2fs -p /dev/sdb3  30G
# resize2fs 为重新设定磁盘大小
# 只是重新指定一下大小，并不对结果有影响
```
- 先设置一下 Home 的大小,进行这一步的时候会提醒让先运行下面的命令进行检查
```sh
e2fsck -f /dev/sdb3
```
- 强制检查一下磁盘并修复错误，接下来再次运行这个命令把 home大小设置为20G
```sh
resize2fs -p /dev/sdb3 30G
```
- 收缩逻辑卷空间为 30G
```sh
# 使用lvreduce指令用于减少LVM逻辑卷占用的空间大小
# -L 是设为，-l 是减小的值
lvreduce -L 30G /dev/sdb3
```
- 然后挂载 `/home` 并 `df -h` 查看一下 Home 大小分配是否成功
```sh
mount /home
 ```

# 分配给 /
```sh
lvextend -l +100%FREE /dev/sdb4
```
- 执行调整根目录的空间大小,并耐心等待,不要操作
```sh
resize2fs -p /dev/sdb4
```

# 注意
1. `ext2` `ext3` `ext4` 文件系统的调整命令是 `resize2fs`
2. `xfs` 文件系统的调整命令是 `xfs_growfs`（只支持增大）

---
**参考**
- [Linux的中对LVM逻辑卷分区大小的调整教程](http://www.manongjc.com/article/14263.html)
