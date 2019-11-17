---
title: SQL 级联
date: 2018-05-11 11:51:20
tags:
- SQL
toc: true
permalink: SQLconstraint
categories: Database
thumbnail: /images/SQL.png
---
SQL级联
<!--more-->
# 主键约束
在创建表的时候创建主键约束。
```sql
create table customer(
customerld int identity not null
primary key,  --创建主键约
CustomerName nvarchar(30) not null)
```

在已存在的表上创建主键约
```sql
alter table person
add constraint PK_Employee_Id  --约束名称
primary key(personld) --personld 字段名
```

# 外键约束
创建表的时候创建外
```sql
create table orders (
orderld int identity not null
primary key,
customerld int not null
foreign key references customer(customerid)
--约束类型-外键引用表(例名)
)
```

在已存在的表中添加一个外键

假设上面的代码去掉了添加外键行,那么可以书写代码如下:
```sql
alter table orders
add constraint FK_Orders_Customerld
foreign key(customerid)  references customer(customerld)
--外键约束, 外键列名, 被引用列名
```

# 级联动
语法
```sql
alter table orders
add constraint FK_Orders_Customerld  --添加约束 名称
foreign key (customerid) references customer(customerld)
--外揵约束, 外键列名 被引用 列名
on update no action --默认 修改时不级联更新子表
on delete cascade   --删除时級联删除依赖行
```
# CHECK约束
语法
```sql
alter table Account
add constraint CN_AccountAge
check (Account_Age>18)
--插入年龄必须大于18
```
- 如果此时视,添加一条不满足的记录,将报如下错误:
```sql
insert into Account values (22,'洪','17')
```
----------------------------------------------------------
例子
```sql
alter table Aocount
WITH NOCHECK
add constraint CN_AccountAge18
check
(Account_Age>18)
--插入年龄心须大于18
```
---
```sql
begin tran
select * from s with(holdlock) --holdlock人为加锁
where 学号='001'
waitfor delay'00 00:35' --等待秒
commit tran
update s set 姓名='平安夜'
where  学号='001'
```
