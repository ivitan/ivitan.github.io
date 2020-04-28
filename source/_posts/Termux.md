---
title: Termux 高级终端使用配置
top: 101
date: 2018-06-25 07:52:16
tags:
- Termux
- Linux
- Android
toc: true
categories: Diary
---
> [Termux](https://wiki.termux.com/wiki/Main_Page) 是一个 Android 下一个高级的终端模拟器, 开源且不需要 root, 支持 apt 管理软件包，十分方便安装软件包, 完美支持 Python PHP Ruby Go Nodejs MySQL 等。

# 一键部署脚本
```sh
bash -c "$(curl -fsSL https://raw.githubusercontent.com/ivitan/Shell/master/Termux/Termux.sh)"
```
<!--more-->

# 命令
## 基本命令

```sh
pkg search <query>  #搜索包
pkg install <package> #安装包
pkg uninstall <package> #卸载包
pkg reinstall <package> #重新安装包
pkg update  #更新源
pkg upgrade #升级软件包
pkg list-all #列出可供安装的所有包
pkg list-installed  #列出已经安装的包
pkg shoe <package>  #显示某个包的详细信息
pkg files <package>  #显示某个包的
```

## 安装 *.deb 文件

```sh
dpkg -i ./package.deb #安装
dpkg --remove [package name] #卸载
dpkg --remove [package name] #列出所有已安装的包
```

# 换源
## 清华源

```sh
sed -i 's@^\(deb.*stable main\)$@#\1\ndeb https://mirrors.tuna.tsinghua.edu.cn/termux stable main@' $PREFIX/etc/apt/sources.list
apt update && apt upgrade -y
```

https://mirrors.tuna.tsinghua.edu.cn/termux 代替原文中的 https://termux.net 保存退出
```sh
export EDITOR=vim # 设置默认编辑器
apt edit-sources
```
 
## 官方其他源
```sh
pkg install root-repo
pkg install x11-repo
pkg install unstable-repo
```

## [its-pointless](https://github.com/its-pointless/its-pointless.github.io)
```sh
pkg install wget
$PREFIX/bin/wget https://its-pointless.github.io/setup-pointless-repo.sh
bash setup-pointless-repo.sh
```
- 库包括 gcc-7,gfortran，octave，r-cran（R语言），rustc，scipy 和许多游戏.

## [Extra](https://github.com/thioshp/termux-extra-packages)
```sh
# 将PGP密钥添加到APT的密钥环中
pkg install dirmngr
apt-key adv --keyserver pool.sks-keyservers.net --recv 9D6D488416B493F0
```
### 手动下载公钥并添加它
```sh
curl -LO https://raw.githubusercontent.com/xeffyr/termux-extra-packages/master/pubkey.asc
apt-key add pubkey.asc
```
- `apt edit-sources` 加入下方内容

```sh
# Xeffyr's Extra packages
deb https://termux.xeffyr.ml/ extra main x11
```
- 库有　OpenJDK

# 修改启动问候语
## 修改
```sh
vim $PREFIX/etc/motd
```
	
## 不显示
```sh
touch ~/.hushlogin
```

# 恢复双层键盘
Termux在 0.66 取消了双层键盘

```sh
mkdir $HOME/.termux
echo "extra-keys = [['ESC','/','-','HOME','UP','END','PGUP'],['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN']]" >> $HOME/.termux/termux.properties
```

# 管理员权限 root 问题
## 虚拟管理员(未root)

```sh
pkg install proot
termux-chroot # 启动命令
```
- 模拟root环境的同时，还会模拟linux的文件路径。
- 普通文件路径是【/data/data/com.termux/file/home】
- 开启后的文件路径是【/home】

## 真实管理员(已root)

```sh
pkg install tsu
tsu # 启动命令
```
- 执行后文件路径不变，因此可以进入手机的任何一个目录

# 安装 SSH

安装
```sh
apt install openssh
```

## 设置 SSH Key
配置账户信息

```sh
git config --global user.name "UserName"
git config --global user.email "email@example.com"
```

## 创建 SSH Key

```sh
ssh-keygen -t rsa -C "email@example.com"
```

## 复制 Key

```sh
cat ~/.ssh/id_rsa.pub
```

## 验证 SSH

```sh
ssh -T git@github.com
```

## SSH 基础使用
### 远程主机登录

```sh
ssh root@host
ssh host
#本地用户名与远程用户名一致，登录时可以省略用户名
ssh -p 2222 root@host
# SSH 的默认端口是22，使用 p 参数，可以修改这个端口。
```

### 公钥登录

```sh
ssh-copy-id user@host
#将公钥传送到远程主机 host 上面
```

- 如果还是不行，就打开远程主机的 `/etc/ssh/sshd_config` 这个文件，检查下面几行前面"#"注释是否取掉。

```sh
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile
.ssh/authorized_keys
```

- 然后，重启远程主机的ssh服务。
    + Ubuntu系统 service ssh restart
    + Debian系统 /etc/init.d/ssh restart

# Oh My ZSH
```sh
apt install git zsh curl -y
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
chsh -s zsh
```

# OpenJDK
- JDK1.8
    - [aarch64谷歌云盘](https://drive.google.com/file/d/1PdNqmLrhFlBoRlpCW-mC6CHbVS_Lva9D/view?usp=drivesdk)
    - [aarch64百度云盘密码:ryea](https://pan.baidu.com/s/14T-2L2j3gZaxfbwkZxJxqg)
- JDK1.9
    - ~~[aarch64下载](https://drive.google.com/file/d/1U3o34Z3aI_g8mvkJ2gP3YfBB6aaQS1xK/view?usp=drivesdk)~~

## 安装
```sh
cd storage/下载目录
dpkg -i openjdk9_9.2017.8.20_aarch64.deb
```

## Java 8
```sh
wget https://github.com/ivitan/Shell/releases/download/Java/java8.deb -O ~/Java.deb
dpkg -i ~/Java.deb
rm -rf ~/Java.deb
```

# 安装 Nodejs
```sh
pkg install nodejs
pkg install nodejs-lts
```

## 解决 npm 出现 npm err! cannot read property ‘length’ of undefined 问题

- 复制下面内容

```sh
(require('os').cpus() || { length: 1 }).length
```
```sh
vim ../usr/lib/node_modules/npm/node_modules/worker-farm/lib/farm.js
```

- 修改如下

![](https://raw.githubusercontent.com/ivitan/Picture/master/images/5b3044e8a329d.jpg)

# 安装 Hexo
```sh
mkdir blog
cd blog
npm install hexo-cli -g
npm init
npm install
npm install hexo-deployer-git
hexo g      #生成静态文件
hexo s      #启动 Hexo
hexo d      #部署到 Github
hexo new "my blog" #新建文章
hexo s      #开启本地服务
hexo clean  #清除 public
npm update -g #版本更新
```

# Mariadb(MySQL)
```sh
pkg install mariadb
```

## 安装基本数据
```sh
mysql_install_db
```

- mysqld: Can't read dir ofソdata/data/com . termux/files/usr/e tc/my.cnf.d' (Errcode: 2 "No such file or directory") Fatal error in defaults handling. Program aborted
	- 先在`my.cnf`所在目录下新建`my.cnf.d`文件夹，然后执行`mysql_install_db`

## 启动 Mariadb 服务

```sh
mysqld
```
- 启动mysql后，该回话便无法进行任何操作，需要左滑唤醒会话菜单，开启新的回话。而倘若不在一个会话里启动mysqld，而是直接运行mysql，则会2002错误。

## 修改密码

```sh
mysql_secure_installation
# 输入旧密码，空则直接回车
Set root password? [Y/n] y
New password:
Re-enter new password:# 两次输入新密码

Remove anonymous users? [Y/n] Y #是否移除匿名用户
Disallow root login remotely? [Y/n] n #是否不允许root远程登录
Remove test database and access to it? [Y/n] n #是否移除test数据库
Reload privilege tables now? [Y/n] y #是否重新加载表的权限
```

## 登录 MySQL
```sh
mysql -uroot -p
Enter password: ***apache2
```

- 或者使用

```sh
mysql -uroot -p******
```

# Python 环境部署
## Python 2
```sh
pkg install python2
```

## Python 3
```sh
pkg install python
```

## 升级 pip 版本
```sh
python2 -m pip install --upgrade pip
python -m pip install --upgrade pip
```

pip 版本查看
```sh
pip -v
pip3.6 -v
```
## ipython
ipython 是一个 python 的交互式 shell，支持变量自动补全，自动缩进，支持 bash shell 命令，内置了许多很有用的功能和函数。学习 ipython 将会让我们以一种更高的效率来使用 python。
先安装clang, 否则直接使用pip安装ipython会失败报错.

- 安装

```sh
pkg install clang
pip install ipython
pip3.6 install ipython
```

- 使用

别使用`ipython`和`ipython2`进入`py2`和`py3`控制台:

# PHP部署
## 安装
```sh
pkg install php # 可采用phpinfo进行测试
php -S 127.0.0.1:8080 -t www/
```

- 编写测试文件

1. 在家目录下建一个www文件夹: `mkdir www`
2. 在www文件夹下新建一个 `index.php` 文件, 其内容为

```php index.php
<?php phpinfo();?>
```

# Nmap(口扫描必备工具)
```sh
pkg install nmap
```

# hydra
Hydra 是著名的黑客组织 THC 的一款开源暴力破解工具这是一个验证性质的工具，主要目的是：展示安全研究人员从远程获取一个系统认证权限。

- 安装

```sh
pkg install hydra
```

# sslscan
SSLscan 主要探测基于 ssl 的服务，如 https。SSLscan 是一款探测目标服务器所支持的 SSL 加密算法工具。

- 安装

```sh
pkg install sslscan
```

# whatportis
whatportis 是一款可以通过服务查询默认端口，或者是通过端口查询默认服务的工具，简单易用。在渗透测试过程中，如果需要查询某个端口绑定什么服务器，或者某个应用绑定的默认端口，可以使用 whatportis 查询。

- 安装

```sh
pip2 install whatportis
```

# RouterSploit
RouteSploit 框架是一款开源的路由器等嵌入式设备漏洞检测及利用框架。

- 安装

```sh
pip2 install requests
git clone https://github.com/reverse-shell/routersploit
cd routersploit
python2 rsf.py
```

# Slowloris 低带宽的 DoS 工具
```sh
git clone https://github.com/gkbrk/slowloris.git
cd slowloris
chmod +x slowloris.py
```
---
**参考**
- [Termux Wike](https://wiki.termux.com/wiki/Package_Management)
- [android上的终端——termux](http://www.liuxi.site/2018/05/16/android上的终端——termux/)
- [Termux 高级终端安装使用配置教程](http://www.sqlsec.com/2018/05/termux.html)
