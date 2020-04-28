---
title: Cmder 配置
tags:
- Linux
- Windows
- Batch
categories:
- Coding
author:
- Vitan
toc: true
date: 2020-01-08 13:40:15
---
> Cmder 是 Windows出色的终端。它不仅支持 Linux 命令，并且因为并采用了 Monokai 配色方案，最重要的是能自定义布局。

<!--more-->

# 配置
## 基本配置
- 系统环境变量

![](https://raw.githubusercontent.com/ivitan/Picture/master/images/20200405132003.png)

- 在 PATH 添加 `%CMDER_HOME%`

## 右键菜单
- 添加

```
Cmder.exe /REGISTER ALL
```

- 删除

```
Cmder.exe /UNREGISTER ALL
```

## 使用 Bash

![](https://raw.githubusercontent.com/ivitan/Picture/master/images/cmder_bash.png)


## 别名
### Bash
Bash 配置文件的加载顺序是:
```
$CMDER_ROOT/config/profile.d/*.sh
$CMDER_ROOT/config/user-profile.sh
$HOME/.bashrc
```

### CMD 
```bat %CMDER_ROOT%\config\user-aliases.cmd 
ls=ls --show-control-chars -F --color $*
pwd=cd
clear=cls
```

### PowerShell
直接使用 PowerShell 的 alias 命令添加或在下面的文件中添加

```
'CMDER_ROOT\config\profile.d\*.ps1'
'CMDER_ROOT\config\user-profile.ps1'
```

## 配置文件
```bash D:\Program Files\cmder\vendor\git-for-windows\etc\bash.bashrc
# 别名
alias vs="code ."
alias e.='explorer .'
alias cp='cp -i'
alias mv='mv -i'
alias rm='rm -i'
alias ls='ls -F --color=auto'
alias ll='ls -al'
alias grep='grep --color=auto'
alias la='ls -a'
alias l.='ls -d .* --color=tty'
alias vitan='hexo clean && hexo g && hexo s'

# Git Commit, Add all and Push — in one step.
function ad() {
    git add . && git commit -m "$*"
}

function gadd() {
    ad "⚡ ADD: $@"
}

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