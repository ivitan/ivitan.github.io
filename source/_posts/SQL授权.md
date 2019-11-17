---
title: SQL 授权
date: 2018-05-16 20:01:59
tags:
- SQL
toc: true
permalink: SQLgrant
categories: Database
thumbnail: /images/SQL.png
---
 SQL授权
<!--more-->
# 授权命令
语法
```sql
grant <权限名>[ ,<权限名>] on <对象>
to 用户1,用户2,... | public [with grant option]
```
- 对应不同对象,有不可权限,代表不同的操作(语句)。
	注音: All Privileges--對象上的所有权限的总和。
- public --表示所有用户
- 指定With grant option时,用户可以获得的权限转受给其他用户;否則,用户只能使用而不能转受。
- SQL 标准允许具有with grant option 的用户把相应的权限或其子集传递授予其他用户,但不允许循环授权,即被授权者不能把权限再授回给授权者或其祖先.

DBA 执行了如下语句:
```sql
grant select, update on Student to Liming
with grant option
```
- 则 `DBA` 把对 `Student` (基本表或视图)的权限赋给用户 Liming,因为有`with grant option`,所以 Lining 可以把这个权限再转授给其他用户。

用户 Liming 执行了如下语句:
```sql
grant select(Sno, Sname), update (Sname)
on Student to U5
```
- 则 `Liming` 把对 `Student` 上某些列的权限赋给用户` U5`,但 U5不可以把这个权限再转授给其他用户。

DBA 对表查询的权限授予所有用户
```sql
grant select on SC to public
```
Grant 还可以实现数据库类型和模式类型权限管理,格式如下:

```sql
grant 权限名[,...] to user1,user2,...
| public[with grant option]
```

授予用户 Liming 具有创建数据表和图的权限
```sql
grant create table, create view to Liming
```

# 收回权限
语法
```sql
revoke 权限名[ ,…] on 对象 form
用户1,用户2,… | public
```
- 收回权限时,若该用户已将权限转授给其他用户，则这些转受的权限也一并收回。

DBA 执行以下语句:
```sql
revoke update on Student from Liming
```
- DBA 回收用户` Liming` 的对` Student` 的更新权限.理论上，Liming转受给用户U5的对Student某些列的更新权限也一并收回udent 某些列的更新权限也要一并收回

收回所有用户对表 SC 的查询权
```sql
Revoke select on SC from public
```
- `revoke`还可以实现数据库类型和模式类型权限收回,格式如下

```sql
revoke 权限名[ ,…] from 用户1,用户2,... | public
```

收回Liming 创建表的权限。
```sql
Revoke create table from Liming
```