---
title: Github 不再支持密码验证解决方案
tags:
  - Linux
  - Windows
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2021-08-19 23:10:42
---
> remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
> remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.

<!--more-->

## 解决方法

### Token 登录
若之前记住了密码,则需要删除用户目录下的 `.git-credentials` 文件，则可以重新输入用户名和密码，输入密码时输入 Github 生成的 Token 即可

- Windows
```
rm -rf C:\Users\username\.git-credentials
```

- Linux/macOS
```
rm -rf /home/username/.git-credentials
rm -rf /Users/username/.git-credentials
```

## SSH 免密登录

### 生成密钥

- 生成

```
ssh-keygen -t rsa -b 4096 -C "uesrname@xxx.com"
```

- id_rsa.pub 密钥填入 Github 的 SSH keys 

- 修改本地项目的地址为 SSH Clone 的地址(三种方法)

1. 修改命令

```
git remote origin set-url [url]
```

2. 先删后加
```
git remote rm origin
git remote add origin [url]
```

直接修改config文件
3. 编辑 .git 中 config
```
git remote origin set-url 
```