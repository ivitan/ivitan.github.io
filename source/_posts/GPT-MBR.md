---
title: 安装 Windows 时 GPT 与 MBR 互换
tags:
  - Windows
categories:
  - Diary
author:
  - Vitan
toc: true
date: 2021-07-04 00:32:38
---
安装 Windows 时 GPT 与 MBR 互换
<!--more-->

装机启动时在选择磁盘时 Shirt + F10 进入CMD

```
diskpart
list disk 
select disk n # n 为想要转换的序号
clean # 清除数据
convert mbr # GPT -> MBR

convert gpt # MBR -> GPT
```