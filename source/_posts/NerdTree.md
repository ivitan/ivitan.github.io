---
title: Vim NerdTree 插件
tags:
  - Linux
  - Android
  - Win
  - Vim
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-04-01 14:15:39
---
> [NERDTree](https://github.com/preservim/nerdtree) 是 Vim 编辑器的文件系统浏览器。使用此插件，用户可以直观地浏览复杂的目录层次结构，快速打开文件以进行读取或编辑，以及执行基本的文件系统操作。

<!--more--->

# Plug 安装
```vim
call plug#begin('~/.vim/plugged')
Plug 'scrooloose/nerdtree'          " File tree manager
Plug 'jistr/vim-nerdtree-tabs'      " enhance nerdtree's tabs
Plug 'ryanoasis/vim-devicons'       " add beautiful icons besides files
Plug 'Xuyuanp/nerdtree-git-plugin'  " display git status within Nerdtree
Plug 'tiagofumo/vim-nerdtree-syntax-highlight' " enhance devicons
call plug#end()
```

# 配置
```vim ~/.vimrc
" <Nerdtree>-------------------{
    ">> Basic settings
        let g:NERDTreeChDirMode = 2  "Change current folder as root
        autocmd BufEnter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) |cd %:p:h |endif

    ">> UI settings
        let NERDTreeQuitOnOpen=1   " Close NERDtree when files was opened
        let NERDTreeMinimalUI=1    " Start NERDTree in minimal UI mode (No help lines)
        let NERDTreeDirArrows=1    " Display arrows instead of ascii art in NERDTree
        let NERDTreeChDirMode=2    " Change current working directory based on root directory in NERDTree
        let g:NERDTreeHidden=1     " Don't show hidden files
        let NERDTreeWinSize=30     " Initial NERDTree width
        let NERDTreeAutoDeleteBuffer = 1  " Auto delete buffer deleted with NerdTree
        "let NERDTreeShowBookmarks=0   " Show NERDTree bookmarks
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
        "let g:nerdtree_tabs_open_on_console_startup=1 "Auto-open Nerdtree-tabs on VIM enter
    ">> Nerdtree-devicons
        "set guifont=DroidSansMono_Nerd_Font:h11
    ">> Nerdtree-syntax-highlighting
        "let g:NERDTreeDisableFileExtensionHighlight = 1
        "let g:NERDTreeDisableExactMatchHighlight = 1
        "let g:NERDTreeDisablePatternMatchHighlight = 1
        "let g:NERDTreeFileExtensionHighlightFullName = 1
        "let g:NERDTreeExactMatchHighlightFullName = 1
        "let g:NERDTreePatternMatchHighlightFullName = 1
        "let g:NERDTreeHighlightFolders = 1 " enables folder icon highlighting using exact match
        "let g:NERDTreeHighlightFoldersFullName = 1 " highlights the folder name
        "let g:NERDTreeExtensionHighlightColor = {} " this line is needed to avoid error
" }
```

# 快捷键
输入 `:NERDTreeToggle` 打开文件树。快捷键来映射,在vimrc中加入：
```vim
map <F3> :NERDTreeMirror<CR>
map <F3> :NERDTreeToggle<CR>
```

## 切换工作台和目录
```vim
ctrl + w + h    光标 focus 左侧树形目录
ctrl + w + l    光标 focus 右侧文件显示窗口
ctrl + w + w    光标自动在左右侧窗口切换
ctrl + w + r    移动当前窗口的布局位置

o       在已有窗口中打开文件、目录或书签，并跳到该窗口
go      在已有窗口 中打开文件、目录或书签，但不跳到该窗口
t       在新 Tab 中打开选中文件/书签，并跳到新 Tab
T       在新 Tab 中打开选中文件/书签，但不跳到新 Tab
i       split 一个新窗口打开选中文件，并跳到该窗口
gi      split 一个新窗口打开选中文件，但不跳到该窗口
s       vsplit 一个新窗口打开选中文件，并跳到该窗口
gs      vsplit 一个新 窗口打开选中文件，但不跳到该窗口
!       执行当前文件
O       递归打开选中 结点下的所有目录
m    文件操作：复制、删除、移动等
```
## 切换标签页
```vim
:tabnew [++opt选项] ［＋cmd］ 文件      建立对指定文件新的tab
:tabc   关闭当前的 tab
:tabo   关闭所有其他的 tab
:tabs   查看所有打开的 tab
:tabp   前一个 tab
:tabn   后一个 tab

标准模式下：
gT      前一个 tab
gt      后一个 tab
```