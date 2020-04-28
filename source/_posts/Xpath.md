---
title: Xpath 升格用法
tags:
- Python
- WebCrawler
- Linux
categories:
- Coding
author:
- Vitan
toc: true
date: 2019-09-12 19:05:17
---
xpath 升格用法
<!--more-->

# 匹配当前节点下所有子节点 `.//`
```python
xpath('//div//') # div 当前节点
```
- `//` 标签下的所有标签

# 匹配某标签的属性值 `/@属性名称`
```python
# 获取 input value
xpath('//input/@value')
```

# 匹配多个路径 `|`
```python
xpath('//div/text() | //div/div/text()')
```

# 按属性匹配 `@`
```python
# 获取所有id="test"的所有文本内容
xpath('//*[@id="test"]//text()')
```

# 匹配不包含某个属性的标签 `not`
```python
# 多用于表格中匹配中不包含表头信息的数据
xpath('//table/tr[not(@class="tbhead")]')
```

# 匹配包含多个属性的标签 `and`
```python
# 匹配所有的tr中不包含 tbhead 属性 和包含 head 的tr标签
xpath('//table/tr[not(@class="tbhead") and @class="head"]')
```

# 匹配包含不同属性的名称相同的标签 `or`
```python
# 匹配包含class="speedbar" 或者 class="content-wrap" 的标签
xpath（'//div[@class="speedbar" or @class="content-wrap"]'）
```

# 将对象还原为字符串 `etree.tostring（）`
```python
# 将匹配到的对象，作为etree.tostring（）的参数即可，  注： 返回字符串
sObj = xml.xpath('//*[@id="test"]')[0]# 使用xpath定位一个节点
sStr = etree.tostring(sObj)
```

# 按轴(Axes)匹配
## 选取当前节点的所有子元素 `child`
```python
# 获取div下的tr的标签
xpath('//div[@id="testid"]/child::tr/td/text()')
# 感觉这种方法鸡肋， 也可以实现
xpath('//div[@id="testid"]//tr/td') 
```

## 选取当前节点的所有属性 `attribute`
```python
# 获取div标签所有的属性值
xpath('//div/attribute::*') 
# 感觉这种方法鸡肋，//div/@* 同样能实现
```

## ancestor：父辈元素 / ancestor-or-self：父辈元素及当前元素
```python
# 获取父辈元素的div的所有属性值， 在不好定位的情况下，通过孩子标签定位，这种方法可以用
xpath('//div[@id="test"]/ancestor::div/@*')
xpath('//div[@id="test"]/ancestor-or-self::div/@*')
```

## descendant：后代 / descendant-or-self：后代及当前节点本身
```python
# 获取孩子元素的div的所有属性值，感觉鸡肋
xpath('//div[@id="test"]/descendant::div/@*')
xpath('//div[@id="test"]/descendant-or-self::div/@*')
```

## 选取当前节点的所有命名空间节点 `namespace`
```python
xpath('//div[@id="test"]/namespace::*')
```

## 定位 `position`
```python
# 和通过下标定位一样， 方法鸡肋
xpath('//*[@id="test"]/ol/li[position()=2]/text()')
```

# Xpath 函数
## 统计数量 `count`
```python
# 统计符合要求节点的数量,返回字符串
xpath('count(//tr[@info])')
```

## 字符串拼接 `concat`
```python
# 统计出来的两个内容的字符串进行“ + ”处理,返回字符串
xpath('concat(//li[@id="one"]/text(),//li[@id="three"]/text())')
```

## 解析当前节点下的字符 `string`
```python
# string()直解析匹配的第一个标签的值，  注： 返回字符串
xpath('string(//tr)') 
```

## 获取当前节点的节点名称 `local-name`
```python
# 返回当前属性的节点名称，  注： 返回字符串
xpath('local-name(//*[@id="test"])')
```

## 以指定的字符开头 `starts-with`
```python
# starts-with定位属性值以8开头的li元素
xpath('//tr[starts-with(@code,"one")]/text()')
```

## 小于 `<`
```python
# 匹配所有tr标签属性info小于200的内容
xpath('//tr[@info<200]/text()')
```

## 根据指定的文本内容选择
```python
# 指定的文本内容可以是文本内容的部分， 也可以是全部
xpath('//div[2]/ul/li[contains(text(), "指定的文本内容")]/span/text()'
```

--- 
**Via**
- [作者:董小贱](https://www.jianshu.com/p/4fef4142b33f)