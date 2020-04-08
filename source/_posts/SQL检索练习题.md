---
title: SQL 检索练习题
date: 2018-06-22 12:45:23
tags:
- SQL
toc: true
permalink: SQLselect
categories: Database
---
检索，存储过程，触发器相关练习。
<!--more-->

|仓库号|城市|面积|
|:---|:---|:---|
|WH1 |北京 |370
|WH2 |上海 |500|
|WH3 |广州 |200|
|WH4 |广州 |300|
|WH5 |天津 |340|
|WH6 |上海 |350|
|WH7 |上海 |600|
|WH8| 天津 |300|

--------------------------------------------
|职工号|仓库号|工资|
|:---|:---|:---|
|E1|WH2|2220|
|E2|WH1|1810|
|E3|WH2|1850|
|E5|WH3|1530|
|E6|WH1|1550|
|E7|WH4|2300|
|E8|WH4|2000|
|E9|WH5|2050|
|E10|WH5|1900|
|E11|WH6|2100|
|E12|WH7|1700|
|E15|WH5|1780|
|E16|WH1|1600|

---------------------------------------------
|职工号|供应商号|订购单号|订购日期|
|:---|:---|:---|:---|
|E3| S7| OR67| 2005-12-4|
|E1| S4| OR73| 2006-4-1|
|E7| S4| OR76| 2006-4-2|
|E6| S6| OR77| 2006-1-21|
|E3| S4| OR79| 2005-11-15|
|E1| S6| OR80| 2006-2-1|
|E3| S6| OR90| 2006-3-12|
|E3| S3| OR91| 2006-3-2|
-------------------------------------------------
|供应商号|供应商名|地址|
|:---|:----|:---|:---|
|S3|振华电子厂|西安|
|S4|华通电子公司|北京|
|S6|607厂|郑州|
|S7|爱华电子厂|北京|


# 检索
1. 检索在北京的供应商的名称。
```sql
select 供应商名 from gys where 地址='北京'
```
2. 检索发给供应商S6的订购单号。
```sql
select 订购单号 from dg where 供应商号='S6'
```
3. 检索出职工E6发给供应商S6的订购单信息。
```sql
select * from dg where 职工号='E6'and 供应商号='S6'

```
4. 检索出向供应商S3发过订购单的职工的职工号和仓库号。
```sql
select zg.职工号,仓库号 from dg join zg on zg.职工号=dg.职工号
 where 供应商号='S3'
```
5. 检索出目前与S3供应商没有联系的职工信息。
```sql
select * from zg where 职工号 not in
(select 职工号 from dg where 供应商号='S3')
```
6. 检索出目前没有任何订购单的供应商信息
```sql
select * from gys where 供应商号 not in
 (select distinct 供应商号 from dg)
```
```sql
 SELECT * FROM gys WHERE NOT EXISTS 
( SELECT * FROM dg WHERE 供应商号=gys.供应商号 ) 
```
7. 检索出和职工E1、E3都有联系的北京的供应商的信息。
```sql
select * from gys where 地址='北京' 
and 供应商号 in
(select 供应商号 from dg where 职工号='E1')
and 供应商号 in
(select 供应商号 from dg where 职工号='E3')
```
8. 检索出目前和华通电子公司有业务联系的每个职工的工资。
```sql
select 职工号,工资 from zg where 职工号 in
(select 职工号 from dg where 供应商号 in
(select 供应商号 from gys where 供应商名='华通电子公司'))
```
9. 检索出与工资在1220元以下的职工没有联系的供应商名称。
```sql
select 供应商名 from gys 
where 供应商号 not in
(select 供应商号 from dg 
where 职工号 in
(select 职工号 from zg where 工资<1220))
```
```sql
select 供应商名 from gys 
where 供应商号 not in 
(select 供应商号 from dg join zg on dg.职工号=zg.职工号
where 工资>2250)
```
10. 检索出向S4供应商发出订购单的仓库所在的城市。
```sql
select 城市 from ck where 仓库号 in
(select 仓库号 from zg where 职工号 in
(select 职工号 from dg where 供应商号='S4'))
```
11. 检索出在上海工作并且向S6供应商发出了订购单的职工号。
```sql
select 职工号 from zg where 仓库号 in
(select 仓库号 from ck where 城市='上海' and 职工号 in
(select 职工号 from dg where 供应商号='S6'))
```
```sql
select dg.职工号 from zg join ck on zg.仓库号=ck.仓库号
join dg on zg.职工号=dg.职工号
where 城市='上海' and 供应商号='S6'
```
12. 检索出在广州工作并且只向S6供应商发出了订购单的职工号。
```sql
select 职工号 from zg where 仓库号 in
(select 仓库号 from ck where 城市='广州' 
and 职工号 in
(select 职工号 from dg where 供应商号='S6') 
and 职工号 not in
(SELECT 职工号 FROM dg WHERE 供应商号!='S6'))
```
13. 检索出由工资多于1230元的职工向北京的供应商发出的订购单号。
```sql
select 订购单号 from dg where 职工号 in
(select 职工号 from zg where 工资>1230) and  供应商号 in
(select 供应商号 from gys where 地址='北京')
```
```sql
select 订购单号 from dg where 职工号 in
(select 职工号 from zg where 工资>2000)
and 供应商号 in (
select 供应商号 from gys where 地址='北京')
```
14. 检索出仓库的个数
```sql
select count(仓库号) from ck
```
15. 检索出有最大面积的仓库信息。
```sql
select * from ck where ck.面积=(
select max(面积) from ck )
```
16. 检索出所有仓库的平均面积。
```sql
select avg(面积) 平均面积  from ck
```
17. 检索出向S4供应商发出订购单的那些仓库的平均面积。
```sql
select avg(面积) as 平均面积 from ck where 仓库号 in
(select 仓库号 from zg where 职工号 in
(select 仓库号 from dg where 供应商号='S4'))
```
```sql
select avg(面积) as 平均面积 from ck
where 仓库号 in 
(select 仓库号 from zg join dg on zg.职工号=dg.职工号
where 供应商号='S4')
```
18. 检索出每个城市的供应商个数。
```sql
select 地址,count(*) from gys
group by 地址
```
19. 检索出每个仓库中工资多于1220元的职工个数。
```sql
select 仓库号,count(*) from zg where 工资>1220
 group by 仓库号
```
20. 检索出和面积最小的仓库有联系的供应商的个数。
```sql
select count(供应商号) from gys where 供应商号 in
(select 供应商号 from dg where 职工号 in
(select 职工号 from zg where 仓库号 in
(select 仓库号 from ck where 面积=
(select min(面积) from ck))))
```
```sql
select count(供应商号) from dg where 职工号 in 
(select 职工号 from zg where 仓库号 in
(select 仓库号 from ck where 面积=(select min(面积) from ck)))
```
21. 检索出工资低于本仓库平均工资的职工信息。
```sql
SELECT * FROM 职工 out WHERE 工资< 
(SELECT AVG(工资) FROM 职工 inne 
WHERE 仓库号=out.仓库号) 
```
# 存储过程
1. 创建一个存储过程P1，输入某个仓库号，查询对应仓库的
信息。
```sql
create proc P1
@ckh nvarchar(225) 
as
select * from ck where 仓库号=@ckh
```
```sql
exec P1 'WH8'
```

