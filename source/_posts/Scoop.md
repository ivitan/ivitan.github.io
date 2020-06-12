---
title: Windows 包管理器 Scoop
tags:
  - Windows
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-06-12 19:21:10
---
Windows 包管理器 Scoop 的安装使用。

<!--more-->
# 前提条件

- Windows 7 SP1 + / Windows Server 2008+ [PowerShell 5](https://aka.ms/wmf5download)或更高版本，包括[PowerShell Core](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-6) 和 [.NET Framework 4.5](https://www.microsoft.com/net/download) 或更高版本
- 必须启用 PowerShell

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned-范围CurrentUser
```

# 默认安装
默认安装，Scoop 的路径为 C:\Users\<user>\scoop，之后 Scoop 安装的软件也会在此。

- 打开 PowerShell

```
set-executionpolicy remotesigned -scope currentuser
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
scoop help
```

# 自定义安装

自定义 Scoop 安装的路径,不可以安装了 Scoop 之后再设置。

## 安装到当前用户
```
$env:SCOOP='D:\Applications\Scoop'
[Environment]::SetEnvironmentVariable('SCOOP', $env:SCOOP, 'User')

Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
```

## 全局安装
```
$env:SCOOP_GLOBAL='D:\GlobalScoopApps'
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'Machine')

Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
```

# 基础命令

|命令|	动作|
|:---|:---|
|scoop search	xx | 搜索软件名
|scoop install	xx | 安装软件
|scoop update	xx | 更新软件
|scoop status	xx | 查看软件状态
|scoop uninstall	xx |	卸载软件
|scoop info	xx | 查看软件详情
|scoop home	xx | 打开软件主页

- `-g` 为全局，如 scoop update -g xx 更新全局安装的 xx

---

**参考**
- [Scoop](https://github.com/lukesampson/scoop)