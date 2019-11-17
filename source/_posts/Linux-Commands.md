---
title: Linux 基础命令
date: 2018-05-02 21:56:31
tags:
- Linux
- Ubuntu
- Termux
toc: true
categories: Linux
thumbnail: /images/Linux.png
---
Linux 基础命令
<!--more-->
# 目录操作命令
## ls
```sh
命令英文原意：list
命令所在路径：/bin/ls
执行权限：所有用户
功能描述：显示目录文件
ls # 显示当前目录下文件
ls 目录名 # 显示指定目录下文件
ls -l # 长格式显示目录文件
ls -l 文件名 # 长格式显示指定文件
ls -a # 显示所有文件(包含隐藏文件)
ls -al # 长格式显示当前目录下所有文件)
ls -h # 文件大小显示为常见大小单位 B KB MB ...
ls -d # 显示目录本身，而不是里面的子文件
```

## cd
```sh
命令英文原意：change directory
命令所在路径：shell内置命令
执行权限：所有用户
功能描述：切换所在目录
cd /usr/local/src 切换到指定路径(使用绝对路径方式)
cd ~ # 进入当前用户的家目录
cd - # 进入上次目录
cd .. # 进入上一级目录
cd . # 进入当前目录
绝对路径：cd ../usr/local 参照当前所在目录，进行查找。一定要先确定当前所在目录。
相对路径：cd /usr/local 从根目录开始指定，一级一级递归查找。
在任何目录下，都能进入指定位置。
```
## pwd
```sh
命令英文原意：print working directory
命令所在路径：/bin/pwd
执行权限：所有用户
功能描述：显示当前所在目录(当前工作目录)
```

## mkdir
```
命令英文原意：make directories
命令所在路径：/bin/mkdir
执行权限：所有用户
功能描述：建立目录
mkdir test  # 创建名为test的目录
mkdir -p test1/test2/test3 #递归创建
```
## rmdir
```sh
命令英文原意：remove empty directories
命令所在路径：/bin/rmdir
执行权限：所有用户
功能描述：删除目录 (只能删除空目录)
```

# 文件操作命令
## touch
```sh
命令所在路径：/bin/touch
执行权限：所有用户
功能描述：创建空文件 或 修改文件时间
touch test.py # 创建空文件，如果文件存在，则修改文件创建时间
```
## rm
```sh
命令英文原意：remove
命令所在路径：/bin/rm
执行权限：所有用户
功能描述：删除
rm 文件名 # 删除文件
rm -r 目录名 # 递归删除文件和目录
rm -f 文件名 # 强制删除
rm -rf 目录名 # 强制删除目录和文件
```
## cat
```sh
命令所在路径：/bin/cat
执行权限：所有用户
功能描述：查看文件内容，从头到尾的内容。
cat 文件名  # 查看文件内容内容
cat -n 文件名 # 查看文件内容，并列出行号
```

## more
```sh
命令所在路径：/bin/more
执行权限：所有用户
功能描述：分屏显示文件内容
more 文件名    分屏显示文件内容
向上翻页  空格键
向下翻页  b键
退出查看  q键
```

## head
```
命令所在路径：/usr/bin/head
执行权限：所有用户
功能描述：显示文件头
head 文件名 # 显示文件头几行(默认显示10行)
head -n 20 文件名 # 显示文件前20行
head -n -20 文件名 # 显示文件最后20行
ctrl + c # 强制终止查看模式
ctrl + l  # 清屏
```

## ln
```sh
命令英文原意：link
命令所在路径：/bin/ln
执行权限：所有用户
功能描述：链接文件
等同于Windows中的快捷方式
新建的链接，占用不同的硬盘位置
修改一个文件，两边都会改变
删除源文件，软连接文件打不开
ln -s 源文件 目标文件 # 创建链接文件(文件名都必须写绝对路径)
```
# 文件和目录都能操作的命令
## rm
删除文件或目录

