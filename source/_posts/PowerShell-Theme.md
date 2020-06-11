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
Install-Module -AllowClobber Get-ChildItemColor
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
Import-Module Get-ChildItemColor

$env:PYTHONIOENCODING="utf-8"
# Remove curl alias
If (Test-Path Alias:curl) {Remove-Item Alias:curl}
If (Test-Path Alias:curl) {Remove-Item Alias:curl}
# Remove-Item alias:ls -force
Set-Alias l Get-ChildItemColor -option AllScope
Set-Alias ls Get-ChildItemColorFormatWide -option AllScope

function GitLogPretty {
  git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --all
}

function PrettyLS {
  colorls --light -A
}

function GitStat { git status }

function GoBack { Set-Location .. }

function GetMyIp { curl -L tool.lu/ip }
function UpdateScoop { scoop update; scoop update * }

function Vscode { code .}

function HexoServe { hexo clean; hexo g; hexo s}

# Git Commit, Add all and Push — in one step.
function GitAdd{ git add . ; git commit -m "⚡ ADD: $args" }

function GitCap{ git add . ; git commit -m "$args" ; git push }

# NEW.
function GitNew{ gcap "<F0><9F><93><A6> NEW: $args" }

# IMPROVE.
function GitImp{ gcap "👌 IMPROVE: $args" }

# FIX.
function GitFix{ gcap "🐛 FIX: $args" }

# RELEASE.
function GitRlz{ gcap "🚀 RELEASE: $args" }

# DOC.
function GitDoc{ gcap"📖 DOC: $args" }

# TEST.
function GitTst{ gcap "✅ TEST: $args" }

Import-Module posh-git
Import-Module oh-my-posh
# $DefaultUser = 'spenc'

# Setup other alias
Set-Alias open Invoke-Item
Set-Alias .. GoBack
Set-Alias glola GitLogPretty
Set-Alias gst GitStat
Set-Alias myip GetMyIp
Set-Alias pls PrettyLS
Set-Alias suu UpdateScoop
Set-Alias vs Vscode
Set-Alias vitan HexoServe
Set-Alias gadd GitAdd
Set-Alias gcap GitCap
Set-Alias gnew GitNew
Set-Alias gimp GitImp
Set-Alias gfix GitFix
Set-Alias grlz grlz
Set-Alias gdoc GitDoc
Set-Alias gtst GitTst

# Set theme
Set-Theme Paradox

Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete
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
- [Sarasa](https://github.com/be5invis/Sarasa-Gothic/releases)
- [nerd-fonts](https://github.com/ryanoasis/nerd-fonts/releases)