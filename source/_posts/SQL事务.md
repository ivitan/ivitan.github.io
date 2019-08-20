---
title: SQL 事务
date: 2018-06-05 16:52:22
tags:
- SQL
toc: true
categories: notes
thumbnail: /images/SQL.png
---
SQL事务
<!--more-->
# 概念
- 事务（Transaction）是指一个或多个更改数据库的扩展。例如，如果您正在创建一个记录或者更新一个记录或者从表中删除一个记录，那么您正在该表上执行事务。重要的是要控制事务以确保数据的完整性和处理数据库错误。
- 事务（Transaction）是一个对数据库执行工作单元。事务（Transaction）是以逻辑顺序完成的工作单位或序列，可以是由用户手动操作完成，也可以是由某种数据库程序自动完成。

# 事务的特点
四个特点
1. `原子性（Atomicity)`确保工作单位内的所有操作都成功完成，否则，事务会在出现故障时终止，之前的操作也会回滚到以前的状态。
2. `一致性（Consistency)`确保数据库在成功提交的事务上正确地改变状态。
3. `隔离性（Isolation)`使事务操作相互独立和透明。
4. `持久性（Durability)`确保已提交事务的结果或效果在系统发生故障的情况下仍然存在。

# 事务控制
含义
- `BEGIN TRANSACTION` 开始事务处理。
- `COMMIT` 保存更改，或者可以使用 END TRANSACTION 命令。
- `ROLLBACK` 回滚所做的更改。
---
- 事务控制命令只与 DML 命令 INSERT、UPDATE 和 DELETE 一起使用。他们不能在创建表或删除表时使用，因为这些操作在数据库中是自动提交的

## BEGIN TRANSACTION 命令
语法
```sql
BEGIN TRANSACTION
READ(A)
A:=A-50
WRITE(A)
READ(B)
B:=B+50
COMMIT
```
- READ(X):把数据项X从数据库读出到事务的私有缓冲中
- WRITE(X):把数据项X从事务的私有缓冲中写到数据库。

## COMMIT 命令
作用

COMMIT 命令用于保存事务对数据库所做的更改。会将自上次 COMMIT 命令或者 ROLLBACK 命令执行以来所有的事务都保存到数据库中。

语法
```sql
  DELETE FROM S
       WHERE SIZE=20
  COMMIT
```
## ROLLBACK 命令
作用
ROLLBACK 命令用于撤销尚未保存到数据库中的事务。只能撤销自上次 COMMIT 命令或者 ROLLBACK 命令执行以来的事务。

语法
```sql
DELETE FROM S
WHERE SIZE=20
ROLLBACK
```

ROLLBACK 命令可以用于撤销一系列的事务
- 回滚至某一保存点的语法如下所示：
```sql
ROLLBACK TO SAVEPOINT_NAME
```
## SAVEPOINT 命令
作用
SAVEPOINT 是事务中的一个状态点，使得我们可以将事务回滚至特定的点，而不是将整个事务都撤销。

语法
```sql
SAVEPOINT SAVEPOINT_NAME
```
- 该命令只能在事务语句之间创建保存点（SAVEPOINT）。


## RELEASE SAVEPOINT 命令
作用
RELEASE SAVEPOINT 命令用于删除先前创建的保存点。

语法
```sql
RELEASE SAVEPOINT SAVEPOINT_NAME
```
## SET TRANSACTION 命令
作用
: SET TRANSACTION 命令可以用来初始化数据库事务，指定随后的事务的各种特征。

将某个事务指定为只读或者读写。
```sql
SET TRANSACTION [ READ WRITE | READ ONLY ]
```

# 存储过程使用事务
实例一
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

实例二
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
---
**参考**
- [连接](http://wiki.jikexueyuan.com/project/sql/transactions.html)
