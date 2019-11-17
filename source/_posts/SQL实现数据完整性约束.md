---
title: SQL 实现数据完整性约束
date: 2018-06-15 12:18:18
tags:
- SQL
toc: true
permalink: SQLfull
categories: Database
thumbnail: /images/SQL.png
---
SQL实现数据完整性约束
1. 数据完整性基本概念
2. 实现声明完整性
3. 实现过程完整性
<!--more-->

# 数据完整性基本概念
意义
数据的完整性是为了防止数据库中存在不符合语义的数据。
这些加在数据库数据之上的语义约束条件就是数据完整性约束条件。
这些约束条件作为表定义的一部分存储在数据库中。
DBMS检查数据是否满足完整性条件的机制就称为完整性检查。

## 完整性约束条件的作用对象
列级约束
1. 对数据类型的约束
2. 对数据格式的约束
3. 对取值范围或取值集合的约束
4. 对空值的约束

元组约束
元组中各个字段之间的联系的约束，如：开始日期小于结束日期。

关系约束
是若干元组之间、关系之间的联系的约束。

实现数据完整性的方法
1. 一种是在定义表时声明数据完整性，称为声明完整性，
2. 另一种是在服务器端编写触发器来实现，称为过程完整性。

在执行对数据的增、删、改操作时，数据库管理系统自动检查用户定义的完整性约束条件。

# 实现声明完整性
## 主码约束
原则
1. 每个表只能有一个 `PRIMARY KEY` 约束
2. 用 `PRIMARY KEY` 约束的列取值不能有重复，而且不允许有空值

添加主码约束的语法格式
```sql
ALTER TABLE 表名
ADD [ CONSTRAINT 约束名]
PRIMARY KEY （<列名> [, … n] ）
```

例：对雇员表和工作表添加主码约束
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
## UNIQUE 约束
目的
- 用于限制在一个列中不能有重复的值。
- 用在事实上具有惟一性的属性列上，比如每个人的身份证号码、驾驶证号码等均不能有重复值。

注意：
- 允许有一个空值；
- 在一个表中可以定义多个UNIQUE约束；
- 可以在一个列或多个列上定义UNIQUE约束。

添加UNIQUE约束的语法格式为：
```sql
ALTER TABLE 表名
ADD [ CONSTRAINT 约束名]
UNIQUE（<列名> [, … n] ）
```
例．为雇员表的“电话”列添加UNIQUE约束。
```sql
ALTER TABLE 雇员表
ADD  CONSTRAINT  UK_SID
UNIQUE（电话）
```
## FOREIGN KEY 外码约束
目的
- 实现引用完整性。
- 外码所引用的列必须是有`PRIMARY KEY约束`或`UNIQUE约束`的列。

添加FOREIGN KEY约束的语法格式为：
```sql
ALTER TABLE 表名
ADD [ CONSTRAINT 约束名]
FOREIGN KEY（<列名>）
REFERENCES 引用表名（<列名>）
```
例．为雇员表的工作编号添加外码引用约束。
```sql
ALTER TABLE 雇员
ADD CONSTRAINT FK_job_id
FOREIGN KEY （工作编号）REFERENCES 工作表 （工作编号）
```
## DEFAULT 约束
目的
- 用于提供列的默认值。
- 只有在向表中插入数据时才检查DEFAULT约束。

添加DEFAULT约束的语法格式为：
```sql
ALTER TABLE 表名
ADD [ CONSTRAINT 约束名 ]
DEFAULT 默认值 FOR 列名
```
例．定义雇员表的工资的默认值为1000。
```sql
ALTER TABLE 雇员
ADD CONSTRAINT  DF_SALARY
DEFAULT  1000  FOR 工资
```
## CHECK 约束
目的
- 用于限制列的取值在指定的范围内，使数据库中存放的值都是有意义的。
- 系统在执行`INSERT语句`和`UPDATE语句`时自动检查CHECK约束。
- CHECK约束可约束同一个表中多个列之间的取值关系。

添加CHECK约束的语法格式为：
```sql
ALTER TABLE 表名
ADD [ CONSTRAINT 约束名 ]
CHECK （逻辑表达式）
```
例1．限制雇员的工资必须大于等于200。
```SQL
ALTER TABLE 雇员
ADD CONSTRAINT  CHK_Salary
CHECK ( 工资 >= 200 )
```
例2．限制工资表的最低工资小于等于最高工资。
```sql
ALTER TABLE 工作
ADD CONSTRAINT  CHK_Job_Salary
CHECK( 最低工资 <= 最高工资 )
```
# 实现过程完整性
简介

