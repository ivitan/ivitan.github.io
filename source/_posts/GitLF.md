---
title: 多设备统一 Git 换行符
tags:
  - Linux
  - Windows
  - Git
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-06-09 08:11:18
---
由于 Linux 系统中使用 0x0A（LF）, windows 系统中使用 0x0D0A（CRLF）作为换行符，导致跨设备时代码无法运行，因此统一换行符就显得很重要。
<!--more-->

# 配置 Git

```
# 统一换行符为 LF
git config --global core.eol LF
# 将自动转换关闭,避免转换失败不能不同进行提交
git config --global core.autoCRLF false
# 禁止混用 LF 和 CRLF 两种换行符
git config --global core.safeCRLF true
```

## 参数

- `eol` 设置工作目录中文件的换行符，有三个值 lf, crlf 和 native（默认，同操作系统）
- autocrlf:
  - true 检出是转换 CRLF, 提交时转换为 LF
  - input 检出是不转换，提交时转换为 LF
  - false 不做转换

- `safecrlf`
  - true 表示不允许提交时包含不同换行符
  - warn 则只在有不同换行符时警告
  - false 则允许提价时有不同换行符存在

# .gitattributes

也可以在项目中添加 .gitattributes

```git  .gitattributes
* text eol=lf
* text=auto
*.txt		text
*.jpg		-text
*.vcproj	text eol=crlf
*.sh		text eol=lf
*.py		eol=lf
```

- [了解更多](https://www.bookstack.cn/read/git-doc-zh/docs-39.md)