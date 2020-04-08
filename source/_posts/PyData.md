---
title: 数据处理
date: 2018-12-04 14:12:45
tags:
    - Python
    - WebCrawler
    - Note
categories:
  - Coding
  - Python
author:
  name: Vitan
toc: true
---
数据处理
<!--more-->
# 数据筛选
```python
    import pandas as pd
    df = pd.DataFrame([{'name':'frank', 'gender':'M', 'age':29}, 
                    {'name':'mary',  'gender':'F', 'age':23}, 
                    {'name':'tom',   'gender':'M', 'age':35}, 
                    {'name':'ted',   'gender':'M', 'age':33}, 
                    {'name':'jean',  'gender':'F', 'age':21}, 
                    {'name':'lisa',  'gender':'F', 'age':20}])
```

## 筛选
1. 查看df前5行
```python
df.head(5)
```
2. 利用ix索引查找行号名为1的行记录
```python
df.ix[1]
```
3. 利用ix查找行号名为1-3的行记录
```python
df.ix[1:3]
```
4. 利用列名返回name列数据
```python
df['name']
```
5. 返回name与age列数据
```python
df[['name','age']]
```
6. 返回行名号为1、2的name与age列数据
```python
df.ix[1:2,['name','age']]
```
7. 返回gender列数据
```python
df['gender']
df.gender
```
8. 判断每行的gender列数据是否为M
```python
df.gender=='M'
```
9. 返回男性的行数据
```python
df[df.gender=='M']
```
0. 判断各行记录age列是否大于30
```python
df.age>30
```
11. 返回年龄大于30岁的行数据
```python
df[df.age>30]
```
12. 返回男性且年龄大于30的行数据
 ```python
df.ix[(df.gender=='M') & (df.age>30),]
```
13. 返回男性或年龄大于30的行数据
```python
df.ix[(df.gender=='M') | (df.age>30),]
```
14. df增加employee列，其值均为True
```python
df['employee']=True
```python
14. 利用del删除employee列
```python
del df['employee']
```
15. 再次为df增加employee列
```python
df['employee']=True
df.head()#查看df前5行
```
16. 利用df.drop函数删除employee列，按列删除
```python
df = df.drop('employee',axis=1)
```
17. 利用loc查看行号名为5的行数据
```python
f.loc[5]
```
18. 为df增加行号名为6的行数据，数据为{'age':20, 'gender': 'F', 'name':'qoo'}
```python
df.loc[6]={'age':20, 'gender': 'F', 'name':'qoo'}
```
19. 利用df.drop删除索引号为6的记录
```python
df = df.drop(6)
```
20. 利用df.append增加以上行数据到df中，ignore_index为True
```python
df = df.append(pd.DataFrame([{'age':20, 'gender': 'F', 'name':'qoo'}]), ignore_index=True)
```
21. 利用df.drop删除索引号为6的行数据
```python
df.drop(6)
```
22. 为df增加一列数据userid，值为101-106,提示：利用range函数
```python
df['userid'] = range(101,107)
```
23. 利用set_index设置userid为索引列，代替原来行号名
```python
df = df.set_index('userid')
```

- oc——通过行（行名字）标签索引行数据 iloc——通过行号（行序号，从0开始）索引行数据 ix——通过行标签或者行号索引行数据（基于loc和iloc 的混合）

```python
#分别利用行名与行序号返回第一条行数据
df.loc[101]
df.iloc[0]

#返回df第2，4，6行的数据
df.iloc[[1,3,5]]
df.loc[[102,104,106]]

#利用ix返回行名为101,103,105的记录
df.ix[[101,103,105]]

#利用loc返回行名为[101,103,105]的记录
df.loc[[101,103,105]]
```
# 检测缺失值
```python
import pandas as pd
import numpy  as np
df = pd.DataFrame([\
            ['frank', 'M',    np.nan], \
            ['mary' , np.nan, np.nan], \
            ['tom'  , 'M',    35], \
            ['ted'  , 'M',    33], \
            ['jean' , np.nan, 21], \
            ['lisa' , 'F',    20]])
df.columns = ['name', 'gender', 'age']
```

## 数据操作
- 判断df的gender列每个单元格是否为空

```python
df.gender.isnull()
```

- 判断df的age列是否存在空的单元格（结果只需知道有没有存在）

```python
df.age.isnull().any()
```

- 判断df整个数据框是否存在空的单元格（结果只需知道有没有存在）

```python
df.isnull().values.any()
```

- 求df的age列空的单元格的总数

```python
df.age.isnull().sum()
```

- 求df所有列空单元格的总数

```
df.isnull().sum().sum()
```

# Imputing Missing Value
```python
import pandas as pd
import numpy  as np
df = pd.DataFrame([\
             ['frank', 'M',    np.nan], \
             [np.nan , np.nan, np.nan], \
             ['tom'  , 'M',    35], \
             ['ted'  , 'M',    33], \
             ['jean' , np.nan, 21], \
             ['lisa' , 'F',    20]])
df.columns = ['name', 'gender', 'age']
```

- 删除

