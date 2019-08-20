---
title: SQL 约束
date: 2018-05-08 15:16:19
tags:
- SQL
toc: true
categories: notes
thumbnail: /images/SQL.png
---
SQL：约束
<!--more-->
# UNIQUE 约束
各约束意义
- `UNIQUE`约束唯一标识数据库表中的每条记录。
- `UNIQUE`和`PRIMARY KEY`约束均为列或列集合提供了唯一性的保证。
- `PRIMARY KEY`约束拥有自动定义的 UNIQUE 约束。
- 请注意，每个表可以有多个 UNIQUE 约束，但是每个表只能有一个 PRIMARY KEY 约束。

## CREATE TABLE 时的 UNIQUE 约束
- 在 "Persons" 表创建时在 "P_Id" 列上创建 UNIQUE 约束
- MySQL：
```sql
CREATE TABLE Persons
(
P_Id int NOT NULL,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255),
UNIQUE (P_Id)
)
```
- SQL Server/Oracle/MS Access：
```sql
CREATE TABLE Persons
(
P_Id int NOT NULL UNIQUE,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255)
)
```
## 命名 UNIQUE 约束，并定义多个列的 UNIQUE 约束
- MySQL/SQL Server/Oracle/MS Access：
```sql
CREATE TABLE Persons
(
P_Id int NOT NULL,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255),
CONSTRAINT uc_PersonID UNIQUE (P_Id,LastName)
)
```

## ALTER TABLE 时的 UNIQUE 约束
语法
- 当表已被创建时，如需在 "P_Id" 列创建 UNIQUE 约束，
```sql
ALTER TABLE Persons
ADD UNIQUE (P_Id)
```
## 如需命名 UNIQUE 约束，并添加 UNIQUE 约束，
语法：
MySQL / SQL Server / Oracle / MS Access：
```sql
ALTER TABLE Persons
ADD CONSTRAINT uc_PersonID UNIQUE (P_Id,LastName)
```

## 撤销 UNIQUE 约束
撤销 UNIQUE 约束
MySQL：
```sql
ALTER TABLE Persons
DROP INDEX uc_PersonID
```
SQL Server / Oracle / MS Access：
```sql
ALTER TABLE Persons
DROP CONSTRAINT uc_PersonID
```

# PRIMARY KEY 约束
PRIMARY KEY 约束唯一标识数据库表中的每条记录。
  - 主键必须包含唯一的值。
  - 主键列不能包含 NULL 值。
  - 每个表都应该有一个主键，并且每个表只能有一个主键。

## CREATE TABLE 时的 PRIMARY KEY 约束
下面的 SQL 在 "Persons" 表创建时在 "P_Id" 列上创建 PRIMARY KEY 约束：
```sql
CREATE TABLE Persons
(
P_Id int NOT NULL,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255),
PRIMARY KEY (P_Id)
)
```
SQL Server / Oracle / MS Access：
```sql
CREATE TABLE Persons
(
P_Id int NOT NULL PRIMARY KEY,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255)
)
```
- 如需命名 PRIMARY KEY 约束，并定义多个列的 PRIMARY KEY 约束
```sql
CREATE TABLE Persons
(
P_Id int NOT NULL,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255),
CONSTRAINT pk_PersonID PRIMARY KEY (P_Id,LastName)
)
```
- 注释：在上面的实例中，只有一个主键 PRIMARY KEY（pk_PersonID）。然而，pk_PersonID 的值是由两个列（P_Id 和 LastName）组成的。

## ALTER TABLE 时的 PRIMARY KEY 约束
- 当表已被创建时，如需在 "P_Id" 列创建 PRIMARY KEY 约束
```sql
ALTER TABLE Persons
ADD PRIMARY KEY (P_Id)
```
- 如需命名 PRIMARY KEY 约束，并定义多个列的 PRIMARY KEY 约束
```sql
ALTER TABLE Persons
ADD CONSTRAINT pk_PersonID PRIMARY KEY (P_Id,LastName)
```
注释：如果您使用 ALTER TABLE 语句添加主键，必须把主键列声明为不包含 NULL 值（在表首次创建时）。

## 撤销 PRIMARY KEY 约束
MySQL
```sql
ALTER TABLE Persons
DROP PRIMARY KEY
```
SQL Server / Oracle / MS Access：
```sql
ALTER TABLE Persons
DROP CONSTRAINT pk_PersonID
```

# FOREIGN KEY 约束
一个表中的 FOREIGN KEY 指向另一个表中的 PRIMARY KEY。
## 解释外键
|P_Id|LastName|FirstName|Address|City|
|:---|:---|:---|:---|:---|
|1|Hansen|Ola|Timoteivn|10|Sandnes|
|2|Svendson|Tove|Borgvn|23|Sandnes|
|3|Pettersen|Kari|Storgt|20|Stavanger|


"Orders" 

|O_Id|OrderNo|P_Id|
|:---|:---|:---|
|1|77895|3|
|2|44678|3|
|3|22456|2|
|4|24562|1|


- 请注意，"Orders" 表中的 "P_Id" 列指向 "Persons" 表中的 "P_Id" 列。
- "Persons" 表中的 "P_Id" 列是 "Persons" 表中的 PRIMARY KEY。
- "Orders" 表中的 "P_Id" 列是 "Orders" 表中的 FOREIGN KEY。

## FOREIGN KEY 约束用于预防破坏表之间连接的行为。
作用: FOREIGN KEY 约束也能防止非法数据插入外键列，因为它必须是它指向的那个表中的值之一。

