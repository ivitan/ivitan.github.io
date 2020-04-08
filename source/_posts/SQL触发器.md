---
title: SQL 触发器
date: 2018-06-08 14:01:40
tags:
- SQL
toc: true
categories: Database
permalink: SQLtrigger
---
SQL触发器
<!--more-->
# 概念
某一个表的一定的操作，触发某种条件，从而执行的一段程序。触发器是一个特殊的存储过程。

常见的触发器有三种：分别应用于Insert , Update , Delete 事件。

语法
```sql
create trigger 触发器名
on
zg   -- 在zg表建立触发器
for insert,update  -- 为什么事件触发
as   -- 事件触发后所要做的事情
select * from inserted
select * from deleted
if exists (select * from ck where 仓库号 in (select 仓库号 from inserted))
commit
else
rollback
```
 ---
```sql
CREATE  TRIGGER trigger_name [BEFORE|AFTER] event_name
ON table_name
BEGIN
 -- Trigger logic goes here....
END
```

Deleted 与 Inserted
1. `Deleted`表存放由于执行Delete或Update语句而要从表中删除的所有行。
2. `Inserted`表存放由于执行Insert或Update语句而要向表中插入的所有行。

## UPDATE 操作上在表的一个或多个指定列上创建触发器(Trigger)
语法
```sql
  CREATE  TRIGGER trigger_name [BEFORE|AFTER] UPDATE OF column_name
  ON table_name
  BEGIN
   -- Trigger logic goes here....
  END
```
# 触发器操作
删除
```sql
drop trigger trigger_name
```
修改
```sql
alter  trigger tri_ck_zg
on zg for insert,update
as
select * from inserted
select * from deleted
if exists (select * from ck where 仓库号 in (select 仓库号 from inserted))
commit
else
rollback
```
列出触发器
- 所有
```sql
SELECT name FROM sqlite_master
WHERE type = 'trigger'
```
- 指定表
```sql
SELECT name FROM sqlite_master
WHERE type = 'trigger' AND tbl_name = '表名'
```

# 习题
成绩小于60的不可更改
```sql
create trigger tri_grade
on xkgx for update
as
select * from inserted
select * from deleted

if update(成绩)
if exists(select * from deleted  where 成绩<60)
rollback
```
- 验证
```sql
update xkgx set 成绩=80 where课程号='303' and  学号='S101101'
```
  ---
  
成绩小于60的不可更改
```sql
create trigger tri_grade
on xkgx for update
as
select * from inserted
select * from deleted

if update(成绩)
if exists(select * from inserted join deleted on  inserted.学号=deleted.学号
where inserted.成绩>=60 and deleted.成绩<60)
rollback
```
