---
title: Python Kmeans
date: 2018-11-05 13:41:18
tags:
  - Note
  - Python
  - WebCrawler
categories:
  - Coding
  - Python
author:
  name: Vitan
toc: true
---
Python Kmeans
<!--more-->
# KMeans

- K - means是一个反复迭代的过程，算法分为四个步骤：

```Python
    #!/usr/bin/env python
    # -*- coding: utf-8 -*-
    # @Time    : 18-11-5 下午12:10
    # @Author  : Vitan
    # @File    : Kmeans.py

    from sklearn.datasets import load_iris
    import numpy as np
    import matplotlib.pyplot as plt
    from sklearn.cluster import KMeans
    x = np.random.randint(1,50,[20,1])

    # 定义一个给定形状和类型的用0填充的数组y
    y = np.zeros(20)
    k = 3 # 分成3类

    # 1. 选取数据空间中的K个对象作为初始中心，每个对象代表一个聚类中心；
    def initcenter(x,k):
        return x[:k]

    # 2. 对于样本中的数据对象，根据它们与这些聚类中心的欧氏距离，
    # 按距离最近的准则将它们分到距离它们最近的聚类中心（最相似）所对应的类；

    # 计算欧氏距离
    def nearest(kc,i):
        d = abs(kc -i) # asb() 取绝对值
        # 返回与聚类中心最小距离所在类别的索引号
        w = np.where(d == np.min(d))
        return w[0][0]

    # 按距离最近的准则将它们分到距离它们最近的聚类中心（最相似）所对应的类
    def xclassify(x, y, kc):
        # 对数组的每个值进行分类，shape[0]读取矩阵第一维度的长度
        for i in range(x.shape[0]):
            y[i] = nearest(kc, x[i])
            return y
    kc = initcenter(x,k)
    y = xclassify(x,y,kc)
    print(kc,y)

    # 3. 更新聚类中心：将每个类别中所有对象所对应的均值作为该类别的聚类中心，计算目标函数的值；
    def kcmean(x,y,kc,k):
        l = list(kc)
        flag = False
        for c in range(k):
            m = np.where(y ==0)
            n = np.mean(x[m])
            if l[c] != n:
                l[c] = n
                flag = True
                print(l,flag)
        return (np.array(l),flag)

    # 4 . 判断聚类中心和目标函数的值是否发生改变，若不变，则输出结果，若改变，则返回2）
    kc = initcenter(x,k)
    flag = True # 聚类中心发生改变
    print(x,y,kc,flag)
    while flag:
        y = xclassify(x,y,kc)
        kc,flag = kcmean(x,y,kc,k)
    print(y,kc)
```

# 鸢尾花

- 鸢尾花花瓣长度数据做聚类并用散点图显示

```python
    iris = load_iris()
    data = iris.data
    iris_length = data[:,2]

    x = np.array(iris_length)
    y = np.zeros(x.shape[0]) # x.shape[0] 只读取x的第一维度长度

    # 选取数据空间中的K个对象作为初始中心，每个对象代表一个聚类中心；
    kc = initcenter(x,3)

    # 按距离最近的准则将它们分到距离它们最近的聚类中心（最相似）所对应的类
    flag = True
    while flag:
        y = xclassify(x,y,kc)
        kc,flag = kcmean(x,y,kc,3)
    print(kc,flag)

    plt.scatter(iris_length, iris_length, c = y,cmap = 'rainbow')
    plt.savefig('花瓣长度散点图.png')
    plt.show()
```

- 用sklearn.cluster.KMeans，花瓣长度数据做聚类

```python
    iris_length = data[:, 2:3]
    kmeans = KMeans(n_clusters = 4 )
    result = kmeans.fit(iris_length)
    kc1 = result.cluster_centers_
    y_kmeans = kmeans.predict(iris_length) # 预测每个样本的聚类索引

    plt.scatter(iris_length,np.linspace(1,150,150),c = y_kmeans,marker = 'D',cmap = 'rainbow')
    plt.savefig('sklearn.cluster.KMeans长度.png')
    plt.show()
```

- 鸢尾花完整数据做聚类

```python
    k_means1 = KMeans(n_clusters = 4)
    result1 = k_means1.fit(data)
    kc2 = result1.cluster_centers_
    y_kmeans1 = k_means1.predict(data)

    plt.scatter(data[:, 0], data[:, 1], c = y_kmeans1, marker = 'p',cmap = 'rainbow')
    plt.savefig('完整数据聚类.png')
    plt.show()
```