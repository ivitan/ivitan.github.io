---
title: Shell
date: 2019-07-20 18:59:04
tags:
  - Linux
  - Shell
categories:
  - notes
author:
  - Vitan
toc: true
mathjax: false
enable_unread_badge: true
thumbnail: /images/Shell.png
---
Shell 总结
<!--more-->
# 变量替换和测试
## 变量替换

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190720191523.png)

## 变量测试

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190720191707.png)

# 字符串处理
## 计算字符串长度
方法一
```bash
${#string}
```

方法二
```bash
expr length "$string"
```
  - string 有空格，则必须加双引号

## 子串
获取子串在字符串中的索引位置

```bash
expr index $string $substring
```

抽取子串

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190720192503.png)

## 总结
计算字符串长度
```bash
var1="This is a app"
len=${#$var1}
len=`expr length "$var1"`
```

子串索引
```bash
var1="quicstart is a app"
ind=`expr index "$var1" start`
```

子串长度
```bash
var1="quicstart is a app"
ind=`expr match "$$var1" app`
```

抽取字符串中的子串
```bash
var1="quicstart is a app"
substr1=${var1:10}
substr2=${var1:10:6}
substr1=${var1:-5}
substr1=${var1:-10:4}
```
  - expr 索引1开始,${string:position}从0开始

实例
```bash
  #! /bin/bash
  string="Bigdata process framework is Hadoop,Hadoop is an open source project"

  function print_tips
  {
      echo "***********************"
      echo "(1) 打印string长度"
      echo "(2) 删除字符串中所有Hadoop"
      echo "(3) 替换第一个Hadoop为Mapreduce"
      echo "(4) 替换全部Hadoop为Mapreduce"
      echo "**********************"
    }

  function len_of_string
  {
    echo "${#string}"
  }

  function del_hadoop
  {
    echo "${string/Hadoop/}"
  }

  function rep_hadoop_mapreduce_first
  {
    echo "${string/Hadoop/Mapreduce}" 
  }

  function rep_hadoop_mapreduce_all
  {
    echo "${string//Hadoop/Mapreduce}" 
  }

  while true
  do 
    echo "【string=$string】"
    echo
    print_tips
    read -p "Pls input your choice(1|2|3|4|q|Q):" choice
    case $choice in
          1)  len_of_string
              ;;
          2)  del_hadoop
              ;;
          3)  rep_hadoop_mapreduce_first
              ;;
          4)  rep_hadoop_mapreduce_all
              ;;
          q|Q)  exit
                ;;
          *)
              echo "Error,input only in {1|2|3|4|q|Q}"
              ;;
          esac
  done
```

# 命令替换
语法格式

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190720194539.png)

## 例题
获取系统所有用户并输出
```bash
cat /etc/passwd | cut -d “:” -^C #分割的第一个
cat /etc/passwd | cut -d “:” -f 1 #分段
```

```bash
#! /bin/bash
# 判断进程是否存在，否则启动
nginx_process_num=$(ps -ef | grep nginx | grep -v grep | wc -l)

if [ $nginx_process_num -eq 0 ];then
    systemctl start nginx
fi
```

## 总结
`\`\`` 和 `$()`
1. ``和$()是等价的，但初学推荐$()
2. $(())用于进行整数运算，包括加减乘除
3. $(((100 + 30) / 12))

# 有类型变量
## declare 和 typeset 命令
两者关系:两者等价，都是用来定义变量类型

## declare参数表

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190720195605.png)

```bash
# 声明整数型变量
declare -i ab #声明整数型变量
ab=56 #改变变量内容
echo $ab #显示变量内容
56

# 改变变量属性
declare -i ef #声明整数型变量
ef=1  #变量赋值（整数值）
echo $ef #显示变量内容
1
ef="wer" #变量赋值（文本值）
echo $ef 
0

declare +i ef #取消变量属性
ef="wer"
echo $ef
wer

# 设置变量只读
declare -r ab #设置变量为只读
ab=88 #改变变量内容
echo $ab #显示变量内容
56

# 声明数组变量
declare -a cd='([0]="a" [1]="b" [2]="c")' #声明数组变量
echo ${cd[1]}
b #显示变量内容

echo ${cd[@]} #显示整个数组变量内容
a b c
```
  - `declare -x` 声明为环境变量，可在脚本中直接使用

## 取消声明的变量
```bash
declare +r
declare +i
declare +a
declare +X
```

# 数学运算
语法格式
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190720200443.png)

expr操作符对照表
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190720200649.png)

## 例子
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190720201000.png)

# Bash运算之bc
## bc 操作
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190720201134.png)
```bash
scale=2 #精确到小数点后两位
echo “20+22” | bc
echo “scale=3;23+33” | bc
```

# 函数
## 函数定义和使用
Linux Shell中的函数和大多数编程语言中的函数一样，将相似的任务或代码封装到函数中，供其他地方调用

语法一
```bash
  name()
  {
    command1
    command2
    ....
    commandn
  }
```

