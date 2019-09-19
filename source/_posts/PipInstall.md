---
title: 解决Python pip 速度慢
tags:
  - Python
  - Linux
categories:
  - notes
author:
  - Vitan
enable_unread_badge: true
toc: true
thumbnail: /images/Python.png
date: 2019-09-19 22:32:19
---
解决 Python 安装库时速度慢或者超时问题
<!--more-->

# 设置超时时间
```python
pip --default-timeout=1000 install jieba
```

# -i 指定源
```python
pip install wordcloud -i https://pypi.tuna.tsinghua.edu.cn/simple/
```

# 更改默认设置
```python ~/.pip/pip.conf
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host=mirrors.aliyun.com
```