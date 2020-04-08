---
title: 如何高效寻找开源项目
tags:
  - Github
  - Git
categories: 
  - Coding
author:
  - Vitan
toc: true
date: 2019-11-14 18:23:35
---
Github 中高效寻找搜索开源项目

# in:name
搜索时使用 `in:name` 可以搜索名字包含的内容
```
in:name vue
```

 ## 搜索过滤
 - Stars 数

```bash
 #匹配start书大于1000
 in:name vue stasr>1000
```
<!--more-->
- Forks 数

```bash
 #匹配Forkt书大于1000
 in:name vue forks>1000
```

## 条件并行使用
```bash
 #匹配Forkt书大于1000
 in:name vue stars>1000 forks>1000
```

# in:description
在描述中搜索
```bzsh
in:description 前端
```

## language
```bash
in:description 前端 language:vue
```

## pushed
更新时间
```bash
in:description 前端 language:vue pushed >2019-10-01
```

## 条件并行使用
```bash
in:description 爬虫  language:python star>1000  pushed >2019-10-01
```

# in:readme
在 READMME 中搜索
```bash
in:readme security stars>1000
```