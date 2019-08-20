---
title: MySQL 基础语句
date: 2018-07-12 15:51:25
tags:
- MySQL
- SQL
categories: notes
toc: true
thumbnail: /images/MySQL.png
enable_unread_badge: true
---
MySQL 基础语句
<!--more-->
# MySQL 语句的规范
1. 关键字与函数名称全部大写
2. 数据库名称、表名称、字段名称全部小写
3. SQL语句必须以分号结尾

# 数据类型
数据类型是指列、存储过程参数、表达式和局部变量的数据特征,它决定了数据的存储格式,代表了不同的信息类型。

## 字符型
|列类型|存储需求|    
|:---|:---|
|CHAR(M)|M个字节,0<=M<=255|
|VARCHAR(M)|L+1个字节,其中L<=M且0<=M<= 65535|
|TINYTEXT|L+1个字节,其中L<2^8^|
|TEXT|L+2个字节,其中L<2^16^|
|MEDIUMTEXT|L+3个字节,其中L<2^24^|
|LONGTEXT|L+4个字节,其中L<2^32^|
|ENUM('value','value2',...)|1或2个字节,取决于枚举值的个数(最多65.535个值)|
|SET('valuel','value2',...)|1、2、3、4或者8个字节,取决于set成员的数目(最多64个成员)|


## 整型
|数据类|型存储范围|字节|
|:---|:---|:---|
|TINYINT|有符号值:-128到127(-2^7^到2^7^-1)无符号值:0到255(0到2^8^ -1)|1|
|SMALLINT|有符号值:-32768到32767(2^15^到2^15^-1)无符号值:0到65535 (0到2^16^-1)|2|
|MEDIUMINT|有符号值:-8388608到8388607(-2^23^到2^23^-1)无符号值:0到16777215(0到2^24^-1)|3|
|INT|有符号值:-2147483648到2147483647(-2^31^到2^31^-1)无符号值:0到4294967295(0到2^32^-1)|4|
|BIGINT|有符号值:-9223372036854775808到9223373036854775807 (-2^63^到2^63^-1),无符号值:0到18446744073709551615(0到2^64^-1)|8|


