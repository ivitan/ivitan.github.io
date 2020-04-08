---
title: CSS 选择器
date: 2018-11-18 08:52:54
tags:
  - HTML
  - CSS
  - Note
  - Web
categories:
  - Coding
author:
  name: Vitan
toc: true
---
Css 选择器与权重
<!--more-->
# 引入 CSS

## 行间引入
```css
<div style = "width:100px;height:100px;>
</div>
 ```
## 页面级引入(内嵌式)
- `<head>` 和 `</head>` 之间

```css
    <style type="css/text">
    .text{
        font-size: 20px;
        padding-left: o;
        margin: 0 auto;
    } 
    </style> 
 ```

## 导入式

1. 在style元素中导入CSS文件

```css
<style type="text/css">    
@import "CSS样式文件的绝对地址";
@import url("样式文件的绝对地址");
</style>        
```
2. 在CSS文件中再导入CSS文件

```css
/*某个CSS文件*/
@import "另一个CSS文件的地址";
.test{
   width: 100px;
   height: 100px;
   line-height: 20px;
   background-color: red; 
}
```

## 链接式
- 网页的 `<head></head>` 标签对中使用`<link>` 标记来引入外部样式表文件

```css
<link type="text/css" rel="stylesheet" href="CSS样式文件的地址">
 ```
# 选择器
## 基础选择器
|选择器|	含义|	实例|
|:--- |:--- |:---|
|*	|通用选择器，匹配任何元素|	*{font-size:16px;}|
|E	|标签选择器，匹配所有使用E标签的元素|	p{font-family:arial;}|
|.error	|class选择器，匹配所有class属性中包含error的元素|	.error{font-weight:bold;}|
|#correct	|id选择器，匹配所有id属性值为correct的元素|	#correct{font-style:italic;}|


- id(唯一)

```html
<div id="only>
123
</div>
 ```
```css
#only{
   background-color: red;
  }
```

- class

```html
<div class="only>
123
</div>
```
```css
.only{
  background-color: red;
}
```
  - 可以有多个 class

## 标准选择器
- 会选择所有相同元素

```html
<div>123
</div>
...
<span>123
```
```css
div {
  background-color: red;
}
span{
   background-color: green;
 }
```
	

通配符选择器 
- 会匹配所有的元素

```html
<div></div>
...
<span></span>
```
```css
*{
  margin:0px;
  padding:0px;
}
```

## 组合选择器
|选择器|	含义|	实例|
|:--- |:--- |:---|
|E,F	|多元素选择器，同时匹配所有E元素或F元素|	div,p{background-attachment:fixed;}|
|E F	|后代元素选择器，匹配所有属于E元素的后代F元素	|div a{background-color:blue;}|
|E > F	|子元素选择器，匹配所有E元素的子元素F	|div>p{background-image:url(xxx.gif)}|
|E+F	|毗邻元素选择器，匹配所有紧随E元素之后的同级元素F	|p+div{background-position:x% y%}|


- 父子选择器/派生选择器

```html
<div>
    <span>
    </span>
</div>
```
```css
div span{
   background-color: red;
}
```

- 直接子元素选择器

```html
<div>
   <em>134</em>
    <strong>
         <em>323</em>
    </strong>
</div>
```
```css
div > em{
    background-color: green;
}
```

- 并列选择器

```html
<div>1</div>
<div class ="demo">2</div>
<p class = "demo1">3</p>
```
```css
div.demo{
   background-color: green;
}
```

- 分组选择器

```html
<em>1</em>
<strong>2</strong>
<spam>3</spam>
```
```css
em,
strong,
span{
   background-color: red;
}
    ```
## 伪类选择器
|选择器 |	含义 |
|:--- |:--- |
|E:first-child	 |匹配父元素E下的第一个子元素 |	
|E:link	 |	匹配所有未被点击的链接 |
|E:visited	 |	匹配所有已被点击的链接 |
|E:active	 |	匹配鼠标已经按下、还没有释放的E元素 |
|E:hover	 |	匹配鼠标悬停其上的E元素 |
|E:focus	 |	匹配获得当前焦点的E元素 |
|E:lang(c)	 |	匹配lang属性等于c的E元素 |

## 属性选择器
|选择器|	含义|	实例|
|:--- |:--- |:---|
|E[att]	|匹配所有具有att属性的E元素|	p[style]{background-repeat:repeat-y;}|
|E[att=val]|	匹配所有att属性等于“val”的E元素	|div[class="c1"]|
|E[att~=val]	|匹配所有att属性具有多个空格分隔的值、其中一个值等于“val”的E元素|	div[class~=c2]|
E[att｜=val]|	匹配所有att属性具有多个连字号分隔（hyphen-separated）的值、其中一个值以“val”开头的E元素|	p[lang｜=en]|

 ## 伪元素
|选择器|	含义|	实例|
|:--- |:--- |:---|
|E:first-line	|匹配E元素的第一行	|p:first-line{color:red;}|
|E:first-letter	|匹配E元素的第一个字母|	.c1:first-letter{color:blue;}|
|E:before	|在E元素之前插入生成的内容|	.ctn before{content:"";display:block;;height:40px;width:40px;}|
|E:after	|在E元素之后插入生成的内容|	.ctn after{content:"";display:block;;height:40px;width:40px;}   |


# 选择器的权重
- !important > 行间样式 > id > class | 属性 > 标签选择器 > 通配符

|选择器 | 权重 |
|:--- |:---: |
|!important|Infinity|
|行间样式|100|
|id|100|
|class、属性、伪累|10|
|标签、伪属性|1|
|通配符|0|

## 权重的计算
1. 在比较样式的优先级时，只需统计选择符中的id、class和标签名的个数，然后把相应的权值相加即可，最后根据结果排出优先级
2. 权值较大的优先级越高，权值相同的，后定义的优先级较高，样式值含有`！important`，优先级最高
	- div .class1 #people 的权值等于 1+10+100=111


# 颜色的三种方法
## 纯英文单词
 ```css
color: red
```

## 十六进制颜色
`＃RRGGBB`，其中 RR（红色），GG（绿色）和 BB（蓝色）。所有值必须介于0和FF之间。
```css
 color: #ff4040
```
- 两位相同可以缩写

```css
 color: # f40;
```

## RGB
RGB（红，绿，蓝）。每个参数（红色，绿色和蓝色）定义颜色的亮度，可在0和255之间，或一个百分比值（从0％到100％）之间的整数。
```css
background-color:rgba(255,0,0,0.5);
```

---
**参考**
- [W3School](https://www.w3cschool.cn/css/css-selector.html)
- [CSS选择器与优先级浅析](https://www.jianshu.com/p/a53ba8e1fe72)
