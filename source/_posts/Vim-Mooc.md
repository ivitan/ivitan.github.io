---
title: Vim Mooc
date: 2019-05-19 09:30:42
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
Vim 重新学习笔记
<!--more-->
# 三个模式
Insert 编辑模式
: ```bash
  a i o # 进入编辑模式
  ESc # 进入 normal 模式
  ```
  - i (insert)
  - a (append)
  - o (oppen a line below)

Command 模式
: ```bash
  :wq # 保存退出
  :vs # vertical split 横向分频
  :sp # 纵向分频
  :% s/foo/bar/g # 全局替换
  ```

Visual (可视)模式
: ```bash
  v # 进入 visual 模式
  V # 选择行
  ctrl v # 进行快选择
  ```

# 如何快速纠错
a/i/o 进入插入模式
: ```bash
  ctrl h # 删除上一个字符
  ctrl w # 删除上一个单词
  ctrl u # 删除当前行
  ```

快速切换 Insert 和 Normal
: ```bash
  ctrl c / ctrl [ # 代替 Esc
  gi # 快速跳转到你最后一次编辑的地方并进入插入模式
  ```

使用 hjkl 移动
: ```bash 
  h # 左
  j # 下
  k # 上
  l # 右
  ```

# 在单词之间飞舞
方法
: ```bash 
  w/W # 移到下一 word/WORD 开头
  e/E # 下一个 word/WORD 尾
  b/B # 回到上一个word/WORD 开头
  ```
  - word 指以非空白符分割的单词
  - WORD 以空白符分割的单词

行间搜索移动
: ```bash
  f{char} # 移到 char 字符上
  t # 移到 char 前一个字符
  F # 反过来搜索前面的字符
  ```
  - ; 该行下一个
  - , 该行上一个

水平移动
: ```bash
  0 # 移到行首第一个字符
  ^ # 第一个非空白字符
  $ # 移到行尾
  g_ # 移到行尾非空白字符
  ```

垂直移到
: ```bash
  () # 在句子间移动
  {} # 在段落间移到
  ```
  - 插件 easy-motion

页面移动
: ```bash
  gg、G # 文件开头/结尾
  ctrl o # 快速返回

  H/M/L # 跳到屏幕开头(Head)中间(Middle)结尾(Lower)
  ctrl u # 上翻页
  ctrl f # 下翻页
  zz # 把屏幕置为中间
  ```
# 增删查改
增
: ```bash
  a/i/o
  A/I/O
  ```

快速删除
: ```bash normal 模式下
  x # 快速删一个字符
  d # 删除
  daw # 删除一个单词
  ```
  - d x 可以搭配数字执行多次

快速修改
: ```bash
  r(replace) c(change) s(substitute) # 常用
  ```
  - normal 下 r 可以替换一个字符，s 替换并进入插入模式
  - 使用 c 配合文本对象可以快速进行修改

查询
: ```bash
  / # 前向搜索
  ? # 反向搜索
  ```
  - n/N 跳转上一个或者上一个匹配
  - * 或者 # 进行当前单词的前向和后向匹配

# 替换命令
substitute
: ```bash
  :[range]s[ubsitite]/{pattern}/{string}/[flags]
  ```
  - range 范围(:10,20),10-20行,% 全部
  - pattern 要替换的模式
  - string 是替换后的文本

替换标志位
: Flags 常用标志
  ```bash
  g(global) # 全局
  c(confirm) # 表示确认，可以确认或拒绝修改
  n(number) # 报告匹配到的次数而不替换，可以用来匹配次数
  ```
  - :1,6 s/self// 查询1-6行有几个 self
  - :% s/\<quack\>/jiao/g 替换所有 quack 为 jiao

# Buffer Windows Tab
文件操作相关
: 1. Buffer 是打开的一个文件的内存缓冲区
  2. 窗口是 Buffer 可视化的分割区域
  3. Tab 可以组织窗口为一个工作区

在 Buffer 之间切换
: 1. 使用 :ls 列举当前缓冲区，后 :b n跳转到第 n 个
  2. :bpre :bnext :bfirst :blast
  3. 或者 :b buffer_name 加上 tab 补全来跳转

Windows 窗口
: 1. <ctrl w>s 水平分割
  2. <ctrl w>v 垂直分割
  3. 或者 :sp :vs

  ![](https://raw.githubusercontent.com/ivitan/Picture/master/window.png)
  ![](https://raw.githubusercontent.com/ivitan/Picture/master/tab.png)

# 宏(macro)
What
: 可以看做一系列命令合集

How
: 1. q 录制、技术录制
  2. q{register} 选择要保存的寄存器，把录制的命令保存其中
  3. @{register} 回放寄存器中的一系列命令
  ```bash
  q I" A"

  VG # 全选
  : I"
  :t # 重复上一命令
  :A"
  ```

# 常见的补全
例如
: |命令|补全类型|
  |:---|:---|
  |ctrl n |普通关键字|
  |ctrl x/n|当前缓冲区关键字|
  |ctrl x/i|包含文件关键字|
  |ctrl x/J|标签文件关键字|
  |ctrl x/k|字典查找|
  |ctrl x/l|整行补全|
  |ctrl x/f|文件名补全|
  |ctrl x/o|全能(Omni)补全|

  ---

最常用
: 1. ctrl n 和 ctrl p 补全单词
  2. ctrl x 和 ctrl f 补全文件名
  3. ctrl x 和 ctrl o 补全代码 

# 更换配色
:colorscheme
: ```bash
  :colorscheme # 显示当前主题配色
  :colorscheme <ctrl+d> # 显示所有配色
  :colorscheme 配色名 # 修改配色
  ```

# 映射
设置
: ```bash
  let mapleader = ","
  inoremap <leader>w <Esc>:w<cr> # 插入模式保存
  ```

---
**视频**
- [玩转Vim 从放弃到爱不释手](https://www.imooc.com/learn/1129)