语法二
```bash
  function name
  {
    command1
    command2
    ....
    commandn
  }
```

## 如何调用
1. 直接使用函数名调用，可以将其想象成 Shell 中的一条命令
2. 函数内部可以直接使用函数 $1,$2...$n
3. 调用函数：function_name $1 $2

## 例题
```bash
  #!/bin/bash
  # 判断进程是否存在，否则启动

  #脚本名含有nginx会返回0
  # echo $$ 运行脚本产生的进程id
  this_pid=$$

  while true
  do
  ps -eff | grep nginx | grep -v grep | grep -v $this_pid &> /dev/null

  if [ $? -eq 0];then
      echo "Nignx is running well"
      sleepp 3
  else 
      systemctl start nginx
      echo "Nginx is down,start it.."
  fi
  done
```

判断进程
```bash
netstat -tnlp | grep :80
curl localhost/index.html
```

# 向函数传递参数
## shell传参
```bash
  function name
  {
    echo "Hello $1"
    echo "Hello $2"
  }
```

## 函数返回值
1. return
2. echo

### reutrn 返回值
1. 只能返回1-255的整数
2. 通常智能用来供其他地方调用获取状态，因此仅返回0（成功)，1(失败)

### echo 返回值
1. 可以返回任何字符串结果
2. 通常用于返回数据，如一个字符串值或列表值

# 局部变量全局变量
## 全局变量
1. 不做特殊处理，shell 中变量为全局变量
2. 大型脚本程序慎用


## 局部变量
1. 定义时，使用local关键字
2. 函数内外如果存在同名变量，册函数内部变量覆盖外部变量

## 函数库
- 为什么要定义函数库
1. 经常使用的重复代码封装成函数文件
2. 一般不直接执行，而是由其他脚本调用

实例
```bash 库文件
  function add
  {
      echo "`expr $1 + $2`"
  }

  function reduce
  {
      echo "`expr $1 - $2`"
  }

  function multiple
  {
      echo "`expr $1 \* $2`"
  }

  function diveid
  {
      echo "`expr $1 / $2`"
  }

  function sys_load
  {
      echo "Memory Info"
      free -m
      echo

      echo "Disk Usage"
      echo
      df -h 
  }
```
```bash 
#!/bin/bash
. /home/vitan/workplace/Shell/learn/function/base_function
add 122 3
reduce 9 3
multiple 22 11
diveid 12 3
sys_load
```

### 注意事项
1. 库文件名的后缀是任意的，但一般用 `.lib`
2. 库文件通常没有可执行权限
3. 库文件无需和脚本在同级目录，只需在脚本中引时指定
4. 第一行一般使用 `#!/bin/bash/echo` ，输出警告信息，避免用户执行

# 文件查找之find命令
find [路径][选项][操作]

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190720205155.png)

## 实例
1. 查找 /etc 目录下 conf 结尾的文件
```bash
fing /etc -name '.conf'
```
2. 查找当前目录下文件名为 aa 的文件，不区分大小写
```bash
find . -name aa
```
3. 查找文件属主为 hdfs 的所有文件
```bash
find . -user hdfs
```
4. 查找文件属组为 yarn 的所有文件
```bash
find . -group yarm
```
---

## 选项
1. -type
  - f 文件 find . -type f
  - d 目录 dind . -type d
  - c 字符设备文件 dind . -type c
  - b 块设备文件 dind . -type b
  - l 链接文件 dind . -type l
  - p 管道文件 dind . -type p

2. -size
  - -n 大小小于n的文件
  - +n 大小大于n的文件
  - n 大小等于n的文件
    
  ```bash
  # 小于10000字节的文件
  find /etc -size -10000c
  # 大于1M的文件
  find /etc -size +1M
  ```

3. -mtime
   - -n n天以内修改的文件
   - +n n天以外修改的文件
   - n 正好n天修改的文件

  ```bash
  #查找/etc下5天内修改的conf结尾的文件
  find /etc -mtime -5 -name '*.conf'       
  # 查找10天之前修改且属主为root的文件
  find /etc -mtime +10 -user root
  ```

4. -mmin
   - -n n分种内修改的文件
   - +n n分钟外修改的文件

  ```bash
  # 30分钟前修改的文件
  find /etc -mmin +30
  # 30分钟内修改的目录
  find /etc -mmin -3o -type d
  ```

5. -mindepth n
   - 表示从n级子目录开始搜索

  ```bash
  find /etc -mindepth 3
  ```

6. -maxdepth n
   - 表示最多搜索n-1级子目录

  ```bash
  find /etc -maxdepth 3 -name '*.conf'
  find ./etc -type f -name '.*conf' -size +10k -maxdepth 2
  find . -type f -nogroup
  ```

7. -perm
   - find .perm 644
  
