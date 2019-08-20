---
title: jQuery Selector
date: 2019-03-23 13:39:32
tags:
- jQuery
- HTML
- CSS
categories:
- notes
author:
name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/jQuery.png
---
jQuery 选择器
<!--more-->
#元素选择器
```js
// id 选择器
$("#myELement")

// 元素选择器
$("div")
$("span")
$("button")
...

// .class 选择
$(".myClass")

// 通配符选择(选取所有元素)
$("*")
```

# 层叠选择器
```js
    //所有form元素中的input元素 
    $("form input") 

    //id值为main的所有的子元素
    $("#main > *")   

    /*所有的label元素的下一个input元素节点，
    返回的是label标签后面直接跟一个input标签的所有input标签元素 */       
    $("label + input") 

    //同胞选择器，返回id为prev的标签元素的所有的属于同一个父元素的div标签
    $("#prev ~ div")       
```

#基本过滤选择器
```js
//所有tr元素的第一个
$("tr:first")

//所有tr元素的最后一个 s
$("tr:last") 

//过滤掉：checked的选择器的所有的input元素 
$("input:not(:checked) + span")  

//所有的tr元素的第1，3，5... ...个元素 
("tr:odd") 

//所有的td元素中序号为2的那个td元素
$("td:eq(2)") 

//td元素中序号大于4的所有td元素 
$("td:gt(4)")   

td元素中序号小于4的所有的td元素     
$("td:ll(4)")   

//所有标题元素（h1 - h6）
$(":header") 

$("div:animated") 
```

# 内容过滤选择器
```js
//所有div中含有John文本的元素
$("div:contains('John')")

//所有的为空（也不包括文本节点）的td元素的数组 
$("td:empty")        

//所有含有p标签的div元素   
$("div:has(p)")      

//所有的以td为父节点的元素数组 
$("td:parent")        
```

# 可视化过滤选择器
```js
//所有的被hidden的div元素 
$("div:hidden")  

//所有的可视化的div元素    
$("div:visible")
```

# 属性过滤选择器
```js
//含有id属性的div元素 
$("div[id]")

//name属性等于'newsletter'的input元素 
$("input[name='newsletter']")
    
//name属性不等于'newsletter'的input元素 
$("input[name!='newsletter']")
    
//name属性以'news'开头的input元素 
$("input[name^='news']") 

// name属性以'news'结尾的input元素 
$("input[name$='news']")   

//name属性包含'news'的input元素     
$("input[name*='man']")          
    
//可以使用多个属性进行联合选择，得到所有的含有id属性并且属性以man结尾的元素 
$("input[id][name$='man']")    
```

# 子元素过滤选择器
```js
$("ul li:nth-child(2)"),$("ul li:nth-child(odd)"),$("ul li:nth-child(3n + 1)") 

//返回所有的div元素的第一个子节点的数组
$("div span:first-child")   

//返回所有的div元素的最后一个节点的数组 
$("div span:last-child") 

//返回所有的div中只有唯一一个子节点的所有子节点的数组 
$("div button:only-child")       
```

# 表单元素选择器： 
```js
//所有的表单输入元素，包括input, textarea, select 和 button 
$(":input")  
    
//所有的text input元素 
$(":text")                     

//所有的password input元素 
$(":password")           

//所有的radio input元素
$(":radio")                    

//所有的checkbox input元素
$(":checkbox")             

//所有的submit input元素 
$(":submit")               

// 所有的image input元素 
$(":image")                

//所有的reset input元素 
$(":reset")                   

//所有的button input元素 
$(":button")                

// 所有的file input元素 
$(":file")                    

// 所有类型为hidden的input元素或表单的隐藏域 
$(":hidden")              
```

# 表单元素过滤选择器
```js 
//所有的可操作的表单元素 
$(":enabled")             

//所有的不可操作的表单元素 
$(":disabled")            

//所有的被checked的表单元素
$(":checked")             

//所有的select 的子元素中被selected的元素 
$("select option:selected") 
```
```jquery
//选取一个 name 为”S_03_22″的input text框的上一个td的text值
$(”input[@ name =S_03_22]“).parent().prev().text() 
    
//名字以”S_”开始，并且不是以”_R”结尾的
$(”input[@ name ^='S_']“).not(”[@ name $='_R']“) 
    
//一个名为 radio_01的radio所选的值
$(”input[@ name =radio_01][@checked]“).val(); 
```
```jquery
//查找A元素下面的所有子节点，包括非直接子节点
$("A B") 

//查找A元素下面的直接子节点
$("A>B") 

//查找A元素后面的兄弟节点，包括非直接子节点
$("A+B") 

//查找A元素后面的兄弟节点，不包括非直接子节点
$("A~B")  
```
