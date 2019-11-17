---
title: Java 控制语句
date: 2018-03-14 08:29:27
tags:
- Java
toc: true
categories:
 - Coding
 - Java
thumbnail: /images/Java.png
---
Java控制语句
<!--more-->
# 简介
Java流程控制语句（顺序结构、if条件语句、switch条件语句、循环语句与跳转语句）

# 顺序语句
## 表达式语句
```Java
i++;
i--;
x=10;
sum=sum+1;
new JFrame(); //实例化对象
this.setVisible(true); //方法调用
```

## 空语句
```Java
for(int i=0;i<10;i++); //空语句一个分号
```
```Java
int x=6;; //两连续分号，第二个是空语句
```
```Java
if (a>b) {
         ;   //条件为真，执行空语句
}
else {

            //条件为假，执行本部分
}
```

## 复合语句
```Java
{
    int i=5;//又称代码块语句，一对大括号括起来的语句，中间可有多个变量或语句
    int a;
    a=i;
    System.out.orint(a);
}
```

# 选择语句
## if语句
```Java
/*
 * "if条件语句"示例代码
 * 功能：输入三个数，输出最大值
 */

import java.util.Scanner;
public class Program {
	public static void main(String [] args) {
		int num1,num2,num3,max;
		Scanner input = new Scanner(System.in);
		System.out.println("请输入第一个数：");
		num1=input.nextInt();
		System.out.println("请输入第二个数：");
		num2=input.nextInt();
		System.out.println("请输入第三个数：");
		num3=input.nextInt();
		max=num1;
		if(num2>max)
			max=num2;
		if (num3>max)
			max=num3;
		System.out.println("max="+max);
		input.close();
	}
}
```

## switch语句
```Java
import java.unit.Scanner;
public class Switchweek
    public static void main(String[]args) {
        Scanner input = new Scanner(System.in);
        System.out.println("请输入1-7的整数");
        int day = input.nextInt(); //对象调用方法获取数据
        switch (day)
        {
            case 7: System.out.println("星期日"); break;
            case 1: System.out.println("星期一"); break;
            case 2: System.out.println("星期二"); break;
            case 3: System.out.println("星期三"); break;
            case 4: System.out.println("星期四"); break;
            case 5: System.out.println("星期五"); break;
            case 6: System.out.println("星期六"); break;
            default: Syatem.out.println("你输入的日期不在有效范围内！");
            }
      }
}
```

```Java
public class Switch{
    public static void main(String[] args) {
		char today='日';
		switch(today){
            case '一':
            case '三':
            case '五':
                System.out.println("早餐吃包子");
                break;
            case '二':
            case '四':
            case '六':
                System.out.println("早餐吃油条");
                break;
            default:
                System.out.println("吃主席套餐");
		}
	}
}
```

# 循环语句(主要有while/do-while/for和foreach)
## while
```Java
while(判断条件)
{
    语句;
}
```

## 扩展格式
```java
初始化语句;
while(判断条件语句) {
      循环体语句;
      控制条件语句;
    }

    通过这个格式，我们就可以看到其实和for循环是差不多的。
        for(初始化语句;判断条件语句;控制条件语句) {
            循环体语句;
        }
```
```Java
public class WhileSun {
    public static void main(String[] args) {
        int i = 1;
        int n = 10;
        int sum = 0;
        while(i<=n) {
            sum+=i;
            i++;
        }
        System.out.println("1加到10但和是:"+sum);
        System.out.println("循环后变量i但值是:"+i);
    }
}
```

## do-while
1. 对于 while 语句而言，如果不满足条件，则不能进入循环。但有时候我们需要即使不满足条件，也至少执行一次。
2. do…while 循环和 while 循环相似，不同的是，do…while 循环至少会执行一次。
```java
do {
       //代码语句
}while(布尔表达式);
```

注意：布尔表达式在循环体的后面，所以语句块在检测布尔表达式之前已经执行了。 如果布尔表达式的值为 true，则语句块一直执行，直到布尔表达式的值为 false。
```Java
public class Test {
   public static void main(String args[]){
      int x = 10;
      do{
         System.out.print("value of x : " + x );
         x++;
         System.out.print("\n");
      }while( x < 20 );
   }
}
```

## for循环
```
for(初始化; 布尔表达式; 更新) {
    //代码语句
}
```

最先执行初始化步骤。可以声明一种类型，但可初始化一个或多个循环控制变量，也可以是空语句。
然后，检测布尔表达式的值。如果为 true，循环体被执行。如果为false，循环终止，开始执行循环体后面的语句。
执行一次循环后，更新循环控制变量。
再次检测布尔表达式。循环执行上面的过程。

```Java
public class Test {
   public static void main(String args[]) {
      for(int x = 10; x < 20; x = x+1) {
         System.out.print("value of x : " + x );
         System.out.print("\n");
      }
   }
}
```
# Java 增强 for 循环
Java5 引入了一种主要用于数组的增强型 for 循环。

Java 增强 for 循环语法格式如下:
```
for(声明语句 : 表达式)
{
   //代码句子
}
```
明语句：

声明新的局部变量，该变量的类型必须和数组元素的类型匹配。其作用域限定在循环语句块，其值与此时数组元素的值相等。

表达式：表达式是要访问的数组名，或者是返回值为数组的方法

```Java
public class Test {
   public static void main(String args[]){
      int [] numbers = {10, 20, 30, 40, 50};

      for(int x : numbers ){
         System.out.print( x );
         System.out.print(",");
      }
      System.out.print("\n");
      String [] names ={"James", "Larry", "Tom", "Lacy"};
      for( String name : names ) {
         System.out.print( name );
         System.out.print(",");
      }
   }
}
```

## break 关键字
break 主要用在循环语句或者 switch 语句中，用来跳出整个语句块。

break 跳出最里层的循环，并且继续执行该循环下面的语句。

语法:break 的用法很简单，就是循环结构中的一条语句：
`break;`

```Java
public class Test {
   public static void main(String args[]) {
      int [] numbers = {10, 20, 30, 40, 50};

      for(int x : numbers ) {
         // x 等于 30 时跳出循环
         if( x == 30 ) {
            break;
         }
         System.out.print( x );
         System.out.print("\n");
      }
   }
}
```

```Java
/*
 * "实战——九九乘法口诀表"*/

public class Program {
	public static void main(String [] args) {
		System.out.println("九九乘法口诀表：");
		for (int i=1;i<=9;i++){
			for(int j=1;j<=i;j++){
				System.out.print(j+"*"+i+"="+j*i+"\t");
			}
//			注意print与println的区别
			System.out.print("\n");
//			System.out.println();
		}
	}
}

```

## continue 关键字
continue 适用于任何循环控制结构中。作用是让程序立刻跳转到下一次循环的迭代。

在 for 循环中，continue 语句使程序立即跳转到更新语句。

在 while 或者 do…while 循环中，程序立即跳转到布尔表达式的判断语句。
语法

continue 就是循环体中一条简单的语句：

`continue;`

```Java
public class Test {
   public static void main(String args[]) {
      int [] numbers = {10, 20, 30, 40, 50};
      for(int x : numbers ) {
         if( x == 30 ) {
        continue;
         }
         System.out.print( x );
         System.out.print("\n");
      }
   }
}
```