8. -prune 
    - 通常和-path一起用，用于将特定目录排除在搜索条件之外

  ```bash
  # 查找当前目录下所有普通文件，排除test目录
  find . -path ./etc -prune -o -type f
  # 查找当前目录下所有普通文件，但排除etc和opt目录
  find . -path ./etc -prune -o -path ./opt -prune -o -type f
  # 当前目录所有普通文件，排除etc和opt目录，但属主为hdfs
  find . -path ./etc -prune -o -path ./opt -prune -o -type -f -a -user hdfs
  # 当前目录所有普通文件，排除etc和opt目录，但属主为hdfs,文件大小大于
  find . -path ./etc -prune -o -path ./opt -prune -o -type -f -a -user hdfs -a -size +2M
  ```

9. -newer file1
```bash
find /etc -newer a
```
+ 操作
  ```bash
  # 搜索/etc下的文件非目录，以conf结尾，大于19k，然后删除
  find ./etc -type -f -name '*.conf' -size +10k -exec rm -rf {} \;

  find /var/log/ -name '*.log' -mtime +7 -exec rm -rf {} \;
  find /etc -size +10k -type -f -name '*.conf' -exec cp {} /root/conf/ \;
  ```
  - -print 打印输出
  - -exec 对搜索的文件执行特定的操作
  - -ok 和exec功能一样，但每次操作都会给用户提示
  
+ 逻辑运算符
  - -a 与
  - -o 或
  - -not|! 非

# find locate whereis和 which 总结及使用场景分析
## locate
1. 文件查找命令，所属软件包mlocate
2. 不同于find命令是在整块磁盘中搜索，locate在数据库文件中查找
3. find默认全部匹配，locate默认部分匹配

- updatedb命令
  1. 用于更新/var/lib/mlocate/mlocate.db
  2. 所使用配置文件/etc/update.conf
  3. 该命令在后台cron计划任务定期执行

## whereis选项和含义
- -b 只返回二进制文件
- -m 只返回帮助文档文件
- -s 只返回源码文件

## which
- 仅查找二进制程序文件
- 选项
  - -b 只返回二进制文件

## 各命令使用场景推荐
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721094218.png)


# grep和egrep
## grep
语法
1. grep [option] [pattern] [file1,file2...]
2. command | grep [option] [pattern]

grep参数

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721094721.png)
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721094812.png)
  - grep -E “python | PYTHON” file

## egrep
egrep语法
```bash
egrep(选项)(查找模式)(文件名1，文件名2，……)
```
# sed
sed(Stream Editor)，流编辑器，对标准输出或文件逐行进行处理

## 语法
1. stdot | sed [option] "pattern command"
2. sed [option] "pattern command" file

## 选项

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721095810.png)

```bash
  sed ‘p’ sed.tet # p打印出来
  sed -n‘p’ sed.tet
  # 不加参数，原行也会再打印一次
  sed ‘/python/p’sed.txt  #查找行
  sed -n‘/python/p’sed.txt  #查找行
  # 多个匹配条件
  sed -n -e ‘/python/p’ -e ‘/PYTHON/p’ sed.txt
  #文件中的
  Vim edit.sed
  /python/p
  Sed -n -f edit.sed sed.txt
  Sed -n -r‘/python|PYTHON/p’ sed.txt #使用扩展正则表达式
  # 修改
  sed -n ‘s/love/like/g’ sed.txt # love替换为like
  sed -i‘s/love/like/g’ sed.txt #修改源文件
```

## sed 的pattern详解
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721100028.png)

```bash
  # 打印file的17行
  sed -n "17p" file
  # 打印10到20行
  sed -n "10,20p" file
  # 打印第10行开始，往后加5行的内容
  sed -n "10,+5p" file
  # 以root开头的行
  sed -n "/^root/p" file
  # 打印第一个匹配到ftp开头的行
  sed -n "/^root/,/^ftp/p" file
  # 打印第四行开始，到以hdgs开头的
  sed -n "4,/^hdfs/p" file
  # 匹配root的行，直到第10行结束
  sed -n "/root/,10p" file
```

## sed 中的编辑命令
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721100852.png)
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721100931.png)

```bash
  sed -i‘1d/ sed.txt # 删除第一行
  sed -i ‘1,3d’sed.txt # 删除1-3行
  sed -i ‘/\/sbin\/nologin/d’passwd # 把不可登录的账号删除
  sed -i ‘/^mail,/^ftp/d’pssswd #mail到ftp
  文本追加
  sed -i ‘/\/bin\/bash/a This is user which can login to system’pssswd # 行后追加
  sed -i ‘/^hdfs/,/&yarn/i AAAAAA’ pssswd # 行间追加
  sed -i ‘/root/r list’ passwd #把list内容追加root行后面
  sed -n‘/\/bin\/bash/w /tmp/user_login.txt’passwd #保存

  sed -i ‘s/\/bin\/bash/\/BIN\/BASH/g’passwd # 小写的替换为大写
  sed -i ‘a/root/ROOT/’passwd # 替换第一个root为大写
  sed -i ‘a/root/ROOT/2’passwd # 替换前两个个root为大写
  sed -i ‘s/hadoop/HADOOP/ig’str.txt #不区分大小写
  sed -n ‘/\/sbin\/nologin/=’passwd # 查看行号,不显示内容

  sed -i ‘s/had..p/hadoops/g’ sed.txt #.任意一个字符
  sed -i ‘s/had..p/&s/g’ sed.txt #hadXXp后面加s，反向引用
  sed -i ‘s\/(had..ps\)\/1O/g’ sed.txt #后加O
  sed -i ‘s/\(had\)...../\1doop/g’sed.txt # had后面替换
```

