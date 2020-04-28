---
title: Python IO 与档案处理
date: 2018-09-24 11:56:03
tags:
- Python
- WebCrawler
categories:
- Coding
- Python
author:
  name: Vitan
toc: true
---
Python IO 与档案处理
<!--more-->
# 创建文档、打印文档
## 创建文档

- 用 open 函数创建文档

```python
f = open('tmp.txt','w')
#用open函数创建文档f，f为创建一个tmp.txt文本文件，当前f操作模式为w(r表示读取，a表示增加)
f.write('Hello World') #f向tmp.txt文件写入"hello world"
f.close()#关闭f对象
```

- 利用with函数使得不需要调用close关闭

```python
with open('tmp.txt','w') as f:
#利用with导入open函数，创建tmp.txt文本文件，并命名为f文档，文件当前操作模式为w
```

# 打印输出文当里面的数据

- 创建

```python
with open('tmp.txt','r') as f:
#利用with导入open函数，创建tmp.txt文本文件，并命名为f文档，文档当前操作模式为r
     print(f.read())
    #f进行读取操作，获得tmp.txt文件里的数据，并将所有数据一次性当前输出打印出来
```

- 打印

```python
with open('tmp.txt', 'r') as f:
  for line in f.readlines():
      #利用for循环与f的readlines()遍历文档里面每一行数据
      print(line.strip())
      #打印每一行数据，并利用strip()将换行符或空格删除掉
```

# 处理CSV, Excel (panadas)
```python
 with open('Population.csv','r',encoding='UTF-8') as f:
 #用with导入open函数，将Population.csv的文件读取进来，encoding为UTF-8,读取进来的文档命名为f
    for line in f.readlines():
    #利用for循环与f的readlines()遍历文档里面每一行数据
       print(line)
    #打印输出显示每行数据
```

- csv 文件

```python
 import pandas#导入pandas类库
df = pandas.read_csv('Population.csv')
#利用pandas的read_csv读取Population.csv文件
df #输出显示df
```

- Excel 文件

```python
import pandas
df = pandas.read_excel('GDP.xls')
#利用pandas的read_excel读取GDP.xls文件
df #输出显示df
 ```
# 处理 JSON, XML 格式资料
## JSON
```python
with open('jd.json','r') as f:
#利用with open导入jd.json文件并命名为f
jd = f.read()
#f调用read()读取数据并将结果赋值为jd
jd #查看jd
```

- 将以上的 jd 文档转换成字典

```python
import json #导入json库
dic = json.loads(jd)
#利用json的loads导入jd并赋值给dic变量
dic #输出显示dic
for shop in dic:
#用shop代表dic里的每一个元素， for循环遍历dic
    print(shop.get('shop_name'),shop.get('shop_brief'))
    #输出打印每一个shop里key为“shop_name”“shop_brief”的值
```

- 利用 json 的 dumps 函数将上面的 dic 转换成 json 类型

```python
json.dumps(dic)
```

- 解析上面的 json

```python
import pandas
#导入pandas类库
df = pandas.read_json('jd.json')
#利用padndas的read_json函数将jd.json文件导入转换为html表格方式
df.head(5) #利用head()查看前5条记录
```

## XML
````python
import xml.etree.ElementTree as ET
#导入xml的etree类库下的ElementTree并重命名为ET
tree = ET.parse('weather.xml')
#利用ET的parse函数对weather.xml文件进行解析转换，并将结果命名为treee
```

- 获得 tree 的根

```python
root = tree.getroot()
#利用getroot获得tree的根，并将获取结果命名为root
root #查看root
```

- 解析 XML

```python
for city in root.iter():
#用city代表树的每一个结点，利用root.iter函数遍历结点名称为city的所有树结点
  print(city.get('cityname'),city.get('tem1'))
  #打印输出每个树结点的cityname和tem1属性值
```
