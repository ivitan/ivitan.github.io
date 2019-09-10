---
title: Scrapy
date: 2018-11-27 11:57:17
tags:
  - WebCrawler
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
Scrapy 命令
<!--more-->
# 安装
```bash
sudo pip install scrapy
```

# 创建/运行
## 创建项目
```python
scrapy startproject projectName
```

## 项目 tree
```bash
├── scrapy.cfg  项目的配置文件
└── zhihu  该项目的python模块。之后您将在此加入代码
    ├── __init__.py
    ├── items.py  项目中的 item 文件.
    ├── middlewares.py
    ├── pipelines.py
    ├── __pycache__
    ├── settings.py  项目的设置文件
    └── spiders  放置 spider 代码的目录
        ├── __init__.py
        └── __pycache__
```

## 创建新的 spider
```python
scrapy genspider mydomain mydomain.com
```

## 运行
```python
scrapy crawl mydomain
```

# 项目操作
```python
scrapy crawl zhihu # 执行项目
scrapy check [-l] <zhihu> # 检查错误
scrapy list # 返回 spider 名称
scrapy edit <zhihu> # 在命令行编辑
scrapy fetch url # 下载网页源码
scrapy fetch --nolog url # 无日志
scrapy fetch --nolog --no-redirect url # 重定向
scrapy view url # 下载网页后浏览器打开
scrapy shell # 交互模式
scrapy crawl user -o items.json # 保存数据（sv,xml,json,jsonlines,pickle,marshal）
```

# 选择器
网页源码

```html
  <html>
  <head>
    <base href='http://example.com/' />
    <title>Example website</title>
  </head>
  <body>
    <div id='images'>
    <a href='image1.html'>Name: My image 1 <br /><img src='image1_thumb.jpg' /></a>
    <a href='image2.html'>Name: My image 2 <br /><img src='image2_thumb.jpg' /></a>
    <a href='image3.html'>Name: My image 3 <br /><img src='image3_thumb.jpg' /></a>
    <a href='image4.html'>Name: My image 4 <br /><img src='image4_thumb.jpg' /></a>
    <a href='image5.html'>Name: My image 5 <br /><img src='image5_thumb.jpg' /></a>
    </div>
  </body>
  </html>
```

交互模式下

```python
crapy shell https://doc.scrapy.org/en/latest/_static/selectors-sample1.html
```

1. 构建一个选择器来选择title标签内的文本

```python
# xpath
response.selector.xpath('//title/text()')
# selector 可省略
response.xpath('//title/text()')
  
# css
response.css('title::text')
```

提取文本数据，必须调用selector .extract() 方法

```python
response.xpath('//title/text()').extract() # 所有
response.css('title::text').extract_first() # 第一个
```

2. 获取属性

```python
response.xpath('//a/Ahref').extract()
response.css('a::attr(href)').extract()

response.css('img').xpath('@src').extract()
response.xpath('//div[@id="images"]/a/text()').extract_first()
```

default 默认返回值作为参数

```python
response.xpath('//div[@id="not-exists"]/text()').extract_first(default='not-found')
```

3. 获取文本内容

```python
response.xpath('//a/text()').extract()
response.css('a::text()').estract()
```

4. 模糊查找(属性名包含)

```python
# 查找三星包含image
response.xpath('//a[contains(@href,"image")]/@href').extract()
response.css('a[href* = image]::attr(href)').extract()

# a 标签里面的image里的src属性
response.xpath("//a[contains(@href,'image')]/img/@src").extract()
response.css('a[href* = image] img::attr(src)').extract()
```


## 嵌套选择器

1. xpath,css

```python
links = response.xpath('//a[contains(@href, "image")]')
links.extract()
for index, link in enumerate(links):
  args = (index, link.xpath('@href').extract(), link.xpath('img/@src').extract())
  print 'Link number %d points to url %s and image %s' % args
```

## 具有正则表达式的选择器
```python
  response.css('a::text').re('Name\:(.*)') # 返回的是列表
  response.css('a::text').re_first('Name\:(.*)') # 第一个值
  response.css('a::text').re_first('Name\:(.*)').strip() # 去空格

  # 提取图像名称
  response.xpath('//a[contains(@href, "image")]/text()').re(r'Name:\s*(.*)')

  # 提取第一个匹配的字符串
  response.xpath('//a[contains(@href, "image")]/text()').re_first(r'Name:\s*(.*)')
```

# 定义 Item
Item 是保存爬取到的数据的容器；其使用方法和python字典类似.

- 编辑 tutorial 目录中的 items.py 文件:

```python
import scrapy

class DmozItem(scrapy.Item):
    title = scrapy.Field()
    link = scrapy.Field()
    desc = scrapy.Field()
```
---
**官方文档**
- [英文](https://docs.scrapy.org/en/latest/)
- [中文](https://scrapy-chs.readthedocs.io/zh_CN/1.0/index.html)
