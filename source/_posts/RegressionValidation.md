---
title: Regression Validation
date: 2019-01-04 16:02:16
tags:
  - WebCrawler
  - Python
  - Note
categories:
  - Coding
author:
  name: Vitan
toc: true
---
回归分析
<!--more-->
# 导入数据
```python
import pandas 
df = pandas.read_csv('house-prices.csv')
df.head()
```

# one-hot 处理
```python
#对Brick与Neighborhood两列数据进行one-hot处理
house =  pandas.concat([df,pandas.get_dummies(df['Brick']),pandas.get_dummies(df['Neighborhood'])] ,axis=1)
#删除No列
del house['No']
#删除West列
del house['West']
#删除Brick列
del house['Brick']
#删除Neighborhood列
del house['Neighborhood']
#删除Home列
del house['Home']
house.head()
```
# statsmodels.api
```python
#X为house的'SqFt', 'Bedrooms', 'Bathrooms', 'Offers', 'Yes', 'East', 'North'列
X = house[['SqFt', 'Bedrooms', 'Bathrooms', 'Offers', 'Yes', 'East', 'North']]
#Y为house的Price列的values
Y = house['Price']
```

```python
import numpy.core.multiarray
from pandas.core import datetools
#导入statsmodels.api里面的sm，用于评估模型
import statsmodels.api as sm
#利用sm.add_constant为X增加一列名为const,值为1的数据
X2 = sm.add_constant(X)
#调用sm的OLS函数对Y,X2进行模型创建
est = sm.OLS(Y,X2)
#调用est的fit函数创建回归结果
est2 = est.fit()
#输出打印est2的概要信息
print(est2.summary())
est2.aic
```

## 最优组合
```python
predictorcols = ['SqFt', 'Bedrooms', 'Bathrooms', 'Offers', 'Yes', 'East', 'North']
import itertools
for i in range(1,len(predictorcols)+1):
    for variables in itertools.combinations(predictorcols,i):
        print(variables)
```
```python
import itertools#导入itertools库
#创建字典AICs ，用于保存每个列名组合的aic结果
AICs = {}
#for循环，循环变量i从1到predictorcols列表的长度加1
for i in range(1,len(predictorcols)+1):
    #再次for循环，循环变量var的范围为predictorcols的各种i个元素组合集合itertools.combinations(predictorcols,i)
    for var in itertools.combinations(predictorcols,i):   
        #predictors为数据框X里的var列的数据，记得要先将var转换成list
        predictors  = X[list(var)]
        #利用sm.add_constant为predictors增加一列名为const,值为1的数据
        predictors2 =  sm.add_constant(predictors)
        #调用sm的OLS函数对y,predictors2进行模型创建
        est = sm.OLS(Y,predictors2)
        #调用est的fit函数创建回归结果
        res = est.fit()
        print(res.aic) # 每种组合的aic值
    #将res.aic的结果赋值给 AICs的每一个var   
        AICs[var] =  res.aic
```
```python
#导入collections的Counter
from collections import Counter
#调用Counter，对AICs进行降序排序
c = Counter(AICs)
#调用排序后的c倒数10个数据对象
c.most_common()[::-10]
```