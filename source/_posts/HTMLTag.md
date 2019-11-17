---
title: HTML 常用标签
date: 2018-11-17 08:30:58
tags:
  - HTML
  - Note
  - Web
categories:
  - [Coding,Web]
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/HTML.png
---
HTML 标签
<!--more-->
# 什么是HTML
Hyper Text Markup Language，超级文本标记语言
- 普通文本a:无特殊意义,超级文本<a>:超链接
- 超文本：文本具备特殊的功能
- 标记：超文本的组成形式<a>
- 语言：拥有自己的语法结构

# HTML基础语法
## 标记语法
标记以封闭类型划分：
1. 封闭类型标记.也称双标记，必须成对出现
<标记>内容</标记>
2. 非封闭类型的标记,也叫做空标记/单标记
<标记> 或 <标记/>

例如：
```html
<a  href=“www.baidu.com” id=“baidu-link”>标签内容</a>
```
- a 为标签名，也叫元素；
- href，id为属性；
-  双引号中的值为属性值

## 元素
指尖括号及尖括号间所包围的内容部分
元素可以包含文本内容和其他元素，也可以是空的
a. 包含文本内容：
```html
<p>这是一段文本</p>
```
b. 元素嵌套：形成更为复杂的语法
```html
<div>
  <p></p>
</div>
```
  - 注意:（1）嵌套顺序；（2）代码缩进（保证代码可读性）

c.空标记<b></b>

## 属性和值
属性是用来修饰元素的 <标记 属性="值" 属性="值">
```html
<p align="center" id="p1"></p>
```
- 常用的标准属性
    - id： 定义元素在页面中的唯一标识
    - title：鼠标移入到元素上时提示的文本
    - class：样式相关，定义元素引用的类选择器
    - style：样式相关，定义元素的行内样式

## 注释
在源码中编写，但不会被浏览器所解释的内容，成为注释.可以将对代码的解释说明放在注释中
```html
 <!--  注释内容  -->
```

## 文档结构
- 文档类型声明
    - 指定HTML的版本和风格`<!DOCTYPE html>`
- HTML页面
  表示HTML页面的开始与结束

语法
```html
<html></html>
```
 - 位于<!doctype html>之下

# HTML页面
- 包含页面头部和页面主体两部分

## 页面头部：定义页面全局信息
```html
<head></head>
```
  - 紧跟在html之后，是html中的首个子元素

  - 头部所包含的内容（子元素）
    - 网页标题：`<title>标题内容</title>`
    - 定义网页的编码格式,关键字，描述
        - 网页的编码格式：`<meta charset="utf-8">`
        - 关键字：`<meta name="keywords" content="关键字">`
        - 描述：`<meta name="description" content="描述内容">`
- 定义或引用javascript：`<script></script>`
- `<style></style>`定义内部样式
-` <link>`引入外部样式

## 页面主体：网页显示的主体内容
```html
<body></body>
```
- 属性
    - text：表示文本颜色S
    - bgcolor：表示网页的背景颜色

## 简单完整写法如下
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>页面名称</title>
    <link rel=”stylesheet“ type="text/css" href="文件路径"/>
    <style>样式</style>
    <script>js脚本</script>
</head>
    <body>
        <div>
            <p></p>
        </div>
    </body>
</html>
```
# 常用标签及属性
## 分区元素
### 块分区元素
- div ，标签用于组合其他HTML元素，本身无实在意义。

```html
<body>
    <div id="wrap">
        <div id="collapsed"></div>
        <div id="expanded"></div>
        /div>
</body>
```

### 行内分区元素
```html
<span></span>
```
- 特点 多个元素在一行内显示
- 作用 设置同一行文字内的不同格式

# 标题
```html
<h1>H1</h1>
<h2>H2</h2>
            ...
<h3>H3</h3>
<h4>H4</h4>
```
- 改变字号（一级最大，六级最小, 加粗显示,上下有垂直的空白距离,独立成行

# 链接
## 超链接
```html
<a href = " https://vitan.me">Vitan</a>
```
- 属性
    - href：链接地址
    - target：目标，打开新网页的形式
- 取值：
    -  _blank：在新标签页中打开
    -  _self：在自身页面中打开（默认值）
    -  title：鼠标放到链接上的提示

## Anchor(锚点)
```html
<a href="123.html#001">跳到001</a> 
...文字省略 
<a name="001" id="001" > </a> 
...文字省略 
```

## 电话邮件
```html
<!-- 点击后直接拨打 10086 -->
<a href="tel:10086">10086</a>    

