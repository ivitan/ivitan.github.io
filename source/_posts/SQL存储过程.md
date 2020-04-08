---
title: SQL 存储过程
date: 2018-05-12 08:08:58
tags:
- SQL
toc: true
categories: Database
permalink: SQLprocedure
---
SQL存储过程
<!--more-->
建立
```sql
create procedure lianxi66
@arel char(20)
@x1 int output,@x2 float output
as
select @x1=count(*),@x2=avg(年龄)
from S
where 所在系=@arel
```
引用
```
declare @ok int, @ck float
exec lianxi66 "会计系",@ok output,@ck output
print @ok
print @ck
```
---------------------------------------------------------

建立
```sql
CREATE PROCEDURE lianxi3511

@varl char(10), @var3 int output
as
select @var3=S.年龄
frоm ѕ
where s.学号=@varl
```
引用
```sql
Declare @res int
Execute liarixi3511 '101101', @res output
Print @res
```
----------------------------------------------------------
建立
```sql
CREATE PROCEDURE lianxi2511
@var1 int, @var2 int, var3 int output
As
Set @var3 = @vari*@var2
```
引用
```sql
Declare @res int
Execute liarxi2511 5, 7, @res output
Print @res

exec liarxi2511 3,4
```
----------------------------------------------------------
建立
```sql
CREATE PROCEDURE lianxi1511
@student_no char (10),
@course_no char (20)
AS
SELECT S.姓名, S.学号,SC.课程号,C.课程名, SC.成绩
FROM S JOIN SC  ON S.学号=SC.学号
INNER JOIN C  ON C.课程号=SC.课程号
WHERE S.学号=@student_no
ANO SC.课程号=@course_no
```
引用
```sql
exec lianxi1511 '101101','101'
```
-----------------------------------------------------------
# 习题
若输入的学号存在则删除
- 创建
```sql
create procedure del_cno1
@cno char(20)
as
begin tran t1 --事件t1开始
delete from kcgx  where 课程号=@cno
if exists (select  * from xkgx where 课程号=@cno)
rollback tran t1
else
commit tran t1
```
- 引用与验证
```sql
exec del_cno1 '305'
select * from xkgx
select * from kcgx
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
---
```sql
create proc 1
@si chark20),@pi char(20),@Ji chark20),@shu int
insert into SPJ values(@si,@pi,@Ji,@shu)
bdgin tran t1
if exists (select * from p where Pno=@Pi)
commit tran t1
else
rollback tran t1
```
