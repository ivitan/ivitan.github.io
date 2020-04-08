---
title: Python PyQuery 库基础
date: 2018-09-25 12:38:00
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
Python PyQuery 库基础
<!--more-->
# 初始化
## 字符串初始化
```Python
    !pip install pyquery
    html = '''
    <div>
    <ul>
         <li class="item-0">first item</li>
         <li class="item-1"><a href="link2.html">second item</a></li>
         <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
         <li class="item-1 active"><a href="link4.html">fourth item</a></li>
         <li class="item-0"><a href="link5.html">fifth item</a></li>
     </ul>
    </div>
    '''
    from pyquery import PyQuery as pq
    # 导入pyquery类库下面的PyQuery，并重命名为pq
    doc = pq(html)
    #利用html创建pq对象，命名为doc
    print(doc('li'))
    #输出打印所有的li标签
```

## URL初始化
```Python
    from pyquery import PyQuery as pq
    doc = pq(url='https://www.baidu.com')
    #利用url=''获取百度首页响应包，并以此创建pq对象，命名为doc
    print(doc('head'))
    #输出打印doc下面的head节点
```

## 文件初始化
```Python
    from pyquery import PyQuery as pq
    doc = pq(filename='demo.html')
    #利用filename=‘’将工作空间下的demo.html文档导入进来，并创建pq对象，命名为doc
    print(doc('li'))
    #输出打印doc下面的所有li标签
```

# 基本CSS选择器
```Python
    html = '''
    <div id="container">
        <ul class="list">
             <li class="item-0">first item</li>
             <li class="item-1"><a href="link2.html">second item</a></li>
             <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
             <li class="item-1 active"><a href="link4.html">fourth item</a></li>
             <li class="item-0"><a href="link5.html">fifth item</a></li>
         </ul>
     </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    print(doc('#container .list li'))
    #查找id为container下面class为list下面的li节点
```
# 查找元素
## 子元素
```Python
    html = '''
    <div id="container">
    <ul class="list">
         <li class="item-0">first item</li>
         <li class="item-1"><a href="link2.html">second item</a></li>
         <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
         <li class="item-1 active"><a href="link4.html">fourth item</a></li>
         <li class="item-0"><a href="link5.html">fifth item</a></li>
     </ul>
    </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    items = doc('#list')
    #查找class为list的标签节点，命名为items
    print(type(items))
    #输出打印items的类型
    print(items)
    #输出打印items
    lis =items.find('li')
    #利用find函数查找items下面的li标签节点
    print(type(lis))
    #输出打印lis的类型
    print(lis)
    #输出lis
```

## children
```Python
lis = items.children()
#lis为items的孩子标签
print(type(lis))
#输出返回lis的类型
print(lis)
#输出lis
```

- 返回items孩子节点中class为active为标签

```Python
lis = items.children('')
#返回items孩子节点中class为active为标签
print(lis)#输出打印lis
```

## 父元素
```Python
    html = '''
    <div id="container">
    <ul class="list">
         <li class="item-0">first item</li>
         <li class="item-1"><a href="link2.html">second item</a></li>
         <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
         <li class="item-1 active"><a href="link4.html">fourth item</a></li>
         <li class="item-0"><a href="link5.html">fifth item</a></li>
     </ul>
    </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    items = items('.list')
    #items为class等于list的标签
    container = items.parents()
    #返回items的父节点
    print(type(container))
    #输出打印container的类型
    print(container)
    #输出打印container
```

## parent
```python
Pythonhtml = '''
    <div class="wrap">
        <div id="container">
            <ul class="list">
                 <li class="item-0">first item</li>
                 <li class="item-1"><a href="link2.html">second item</a></li>
                 <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
                 <li class="item-1 active"><a href="link4.html">fourth item</a></li>
                 <li class="item-0"><a href="link5.html">fifth item</a></li>
             </ul>
         </div>
     </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    items = doc('.list')
    parents = items.parents()
    #返回items的所有祖先
    print(type(parents))
    #输出打印parents的类型
    print(parents)
    #输出打印parents
```

- 查找返回items祖先节点里class为wrap的祖先标签

```Python
parent = items('.wrap')
#查找返回items祖先节点里class为wrap的祖先标签
print(parents)
#打印输出parent
```

## 兄弟元素
```Python
    html = '''
    <div class="wrap">
    <div id="container">
        <ul class="list">
             <li class="item-0">first item</li>
             <li class="item-1"><a href="link2.html">second item</a></li>
             <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
             <li class="item-1 active"><a href="link4.html">fourth item</a></li>
             <li class="item-0"><a href="link5.html">fifth item</a></li>
         </ul>
     </div>
    </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    li = doc('.list .item-0.active')
    #li为class为list下面的class为item-0与active的节点
    print(li.siblings())
    #返回li节点的兄弟节点,提示用siblings()
```
```Python
    html = '''
    <div class="wrap">
        <div id="container">
            <ul class="list">
                 <li class="item-0">first item</li>
                 <li class="item-1"><a href="link2.html">second item</a></li>
                 <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
                 <li class="item-1 active"><a href="link4.html">fourth item</a></li>
                 <li class="item-0"><a href="link5.html">fifth item</a></li>
             </ul>
         </div>
     </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    li = doc('.list .item-0.active')
    #li为class为list下面的class为item-0与active的节点
    print(li.siblings('.active'))
    #返回li兄弟节点中class为active的标签
```

