---
title: 配置 PowerShell 主题
tags:
  - Windows
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-06-04 09:25:32
---

配置 PowerShell 主题

<!--more-->

# 安装配置 Scoop 

> Scoop 第三方 Windows 包管理工具。

```powershell
set-executionpolicy remotesigned -scope currentuser
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
scoop help
```

## 命令

|命令|	动作|
|:---|:---|
|search	|搜索软件名
|install	|安装软件
|update	|更新软件
|status	|查看软件状态
|uninstall|	卸载软件
|info	|查看软件详情
|home	|打开软件主页

# 安装 oh-my-posh
```
Install-Module posh-git -Scope CurrentUser 
Install-Module oh-my-posh -Scope CurrentUser
```

# PowerShell 配置文件
```
# 新建 PowerShell 配置文件
if (!(Test-Path -Path $PROFILE )) { New-Item -Type File -Path $PROFILE -Force }

# 记事本打开配置文件
notepad $PROFILE
```

- 我的配置文件

```$PROFILE
Import-Module posh-git 
Import-Module oh-my-posh 
Set-Theme Paradox
# Chocolatey profile
$ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
if (Test-Path($ChocolateyProfile)) {
  Import-Module "$ChocolateyProfile"
}
```

# 更换主题
```
Set-Theme <主题名>
```

## 主题

[查阅](https://github.com/JanDeDobbeleer/oh-my-posh)

# 安装 colortool 配色管理
```powershel
scoop install colortool
```

## 基本命令
```
# 查看主题配色
colortool -s

# 临时查看
colortool <主题名称>

# 定义默认值
colortool -d <主题名称>
```

# 字体
[nerd-fonts](https://github.com/ryanoasis/nerd-fonts)