## cp
```sh
命令英文原意：copy
命令所在路径：/bin/cp
执行权限：所有用户
功能描述：复制文件或目录
cp 源文件 目标位置  # 复制

cp 源文件 目标位置/目标名称  # 复制并改名
cp -r # 复制目录
cp -p # 连带文件属性一起复制
cp -d # 若源文件是链接文件，则复制链接属性
cp -a # 相当于 cp -pdr
```

## mv
```sh
命令英文原意：move
命令所在路径：/bin/mv
执行权限：所有用户
mv 源文件 目标位置
mv /root/test /tmp/  
# 将/root/下的test文件移动到/tmp/目录下
mv /root/test /root/newtest   
# 将/root/下的test文件改名为newtest
```

# 挂载命令
## mount
```
命令所在路径：/bin/mount
执行权限：所有用户
功能描述：挂载
linux所有存储设备都必须挂载使用，包括硬盘
```

## 光盘挂载
```
/dev/sda1 # 第一个scsi硬盘的第一分区
/dev/cdrom  # 光盘
/dev/hdc  # fIDE硬盘 centos 5.5
/dev/sr0  # 光盘      centos 6.x
mount -t 文件系统 设备描述文件 挂载点（已经存在空目录）
mount -t iso9660 /dev/cdrom /mnt/cdrom
```

## 光盘卸载
```
umount /dev/cdrom
umount /mnt/cdrom      注意：退出挂载目录，才能卸载
fdisk -l 查看设备名
mount -t vfat /dev/sdb1 /mnt/usb
```

# 网络命令
## ping
```
命令所在路径：/bin/ping
执行权限：所有用户
功能描述：测试网络畅通性
ping -c 次数 ip # 探测网络通畅
```

## ifconfig
```
命令英文原意：interface configure
命令所在路径：/sbin/ifconfig
执行权限：root
功能描述：查询本机网络信息
```

# Linux 系统分类
1. RedHat 系列：Redhat、Centos、Fedora 等
    - RPM (Red Hat系)：CentOS、Fedora
2. Debian 系列：Debian、Ubuntu 等
    - Dpkg (Debian系)：Ubuntu LinuxMint
3. ArchLinux
    - ArchLinux、Manjaro、Antergos 等.

## 软件包管理工具
### Debian 系列
1. 常见的安装包格式 deb 包，安装 deb 包的命令是`dpkg -选项 -xxx.deb`
- 选项
```
-i：安装软件包
-r：删除软件包
-P：删除软件包的同时删除其配置文件
-L：显示于软件包关联的文件
-l：显示已安装软件包列表
--unpack：解开软件包
-c：显示软件包内文件列表
--confiugre：配置软件包
```
2. 包管理工具 apt-get
3. 支持 tar 包
- dpkg 实例
```bash
dpkg -i package.deb #安装包
dpkg -r package #删除包
dpkg -P package #删除包（包括配置文件）
dpkg -L package #列出与该包关联的文件
dpkg -l package #显示该包的版本
dpkg --unpack package.deb  #解开deb包的内容
dpkg -S keyword #搜索所属的包内容
dpkg -l #列出当前已安装的包
dpkg -c package.deb#列出deb包的内容
dpkg --configure package#配置包
```
- apt 包管理
```
apt-get (选项)(参数)
```
- 实例
```
apt-get update #更新源
apt-get upgrade #更新所有已安装的软件包
apt-get install packagename #安装软件包
apt-get remove packagename #卸载软件包(保留配置文件)
apt-get –purge remove packagename # 卸载软件包(删除配置文件)
apt-get autoclean apt #删除你已经删掉的软件
apt-get dist-upgrade #将系统升级到新版本
apt-get autoclean #清除已经卸载的软件包的.deb文件
```

