---
title: Data Transformation
date: 2018-12-11 13:14:47
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
数据处理
<!--more-->
# 数据转换
```python
import pandas
df = pandas.read_excel('house_sample.xlsx')#读取excel文件数据
df.head()
```

## 数据运算
```python
#将总价*10000
df['总价']*10000

import numpy as np
#求总价列数据的平方根
np.sqrt(df['总价'])

#将‘朝向’与‘户型’两列数据拼接在一起
df['朝向']+df['户型']

#求每套房的房价均值（记得要先将总价*10000）
df['总价']*10000/df['建筑面积']
#df.head()
```

## 切分
```python
#以“元”为分界对s进行切分，并获取切分后的第一个字符
s = '1.5元/平米・月'
s.split('元')[0]

#定义removeDollar函数实现对字符e按‘元’进行切分并获取切分后的第一个字符
def removeDollar(e): 
    return e.split('元')[0]
removeDollar(s)#调用以上函数对s进行应用
#将函数removeDollar套用到df的物业费列
df['物 业 费'].map(removeDollar)
```
## 匿名函数
```python
def removeDollar(e):
return e.split('元')[0]

#将上面函数以匿名函数形式套用到df的物业费列
df['物 业 费'].map(lambda e:e.split('元')[0])
```

## 其他
 ```python
def square(e):
    return e * e 
square(2)

square2 = lambda e: e * e
square2(2)  
```
- 行列最值
```python
df = pandas.DataFrame([
                [60,70,50],\
                [80,79,68],\
                [63,66,82]], columns = ['First', 'Second', 'Third'])
df
```
```python
#对df的每一行数据应用匿名函数进行计算，匿名函数实现对每一行数据的最大值与最小值计算
df.apply(lambda e:e.max()-e.min(),axis=1)

#对df的每一列数据应用匿名函数进行计算，匿名函数实现对每一列数据的最大值与最小值计算
df.apply(lambda e:e.max()-e.min())
```
## 例题
导入数据
```python
import pandas
df = pandas.read_excel('house_sample.xlsx')
df.head()
```

实操
 ```python
import numpy as np
def convertNaN(e):
    if e == '暂无资料':
        return np.nan
    else:
        return e
        
#将函数convertNaN应用到df的每个数据元素上
df.applymap(convertNaN)

#以匿名函数形式将函数套用到df的每个数据元素上
df.applymap(lambda e:np.nan if e =='暂无资料' else e)
```

# 时间转换
```python
#导入时间处理库datetime
from datetime import datetime
#获取系统当前时间
current_time = datetime.now()

type(current_time)
```
## 时间<---->String
```python
#将时间转换成字符串
current_time.strftime('%Y/%m%d')

s = '2017/04-22'
#将字符串转换成时间
print(datetime.strptime(s,'%Y/%m-%d'))
```
## 时间回溯
```python
from datetime import timedelta
#newday为当前时间往前回溯10天
newday = current_time - timedelta(10)
print(newday)

current_time - newday
#将current_time往后推迟10天
current_time + timedelta(10)

for i in range(1,10):
    #dt代表往前推移的每一个日期
    dt = current_time - timedelta(i)
    #将dt转换成字符串类似格式为“2017/04/21”，并打印输出
    print(dt.strftime('%Y/%m/%d'))
```
## 时间戳
```python
from time import mktime
#利用mktime将current_time转换成unix时间戳
mktime(current_time.timetuple())

#将上面的unix时间戳转换成datetime，调用datetime的fromtimestamp
print(datetime.fromtimestamp(1544492604.0))
```

## 例题
数据导入
```python
import pandas
df = pandas.read_excel('house_sample.xlsx')
df.head()
df.info()
```

## 时间转换
```python
#将df的'张贴日期'列转换成日期（datetime）形式
df['张贴日期'] =pandas.to_datetime(df['张贴日期'],format='西元%Y年%m月%d日')
```