```python
#删除df具有Nan值的行
df.dropna()

#删除df所有列均为空值的行记录
df.dropna(how='all')

#删除df空值超过2个的行记录
df.dropna(thresh=2)
#删除df的age列

#删除df中整列值均为nan的列
df.dropna(axis=1,how='all')
```

- 增加

```python
#在df中增加一新列employee，且值为空（np.nan）
 df['employee']=np.nan
```

- 填补

```python
#填补df里任意空单元格的值为0
df.fillna(0)

#将df的age列的均值填入该列值为空的单元格
df['age'].fillna(df['age'].mean())

#将df的age列的空单元格，按性别填入该类性别的平均年龄值
df['age'].fillna(df.groupby('gender')['age'].transform('mean'))

#使用向后填补方面对df的空值单元格进行填补
df.fillna(method='backfill')

#使用向前填补对df的空值单元格进行填补
df.fillna(method='pad')
```

- 数据2

 ```python
df2 = pd.DataFrame([[1, 870],\
            [2, 900],\
            [np.nan, np.nan],\
            [4, 950],\
            [5,1080],\
            [6,1200]])
df2.columns = ['time', 'val']
```
```python
    #使用内插法对df2进行填补
    df2.interpolate()
```

# 实例
- 读取数据

```python
import pandas
df = pandas.read_csv('house_data.csv')

#用del删除列名为'Unnamed: 0'的列
del df['Unnamed: 0']
df.head(3)
```

## 检视
- 检视前几行资料

```python
df.head(5)
```

- 检视后三行资料

```python
df.tail(3)
```

- 检视DataFrame 信息

```python
#查看df所有的信息(列名，各列非空计数，数据类型)
df.info()
```

- 检视字段名称

```python 
#查看df所有列名
df.columns
```

- 检视字段型态

```python
#查看df各列数据类型
df.dtypes
```

## 舍弃第一栏
```python
#将文件读取进来，命名为df，并且在读取文件同时删除第1列
df = pandas.read_csv('house_data.csv',index_col=0)
```

## 将"暂无资料"变成缺失值
```python
#筛选df数据框中“物业费”列的值为“暂无资料”的行记录
df[df['物 业 费']=='暂无资料']
# df.ix[df['物 业 费']=='暂无资料',]

import numpy as np
#将“物业费”列的值为“暂无资料”的单元格设置为空
df.loc[df['物 业 费']=='暂无资料','物 业 费']=np.nan
df.head(3)

import pandas
#读取文件同时，将“暂无资料”的单元格设置为空，且去掉第一列
df = pandas.read_csv('house_data.csv',index_col=0,na_values='暂无资料')
df.head(3)
```
## 取得叙述性统计
```python
#对df各非字符串列进行描述性统计（计数，均值，标准差，最大最小，4分位等）
df.describe()
```

## 侦测缺失值
```python
#对事个数据框df每个单元格进行缺失值判断
df.isnull()
```
## 缺失值
```python
#对数据框各列分别进行判断，返回每列是否有缺失值
df.isnull().any()

#对数据框df按列统计各列各有多少个缺失值
df.isnull().sum()

#统计数据框各列缺失值与各占各列非空单元格的比例
df.count() # 所有非空单元格
df.isnull().sum()/df.count()
```

- 删除有缺失值的字段

```python
 #用drop删除df的“参考月供”列数据
 df = df.drop('参考月供',axis=1)
```
## 筛选字段
```python
    #对数据框df的“产权性质”列所有出现的值进行计数
    df['产权性质'].value_counts()

    #获取产权性质为'个人产权'的行记录
    df[df['产权性质']=='个人产权']

    #查看获取产权性质为'个人产权'的行记录的前3行
    df[df['产权性质'] == '个人产权'].head(3)

    df.iloc[5:7]

    #筛选'建筑面积'大于100且總價大于2000的行记录，查看第1行
    df[(df['建筑面积']>100) & (df['總價']>2000)]

    df.loc[df['建筑面积'] > 100].head(1)

    #筛选产权性质为“个人产权”的行记录
    df['产权性质']
    df.head(3)

```

## 舍弃包含缺失值的字段
```python
#筛选建筑类别为空的行记录，并查看前3行，问，建筑类别列数据是否均为空
df[df['建筑类别'].isnull()]

#利用dropna删除df的列,并将结果重新赋值给df（整列均为空的列）
f.dropna(axis=1,how='all')
```
## 补齐缺失值
```python
    #对物业费为空的单元格，填补为0
    df['物 业 费'] = df['物 业 费'].fillna(0)

    #计算'總價'列为空的单元格个数
    df['總價'].isnull().sum()

    #筛选出‘總價’为空的行记录
    df[df['總價'].isnull()]

    #利用‘總價’列与‘建筑面积’列求均价
    (df['總價'] / df['建筑面积']).mean()    
    df['總價'].isnull().sum()

    #对‘總價’列单元格为空的，按上面求的“均价”与建筑面积相乘进行计算
    df['總價'] = df['總價'].fillna((df['總價'] / df['建筑面积']).mean()* df['建筑面积'])

    #再次计算‘總價’为空的单元格个数
    df['總價'].isnull().sum()
```
# 将资料写入CSV 中
 ```python
df.to_csv('house_final.csv', index_label=False)
```