## 反向引用
- 是什么
1. &和\1 引用模式匹配到的整个串

```bash
# file中寻找1开头的后跟两任意字符以e结尾的字符
sed "s/1..e/&r/g" file
sed "s/\(1...e\)/\1r/g" file # 使用\1代表搜寻到的字符串
```
- 上面两种方法实现一样的功能，分别使用&和\1代表搜寻到的整个字符串
- 区别在于&只能表示匹配到的完整字符串，只能引用整个字符串，而\1可以使用()对匹配到的
- 要替换匹配的字符串的一部分，name必须使用\1，不能使用&

## sed 引用变量
- 注意
1. 匹配模式中存在变量，则建议使用双引号
2. sed中需要引入自定义变量时，如外面使用单引号，则自定义变量必须使用单引号

## 用 sed 查询特定内容
查询命令

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721102519.png)

实例
```bash
# 打印/etc/passwd中的第20行内容
sed -n "20p" /etc/passwd

sed -n "8,15p" /etc/passwd
sed -n "8,+5p" /etc/passwd
sed -n '/^hdfs/p' /etc/passwd
sed -n '^root/,/^hdfs/p' /etc/passwd
sed -n '8,/\sbin\/nologin/p' /etc/passwd
sed -n '\bin\/bash/,5p' /etc/passwd
```

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721103230.png)

```bash
  #!/bin/bash
  FILE_NAME=/root/my.cnf

  function get_all_segments
  {
      echo "`sed -n '/\[.*\]/p' $FILE_NAME | sed -e 's/\[//g' -e 's/\]//g'`"
  }

  function count_items_in_segment
  {
      items=`sed -n '/\['$1'\]/,/\[.*\]/p' $FILE_NAME | grep -v "^#" | grep -v ^$ | grep -v "\[.*\]"`
      index=0
      for item in $items
      do
          index=`expr $index +1`
      done
      echo $index
  }

  number=0
  for segment in `get_all_segments`
  do
      num=`expr $number + 1`
      items_count=`coubt_items_in_segment $segment`
      echo "$number: $segment $items_count"
  done
```

## sed 删除特定内容
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721103352.png)

```bash
sed -i '15d' passwd
sed -i '8,14d' passwd
sed -i '/\sbin\/nologin/d' passwd
sed -i '/^mail/,/^yarn/d' passwd
sed -i '/\sbin\/nologin/,13d' passwd
sed -i '5,/^ftp/d' passwd
# yarn开头到最后
sed -i '/^yarn/,$' /etc/passwd
```

- 1. 删除配置文件中所有的注释行和空行
- 2. 在配置文件中所有不以#开头的行前面加×符合，主要以#开头的行不添加

```bash
sed -i ‘/^#/d;/^$/d’ nginx.conf #删除注释
sed -i ‘/[:blank:]*#/d’ nginx.conf #删除空行
sed -i ‘/^[^#]/\*&/g’nginx.conf  #非井号开头
```

## sed 修改文件内容
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721104309.png)

实例
```bash
  #修改第一行的root为ROOT
  sed -i '1s/root/ROOT/' passwd
  #修改5到10行中所有的/sbin/nologin为/bin/bash
  sed -i '5,10s/\/sbin\/nologin/\bin\/bash/g' passed
  #修改匹配到/sbin/nologin的行，将匹配到行中的login改为LOGIN
  sed -i '/\sbin\/nologin/s/login/LOGIN/g' passwd
  #修改以root开头的行，到15行中的所有行，修改行中的nologin为SPARK
  sed -i '/^root/,15s/nologin/SPARK/g' passwd
  #从15行开始到匹配以yarn开头的所有行，修改行中的bin为BIN
  sed -i '15,/^yarn/s/bin/BIN/g' passwd
  
  sed -i 's/[0-9]*//g' file.txt
```

## sed 追加文本内容
- 语法
1. a
```bash
# 第十行后追加"Add lind behind"
sed -i '10a Add lind behind' passwd
# 第10到20行，每一行后面都追加"Test line behind"
sed -i '10,20a Test line behind' passws
# 匹配到/bin/bash的行后面追加"insert line for /bin/bash behind"
sed -i '/\bin\/bash/a insert line for /bin/bash behind' passws
```
2. i
```bash
# 匹配yarn开头的行，在匹配航后面追加"Add lind behind"
sed -i 'yarn/i Add lind behind' passwd
# 每一行前面都追加“insert line before every line"
sed -i 'i insert line before every line' passwd
```
3. r
```bash
#将/etc/fstab文件的内容追加到passwd的第20行后面
sed -i '20r /etc/fstab' passwd
#将/etc/inittab文件内容追加到passwd文件匹配/bin/bash行后面
sed -i '/\bin\/bash/r /etc/inittab' passwd
#将/etc/vconsol.conf文件内容追加到passwd文件中特定行的后面，匹配以ftp开头的行后面
sed -i /^ftp/,18r /etc.vconsole.conf’ pssswd
```
4. w
```bash
# 将passwd文件匹配到/bin/bash的行追加到/tmp/sed.txt文件中
sed -i '/\bin\/bash/w /tmp/sed.txt' passwd
# 将passwd文件从10行还是到匹配到hsfs开头的所有行内容追加到/tmp/sed-1.txt
sed -i '10,/^hsfs/w /tmp/sed-1.txt' passwd
```

