---
title: SQL 存储过程练习
date: 2018-06-01 11:38:04
tags:
- SQL
toc: true
categories: notes
permalink: SQlprocEx
thumbnail: /images/SQL.png
---
SQL储存过程练习题
<!--more-->

|仓库号|城市|面积|
|:---|:---|:---|
|WH1|北京|3700|
|WH2|上海|5000|
|WH3|广州|2000|
|WH4|武汉|4000|
|WH5|北京|3460|
|WH6|珠海|3400|
|WH7|珠海|5200|
|WH8|广州|6300|

---------------------

|仓库号|职工号|	工资|
|:---|:---|:---|
|WH2|E1|1220|
|WH1|E3|2210|
|WH2|E4|4250|
|WH3|E6|1230|
|WH1|E7|2250|
|WH1|E8|1700|
|WH2|E10|3000|
|WH3|E11|4500|
|WH6|E12|2300|
|WH2|E13|3400|
|WH3|E14|4500|
|WH6|E15|4000|
|WH2|E18|3600|

----------------------------------

|职工号|供应商号|订购数量|订购日期|
|:---|:---|:---|:---:|
|E3|S7|67|2010-12-4|
|E1|S4|73|2010-4-1|
|E7|S4|76|2010-4-2|
|E6|S6|77|20010-1-21|
|E3|S4|79|20010-10-15|
|E1|S6|80|2009-2-1|
|E3|S6|90|2010-3-12|
|E3|S3|91|2009-3-2|
|E10|S3|93|	2010-10-26|

---------------------------------

|:---|:---|:---|
|S3|振华电子厂|	西安|
|S4|华通电子公司|	北京|
|S6|607|厂郑州|
|S7|爱华电子厂|	北京|

1. 基于以上的数据库，创建一个名为myproc的存储过程。该存储过程的功能是从职工表中查询哪些仓库的职工人数在3人以上，列出这些仓库的基本信息。
```sql
create proc myproc
as
select * from ck where 仓库号 in
(select 仓库号 from zg
group by 仓库号
having count(职工号)>3)
```
```sql
exec myproc
```
2. 定义具有参数的存储过程。在以上数据库中，创建一个名为Myproc2的存储过程，该存储过程的功能是向仓库表中插入一条记录，新记录的值由参数提供。
```sql
create proc Myproc2
@ckh char(20),@city char(20),@mji int
as
insert into ck values(@ckh,@city,@mji)
```
```sql
exec Myproc2 'WH33','新会','3000'
```
3. 定义带返回值的存储过程。在以上数据库中，创建一个名为Myproc3的存储过程，该存储过程的功能是从表中根据供应商号查询对应的供应商名和地址。
```sql
alter proc Myproc3
@gysh char(20)
as
select 供应商名,地址 from gys where 供应商号=@gysh
```
```sql
exec Myproc3 'S3'
```
------------------------------------------------------------

```sql
Create table  雇员表(
雇员编号 char(10),
雇员姓名 char(20),
年龄 int
)
```
```sql
ALTER TABLE 雇员表
ADD  CONSTRAINT  PK_EMP
PRIMARY KEY （雇员编号）
```
```sql
ALTER TABLE 工作表
ADD  CONSTRAINT  PK_JOB
PRIMARY KEY （工作编号）
```
```sql
Create table  雇员表(
雇员编号 char(10) not null,
雇员姓名 char(20),
年龄 int
)
```
```sql
ALTER TABLE 雇员表
ADD  CONSTRAINT  PK_EMP
PRIMARY KEY (雇员编号)
```
```sql
ALTER TABLE 雇员表
ADD  CONSTRAINT  check_age
check (年龄>=18 and 年龄<=60)
```
```sql
create proc p6
@bianhao char(10)
as
delete from 雇员表
where 雇员编号=@bianhao
exec  p6 'q1'
select * from 雇员表
```
```sql
  select * from ck
```
```sql
create proc p7
@chengshi char(20),@geshu int output
as
select @geshu=COUNT(仓库号)
from ck
where 城市=@chengshi
```
```sql
declare @jieshou int
exec p7 '珠海',@jieshou output
print @jieshou
```
```sql
create proc p8
@ckhao char(10),@city char(10),@mianji float
as
insert into ck
values (@ckhao,@city,@mianji)
```
```sql
exec p8 'WH10','增城',1000
```
```sql
select * from ck
```
# 存储过程使用事务
实例
```sql
Create Procedure  MyProcedure
AS
Begin
Set    NOCOUNT    ON;
Set XACT_ABORT ON;
begin   tran  ok  --开始一个事务OK
delete  from  rxqz  where qz=   'rx015 ' --删除数据
save   tran  bcd   --保存一个事务点命名为bcd
update  sz  set   name='李丽s' where name= '李丽'--修改数据
if  @@error<>0  --判断修改数据有没有出错
begin --如果出错
rollback   tran  bcd  -- 回滚事务到BCD 的还原点
commit   tran  ok  --提交事务
end
else  --没有出错
commit  tran ok --提交事务
End
```
