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

```
CMDER_HOME
D:\Program Files\cmder
```

![](/assets/Picture/images/20200405132003.png)

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

![](/assets/Picture/images/cmder_bash.png)


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

# 其他环境变量设置
> 通过系统属性添加环境变量设置 将其自带的 git 给到 cmd、powershell 也能调用

1. 找到 Git 路径：首先，找到你的 Cmder 解压目录如 'D:\Cmder\vendor\git-for-windows\cmd'

2. 打开系统环境变量

按 Win + R，输入 'sysdm.cpl' 并回车,切换到“高级”选项卡，点击“环境变量”编辑 PATH 变量：

3. 在“系统变量”区域，找到并双击 Path 变量，点击“新建”，将第一步找到的完整路径粘贴进去

4. 如果还想在 CMD 中直接输入 cmder 来启动程序，可以把 Cmder 的主目录 D:\Cmder 也加到 PATH 里

5. 保存并验证：点击“确定”保存所有窗口。然后新开一个 CMD 或 PowerShell 窗口，输入 git --version，如果正确显示版本号，就说明配置成功了