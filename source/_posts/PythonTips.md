---
title: Python Tips
date: 2018-10-31 19:38:16
tags:
  - WebCrawler
  - Python
  - Note
categories:
  - Coding
  - Python
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Python.png
---
Python 小技巧
<!---more-->
# 打印 index
对列表，数列打印他们的 index

- 一般方法

```Python
    cities = ['Shanghai','beijing','Chengdu']
    i = 0
    for c in cities:
        print(i +1,'-->',c)
        i += 1
```

- 更好的方法(使用 enumerate)

```Python
    cities = ['Shanghai','beijing','Chengdu']
    for i,city in enumerate(cities):
        print(i+1,'-->',city)
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fwscu1oiy9j204d0303yd.jpg)

# 两个系列循环
对两个序列进行计算或处理

- 一般方法

```Python
    names = ['leo','jack','james']
    colors = ['red','green','blue','yellow']
    n = min(len(names),len(colors))
    for i in range(n):
        print(names[i],'-->',colors[i])
```

- 更好的方法(使用 zip)

```Python
    names = ['leo','jack','james']
    colors = ['red','green','blue','yellow']
    for name,color in zip(names,colors):
        print(name,'-->',color)
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fwscu1m48wj204l02r3yd.jpg)

# 交换变量
多个变量之间的交换，如冒泡排序法

- 一般方法

```Python
    x = 1
    y = 2
    print('>>Before:x={},y={}'.format(x,y))
    tmp = y
    y = x
    x = tmp
    print('>>After:x = {},y = {}'.format(x,y))
```

- 更好的方法

```Python
    x = 1
    y= 2
    print('Before:x = {},y = {}'.format(x,y))
    x,y = y,x
    print('After:x = {},y = {}'.format(x,y))
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fwscu1nt3kj205a01pt8j.jpg)

# 字典的读取
对字典的访问和读取，读取的字典 key 为空，需要一个缺省值

- 一般方法

```Python
    students = {'Lili':18,'Sam':25}
    if 'Susan' in students:
        student = students['Susan']
    else:
        student = 'unknow'
    print('Susan is {} yesrs old'.format(student))
```

- 更好的方法

```Python
    students = {'Lili':18,'San':25}
    student = students.get('Susan','unknow')
    print('Susan is {} yesrs'.format(student))
```
- 巧妙地利用字典的 get 的方法。若字典没有 Susan 的 key，则用 unknow 来表示缺省值。

# 循环查找
在一个大的循环中作搜索，如在文件中搜索关键字，从文件名列表中查找特殊的文件名

- 一般方法

```Python
    target_letter = 'd'
    letters = ['a','b','c']

    found = False
    for letter in letters:
        if letter == target_letter:
            print('Found')
            found = True
            break
    if not found:
        print('Not Found')
```

- 更好的方法

```Python
    target_letter = 'd'
    letters = ['a','b','c']

    for letter in letters:
        if letter == target_letter:
            print('found')
            break
    else:
        print('Not Found')
```

# 文件读取查找
打开以文件，对内容进行循环读取处理

- 一般方法

```Python
    f = open('data.txt')
    try:
        text = f.read()
        for line in text.split('\n'):
            print(line)
    finally:
        f.close()
```

- 更好的方法

```Python
    with open('data.txt') as f:
        for line in f:
            print(line.strip('\n'))
```

# 关于锁的写法
对于并发操作尤其是多线程的操作，对同一内存进行读写操作时，加锁保护

- 一般方法

```Python
    import threading

    lock = threading.Lock()
    lock.acquire()
    try:
        print('Citical par,do somethins...')
    finally:
        lock.release()
```

- 更好的方法

```Python
    import threading
    lock = threading.Lock()
    with lock:
        print('Citical par,do somethins...')
```
---
**Via**
- [七种不一样的Python代码写法，让你写出一手漂亮的代码](https://www.bilibili.com/read/cv1417439)
