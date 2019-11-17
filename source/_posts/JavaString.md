---
title: Java 中 String 方法
date: 2018-03-21 12:09:10
tags:
- Java
toc: true
categories: 
 - Coding
 - Java
thumbnail: /images/Java.png
---
Java 中 Srting 常用方法。
<!--more-->
#  `length()`字符串长度
```Java
public class Test {
    public static void main(String args[]) {
        String Str1 = new String("www");
        String Str2 = new String("github" );

        System.out.print("字符串 Str1 长度 :");
        System.out.println(Str1.length());
        System.out.print("字符串 Str2 长度 :");
        System.out.println(Str2.length());
    }
}
```

# `charAt()`截取一个字符

```Java
public class Test {

    public static void main(String args[]) {
        String s = "www.qq.com";
        char result = s.charAt(8);
        System.out.println(result);
    }
}
```
结果：c

```Java
char ch:
ch="abc".charAt(1); //返回b
```

#  `getChars()`截取多个字符
语法
```Java
public void getChars(int srcBegin, int srcEnd, char[] dst,  int dstBegin)
```
参数:

srcBegin -- 字符串中要复制的第一个字符的索引。

srcEnd -- 字符串中要复制的最后一个字符之后的索引。

dst -- 目标数组。

dstBegin -- 目标数组中的起始偏移量。
```Java
public class Test {
    public static void main(String args[]) {
        String Str1 = new String("www.runoob.com");
        char[] Str2 = new char[6];

        try {
            Str1.getChars(4, 10, Str2, 0);
            System.out.print("拷贝的字符串为：" );
            System.out.println(Str2 );
        } catch( Exception ex) {
            System.out.println("触发异常...");
        }
    }
}
```
以上程序执行结果为：拷贝的字符串为：runoob

sourceStart指定了子串开始字符的下标，sourceEnd指定了子串结束后的下一个字符的下标。因此， 子串包含从sourceStart到sourceEnd-1的字符。接收字符的数组由target指定，target中开始复制子串的下标值是targetStart。
```Java
String s="this is a demo of the getChars method.";
　　　　char buf[]=new char[20];
　　　　s.getChars(10,14,buf,0);
```

# `getBytes()`
替代getChars()的一种方法是将字符存储在字节数组中，该方法即getBytes()。
getBytes() 方法有两种形式：

getBytes(String charsetName): 使用指定的字符集将字符串编码为 byte 序列，并将结果存储到一个新的 byte 数组中。

getBytes(): 使用平台的默认字符集将字符串编码为 byte 序列，并将结果存储到一个新的 byte 数组中。

语法
```
public byte[] getBytes(String charsetName) throws UnsupportedEncodingException
```
或
```
public byte[] getBytes()
```
参数:
charsetName -- 支持的字符集名称。

返回值:返回 byte 数组。

实例
```Java
import java.io.*;

public class Test {
    public static void main(String args[]) {
        String Str1 = new String("runoob");

        try{
            byte[] Str2 = Str1.getBytes();
            System.out.println("返回值：" + Str2 );

            Str2 = Str1.getBytes( "UTF-8" );
            System.out.println("返回值：" + Str2 );

            Str2 = Str1.getBytes( "ISO-8859-1" );
            System.out.println("返回值：" + Str2 );
        } catch ( UnsupportedEncodingException e){
            System.out.println("不支持的字符集");
        }
    }
}
```
以上程序执行结果为：
```
返回值：[B@7852e922
返回值：[B@4e25154f
返回值：[B@70dea4e
```

# toCharArray()
`public char[] toCharArray()`
```Java
public class Test {
    public static void main(String args[]) {
        String Str = new String("vitan.xyzm");

        System.out.print("返回值 :" );
        System.out.println( Str.toCharArray() );
    }
}
```
# `equals()`和`equalsIgnoreCase()` 比较两个字符串
String.equals()对大小写敏感，而String.equalsIgnoreCase()忽略大小写.

例如：
```Java
"ABC".equals("abc")//是false
"ABC".equalsIgnoreCase("abc")//为ture
```
#  `regionMatches()` regionMatches()
方法用于检测两个字符串在一个区域内是否相等。

语法:
```Java
public boolean regionMatches(int toffset,String other, int ooffset,int len)
```
or

