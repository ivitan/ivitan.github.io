---
title: Pandas
date: 2018-11-19 14:06:20
tags:
  - Note
  - Python
  - WebCrawler
categories:
  - notes
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Python.png
---
Python  Data.Frame
<!--more-->
# panadas
## 导入数据
```python
import pandas as pd
data = pandas.read_excel('file.xlsx')
data = pandas.read_csv('file.csv')
```

- 查看前10行
```python
print(data.head[10])
```

- 数据集中有多少个列(columns)
```python
print(data.shape[1])
```

- 打印出全部的列名称
```python
print(data.columns)
```

- 数据集的索引
```python
print(data.index)
```
- panadas.DataFrame 构造函数
```python
pandas.DataFrame( data, index, columns, dtype, copy)
```

|参数	|描述|
|:---|:---|
|data	|数据采取各种形式，如ndarray：series，map，lists，dict， ，constant和另一个DataFrame|
|index|	对于行标签，要用于结果帧的索引是可选缺省值np.arrange(n)，如果没有传递索引值|
|columns|	对于列标签，可选的默认语法是 - np.arange(n)。这只有在没有索引传递的情况下才是这样|
|dtype	|每列的数据类型|
|copy	|如果默认值为False，则此命令（或任何它）用于复制数据|

# 创建数据帧
## 列表创建数据框
- 空数据帧 
```python
 # 空数据帧 
import pandas as pd
df = pd.DataFrame()
print(df)
```

- 有数据   
```python
import pandas as pd
data = [1,2,3,4,5]
df = pd.DataFrame(data)
print(df)
```

- 有表头
```python
import pandas as pd
data = [['Alex',10],['Bob',12],['Clarke',13]]
df = pd.DataFrame(data,columns=['Name','Age'])
print(df)
```
  - df = pd.DataFrame(data,columns=['Name','Age'],dtype=float)(设置数据类型)

## 从ndarrays /列表的字典来创建数据帧
```python
import pandas as pd
data = {'Name':['Tom', 'Jack', 'Steve', 'Ricky'],'Age':[28,34,29,42]}
df = pd.DataFrame(data)
print(df)
```
  - 所有的ndarrays必须具有相同的长度。如果传递了索引（index），则索引的长度应等于数组的长度。如果没有传递索引，则默认情况下，索引将为range(n)，其中n为数组长度。

## 数组创建一个索引的数据帧（DataFrame）
```python
import pandas as pd
data = {'Name':['Tom', 'Jack', 'Steve', 'Ricky'],'Age':[28,34,29,42]}
df = pd.DataFrame(data, index=['rank1','rank2','rank3','rank4'])
print(df)
```

## 字典列表来创建数据帧
```python
import pandas as pd
data = [{'a': 1, 'b': 2},{'a': 5, 'b': 10, 'c': 20}]
df = pd.DataFrame(data)
print(df)
```
- 字典，行索引和列索引列表创建数据帧
```python
import pandas as pd
data = [{'a': 1, 'b': 2},{'a': 5, 'b': 10, 'c': 20}]

#With two column indices, values same as dictionary keys
df1 = pd.DataFrame(data, index=['first', 'second'], columns=['a', 'b'])

#With two column indices with one index with other name
df2 = pd.DataFrame(data, index=['first', 'second'], columns=['a', 'b1'])
```

# 从系列的字典来创建
```python
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']),
        'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}

df = pd.DataFrame(d)
```
- 字典的系列可以传递以形成一个DataFrame。 所得到的索引是通过的所有系列索引的并集。

# 列操作
## 列选择
```python
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']),
        'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}

df = pd.DataFrame(d)
print(df ['one'])
```

## 列添加
```python
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']),
        'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}

df = pd.DataFrame(d)

# Adding a new column to an existing DataFrame object with column label by passing new series

print ("Adding a new column by passing as Series:")
df['three']=pd.Series([10,20,30],index=['a','b','c'])
print(df)

print ("Adding a new column using the existing columns in DataFrame:")
df['four']=df['one']+df['three']

print(df)
```

## 列删除
```python
# Using the previous DataFrame, we will delete a column
# using del function
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']), 
  'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd']), 
  'three' : pd.Series([10,20,30], index=['a','b','c'])}

df = pd.DataFrame(d)
print ("Our dataframe is:")
print(df)

# using del function
print ("Deleting the first column using DEL function:")
del df['one']
print(df)

# using pop function
print ("Deleting another column using POP function:")
df.pop('two')
print(df)
```

# 行操作
## 行选择
```python
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']), 
    'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}

df = pd.DataFrame(d)
print(df.loc['b'])
```
## 按整数位置选择
```python
import pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']),
    'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}

df = pd.DataFrame(d)
print(df.iloc[2])
```

## 行切片
```python
mport pandas as pd

d = {'one' : pd.Series([1, 2, 3], index=['a', 'b', 'c']), 
    'two' : pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])}

df = pd.DataFrame(d)
print(df[2:4])
```

## 附加行
```python
import pandas as pd

df = pd.DataFrame([[1, 2], [3, 4]], columns = ['a','b'])
df2 = pd.DataFrame([[5, 6], [7, 8]], columns = ['a','b'])

df = df.append(df2)
```

## 删除行
 ```python
import pandas as pd

df = pd.DataFrame([[1, 2], [3, 4]], columns = ['a','b'])
df2 = pd.DataFrame([[5, 6], [7, 8]], columns = ['a','b'])

df = df.append(df2)

# Drop rows with label 0
df = df.drop(0)
```

---
**Via**
- [Pandas数据帧（DataFrame）](https://www.yiibai.com/pandas/python_pandas_dataframe.html)
