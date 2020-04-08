---
title: Vim 增删查改、翻页和寄存器
date: 2019-04-28 08:52:31
tags:
  - Vim
  - Linux
categories:
  - Coding
author:
  - Vitan
toc: true
---
> Vim 增删查改、复制捏贴、翻页和寄存器。
> Vim 里剪切 (cut) 复制(copy) 粘贴(psate) 分别对应 delete/yank/put
<!--more-->

# 复制粘贴
## Normal 模式下

- yp dp vp

```sh
y # 复制(yank)
p # 粘贴(put)
d # 剪贴
vp # v(visual) 命令选中要复制的地方，后 p
```

- 配合文本对象

```sh
yyiw # 复制一个单词
yy   # 复制一行
dd   # 删除一行
o    # 下一行
V    # 快选两行
v    #　选择文本
```

## Insert 模式下

- 保留复制内容的缩进

1. vimrc 设置了自动缩进 `:set autoindent` 会使复制的代码缩进错乱

```vim
:set paste 
:set nopaste # 取消
```

# 增删查改翻页移动
## 增删查改
增（大写相反）
```bash
a# append 当前字母后面插入
i # insert 当前字母前面插入
o # open a line 向下打开新一行
```

删
```bash
d  # 删除
dw # 删除单词
diw # delete inner word 删除不包含空格的一个单词
daw # delete around word
dd # 删除一行
x # 删除一个字符
```

改
```bash 
c
ciw # Change inner word
ct  # 括号里面的内容（修改到右边括号）
ci” # 删除双引号里的内容
```

查
```bash
fs # 查找当前行第一个出现的 s ，使用 ； 查找下一个
Fs # 往回查
/word # 查找所以单词 word
?word #往回查
```
# 移动翻页
移动
```bash
hjkl # 上下左右
w # word 移动单词
b #back word 往回移动单词
:18 # 移动到18行
18G # 移动到14行
0 # 回到开头
$ # 行尾
gg # 文件开头
G # 文件结尾
Ctrl o # 返回刚刚的位置
```

翻页
```bash
ctrl + f # forward
ctrl + u # upward
```

# Vim 寄存器
使用 d 删除或者 y 复制的内容都放在了 "无名寄存器"

- 调换两字符

```vim
x  # 删除一个字符放到无名寄存器
p  # 粘贴
```

## 寄存器(register)
`"{register}` 可以指定寄存器，不指定默认使用无名寄存器，`""` 表示

## 无名寄存器
```vim
"ayiw # 复制一个单词到寄存器 a 
"bdd  # 删除当前行到寄存器 b

"a p  # 粘贴寄存器 a 的内容
"b p  # 粘贴寄存器 b 的内容
```

## 其他寄存器
- ”a-z 有名寄存器
  - "0 复制专业寄存器（y复制的文本会拷到复制及长期0）
  - "+ 系统剪切板 （可以再复制前加上 "+ 复制到系统剪切板）
    - `:set cliboard=unnamed` 可直接复制系统剪切板内容
  - ”% 当前文件名
  - ". 上次插入的文本


## 查看寄存器内容
```vim
:reg a # 查看 a 寄存器内容
:reg b # 查看 b 寄存器内容
```

## 查看是否支持 clipboard
```vim
:echo has('clipboard')
```
- 1 为支持