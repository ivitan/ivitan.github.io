---
title: Hexo Cutie 主题 Markdown 语法
date: 2018-07-11 13:51:07
tags:
  - Typography
  - Markdown
  - Hexo
categories:
  - notes
author:
  name: Qu Tang
toc: true
enable_unread_badge: true
thumbnail: /images/Typography.png
---
Hexo Cutie 主题 Markdown 语法
<!--more-->
# 安装

文章使用 `hexo-renderer-markdown-it`作为渲染器,因此需要安装此渲染器以达到效果。

```bash installation
npm un hexo-renderer-marked --save
npm i hexo-renderer-markdown-it --save
npm i markdown-it-emoji --save
npm i markdown-it-mark --save
npm i markdown-it-deflist --save
npm i markdown-it-container --save
```

# 配置
添加以下内容到站点的`_config.yml`.

```yml _config.yml
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: false
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
    - markdown-it-abbr
    - markdown-it-footnote
    - markdown-it-ins
    - markdown-it-sub
    - markdown-it-sup
    - markdown-it-deflist
  anchors:
    level: 2
    collisionSuffix: 'v'
    permalink: false
    permalinkClass: header-anchor
    permalinkSymbol: " "
    permalinkBefore: false
```

# 使用
---

## 标题

```markdown source code
# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
```

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## 水平分割线

```markdown source code
___

---

***
```

___

---

***

## 排版替换

```markdown source code
(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'
```

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'

## 着重

```markdown source code
**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~
```

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

## 引用

```markdown source code
> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.
```

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

## 清单

### 无序
```markdown source code
+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!
```
+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

### 有序

```markdown source code
1. Lorem ipsum dolor sit amet
  1. Indented list
    1. Another level
  2. Indent
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
```

1. Lorem ipsum dolor sit amet
  1. Indented list
    1. Another level
  2. Indent
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

```markdown source code
1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`
```

1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

#### 用偏移符号编号

```markdown source code
57. foo
1. bar
```

57. foo
1. bar

## 代码

```markdown source code
Inline `code`
```

Inline `code`

### 代码缩进

```markdown source code
// Some comments
    line 1 of code
    line 2 of code
    line 3 of code
```

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

### 代码区块

~~~markdown source code
```
Sample text here...
```
~~~

```
Sample text here...
```

语法高亮显示
~~~markdown source code
``` js sample.js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```
~~~

``` js sample.js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## 表格

```markdown source code
| Option | Description |Description | Description | Description | Description |
| ------ | ----------- |----------- | ----------- | ----------- | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
```

| Option | Description | Description | Description | Description | Description |
| ------ | ----------- | ----------- | ----------- | ----------- | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

### 列右对齐

``` markdown source code
| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
```

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

## 链接

```markdown source code
[link text](http://dev.nodeca.com)
```

[link text](http://dev.nodeca.com)

```markdown source code
[link with title](http://nodeca.github.io/pica/demo/ "title text!")
```

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

```markdown source code
Autoconverted link https://github.com/nodeca/pica (enabled linkify)
```

Autoconverted link https://github.com/nodeca/pica (enabled linkify)

## 图片

```markdown source code
![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")
```
![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

与链接一样，图片也有脚注样式语法

```markdown source code
![Alt text][id]

在文档的后面定义 URL 的位置

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"
```

![Alt text][id]

在文档的后面定义 URL 的位置

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

## 插件

`markdown-it` 渲染器完美支持[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin)。例如 [configuration snippet](#configuration)

### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

```markdown source code
Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:

Shortcuts (emoticons): :-) :-( 8-) ;)
```

Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:

Shortcuts (emoticons): :-) :-( 8-) ;)

### [上标](https://github.com/markdown-it/markdown-it-sub) / [下标](https://github.com/markdown-it/markdown-it-sup)

```markdown source code
Superscript: 19^th^

Subscript: H~2~O
```
Superscript: 19^th^

Subscript: H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

```markdown source code
++Inserted text++
```

++Inserted text++

### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

```markdown source code
==Marked text==
```

==Marked text==

### [脚注](https://github.com/markdown-it/markdown-it-footnote)

```markdown source code
Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.
```

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

### [定义列表](https://github.com/markdown-it/markdown-it-deflist)


```markdown source code
Term 1
:   定义 1
带有延迟继续。.
```

Term 1
:   定义 1
带有延迟继续。

```markdown source code
第 2 项带有 * 内联标记 *
:   定义 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.
```

Term 2 with *inline markup*
:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

```markdown source code
Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b
```

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b

### [缩略形式 / 缩写](https://github.com/markdown-it/markdown-it-abbr)

```markdown source code
这是 HTML 缩写的例子。

它转换成 “HTML”，但保留“xxxHTMLyy” 等完整的部分条目。

*[HTML]：超文本标记语言
```
这是 HTML 缩写的例子。

它转换成 “HTML”，但保留“xxxHTMLyy” 等完整的部分条目

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::

## Hexo 内置标签

### 引用，带作者名字

```swig source code
{% blockquote David Levithan, Wide Awake %}
Do not just seek happiness for yourself. Seek happiness for all. Through kindness. Through mercy.
{% endblockquote %}
```

{% blockquote David Levithan, Wide Awake %}
Do not just seek happiness for yourself. Seek happiness for all. Through kindness. Through mercy.
{% endblockquote %}

### 引用 Twitter
```swig source code
{% blockquote @DevDocs https://twitter.com/devdocs/status/356095192085962752 %}
NEW: DevDocs now comes with syntax highlighting. http://devdocs.io
{% endblockquote %}
```

{% blockquote @DevDocs https://twitter.com/devdocs/status/356095192085962752 %}
NEW: DevDocs now comes with syntax highlighting. http://devdocs.io
{% endblockquote %}

### 引用网络链接

```swig source code
{% blockquote Seth Godin http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html Welcome to Island Marketing %}
Every interaction is both precious and an opportunity to delight.
{% endblockquote %}
```

{% blockquote Seth Godin http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html Welcome to Island Marketing %}
Every interaction is both precious and an opportunity to delight.
{% endblockquote %}

### 抽取引用

```swig source code
{% pullquote %}
content
{% endpullquote %}
```

{% pullquote %}
content
{% endpullquote %}

### jsFiddle

```swig source code
{% jsfiddle o2gxgz9r default light %}
```
{% jsfiddle o2gxgz9r default light %}

### Gist

```swig source code
{% gist b6365e79be6052e7531e7ba6ea8caf23 'Sample gist' %}
```

{% gist b6365e79be6052e7531e7ba6ea8caf23 'Sample gist' %}

### iFrame

```swig source code
{% iframe https://www.bing.com %}
```
{% iframe https://www.bing.com %}

### 新标签页打开链接

```swig source code
{% link Google https://www.google.com default Google %}
```
{% link Google https://www.google.com default Google %}

### Youtube

```swig source code
{% youtube l_lblj8Cq0o %}
```

{% youtube l_lblj8Cq0o %}

---
# 原文链接
- [Hexo Theme Cutie v2.0.12 Typography Demo](http://qutang.github.io/2017/12/20/post-typography-and-tags-test/)
