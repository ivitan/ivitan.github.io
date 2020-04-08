---
title: Python 正则表达式
date: 2018-10-12 15:28:26
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
Python 正则表达式
<!--more-->
# 常见匹配模式

- 模式表

|模式	|描述|
|:---|:---|
|`\w`	|匹配字母数字及下划线|
|`\W`	|匹配非字母数字下划线|
|`\s`	|匹配任意空白字符，等价于 [\t\n\r\f].|
|`\S`	|匹配任意非空字符|
|`\d` |匹配任意数字，等价于 [0-9]|
|`\D`	|匹配任意非数字|
|`\A`	|匹配字符串开始|
|`\Z`	|匹配字符串结束，如果是存在换行，只匹配到换行前的结束字符串|
|`\z`	|匹配字符串结束|
|`\G`	|匹配最后匹配完成的位置|
|`\n`	|匹配一个换行符|
|`\t`	|匹配一个制表符|
|`^`	|匹配字符串的开头|
|`$`	|匹配字符串的末尾|
|`.`	|匹配任意字符，除了换行符，当re.DOTALL标记被指定时，则可以匹配包括换行符的任意字符|
|`[...]`	|用来表示一组字符,单独列出：[amk] 匹配 'a'，'m'或'k'|
|`[^...]`	|不在[]中的字符：[^abc] 匹配除了a,b,c之外的字符|
|`*	`|匹配0个或多个的表达式|
|`+`	|匹配1个或多个的表达式|
|`?`	|匹配0个或1个由前面的正则表达式定义的片段，非贪婪方式|
|`{n}`|精确匹配n个前面表达式|
|`{n, m}`	|匹配 n 到 m 次由前面的正则表达式定义的片段，贪婪方式|
|`a|b`|	匹配a或b|
|`( )`|匹配括号内的表达式，也表示一个组|

# re.match
re.match 尝试从字符串的起始位置匹配一个模式，如果不是起始位置匹配成功的话，match()就返回none。

```Python
re.match(pattern, string, flags=0)
```
## 匹配模式

- 最常规的匹配

```Python
import re

content = 'Hello 123 4567 World_This is a Regex Demo'
print(len(content))

#逐个匹配单个字符
result = re.match('^Hello\s\d\d\d\s\d{4}\s\w{10}.*Demo$',content)
print(result)
#输出匹配的字符串
print(result.group())
#输出匹配字符长度
print(result.span())
```

## 泛匹配
```Python
 import re

content = 'Hello 123 4567 World_This is a Regex Demo'
#用.*代表任意个任何字符
result = re.match('^Hello.*Demo$',content)
#输出整个匹配结果
print(result)
#输出匹配的字符串
print(result.group())
#输出匹配字符长度
print(result.span())
```

## 匹配目标
```Python
import re

content = 'Hello 1234567 World_This is a Regex Demo'
#用()匹配目标1234567
result = re.match('^Hello\s(\d+)\sWorld.*Demo$',content)
print(result)
print(result.group(1))
#输出匹配字符长度
print(result.span())
```

## 贪婪匹配
```Python
import re

content = 'Hello 1234567 World_This is a Regex Demo'
#用.*模式尝试匹配数字串1234567
result = re.match('^He.*\s(\d+)\sWorld.*Demo$',content)
print(result)
print(result.group(1))
```

## 非贪婪匹配
```Python
import re

content = 'Hello 1234567 World_This is a Regex Demo'
#用.*？模式匹配数字串1234567
result = re.match('^H.*?\s(\d+)\sW.*?Demo$',content)
print(result)
print(result.group(1))
```

## 匹配模式
```Python
import re

content = '''Hello 1234567 World_This
is a Regex Demo
'''
#用re.S意味着.可以代表换行符在内的符号
print(result.group(1))#输出匹配数字串
result = re.match('He.*?\s(\d+).*?Demo$',content,re.S)
```

# 转义
```Python
import re

content = 'price is $5.00'
#直接用$与.代表原字符
result = re.match('price is $5.00',content)
print(result)#输出匹配结果
```
```Python
import re

content = 'price is $5.00'
#加\代表转义
result = re.match('price is \$5\.00',content)
print(result)#输出整个匹配结果
```
- 总结：尽量使用泛匹配、使用括号得到匹配目标、尽量使用非贪婪模式、有换行符就用re.S

# re.search
re.search 扫描整个字符串并返回第一个成功的匹配。

```Python
import re

content = 'Extra stings Hello 1234567 World_This is a Regex Demo Extra stings'
#用re.match匹配以Hello开头至Demo的这一段字符串
result = re.match('Hello.*?(\d+).*?Demo$',content)
print(result)
```
```Python
import re

content = 'Extra stings Hello 1234567 World_This is a Regex Demo Extra stings'
#用re.search匹配以Hello开头至Demo的这一段字符串
result = re.search('Hello.*?(\d+).*?Demo', content)
print(result)#输出整个匹配结果
print(result.group(1))#输出数字字符串
```
- 总结：为匹配方便，能用 search 就不用 match

