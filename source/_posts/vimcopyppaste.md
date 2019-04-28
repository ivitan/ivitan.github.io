---
title: Vim 复制粘贴和寄存器的使用
date: 2019-04-28 08:52:31
tags:
  - Vim
  - Linux
categories:
  - notes
author:
  - Vitan
enable_unread_badge: true
icon:
  - /images/Vim.png
---
Vim 里剪切 (cut) 复制(copy) 粘贴(psate) 分别对应 delete/yank/put

# 复制粘贴
Normal 模式下
: - yp dp vp
  ```shell
  y # 复制(yank)
  p # 粘贴(put)
  d # 剪贴
  vp # v(visual) 命令选中要复制的地方，后 p
  ```
  - 配合文本对象
  ```shell
  yyiw # 复制一个单词
  yy   # 复制一行
  dd   # 删除一行
  o    # 下一行
  V    # 快选两行
  v    #　选择文本
  ```

Insert 模式下
: - 保留复制内容的缩进
  1. vimrc 设置了自动缩进 `:set autoindent` 会使复制的代码缩进错乱
  ```shell
  :set paste 
  :set nopaste # 取消
  ```

# Vim 寄存器
What
: 使用 d 删除或者 y 复制的内容都放在了 "无名寄存器"
  - 调换两字符
  ```shell
  x  # 删除一个字符放到无名寄存器
  p  # 粘贴
  ```

寄存器(register)
: `"{register}` 可以指定寄存器，不指定默认使用无名寄存器，`""` 表示

无名寄存器
: ```shell
  "ayiw # 复制一个单词到寄存器 a 
  "bdd  # 删除当前行到寄存器 b

  "a p  # 粘贴寄存器 a 的内容
  "b p  # 粘贴寄存器 b 的内容
  ```

其他寄存器
:   - ”a-z 有名寄存器
    - "0 复制专业寄存器（y复制的文本会拷到复制及长期0）
    - "+ 系统剪切板 （可以再复制前加上 "+ 复制到系统剪切板）
      - `:set cliboard=unnamed` 可直接复制系统剪切板内容
    - ”% 当前文件名
    - ". 上次插入的文本

  - 查看寄存器内容
  ```shell
  :reg a # 查看 a 寄存器内容
  :reg b # 查看 b 寄存器内容
  ```

查看是否支持 clipboard
: ```shell
  :echo has('clipboard')
  ```
  - 1 支持