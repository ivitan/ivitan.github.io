---
title: Excel 函数
date: 2018-11-15 10:37:33
tags:
  - Excel
  - Note
categories:
  - Diary
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Excel.png
---
Excel 函数
<!---more--->
# 数字处理
取绝对值
```
=ABS(数字) 
# 如：
ABS(-2) =2
```

向下取整
```
=INT(数字) 
# 如：
INT(5.6)=5 ; INT(5.2)=5
```

四舍五入
```
=ROUND(数字,小数位数) 
# 如： 
ROUND(5.6,0)=6 ; ROUND(5.2,0)=5
```

# 判断公式

- 把公式产生的错误值显示为空
```
C2=IFERROR(A2/B2,"") 
#  如：
IFERROR(2/0,"错误") = "错误"
```
  - 说明：如果是错误值则显示为空，否则正常显示。


- IF多条件判断返回值
```
C2=IF(AND(A2<500,B2="未到期"),"补款","")
```
  - 说明：两个条件同时成立用AND,任一个成立用OR函数。

# 统计公式
统计两个表格重复的内容
```
B2=COUNTIF(Sheet15!A:A,A2)
```
  - 说明：如果返回值大于0说明在另一个表中存在，0则不存在。

统计不重复的总人数
```
C2=SUMPRODUCT(1/COUNTIF(A2:A8,A2:A8))
```
  - 说明:用COUNTIF统计出每人的出现次数，用1除的方式把出现次数变成分母，然后相加。

# 求和公式
隔列求和
```
H3=SUMIF($A$2:$G$2,H$2,A3:G3) 
或
=SUMPRODUCT((MOD(COLUMN(B3:G3),2)=0)*B3:G3)
```
  - 说明：如果标题行没有规则用第2个公式

单条件求和
```
F2=SUMIF(A:A,E2,C:C)
```
  - 说明：SUMIF函数的基本用法

单条件模糊求和
```
=SUMIF(A2:A4,"*A*",C2:C4)
=SUMIF(A2:A4,"*A*",C2:C4)
=SUMIF(A2:A4,"*A*",C2:C4)
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8kdqfs8nj209507fwgx.jpg)

  - 说明：如果需要进行模糊求和，就需要掌握通配符的使用，其中星号是表示任意多个字符，如"*A*"就表示a前和后有任意多个字符，即包含A。

多条件模糊求和
```
C11=SUMIFS(C2:C7,A2:A7,A11&"*",B2:B7,B11)
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8kexfwl2j209t065tat.jpg)
  - 说明：在sumifs中可以使用通配符*


多表相同位置求和
```
b2=SUM(Sheet1:Sheet19!B2)
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8kgfwoxlj208y04n75k.jpg)
  - 说明：在表中间删除或添加表后，公式结果会自动更新。


按日期和产品求和
```
F2=SUMPRODUCT((MONTH($A$2:$A$25)=F$1)*($B$2:$B$25=$E2)*$C$2:$C$25)
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8khi926oj20a005xgob.jpg)
  - 说明：SUMPRODUCT可以完成多条件求和

# 查找与引用公式
单条件查找公式
``` 
C11=VLOOKUP(B11,B3:F7,4,FALSE)
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8kligjavj20a606gdiu.jpg)
  - 说明：查找是VLOOKUP最擅长的，基本用法


双向查找公式
```
=INDEX(C3:H7,MATCH(B10,B3:B7,0),MATCH(C10,C2:H2,0))
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8kmqj7r8j20d3074n10.jpg)
  - 说明：利用MATCH函数查找位置，用INDEX函数取值


查找最后一条符合条件的记录。
```
C13 = LOOKUP(1,0/(C5:C10=B13),D5:D10)
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8kngxy5tj209v07tjt9.jpg)
  - 说明：0/(条件)可以把不符合条件的变成错误值，而lookup可以忽略错误值

## 多条件查找
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8kppnnmaj20d808c0vh.jpg)
  - 说明:公式原理同上一个公式

指定区域最后一个非空值查找
```
B14=LOOKUP(1,0/(B2:B13<>""),$A2:$A13)
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8kquebpdj20ax0a8jun.jpg)

按数字区域间取对应的值
```
D9=VLOOKUP(C9,B$4:C$6,2)
or
D9=LOOKUP(C9,B$4:B6,C$4:C$5)
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8l4ove6sj20as0bgwje.jpg)
  - 公式说明：VLOOKUP和LOOKUP函数都可以按区间取值，一定要注意，销售量列的数字一定要升序排列。

# 字符串处理公式
多单元格字符串合并
```
C2=PHONETIC(A2:A7)
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8kvrf9x1j208x05kjsa.jpg)
  - 说明：Phonetic函数只能对字符型内容合并，数字不可以。

截取除后3位之外的部分
```
=LEFT(D1,LEN(D1)-3)
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8kwlf6hnj20700493yv.jpg)
  - 说明：LEN计算出总长度,LEFT从左边截总长度-3个

截取-前的部分
```
B2=Left(A1,FIND("-",A1)-1)
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8l7paax9j208m04cwfu.jpg)
  - 说明：用FIND函数查找位置，用LEFT截取。

截取字符串中任一段的公式
```
B1=TRIM(MID(SUBSTITUTE($A1," ",REPT(" ",20)),20,20))
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8l8kx8szj20br04cwf1.jpg)
  - 说明:公式是利用强插N个空字符的方式进行截取


字符串查找
```
B2=IF(COUNT(FIND("河南",A2))=0,"否","是")
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8l9u3emjj209004wgml.jpg)
  - 说明: FIND查找成功，返回字符的位置，否则返回错误值，而COUNT可以统计出数字的 个数，这里可以用来判断查找是否成功。

字符串查找一对多
```
B2=IF(COUNT(FIND({"辽宁","黑龙江","吉林"},A2))=0,"其他","东北")
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8lbzg388j209s059gn7.jpg)
  - 说明：设置FIND第一个参数为常量数组，用COUNT函数统计FIND查找结果

# 日期计算公式
两日期相隔的年、月、天数计算
- A1是开始日期（2011-12-1），B1是结束日期(2013-6-10)。
    - 相隔多少天？`=datedif(A1,B1,"d")` 结果：557
    - 相隔多少月? `=datedif(A1,B1,"m") `结果：18
    - 相隔多少年? `=datedif(A1,B1,"Y")` 结果：1
    - 不考虑年相隔多少月？`=datedif(A1,B1,"Ym")` 结果：6
    - 不考虑年相隔多少天？`=datedif(A1,B1,"YD")`  结果：192
    - 不考虑年月相隔多少天？`=datedif(A1,B1,"MD") `结果：9
  - datedif函数第3个参数说明：
    - "Y" 时间段中的整年数。
    - "M" 时间段中的整月数。
    -  "D" 时间段中的天数。
    -  "MD" 天数的差。忽略日期中的月和年。
    -  "YM" 月数的差。忽略日期中的日和年。
    - "YD" 天数的差。忽略日期中的年。

扣除周末天数的工作日天数
```
C2=NETWORKDAYS.INTL(IF(B2<DATE(2015,1,1),DATE(2015,1,1),B2),DATE(2015,1,31),11)
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx8lgn3f80j209z06amyx.jpg)
  - 说明：返回两个日期之间的所有工作日数，使用参数指示哪些天是周末，以及有多少天是周末。周末和任何指定为假期的日期不被视为工作日

---
**Via**
- [链接](https://blog.csdn.net/HaHa_Sir/article/details/78970082)
