---
title: Python BeautifulSoup 库基础使用
date: 2018-09-22 10:28:50
tags:
    - Python
    - WebCrawler
    - Note
categories:
  - notes
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Python.png
---
Python BeautifulSoup 库基础使用
<!--more-->
# 解析库
|解析器|使用方法|优势|劣势|
|:--|:--|:--|:--|
|Python标准库|	BeautifulSoup(markup, "html.parser")|	Python的内置标准库、执行速度适中 、文档容错能力强|	Python 2.7.3 or 3.2.2)前的版本中文容错能力差|
|lxml HTML 解析器|	BeautifulSoup(markup, "lxml")	|速度快、文档容错能力强|	需要安装C语言库|
|lxml XML 解析器|	BeautifulSoup(markup, "xml")|	速度快、唯一支持XML的解析器	|需要安装C语言库|
|html5lib|	BeautifulSoup(markup, "html5lib")|	最好的容错性、以浏览器的方式解析文档、生成HTML5格式的文档	|速度慢、不依赖外部扩展|

# 基本使用
```Python
    html = """
    <html><head><title>The Dormouse's story</title></head>
    <body>
    <p class="title" name="dromouse"><b>The Dormouse's story</b></p>
    <p class="story">Once upon a time there were three little sisters; and their names were
    <a href="http://example.com/elsie" class="sister" id="link1"><!-- Elsie --></a>,
    <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
    <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
    and they lived at the bottom of a well.</p>
    <p class="story">...</p>
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.prettify())
    #对整个html进行格式化并输出
    print(soup.title.string)
    #求title节点的内容（文本）
```
# 标签选择器
## 优劣
- 根据标签名（获取名称、属性、文本内容）、继承关系（children/descendants/parent/parents，这种继承返回结果为迭代器，需用enumerate来获取）选择元素
- 优点：速度快
- 缺点：对于标签名相同的标签，其属性值可能不同，这种方法无法筛选出目标标签
-

## 选择元素
```Python
    html = """
    <html><head><title>The Dormouse's story</title></head>
    <body>
    <p class="title" name="dromouse"><b>The Dormouse's story</b></p>
    <p class="story">Once upon a time there were three little sisters; and their names were
    <a href="http://example.com/elsie" class="sister" id="link1"><!-- Elsie --></a>,
    <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
    <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
    and they lived at the bottom of a well.</p>
    <p class="story">...</p>
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.title)
    #直接输出选择title
    print(type(soup.title))
    #输出title返回的数据类型
    print(soup.head)
    #输出head
    print(soup.p)
    #输出第一个p节点
```

## 获取名称
```Python
    html = """
    <html><head><title>The Dormouse's story</title></head>
    <body>
    <p class="title" name="dromouse"><b>The Dormouse's story</b></p>
    <p class="story">Once upon a time there were three little sisters; and their names were
    <a href="http://example.com/elsie" class="sister" id="link1"><!-- Elsie --></a>,
    <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
    <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
    and they lived at the bottom of a well.</p>
    <p class="story">...</p>
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.title.name)
    #输出title节点名
```
## 获取属性
```Python
    html = """
    <html><head><title>The Dormouse's story</title></head>
    <body>
    <p class="title" name="dromouse"><b>The Dormouse's story</b></p>
    <p class="story">Once upon a time there were three little sisters; and their names were
    <a href="http://example.com/elsie" class="sister" id="link1"><!-- Elsie --></a>,
    <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
    <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
    and they lived at the bottom of a well.</p>
    <p class="story">...</p>
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.p.attrs['name'])
    #用attrs[]获取p节点name属性的值
    print(soup.p['name'])
    #直接用[]获取name属性的值
 ```

