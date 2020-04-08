---
title: Python SQL
date: 2018-11-22 11:33:20
tags:
  - WebCrawler
  - Python
  - Note
categories:
  - Coding
  - Python
author:
  name: Vitan
toc: true
---
Python SQL 操作
<!--more-->
# MonngoDB
## 连接
```python
    import pymongo

    # 普通连接
    client = MongoClient('localhost', 27017)
    # client = MongoClient('mongodb://localhost:27017/')
    
    # 密码连接
    client = MongoClient('mongodb://username:password@localhost:27017/dbname')
    db = client.mydatabase
    # db = client['mydatabase']
```

## 增删查改

- 增(insert)

```python
    # 增加一条记录
    person = {'name': 'zone','sex':'boy'}
    person_id = test.insert_one(person).inserted_id
    print(person_id)
    
    # 批量插入
    persons = [{'name': 'zone', 'sex': 'boy'}, {'name': 'zone1', 'sex': 'boy1'}]
    result = test.insert_many(persons)
    print(result.inserted_ids)
```

- 删(delete)

```python
    import pymongo

    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["mydatabase"]
    mycol = mydb["customers"]

    # 删除地址为“Mountain 21”的文档：
    myquery = { "address": "Mountain 21" }
    mycol.delete_one(myquery)

    # delete_many() 删除多个
    myquery = { "address": {"$regex": "^S"} }
    x = mycol.delete_many(myquery)
    print(x.deleted_count, " documents deleted.")
```
 
```python
    # 删除单条记录
    result1 = test.delete_one({'name': 'zone'})
    pprint.pprint(result1)

    # 批量删除
    result1 = test.delete_many({'name': 'zone'})
    pprint.pprint(result1)
```

- 改(update)

```python
    # Valley 345”更改为“Canyon 123” 
    myquery = { "address": "Valley 345" }
    newvalues = { "$set": { "address": "Canyon 123" } }

    mycol.update_one(myquery, newvalues)

    #print "customers" after the update:
    for x in mycol.find():
        print(x)

    # update_many() 更新多个
    myquery = { "address": { "$regex": "^S" } }
    newvalues = { "$set": { "name": "Minnie" } }

    x = mycol.update_many(myquery, newvalues)

    print(x.modified_count, "documents updated.")
```

```python
    # 更新单条记录
    res = test.update_one({'name': 'zone'}, {'$set': {'sex': 'girl girl'}})
    print(res.matched_count)

    # 更新多条记录
    test.update_many({'name': 'zone'}, {'$set': {'sex': 'girl girl'}})
```

- 查(Querry)

```python
    import pymongo

    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["mydatabase"]
    mycol = mydb["customers"]

    # 查找地址以字母“S”或更高开头的文档：
    myquery = { "address": { "$gt": "S" } }

    mydoc = mycol.find(myquery)

    for x in mydoc:
        print(x)
    

    # 正则表达式过滤
    myquery = { "address": { "$regex": "^S" } }

    mydoc = mycol.find(myquery)

    for x in mydoc:
        print(x)
```

```python
    import pprint

    # 查找多条记录
    pprint.pprint(test.find())

    # 添加查找条件
    pprint.pprint(test.find({"sex": "boy"}).sort("name"))
```

# 排序

- sort()方法

```python
results = collection.find().sort('name', pymongo.ASCENDING)
print([result['name'] for result in results])
```

## 示例
```python
    client = pymongo.MongoClient('localhost')
    b = client['MaFengWoView']

    def save_to_mongo(view):
    if db['MaFengWoView'].insert_one(view):
        print('Saving to MongoDB',view)
        return True
    return False

     save_to_mongo(view)
```

# MySQL
## 连接创建

- 创建一个名为“customers”的表

```python
    import mysql.connector

    mydb = mysql.connector.connect(
    host="localhost",
    user="yourusername",
    passwd="yourpassword",
    database="mydatabase"
    )

    mycursor = mydb.cursor()

    mycursor.execute("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))")
```

- 检查表是否存在

```python
    mycursor = mydb.cursor()

    mycursor.execute("SHOW TABLES")

    for x in mycursor:
        print(x)
```

- 创建表时创建主键(存在用ALTER TABLE)

```python
    import mysql.connector

    mydb = mysql.connector.connect(
    host="localhost",
    user="yourusername",
    passwd="yourpassword",
    database="mydatabase"
    )

    mycursor = mydb.cursor()

    mycursor.execute("CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))")
```

# 插入

- 单行

```python
    mycursor = mydb.cursor()

    sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
    val = ("John", "Highway 21")
    mycursor.execute(sql, val)

    mydb.commit()

    print(mycursor.rowcount, "record inserted.")
```

- 多行

```python
    mycursor = mydb.cursor()

    sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
    val = [
        ('Peter', 'Lowstreet 4'),
        ('Amy', 'Apple st 652'),
        ('Hannah', 'Mountain 21'),
        ('Michael', 'Valley 345'),
        ('Sandy', 'Ocean blvd 2'),
        ('Betty', 'Green Grass 1'),
        ('Richard', 'Sky st 331'),
        ('Susan', 'One way 98'),
        ('Vicky', 'Yellow Garden 2'),
        ('Ben', 'Park Lane 38'),
        ('William', 'Central st 954'),
        ('Chuck', 'Main Road 989'),
        ('Viola', 'Sideway 1633')
        ]

    mycursor.executemany(sql, val)

    mydb.commit()

    print(mycursor.rowcount, "was inserted.")
```

## Select

- 所有

```python
    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM customers")

    myresult = mycursor.fetchall()

    for x in myresult:
        print(x)
```

- 列

```python
    mycursor = mydb.cursor()

    mycursor.execute("SELECT name, address FROM customers")

    myresult = mycursor.fetchall()

    for x in myresult:
         print(x)
```
---
**参考**
- [官方文档](https://api.mongodb.com/python/current/tutorial.html)
- [W3School](https://www.w3schools.com/python/python_mongodb_drop_collection.asp)
- [zone](https://juejin.im/post/5be245b251882516bc477aae)
