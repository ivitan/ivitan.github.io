---
title: 读写 Excel 文件
date: 2018-11-19 15:08:39
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
读写 Excel
<!--more-->

# 读 Excel
```python
import xlrd
def read_file('file.xlsx'):
data = xlrd.open_workbook(url)
table = data.sheets()[0] # 打开第一张表
nrows = table.nrows # 获取表的行数
for i in range(nrows): # 循环逐行打印
   print(table.row_values(i)[1:])
```
# 写 Excel
```python
import xlwt
data = xlrd.open_workbook('excelFile.xls')
excel = copy(data)                                       

#使用wlrd的方法获取已有的的行数
rows = data.sheet()[num].nrows                  
#获得要操作的sheet
table = excel.get_sheet(num)                      
for value in n:
  #xlwt的写方法，参数为行，列，值，行
  table.write(rows,num1,value)  
  num1 = num1+1 

excel.save(name)      
```