<!-- 点击后直接给qq6@qq.com发邮件，主题为：TestObject        -->
<a href="mailto:qq@qq.com?subject=TestObject">qq@qq.com</a>     

<!-- 点击后直接给10086发信息，消息内容默认为message_body -->
<a href="sms:10086?body=message_body">给 10086 发短信</a>   
   
<!-- 点击后直接发送自己的位置 -->
<a href="geopoint:116.281469,39.866035">我的位置</a>   
```

## 协议限定符
```html
<a href = "javascript:while(1){alert('嘻嘻嘻')}">点我呀</a>
```

# 图片
```html
<img src="url" alt="some_text">
```
- url 可为网络，绝对路径，相对路径链接
- width：图像宽度
- height：图像高度

## alt 属性
- 图片占位符，浏览器无法载入图像时，替换文本属性告诉读者她们失去的信息。
```html
<img src="boat.gif" alt="Big Boat">
```

## title 属性
- 图片提示符
```html
<img src="boat.gif" title="Big Boat">
```

# 列表
## ol(有序列表)
```html
<ol type = "1" reversed = "reversed" start = “2”>
    <li>Apple</li>
    <li>Banana</li>
</ol>
 ```
- tpye
    - 1 阿拉伯数字
    - a 小写英文字母
    - A 大写英文字母
    - i 小写罗马数字
    - I 大写罗马数字
- reversd 倒叙
- start 从第几个开始

## ul(无序列表)
```htnl
<ul type = "disc">
        <li>Apple</li>
    <li>Banana</li>
</ul>
 ```
- type
    - disc 实心圆
    - square 方形
    - circle 圆


## 自定义列表
```html
<dl>
    <dt>Coffee</dt>
        <dd>- black hot drink</dd>
    <dt>Milk</dt>
        <dd>- white cold drink</dd>
</dl>
```

# 表格
```html
<table border="1">
    <tr>
        <td>row 1, cell 1</td>
        <td>row 1, cell 2</td>
    </tr>
    <tr>
        <td>row 2, cell 1</td>
        <td>row 2, cell 2</td>
    </tr>
</table>
```
- border 不定义边框属性，表格将不显示边框
- width ：设置表格的宽度
- height：设置表格的高度
- align：设置表格的对齐方式，取值: left/center/right
- border：设置表格边框宽度
- cellpadding：内边距（单元格边框与内容之间的距离）
- cellspacing：外边距（单元格之间的距离）
- bgcolor：设置表格的背景颜色

### 包含的子元素：
- `<tr></tr> `（创建表行）
    - 属性
        - align：该行内容水平对齐方式，取值: left/center/right
        - valign：该行内容的垂直对齐方式，取值: top/middle/bottom
        - bgcolor：设置表格的背景颜色

-  `<td></td>` （创建单元格）
    - 属性
        - align：内容水平对齐方式
        - valign：内容垂直对齐方式
        - width ：宽度
        - height ：高度
- `<caption></caption>` （表格标题）
- <th></th> （列标题）
    - 行标题或列标题，字体有加粗的效果，放在tr中
- `<thead></thead> `（表头）
- `<tbody></tbody>` 表主体）
- `<tfoot></tfoot>` （表尾）


## 表格表头
```html
<table border="1">
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>row 1, cell 1</td>
        <td>row 1, cell 2</td>
    </tr>
    <tr>
        <td>row 2, cell 1</td>
        <td>row 2, cell 2</td>
    </tr>
</table>
```

# 表单
- 表单元素是允许用户在表单中输入内容,比如：`文本域(textarea)`、`下拉列表`、`单选框(radio-buttons)`、`复选框(checkboxes)`等等。表单使用表单标签 <form> 来设置:
```html
<form>
.
input 元素
.
</form>   
```

## 常用的表单控件
|控件名|code|
|:---|:---|
|文本框|`<input type="text">`|
|密码框|`<input type="password">`,专属属性:maxlength：限制输入的字符数，取值：数字，readonly：设置文本控件只读|
|单选按钮|`<input type="radio">`|
|复选框|`<input type="checkbox">`,专属属性:checked，设置默认被选中|
|提交按钮|`<input type="submit">`|
|重置按钮|`<input type="reset">`|
|普通按钮|`<input type="button">`|
|图片按钮|`<input type="image" src="">` |
|隐藏域|`<input type="hidden">`|
|文件选择框|`<input type="file">`|


## 文本域 Text Fields
- `<input type="text"> `标签来设定，当用户要在表单中键入字母、数字等内容时，就会用到文本域。
```
<form>
    First name: <input type="text" name="firstname"><br>

    <!-- 密码字段通过标签<input type="password"> 来定义-->
    UserName: <input type="text" name="username"><br>
    Password: <input type="passord" name="password">