# awk
## awk 的工作模式
1. awk 为一个文本处理工具，通常用于处理数据并产生结果报告。
2. 命名是由三个创始人姓氏首字母组成
  
## 语法
1. awk 'BEGIN{}pattern{commands}END{}' file_name
2. standard outpu | awk 'BEGIN{}pattern{commands}END{}' file_name

- 语法格式说明

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721124926.png)
  
## awk 内置变量
内置变量对照表

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721125045.png)
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721130039.png)

```bash
awk '{print $0}END{}' /etc/passwd
# 指定分隔符，输出第一个(既所有用户名)
awk 'BEGIN{FS=":"}{print $1}' /etc/passwd
# 默认空格为分割符
awk '{print $1' list.txt

# NF每一个行字段个数（number Filed）
awk '{print NF}' list.txt # 返回字段个数

# NR(Number Row)
awk '{print NR}' list.txt /etc/passwd # 返回行号

# FNR(File Number Row)对每一个文件单独计数
awk '{print FNR}' list.txt /etc/passwd

# FS(File Separator)
awk 'BEGIN{FS="|"}{print $2}' list.txt #指定分割符|

# RS(Row Separator) 行分隔符
awk 'BEGIN{FS="|";RS="--"}{print $2}' list.txt

# ORS(Output Row Separatot) 输出行分割符
awk 'BEGIN{FS="|";RS="--"；ORS="&"}{print $2}' list.txt

awk 'BEGIN{FS="|";RS="--"；ORS="&";OFS=":"}{print $2，$3}' list.txt

awk '{print FILENAME}' list.txt #对每一行输出文件名

awk '{print ARGC}' list.txt # 输出行参数个数

awk 'BEGIN{FS=":"}{print $NF}' /etc/passwd # 输出行最大自的断
```

## awk 格式化输出
printf(默认不带分隔符) 语法

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721134349.png)

修饰符

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721134554.png)

实例
```bash
# 不加任何修饰输出 
awk 'BEGIN{FS=":"}{printf $1}' /etc/passwd
# 换行输出
awk 'BEGIN{FS=":"}{printf "%s\n",$1}' /etc/passwd

# 输出两个变量
awk 'BEGIN{FS=":"}{printf "%s%s\n",$1,$7}' /etc/passwd

# 第一个第二个变量长度20(默认右对齐)
awk 'BEGIN{FS=":"}{printf "%20s %20s\n",$1,$7}' /etc/passwd

# 第一个第二个变量长度20(左对齐)
awk 'BEGIN{FS=":"}{printf "%-20s %-20s\n",$1,$7}' /etc/passwd
```
```bash
# 以字符串格式打印/etc/passwd中的第七个字段，以":"为分隔符
awk 'BEGIN{FS=":"}{printf "%s\n",$7}' /etc/passwd
# 以10进制格式打印/etc/passwd中的第3个字段，以":"为分隔符
awk 'BEGIN{FS=":"} {printf "%d\n",$3}' /etc/passwd #不指定位数默认左对齐（指定位数右对齐 %-d)
  
# 浮点数
awk 'BEGIN{FS=":"} {printf "%o.3f\n",$3}' /etc/passwd 

# 16进制
awk 'BEGIN{FS=":"} {printf "%x\n",$3}' /etc/passwd 

# 8进制
awk 'BEGIN{FS=":"} {printf "%o\n",$3}' /etc/passwd

# 科学计数法
awk 'BEGIN{FS=":"} {printf "%e\n",$3}' /etc/passwd
```

## awk模式匹配的两种用法
- 语法
1. RegExp 含义：按正则表达式匹配
2. 关系运算 含义：按关系运算匹配

实例

- RegExp

```bash
# 匹配/etc/passwd文件中含有root字符串的所有行
awk 'BEGIN{FS=":"}/root/{print $0}' /etc/passwd

#匹配/etc/passwd中yarn开头的所有行
awk 'BEGIN{FS=":"}/^yarn/{print $0}' /etc/passwd
```

