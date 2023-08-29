---
title: Windows 配置 Vim
tags:
  - Vim
  - Windows
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-06-15 13:17:38
---

Windows 配置美化 Vim.

<!--more-->

![最终效果](/assets/Picture/images/20200615152009.png)

---

# 安装
## 常规安装

[下载](https://www.vim.org/download.php)

## Scoop 安装

```
scoop install vim
```

# 优化

## 安装 vim—plug

[下载](https://github.com/junegunn/vim-plug/releases) 并解压，把 `plug.vim` 文件复制到 D:\vim\current\autoload\ 目录下

## 配置 Vimrc
- 打开 Vim 命令模式，输入`:version` 获取 vimrc 路径,如下：

```
system vimrc file: "$VIM\vimrc"
user vimrc file: "$HOME\_vimrc"
2nd user vimrc file: "$HOME\vimfiles\vimrc"
3rd user vimrc file: "$VIM\_vimrc"
user exrc file: "$HOME\_exrc"
2nd user exrc file: "$VIM\_exrc"
defaults file: "$VIMRUNTIME\defaults.vim"
```

- 配置

```
vim "$HOME\_vimrc" 
```

- 我的配置

```vimrc
">> 一般设置
set mouse=a              " 鼠标可用
set relativenumber       " 将行号设置为相对行号
set wildmenu             " 命令行补全参数
filetype on              " 设置开启文件类型侦测
filetype plugin on       " 设置加载对应文件类型的插件
syntax enable            " 开启语法高亮功能
syntax on                " 自动语法高亮
set t_Co=256             " 开启256色支持
set cmdheight=2          " 设置命令行的高度
set showcmd              " select模式下显示选中的行数
set ruler                " 总是显示光标位置
set laststatus=2         " 总是显示状态栏
set number               " 开启行号显示
set cursorline           " 高亮显示当前行
set ttimeoutlen=0        " 设置<ESC>键响应时间
set virtualedit=block,onemore  " 允许光标出现在最后一个字符的后面
 
">> 搜索设置
set hlsearch            " 高亮显示搜索结果
set incsearch           " 开启实时搜索功能
set ignorecase          " 搜索时大小写不敏感
 
">> 编码设置
set langmenu=zh_CN.UTF-8
set helplang=cn
set termencoding=utf-8
set encoding=utf8
set fileencodings=utf8,ucs-bom,gbk,cp936,gb2312,gb18030
 
">> 语法高亮
syntax enable
syntax on
 
hi pythonSelf            ctermfg=174 guifg=#6094DB cterm=bold gui=bold
let python_highlight_all=1
syntax enable
 
">> 状态行颜色
highlight StatusLine guifg=SlateBlue guibg=Yellow
highlight StatusLineNC guifg=Gray guibg=White
 
">> 增强模式中的命令行自动完成操作
set wildmenu
 
">> 总是显示状态行
set laststatus=2
 
">> 命令行补全参数
set wildmenu
 
">> 设置tab键空4格
set tabstop=4
 
">> 自动检测文件类型
filetype plugin indent on
 
">> 开启自动缩进，智能缩进
set autoindent
set cindent
set smartindent
set shiftwidth=4
 
">> 映射光标在窗口间移动的快捷键
nmap <C-H> <C-W>h
nmap <C-J> <C-W>j
nmap <C-K> <C-W>k
nmap <C-L> <C-W>l
 
">> vim-plug
call plug#begin('~/.vim/plugged')
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'morhetz/gruvbox'
Plug 'Yggdroot/indentLine'
Plug 'mhinz/vim-startify'
Plug 'scrooloose/nerdtree'
Plug 'kien/ctrlp.vim'
Plug 'tpope/vim-fugitive'
Plug 'scrooloose/syntastic'
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'scrooloose/nerdtree'      	" File tree manager
Plug 'jistr/vim-nerdtree-tabs'      " enhance nerdtree's tabs
Plug 'ryanoasis/vim-devicons'       " add beautiful icons besides files
Plug 'Xuyuanp/nerdtree-git-plugin'  " display git status within Nerdtree
Plug 'tiagofumo/vim-nerdtree-syntax-highlight' " enhance devicons
call plug#end()
 
" <Nerdtree>-------------------{
    ">> Basic settings
        "let g:NERDTreeChDirMode = 2  "Change current folder as root
        autocmd BufEnter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) |cd %:p:h |endif
		map <C-T> :NERDTreeMirror<CR> "Open Nerdtree    
		map <C-T> :NERDTreeToggle<CR> "Close Nerdtree
 
    ">> UI settings
        let NERDTreeQuitOnOpen=1   " Close NERDtree when files was opened
        let NERDTreeMinimalUI=1    " Start NERDTree in minimal UI mode (No help lines)
        let NERDTreeDirArrows=1    " Display arrows instead of ascii art in NERDTree
        let NERDTreeChDirMode=0    " Change current working directory based on root directory in NERDTree
        let g:NERDTreeHidden=1     " Don't show hidden files
        let NERDTreeWinSize=30     " Initial NERDTree width
        let NERDTreeAutoDeleteBuffer = 1  " Auto delete buffer deleted with NerdTree
        let NERDTreeShowBookmarks=1   " Show NERDTree bookmarks
        let NERDTreeIgnore = ['\.pyc$', '\.swp', '\.swo', '__pycache__']   " Hide temp files in NERDTree
        "let g:NERDTreeShowLineNumbers=1  " Show Line Number
    " Open Nerdtree when there's no file opened
        "autocmd vimenter * if !argc()|NERDTree|endif
    " Or, auto-open Nerdtree
        "autocmd vimenter * NERDTree
    " Close NERDTree when there's no other windows
        autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
    " Customize icons on Nerdtree
        let g:NERDTreeDirArrowExpandable = '▸'
        let g:NERDTreeDirArrowCollapsible = '▾'
 
    ">> NERDTREE-GIT
        " Special characters
    let g:NERDTreeIndicatorMapCustom = { 
        \ "Modified"  : "✹",
        \ "Staged"    : "✚",
        \ "Untracked" : "✭",
        \ "Renamed"   : "➜",
        \ "Unmerged"  : "═",
        \ "Deleted"   : "✖",
        \ "Dirty"     : "✗",
        \ "Clean"     : "✔︎",
        \ 'Ignored'   : '☒',
        \ "Unknown"   : "?"
    \ }
 
    ">> NERDTree-Tabs
        let g:nerdtree_tabs_open_on_console_startup=1 "Auto-open Nerdtree-tabs on VIM enter

    ">> Nerdtree-devicons
        set guifont=DroidSansMono_Nerd_Font:h11

    ">> Nerdtree-syntax-highlighting
        let g:NERDTreeDisableFileExtensionHighlight = 1
        let g:NERDTreeDisableExactMatchHighlight = 1
        let g:NERDTreeDisablePatternMatchHighlight = 1
        let g:NERDTreeFileExtensionHighlightFullName = 1
        let g:NERDTreeExactMatchHighlightFullName = 1
        let g:NERDTreePatternMatchHighlightFullName = 1
        let g:NERDTreeHighlightFolders = 1 " enables folder icon highlighting using exact match
        let g:NERDTreeHighlightFoldersFullName = 1 " highlights the folder name
        let g:NERDTreeExtensionHighlightColor = {} " this line is needed to avoid error
" }
 
">> 基本主题配置
set bg=dark  "设置背景为黑色
colorscheme gruvbox    "设置主题为 gruvbox
set guioptions=        "去掉两边的scrollbar
set guifont=Monaco:h17 "设置字体和字的大小
 
">> airline settings
let g:airline_theme = 'hybrid'
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
 
">> show absolute file path in status line
let g:airline_section_c = '%<%F%m %#__accent_red#%{airline#util#wrap(airline#parts#readonly(),0)}%#__restore__#'
 
">> show tab number in tab line
let g:airline#extensions#tabline#tab_nr_type = 1
 
">> Enable folding
set foldmethod=indent
set foldlevel=99
 
">> Enable folding with the spacebar
nnoremap <space> za
```