## 获取内容
```Python
    html = """
    <html><head><title>The Dormouse's story</title></head>
    <body>
    <p clss="title" name="dromouse"><b>The Dormouse's story</b></p>
    <p class="story">Once upon a time there were three little sisters; and their names were
    <a href="http://example.com/elsie" class="sister" id="link1"><!-- Elsie --></a>,
    <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
    <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
    and they lived at the bottom of a well.</p>
    <p class="story">...</p>
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.p.string)
    #输出打印第一个p节点的文本（内容)用string
```

## 嵌套选择
```Python
    html = """
    <html><head><title>The Dormouse's story</title></head>
    <body>
    <p class="title" name="dromouse"><b>The Dormouse's story</b></p>
    <p class="story">Once upon a time there were three little sisters; and their names were
    <a href="http://example.com/elsie" class="sister" id="link1"><!-- Elsie --></a>,
    <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
    <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
    and they lived at the bottom of a well.</p>
    <p class="story">...</p>
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.head.title.string)
    #输出head下子节点title节点的文本
```
# 节点
## 子节点和子孙节点
```Python
    html = """
    <html>
    <head>
        <title>The Dormouse's story</title>
    </head>
    <body>
        <p class="story">
            Once upon a time there were three little sisters; and their names were
            <a href="http://example.com/elsie" class="sister" id="link1">
                <span>Elsie</span>
            </a>
            <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a>
            and
            <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>
            and they lived at the bottom of a well.
        </p>
        <p class="story">...</p>
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.p.contents)
    #用contents可以获得p标签的子节点
```

```Python
    html = """
    <html>
        <head>
            <title>The Dormouse's story</title>
        </head>
        <body>
            <p class="story">
                Once upon a time there were three little sisters; and their names were
                <a href="http://example.com/elsie" class="sister" id="link1">
                    <span>Elsie</span>
                </a>
                <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a>
                and
                <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>
                and they lived at the bottom of a well.
            </p>
            <p class="story">...</p>
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.p.children)
    #用children获取p的子节点
    for i, child in enumerate(soup.p.children):
    #用i,child表示以上获取结果的索引号与内容，用enumerate获取迭代器内容并进行遍历
        print(i, child)
```

```Python
    html = """
    <html>
        <head>
            <title>The Dormouse's story</title>
        </head>
        <body>
            <p class="story">
                Once upon a time there were three little sisters; and their names were
                <a href="http://example.com/elsie" class="sister" id="link1">
                    <span>Elsie</span>
                </a>
                <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a>
                and
                <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>
                and they lived at the bottom of a well.
            </p>
            <p class="story">...</p>
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.p.descendants)
    #输出打印p节点的孙子节点descendants
    for i, child in enumerate(soup.p.descendants):
    #用enumerate获取以上迭代器，用i,child分别表示索引号与内容，遍历它们并输出
        print(i, child)
```
## 父节点和祖先节点
```Python
    html = """
    <html>
    <head>
        <title>The Dormouse's story</title>
    </head>
    <body>
        <p class="story">
            Once upon a time there were three little sisters; and their names were
            <a href="http://example.com/elsie" class="sister" id="link1">
                <span>Elsie</span>
            </a>
            <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a>
            and
            <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>
            and they lived at the bottom of a well.
        </p>
        <p class="story">...</p>
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.a.parent)
    #输出第一个a节点的父节点
```

```Python
    html = """
    <html>
        <head>
            <title>The Dormouse's story</title>
        </head>
        <body>
            <p class="story">
                Once upon a time there were three little sisters; and their names were
                <a href="http://example.com/elsie" class="sister" id="link1">
                    <span>Elsie</span>
                </a>
                <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a>
                and
                <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>
                and they lived at the bottom of a well.
            </p>
            <p class="story">...</p>
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(list(enumerate(soup.a.parents)))
    #输出a节点父辈以上节点，用enumerate转换迭代器，最后将转换后的数据类型转换为list类型
    # 观察得到索引号为2与3的结果一样，其中3的结果表示整个html文档
```