- (运算符)关系运算
  - 关系运算符：<,><=,>=,==,!=,\~(匹配正则表达式),!\~

  ```bash
  # 以：为分隔符，匹配第3个字段小于50的所有行信息
  awk 'BEGIN{FS=":"}$3<50{print $0}' /etc/pssswd

  awk 'BEGIN{FS=":"}$7=="/bin/bash"{print $0}' /etc/pssswd

  awk 'BEGIN{FS=":"}$7!="/bin/bash"{print $0}' /etc/pssswd

  # 第三个字符包含3个以上数字的所有行信息
  awk 'BEGIN{FS=":"}$3~/[0-9]{3,}/{print $0}' /etc/passwd # {3,}重复3次

  awk 'BEGIN{FS=":"}$0~/\sbin\/nologin/{print $0}' /etc/passwd 
  ```

  - 布尔运算:||(或),&&(与),!(非)

  ```bash
  # 以：为分隔符，匹配文件中包含hdfs或者yarn的所有行信息
  awk 'BEGIN{FS=":"}$1=="hdfs" || $1=="yarn" {print $0}' /etc/passwd

  # 第三字段小于50且第四字段大于50的所有行信息
  awk 'BEGIN{FS=":"}$3<50 && $4>50 {print $0}' /etc/passwd

  awk 'BEGIN{FS=":"}$3<50 && $7~/\bin\/bash/ {print $0}' /etc/passwd
  ```
## awk 动作中的表达式用法
算术运算符

|运算符|含义|
|:---|:---|
|+|加|
|-|减|
|*|乘|
|/|除|
|%|模|
|^或**|乘方|
|++X|再返回X变量之前，X变量加1|
|X++|再返回X变量之后，X变量加1|


- 实例

```bash
awk 'BEGIN{var=20;var1="hello";print var,var1}'
  
awk 'BEGIN{num1=20;num2+=num1;print num2,num2}'

awk 'BEGIN{num1=20;num2+=num1;print num2+num2}'

awk 'BEGIN{num1=20;num2=30;printf "%0.2f\n",num1/num2}'

awk 'BEGIN{x=2;y=x++;print x,y}'

awk 'BEGIN{x=2;y=x--;print x,y}'
```
```bash
# 计算文件中空白行数量
awk '/^$/{sumx=0;sum++}END{print sum}' /etc/services
  
# 计算课程的平均分
awk '{total=S2+$3+$5+$5;AVG=total/4;printf "%-8s,%-5d%-5d%-5d%-8d%0.2f\n",$1,$2,$3,$4.$5,AVG}' stu.txt

awk 'BEGIN{printf "%-8s%-8s%-8s%-8s%-8s%s\n","姓名","语文","数学","英语","物理","平均分"}{total=$2+$3+$4+$5;AVG=total/4;printf "%-8s%-8d%-8d%-8d%-8d%0.2f\n",$1,$2,$3,$4.$5,AVG}' stu.txt
```

## awk 动作中的条件及循环语句
- 条件语句

```bash
if(条件表达式)
  动作1
else if(条件表达式)
  动作2
else
  动作3
```

- 实例

```bash
# 以：为分隔符只打印第3个字段的数值在50-100范围内的行信息
awk 'BEFIN{FS=":"}{if($3>50 && $3<100>) print $0}' /etc/passwd
awk 'BEFIN{FS=":"}{if($3>50 || $3<100>) print $0}' /etc/passwd

# 小于50的UID
awk 'BEGIN{FS=":"}{if($3<50) printf "%-10s%-5d\n","小于50的UID:",$3}' /etc/passwd
  
awk 'BEGIN{FS=":"}{if($3<50) printf "%-10s%-10s%-5d\n","小于50的UID:",$1,$3}' /etc/passwd

awk 'BEGIN{FS=":"}{if($3<50) printf "%-10s%-10s%-5d\n","小于50的UID:",$1,$3}' /etc/passwd
```
- vim scripts.awk
```bash
BEGIN{
    FS=":"
}
{
    f($3<50)
  {
    printf "%-30s%-20s%-5d\n","小于50的UID",$1,$3
  }
  else if($3>50 && $3<100)
  {
    printf "%-30s%-20s%-5d\n","大于50且小于100的UID",$1,$3
  }
  else
  {
    printf "%-30s%-20s%-5d\n","大于100的UID",$1,$3
  }
}
```

- 使用

```bash
awk -f scripts.awk /etc/passed
```

- 循环语句

1. do while 循环
```bash
do while
  do 
      动作
  while(条件表达式)
```

2. for 循环

```bash
for (初始化计数器;测试计数器;计数器变更)
  动作
```

实例
- 1+2+...100的和
1. while
```bash
  BEGIN{
      while(i<=100)
      {
        sum+=1
      }
      print sum
  }
```
  - awk -f while.wak

- for
```bash
  BEGIN{
    for(i0;i<=100;i++)
    {
      sum+=1
    }
    print sum
  }
```
  - awk -f for.awk

3. do while
```bash
  BEGIN{
    do
    {
      sum+=1
      i++
    }while(i<=100)
    print sum
  }
```
  - awk -f do_while.awk
  
- 计算每个同学平均分，仅显示大于90

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721185930.png)