```Java
public boolean regionMatches(boolean ignoreCase,int toffset, String other,int ooffset,int len)
```
参数：

ignoreCase -- 如果为 true，则比较字符时忽略大小写。

toffset -- 此字符串中子区域的起始偏移量。

other -- 字符串参数。

ooffset -- 字符串参数中子区域的起始偏移量。

len -- 要比较的字符数。


用于比较一个字符串中特定区域与另一特定区域，它有一个重载的形式允许在比较中忽略大小写。
```java
　　boolean regionMatches(int startIndex,String str2,int str2StartIndex,int numChars)
　　boolean regionMatches(boolean ignoreCase,int startIndex,String str2,int str2StartIndex,int numChars)
```
```Java
public class Test {
    public static void main(String args[]) {
        String Str1 = new String("www.runoob.com");
        String Str2 = new String("runoob");
        String Str3 = new String("RUNOOB");

        System.out.print("返回值 :" );
        System.out.println(Str1.regionMatches(4, Str2, 0, 5));

        System.out.print("返回值 :" );
        System.out.println(Str1.regionMatches(4, Str3, 0, 5));

        System.out.print("返回值 :" );
        System.out.println(Str1.regionMatches(true, 4, Str3, 0, 5));
    }
}
```
以上程序执行结果为：
```
返回值 :true
返回值 :false
返回值 :true
```
# `startsWith()`和`endsWith()`
startsWith()方法决定是否以特定字符串开始，endWith()方法决定是否以特定字符串结束
```Java
public class StringDemo{
public static void main(String args[]){
      String s1="this is my original string";
      String sd="original";
      if (s1.startsWith(sd)) //startsWith()方法判断字符串s1是否从字符串sd开始
         s1=s1.substring(sd.length());
      else
         if(s1.endsWith(sd)) //endWith()方法判断字符串s1是否从字符串sd结尾
             s1=s1.substring(0,s1.length()-sd.length());
         else
         {
               int index=s1.indexOf(sd); //indexOf()搜索字符或子字符串首次出现，这里的index等于11
               if(index!=-1)
               {
                  String s2=s1.substring(0,index); //从字符串s1的首字符开始，取index个字符
                  String s3=s1.substring(index+sd.length());//取字符串s1的第19个字符后面的字符串
                  s1=s2+s3;
               }
               else
               System.out.println("string /""+sd+"/" not found");
         }
         System.out.println(s1);
      }
}
```
# `equals()`和`==equals()`
方法比较字符串对象中的字符，==运算符比较两个对象是否引用同一实例。
```Java
String s1="Hello";
　　　　String s2=new String(s1);
　　　　s1.eauals(s2);    //true
　　　　s1==s2;          //false
```

# `compareTo()`和`compareToIgnoreCase()`比较字符串
compareTo()

字符串与对象进行比较。

按字典顺序比较两个字符串。

语法;
`int compareTo(Object o)`或`int compareTo(String anotherString)`
参数:
 o -- 要比较的对象。anotherString -- 要比较的字符串。
返回值:

返回值是整型,它是先比较对应字符的大小(ASCII码顺序),如果第一个字符和参数的第一个字符不等,结束比较,返回他们之间的差值,如果第一个字符和参数的第一个字符相等,则以第二个字符和参数的第二个字符做比较,以此类推,直至比较的字符或被比较的字符有一方。

如果参数字符串等于此字符串，则返回值 0；

如果此字符串小于字符串参数，则返回一个小于 0 的值；

如果此字符串大于字符串参数，则返回一个大于 0 的值。

实例:
```Java
public class Test {

    public static void main(String args[]) {
        String str1 = "Strings";
        String str2 = "Strings";
        String str3 = "Strings123";

        int result = str1.compareTo( str2 );
        System.out.println(result);

        result = str2.compareTo( str3 );
        System.out.println(result);

        result = str3.compareTo( str1 );
        System.out.println(result);
    }
}
```
以上程序执行结果为：
```
0
-3
3
```
`compareToIgnoreCase()` 方法用于按字典顺序比较两个字符串，不考虑大小写。

参数:

str -- 要比较的字符串。

返回值:

如果参数字符串等于此字符串，则返回值 0；

如果此字符串小于字符串参数，则返回一个小于 0 的值；

如果此字符串大于字符串参数，则返回一个大于 0 的值。