## RedHat 系列
1. 常见的安装包格式 rpm 包，安装rpm包的命令是`rpm -参数 [-rpm包]
- 参数
```
-a：查询所有套件；
-b<完成阶段><套件档>+或-t <完成阶段><套件档>+：设置包装套件的完成阶段，并指定套件档的文件名称；
-c：只列出组态配置文件，本参数需配合"-l"参数使用；
-d：只列出文本文件，本参数需配合"-l"参数使用；
-e<套件档>或--erase<套件档>：删除指定的套件；
-f<文件>+：查询拥有指定文件的套件；
-h或--hash：套件安装时列出标记；
-i：显示套件的相关信息；
-i<套件档>或--install<套件档>：安装指定的套件档；
-l：显示套件的文件列表；
-p<套件档>+：查询指定的RPM套件档；
-q：使用询问模式，当遇到任何问题时，rpm指令会先询问用户；
-R：显示套件的关联性信息；
-s：显示文件状态，本参数需配合"-l"参数使用；
-U<套件档>或--upgrade<套件档>：升级指定的套件档；
-v：显示指令执行过程；
-vv：详细显示指令执行过程，便于排错。
```
2. 包管理工具`yum -选项 -参数`
- 选项
```
-h：显示帮助信息；
-y：对所有的提问都回答“yes”；
-c：指定配置文件；
-q：安静模式；
-v：详细模式；
-d：设置调试等级（0-10）；
-e：设置错误等级（0-10）；
-R：设置yum处理一个命令的最大等待时间；
-C：完全从缓存中运行，而不去下载或者更新任何头文件。
```
- 参数
```
install：安装rpm软件包；
update：更新rpm软件包；
check-update：检查是否有可用的更新rpm软件包；
remove：删除指定的rpm软件包；
list：显示软件包的信息；
search：检查软件包的信息；
info：显示指定的rpm软件包的描述信息和概要信息；
clean：清理yum过期的缓存；
shell：进入yum的shell提示符；
resolvedep：显示rpm软件包的依赖关系；
localinstall：安装本地的rpm软件包；
localupdate：显示本地rpm软件包进行更新；
deplist：显示rpm软件包的所有依赖关系。
```
3. 支持 tar 包

+ yum 实例
- 安装
```
yum install #全部安装
yum install package1 #安装指定的安装包package1
yum groupinsall group1 #安装程序组group1
```
- 更新和升级
```
yum update #全部更新
yum update package1 #更新指定程序包package1
yum check-update #检查可更新的程序
yum upgrade package1 #升级指定程序包package1
yum groupupdate group1#升级程序组group1
```
- 查找和显示
```
yum info package1 #显示安装包信息package1
yum list #显示所有已经安装和可以安装的程序包
yum list package1 #显示指定程序包安装情况package1
	yum groupinfo group1#显示程序组group1信息yum search string 根据关键字string查找安装包
```
- 删除程序
```
yum remove &#124; erase package1  #删除程序包package1
yum groupremove group1  #删除程序组group1
yum deplist package1  #查看程序package1依赖情况
```
- 清除缓存
```
yum clean packages #清除缓存目录下的软件包
yum clean headers #清除缓存目录下的 headers
yum clean oldheaders #清除缓存目录下旧的 headers
```
**参考**
- [Linux命令](http://man.linuxde.net/)

# 查询命令
## find
```
find [搜索范围] [搜索文件]`
find / -name install.log
避免大范围搜索,会非常耗费系统资源
find是在系统当中搜索符合条件的文件名,如果需要匹配 使用通配符匹配,通配符是完全匹配。

find /root -iname installlog #不区分大小写
find /root -user root #按照所有者搜索
find/root -nouser #查找没有所有者的文件
```

1.  find /var/log/ -mtime +10 #查找10天前修改的文件

|-10 |10天内修改文件|
|:---|:---|
|10|10天当天修改的文件|
|+10|10天前修改的文件|
|atime|文件访问时间|ctime|改变文件属性|mtime|修改文件内容|


2. find . -size #查找文件大小是25KB的文件

|-25k|小于25KB的文件|
|:---|:---|
|25k|等于25KB的文件|
|+25k|大于25KB的文件|


