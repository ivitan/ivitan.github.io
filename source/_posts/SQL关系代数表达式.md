---
title: SQL 关系代数表达式
date: 2018-06-30 21:58:04
tags:
- SQL
categories: notes
toc: true
thumbnail: /images/SQL.png
---
关系代数是关系数据库系统查询语言的理论基础。很有必要学习一下，有些是用代数表达式很方便的东西，用SQL写出来还是挺麻烦的，并不是想象当中那么直接。
<!--more-->
# 一、关系代数的9种操作
 关系代数中包括了：并、交、差、乘、选择、投影、联接、除、自然联接等操作。

五个基本操作
并(∪)、差(-)、笛卡尔积(×)、选择(σ)、投影(π)

四个组合操作
1. 交(∩) 	2. 联接(等值联接) 	3. 自然联接(R⋈S) 	4. 除法(÷)

注2：等值连接表示先做笛卡尔积(×)之后，对相应列进行选择或等值关联后的结果(仅筛选行、不筛选列)

注2：自然连接表示两个关系中若有相同名称的属性，则自动作为关联条件，且仅列出一列

补充各种符号
1. 投影 π
2. 选择 σ
3. 重命名 ρ
4. 自然连接 ⋈
5. θ-连接和相等连接 
6. 半连接 ⋉ , ⋊
7. 反连接 ▷
8. 除法 ÷
9. 左外连接 ⟕
10. 右外连接 ⟖
11. 全外连接 ⟗

# 二、关系代数表达式

由关系代数运算经有限次复合而成的式子称为关系代数表达式。这种表达式的运算结果仍然是一个关系。可以用关系代数表达式表示对数据库的查询和更新操作。

# 三、举例说明

设教学数据库中有3个关系：

学生关系S(SNO,SNAME,AGE,SEX)

学习关系SC(SNO,CNO,GRADE)

课程关系C(CNO,CNAME,TEACHER)

1. 检索学习课程号为C2的学生学号与成绩
```sql
SELECT SNO,GRADE
  FROM SC
WHERE CNO='C2'
```
```
π SNO,GRADE(σCNO='C2'(SC))
```
2. 检索学习课程号为C2的学生学号与姓名
```sql
SELECT SC.SNO,S.SNAME
FROM SC,S
WHERE SC.SNO=S.SNO
AND SC.CNO='C2'
```
```
π SNO,SNAME(σCNO='C2'(S⋈SC))
此查询涉及S和SC，先进行自然连接，然后再执行选择投影操作。
```
```
π SNO,SNAME（S）cross（πSNO(σCNO='C2'(SC))）
自然连接的右分量为"学了C2课的学生学号的集合"。
此表达式比前一个表达式优化，执行起来要省时间、省空间。
```
3. 检索选修课程名为MATHS的学生学号与姓名
```sql
SELECT SC.SNO,S.SNAME
FROM SC,S,C
WHERE SC.SNO=S.SNO
AND SC.CNO=C.CNO
AND C.CNAME='MATHS'
```
```
π SNO,SANME(σCNAME='MATHS'(S⋈SC⋈C))
```
4. 检索选修课程号为C2或C4的学生学号
```sql
SELECT SNO
FROM SC
WHERE CNO='C2'
OR CNO='C4'
```
```
π SNO(σ CNO='C2'∨CNO='C4'(SC))
```
5. 检索至少选修课程号为C2或C4的学生学号
```sql
SELECT SA.SNO
FROM SC AS SA,SC AS SB
WHERE SA.SNO=SB.SNO
AND SA.CNO='C2'
AND SB.CNO='C4'
```
```
π 1(σ1=4∧2='C2'∧5='C4'（SC×SC）)
```
6. 检索不学C2课的学生姓名与年龄
```sql
SELECT SNAME,AGE
FROM S
MINUS
SELECT S.SNAME,S.AGE
FROM SC,S
WHERE SC.SNO=S.SNO
AND SC.CNO='C2'
```
```
π SNAME,AGE（S）－πSNAME,AGE(σCNO='C2'（S⋈SC）)
```
7. 检索学习全部课程的学生姓名
```
π SNO,CNO(SC)÷πCNO(C)
先用除法取出选取所有课程的SNO集(除法可以理解为一个Filter)
π SNAME(S ⋈ (πSNO,CNO(SC)÷πCNO(C)))
再关联S表取出SNAME
```
8. 检索所学课程包含S3所学课程的学生学号
```
π SNO,CNO(SC)÷ πCNO(σSNO='S3'(SC)）
同样运用了除法的特性
```


9. 将新课程元组('C10','PHYSICS','YU')插入到关系C中
```sql
INSERT INTO C VALUES('C10','PHYSICS','YU')
```
```
(C∪('C10','PHYSICS','YU'))
记住该符号的用法
```
10. 将学号S4选修课程号为C4的成绩改为85分
```sql
UPDATE SC SET GRADE=85
WHERE SNO='S4'
AND CNO='C4'
```
```
（SC－（'S4','C4',?)∪('S4','C4',85)）
先用'－'实现DELETE功能，再用'∪'实现INSERT功能
注意使用?来表示检索时忽略该字段值
```
# 四、关系代数表达式的优化
目的：
为了系统在执行时既省时间又能提高效率。

基本策略：
先做选择，运用投影去除多余属性等等。

优化算法：
语法树(尽量提前做选择操作；在每个操作后，应做个投影操作，去掉不用的属性值)

例如：
1. π SNO,SNAME(σGRADE>60(S⋈SC)) 进行优化后转换为：2. π SNO,SNAME(πSNO,SNAME(S)⋈πSNO(σGRADE>60(SC)))
--即提前做选择操作；在每个操作后，应做个投影操作，去掉不用的属性值

又如：
1. S(S#,SNAME,AGE,SEX)
2. SC(S#,C#,GRADE)
3. C(C#,CNAME,TEACHER)

π CNAME,TEACHER(σSEX='女'(S⋈SC⋈C)) 进行优化后转换为：

πCNAME,TEACHER(C⋈πC#(πS#,C#(SC)⋈S#(σSEX='女'(S))))

优化前和优化后的语法树如下所示：

![syntax_tree_thumb.jpg](https://i.loli.net/2018/06/30/5b379215e6b8c.jpg)

# 转载注明
[数据库关系代数表达式学习](http://www.blogjava.net/decode360/archive/2009/04/15/292362.html)