# 匹配演练
- 一

```Python
    import re

    html = '''<div id="songs-list">
        <h2 class="title">经典老歌</h2>
        <p class="introduction">
            经典老歌列表
        </p>
        <ul id="list" class="list-group">
            <li data-view="2">一路上有你</li>
            <li data-view="7">
                <a href="/2.mp3" singer="任贤齐">沧海一声笑</a>
            </li>
            <li data-view="4" class="active">
                <a href="/3.mp3" singer="齐秦">往事随风</a>
            </li>
            <li data-view="6"><a href="/4.mp3" singer="beyond">光辉岁月</a></li>
            <li data-view="5"><a href="/5.mp3" singer="陈慧琳">记事本</a></li>
            <li data-view="5">
                <a href="/6.mp3" singer="邓丽君"><i class="fa fa-user"></i>但愿人长久</a>
            </li>
        </ul>
    </div>'''
    #分别匹配齐秦，往事随风这两串目标字符串
    result = re.search('<li.*?active.*?singer="(\w+)">(\w+)</a>',html,re.S)
    print(result.group(1),result.group(2))
```

- 二

```Python
    import re

    html = '''<div id="songs-list">
        <h2 class="title">经典老歌</h2>
        <p class="introduction">
            经典老歌列表
        </p>
        <ul id="list" class="list-group">
            <li data-view="2">一路上有你</li>
            <li data-view="7">
                <a href="/2.mp3" singer="任贤齐">沧海一声笑</a>
            </li>
            <li data-view="4" class="active">
                <a href="/3.mp3" singer="齐秦">往事随风</a>
            </li>
            <li data-view="6"><a href="/4.mp3" singer="beyond">光辉岁月</a></li>
            <li data-view="5"><a href="/5.mp3" singer="陈慧琳">记事本</a></li>
            <li data-view="5">
                <a href="/6.mp3" singer="邓丽君">但愿人长久</a>
            </li>
        </ul>
    </div>'''
    result = re.search('<li.*?singer="(\w+)">(\w+)</a>',html,re.S)
    #分别匹配任贤齐，沧海一声笑这两串目标字符串
    print(result.group(1))
    print(result.group(2))

    #同时输出任贤齐，沧海一声笑这两串目标字符
    print(result.group(1),result.group(2))
```

- 三

```Python
    import re

    html = '''<div id="songs-list">
        <h2 class="title">经典老歌</h2>
        <p class="introduction">
            经典老歌列表
        </p>
        <ul id="list" class="list-group">
            <li data-view="2">一路上有你</li>
            <li data-view="7">
                <a href="/2.mp3" singer="任贤齐">沧海一声笑</a>
            </li>
            <li data-view="4" class="active">
                <a href="/3.mp3" singer="齐秦">往事随风</a>
            </li>
            <li data-view="6"><a href="/4.mp3" singer="beyond">光辉岁月</a></li>
            <li data-view="5"><a href="/5.mp3" singer="陈慧琳">记事本</a></li>
            <li data-view="5">
                <a href="/6.mp3" singer="邓丽君">但愿人长久</a>
            </li>
        </ul>
    </div>'''
    result = re.search('<li.*?singer="(\w+)">(\w+)</a>',html)
    #分别匹配beyond，光辉岁月这两串目标字符串
    print(result.group(1))
    print(result.group(2))
    #同时输出beyond，光辉岁月这两串目标字符串
    print(result.group(1),result.group(2))
```
# re.findall
搜索字符串，以列表形式返回全部能匹配的子串。