3. find -inum 262422 #查找 节点是262422的文件
4. find /etc -size +20k -a -size -50k #查找/etc/目录下,大于20KB并且小于50KB的文件
- a and逻辑与,两个条件都满足 or 逻辑或,两个条件满足一个即可
5. find /etc-size +20k-a-size-50k -exec ls-lh {} 1; #查找/etc/目录下,大于20KB并且小于50KB的文件,并显示详细信  #-exec/-ok命令() 对搜索结果执行操

## 搜索字符串命令grep
- grep [选项]字符串文件名
在文件当中匹配符合条件的字符串
选项: `-i` 忽略大小写 `-v`排除指定字符串

## find命令与grep命令的区别
-  find命令:在系统当中搜索符合条件的文件名,如果需要匹配 使用通配符匹配,通配符是完全匹配。
- grep命令:在文件当中搜索符合条件的字符串,如果需要匹配 使用正则表达式进行匹配,正则表达式时包含匹配

# man 命令
man 命令 #获取指定命令的帮助  
man ls  #查看ls的帮助

- 查看命令拥有那个级别的帮助
man -f 命令 相当于 whatis 命令

举例:
```
man -5 passwd
man -4 null
man -8 ifconfig
```

- shell 内部命令帮助
help shell 内部命令 #获取shell内部命令的帮助

例如:
```
whereis cd #确定是否是shell内部命令
help cd #获取内部命令帮助
```

## 详细命令帮助info info命令
回车|进入子帮助页面(带有`*`号标记)

|:---:|:---:|
|u|进入上层页面|
|n|进入下一个帮助小节|
|p|进入上一个帮助小节|
|q|退出|


# 压缩
## zip格式压缩
```
zip 压缩文件名  源文件 #压缩文件
zip -r 压缩文件名 源目录  #压缩目录
```
## gzip格式压缩
```
gzip 源文件  #压缩为.gz格式的压缩文件.源文件会消失
gzip -c 源文件>压缩文件 # 压缩为.gzi格式,源文件保留
```

## gz格式解压缩
```
gzip -d 压缩文件 #解压缩文件
gunzip 压缩文件  #解压缩文件
```

## bz2格式压缩
```
bzip2 源文件 #压缩为.bz2格式.不保留源文件
bzip2 -k 源文件 #压缩之后保留源文件
注意: bzip2命令不能压缩目录
```
# 打包
## tar
```
tar -cvf 打包文件名 源文件
选项: -c打包
-v显示过程
-f指定打包后的文件名
```

# 解打包命令
```
tar -xvf 打包文件名
选项:
-x解打包
```

## tar.gz压缩格式
其实.tar.gz格式是先打包为.tar格式,再压缩为.gz格式
1. tar -zcvf 压缩包名tar.gz 源文件
- 选项: `-z`压缩为.tar.gz格式
2. tar -zxvf 压缩包名tar.gz
- 选项:`-x` 解压缩.tar.gz格式

## tar.bz2压缩格式
:1. tar -jcvf压缩包名.tar.bz2 源文件
- 选项:`-z`压缩为.tar.bz2格式
2. tar -jxvf 压缩包名·tar.bz2
- 选项: `-x`解压缩.tar.bz2格式

# shell命令
## shutdown命令
```
shutdown [选项] 时间
选项:
-c 取消前一个关机命令
-h 关机  
-r 重启
```

## 其他关机命令
```
halt
poweroff
init 0
重启命令
reboot
init 6

系统运行级别
查看系统运行级别
cat /etc/inittab
程序员之路: Linux关机与重启
退出登录
logout 切记,一般服务器只允许少量用户连接, 如果不正常退出会占用用户id
```

- 查询当前登录和过去登录的用户信息
last last #命令默认是读取/var/log/wtmp文件数据

命令输出 -用户名 登录终端 登录IP 登录时间 退出时间(在线时间)

## echo输出命令
echo [选项] [输出内容]
- 选项: -e 支持反斜线控制的字符转换

