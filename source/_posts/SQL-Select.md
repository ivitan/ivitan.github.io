---
title: SQL Select 语句
date: 2018-03-27 15:14:46
tags:
- SQL
toc: true
categories: notes
thumbnail: /images/SQL.png
---
SELECT 语句用于从数据库中选取数据。结果被存储在一个结果表中，称为结果集。
<!--more-->
# SELECT语法
```sql
SELECT column_name,column_name
FROM table_name;
```
```sql
SELECT * FROM table_name;
```
SELECT Column 实例
下面的 SQL 语句从 "Websites" 表中选取 "name" 和 "country" 列：
```sql
SELECT name,country FROM Websites;
```

# SQL SELECT DISTINCT 语句
在表中，一个列可能会包含多个重复值，有时您也许希望仅仅列出不同（distinct）的值。DISTINCT 关键词用于返回唯一不同的值。

SELECT DISTINCT 语法
```sql
SELECT DISTINCT column_name,column_name
FROM table_name;
```

SELECT DISTINCT 实例
下面的 SQL 语句仅从 "Websites" 表的 "country" 列中选取唯一不同的值，也就是去掉 "country" 列重复值：
```sql
SELECT DISTINCT country FROM Websites
```

# SQL WHERE 子句
WHERE 子句用于提取那些满足指定标准的记录。

SQL WHERE 语法
```sql
SELECT column_name,column_name
FROM table_name
WHERE column_name operator value;
```

WHERE 子句实例
下面的 SQL 语句从 "Websites" 表中选取国家为 "CN" 的所有网站：
```sql
SELECT * FROM Websites WHERE country='CN';
```

WHERE 子句中的运算符
下面的运算符可以在 WHERE 子句中使用：

| 运算符 | 描述 |
|:----|:---|
| = | 等于|     
| <> | 不等于 注释:在SQL的一些版本中该操作符可被写成!=|    
| > | 大于|      
| < | 小于|      
| >= | 大于等于|    
| <= | 小于等于|     
| BETWEEN | 在某个范围内|     
| LIKE | 搜索某种模式|   
| IN | 指定针对某个列的多个可能值|       


# SQL AND & OR 运算符
AND & OR 运算符用于基于一个以上的条件对记录进行过滤。
AND & OR 运算符
1. 如果第一个条件和第二个条件都成立，则 AND 运算符显示一条记录。
2. 如果第一个条件和第二个条件中只要有一个成立，则 OR 运算符显示一条记录。

从 "Websites" 表中选取国家为 "CN" 且alexa排名大于 "50" 的所有网站：
```sql
SELECT * FROM Websites
WHERE country='CN'
AND alexa > 50;
```
从 "Websites" 表中选取国家为 "USA" 或者 "CN" 的所有客户：
```sql
SELECT * FROM Websites
WHERE country='USA'
OR country='CN';
```

# SQL ORDER BY 关键字
ORDER BY 关键字用于对结果集按照一个列或者多个列进行排序。

ORDER BY 关键字默认按照升序对记录进行排序。如果需要按照降序对记录进行排序，可以使用 DESC 关键字。

SQL ORDER BY 语法
```sql
SELECT column_name,column_name
FROM table_name
ORDER BY column_name,column_name ASC|DESC;
```

从 "Websites" 表中选取所有网站，并按照 "alexa" 列排序：
```sql
SELECT * FROM Websites
ORDER BY alexa;
```

ORDER BY DESC 实例
下面的 SQL 语句从 "Websites" 表中选取所有网站，并按照 "alexa" 列降序排序：
```sql
SELECT * FROM Websites
ORDER BY alexa DESC;
```
ORDER BY 多列
下面的 SQL 语句从 "Websites" 表中选取所有网站，并按照 "country" 和 "alexa" 列排序：
```sql
SELECT * FROM Websites
ORDER BY country,alexa;
```

# SQL INSERT INTO 语句
INSERT INTO 语句用于向表中插入新记录。

SQL INSERT INTO 语法
INSERT INTO 语句可以有两种编写形式。
1. 第一种形式无需指定要插入数据的列名，只需提供被插入的值即可：
```sql
INSERT INTO table_name
VALUES (value1,value2,value3,...);
```
2. 需要指定列名及被插入的值：
```sql
INSERT INTO table_name (column1,column2,column3,...)
VALUES (value1,value2,value3,...);
```

INSERT INTO 实例
假设我们要向 "Websites" 表中插入一个新行。
```sql
INSERT INTO Websites (name, url, alexa, country)
VALUES ('百度','https://www.baidu.com/','4','CN');
```

