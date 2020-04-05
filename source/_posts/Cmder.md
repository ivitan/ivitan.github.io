---
title: Cmder 配置
tags:
  - Linux
  - Win
  - Batch
categories:
  - Coding
author:
  - Vitan
enable_unread_badge: true
toc: true
thumbnail: /images/Win.png
date: 2020-01-08 13:40:15
---
> Cmder 是 Windows出色的终端。它不仅支持 Linux 命令，并且因为并采用了 Monokai 配色方案，最重要的是能自定义布局。

<!--more-->

# 配置
## 基本配置
- 系统环境变量

![](https://raw.githubusercontent.com/ivitan/Picture/master/images/20200405132003.png)

- 在 PATH 添加 %CMDER_HOME%

## 添加右键菜单
```
Cmder.exe /REGISTER ALL
```
## 使用 Bash

![](https://raw.githubusercontent.com/ivitan/Picture/master/images/cmder_bash.png)

## 配置文件
```bash D:\Program Files\cmder\config\user_profile.sh
# 别名
#打开当前文件夹
alias e.='explorer .'
alias ls='ls --show-control-chars -F --color $*'
alias clear=cls
alias gl='git pull origin $1'
alias glm='git pull origin master'
alias gp='git push origin $1'
alias gpm='git push origin master'
alias cpd='cap production deploy'
alias cpt='cap staging deploy'

# Git Commit, Add all and Push — in one step.
function gcap() {
    git add . && git commit -m "$*" && git push
}

# NEW.
function gnew() {
    gcap "📦 NEW: $@"
}

# IMPROVE.
function gimp() {
    gcap "👌 IMPROVE: $@"
}

# FIX.
function gfix() {
    gcap "🐛 FIX: $@"
}

# RELEASE.
function grlz() {
    gcap "🚀 RELEASE: $@"
}

# DOC.
function gdoc() {
    gcap "📖 DOC: $@"
}

# TEST.
function gtst() {
    gcap "✅ TEST: $@"
}
```

# 设置 VS Code
## 添加环境变量
变量名 `CMDER_ROOT` 变量值 `D:\Program Files\cmder`

## VS Code 配置

```sh setting.json
"terminal.integrated.shell.windows": "cmd.exe",
"terminal.integrated.shellArgs.windows": [
    "/k",
    "D:\\Program Files\\cmder\\vendor\\init.bat"
]
```