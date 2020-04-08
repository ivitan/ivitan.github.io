---
title: SQL EXISTS
date: 2018-04-15 18:12:22
tags:
- SQL
toc: true
categories: Database
---
SQL 中 EXISTS
<!--more-->
# 三点概念
概念
- `EXISTS` 子查询找到的提交
- `NOT EXISTS `子查询中 找不到的提交

说明
- 不要去翻译为存在和不存在，把脑袋搞晕。
- `exists`代表存在量词`ョ`，该查询结果没有值，只有逻辑值真true和逻辑假false两个值。
  - 建立程序循环的概念，这是一个动态的查询过程。如 FOR循环.
  - `Exists`执行的流程`Exists`首先执行外层查询，再执行内存查询,与`IN`相反。 流程为首先取出外层中的第一元组，再执行内层查询，将外层表的第一元组代入,若内层查询为真，即有结果时。返回外层表中的第一元 组，接着取出第二元组，执行相同的算法。一直到扫描完外层整表。
  ```SQL
  for(int i =0;  i<>EOFout;i++)
    {
    for (int j = 0 ; j<EOFint,j++)
    }
  ```
# 例子
表
学生表student (Sno,Sname)

课程表course (Cno,Cname)

选课表SC(Sno,Cno)

要求查询出 ：选修了全部课程的学生姓名

## 思路
思路一
首先学生的选课信息存在于SC表中， 要想知道某个学生是否选修了全部课程，至少我们需要知道一共有几门课程，这是首要的条件。其次，学生选修了与否，我们又要扫描SC全表，统计出选修了所有课程的学生号，最后在STUDENT表中根据学生号打出姓名 。
- 语句如下：
```SQL
  select Sname from student
  where Sno IN
  (select Sno from SC
  group by Sno
   //根据Sno分组，统计每个学生选修了几门课程。如果等于course的总数，就是我们要找的Sno
  having count(*) = (select count(*) from course ))
  //统计course中共有几门课程
```
另一种思路：
- 引入：将题目换为 查找学号为 00003 没有选修的科目
  - 思路：我们可以将已知学号代入，把每一个科目代入（循环），这将形成`1*count(*)`种组合。将这组成作为条件，一一与SC表种进行比对，找不到匹配的我们提交.
```SQL
select Cname from course  where
not exists  //找不到的组合，提交course
(select * from SC where course.cno = cno and sno = ''00002'')
//在SC中匹配
```
- 查找没有 没有选修科目的学生姓名
  - 思路：
    - 学号未知,科目未知，说明有两个未知变量。应该有两个EXISTS。我们可以扫描student 和 course共有 s * c 中组合，将这些组合与SC的每一项进行匹配，注意s*c组合已经包含所有可能。如果全部找到 ，就说明已经选修了全部课程。找不到就说明有课程没选修 。再将没选修的的提交给上一exists 循环 。若上一exists 不存在的再提交给外循环。
    ```SQL
    select Sname from student
    where NOT exists        //
    (select  * from course
    where NOT exists      //不存在的提交给course
    (select * from SC where
    Sno = student.sno  and cno = Course.Cno))   // 代入两个未知变量
    ```
  - 选修了全部课程的学生姓名.
  将这组成作为条件，一一与SC表种进行比对，找不到匹配的我们提交 。
  ```SQL
  select Cname from course where
  not exists  //找不到的组合，提交course
  (select * from SC where course.cno = cno and sno = ''00003'')
  //在SC中匹配
  ```
  - 查找没有选修科目的学生姓名
    - 思路：1. 学号未知 科目未知 说明有两个未知变量。2. 应该有两个`EXISTS`。我们可以扫描`student`和`course`共有` s*c `中组合，将这些组合与SC的每一项进行匹配，注意s*c组合已经包含所有可能。如果全部找到 ，就说明已经选修了全部课程。找不到就说明有课程没选修 。再将没选修的的提交给上一exists 循环 。若上一exists 不存在的再提交给外循环。

  - 查询选修了全部课程的学生姓名。
  ```SQL
  SELECT Sname
  FROM Student
  WHERE NOT EXISTS
  （SELECT *
  FROM Course
  WHERE NOT EXISTS
  (SELECT *
  FROM SC
  WHERE Sno= Student.Sno
  AND Cno= Course.Cno）
  ```
  - 查询所有选修了001课程的学生名单
  ```SQL
  select sname
  from student a
  where exists (
  select *
  from sc b
  where a.sno=b.sno and cno='001')
  ```
  - 查询没有选修了001课程的学生名单
  ```SQL
  select sname
  from student a
  where not exists (
  select *
  from sc b
  where a.sno=b.sno and cno='001')
  ```
  - 查询选修了所有课程的学生名单。

  由于SQL中没有全称量词，可以这样理解：查询这样的学生，没有一门课程他没有选
  ```SQL
  select sname
  from student a
  where not exists (
  select *
  from course b
  where not exists (
  select *
  from sc c
  where a.sno=c.sno and c.cno=b.cno))
  ```
  注意：SQL没有蕴涵谓词，可以使用等价变换进行转换`p→q ≡ ┑p∨q`

  - 查询至少选修了学生95002选修的全部课程的学生名单。

  将查询进行变换： p表示的谓词：95002选修了课程y

  q表示的谓词：学生x选修了课程y

  该查询转换为：( y)p→q

  进一步转换：( y)p→q ≡

  ┑(ョy( ┑(p→q))) ≡ ┑(ョy( ┑(┑p∨q)))

  ≡ ┑ョy(p∧q) 德模根定律

  它所表达的含义为：不存在这样的课程y，95002选修了y而x没有选，SQL语句如下：
  ```SQL
  select sname,sno
  from student a
  where sno <> '95002' and not exists (
  select *
  from sc b
  where sno='95002' and not exists (
  select *
  from sc c
  where a.sno=c.sno and c.cno=b.cno))
  ```

[参考：](http://www.cnblogs.com/losesea/archive/2012/06/14/2549023.html)