过程完整性是指在服务器端通过编写实现约束的一段代码来实现数据完整性约束，这段代码就称为触发器。
触发器是用编程的方法实现复杂的商业规则，它可以实现一般的数据完整性约束实现不了的复杂的完整性约束。

事务基本概念
`事务（Transaction）`是作为完整的工作单元执行的一系列操作。
如果一个事务中的所有操作都成功，则事务成功，其对数据库的更改都会成为永久性的更改。
如果事务中的任何一个操作失败，则整个事务失败，其中所完成的操作均被取消，所有对数据的更改均无效。

事务的三种类型
1. `自动提交事务` 每一条对数据的增、删、改语句都自动地构成了一个事务。
2. `显式事务` 是用户定义的事务，有显式的开始 `（BEGIN TRANSACTION ）` 和结束标记（`COMMIT（正常结束)` 和 `ROLLBACK（异常结束）`）。
3. `隐式事务` 事务的开始是隐式的，以前一个事务结束后的第一个SQL语句作为下一个事务的开始，但每个事务必须有显式的结束标记。SQL Server支持的是显式事务。

# 触发器
概念
是一种特殊的存储过程，不需要由用户调用执行，而是当用户对表中的数据进行UPDATE、INSERT或DELETE操作时自动触发执行的。

触发器通常用于保证业务规则和数据完整性，其主要优点是用户可以用编程的方法来实现复杂的处理逻辑和商业规则，增强了数据完整性约束的功能。

触发器的优点
1. 完成比CHECK约束更复杂的数据约束。
2. 为保证数据库性能而维护的非规范化数据。
3. 可实现复杂的商业规则。
4. 触发器也可以评估数据修改前后的表状态，并根据其差异采取对策。

创建触发器语法格式
```SQL
CREATE TRIGGER 触发器名称
ON 表名
{ FOR | AFTER | INSTEAD OF }
{ [ INSERT ] [ , ] [ DELETE ] [ , ]
   [UPDATE ] }
AS
  SQL 语句 [ ... n ]
```
两个逻辑工作表
- `DELETED表` 存储 `DELETE和UPDATE` 语句所影响的行的副本。
- `INSERTED表`存储 `INSERT和UPDATE` 语句所影响的行的副本。

## 示例
创建限制最低工资必须大于等于400的触发器。
```SQL
CREATE TRIGGER tri_job_salary1
ON 工作表 FOR INSERT, UPDATE
AS
IF EXISTS( SELECT * FROM INSERTED
WHERE 最低工资 < 400 )
BEGIN
PRINT '最低工资必须大于等于400'
ROLLBACK
END
```
创建实现限制最低工资必须小于最高工资的触发器。
```sql
CREATE TRIGGER tri_job_salary2
ON 工作表 FOR INSERT, UPDATE
AS
IF EXISTS(SELECT * FROM INSERTED
WHERE 最低工资 >= 最高工资 )
BEGIN
PRINT '最低工资必须小于最高工资'
ROLLBACK
END
```
创建实现限制雇员的工资必须在工作表的相应工作的最低工资和最高工资之间。
```SQL
CREATE TRIGGER tri_emp_salary
ON 雇员表
FOR INSERT, UPDATE
AS
IF EXISTS (SELECT * FROM INSERTED a
JOIN 工作表 b ON a.工作编号 = b.工作编号
WHERE 工资 NOT BETWEEN 最低工资
AND 最高工资 )
ROLLBACK
```
## 限制更新数据的触发器
限制将SC表中不及格学生的成绩改为及格。
```sql
CREATE TRIGGER tri_grade
ON SC FOR UPDATE
AS
IF UPDATE(Grade)
IF EXISTS(SELECT * FROM INSERTED JOIN
DELETED ON INSERTED.Sno = DELETED.Sno
WHERE INSERTED.Grade >= 60
AND DELETED.Grade < 60)
ROLLBACK
```
## 限制删除的触发器
限制删除SC表中成绩不及格学生的修课记录。
```sql
CREATE TRIGGER tri_del_grade
ON SC FOR DELETE
AS
IF EXISTS(SELECT * FROM DELETED
WHERE Grade < 60)
ROLLBACK
```
## 修改触发器定义
语法格式为：
```sql
ALTER TRIGGER 触发器名称
ON 表名
{ FOR | AFTER | INSTEAD OF }
{ [ INSERT ] [ , ] [ DELETE ] [ , ]
   [UPDATE ] }
AS
SQL 语句 [ ... n ]
```
## 删除触发器
语法格式为：
```SQL
DROP TRIGGER 触发器名 [ , ... n ]
```
例：删除tri_grade触发器。
```sql
DROP TRIGGER tri_grade
```