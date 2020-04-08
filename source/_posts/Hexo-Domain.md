---
title: Hexo 域名
tags:
  - Linux
  - Win
  - Hexo
categories:
  - Diary
author:
  - Vitan
toc: true
date: 2018-07-08 22:04:52
---
Hexo 独立域名
<!-- more -->

# 购买域名
比较服务商可以到 [Nazhumi](https://www.nazhumi.com/) 查看比较。

# 解析域名

- 添加 A 记录

```bash
A @ 185.199.108.153
A @ 185.199.109.153
A @ 185.199.110.153
A @ 185.199.111.153
```

- 添加 CNAME 记录

```bash
CNAME www ivitan.github.io
```

# 本地配置
新建 CNAME 文件
```bash
cd blog
echo "vitan.me" > CNAME
``` 

# Github 配置
仓库设置
![](https://raw.githubusercontent.com/ivitan/Picture/master/images/20190808222520.png)

---
**参考**
- [Hexo](https://hexo.io/zh-cn/docs/deployment#Netlify)