# 遍历
## 单个元素
```Python
    html = '''
    <div class="wrap">
    <div id="container">
        <ul class="list">
             <li class="item-0">first item</li>
             <li class="item-1"><a href="link2.html">second item</a></li>
             <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
             <li class="item-1 active"><a href="link4.html">fourth item</a></li>
             <li class="item-0"><a href="link5.html">fifth item</a></li>
         </ul>
     </div>
    </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    li = doc('.item-0.active')
    #返回class为item-0与active的标签节点
    print(li)
    #打印输出li
```
```Python
    html = '''
    <div class="wrap">
        <div id="container">
            <ul class="list">
                 <li class="item-0">first item</li>
                 <li class="item-1"><a href="link2.html">second item</a></li>
                 <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
                 <li class="item-1 active"><a href="link4.html">fourth item</a></li>
                 <li class="item-0"><a href="link5.html">fifth item</a></li>
             </ul>
         </div>
     </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    lis = doc('li').items()
    #lis为li标签下面所有的li子节点，提示：用items()获取所有li标签
    print(type(lis))
    #打印输出lis的类型
    for li in lis:
    #for循环遍历打印输出所有li标签
        print(li)
```

# 获取信息
## 获取属性
```Python
    html = '''
    <div class="wrap">
    <div id="container">
        <ul class="list">
             <li class="item-0">first item</li>
             <li class="item-1"><a href="link2.html">second item</a></li>
             <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
             <li class="item-1 active"><a href="link4.html">fourth item</a></li>
             <li class="item-0"><a href="link5.html">fifth item</a></li>
         </ul>
     </div>
    </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    a = doc('.item-0.active a')
    #a为class为item-0与active标签节点下面的a节点
    print(a)
    #打印输出a
    print(a.attr('href'))
    #利用attr()打印输出a的href属性值
    print(a.attr.href)
    #利用attr.调用输出a节点的href属性值
```

## 获取文本
```Python
    html = '''
    <div class="wrap">
    <div id="container">
        <ul class="list">
             <li class="item-0">first item</li>
             <li class="item-1"><a href="link2.html">second item</a></li>
             <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
             <li class="item-1 active"><a href="link4.html">fourth item</a></li>
             <li class="item-0"><a href="link5.html">fifth item</a></li>
         </ul>
     </div>
    </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    a = doc('.item-0.active a')
    #a为class为item-0与active标签节点下面的a节点
    print(a)
    #打印输出a节点
```

## 获取 HTML
```Python
    html = '''
    <div class="wrap">
    <div id="container">
        <ul class="list">
             <li class="item-0">first item</li>
             <li class="item-1"><a href="link2.html">second item</a></li>
             <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
             <li class="item-1 active"><a href="link4.html">fourth item</a></li>
             <li class="item-0"><a href="link5.html">fifth item</a></li>
         </ul>
     </div>
    </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    li = doc('.item-0.active')
    #li为class为item-0与active标签节点
    print(li)
    #打印输出li
    print(li.html())
    #打印输出li标签下面的html文档
```

# DOM 操作
## addClass、removeClass
```Python
    html = '''
    <div class="wrap">
        <div id="container">
            <ul class="list">
                 <li class="item-0">first item</li>
                 <li class="item-1"><a href="link2.html">second item</a></li>
                 <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
                 <li class="item-1 active"><a href="link4.html">fourth item</a></li>
                 <li class="item-0"><a href="link5.html">fifth item</a></li>
             </ul>
         </div>
     </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    li = doc('.item-0.active')
    #li为class为item-0与active标签节点
    print(li)#打印输出li
    li.removeClass('active')
    #利用removeClass移除li的active的class属性值
    print(li)
    #打印输出li
    li.addClass('active')
    #利用addClass增加li的active的class属性值
    print(li)
    #打印输出li
```

## attr、css
```Python
    html = '''
    <div class="wrap">
    <div id="container">
        <ul class="list">
             <li class="item-0">first item</li>
             <li class="item-1"><a href="link2.html">second item</a></li>
             <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
             <li class="item-1 active"><a href="link4.html">fourth item</a></li>
             <li class="item-0"><a href="link5.html">fifth item</a></li>
         </ul>
     </div>
    </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    li = doc('.item-0.active')
    print(li)
    li.attr('name','link')
    #通过attr(key,value)函数为li标签增加属性name,其值link
    print(li)#输出打印li
    li.css('font','14px')
    #通过css(key,value)函数为li标签增加css属性，其font-size值为14px
    print(li)
    #输出打印li
```
## remove
```Python
    html = '''
    <div class="wrap">
    Hello, World
    <p>This is a paragraph.</p>
    </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    wrap = doc('.wrap')
    #查找class为wrap的节点
    print(wrap.text())
    #打印输出wrap节点的文本内容
    wrap.find('p').remove()
    #利用find函数查找wrap下面的p标签，并用remove()函数删除该节点
    print(wrap.text())
    #打印输出wrap的文本内容
```
- [其他DOM方法](http://pyquery.readthedocs.io/en/latest/api.html)

# 伪类选择器
```Python
    html = '''
    <div class="wrap">
    <div id="container">
        <ul class="list">
             <li class="item-0">first item</li>
             <li class="item-1"><a href="link2.html">second item</a></li>
             <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
             <li class="item-1 active"><a href="link4.html">fourth item</a></li>
             <li class="item-0"><a href="link5.html">fifth item</a></li>
         </ul>
     </div>
    </div>
    '''
    from pyquery import PyQuery as pq
    doc = pq(html)
    li = doc('li:first-child')
    #查找第一个li标签
    print(li)
    li = doc('li:last-child')
    #查找最后一个li标签
    print(li)
    li = doc('li:nth-child(2)')
    #查找第2个li标签
    print(li)
    li = doc('li:gt(2)')
    print(li)
    li = doc('li:nth-child(2n)')
    print(li)
    li = doc('li:contains(second)')
    #查找包括second文本内容的标签
    print(li)
```
- [更多CSS选择器可以查看](http://www.w3school.com.cn/css/index.asp)

# 官方文档
- [官方文档](http://pyquery.readthedocs.io/)