|控制字符|作用|
|:---|:---|
|\a|输出警告音|
|\b|退格键，也就是向左删除键|
|\n|换行键|
|\r|回车键|
|\t|制表键，也就是Tab键|
|\v|垂直制表键|
|\Onnn|按照八进制ASCII码表输出字符。其中0表示数字0，nnn是三位八进制数|
|\xhh|按照16进制ASCII码表输出字符。其中hh是两位16进制数|


## 脚本执行
```
赋予执行权限,直接运行
chmod 755 hello.sh
/hello.sh
bash hello.sh
```
# 别名
- 查看与设定别名
1. alias #查看系统中所有的命令别名
2. alias 别名="原命令" #设定命令别名

## 别名永久生效与删除别名
```
vi /.bashrc #写入环境变量配置文件
unalias 别名 #删除别名
```

## shell常用快捷键
|ctrl+c|强制终止当前命令|
|:---:|:---:|
|ctrl+l|清屏|
|crtl+a|光标移动到命令行首|
|ctrl+e|光标移动到命令行尾|
|ctrl+u|从光标所在位置删除到行首|
|ctrl+z|把命令放入后台|
|ctrl+r|在历史命令中搜|

## 历史命令
```
history [选项] [历史命令保存文件]
选项:
-c:清空历史命令
w:把缓存中的历史命令写入历史命令保存文件~/.bash.history
```

# 输出重定向
|类型|符号|作用|
|:---|:---|:---|
|标准输出重定向|命令>文件|以覆盖的方式,把命令的正确输出 输出到指定的文件或设备当中|
|空|命令>>文件|以追加的方式,把命令的正确输出! 输出到指定的文件或设备当中|
|准错误输出重定向|错误命令2>>文件|以覆盖的方式,把命令的错误输出 输出到指定的文件或设备当中。|      |空 |错误命令2>>文件|以追加的方式,把命令的错误输出输出到指定的文件或设备当|



# 多命令顺序执行
|多命令执行符|格式|作用|
|:---|:---|:---|
|:|命令1:命令2|多个命顺序执行,命令之间没有逻辑关系|
|&&|命令1&&命令2|逻辑与当命令1正确执行,则命令2才会执行,1不正确，2不执行|
|丨丨|命令1丨丨命令2|逻辑或，命令1不正确，2才执行，命令1正确，2不会执行|


# 通配符
|通配符|作用|
|:---|:---|
|?|匹配一个任意字符|
|*|匹配0或任意多个任意符，也可以是匹配任何内容|
|[]|匹配括号中的任意一个字符|
|[-]|匹配括号中任意一个字符，-代表一个范围。［a-z］小写字母表|
|[^]|逻辑非，表示匹配不是括号中的一个字符.［^0-9］不是数字的字符|