```Python
    import re

    html = '''<div id="songs-list">
    <h2 class="title">经典老歌</h2>
    <p class="introduction">
        经典老歌列表
    </p>
    <ul id="list" class="list-group">
        <li data-view="2">一路上有你</li>
        <li data-view="7">
            <a href="/2.mp3" singer="任贤齐">沧海一声笑</a>
        </li>
        <li data-view="4" class="active">
            <a href="/3.mp3" singer="齐秦">往事随风</a>
        </li>
        <li data-view="6"><a href="/4.mp3" singer="beyond">光辉岁月</a></li>
        <li data-view="5"><a href="/5.mp3" singer="陈慧琳">记事本</a></li>
        <li data-view="5">
            <a href="/6.mp3" singer="邓丽君">但愿人长久</a>
        </li>
    </ul>
    </div>'''
    #匹配从任贤齐开始所有歌的href,singer值与文本内容
    result = re.findall('<li.*?href="(.*?)".*?singer="(\w+)">(\w+)</a>',html,re.S)
    print(result)#输出整个匹配结果
    print(type(result))#输出匹配结果的数据类型
    #遍历所有匹配结果，输出每一条匹配结果与每一匹配结果的三个元素
    for item in result :
        print(result)
        print(item[0],item[1],item[2])
```
```Python
    import re

    html = '''<div id="songs-list">
        <h2 class="title">经典老歌</h2>
        <p class="introduction">
            经典老歌列表
        </p>
        <ul id="list" class="list-group">
            <li data-view="2">一路上有你</li>
            <li data-view="7">
                <a href="/2.mp3" singer="任贤齐">沧海一声笑</a>
            </li>
            <li data-view="4" class="active">
                <a href="/3.mp3" singer="齐秦">往事随风</a>
            </li>
            <li data-view="6"><a href="/4.mp3" singer="beyond">光辉岁月</a></li>
            <li data-view="5"><a href="/5.mp3" singer="陈慧琳">记事本</a></li>
            <li data-view="5">
                <a href="/6.mp3" singer="邓丽君">但愿人长久</a>
            </li>
        </ul>
    </div>'''
    #用正则表达式匹配从一路上有你所在li标签开始的所有li标签
    result = re.findall('<li.*?>\s*?(<a.*?>)?(\w+)(</a>)?\s*?</li>', html, re.S)
    print(result)#输出整个匹配结果
    ##输出每一条匹配结果的第2个元素
    for item in result:
        print(item[1])
```
# re.sub
替换字符串中每一个匹配的子串后返回替换后的字符串。

```Python
    import re

    content = 'Extra stings Hello 1234567 World_This is a Regex Demo Extra stings'
    #将数字1234567替换为空
    content = re.sub('\d+','', content)
    print(content)#输出替换结果
    ```
    ```Python
    import re

    content = 'Extra stings Hello 1234567 World_This is a Regex Demo Extra stings'
    #将数字1234567替换为字符串“Replacement”
    content = re.sub('\d+','Replacement',content)
    print(content)
    ```
    ```Python
    import re

    content = 'Extra stings Hello 1234567 World_This is a Regex Demo Extra stings'
    #将数字1234567替换为1234567 8910
    content = re.sub('(\d+)', r'\1 8910', content)
    print(content)#输出替换结果
```
```Python
    import re

    html = '''<div id="songs-list">
        <h2 class="title">经典老歌</h2>
        <p class="introduction">
            经典老歌列表
        </p>
        <ul id="list" class="list-group">
            <li data-view="2">一路上有你</li>
            <li data-view="7">
                <a href="/2.mp3" singer="任贤齐">沧海一声笑</a>
            </li>
            <li data-view="4" class="active">
                <a href="/3.mp3" singer="齐秦">往事随风</a>
            </li>
            <li data-view="6"><a href="/4.mp3" singer="beyond">光辉岁月</a></li>
            <li data-view="5"><a href="/5.mp3" singer="陈慧琳">记事本</a></li>
            <li data-view="5">
                <a href="/6.mp3" singer="邓丽君">但愿人长久</a>
            </li>
        </ul>
    </div>'''
    #去除a类标签（用re.sub方法提取所有歌名，提示思路：先去除a类型标签，再用正则提取每个li标签的内容）
    html = re.sub('<a.*?>|</a>','',html)
    print(html)#输出去除结果
    #正则匹配li标签内容
    result = re.findall('li.*?>(.*?)</li>',html,re.S)
    print(result)
    for item in result:#遍历每一匹配结果
        print(item.strip())#输出每一匹配结果并去除换行符
```
# re.compile
1. 将正则字符串编译成正则表达式对象
2. 将一个正则表达式串编译成正则对象，以便于复用该匹配模式

```Python
import re

content = '''Hello 1234567 World_This
is a Regex Demo'''
#编写Hello开始的这一串字符串匹配模式pattern
pattern = re.compile('Hello.*?Demo',re.S)
#用上述模式匹配
result = re.match(pattern,content)
#result = re.match('Hello.*Demo', content, re.S)
print(result)#输出匹配结果
```

# 练习题
```Python
    import requests
    import re
    content = requests.get('https://book.douban.com/').text
    pattern = re.compile('<li.*?cover.*?href="(.*?)".*?title="(.*?)".*?more-meta.*?author">(.*?)</span>.*?year">(.*?)</span>.*?</li>', re.S)
    #利用上述pattern匹配所有书籍的上述信息
    results = re.findall(pattern, content)
    for result in results:
        #分别用url,title,author,date为每一书籍信息的变量名
        url, name, author, date = result
        #将author后面的\n替换为空
        author = re.sub('\s', '', author)
        #将date后面的\n替换为空
        date = re.sub('\s', '', date)
        #同时输出每一书籍url,title,author,date信息
        print(url, name, author, date)
```
