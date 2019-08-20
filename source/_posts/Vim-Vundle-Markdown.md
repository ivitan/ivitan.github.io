---
title: Vim 插件&主题
date: 2018-06-19 21:17:04
tags:
- Vim
- Linux
- Win
categories: notes
toc: true
thumbnail: /images/Vim.png
---
Vim 插件 主题
<!--more-->
# SpaceVim
```sh
curl -sLf https://spacevim.org/install.sh | bash
```
# Vundle 插件管理器
Vundle 是Vim bundle 的简称,是一个 Vim 插件管理器.

Vundle 允许你做

1. 在.vimrc中跟踪和管理插件
2. 安装特定格式的插件(a.k.a. scripts/bundle)
3. 更新特定格式插件
4. 通过插件名称搜索Vim scripts中的插件
5. 清理未使用的插件
6. 可以通过单一按键完成以上操作,详见[interactive mode](https://github.com/VundleVim/Vundle.vim/blob/v0.10.2/doc/vundle.txt#L319-L360)

安装
```git
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

- 配置
1. 编辑
```
 vim .vimrc
```
2. 添加下列内容
```
set nocompatible   " be iMproved, required
filetype off   " required
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'
call vundle#end()   " required
filetype plugin indent on  " required
```

安装需要的插件
- bash 下：
```
vim +PluginInstall +qall
```
- vim 下
```
:PluginInstall
```

# 安装 Markdown 插件
修改vimrc配置文件,添加
```
Plugin 'godlygeek/tabular'
Plugin 'plasticboy/vim-markdown'
```

下一步
```bash
vim
:PluginInstall
```
# 安装 gruvbox 主题
在 .vimrc 添加
```
Plugin 'morhetz/gruvbox'
Plugin 'vim-airline/vim-airline'
```

配置主题
```
set bg=dark "设置背景为黑色
colorscheme gruvbox "设置主题为 gruvbox
set guioptions=  "去掉两边的scrollbar
set guifont=Monaco:h17 "设置字体和字的大小
```
# Vim-airline
.vimrc 添加插件
```
Plugin 'vim-airline/vim-airline
Plugin 'vim-airline/vim-airline-themes'
```

配置
```
    "" airline settings.
    let g:airline_theme = 'simple'
    let g:airline_powerline_fonts = 1

    if !exists('g:airline_symbols')
      let g:airline_symbols = {}
    endif

    let g:airline_left_sep = ''
    let g:airline_left_alt_sep = ''
    let g:airline_right_sep = ''
    let g:airline_right_alt_sep = ''
    let g:airline_symbols.branch = ''
    let g:airline_symbols.readonly = ''
    let g:airline_symbols.linenr = ''
    let g:airline#extensions#tabline#enabled = 1
    " show absolute file path in status line
    let g:airline_section_c = '%<%F%m %#__accent_red#%{airline#util#wrap(airline#parts#readonly(),0)}%#__restore__#'
    " show tab number in tab line
    let g:airline#extensions#tabline#tab_nr_type = 1
```

支持主题
```
    badwolf
    base16
    behelit
    bubblegum
    dark
    durant
    hybridline
    hybrid
    jellybeans
    kalisi
    kolor
    laederon
    light
    lucius
    luna
    molokai
    monochrome
    murmur
    papercolor
    powerlineish
    raven
    serene
    silver
    simple
    solarized
    sol
    term
    tomorrow
    ubaryd
    understated
    wombat
    zenburn
```

# NERD Tree 文件浏览插件
.vimrc 添加插件
```
Plugin 'scrooloose/nerdtree'
```

打开/关闭 NERD Tree
```
:NERDTreeToggle
```

NERD Tree 配置
```
"当 vim 启动没指定文件时，自动打开 NERDTree
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif
"在 normal 下按 ,d 打开关闭文件浏览
nmap ,d :NERDTreeToggle<CR>
```
使用技巧
1. 按 `?`可以打开 NERD tree 帮助文档
2. 按 `j` ,`k` 在 NERD tree上下移动,`<c-r>` 打开关闭文件夹或文件
3. `:vsp` 在右侧打开一个分屏，`:sp` 在下面打开一个分屏
4. `<c-w>j` ，`<c-w>k`, `<c-w>h`, `<c-w>l`按键分别向上、下、左、右分屏移动。 `<c-w>=`均分屏幕

改默的切换分屏按键方式
```
"--------- Split Mapping --------------------"
nmap <c-j> <c-w>j
nmap <c-k> <c-w>k
nmap <c-h> <c-w>h
nmap <c-l> <c-w>l
```

- 官网文档
[GitHub Repo](https://github.com/scrooloose/nerdtree)

# .vimrc 配置文件
vimrc
```
    "设置行号显示
    set number

    "将行号设置为相对行号
    set relativenumber

    "显示标尺
    set ruler

    " 编码
    set fileencodings=utf-8,gb2312,gb18030,gbk,ucs-bom,cp936,latin1
    set fileencoding=utf-8
    set encoding=utf-8
    set fencs=utf-8,gbk,gb2312,gb18030

    "语法高亮
    syntax enable
    syntax on

    " 高亮
    hi pythonSelf            ctermfg=174 guifg=#6094DB cterm=bold gui=bold
    let python_highlight_all=1
    syntax enable

    " 状态行颜色
    highlight StatusLine guifg=SlateBlue guibg=Yellow
    highlight StatusLineNC guifg=Gray guibg=White

    " 增强模式中的命令行自动完成操作
    set wildmenu

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

    "映射光标在窗口间移动的快捷键
    nmap <C-H> <C-W>h
    nmap <C-J> <C-W>j
    nmap <C-K> <C-W>k
    nmap <C-L> <C-W>l

    "插件安装列表
    set nocompatible              " be iMproved, required
    filetype off                  " required
    set rtp+=~/.vim/bundle/Vundle.vim
    call vundle#begin()
    Plugin 'VundleVim/Vundle.vim'
    Plugin 'morhetz/gruvbox'
    Plugin 'vim-airline/vim-airline'
    Plugin 'plasticboy/vim-markdown'
    call vundle#end()            " required
    filetype plugin indent on    " required

    "基本主题配置
    set bg=dark    		   "设置背景为黑色
    colorscheme gruvbox    "设置主题为 gruvbox
    set guioptions=        "去掉两边的scrollbar
    set guifont=Monaco:h17 "设置字体和字的大小
    set cuc
    set cul
    set incsearch		  "输入搜索内容时就显示搜索结果
    set ignorecase
    set hlsearch		  "搜索时高亮显示被找到的文本

    "airline settings.
    let g:airline_theme = 'simple'
    let g:airline_powerline_fonts = 1

    if !exists('g:airline_symbols')
      let g:airline_symbols = {}
    endif

    let g:airline_left_sep = ''
    let g:airline_left_alt_sep = ''
    let g:airline_right_sep = ''
    let g:airline_right_alt_sep = ''
    let g:airline_symbols.branch = ''
    let g:airline_symbols.readonly = ''
    let g:airline_symbols.linenr = ''
    let g:airline#extensions#tabline#enabled = 1
    " show absolute file path in status line
    let g:airline_section_c = '%<%F%m %#__accent_red#%{airline#util#wrap(airline#parts#readonly(),0)}%#__restore__#'
    " show tab number in tab line
    let g:airline#extensions#tabline#tab_nr_type = 1
```
---
**参考**
- [Vim](https://blog.csdn.net/zhangpower1993/article/details/52184581)
- [Vundle](https://github.com/VundleVim/Vundle.vim)
- [个性化 Vim](https://blog.csdn.net/u013950658/article/details/78211783))