2. 创建一个存储过程P2，输入某个仓库号，输出对应仓库的的职工人数。
```sql
create proc P2
@ckh nvarchar(20)
as
select count(职工号) 职工人数 from zg where 仓库号 = @ckh
group by 仓库号
```
```sql
exec P2 'WH1'
```
---------------------------------------------------
```sql
alter TRIGGER tri_salary
ON zhg FOR UPDATE
AS
SELECT * FROM INSERTED JOIN
DELETED ON INSERTED.职工号 = DELETED.职工号
IF UPDATE(工资)
IF EXISTS(SELECT * FROM INSERTED JOIN
DELETED ON INSERTED.职工号 = DELETED.职工号
WHERE INSERTED.工资&lt;DELETED.工资)
begin
print(&#39;新工资值低于原工资，拒绝修改&#39;)
ROLLBACK
end
```
```sql
CREATE PROCEDURE countzhigong
@ck char(20), @renshu int output
AS
SELECT @renshu = count(职工号)
FROM ck left outer JOIN zhg ON ck.仓库号= zhg.仓库号
WHERE ck.仓库号=@ck
Declare @re int
Execute countzhigong &#39;wh2&#39;, @re output
Print @re
SELECT *
FROM ck left outer JOIN zhg ON ck.仓库号= zhg.仓库号

SELECT * FROM zhg
```
------------------------------------------------
# 创建、修改、删除触发器。
1. 创建一个触发器zhigong1，在对职工表的工资属性修改时触发：每修改一个职工的工资，就检查新工资是否比原工资低，若是低，则恢复原工资而不做修改。
```sql
create trigger zhigong1
on zg for insert,update
as
select * from inserted join deleted 
on inserted.职工号=deleted.职工号
if update(工资)
if exists (select * from inserted join 
deleted on inserted.职工号=deleted.职工号
where inserted.工资<deleted.工资)
rollback
```
```sql
update zg set 工资='3000' where 职工号='E9'
```
2. 创建一个触发器zhigong2，在插入新的职工记录时触发：检查新职工记录的仓库号是否在仓库表的仓库号中存在，如果不存在就撤消插入操作。
```sql
alter trigger zhigong2
on zg for insert
as
select * from inserted join deleted on inserted.职工号=deleted.职工号
if not exists ( select 仓库号 from inserted where 仓库号 in (select 仓库号 from ck ))
rollback
```
```sql
insert into zg values('E33','WH2','3000')
```
3. 删除以上两个触发器。
```sql
drop trigger zhigong1,zhigong2
```
4. 创建一个触发器dinggou1，在对订购表进行插入操作时，输出该职工的所经手的订购单数目。
```sql
create  trigger  dinggou1
on dg for insert
as
select dg.职工号,count(dg.订购单号) as 订购单数目
from dg join inserted on dg.职工号=inserted.职工号
where dg.职工号=inserted.职工号
group by dg.职工号
```
```sql
insert into dg values
('E1','S6','OR98','2018-01-21 00:00:00.000')
```