</form>
```

## 单选按钮 Radio Buttons
-  `<input type="radio">` 定义
```html
<form>
    <input type="radio" name="sex" value="male">Male<br>
    <input type="radio" name="sex" value="female">Female
</form>
```

## 复选框 Checkboxes
-  `<input type="checkbox">` 定义
```html
<form>
    <input type="checkbox" name="fruit" value="applee">Apple<br>
    <input type="checkbox" name="fruit" value="banana">Banana
</form>
```

## 提交按钮 Submit Button
- `<input type="submit"> `定义
```html
<form name="input" action="html_form_action.php" method="get">
Username: <input type="text" name="user">
<input type="submit" value="Submit">
</form>
```

实例
```html
<form method = "get" action = "">
    <p>
        UserName:<input type="text" name="username" style="color:#999" value="请输入用户名" onfocus="if(this.value == '请输入用户名'){this.value='';this.style.color='#424242'}" onblur="if(this.value==''){this.value='请输入用户名';this.style.color='#999'}">
    </p>
        <p>
        Password:<input type = "password" name = "password">
    </p>
    <input type = "submit">
</form>
```
<form method = "get" action = "">
    <p>
        UserName:<input type="text" name="username" style="color:#999" value="请输入用户名" onfocus="if(this.value == '请输入用户名'){this.value='';this.style.color='#424242'}" onblur="if(this.value==''){this.value='请输入用户名';this.style.color='#999'}">
    </p>
        <p>
        Password:<input type = "password" name = "password">
    </p>
    <input type = "submit">
</form>

#段落
## p
- 默认文字大小,独立成行,上下垂直空白
```html
<p>段1</p>
<p>段2</p>
```

## span
```html
<span></span>
```

## br 换行
 ```html
<br>
```

## hr 分割线
```html
<hr>
```
- size：尺寸，取值单位为 px（像素），可以省略
- width：宽度，取值单位为px（像素）可以省略或百分比
- color：颜色，取值自然颜色值
- align：水平对齐方式，取值：left/center/right

# 文本字体
## 加粗
```html
<strong>加粗</strong>

<b>加粗</b>
```

##斜体
```html
<em>斜体</em>

<i>斜体</i>
```

## 删除线
```html
<del>￥30<del>

<s>$30</s>
```

## 下划线
```html
<u></u>
```

## 上下标
```html
<sup>上标</sup>
<sub>下标</sub>
```

## 地址
```html
<address>地址</address>
```

# 编码与解码
|显示结果|	描述	|实体名称|	实体编号|
|:---|:---|:---|:---|
| |空格|	`&nbsp; `|	`&#160;`|
|<	|小于号|	`&lt;`	| `&#60;`|
|>	|大于号|	`&gt;`|	`&#62;`|
|&|	和号|	`&amp;`	|`&#38;`|
|"|	引号|	`&quot;`|	`&#34;`|
|'	|撇号 |`	&apos;` (IE不支持)|	`&#39;`|
|￠|	分|`	&cent;`|	`&#162;`|
|£|	镑|	`&pound;`	|`&#163;`|
|¥	|日圆	|`&yen;`|	`&#165;`|
|€|欧元	|`&euro;`	|`&#8364;`|
|§|	小节|	`&sect;`|	`&#167;`|
|©|	版权|	`&copy;` |`&#169;`|
|®	|注册商标|`	&reg;`|	`&#174;`|
|™|	商标	|`&trade;`	|`&#8482;`|
|×	|乘号	|`&times;	`|`&#215;`|
|÷|	除号|	`&divide;`|`	&#247;`|

-  [More](http://www.w3school.com.cn/tags/html_ref_entities.html)

---
**参考**
- [melody瓶子
](https://www.jianshu.com/p/57cecb7cfc4c)
- [W3School](https://www.w3schools.com/html/)
