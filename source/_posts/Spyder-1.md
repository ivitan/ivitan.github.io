---
title: 数据分析(是否出险)
date: 2019-03-01 11:17:29
tags:
  - Note
  - Python
categories:
  - notes
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Python.png
---
以下是相关分析步骤与过程
1. 将Hw4文件导入
2. 使用auto_ins作如下分析
  - 1、首先对loss重新编码为1/0，有数值为1，命名为loss_flag
  - 2、对loss_flag列进行描述分析（计数计频次）
  - 3、分析是否出险和年龄、驾龄、性别、婚姻状态等变量之间的关系

<!--more-->

# 导入数据
Hw4文件导入
```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
import seaborn as sns
import os

os.chdir('/home/vitan/Python/Python/HW4')
# 将auto_ins.csv读取进来,命名为auto
auto = pd.read_csv('auto_ins.csv',encoding='gbk')
```
# 数据处理
-  定义codeMy(x)函数，其作用是对auto里的loss重新编码为1/0，有数值为1，命名为loss_flag
```python
def codeMy(x):
    if x > 0:
        return 1
    else:
        return 0
     ```
    - 对auto里的loss重新编码为1/0，有数值为1，命名为loss_flag
    ```python
    auto.loss_flag = auto.Loss.map(codeMy)
    ```
    - 应用匿名函数的方法对loss重新编码为1/0，有数值为1，命名为loss_flag1
    ```python
    auto["loss_flag1"]= auto.Loss.map(lambda x:1 if x > 0 else 0)
```

# 画图
分析
- 对loss_flag列进行描述分析（计数计频次）
```python
auto.loss_flag.value_counts()
```
![](http://ww1.sinaimg.cn/large/d71f8b2fgy1g0n5e60z7gj20ao06wwec.jpg)
- 对loss_flag出险情况进行百分比统计
```python
auto.loss_flag.value_counts()/auto.loss_flag.count()
```
![](http://ww1.sinaimg.cn/large/d71f8b2fgy1g0n5ev4yt8j20ao06wwec.jpg)
- 绘制是否出险柱形图
```python
auto.loss_flag.value_counts().plot(kind="bar")
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1g0n5u8ajf7j20aj06vjr7.jpg)
- 分析是否出险和年龄、驾龄、性别、婚姻状态等变量之间的关系
```python
#设置画布fig
fig = plt.figure()
#将画布设计成1行2列结构，增加第一个子图层ax1
ax1 = fig.add_subplot(1,2,1)
#将画布设计成1行2列结构，增加第二个子图层ax2
ax2 = fig.add_subplot(1,2,2)
#是否出险和年龄关系：绘制箱形图（盒须图），分析出险和年龄的关系
sns.boxplot(x="loss_flag",y="Age",data=auto,ax =ax1)

#是否出险和驾龄：绘制箱形图（盒须图），分析出险和驾龄的关系
sns.boxplot(x="loss_flag",y="exp",data=auto,ax =ax2)
```
![](http://ww1.sinaimg.cn/large/d71f8b2fgy1g0n5mv40ebj20aq07faa2.jpg)
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1g0n5nop9tvj20aq07faa2.jpg)

- 是否出险和性别：绘制面积堆积柱形图，分析出险和性别的关系
```python
from stack2dim import *
stack2dim(auto,"Gender","loss_flag")
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1g0n5odvgqgj20ar07at8m.jpg)
    
- 是否出险和婚姻状态：绘制面积堆积柱形图，分析出险和婚姻的关系
```python
stack2dim(auto,"Marital","loss_flag")
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1g0n5ppeo0yj20ar07awee.jpg)