# Bash中其他特殊符号
|符号|作用|
|:---|:---|
|''|单引号。在单引号中所有的特俗符合，如“$”和“`”（反引号）都没特俗意义|
|""|双引号,在双引号中特殊符号都没有特殊含义,但是“S" 、“.”和“\"是例外. 拥有“调用变量的值”、“引用命令”和“转义符”的特殊含义|
|\``|反引号。反引号括起来的都是系统命令，在bash中会先执行和$()作用一样。不过推荐使用$(), 因为反引号非常容易看错|
|$()|和反引号作用一样，用来引用系统命令|
|#|shell中#开头的行代表注释|
|$|用于调用变量的值，如要调用变量name的值时，需要用$name的方式得到变量的值|
|`\`|转义符，跟在\后面的特俗符号失去特俗含义，变为普通字符，。如\$将输出$符号，而不是变量引用|

# 磁盘管理
## df [参数] 查看磁盘分区使用状况
```
-l仅显示本地磁盘(默认)
-a显示所有文件系统的磁盘使用情况,包含比如/proc/
-h以1024进制计算最合适的单位显示磁盘容量
-H以1000进制计算最合适的单位显示磁盘容量
-T显示磁盘分区类型
-t显示指定类型文件系统的磁盘分区
-x不显示指定类型文件系统的磁盘分
- du统计磁盘上的文件大小
-b以byte为单位统计文件
-k以KB为单位统计文件
-m以MB为单位统计文件
-h按照1024进制以最适合的单位统计文件
-H按照1000进制以最适合的单位统计文件
-s指定统计目标
```

# 权限
## -rw-r--r--
```
文件类型(-文件d目录1软链接文件)
rw- u所有者 r-- g所属组 r-- o其他人
r 读  w 写 x 执行
```

## chmod 命令
```
chmod [选项] 模式 文件名
选项 -R递归 模式 [ugoa][+-=][rwx]
[mode=421]
```
## 修改权限
```
chmod u+x cangls.av
chmod g+w,o+w furong.av
chmod a=rwx fengjie.av
```

## 权限的数字表示
r---4 w---2 x---1 rwxr-xr-x --- 755

## 权限对文件的作用
1. r:读取文件内容(cat more head tail)
2. w:编辑、新增、修改文件内容( vi echo ) 但是不包含删除文件
3. x:可执行

## 权限对目录的作用
1. r:可以查询目录下文件名 (ls)
2. w:具有修改目录结构的权限。如新建文件和目录,删除此目录下文件和目录,重命名此目录下文件和目录,剪切(touch rm mv cp)
3. x:可以进入目录 (cd)
4. 对文件来讲: 最高权限是 x
5. 对目录来讲:最高权限是 w

## 修改文件的所有者
```
chown 用户名 文件名
例如: chown ds h.c
```

## 修改文件的所属组
```
chgrp 组名 文件名
例如: chgrp group1 h.c
```
## 查看默认权限的命令
```
umask查看默认权限
0022  第一位0 :文件特殊权限 022 :文件默认权限
```

>文件的默认权限 文件默认不能建立为执行文件,必须手工赋予执行权限 所以文件默认权限最大为666 默认权限需要换算成字母再相减 建立文件之后的默认权限,为666减去umask

例如:

文件默认最大权限666 umask值022

-rw-rw-rw- 减去 ---- w--w-等于 -rw-r-r-

例如: 文件默认最大权限666 umask值033

-rw-rw-rw- 减去 ---- wx-wx 等于 -rw-r-r


>目录的默认权限 目录默认权限最大为777 默认权限需要换算成字母再相减 建立文件之后的默认权限,为777减去umask值


例如:

目录默认最大权限为777 umask值022

-rwxrwxrwx 减去 ----w--w- 等于 -rwxr-xr-x

## 修改umask
```
临时修改 umask 0002
永久修改  vi/etc/profile
```

# 进程
- 查看所有进程
```
ps aux #查看系统中所有进程,使用BSD操作系统格式
ps -le #查看系统中所有进程,使用Linux标准命令格式
选项
a:显示一个终端的所有进程,除了会话引线
-u:显示进程的归属用户及内存的使用情况
-x:显示没有控制终端的进程
-l:长格式显示,显示更加详细的信息
-e:显示所有进程,和-A作用一致
- ps命令的输出
USER:该进程是由哪个用户产生的
PID:进程的ID号;
%CPU:该进程占用CPU资源的百分比,占用越高,进程越耗费资源;
%MEM:该进程占用物理内存的百分比,占用越高,进程越耗费资源
VSZZ:该进程占用虚拟内存的大小,单位KB:
Rss:该进程占用实际物理内存的大小,单位KB:
TTY:该进程是在哪个终端中运行的,其中tty1-tty7代表本地控制台 终端, tty1-tty6是本地的字符界面终端, 255代表虚拟终端。 tty7是图形终端. pts/0
```

```
STAT :进程状态,常见的状态有
R:运行 S:睡眠 T:停止状态 -s:包含子进程 +:位于后台
START:该进程的启动时间
TIME:该进程占用CPU的运算时间, 不是系统时间
COMMAND:产生此进程的命令名
```