```Java
public class Test {

    public static void main(String args[]) {
        String str1 = "STRINGS";
        String str2 = "Strings";
        String str3 = "Strings123";

        int result = str1.compareToIgnoreCase( str2 );
        System.out.println(result);

        result = str2.compareToIgnoreCase( str3 );
        System.out.println(result);

        result = str3.compareToIgnoreCase( str1 );
        System.out.println(result);
    }
}
```

# `indexOf()`和`lastIndexOf()`

indexOf() 查找字符或者子串第一次出现的地方。

indexOf() 方法有以下四种形式：

public int indexOf(int ch): 返回指定字符在字符串中第一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1。

public int indexOf(int ch, int fromIndex): 返回指定字符在字符串中第一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1。

int indexOf(String str): 返回指定字符在字符串中第一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1。

int indexOf(String str, int fromIndex): 返回指定字符在字符串中第一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1

语法:
```java
public int indexOf(int ch )
```
或
```java
public int indexOf(int ch, int fromIndex)
```
或
```java
int indexOf(String str)
```
或
```java
int indexOf(String str, int fromIndex)
```
参数:
ch -- 字符。fromIndex -- 开始搜索的索引位置。str -- 要搜索的子字符串。

返回值:

指定子字符串在字符串中第一次出现处的索引，从指定的索引开始。

实例:
```Java
public class Test {
    public static void main(String args[]) {
        String Str = new String("菜鸟教程:www.runoob.com");
        String SubStr1 = new String("runoob");
        String SubStr2 = new String("com");

        System.out.print("查找字符 o 第一次出现的位置 :" );
        System.out.println(Str.indexOf( 'o' ));
        System.out.print("从第14个位置查找字符 o 第一次出现的位置 :" );
        System.out.println(Str.indexOf( 'o', 14 ));
        System.out.print("子字符串 SubStr1 第一次出现的位置:" );
        System.out.println( Str.indexOf( SubStr1 ));
        System.out.print("从第十五个位置开始搜索子字符串 SubStr1 第一次出现的位置 :" );
        System.out.println( Str.indexOf( SubStr1, 15 ));
        System.out.print("子字符串 SubStr2 第一次出现的位置 :" );
        System.out.println(Str.indexOf( SubStr2 ));
    }
}
```
以上程序执行结果为：
```
查找字符 o 第一次出现的位置 :12
从第14个位置查找字符 o 第一次出现的位置 :17
子字符串 SubStr1 第一次出现的位置:9
从第十五个位置开始搜索子字符串 SubStr1 第一次出现的位置 :-1
子字符串 SubStr2 第一次出现的位置 :16。
```

# `lastIndexOf()`
查找字符或者子串是后一次出现的地方。

lastIndexOf() 方法有以下四种形式：

public int lastIndexOf(int ch): 返回指定字符在此字符串中最后一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1。

public int lastIndexOf(int ch, int fromIndex): 返返回指定字符在此字符串中最后一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1。

public int lastIndexOf(String str): 返回指定字符在此字符串中最后一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1。

public int lastIndexOf(String str, int fromIndex): 返回指定字符在此字符串中最后一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1。

语法:
```
public int lastIndexOf(int ch)

或

public int lastIndexOf(int ch, int fromIndex)

或

public int lastIndexOf(String str)

或

public int lastIndexOf(String str, int fromIndex)
```
参数:
ch -- 字符。fromIndex -- 开始搜索的索引位置。str -- 要搜索的子字符串。

返回值
指定子字符串在字符串中第一次出现处的索引值。

实例
```Java
public class Test {
    public static void main(String args[]) {
        String Str = new String("菜鸟教程:www.runoob.com");
        String SubStr1 = new String("runoob");
        String SubStr2 = new String("com");

        System.out.print("查找字符 o 最后出现的位置 :" );
        System.out.println(Str.lastIndexOf( 'o' ));
        System.out.print("从第14个位置查找字符 o 最后出现的位置 :" );
        System.out.println(Str.lastIndexOf( 'o', 14 ));
        System.out.print("子字符串 SubStr1 最后出现的位置:" );
        System.out.println( Str.lastIndexOf( SubStr1 ));
        System.out.print("从第十五个位置开始搜索子字符串 SubStr1最后出现的位置 :" );
        System.out.println( Str.lastIndexOf( SubStr1, 15 ));
        System.out.print("子字符串 SubStr2 最后出现的位置 :" );
        System.out.println(Str.lastIndexOf( SubStr2 ));
    }
}
```
以上程序执行结果为：
```
查找字符 o 最后出现的位置 :17
从第14个位置查找字符 o 最后出现的位置 :13
子字符串 SubStr1 最后出现的位置:9
从第十五个位置开始搜索子字符串 SubStr1最后出现的位置 :9
子字符串 SubStr2 最后出现的位置 :16
```