```bash student.awk
  BEGIN{
    printf "%-10s%-10s%-10s%-10s%-10s%-10s\n","Name","Chinese","English","Math","Physical","Average"
  }
  {
    total=$2+$3+$4+$5
    avg=total/4
    if(avg>90)
    {
      printf "%-10s%-10d%-10d%-10d%-10d%-0.2f\n",$1,$2,$3,$4,$5,avg
    }
  }
```

- 计算平均分大于90的各科总分

```bash student.awk
  BEGIN{
      printf "%-10s%-10s%-10s%-10s%-10s%-10s\n","Name","Chinese","English","Math","Physical","Average"
  }
  {
    total=$2+$3+$4+$5
    avg=total/4
    if(avg>90)
    {
      printf "%-10s%-10d%-10d%-10d%-10d%-0.2f\n",$1,$2,$3,$4,$5,avg
      score_chinese+=$2
      score_english+=$3
      score_math+=$4
      score_physical+=$5
    }
  }
  END{
    printf "%-10s%-10d%-10d%-10d%-10d\n","",score_chinese,score_english,score_math,score_physical
  }
```
## awk 中的字符串函数
字符串函数对照表

![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721191406.png)
![](https://raw.githubusercontent.com/ivitan/Picture/master/20190721191743.png)

例子
1. 以:为分隔符，返回文件中每行中的字段长度

```bash 1.awk
  # NF 字段个数
  BEGIN{
    FS=":"
  }
  {
    i=1
    while(i<=NF)
    { 
      if(i==NF)
        printf "%d",length($i)
      else
        printf "%d:",length($i)
      i++
    }
    print ""
  } 
```

2. 搜索字符串"I have a dream"中出现"ea"子串的位置

```bash 
# 方法1
awk 'BEGIN{str="I have a dream";location=index(str,"ea");print location}'

#方法2
awk 'BEGIN{str="I have a dream";location=match(str,"ea");print location}'
```

3. 将字符串"Hadoop is a bigdata Framework"全部转为小写

```bash
awk 'BEGIN{str="Hadoop is a bigdata Framework";print tolower(str)}'
```

4. 上一题转为大写

```bash
awk 'BEGIN{str="Hadoop is a bigdata Framework";print toupper(str)}'
```

5. 将字符串"Hadoop Kafka Spark Storm”按空格为分隔符，分割每一部分保存到数组arr中

```bash
awk 'BEGIN{str="Hadoop Kafka Spark Storm";split(str,arr," ");print arr[0]}'

# 遍历(awk 下标从1开始)
awk 'BEGIN{str="Hadoop Kafka Spark Storm";split(str,arr," ");for(a in arr) print arr[a]}'
```

6. 搜索字符串"Tranction 2345 start:select * from master"第一个数字出现的位置

```bash
awk 'BEGIN{str="Tranction 2345 start:select * from master";location=match(str,/[0-9]/);print location}'
```
  - 正则表达式要用 `//` 引起来

7. 截图字符串”transaction start”的子串，条件从第4个字符开始，截取5为

```bash
awk 'BEGIN{str="transaction start";print substr(str,4,5)}'
```

8. 替换"Tranction 243 start，Event ID：9002"中第一个匹配到的数字为$符号

```bash
awk 'BEGIN{str="Tranction 243 start，Event ID：9002";count=sub(/[0-9]+/,"$",str);print count,str}'
  
# gsu所有
awk 'BEGIN{str="Tranction 243 start，Event ID：9002";count=gsub(/[0-9]+/,"$",str);print count,str}'
```

## awk中的常用选项
|选项|解释|
|:---|:---|
|-v|参数传递|
|-f|指定脚本文件|
|-F|指定分隔符|
|-V|查看awk的版本号|

实例
- -v 把外部变量引入

```bash 终端中
num1=20
var="Hello World"
awk -v num2="$num1" -v var1="$var" 'BEGIN{print num2,var1}'
```

- -f 引入文件

```bash
awk -f student.awk /etc/passws
```
- -F

```bash
awk -F ":" '{print $7}' /etc/passwd
awk -F : '{print $7}' /etc/passwd
# 等价于
awk 'BEGIN{FS=":"}{print $7}' /etc/passwd
```

## Shell 数组的用法

- array=("Mike","Bell","Hellen")
  - 下面的 `井` 为 `#`

|解释|代码|
|:--|:--|
|打印元素| echo ${井array[2]}|
|打印元素个数 |echo ${井array[@]} / echo ${井array[*]}|
|打印元素长度 |echo ${井array[3]}| 
|给元素赋值  |array[3]="LI"|
|删除元素 |unset array[2];unset array|
|分片访问 |echo ${井array[@]:1:3}|
|元素内容替换 | \${array[@]/e/E} #只替换第一个e;${array[@]//e/E}替换全部e|

- 数组遍历 

```bash
for a in array
do 
   echo $a
done
```

## awk 数组用法
- awk中使用数组时，不仅可以使用数字作为数组下标，也可以使用字符串作为数组下标

1. 统计主机上所有TCP连接状态，按照每个TCP状态分类

```bash
netstat -an | grep tcp | awk '{arrary[$6]++}END{for(a in arrary) print a,arrary[a]}'
```

2. 计算横向数总和，计算纵向数据总和

```bash 数据
Allen 80 90 96 98
Mike  93 98 92 91
Zhang 78 76 87 92
Jerry 86 89 68 92
Han   85 95 75 90
Li    78 88 98 100
```
```bash stu.awk
  BEGIN{
    printf "%-10s%-10s%-10s%-10s%-10s%-10s\n","Name","Chinese","Math","English","Physical","Total"
  }
  {
    total=$2+$3+$4+$5
    yuwen_sum+=$2
    math_sum+=$3
    english_sum+=$4
    physical_sum+=$5
    printf "%-10s%-10d%-10d%-10d%-10d%-10d\n",$1,$2,$3,$4,$5,total
  }
  END{
    printf "%-10s%-10d%-10d%-10d%-10d\n","",yuwen_sum,math_sum,english_sum,physical_sum
  }
```

## awk 处理数据例子
生成随机数据
```bash
  #!/bin/bash
  function create_random()
  {
    min=$1
    max=$(($2-$min+1))
    num=$(date +%s%N)
    echo $(($num%$max+$min))
  }

  INDEX=1

  while true
  do
    for user in Allen Mike Jerry Tracy Hanmeimei Lilei
    do
      COUNT=$RANDOM
      NUM1=`create_random 1 $COUNT`
      NUM2=`expr $COUNT - $NUM1`
      echo "`date '+%y-%m-%d %H:%M:%S'` $INDEX Batches: user $user insert $COUNT records into databases:product table:datail,insert $NUM1 records successfully,failed $NUM2 records" >> ./db.log.`date +%Y%m%d`
      INDEX=`expr $INSEX + 1`
    done
  done
```

1. 统计每个用户分别插入多少record 

```bash tesst.awk
  BEGIN{
    printf "%-10s%-10s\n","User","Total Records"
  }
  {
    USER[$6]+=$8
  }
  END{
    for(u in USER)
      printf "%-20s%-20d\n",u,USER[u]
  }
```

2. 统计每个用户分别插入成功和失败各多少record

```bash 2.awk
  BEGIN{
    printf "%-10s%-20s%-20s\n","User,"Success_Records","Filed_records"
  }
  {
    SUCCESS[$6]+=$14
    FAILED[$6]+=$17
  }
  END{
    for(u in SUCCESS)
      printf "%-10s%-20d%-20d\n",u,SUCCESS[u],FAILED[u]
  }
```

3. 将例子1,2结合，一起输出每个用户分别插入多少条数据，成功失败各多少条

```bash 3.awk
    BEGIN{
      printf "%-30s%-30s%-30s%-30s\n","Name","total records","success records","failed records"
  }
  {
      TOTAL_RECORDS[$6]+=$8
      SUCCESS[$6]+=$14
      FAILED[$6]+=$17
  }
  END{
      for(u in TOTAL_RECORDS)
          printf "%-30s%-30d%-30d%-30d\n",u,TOTAL_RECORDS[u],SUCCESS[u],FAILED[u]
  }
```

4. 在例子3的基础上，加上结尾，统计全部插入记录数，成功记录数，失败记录数

- 方法一

```bash 3.awk
BEGIN{
    printf "%-30s%-30s%-30s%-30s\n","Name","total records","success records","failed records"
}
{
    TOTAL_RECORDS[$6]+=$8
    SUCCESS[$6]+=$14
    FAILED[$6]+=$17
}
END{
    for(u in TOTAL_RECORDS)
    {
        # 在统计出的结果数组中进行累加
        records_sum+=TOTAL_RECORDS[u]
        success_sum+=SUCCESS[u]
        failed_sum+=FAILED[u]
        printf "%-30s%-30d%-30d%-30d\n",u,TOTAL_RECORDS[u],SUCCESS[u],FAILED[u]
    }
  
    printf "%-30s%-30d%-30d%-30d\n","",records_sum,success_sum,failed_sum
}
```

- 方法二

```bash
  BEGIN{
      printf "%-30s%-30s%-30s%-30s\n","Name","total records","success records","failed records"
  }
  
  {
      RECORDS[$6]+=$8
      SUCCESS[$6]+=$14
      FAILED[$6]+=$17
      
      # 在原始数据中进行汇总计算
      records_sum+=$8
      success_sum+=$14
      failed_sum+=$17   
  }
  
  END{
      for(u in RECORDS)
          printf "%-30s%-30d%-30d%-30d\n",u,RECORDS[u],SUCCESS[u],FAILED[u]
  
      printf "%-30s%-30d%-30d%-30d\n","total",records_sum,success_sum,failed_sum
  }
```

5. 查找丢失数据的现象，也就是成功+失败的记录数不等于一共插入的记录数，找出这些数据并显示行号和对应行的日志信息

```bash
awk '{if($8!=$14+$17) print NR,$0}' db.log.20190722
```