- CREATE TABLE 时的 FOREIGN KEY 约束
下面的 SQL 在 "Orders" 表创建时在 "P_Id" 列上创建 FOREIGN KEY 约束：

MySQL：
```sql
CREATE TABLE Orders
(
O_Id int NOT NULL,
OrderNo int NOT NULL,
P_Id int,
PRIMARY KEY (O_Id),
FOREIGN KEY (P_Id) REFERENCES Persons(P_Id)
)
```
SQL Server / Oracle / MS Access：
```sql
CREATE TABLE Orders
(
O_Id int NOT NULL PRIMARY KEY,
OrderNo int NOT NULL,
P_Id int FOREIGN KEY REFERENCES Persons(P_Id)
)
```
- 如需命名 FOREIGN KEY 约束，并定义多个列的 FOREIGN KEY 约束
```sql
CREATE TABLE Orders
(
O_Id int NOT NULL,
OrderNo int NOT NULL,
P_Id int,
PRIMARY KEY (O_Id),
CONSTRAINT fk_PerOrders FOREIGN KEY (P_Id)
REFERENCES Persons(P_Id)
)
```
ALTER TABLE 时的 FOREIGN KEY 约束
- 当 "Orders" 表已被创建时，如需在 "P_Id" 列创建 FOREIGN KEY 约束
```sql
ALTER TABLE Orders
ADD FOREIGN KEY (P_Id)
REFERENCES Persons(P_Id)
```
- 如需命名 FOREIGN KEY 约束，并定义多个列的 FOREIGN KEY 约束
```sql
ALTER TABLE Orders
ADD CONSTRAINT fk_PerOrders
FOREIGN KEY (P_Id)
REFERENCES Persons(P_Id)
```
## 撤销 FOREIGN KEY 约束
撤销 FOREIGN KEY 约束：
- MySQL
```sql
ALTER TABLE Orders
DROP FOREIGN KEY fk_PerOrders
```
- SQL Server / Oracle / MS Access
```sql
ALTER TABLE Orders
DROP CONSTRAINT fk_PerOrders
```

# CHECK 约束
范围及作用
- CHECK 约束用于限制列中的值的范围。
- 如果对单个列定义 CHECK 约束，那么该列只允许特定的值。
- 如果对一个表定义 CHECK 约束，那么此约束会基于行中其他列的值在特定的列中对值进行限制。

CREATE TABLE 时的 CHECK 约束
- 下面的 SQL 在 "Persons" 表创建时在 "P_Id" 列上创建 CHECK 约束。CHECK 约束规定 "P_Id" 列必须只包含大于 0 的整数。

- MySQL：
```sql
CREATE TABLE Persons
(
P_Id int NOT NULL,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255),
CHECK (P_Id>0)
)
```
SQL Server / Oracle / MS Access：
```sql
CREATE TABLE Persons
(
P_Id int NOT NULL CHECK (P_Id>0),
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255)
)
```
- 如需命名 CHECK 约束，并定义多个列的 CHECK 约束
```sql
CREATE TABLE Persons
(
P_Id int NOT NULL,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255),
CONSTRAINT chk_Person CHECK (P_Id>0 AND City='Sandnes')
)
```
ALTER TABLE 时的 CHECK 约束
- 当表已被创建时，如需在 "P_Id" 列创建 CHECK 约束，请使用下面的 SQL：
MySQL / SQL Server / Oracle / MS Access:
```sql
ALTER TABLE Persons
ADD CHECK (P_Id>0)
```
- 如需命名 CHECK 约束，并定义多个列的 CHECK 约束
```sql
ALTER TABLE Persons
ADD CONSTRAINT chk_Person CHECK (P_Id>0 AND City='Sandnes')
```
## 撤销 CHECK 约束
撤销 CHECK 约束
SQL Server / Oracle / MS Access：
```sql
ALTER TABLE Persons
DROP CONSTRAINT chk_Person
```
MySQL：
```sql
ALTER TABLE Persons
DROP CHECK chk_Person
```

# SQL DEFAULT 约束
作用
- DEFAULT 约束用于向列中插入默认值。
- 如果没有规定其他的值，那么会将默认值添加到所有的新记录。

CREATE TABLE 时的 DEFAULT 约束
下面的 SQL 在 "Persons" 表创建时在 "City" 列上创建 DEFAULT 约束：
My SQL / SQL Server / Oracle / MS Access：
```sql
CREATE TABLE Persons
(
P_Id int NOT NULL,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255) DEFAULT 'Sandnes'
)
```
- 通过使用类似 GETDATE() 这样的函数，DEFAULT 约束也可以用于插入系统值：
```sql
CREATE TABLE Orders
(
O_Id int NOT NULL,
OrderNo int NOT NULL,
P_Id int,
OrderDate date DEFAULT GETDATE()
)
```
ALTER TABLE 时的 DEFAULT 约束
- 当表已被创建时，如需在 "City" 列创建 DEFAULT 约束
- MySQL：
```sql
ALTER TABLE Persons
ALTER City SET DEFAULT 'SANDNES'
```
- SQL Server / MS Access：
```sql
ALTER TABLE Persons
ALTER COLUMN City SET DEFAULT 'SANDNES'
```
- Oracle：
```sql
ALTER TABLE Persons
MODIFY City DEFAULT 'SANDNES'
```
## 撤销 DEFAULT 约束
撤销 DEFAULT 约束
- MySQL：
```sql
ALTER TABLE Persons
ALTER City DROP DEFAULT
```
- SQL Server / Oracle / MS Access：
```sql
ALTER TABLE Persons
ALTER COLUMN City DROP DEFAULT
```
---
**来源**
- [菜鸟教材](http://www.runoob.com)
