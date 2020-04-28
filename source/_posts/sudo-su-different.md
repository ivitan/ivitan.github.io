---
title: sudo 与 su 的区别
date: 2018-08-08 13:01:18
tags:
- Linux
- ArchLinux
- Ubuntu
categories:
- Linux
author:
  name: Vitan
toc: true
---
sudo su 区别
<!--more-->
# su
简介
1. su 用于用户之间的切换。但是前面的用户依然保持在登录状态。这种切换如果超级权限用户 root 向普通或虚拟用户切换不需要密码，而普通用户切换到其它任何用户都需要密码验证。
2. 变更为其他使用者的身份，除 root 外，需要键入该使用者的密码

语法
```sh
 su [选项] [-] [<用户> [<参数>...]]
```
- 选项
```sh
  f  或 --fast
  # 不必读启动档（如 csh.cshrc 等），仅用于 csh 或 tcsh
  -m -p 或 --preserve-environment
  # 执行 su 时不改变环境变数
  -c command 或 --command=command
  # 变更为帐号为 USER 的使用者并执行指令（command）后再变回原来使用者
  -s shell 或 --shell=shell
  # 指定要执行的 shell(bash,csh,tcsh等），预设值为 /etc/passwd 内的该使用者(USER) shell
  --help # 显示说明文件
  --version # 显示版本资讯
  - -l 或 --login
  # 类似重新 login 为该使用者一样，大部份环境变数（HOME SHELL USER等等）
  都是以该使用者（USER）为主，并且工作目录也会改变，如果没有指定 USER ，内定是 root
  USER # 欲变更的使用者帐号
```
su – root 和 su root（su）的区别
- `su – root` 表示人 以root 身份登录
- `su root` 表示与 root 建立一个链接，通过 root 执行命令

不足
1. 不安全 su 工具在多人参与的系统管理中，并不是最好的选择，su 只适用于一两个人参与管理的系统，毕竟 su 并不能让普通用户受限的使用；超级用户 root 密码应该掌握在少数用户手中。
2. 如果某个用户需要使用 root 权限,则必须要把 root 密码告诉此用户。

# sudo
简介
1. 为所有想使用 root 权限的普通用户设计的。可以让普通用户具有临时使用root权限的权利。只需输入自己账户的密码即可。个普通用户必须在 /etc/sudoers 文件中有配置项,才具有使用sudo的权利.
2. 执行命令的流程是当前用户切换到 root（或其它指定切换到的用户），然后以 root（或其它指定的切换到的用户）身份执行命令，执行完成后，直接退回到当前用户.

语法
```sh
sudo 参数
```
- 参数
```sh
  -V # 显示版本编号
  -h # 会显示版本编号及指令的使用方式说明
  -l # 显示出自己（执行 sudo 的使用者）的权限
  -v # sudo 在第一次执行时或是在 N 分钟内没有执行（N 预设为五）会问密码，
  这个参数是重新做一次确认，如果超过 N 分钟，也会问密码
  -k # 将会强迫使用者在下一次执行 sudo 时问密码（不论有没有超过 N 分钟）
  -b # 将要执行的指令放在背景执行
  -p # prompt 可以更改问密码的提示语，其中 %u 会代换为使用者的帐号名称， %h 会显示主机名称
  -u # username/#uid 不加此参数，代表要以 root 的身份执行指令
  而加了此参数，可以以 username 的身份执行指令（#uid 为该 username 的使用者号码）
  -s # 执行环境变数中的 SHELL 所指定的 shell ，或是 /etc/passwd 里所指定的 shell
  -H # 将环境变数中的 HOME （家目录）指定为要变更身份的使用者家目录
  （如不加 -u 参数就是系统管理者 root ）
  command # 要以系统管理者身份（或以 -u 更改为其他人）执行的指令
```

# 区别
总结
- 共同点：都是 root 用户的权限；
- 不同点：su 仅仅取得 root 权限，工作环境不变，还是在切换之前用户的工作环境；sudo 是完全取得 root 的权限和 root 的工作环境。
- su 用于用户之间的切换。
- sudo 用于普通用户可以使用 root 权限来执行指定命令。

---
**参考**
- [Linux中su与sudo、su – root的区别](https://wanglu.info/1237.html)
- [Learn Difference Between “su” and “su -” Commands in Linux](https://www.tecmint.com/difference-between-su-and-su-commands-in-linux/)
- [linux su和sudo命令的区别](https://www.jb51.net/LINUXjishu/12713.html)
