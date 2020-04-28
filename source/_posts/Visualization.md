---
title: Visualization
date: 2018-12-18 14:55:28
tags:
- Python
- WebCrawler
categories:
- Coding
author:
  name: Vitan
toc: true
---
Python 数据可视化
<!--more-->
# 读取
```python
import pandas as pd
#将purchase_order.tab文件里面的相关字段名赋值给m_cols
m_cols = ['Time','Action','User','Product', 'Quantity','Price']
#读取purchase_order.tab文件，文件间隔符为\t，读取进来后Dates为第一列数据，文件列名为以上m_cols编码为utf-8,
orders = pd.read_csv('purchase_order.tab',sep = '\t',parse_dates = {'Dates':[0]},names = m_cols)
#查看orders整个数据框的相关信息
orders.head()
```

查看记录
```python
#查看orders的Product列前5行数据
orders['Product'].head()

#查看Product为P0006944501的Price列数据，并获取其描述性统计信息
orders.ix[orders['Product'] =='P0006944501','Product']


#查看Product为P0006944501的Price列数据，求其均值
orders[orders['Product']=='P0006944501']['Price'].describe()
orders[orders['Product']=='P0006944501']['Price'].mea()

#计算orders里面有哪些Product
orders['Product'].unique()


#求orders里面不同类别的Product共有多少个
len(orders['Product'].unique())


# select Product, avg(Price) from orders 
# group by Product limit 5

#按Product统计其各自的销售价格均值
orders.groupby('Product')['Price'].mean()


# select Product, avg(Price) from orders 
# group by Product order by avg(Price) desc limit 5

#按Product统计其各自的销售价格均值并将求得的数据进行降序排序
orders.groupby('Product')['Price'].mean().sort_values(ascending=False)
```

增加
```python
#为orders增加新列Total_Price，并利用orders里面的相关数据计算求得
orders['Total_Price'] = orders['Quantity'] * orders['Price']
```

排序
```python
#select User, sum(Total_Price) from orders
#gorup by User order by sum(Total_Price) desc limit 5

#按客户统计他们的消费总金额，并按降序排列
orders.groupby('User')['Total_Price'].sum().sort_values(ascending = False)
```

# 再次读取
```python
import pandas as pd
m_cols = ['Time','Action','User','Product']
#读取purchase_view.tab文件，文件间隔符为\t，要求读取进来后Dates为第一列数据，文件列名为以上m_cols编码为utf-8,
views =pd.read_csv('purchase_view.tab',sep='\t',parse_dates={'Dates':[0]},names =m_cols,encoding='UTF-8')
#查看views整个数据框的相关信息
views.info()
#查看前5行数据
views.head()
```

分组、排序
```python
## SELECT User, Product, COUNT(Product) FROM Orders GROUP BY User, Product
#在购买数据表中按不同用户不同产品进行分组，并统计每个用户产品的购买数量，将统计结果以“buys”作为字段名添加进统计结果中
orders_cnt= orders.groupby(['User','Product'])['Action'].count().reset_index(name='buys')
orders_cnt.head()

## SELECT User, Product, COUNT(Product) FROM views GROUP BY User, Product
#在浏览记录表数据表中按不同用户不同产品进行分组，并统计每个用户产品的浏览量，并对统计结果按浏览量降序排列，最后将统计结果以“views”作为字段名添加进统计结果中,
views_cnt =views.groupby(['User','Product'])['Action'].count().sort_values(ascending=False).reset_index(name = 'views')
```

合并
```python
#将用户购买与浏览产品的数据合并在一起，生成表格merge_df,以views_cnt作为右连接表，连接结果为右连接
merge_df = pd.merge(orders_cnt,views_cnt,on=['User','Product'],how='right')
```
  - [数据表的连接问题](http://www.cnblogs.com/zxlovenet/p/4005256.html)
  - [merge与concat的区别](https://blog.csdn.net/ZK_J1994/article/details/77717700)

不同日期與時間
```python
views.head()#查看views
views.info()#查看views的相关信息

# year, month, day, date, hour 
#查看views的Dates列数据的年、月、日期等信息
views['Dates'].dt.hour


# select date, count(action) from views
# group by date
#在views表中，统计每一天网站的用户浏览总次数
views_cnt_by_date  = views.groupby(views['Dates'].dt.date)['Action'].count()
views_cnt_by_date.head()#查看以上统计结果
```

# 绘制图表
```python
%pylab inline

#对每天用户浏览网站情况绘制折线图，图大小为10*5
 views_cnt_by_date.plot(kind='line',figsize=[10,5])
```
```python
# select hour(Dates), count(action) from views
# group by  hour(Dates)
#在views表中，统计一天24内每个小时网站的用户浏览总次数
views_cnt_by_hour  = views.groupby(views['Dates'].dt.hour)['Action'].count()

%pylab inline
#各个小时用户浏览网站情况绘制折线图，图大小为10*5，标题为view count by hour
views_cnt_by_hour.plot(kind='line',figsize=[10,5],title='view count by hour')
```
```python
#增加新列Total_price,并利用orders相关数据计算
orders['Total_price'] = orders['Quantity'] * orders['Price']
#按客户统计他们的消费总金额，并按降序排列,最终取前10个用户的统计数据
g = orders.groupby('User')['Total_price'].sum().sort_values(ascending=False)[0:10]
#绘制前10个用户的消费金额柱形图，图片大小10*5
g.plot(kind='bar',figsize=[10,5],color='y')
```

统计
```python
#在views表中统计网站每天的浏览总数
view_daily_cnt = views.groupby(views['Dates'].dt.date)['Action'].count()
view_daily_cnt.head()

#在orders表中统计网站每天用户的购买总次数
orders_daily_cnt = orders.groupby(orders['Dates'].dt.date)['Action'].count()
orders_daily_cnt.head()
```

合并
```python
#将view_daily_cnt与orders_daily_cnt表按列方向拼接,不需要按主键合并
df =pd.concat([view_daily_cnt,orders_daily_cnt],axis=1)
    ##关于merge与concat的区别：https://blog.csdn.net/ZK_J1994/article/details/77717700
df=df.dropna()#删除具有空值的行,并将删除结果覆盖原数据框
df.head()
df.columns=['Views','Orders']#将df的字段名命名为'Views', 'Orders'
    df.head()
```
```python
#对df数据绘制折线图，图的大小为10*5，设置X轴刻度的显示旋转度为30
df.plot(kind='line',figsize=[10,5],rot=30)
```
- [plot里面各参数的使用说明](https://www.cnblogs.com/xitingxie/p/8359392.html)