# `substring()`
它有两种形

第一种是：public String substring(int startIndex)

第二种是：public String substring(int startIndex,int endIndex)

参数:

beginIndex -- 起始索引（包括）。

endIndex -- 结束索引（不包括）。

返回值

子字符串。

实例
```Java
public class Test {
    public static void main(String args[]) {
        String Str = new String("www.runoob.com");

        System.out.print("返回值 :" );
        System.out.println(Str.substring(4) );

        System.out.print("返回值 :" );
        System.out.println(Str.substring(4, 10) );
    }
}
```
以上程序执行结果为：
```
返回值 :runoob.com
返回值 :runoob
```

- `concat()` 连接两个字符串
语法: public String concat(String s)
参数:   s -- 要连接的字符串。

返回值:
返回连接后的新字符串。

实例
```Java
public class Test {
    public static void main(String args[]) {
        String s = "你好：";
        s = s.concat("Hellom");
        System.out.println(s);
    }
}
```
以上程序执行结果为：
你好：Hello


#  `replace()`替换
replace() 方法通过用 newChar 字符替换字符串中出现的所有 oldChar 字符，并返回替换后的新字符串。

语法:public String replace(char oldChar, char newChar)
参数:oldChar -- 原字符。newChar -- 新字符。

返回值:

替换后生成的新字符串。

实例:
```Java
public class Test {
    public static void main(String args[]) {
        String Str = new String("hello");

        System.out.print("返回值 :" );
        System.out.println(Str.replace('o', 'T'));

        System.out.print("返回值 :" );
        System.out.println(Str.replace('l', 'D'));
    }
}
```
以上程序执行结果为：
```
返回值 :hellT
返回值 :heDDo
```

# `trim()` 去掉起始和结尾的空格
```Java
String s=" abc ";
String s2=s.trim();
s2="abc"
```

# `valueOf()`
===

valueOf() 方法用于返回给定参数的原生 Number 对象值，参数可以是原生数据类型, String等。
该方法是静态方法。该方法可以接收两个参数一个是字符串，一个是基数。

语法:

该方法有以下几种语法格式：
```
static Integer valueOf(int i)
static Integer valueOf(String s)
static Integer valueOf(String s, int radix)
```
参数

i -- Integer 对象的整数。

s -- Integer 对象的字符串。

radix --在解析字符串 s 时使用的基数，用于指定使用的进制数。

返回值

Integer valueOf(int i)：返回一个表示指定的 int 值的 Integer 实例。

Integer valueOf(String s):返回保存指定的 String 的值的Integer 对象。

Integer valueOf(String s, int radix): 返回一个 Integer 对象，该对象中保存了用第二个参数提供的基数进行解析时从指定的 String 中提取的值。

实例
```
public class Test{
public static void main(String args[]){
        Integer x =Integer.valueOf(9);
        Double c = Double.valueOf(5);
        Float a = Float.valueOf("80");

        Integer b = Integer.valueOf("444",16);   // 使用 16 进制

        System.out.println(x);
        System.out.println(c);
        System.out.println(a);
        System.out.println(b);
    }
}
```
输出结果为：
```
9
5.0
80.0
1092
```

# `toLowerCase()`
转换为小写

toLowerCase() 方法将字符串转换为小写。

语法
```java
public String toLowerCase()
```
或
```java
public String toLowerCase(Locale locale)
```
返回值

转换为小写的字符串。

实例
```Java
public class Test {
    public static void main(String args[]) {
        String Str = new String("VITAN");

        System.out.print("返回值 :" );
        System.out.println( Str.toLowerCase() );
    }
}
```
以上程序执行结果为：返回值 :vitan

- `toUpperCase()` 转换为大写
- `StringBuffer`构造函数

**Via**
- [参考](https://m.runoob.com/java/java-stringbuffer.html)
