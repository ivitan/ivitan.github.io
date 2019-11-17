---
title: Termux 折腾记
date: 2018-01-22 11:58:38
tags:
- Linux
- Termux
toc: true
categories: Diary
permalink: TermuxNote
thumbnail: /images/Termux.png
---
Termux oh-my-zsh 主题设置，去欢迎字等。
<!--more-->

# 软件下载
- [官网](https://termux.com)
- [Google Play](https://play.google.com/store/apps/details?id=com.termux)
- [CoolApk](https://www.coolapk.com/apk/com.termux)
- [百度网盘]( https://pan.baidu.com/s/1zNrdz8Doed0wIob7bftXwQ)密码: 7eyf

# 常用快捷键
音量-键模拟（Ctrl）键
```
    音量-键(Ctrl)+L 清除屏幕内容
    音量-键(Ctrl)+C 终止当前操作
    音量-键(Ctrl)D 退出当前会话session
    音量+键+D Tab键（可自动补全命令或文件名）
    音量+键+W 方向键 上（可显示前一条命令）
    音量+键+S 方向键 下（可显示后一条命令）
    音量+键+A 方向键 左（可左移动光标）
    音量+键+D 方向键 右（可右移动光标）
    音量+键+Q 显示或关闭扩展键（ESC、插入链接CTR、ALT、TAB、-、/、|以及左滑扩展键一栏可切换到全功能支持手机输入法的输入框）
```

# 常用命令
更新
```bash
    termux-setup-storage 挂载Storage
    apt update 更新源
    apt search <query> 全文搜索可安装包
    apt install <package> 安装软件包
    apt upgrade 升级软件包
    apt show <package> 显示软件包的信息
    apt list [--installed] 列出所有（或已安装）的软件包信息
    apt remove <package> 删除软件包
    chmod 修改文件权限
    chown 修改文件归属
```
cd 命令
```
    cd
    # 你当前在 /root目录中，使用这个命令会进入 /root/bash目录，这是相对路径
    cd bash
    # 如果你不在 /root目录中的话，就不能用上面的相对路径了，就需要绝对路径
    cd /root/bash
    # 假设你当前在 /root/bash目录中，使用相对路径，你可以用这个命令进入上一级 /root目录， `..` 代表相对路径 上级目录
    cd ..
    # 当然你也可以用绝对路径来进入上一级 /root目录
    cd /root
    路径的输入zsh有个方
```

ls 命令
```bash
    # 显示当前目录下的所有文件
    ls -a
    ls -a bash/log
    # 相对路径，当前目录是 /root ，欲查看的目录是 /root/bash/log
    ls -a /root/bash/log
    # 绝对路径， 当前目录是 /root ，欲查看的目录是 /root/bash/log
    #更多的命令可以用 ls --help 来查看。
```

tree 包命令
```bash
    # 复制当前目录内的 log.txt文件到 /var目录
    cp log.txt /var/log.txt
    # 复制当前目录内的 bash文件夹到 /home目录
    cp -R bash /home/bash
    ———————————————————————————————————————————————
    # 复制当前目录内的所有.txt后缀的文件到 /var/log目录
    cp *.txt /var/log
    # 复制当前目录内的所有以 doubi开头的文件到 /var/log目录
    cp doubi* /var/log
    # 复制当前目录内的所有以 doubi开头 以.txt后缀结尾的文件到 /var/log目录
    cp doubi*.txt /var/log
    ———————————————————————————————————————————————
    # 假设当前目录是 /root/doubi/log，要把这个目录中的所有.txt后缀的文件复制到上一级目录 /root/doubi，那么这样做
    cp *.txt ..
    # .. 就是相对路径，代表上一级目录，��然你也可以用绝对路径，这样更不容易出错
    cp *.txt /root/doubi
    ——————————————————————————————————————————————
    # 重命名当前目录内的 log.txt文件为 log2.txt
    cp log.txt log2.txt
    # 复制当前目录内的 log.txt文件到 /var目录并重命名为 log1.txt
    cp log.txt /var/log1.txt
    # 复制当前目录内的 bash文件夹到 /home目录并重命名为 bash2
    cp -R bash /home/bash2
    ——————————————————————————————————————————————
    #复制当前目录内的 log.txt文件到 /var目录，但是 /var 目录中已经存着 log.txt，那么会提示 cp: overwrite `/var/log.txt'? 可以用 -f 强制覆盖
    cp -f log /var/log.txt
    # 复制当前目录内的 log.txt log1.txt log2.txt文件和 log233目录到 /home/log目录中
    cp -R log.txt log1.txt log2.txt log233 /home/log
    #更多的命令可以用 cp --help 查看。
```

# 去欢迎字
```bash
touch ~/.hushlogin
```

# oh-my-zsh
```bash
apt install git curl zsh -y
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
chsh -s zsh
```

带字体，配色管理版
```bash
sh -c "$(curl -fsSL https://github.com/Cabbagec/termux-ohmyzsh/raw/master/install.sh)" //安装
~/.termux/colors.sh   //修改配色
~/.termux/fonts.sh    //修改字体
```

# ssh
```bash
apt install openssh -y
```

连接
```bash 
ssh -p443 root@主机ip
```


# hexo博客
install
```bash
apt update
apt install git openssh nodejs make python2 vim
mkdir blog
cd blog
npm install -g hexo
hexo init
npm install
npm install hexo-deployer-git –save
```

- 在站点配置文件_config.yml的Deployment字段处添加并修改

```bash
deploy:
type: git
repo: git@github.com:username/username.github.io.git
branch: master
```

创建ssh密钥
```bash
git config –global user.name “Vitan”
git config –global user.email “ivitan95@gmailcom”
ssh-keygen -t rsa -C “ivitan@gmail.com”
```

添加本地私钥文件
```bash
cat ~/.ssh/id_rsa.pub
```
- 添加到 Github

测试并发布 GithubPage 上
```bash
cd ~/blog
hexo g
hexo d
```
