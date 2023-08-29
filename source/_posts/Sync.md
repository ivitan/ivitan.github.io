---
title: 同步 Visual Studio Code 配置
tags:
  - Linux
  - Windows
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-06-07 11:00:38
---
利用 Gist 和 Setting Sync 同步 Visual Studio Code 设置和扩展。
<!--more-->

# 安装 Setting Sync

在扩展中搜索 Setting Sync 并安装。

# 配置 Setting Sync

## 新建 Gist
访问 [Github Tokens](https://github.com/settings/tokens) ,然后点击 Generate new token

![](/assets/Picture/images/CreateToken.png)

勾选 Gist

![](/assets/Picture/images/Gist.png)

然后复制得到的 Token

## 配置 Setting Sync
Crtl + P 输入

```
>sync:Advanced Options
```

选择 `Sync:编辑扩展本地配置` 打开 Setting Sync 扩展的本地配置文件，在 token 中填入上一步的 Token

```
"token": "169f0811bf4b00d9cdcvvvvscassdeesvavasd",
```

## 配置 Gist

- 创建新的 Gist

访问 https://gist.github.com/ 创建新的 Gist

![](/assets/Picture/images/CreatGist.png)

- 得到 Gist ID

![](/assets/Picture/images/GistID.png)

## 设置 Setting Sync 

- 打开 Setting sync 扩展设置

![](/assets/Picture/images/OpenSync.png)

- 填入 Gist ID

![](/assets/Picture/images/InputGistID.png)

# 快捷键

- 上传配置

```
Shift + Alt + U
```

- 下载配置

```
Shift + Alt + D
```