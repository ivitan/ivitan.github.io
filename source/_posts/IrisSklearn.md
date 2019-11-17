---
title: 鸢尾花 Sklearn
date: 2018-10-29 23:02:34
tags:
  - WebCrawler
  - Python
  - Note
categories:
  - Coding
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Python.png
---
Sklearn 鸢尾花
<!--more-->
# 鸢尾花
从sklearn 包自带的数据集中读出鸢尾花数据集 data
```Python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 18-10-29 上午11:58
# @Author  : Vitan
# @File    : Sklearn_iris.py
from sklearn.datasets import load_iris
import numpy as np
import matplotlib.pyplot as plt
data = load_iris()
print(data)
```

## 查看data类型，包含哪些数据
```Python
print(type(data))
print(data.keys())
```

## 取出鸢尾花特征和鸢尾花类别数据，查看其形状及数据类型
```Python
iris_feature = data.feature_names,data.data
iris_target = data.target_names,data.target
print('鸢尾花特征数据：',iris_feature)
print('鸢尾花类别：',iris_target)
sepal_len = np.array(list(len[0] for len in data.data))
print('花萼长度：',sepal_len)
```

## 取出所有花的花萼长度(cm)的数据
```Python
sepal_len = np.array(list(len[0] for len in data.data))
print('所有花萼长宽：',sepal_len)
```
## 取出所有花的花瓣长度(cm)+花瓣宽度(cm)的数据
```Python
for item in data:
  # 花瓣长度
    petal_len = np.array(list(len[2] for len in data.data))
    # 花萼宽度
    petal_wid = np.array(list(len[3] for len in data.data))
iris_len = (petal_len,petal_wid)
print(iris_len)
```

## 取出某朵花的四个特征及其类别。
```Python
print('四个特征',data.data[1],data.target[1])
```

## 将所有花的特征和类别分成三组，每组50个
```Python
    iris_set = []
    iris_ver = []
    iris_vir = []

    # 循环遍历所有的数据
    for i in range(0, 150):
        # 类别为0的为 setosa 花，生成一条setosa类的鸢尾花数据
        if data.target[i] == 0:
            Data = data.data[i].tolist()
            Data.append('setosa')
            iris_set.append(Data)

        # 类别为1的即为 versicolor，生成一条versicolor类的鸢尾花数据
        elif data.target[i] == 1:
            Data = data.data[i].tolist()
            Data.append('versicolor')
            iris_ver.append(Data)
        # 3 为维吉尼亚鸢尾花
        else:
            Data = data.data[i].tolist()
            Data.append('virginica')
            iris_vir.append(Data)
    print(iris_set,iris_ver,iris_vir)
```

## 生成新的数组，每个元素包含四个特征+类别
```Python
iris_result = np.array([iris_set, iris_ver, iris_vir])
print("分组:", iris_result)
```

## 计算鸢尾花花瓣长度的最大值，平均值，中值，均方差。
```Python
#鸢尾花花瓣长度的数据
petal_length = np.array(list(len[3] for len in data.data))
print(petal_length) # 输出数据
print('花瓣长度的最大值',np.max(petal_length))
print('平均值：',np.mean(petal_length))
print('中值：',np.median(petal_length))
print('均方差：',np.std(petal_length))
```

## 显示鸢尾花某一特征的曲线图，散点图。
- 曲线图

```Python
iris_feature = data.feature_names,data.data

x = np.linspace(0,150,num = 150)
plt.plot(x,iris_feature)
plt.savefig("特征曲线图.png")
plt.show()
```

- 散点图

```Python
plt.scatter(x,iris_feature)
plt.savefig("特征散点图.png")
plt.show()
```

## np.random
- 用 np.random.normal() 产生一个正态分布的随机数组，并显示出来。

```Python
mu = 50
sigma = 0.6
num = 3000
zu = np.random.normal(mu,sigma,num)
count,bins,ignored = plt.hist(zu,30,normed = True)
plt.plot(bins,1/(sigma*np.sqrt(2*np.pi))*np.exp( - (bins-mu)**2/(2*sigma*2)),linewidth=2,color='g')
plt.savefig("np.random.normal().png")
plt.show()
```

- np.random.randn()产生一个正态分布的随机数组，并显示出来。

```Python
'''
np.random.rand(n) 产生标准正态分布， 即均值为0 标准差为1 的高斯分布
同于 np.random.normal(0, 1, n)
'''
mu = 100
sigma = 15
num_bins = 50 # 分隔的段数

# 产生500个均值为100， 方差为15 的随机数,等于 x = np.random.normal(100, 15, 500)
x = mu + sigma * np.random.randn(500)
fig, ax = plt.subplots()
n, bins, patches = ax.hist(x, num_bins, normed=True)# x为数据，ax.hist()即是画柱状图的函数
plt.plot(bins,1/(sigma*np.sqrt(2*np.pi))*np.exp( - (bins-mu)**2/(2*sigma*2)),linewidth=2,color='r')
plt.savefig("np.random.randn().png")
plt.show()
```


## 显示鸢尾花花瓣长度的正态分布图，曲线图，散点图
- 正态分布图

```Python
mu = np.mean(petal_length) # 期望值
sigma = np.std(petal_length) # 标准差
num = 500 # 个数

normal_data = np.random.normal(mu,sigma,num)
count,bins,ignored = plt.hist(normal_data,20,normed=True)
plt.plot(bins,1/(sigma*np.sqrt(2*np.pi))*np.exp( - (bins-mu)**2/(2*sigma*2)),linewidth=2,color='b')
plt.savefig("花瓣长度正态分布图.png")  # 保存图片文件
plt.show()
```

- 曲线图

```Python
x = np.linspace(0,150,num=150)
plt.plot(x,petal_len)
plt.savefig("花瓣长度曲线图.png")
plt.show()
```

- 散点图

```Python
plt.scatter(x,petal_len,)
plt.savefig("花瓣长度散点图.png")
plt.show()
```