# 数据重塑
- 数据导入
```python
import pandas as pd
df = pd.read_excel('house_sample.xlsx')
df.head()
```
- 数据操作
one-hot
```python
#将df的"朝向"列数据进行one-hot处理，即转换成虚拟变量
pd.get_dummies(df['朝向'])

#利用pandas的concat函数将“朝向”列数据进行one-hot处理后，与原来的df数据框合并
df = jion(pd.compat([df,pd.get_dummies(['朝向'])],axis=1))
df.head()
```
![](http://ww1.sinaimg.cn/large/d71f8b2fgy1fy2qy19bzvj203k08pa9y.jpg)

- 删除数据
```python
#删除df的'朝向'数据
df = df.drop('朝向',axis=1)
df.head()
```
## 数据透视表
```python
#利用数据透视表绘制以下表格
df2 = df.pivot_table(index='张贴日期',columns='产权性质',values='总价',aggfunc=sum,fill_value=0)
#表中数据为对应交叉对象的总价之和
df2.head()
```
![](http://ww1.sinaimg.cn/large/d71f8b2fgy1fy2r0yfipgj208p077dg7.jpg)

- 转换
```python
#将上面表格的行索引与列索引进行对换
df3 = df.pivot_table(index='产权性质',columns='张贴日期',values='总价',aggfunc=sum,fill_value=0)
df3.head()
```
![](http://ww1.sinaimg.cn/large/d71f8b2fgy1fy2r25wh3fj20hq067wen.jpg)

- #利用转置函数实现上面的行索引与列索引对换
```python
df2.T
```
![](http://ww1.sinaimg.cn/large/d71f8b2fgy1fy2r3aj8ejj20ho065wen.jpg)

- 表
```python
#调整上面的参数，绘制以下表格
df_multi_idx = df.pivot_table(index=['装修','楼层'],columns='张贴日期',values='总价',aggfunc=sum,fill_value=0)
df_multi_idx.head()
```
![](http://ww1.sinaimg.cn/large/d71f8b2fgy1fy2r4alq9qj20fm08lwet.jpg)

- unstack函数
```python
#利用unstack函数转换成宽表格
df_wide = df_multi_idx.unstack()
df_wide.head()
```
![](http://ww1.sinaimg.cn/large/d71f8b2fgy1fy2r5crzljj20hc08mt95.jpg)

- stack函数
```python
#利用stack转换成长表格
df_long = df_wide.stack()
df_long.head()
```
![](http://ww1.sinaimg.cn/large/d71f8b2fgy1fy2r6ol8gaj20fs08f3yv.jpg)

# 综合练习
```python
import pandas
#将抓取返回的数据列组合成数据框df
df = pandas.read_excel('news.xlsx')
#输出打印df的行数与列数
df.shape
df.head(10)
```

## 整理文章关键词
空单元格处理
```python
#判断df中每一列是否有空的单元格
df.isnull().any()

#将具有空单元格的行数据删除
df = df.dropna()
df.shape
```
关键字处理
```python
df['keyword'].head(5)

#对df的keyword列提取关键词并将提取结果覆盖原keyword列 提示：先根据空格切割split再索引
s = '    \n关键字 : \n联合报农发农业部门'
df['keyword'] = df['keyword'].map(lambda e:e.split(':')[1].strip())
df.head(3)
```
![](http://ww1.sinaimg.cn/large/d71f8b2fgy1fy2rgd6jh1j20a303vgmb.jpg)
![](http://ww1.sinaimg.cn/large/d71f8b2fgy1fy2rguhdh6j20ko05mq3z.jpg)

正则表达法抽取时间与源数据
```python
df['source'].head()

#法一 对source列根据空格应用切割函数
df['source'].map(lambda e:e.split()[0])

df.head(3)
#法二 根据正则表达式提取str.extract
df['source'].str.extract('(\d+年\d+月\d+)日')

#根据正则表达式提取后的数据'datetime', 'from'合并入df
df[['datetime','from']] = df['source'].str.extract('(\d+年\d+月\d+日) \d+:\d+\n(\w*)')
    ```

转换时间格式
```python
#将pandas整列数据转换成日期格式
# s = '2018年06月14日'
# import datetime
# s.strptime(s,'%Y年%m月%d日')
df['datetime'] = pandas.to_datetime(df['datetime'],format='%Y年%m月%d日')
df['datetime'].head()
```
刪除Source
```python
#删除source列数据
del df['source']

 df.head(3)
```
----
**数据**
- [链接](https://github.com/ivitan/Note/tree/master/Python/Class/%E6%95%B0%E6%8D%AE%E6%B8%85%E7%90%862)
