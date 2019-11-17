---
title: SQL 笔记
date: 2018-03-16 15:17:27
tags:
- SQL
toc: true
categories: Database
thumbnail: /images/SQL.png
---
SQL笔记
<!--more-->
1. 从职工关系中检索所有工资值。
```sql
select 月工资
from zg
```
2. 检索仓库关系中的所有元组。
```sql
select *
from ck
```
3. 检索工资多于2000元的职工对应的职工号，姓名。
```sql
select  职工号,月工资 from zg
where 月工资>2000
```
4. 检索哪些仓库的面积在400到550平方之间，列出仓库号和所在的城市。
```sql
 select 仓库号,城市
 from ck
 where 面积>400 and 面积<550
```
5. 检索出有广州哪些仓库，列出仓库号。
```sql
 select 仓库号 from ck
 where 城市='广州'
 ```
 6. 检索出所在城市为广州的仓库的个数。
```sql
 select count(仓库号)
 from ck
 where 城市='广州'
```
7. 检索出所有职工的平均工资。
```sql
select avg(月工资)
from zg
```
8. 检索出在WH5仓库工作的职工的人数。
```sql
select count(仓库号) from zg
where 仓库号='WH5'
```
9. 检索出职工表的所有的仓库号，去掉重复值。
```sql
select distinct 仓库号
from zg
```
10. 检索出每个仓库的人数。
```sql
select 仓库号,count(*)人数
 from zg
group by 仓库号
```
11. 检索出上海的仓库有哪些，列出仓库号、面积。查询结果按面积降序排列。
```sql
select 仓库号,面积
 from ck
where 城市='上海'
order by 面积 desc
```
12. 检索出哪些仓库女职工的人数达到了3人。
```sql
 select 仓库号,count(职工号)人数
from zg where 性别='女'
group by 仓库号 having count(职工号)>3
```
13. 检索出所有姓胡的职工的职工号、姓名、性别、工资。查询结果按性别排降序、工资排升序。
```sql
select 职工号,姓名,性别,月工资
from zg
where 姓名 like'胡%'
order by 性别 desc,月工资 asc
```
14. 检索出职工“王玛丽”的年工资。
```sql
select sum(月工资*12) as 年薪
from zg
where 姓名='王玛丽'
```
15. 检索出“WH1”和“WH2”两个仓库工作的职工的基本信息。
```sql
select *
from zg
where 仓库号='WH1'or 仓库号='WH2'
```
16. 检索出年工资在24000以上的职工的姓名，年工资值。
```sql
 select 姓名,月工资*12 as 年工资
```