## 兄弟节点
```Python
    html = """
    <html>
    <head>
        <title>The Dormouse's story</title>
    </head>
    <body>
        <p class="story">
            Once upon a time there were three little sisters; and their names were
            <a href="http://example.com/elsie" class="sister" id="link1">
                <span>Elsie</span>
            </a>
            <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a>
            and
            <a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>
            and they lived at the bottom of a well.
        </p>
        <p class="story">...</p>
    """
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(list(enumerate(soup.a.next_siblings)))
    #获取第一个a节点之后的兄弟节点next_siblings,并用enumerate获取迭代器，最终转换成list类型
    print(list(enumerate(soup.a.previous_siblings)))
    #第一个a节点之前的兄弟节点previous_siblings，并用enumerate获取迭代器，最终转换成list类型
```
# 标准选择器
## find_all 返回所有元素
- 可根据标签名、属性、内容查找文档
```Python
find_all( name , attrs , recursive , text , **kwargs )
```

- name
```Python
    html='''
    <div class="panel">
    <div class="panel-heading">
        <h4>Hello</h4>
    </div>
    <div class="panel-body">
        <ul class="list" id="list-1">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
            <li class="element">Jay</li>
        </ul>
        <ul class="list list-small" id="list-2">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
        </ul>
    </div>
    </div>
    '''
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.find_all('ul'))
    #查找并输出所有名为“ul”标签
    print(type(soup.find_all('ul')[0]))
    #输出第一个名为ul的标签
```

```Python
    html='''
    <div class="panel">
        <div class="panel-heading">
            <h4>Hello</h4>
        </div>
        <div class="panel-body">
            <ul class="list" id="list-1">
                <li class="element">Foo</li>
                <li class="element">Bar</li>
                <li class="element">Jay</li>
            </ul>
            <ul class="list list-small" id="list-2">
                <li class="element">Foo</li>
                <li class="element">Bar</li>
            </ul>
        </div>
    </div>
    '''
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    for ul in soup.find_all('ul'):
    #遍历输出所有ul节点下的li节点
        print(ul.find_all('li'))
```
- attrs
```Python
    html='''
    <div class="panel">
    <div class="panel-heading">
        <h4>Hello</h4>
    </div>
    <div class="panel-body">
        <ul class="list" id="list-1" name="elements">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
            <li class="element">Jay</li>
        </ul>
        <ul class="list list-small" id="list-2">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
        </ul>
    </div>
    </div>
    '''
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.find_all(attrs={'id': 'list-1'}))
    #用attrs属性参数以及key-value分别为id-list-1的数据来获取节点
    print(soup.find_all(attrs={'name': 'elements'}))
    #用attrs属性参数以及key-value分别为name-elements的数据来获取节点
```
```Python
    html='''
    <div class="panel">
        <div class="panel-heading">
            <h4>Hello</h4>
        </div>
        <div class="panel-body">
            <ul class="list" id="list-1">
                <li class="element">Foo</li>
                <li class="element">Bar</li>
                <li class="element">Jay</li>
            </ul>
            <ul class="list list-small" id="list-2">
                <li class="element">Foo</li>
                <li class="element">Bar</li>
            </ul>
        </div>
    </div>
    '''
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.find_all(id='list-1'))
    #直接用key=value的形式获取对应节点
    print(soup.find_all(class_='element'))
    #获取class='element'的节点
```
- text
```Python
    html='''
    <div class="panel">
        <div class="panel-heading">
            <h4>Hello</h4>
        </div>
        <div class="panel-body">
            <ul class="list" id="list-1">
                <li class="element">Foo</li>
                <li class="element">Bar</li>
                <li class="element">Jay</li>
            </ul>
            <ul class="list list-small" id="list-2">
                <li class="element">Foo</li>
                <li class="element">Bar</li>
            </ul>
        </div>
    </div>
    '''
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.find_all(text='Foo'))
    #获取所有文本内容='Foo'的节点文本值，用text表示,
```
## find 返回单个元素
```Python
find( name , attrs , recursive , text , **kwargs )
```

