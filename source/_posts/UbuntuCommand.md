---
title: Ubuntu 常用命令
date: 2018-03-11 07:57:27
tags:
- Linux
- Ubuntu
toc: true
categories: notes
thumbnail: /images/Ubuntu.png
---
Ununtu常用命令。
<!--more-->
# 磁盘目录
|目录|作用|
|:---|:---|
|/|根目录|
|/bin|存放必要的命令|
|/boot|存放内核以及启动所需的文件等|
|/dev|存放设备文件|
|/etc|存放系统的配置文件|
|/home|用户文件的主目录，用户数据存放在其主目录中|
|/lib|存放必要的运行库|
|/mnt|存放临时的映射文件系统，我们常把软驱和光驱挂装在这里的floppy和cdrom子目录下|
|/proc|存放存储进程和系统信息|
|/root|超级用户的主目录|
|/sbin|存放系统管理程序|
|/tmp|存放临时文件的目录|
|/usr|包含了一般不需要修改的应用程序，命令程序文件、程序库、手册和其它文档|
|/var|包含系统产生的经常变化的文件|

# 文件/文件夹管理
|命令|作用|
|:---|:---|
|ls|列出当前目录下的所有文件（不显示隐藏文件） |
|ls -a  |列出当前目录下的所有文件（显示隐藏文件） |
|ls -l |列出当前目录下所有文件的详细信息 |
|cd 或者 cd ~ |进入用户主目录 |
|cd .. |回到上一级目录 |
|cd - |返回进入此目录之前所在的目录 |
|mkdir dirname  |新建目录 |
|rmdir dirname  |删除空目录 |
|rm filename  |删除文件 |
|rm -rf dirname | 删除非空目录及其包含的所有文件 |
|mv file1 file2 |将文件1重命名为文件2 |
|mv file1 dir1  |将文件1移动到目录1中 |
|find 路径 -name “字符串” |查找路径所在范围内满足字符串匹配的文件和目录 |


# 程序安装与卸载
|命令|作用|
|:---|:---|
|apt-get +|程序安装与卸载命令的标志，需要管理员权限|
| install|安装指定程序，举例：`sudo apt-get install vim|
|remove|卸载指定的程序，一般最好加上`--purge`执行清除式卸并在程序名称后添加*号。举例 sudo apt-get remove--purge nvidia *卸载 nvidia 的驱动及其配置文件|
|update|更新本地软件源文件，需要管理员权限，举例：sudo apt-get update|

# 打包/解压
- 参数

|参数|含义|
|:---|:---|
|-c|建立压缩档案|
|-z|有gzip属性的|
|-t|查看内容|
|-j|有bz2属性的|
|-u|更新原压缩包中的文件|
|-Z|有compress属性的|
|-x|解压|
|-v|显示所有过程|
|-r|向压缩归档文件末尾追加文件|
|-O|将文件解开到标准输出|
    
 - 参数是独立的命令，压缩解压都要用到其中一个，可以和别的命令连用但只能用其中一个。右边五个参数是根据需要在压缩或解压时可选的。

# 压缩
|命令|作用|
|:---|:---|
|tar -cvf jpg.tar *.jpg|将目录里所有jpg文件打包成tar.jpg|
|tar -czf jpg.tar.gz *.jpg| 将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz|
|tar -cjf jpg.tar.bz2 *.jpg|将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2|
|tar -cZf jpg.tar.Z *.jpg|将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z|
|rar a jpg.rar *.jpg rar|格式的压缩，需要先下载rar for linux|
|zip jpg.zip *.jpg zip|格式的压缩，需要先下载zip for linux|

## 解压
|命令|作用|
|:---|:---|
|tar -xvf file.tar| 解压 tar包|
|tar -xzvf file.tar.gz|解压 tar.gz|
|tar -xjvf file.tar.bz2|解压 tar.bz2|
|tar -xZvf file.tar.Z| 解压 tar.Z|
|unrar e file.rar| 解压 rar|
|unzip file.zip|解压 zip|

- 总结
   - `.tar `用 `tar -xvf` 解压
   -  `.gz` 用 `gzip -d`或者`gunzip` 解压
   -  `.tar.gz`和`.tg`z 用` tar -xzf` 解压
   -  `.bz2` 用` bzip2 -d`或者用`bunzip2 `解压
   -  `.tar.bz2`用`tar -xjf` 解压
   -  `.Z` 用 `uncompress` 解压
   -  `.tar.Z` 用`tar -xZf` 解压
   -  `rar` 用 `unrar e`解压
   -  `.zi`p 用 `unzip` 解压

# 用户管理
|命令|作用|
|:---|:---|
|sudo useradd username|创建一个新的用户username|
|sudo passwd username| 设置用户username的密码|
|sudo groupadd groupname|创建一个新的组groupname|
|sudo usermod -g groupname username|把用户username加入到组groupname中|
|sudo chown username:groupname dirname|将指定文件的拥有者改为指定的用户或组|


# 系统管理
|命令|作用|
|:---|:---|
|uname -a|查看内核版本|
|cat /etc/issue| 查看ubuntu版本|
|sudo fdisk -l| 查看磁盘信息|
|df -h|查看硬盘剩余空间|
|free -m|查看当前的内存使用情况|
|ps -A| 查看当前有哪些进程|
|kill 进程号 或者 killall 进程名 |杀死进程|
|kill -9 进程号|强制杀死进程|
