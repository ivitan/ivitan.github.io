---
title: SQL 视图
date: 2018-06-01 23:00:19
tags:
- SQL
toc: true
permalink: SQLview
categories: Database
---
SQL视图
<!--more-->
# 什么是视图
解析
- 在 SQL 中，视图是基于 SQL 语句的结果集的可视化的表。
- 视图包含行和列，就像一个真实的表。视图中的字段就是来自一个或多个数据库中的真实的表中的字段。我们可以向视图添加 SQL 函数、WHERE 以及 JOIN 语句，我们也可以提交数据，就像这些来自于某个单一的表。
  - 注释：数据库的设计和结构不会受到视图中的函数、where 或 join 语句的影响。

# SQL CREATE VIEW
语法
```sql
CREATE VIEW view_name AS
SELECT column_name(s)
FROM table_name
WHERE condition
```
- 注释：视图总是显示最近的数据。每当用户查询视图时，数据库引擎通过使用 SQL 语句来重建数据。

## SQL CREATE VIEW 实例
要求
1. 可以从某个查询内部、某个存储过程内部，或者从另一个视图内部来使用视图。通过向视图添加函数、join 等等，我们可以向用户精确地提交我们希望提交的数据。
2. 样本数据库 Northwind 拥有一些被默认安装的视图。视图 "Current Product List" 会从 Products 表列出所有正在使用的产品。这

创建：
```sql
  CREATE VIEW [Current Product List] AS
  SELECT ProductID,ProductName
  FROM Products
  WHERE Discontinued=No
```
- 查询上面这个视图：
```sql
SELECT * FROM [Current Product List]
```
- Northwind 样本数据库的另一个视图会选取 Products 表中所有单位价格高于平均单位价格的产品
```sql
  CREATE VIEW [Products Above Average Price] AS
  SELECT ProductName,UnitPrice
  FROM Products
  WHERE UnitPrice>(SELECT AVG(UnitPrice) FROM Products)
```
- 查询上面这个视图：
```sql
SELECT * FROM [Products Above Average Price]
```
- 另一个来自 Northwind 数据库的视图实例会计算在 1997 年每个种类的销售总数。请注意，这个视图会从另一个名为 "Product Sales for 1997" 的视图那里选取数据：
```sql
CREATE VIEW [Category Sales For 1997] AS
SELECT DISTINCT CategoryName,Sum(ProductSales) AS CategorySales
FROM [Product Sales for 1997]
GROUP BY CategoryName
```
- 查询上面这个视图：
```sql
SELECT * FROM [Category Sales For 1997]
```
- 也可以向查询添加条件。现在，我们仅仅需要查看 "Beverages" 类的全部销量：
```sql
SELECT * FROM [Category Sales For 1997]
WHERE CategoryName='Beverages'
```
## SQL 更新视图
语法
```sql
SQL CREATE OR REPLACE VIEW Syntax
CREATE OR REPLACE VIEW view_name AS
SELECT column_name(s)
FROM table_name
WHERE condition
```
- 现在，我们希望向 "Current Product List" 视图添加 "Category" 列。我们将通过下列 SQL 更新视图：
```sql
CREATE VIEW [Current Product List] AS
SELECT ProductID,ProductName,Category
FROM Products
WHERE Discontinued=No
```
## SQL 撤销视图
DROP VIEW
```sql
DROP VIEW Syntax
DROP VIEW view_name
```
---
**Via**
- [来源](http://www.w3school.com.cn/sql/sql_view.asp)