## 浮点型
![Screenshot_20180712-142200.jpg](https://i.loli.net/2018/07/12/5b46f3cadd49b.jpg)

## 日期时间型
|列类型|存储需求|
|:---|:---|
|YEAE|1|
|TIME|3|
|DATE|3|
|DATETIME|8|
|TIMESTAMP|4|
---

# 语法
## MySQL 登录
```sql
mysql -h 127.0.0.1  -u root -p
```

|参数|描述|
|:---|:---|
|-D,-database naime|打开指定数据库|
|--delimiter = naime|指定分隔符|
|-h,-host taine|服务器名称|
|-p,--password [-name]|密码|
|-p,--prot=#|端口号|
|--prompt line|设置提示符|
|-u,--user=name|用户名|
|-V,--version|輸出版本信息并且退出|


## 修改MySQL提示符
1. 连接客户端时通过参数指定
```sql
mysql -uroot -proot --prompt 提示符
```
2.连接上客户端后,通过 prompt 命令修改
```
mysql>prompt 提示符
```

|参数|描述|
|:---|:---|
|\D|完整的日期|
|\d|当前数据库|
|\h|服务器名称|
|\u|用户名称|


# MySQL 常用语句
```sql
当前服务器版本
SELECT VERSION();
显示当前日期时间
SELECT NOW();
显示当前用户
SELECT USER();
```

## 创建数据库
```sql
CREATE(DATABASE SCHEMA [IF NOT EXISTS] name

[DEFAULT] CHARACTER SET [=] charset_name
```

## 查看当前服务器下的数据表列表
```sql
SHOW (DATABASES SCHEMAS}

[LIKE 'pattern' | WHERE expr]
```

## 修改数据库
```
ALTER {DATABASE SCHEMA} [db_name]

[DEFAULT] CHARACTER SET [=] charset_name
```

## 删除数据库
```sql
DROP {DATABASE | SCHEMA} [IF EXISTS] db_name
```

# 表
数据表(或称表)是数据库最重要的组成部分之一,是其他对象的基础。

## 创建数据表
```sql
CREATE TABLE [IF NOT EXISTS] table_name(
column name data_type,
...
	)
```
## 查看数据表列表
```sql
SHOW TABLES [FROM db name]
[LIKE 'pattern' | WHERE expr]
```
```sql
SHOW TABLES [FROM db name]
```

## 查看数据表结构
```sql
SHOW COLUMNS FROM table_name
```

## 插入记录
```sql
INSERT [INTO] table_name[(column_name...)] VALUES(val,...)
```

## 记录查找
```sql
SELECT expr,... FROM table_name
```
## 空值与非空
1. NULL,字段值可以为空
2. NOT NULL,字段值禁止为空

## AUTO_INCREMENT
自动编号,且必须与主键组合使用,默认情况下,起始值为1, 每次的增量为1.

# 约束
1. 约束保证数据的完整性和一致性。
2. 约束分为表级约束和列级约束。

## 约束类型包括:
- NOT NULL (非空约束)
- PRIMARY KEY (主键约束)
- UNIQUE KEY (唯一约束)
- DEFAULT (默认约束)
- FOREIGN KEY (外键约束)

## PRIMARY KEY 主键约束
1. 每张数据表只能存在一个主键
2. 主键保证记录的唯一性
3. 主键自动为 NOT NULL

## UNIQUE KEY 唯一约束
1. 唯一约束可以保证记录的唯一性
2. 唯一约束的字段可以为空值(NULL)
3. 每张数据表可以存在多个唯一约束

## DEFAULT 默认值
- 当插入记录时,如果没有明确为字段赋值,则自动赋予默认值。
```sql
CREATE TABLE tb5{
id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
usernate VARCHAR(20) NOT NUL UNIQUE KEY,
sex ENIUM('1', '2',3') DEFAULT '3'
```

## FOREIGN KEY
- 作用
1. 保持数据一致性,完整性。
2. 实现一对一或一对多关系。

- 外键约束的要求
	1. 父表和子表必须使用相同的存储引擎,而且禁止使用临时表。
	2. 数据表的存储引擎只能为InnoDB。
	3. 外键列和参照列必须具有相似的数据类型。其中数字的长度
	或是否有符号位必须相同;而字符的长度则可以不同。
	4. 外键和参照列必须创建索引。如果外键列不存在索引的话,MySQL将自动创建索引。

- 外键约束的参照操作
	1. CASCADE:从主表删除或更新且自动删除或更新子表中配的行
	2. SET NULL:从主表删除或更新行,并设置子表中的外键列为NULL。如果使用该选项,必须保证子表列没有指定NOT NULL
	3. RESTRICT: 拒绝对父表的删除或更新操作。
	4. NO ACTION:标准SQL的关键字,在MySQL中与RESTRICT相同

- 表级约束与列级约束
	- 对一个数据列建立的约束,称为列级约束,
	- 对多个数据列建立的约束,称为表级约束,
	- 列级约束既可以在列定义时声明,也可以在列定义后声明,
	- 表级约束只能在列定义后声明.

# 修改数据表
## 添加列
```sql
ALTER TABLE table_name ADD [COLUMN] colname
column_definition [FIRST | AFTER col_name]
```

## 添加多列
```sql
ALTER TABLE table_name ADD [COLUMN]
(col_name column_definitio,n...)
```

## 删除列
```sql
ALTER TABLE table_name DROP [COLUMN] colname
```

## 添加主键约束
```sql
ALTER TABLE table_name ADD [CONSTRAINT [symbol]]
PRIMARY KEY [index_type](index_col namer...)
```

## 删除主键约束
```sql
ALTER TABLE table_name DROP PRIMARY KEY
```

## 添加唯一约束
```sql
ALTER TABLE table_name ADD [CONSTRAINT [symbol]]
UNIQUE [INDEX|KEY] [index_name] [index_type]
(index_col name,...)
```

## 删除唯一约束
```sql
ALTER TABLE tbl_name DROP {INDEX|KEY} index_name
```
# 修改
## 添加/删除默认约束
```sql
ALTER TABLE table_name ALTER [COLUMN] column_name
{SET DEFAULT literal | DROP DEFAULT}
```

## 删除外键约束
```sql
ALTER TABLE table_name DROP FOREIGN KEY fk_symbol
```

## 修改列定义
```sql
ALTER TABLE table_name MODIFY [COLUMN] col_name
column_definition [FIRST | AFTER col_name]
```

## 修改列名称
```sql
ALTER TABLE tbl_name CHANGE [COLUMN] old_col_name
new col_name column_definition [FIRST | AFTER col_name]
```

## 数据表更名
- 方法一
```sql
ALTER TABLE table_name RENAME [TO[AS] new_tbl_name
```
- 方法二
```sql
RENAME TABLE tbl_name TO new_tbl_name
[, tbl_name2 TO new_tb_name2]
```
# 基础语法
## INSERT
```sql
INSERT [INTO] table_name [(column_name,...)) {VALUES | VALUE}
({expr | DEFAULT,...),(...)....
```
```sql
INSERT [INTO] table_name SET col_name={expr | DEFAULT},...
```
说明:与第一种方式的区别在于,此方法可以使用子查询(SubQuery)

```sql
INSERT [INTO] tbl_name [(col_name,...] SELECT...
```
说明:此方法可以将查询结果插入到指定数据表。

## UPDATE
- UPDATE 更新记录值(单表)
```sql
UPDATE [LOW_PRIORITY] [IGNORE] tabl_ reference SET
col_name1={expr1 | DEFAULT} [, col_name2={expr2 | DEFAULT}]...
[WHERE where_condition]
```

##DELETE 删除记录(单表刪除)
```sql
DELETE FROM table_name [WHERE where_condition]
```

## SELECT
```sql
SELECT select_expr[,select_expr...]
[
FROM table_references
[WHERE where_condition]
[GROUP BY {col_name | position} [ASC | DESC],...]
[HAVING where_condition]
[ORDER BY {col_name | expr |  position) [ASC | DESC],...]
[LIMIT {[offset,] row_count | row_count OFFSET offset}]
]
```
### 以上选项含义
- select_expr 查询表达式
	- 每一个表达式表示想要的一列,必须有至少一个。
	- 多个列之间以英文逗号分隔。
	- 星号(*)所有列。 table_name. *可以命名表的所有列。
	- 查询表达式可以使用[AS] alias_name为其赋予别名。
	- 别名可用于GROUP BY ORDER BY或HAVING子句。

## WHERE 条件表达式
1. 对记录进行过滤,如果没有指定WHERE子句,则显示所有记录。
2. 在WHERE表达式中,可以使用MySQL支持的函数或运算符。

## GROUP BY 查询结果分组
```sql
[GROUP BY {col_name position} [ASC | DESC],...]
```

## HAVING 条件分组
```sql
[HAVING where_condition]
```

## ORDER BY 对查询结果进行排序
```sql
[ORDER BY {col_name | expr | position} [ASC | DESC],..]
```

## LIMIT 限制查询结果返回的数量
```sql
[LIMIT {[offset,] row_count | row_count OFFSET offset}]
```
# 子查询
子查询(Subquery)是指出现在其他SQL语句内的SELECT子句。
```sql
SELECT * FROM t1 WHERE coll = (SELECT col2 FROM t2);
其中SELECT FROM t1,称为Outer Query/Inner Statement
SELECT col2 FROM t2 ,称为SubQuery
```

- 子查询指嵌套在查询内部,且必须始终出现在圆括号内。
- 子查询可以包含多个关键字或条件,
	* 如DISTINCT、GROUP BY、ORDER BY, LIMIT函数等。
- 子查询的外层查询可以是:SELECT INSERT, UPDATE.SET或DO。

	1. 子查询返回值
- 子查询可以返回标量、一行、一列或子查询。
	1. 使用比较运算符的子查询
- 使用比较运算符的子查询
	* =, >, < >, <= <>. !>, <=>
- 语法结构
	* operand comparison operator subquery

# 用 ANY,SOME  或 ALL 修饰的比较运算符
```sql
operand comparison operator ANY (subquery)
operand comparison operator SUM (subquery)
operand comparison operator ALL (subquery)
```
- ANY、SOME、ALL关键字

|运算符|ANY|SOME|ALL|
|:---|:---|:---|:---|
|>,>=|最小值|最小值|最大值|
|<,<=|最大值|最大值|最小值|
|=|任意值|任意值||
|<>,!=|||任意值|