```Python
    html='''
    <div class="panel">
    <div class="panel-heading">
        <h4>Hello</h4>
    </div>
    <div class="panel-body">
        <ul class="list" id="list-1">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
            <li class="element">Jay</li>
        </ul>
        <ul class="list list-small" id="list-2">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
        </ul>
    </div>
    </div>
    '''
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.find('ul'))
    print(type(soup.find('ul')))
    #输出以上结果的数据类型
    print(soup.find('page'))
    #输出名为page的第一个节点
```
# 其他
- find_parents()返回所有祖先节点，find_parent()返回直接父节点。
```Python
find_parents()
find_parent()
```
- find_next_siblings()返回后面所有兄弟节点，find_next_sibling()返回后面第一个兄弟节点。
```Python
 find_next_siblings()
find_next_sibling()
 ```
- find_previous_siblings()返回前面所有兄弟节点，find_previous_sibling()返回前面第一个兄弟节点。
```Python
find_previous_siblings() find_previous_sibling()
```
- find_all_next()返回节点后所有符合条件的节点, find_next()返回第一个符合条件的节点
```Python
find_all_next()
find_next()
```
- find_all_next()返回节点后所有符合条件的节点, find_next()返回第一个符合条件的节点
```Python
find_all_next()
find_next()
```
- find_all_previous()返回节点后所有符合条件的节点, find_previous()返回第一个符合条件的节点
```Python
find_all_previous()
find_previous()
```
# CSS 选择器
- 通过select()直接传入CSS选择器即可完成选择
```Python
        html='''
    <div class="panel">
        <div class="panel-heading">
            <h4>Hello</h4>
        </div>
        <div class="panel-body">
            <ul class="list" id="list-1">
                <li class="element">Foo</li>
                <li class="element">Bar</li>
                <li class="element">Jay</li>
            </ul>
            <ul class="list list-small" id="list-2">
                <li class="element">Foo</li>
                <li class="element">Bar</li>
            </ul>
        </div>
    </div>
    '''
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    print(soup.select('.panel .panel-heading'))
    #选择class属性为panel下子节点的class属性为panel-heading属性的节点,只有class属性才需要加.
    print(soup.select('ul li'))
    #选择所有ul节点下面的li节点
    print(soup.select('#list-2 .element'))
    #选择id为list-2，class为element的节点 ，用#表示id
    print(type(soup.select('ul')[0]))
```
```Python
    html='''
    <div class="panel">
        <div class="panel-heading">
            <h4>Hello</h4>
        </div>
        <div class="panel-body">
            <ul class="list" id="list-1">
                <li class="element">Foo</li>
                <li class="element">Bar</li>
                <li class="element">Jay</li>
            </ul>
            <ul class="list list-small" id="list-2">
                <li class="element">Foo</li>
                <li class="element">Bar</li>
            </ul>
        </div>
    </div>
    '''
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    for ul in soup.select('ul'):
    #用select遍历ul的标签下的li标签，
        print(ul.select('li'))
```
## 获取属性
```Python
    html='''
    <div class="panel">
    <div class="panel-heading">
        <h4>Hello</h4>
    </div>
    <div class="panel-body">
        <ul class="list" id="list-1">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
            <li class="element">Jay</li>
        </ul>
        <ul class="list list-small" id="list-2">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
        </ul>
    </div>
    </div>
    '''
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    for ul in soup.select('ul'):
    #用select获取所有ul标签，遍历所有ul标签的id属性的值
        print(ul['id'])
        #不用attrs
        print(ul.attrs['id'])
        #用attrs
```
## 获取内容
```Python
    html='''
    <div class="panel">
    <div class="panel-heading">
        <h4>Hello</h4>
    </div>
    <div class="panel-body">
        <ul class="list" id="list-1">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
            <li class="element">Jay</li>
        </ul>
        <ul class="list list-small" id="list-2">
            <li class="element">Foo</li>
            <li class="element">Bar</li>
        </ul>
    </div>
    </div>
    '''
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'lxml')
    for li in soup.select('li'):
        print(li.get_text())
    #获取所有li标签的文本值
```
# 实例
requests类库请求网页获取响应内容
```Python
    import requests
    #导入请求类库requests
    newsurl = 'https://news.qq.com'
    #将腾讯主页的url设为newsurl
    res = requests.get(newsurl)
    #根据newsurl请求获取响应内容，结果赋值为res
    print(res.text)
    #打印输出网页文本内容
```
BeautifulSoup 类库解析文档树
```Python
    from bs4 import BeautifulSoup
    #导入bs4的BeautifulSoup类库
    html_sample = ' \
    <html> \
    <body> \
    <h1 id="title">Hello World</h1> \
    <a href="#" class="link">This is link1</a> \
    <a href="# link2" class="link">This is link2</a> \
    </body> \
    </html>'
    soup = BeautifulSoup(html_sample,'html.parser')
    #创建BeautifulSoup对象soup，利用html.parser解析器解析html_sample
    soup.text
    #输出打印soup的文本内容
```
找出含有特定的 html 标签
```Python
    soup.select('h1')[0].text
    #利用select函数获取h1标签的文本内容
    soup.select('a')[0].text
    #利用select函数获取第一个a标签的文本内容
    soup.select('a')[1].text
    #利用select函数获取第二个a标签的文本内容
    for alink in soup.select('a') :
        print(alink.text)
    #利用循环打印输出所有的a标签的文本内容，用alink表示循环变量名
```
找出含有特定的 CSS 属性
 ```Python
    soup.select('#title')[0].text
    #找出id为title的属性所在节点的文本
    soup.select('.link')[0].text
    #找出class为link的第一个节点的文本
```
查找指定标签节点的某一属性
```Python
    for link in soup.select('a'):
    #循环方式获取所有a标签,link表示循环变量名
        print(link['href'])
        #打印输出link的href属性值
```

