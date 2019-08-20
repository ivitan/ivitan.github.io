---
title: 房天下二手房
date: 2018-10-11 09:25:45
tags:
    - Python
    - WebCrawler
    - Note
categories:
  - projects
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Python.png
---
房天下爬虫
<!--more-->
### 获取网页源码
```Python
import requests
#获取上海在售二手房源网页首页（http://esf.sh.fang.com/）的响应包，命名为res
res.text
res = requests.get('http://esf.sh.fang.com/')
#输出res的文本内容
print(res.text)
```
### 获取每套房源的详细内容页
```Python
from bs4 import BeautifulSoup
#将上海在售二手房源网页首页url（http://esf.sh.fang.com/）赋值给domain
domain = 'http://esf.sh.fang.com'
# 创建BeautifulSoup对象对res响应包进行解析，结果命名为soup
soup = BeautifulSoup(res.text,'html.parser')
# 循环遍历获取网页首页所有房源详细内容页的url,循环变量名为house（提示：检查定位路径定位查找的节点是否为空）
for house in soup.select('.shop_list dl dd h4 a'):
    #（提示：如果存在返回的标签节点有空的情况，需要进行判断！）
    if house:
        # 利用domain与存储房屋详细内容的相对url的标签节点构建房屋的 url
        print(domain+house['href'])
        # 打印输出查看url
        print('========================'
```
### 将上面获取到的其中一房源的详细内容页的 url 进行请求并解析提取相关数据
```Python
import requests
from bs4 import BeautifulSoup
# 将以上获得的第一个房源的详细内容页进行请求访问
res =requests.get('http://esf.sh.fang.com/chushou/3_331876564.htm')
# 对响应包res的网页文本进行解析，解析结果命名为soup
soup = BeautifulSoup(res.text,'html.parser')
res.text
```
### 获取详情
```Python
#定义字典变量info，用于存放每套房子相关数据
info ={}
# 查找房子标题，以“标题”为key名存入info
info['标题']=soup.select('.title h1')[0].text.strip()
info

#查找总价，以“总价”为key名存入info
info['总价']=soup.select('.price_esf')[0].text
info

k = ['总价','单价','建筑面积','朝向','楼层','装修','户型','标题']
#item表示包括户型，朝向，单价，楼层，装修等相关数据的标签
for item in soup.select('.trl-item1'):
     # key 计划用于表示房屋的字段
     key=item.select('.font14')[0].text.strip()
     # value 计划用于表示房屋相关字段对应数
     value=item.select('.tt')[0].text.strip()
     info[key]=value
print(info)
print(list(info.values()))
print(k)
print(dict(zip(k,list(info.values()))))
```
### 定义一个获取网页详细内容页的函数 getHouseDetail
```Python
def getHouseDetail(url):
    info={}
    info_adj={}
    # 根据url请求网页内容
    res=requests.get(url)
    #解析详细内容页，结果命名为soup
    soup = BeautifulSoup(res.text,'html.parser')
    # 获取房屋名并加入info字典，key值命名为“标题
    info['标题']=soup.select('.title h1')[0].text.strip()
    # 获取房屋总价并加入info字典，key值命名为“总价
    info['总价']=soup.select('.price_esf')[0].text

    # 用item做为循环变量名，代表当前网页class为trl-item1的所有标签节点
    for item in soup.select('.trl-item1'):
        # key表示item标签下所有class为font14的标签节点文本内容
        key=item.select('.font14')[0].text.strip()
        print(key)
        # value 示item标签下所有class为tt的标签节点文本内容
        value=item.select('.tt')[0].text.strip()
        #将info里面所有key赋值给value
        info[key]=value
        k=['总价','单价','建筑面积','朝向','楼层','装修','户型','标题']
    info_adj=dict(zip(k,list(info.values())))
    #print(info_adj)
    return info_adj
```
### 通过获取所有房屋的详细内容页 url，获取每一房屋的相关字段信息
```Python
getHouseDetail('http://esf.sh.fang.com/chushou/3_328597533.htm')

import requests
from bs4 import BeautifulSoup
# 定义列表用于存储所有房屋的相关数据
houseary=[]
# domain 为http://esf.sh.fang.com域名
domain='http://esf.sh.fang.com'
# 请求访问http://esf.sh.fang.com首页，获得响应包res
res=requests.get('http://esf.sh.fang.com')
#创建BeatifulSoup对象并进行解析
soup=BeautifulSoup(res.text,'html.parser')

# 循环遍历获取网页首页中存有的标签节点，循环变量命名为link
for link in soup.select('.shop_list dl dd h4 a'):
    # 利用domain与存储房屋详细内容的相对url的标签节点构建房屋的url
    url=domain+link['href']
    # 调用getHouseDetail函数获取每一房屋相关数据并追加到houseary
    houseary.append(getHouseDetail(url))

#求总共获取到多少套房屋信息
len(houseary)
```
### 数据处理
```Python
import pandas
#将获取到的所有房屋信息转换成数据框的结构
df = pandas.DataFrame(houseary)
df

#存储到当前工作空间目录下，文件命名为house.xlsx
df.to_excel('house.xlsx')
```
