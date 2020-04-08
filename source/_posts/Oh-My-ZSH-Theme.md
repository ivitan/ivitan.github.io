---
title: Oh-My-zsh 主题
date: 2018-03-31 09:13:37
tags:
- Linux
- Ubuntu
- Termux
toc: true
categories: Linux
---
自定义主题shell提示符.
<!--more-->
# 修改oh-my-zsh主题
## 主题目录
```bash
cd ~/.oh-my-zsh/themes
vim theme-name
```

## 主题提示符
|代码|解释|
|:---:|:---:|
|%T|系统时间(时：分)|
|%*|系统时间(时：分：秒)|
|%D|系统日期(年-月-日)|
|%n|你的用户名|
|%B - %b|开始到结束使用粗体打印|
|%U - %u|开始到结束使用下划线打印|
|%d|你目前的工作目录|
|%~|你目前的工作目录相对于～的相对路径|
|%M|计算机的主机名|
|%m|计算机的主机名(在第一个句号之前截断)|
|%l|你当前的tty|
|%n|登录名|


## 顏色語法
1. "%{$fg[cyan]%}XXX"
2. "%{$fg[yellow]%}和%{$reset_color%}"
3. 上面是一对的中间夹的文字会用 yellow 颜色显示，颜色要用小写。

# 事例
- Before
```
PROMPT="
%{$terminfo[bold]$fg[blue]%}#%{$reset_color%} \
%(#,%{$bg[yellow]%}%{$fg[black]%}%n%{$reset_color%},%{$fg[cyan]%}%n) \
%{$fg[white]%}@ \
%{$fg[green]%}%m \
%{$fg[white]%}in \
%{$terminfo[bold]$fg[yellow]%}%~%{$reset_color%}\
${hg_info}\
${git_info}\
 \
%{$fg[white]%}[%*] $exit_code
%{$terminfo[bold]$fg[red]%}$ %{$reset_color%}"
```
- Affter
```
PROMPT="%{$terminfo[bold]$fg[blue]%}#%{$reset_color%} \
%(#,%{$bg[yellow]%}%{$fg[black]%}%n%{$reset_color%},%{$fg[cyan]%}% Vitan) \
%{$fg[white]%}@ \
%{$fg[green]%}% OnePlus \
%{$fg[white]%}in \
%{$terminfo[bold]$fg[yellow]%}%~%{$reset_color%}\
${hg_info}\
${git_info}\
\
%{$fg[white]%} [%*] $exit_code
%{$terminfo[bold]$fg[red]%}➜ %{$reset_color%}"
```
