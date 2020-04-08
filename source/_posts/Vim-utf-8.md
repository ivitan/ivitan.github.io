---
title: Vim 设置默认中文并加行数
date: 2018-03-11 12:26:46
tags:
- Linux
- Vim
- ArchLinux
- Ubuntu
toc: true
categories: Coding
---
Vim 设置默认中文并加行数
<!--more-->
# .vimrc
配置文件

 ```vim
    " 设置行号显示
    set number

    " 将行号设置为相对行号
    set relativenumber

    "显示标尺
    set ruler

    "编码
    set fileencodings=utf-8,gb2312,gb18030,gbk,ucs-bom,cp936,latin1
    set enc=utf8
    set fencs=utf8,gbk,gb2312,gb18030

    " 语法高亮
    syntax enable
    syntax on

    " 高亮字符，让其不受100列限制
    :highlight OverLength ctermbg=red ctermfg=white guibg=red guifg=white
    :match OverLength '\%101v.*'

    " 状态行颜色
    highlight StatusLine guifg=SlateBlue guibg=Yellow
    highlight StatusLineNC guifg=Gray guibg=White

    " 增强模式中的命令行自动完成操作
    set wildmenu

    " 我的状态行显示的内容（包括文件类型和解码）
    set statusline=%F%m%r%h%w\[POS=%l,%v][%p%%]\%{strftime(\"%d/%m/%y\ -\ %H:%M\")}

    " 总是显示状态行
    set laststatus=2

    "命令行补全参数
    set wildmenu

    "设置tab键空4格
    set tabstop=4

    "自动检测文件类型
    filetype plugin indent on

    "开启自动缩进，智能缩进
    set autoindent
    set cindent
    set smartindent
    set shiftwidth=4
    
    "插件安装列表
    set rtp+=~/.vim/bundle/Vundle.vim
    call vundle#begin()
    Plugin 'godlygeek/tabular'
    Plugin 'plasticboy/vim-markdown'
    call vundle#end()
```

# Vim 设置默认中文编码
.vimrc 添加下面内容即可

```vim
set encoding=utf-8
set fileencodings=ucs-bom,utf-8,cp936
set fileencoding=gb2312
set termencoding=utf-8
```
# 设置行数
```vim
set nu
set nobackup
set noswapfile
syntax on
set tabstop=4
set shiftwidth:4
set expandtab
set smarttab
set hlsearch
set showmatch
set matchtime=2
```
