---
title: SSH 的使用
date: 2018-05-09 21:31:38
tags:
- Linux
- Ubuntu
- Termux
- SSH
toc: true
categories: notes
thumbnail: /images/SSH.png
---
SSH的简单运用
<!--more-->
# 基础使用
SSH 登录远程主机 host
```sh
ssh root@host
```

- 本地用户名与远程用户名一致，登录时可以省略用户名。

```sh
ssh host
```

- SSH 的默认端口是22，也就是说，你的登录请求会送进远程主机的22端口。使用p参数，可以修改这个端口。

```sh
ssh -p 2222 root@host
```
# 公钥登录
ssh-keygen 生成公钥
```sh
ssh-keygen
```

- 运行结束以后，在`$HOME/.ssh/`目录下，会新生成两个文件 `id_rsa.pub`和`id_rsa`。前者是你的公钥，后者是你的私钥。
- 将公钥传送到远程主机 host 上面

```sh
ssh-copy-id user@host
```

- 如果还是不行，就打开远程主机的`/etc/ssh/sshd_config`这个文件，检查下面几行前面"#"注释是否取掉。

```
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

重启远程主机的 ssh 服务

- Ubuntu系统

```sh
service ssh restart
```

- Debian 系统

```sh
/etc/init.d/ssh restart
```