# 获取腾讯新闻首页所有新闻的标题与详细内容页的 url
```Python
    import requests
    from bs4 import BeautifulSoup
    res = requests.get('http://news.qq.com/')
    #get方式访问获取腾讯新闻首页（http://news.qq.com/）的响应体，结果命名为res
    soup = BeautifulSoup(res.text,'html.parser')
    #创建BeautifulSoup对象，利用html.parser对网页的文本内容进行解析
    for news in soup.select('.Q-tpWrap.text'):
    #利用开发者工具定位查找每条新闻的标题所在节点，news代表每个循环节点名
        print(news.select('.linkto')[0].text,news.select('.linkto')[0]['href'])
    #打印输出每条新闻的标题与url
    print('===========')
    #打印======进行间隔
    ```
    ```Python
    import requests
    from bs4 import BeautifulSoup
    res = requests.get('http://news.qq.com/')
    #get方式访问获取腾讯新闻首页的响应体，结果命名为res
    soup = BeautifulSoup(res.text, 'html.parser')
    #创建BeautifulSoup对象，利用html.parser对网页的文本内容进行解析
    newsary=[]
     #定义newsary列表为空，用于存储所有新闻的标题与url
    for news in soup.select('.Q-tpWrap .text'):
          newsary.append({'title':news.select('.linkto')[0].text,'url':news.select('.linkto')[0]['href']})
          #将用key为title,url分别保存每条新闻的标题与访问网址,并追加到newsary列表里面
```
- 将newsary转换成dataFrame
```Python
import pandas
newsdf = pandas.DataFrame(newsary)
newsdf
 ```
- 将 newsdf 保存为 excel 文档,文件命名为 news
```Python
newsdf.to_excel('news.xlsx')
```
# 总结
## 建议
- 推荐使用lxml解析库，必要时使用html.parser
- 标签选择筛选功能弱但是速度快
- 建议使用find()、find_all() 查询匹配单个结果或者多个结果
- 如果对CSS选择器熟悉建议使用select()
- 记住常用的获取属性和文本值的方法
