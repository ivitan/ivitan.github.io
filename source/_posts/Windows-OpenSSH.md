---
title: Windows 安装 OpenSSH 服务端
tags:
  - Windows
  - OpenSSH
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-06-03 15:37:28
---
Windows 安装 OpenSSH 服务端
<!--more-->

# Windows 10 开启
在系统设置的 `应用` 中的 `管理可选功能` 安装 OenSSH 客户端 和 OpenSSH 服务器

# Github 下载

https://github.com/PowerShell/Win32-OpenSSH/releases

## 安装

解压 OpenSSH，添加 Path 环境变量 `D:\Program Files\OpenSSH`，以管理员身份运行 PowerShell

```
cd D:\Program Files\OpenSSH
powershell.exe -ExecutionPolicy Bypass -File install-sshd.ps1
```

- 设置服务自动启动并启动服务
  
```
sc config sshd start= auto
net start sshd
```

- 配置服务

```bash C:\ProgramData\ssh\sshd_config
# 取消注释
Port 22
PubkeyAuthentication yes
PasswordAuthentication no
PermitEmptyPasswords no

# 注释以下内容
#Match Group administrators
#       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

- 执行 PowerShell 命令

```
cd C:\Progra~1\OpenSSH
.\FixHostFilePermissions.ps1
.\FixUserFilePermissions.ps1
```

- 重启 SSHD 服务

```
net stop sshd
net sart sshd
```

## 开启端口

打开 控制面板 -> Windows 防火墙 -> 高级设置 -> 入站规则 -> 新建规则 -> 端口 -> TCP,特定端口 `22` -> 允许连接 -> 下一步

## 将 PowerShell 设为默认 Shell
```
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String -Force
```
---
**参考**
[OpenSSH 服务器配置](https://docs.microsoft.com/zh-cn/windows-server/administration/openssh/openssh_server_configuration)