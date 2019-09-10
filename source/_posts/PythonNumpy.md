---
title: Python Numpy
date: 2018-10-03 18:08:56
tags:
- Python
- Note
categories:
- notes
author:
name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Python.png
---
Python Numpy
<!--more-->
# 问题
## 数列
- a = a1,a2,a3,·····,an
- b = b1,b2,b3,·····,bn
- 求：
	- c = a12+b13,a22+b23,a32+b33,·····+an2+bn3
	1. 用列表+循环实现，并包装成函数
	2. 用numpy实现，并包装成函数
	3. 对比两种方法实现的效率，给定一个较大的参数n，用运行函数前后的timedelta表示。

# 实现
## 列表+循环实现，并包装成函数
```python
def pySum(n):
    a = list(range(n))
    b = list(range(0,5*n,5))
    c = []
    for i in range(len(a)):
        c.append(a[i] ** 2 + b[i] ** 3)
    return(c)
print(pySum(10))
```


## 数组numpy实现，并包装成函数
```python
import numpy
def npSum(n):
    a = numpy.arange(n)
    b = numpy.arange(0, 5 * n, 5)
    c = a**2+b**3
    return(c)
print(npSum(10))
```


- 对比两种方法实现的效率，给定一个较大的参数n，用运行函数前后的timedelta表示

```python
from datetime import datetime
start = datetime.now()
pySum(100000)
delta = datetime.now()-start
print(delta)

start = datetime.now()
npSum(100000)
delta = datetime.now()-start
print(delta)
```

- 尝试把 a,b 定义为三层嵌套列表和三维数组

```python
	import numpy
	def liSum(n):
	    a = numpy.arange(n)
	    b = numpy.arange(0,5*n,5)
	    c = numpy.array([[a,b],[a**2,b**3]])
	    return (c)
	print(npSum(10))

	start = datetime.now()
	liSum(100000)
	time = datetime.now()-start
	print(time)
```
