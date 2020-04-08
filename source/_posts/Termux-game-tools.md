---
title: 分屏&游戏
date: 2018-03-28 19:07:03
tags:
- Linux
- Termux
toc: true
categories: Diary
mathjax: true
---
分屏与游戏。
<!--more-->
# 游戏
月球车
```bash
pkg install moon-buggy
```
- Start:`moon-buggy`

fortz
```bash
pkg install fortz
```
- start: `zgames`

# tmux 分屏
- 在ubuntu系统中使用 `sudo apt-get install tmux` 
- ArchLinux `yacman -S tmux`
- Termux安装：
```bash
pkg install tumx
```
  
tmux主要包括以下几个模块

|名词|含义|解析|
|:----:|:----:|:----|
|session|会话|一个服务器可以包含多个会话|
|window	|窗口|一个会话可以包含多个窗口|
|pane	|面板|一个窗口可以包含多个面板[强悍的分屏]


- 输入命令 tmux 使用工具

|命令|分屏状态|
|:------|:------|
|Ctrl+b ? |显示快捷键帮助|
|Ctrl+b C-o |调换窗口位置，类似与vim 里的C-w|
|Ctrl+b 空格键 |采用下一个内置布局|
|Ctrl+b ! |把当前窗口变为新窗口|
|Ctrl+b “| 横向分隔窗口|
|Ctrl+b % |纵向分隔窗口|
|Ctrl+b q| 显示分隔窗口的编号|
|Ctrl+b o| 跳到下一个分隔窗口|
|Ctrl+b 上下键 |上一个及下一个分隔窗口|
|Ctrl+b C-方向键 |调整分隔窗口大小|
|Ctrl+b c |创建新窗口|
|Ctrl+b 0~9 |选择几号窗口|
|Ctrl+b c| 创建新窗口|
|Ctrl+b n |选择下一个窗口|
|Ctrl+b l |切换到最后使用的窗口|
|Ctrl+b p |选择前一个窗口|
|Ctrl+b w| 以菜单方式显示及选择窗口|
|Ctrl+b t |显示时钟|
|Ctrl+b ; |切换到最后一个使用的面板|
|Ctrl+b x| 关闭面板|
|Ctrl+b & |关闭窗口|
|Ctrl+b s |以菜单方式显示和选择会话
|Ctrl+b d |退出tumx，并保存当前会话，这时，tmux仍在后台运行，可以通过tmux attach进入 到指定的会话|