在指定的列插入数据
下面的 SQL 语句将插入一个新行，但是只在 "name"、"url" 和 "country" 列插入数据（id 字段会自动更新）：
```sql
INSERT INTO Websites (name, url, country)
VALUES ('stackoverflow', 'http://stackoverflow.com/', 'IND');
```

# SQL LIKE 操作符
LIKE 操作符用于在 WHERE 子句中搜索列中的指定模式。

SQL LIKE 语法
```sql
SELECT column_name(s)
FROM table_name
WHERE column_name LIKE pattern;
```

SQL LIKE 操作符实例
下面的 SQL 语句选取 name 以字母 "G" 开始的所有客户：
```sql
SELECT * FROM Websites
WHERE name LIKE 'G%';
```
提示："%" 符号用于在模式的前后定义通配符（缺省字母）。您将在下一章中学习更多有关通配符的知识。

选取 name 以字母 "k" 结尾的所有客户：
```sql
SELECT * FROM Websites
WHERE name LIKE '%k';
```
通过使用 NOT 关键字，您可以选取不匹配模式的记录。

下面的 SQL 语句选取 name 不包含模式 "oo" 的所有客户
```sql
SELECT * FROM Websites
WHERE name NOT LIKE '%oo%';
```

# SQL 连接(JOIN)
SQL join 用于把来自两个或多个表的行结合起来。
SQL JOIN 子句用于把来自两个或多个表的行结合起来，基于这些表之间的共同字段。

最常见的 JOIN 类型：SQL INNER JOIN（简单的 JOIN）。 SQL INNER JOIN 从多个表中返回满足 JOIN 条件的所有行。
```sql
SELECT Websites.id, Websites.name, access_log.count, access_log.date
FROM Websites
INNER JOIN access_log
ON Websites.id=access_log.site_id;
```

## 不同的 SQL JOIN
JOIN 类型：
1. INNER JOIN：如果表中有至少一个匹配，则返回行
2. LEFT JOIN：即使右表中没有匹配，也从左表返回所有的行
3. RIGHT JOIN：即使左表中没有匹配，也从右表返回所有的行
4. FULL JOIN：只要其中一个表中存在匹配，则返回行

SQL INNER JOIN 语法,INNER JOIN 与 JOIN 是相同的。
```sql
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name=table2.column_name;
```
或：
```sql
SELECT column_name(s)
FROM table1
JOIN table2
ON table1.column_name=table2.column_name;
```

##  LEFT JOIN 
LEFT JOIN 关键字从左表（table1）返回所有的行，即使右表（table2）中没有匹配。如果右表中没有匹配，则结果为 NULL。

SQL LEFT JOIN 语法
```sql
SELECT column_name(s)
FROM table1
LEFT JOIN table2
	ON table1.column_name=table2.column_name;
```
或：
```sql
SELECT column_name(s)
FROM table1
LEFT OUTER JOIN table2
ON table1.column_name=table2.column_name;
```
## SQL RIGHT JOIN 
RIGHT JOIN 关键字从右表（table2）返回所有的行，即使左表（table1）中没有匹配。如果左表中没有匹配，则结果为 NULL。
```sql
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name=table2.column_name;
```
或：
```sql
SELECT column_name(s)
FROM table1
RIGHT OUTER JOIN table2
ON table1.column_name=table2.column_name;
```
## FULL OUTER JOIN 关键字
FULL OUTER JOIN 关键字只要左表（table1）和右表（table2）其中一个表中存在匹配，则返回行.
FULL OUTER JOIN 关键字结合了 LEFT JOIN 和 RIGHT JOIN 的结果。
```sql
SQL FULL OUTER JOIN 语法
SELECT column_name(s)
FROM table1
FULL OUTER JOIN table2
ON table1.column_name=table2.column_name;
```

# SQL UNION 操作符
SQL UNION 操作符合并两个或多个 SELECT 语句的结果。

UNION 操作符用于合并两个或多个 SELECT 语句的结果集。
	
请注意，UNION 内部的每个 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每个 SELECT 语句中的列的顺序必须相同。
```sql
SELECT column_name(s) FROM table1
UNION
SELECT column_name(s) FROM table2;
```
注释：默认地，UNION 操作符选取不同的值。如果允许重复的值，请使用 UNION ALL。

SQL UNION ALL 语法
```sql
SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;
```
注释：UNION 结果集中的列名总是等于 UNION 中第一个 SELECT 语句中的列名。

带有 WHERE 的 SQL UNION ALL
下面的 SQL 语句使用 UNION ALL 从 "Websites" 和 "apps" 表中选取所有的中国(CN)的数据（也有重复的值）：
```sql
SELECT country, name FROM Websites
WHERE country='CN'
UNION ALL
SELECT country, app_name FROM apps
WHERE country='CN'
ORDER BY country;
```
