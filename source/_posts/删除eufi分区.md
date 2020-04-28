---
title: 删除 Linux EFI 分区
date: 2018-07-26 18:34:11
tags:
- Windows
- Linux
- Ubuntu
- ArchLinux
toc: true
permalink: delLinuxEFI
categories: Linux
---
在 Win10 彻底删除 Linux  的  EFI 分区 及启动项的方法 。
<!--more-->
# 删除 EFI 分区
- 使用 dispart
1. 用管理员权限打开 cmd
2. 输入 `diskpart`
3. 利用 `list disk` 查询磁盘信息
4. 这里我们 Ubuntu 装在磁盘1中，所以选择磁盘1, `select disk 1`
5. 查看磁盘1下所有分区信息 `list partition`
6. 根据分区大小这里选择分区6  `select partition 6`
7. 删除 `delete partition override`

# 删除 Linux 启动项
- EFI 分区分配盘符
1. 使用 diskpart
2. `select disk 0` 即win10系统所在的磁盘
3. 查看分区列表以确定具体分区 `list partition`
3. 根据容量(这里是260MB)选择分区 `select partition 1`
4. 为 Win10 的 EFI 分区分配盘符 `assign letter=F` 这里p为盘符，字母A~Z应该都可以(大小写无关，自动转成大写)，不要和已有的盘符重复即可。
5. 用管理员权限打开记事本，然后通过记事本菜单栏里的`打开`来访问 F 盘，会发现P盘里有个EFI文件夹，打开直接删除ubuntu文件夹.
6. 再回到 diskpart 删除EFI分区盘符F `remove letter=f`

---
**Via**
- [彻底删除Ubuntu EFI分区及启动项](https://blog.csdn.net/mtllyb/article/details/78635757)
