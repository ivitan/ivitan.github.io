---
title: CMD
tags:
  - Win
  - Batch
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2019-11-03 09:53:23
---
> CMD 基础,转载自:[可可西](https://www.cnblogs.com/kekec/p/3662125.html)

# 基础命令
```cmd
# 中断命令
Crtl + z  
```
<!--more-->
# 文件/目录
##  cd
|命令|含义|
|:---|:---|
|cd |显示当前目录|
|cd .. | 上一级目录|
|cd /d d:  |  进入上次D盘所在的目录|
|cd /d d:\   | 进入d盘根目录|
|cd d: |显示上次d盘所在的目录|
|cd /d d:\data| 进入d:\data目录|

##  md
```cmd
# e盘新建file目录
md e:\file 

md movie film
md d:\test\movie 
```

## pushd/popd
使用栈来维护当前目录
```cmd
pushd e:\file # 当前目录切换到e:\file
popd # 将刚才保存的e:\file弹栈，并设置为当前目录
```

## dir
```cmd
 # 显示当前目录中的子文件夹与文件
 dir 

# 只显示当前目录中的子文件夹与文件的文件名
dir /b 

# 分页显示当前目录中的子文件夹与文件
dir /p  

# 显示当前目录中的子文件夹
dir /ad

# 显示当前目录中的文件
dir /a-d 

 #/ 显示c:\test目录中的内容
dir c:\test 

 # 显示当前目录中keys.txt的信息
dir keys.txt

#/ 递归显示当前目录中的内容
dir /S   

# 显示当前目录下以key开头的文件和文件夹的信息
dir key*  

# 只显示当前目录中隐藏的文件和目录，并按照文件大小从小到大排序
dir /AH /OS  
```

## tree 显示目录结构
```cmd
# 显示目录结构
tree d:\file 

```
## ren 文件或目录重命名
```cmd
ren 1.txt 1.bat
ren c:\test test_01
ren Logs.txt Logs-%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%.txt
```

## rd 删除目录
```cmd
rd movie
rd /s /q d:\test  # 使用安静模式删除
```

## move 移动
```cmd
move *.png png
move /Y *.png test
move 1.png d:\png\2.png # 移动并重命名
move test d:\new # d:\new不存在则移动并重命名
```

## del 删除
```cmd
del test
del /f test

# 删除当前目录下的test文件夹中所有文件及d:\test2中所有doc文件（含只读文件；递归子目录下的文件；删除前不确认）
del /f /s /q test d:\test2\*.doc 

# 删除当前目录下所有只读文件
del /ar *.*

# 删除当前目录下除系统文件以外的所有文件
del /a-s *.*  
```
- /ar、/ah、/as、/aa 分别表示删除只读、隐藏、系统、存档文件
- /a-r、/a-h、/a-s、/a-a 分别表示删除除只读、隐藏、系统、存档以外的文件

## replace 替换
```cmd
# 替换为d:\png中的1.png
replace d:\1.png d:\png
```

## attrib  查看或修改文件或目录的属性
```cmd
 # 查看当前目录下1.txt的属性
attrib 1.txt  

# 去掉1.txt的只读属性
attrib -R 1.txt 

# 隐藏movie文件夹
attrib +H movie  
```
- A：存档  R：只读  S：系统  H：隐藏

## assoc 设置'文件扩展名'关联到的'文件类型'
```cmd 
# 显示所有'文件扩展名'关联
assoc

# 显示.txt代表的'文件类型'，结果显示.txt=txtfile
assoc .txt 

#显示.doc代表的'文件类型'，结果显示.doc=Word.Document.8
assoc .doc 

# 显示.exe代表的'文件类型'，结果显示.exe=exefile
assoc .exe

# 恢复.txt的正确关联
assoc .txt=txtfile  
```

## forfiles 递归目录执行命令
```cmd
#在当前目录下查找含有.svn的文件或目录（递归子目录），并对该目录执行指定版本号svn更新
forfiles /p . /m .svn /s /c "cmd /c svn up -r12005" 

# 在c:\myfiles目录下查找含有.svn的文件或目录（递归子目录），并对该目录执行指定版本号svn更新
forfiles /p c:\myfiles /m .svn /s /c "cmd /c svn up -r12005" 
```

##  文件查看
- type 显示文本文件内容

```cmd 
#显示c盘中11.txt的文本内容
type c:\11.txt 

# 显示当前目录下conf.ini的文本内容
type conf.ini   

# 分页显示c盘中11.txt的文本内容
type c:\11.txt | more  
```
- more 逐屏的显示文本文件内容

```cmd
more con.txt
# Space:下一屏 q:退出
```

# 拷贝
## copy 拷贝文件
```cmd
copy test.txt d:\txt
copy movie d:\
copy /Y test.txt d:\txt

# 将当前目录下的art_2.7z.开头的所有文件（按照名称升序排序）依次合并生成art_2.7z
copy /B art_2.7z.* art_2.7z   

# 将当前目录下的art_2.7z.001、art_2.7z.002文件合并生成art_2.7z
copy /B art_2.7z.001+art_2.7z.002 art_2.7z
```

## xcopy
```cmd  
# 将c:\bat\hai中的所有内容拷贝到d:\hello中  注意：需要在hello后加上\  表示hello为一个目录，否则xcopy会询问hello是F，还是D
xcopy c:\bat\hai d:\hello\ /y /h /e /f /c 

# 将c:\bat\hai中的2019年11月3日后更改的文件拷贝到d:\hello中
xcopy c:\bat\hai d:\hello\ /d:11-03-2019
```

## robocopy
```cmd
# 将当前目录下Plugins中所有内容（排除名为Intermediate和Binaries的文件夹）保留目录结构拷贝到当前目录下的PluginsDest中（PluginsDest不存在会自动创建）
robocopy .\Plugins .\PluginsDest /MIR /xd Intermediate Binaries  

# 将c:\test中所有内容（排除名为UE4Editor-SGame-Win64-DebugGame.dll和pdb后缀的文件）保留目录结构拷贝到d:\test2中（d:\test2不存在会自动创建）
robocopy c:\test d:\test2 /MIR /xd Intermediate /xf UE4Editor-SGame-Win64-DebugGame.dll *.pdb
```

# mklink 符号链接
```cmd 
#  创建D盘Users目录链接到C盘，并命名为Users
mklink /j "C:\Users" "D:\Users"  
```
- mklink [[/d] | [/h] | [/j]] Link Target
1. /d 创建目录符号链接。黙认为文件符号链接。
2.  /h　　 创建硬链接，而不是符号链接。
3.  /j　　　创建目录联接。
4.  Link　　指定新的符号链接名称。
5.  Target　指定新链接引用的路径(相对或绝对)。

# 注册表命令
|参数|含义|
|:---|:---|
|KeyName [\Machine]FullKey|Machine为远程机器的机器名 - 忽略默认到当前机器。远程机器上只有 HKLM 和 HKU。FullKey ROOTKEY+SubKey。ROOTKEY [ HKLM \| HKCU\| HKCR\| HKU \|  HKCC ]。SubKey 所选ROOTKEY下注册表项的完整名|
|/v       | 所选项之下要添加的值名
|/ve     | 为注册表项添加空白值名<无名称>
|/t        |RegKey 数据类型: [ REG_SZ \| REG_MULTI_SZ \| REG_DWORD_BIG_ENDIAN\| REG_DWORD\| REG_BINARY\|  REG_DWORD_LITTLE_ENDIAN\| REG_NONE \| REG_EXPAND_SZ ]如果忽略，则采用 REG_SZ|
|/s        |指定一个在 REG_MULTI_SZ 数据字符串中, 用作分隔符的字符；如果忽略，则将""用作分隔符|
|/d        |要分配给添加的注册表ValueName的数据|
|/f        |不提示，强行改写现有注册表项|

```cmd
# 强制添加一条开机启动c:\tools\myapp.exe程序的注册表项
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" /v MyApp /t REG_SZ /d "c:\tools\myapp.exe" /f  

# 解决32位xp打开ioa后，弹出的框关不掉问题
reg add "HKLM\SOFTWARE\ScmClient" /v AgreementConfirmed /t REG_SZ /d 1 /f  

# 强制添加一条加速关闭应用程序的注册表项
reg add "HKCU\ControlPanel\Desktop" /v WaitToKIllAppTimeOut /t REG_SZ /d 10000 /f 

 # 将JdkPath_h4127442381设置为空
reg add "hkcu\software\Unity Technologies\Unity Editor 4.x" /v JdkPath_h4127442381 /t REG_SZ /f

# 强制添加windbg打开dump文件到右键菜单的注册表项（不指明/v，键值将写入默认值名中）
reg add "HKCR\*\shell\WinDbg\command" /t REG_SZ /d "\"D:\Program Files (x86)\windbg\windbg.exe\" -z \"%1\" " /f    

# 强制添加winhex到右键菜单的注册表项（不指明/v，键值将写入默认值名中）
reg add "HKCR\*\shell\WinHex\command" /t REG_SZ /d "\"D:\software-setup\system\winhex\winhex.exe\"  \"%1\" " /f 

#为IE设置代理：http://txp-01.tencent.com/proxy.pac
reg add "hkcu\software\microsoft\windows\currentversion\internet settings" /v AutoConfigURL /t REG_SZ /d "http://txp-01.tencent.com/proxy.pac" /f  

 # 关闭IE代理服务器选项
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 0 /f 

# 为Procmon.exe工具（Process Monitor为其属性面板上的描述名）添加License同意
reg add "hkcu\software\Sysinternals\Process Monitor" /v EulaAccepted /t REG_DWORD /d 1 /f  

#强制删除值名的MyApp的注册表项
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" /v MyApp /f  

# 强制删除让任务栏里的任务管理器为灰色的注册表项
reg delete "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\taskmgr.exe" /f  

# 删除http代理
reg delete HKEY_CURRENT_USER\Environment /v HTTP_proxy /f  

 # 删除https代理
reg delete HKEY_CURRENT_USER\Environment /v HTTPS_proxy /f 

 # 强制复制winmine下所有的子项与值到winminebk中
reg copy "hkcu\software\microsoft\winmine" "hkcu\software\microsoft\winminebk" /s /f 

 # 导出winmine下所有的子项与值到
reg export "hkcu\software\microsoft\winmine" c:\regbak\winmine.reg c:\regbak\winmine.reg文件中

# 导入c:\regbak\winmine.reg文件到注册表中
reg import c:\regbak\winmine.reg  

#查询ie的安装路径
reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\IEXPLORE.EXE" /s   

# 查询.dsw默认值
reg query HKCR\.dsw /ve  

# 查询QQGame安装路径
reg query HKEY_CURRENT_USER\Software\Tencent\QQGame\SYS /v GameDirectory  
```
- 注册表中%1 %2 %3 %4的含义：--  %1表示文件列表，%2表示默认打印机，%3表示驱动器，%4表示端口

# 命令顺序
## @#@
```cmd
cd /d d:\src&work.exe /o c:\result.txt # 先将当前工作目录切换到d:\src下，然后执行work.exe /o c:\result.txt命令
```
## &&
&&  顺序执行多条命令，当碰到执行出错的命令后将不执行后面的命令
```cmd
# 如果找到了"ok"字样，就显示"成功"，找不到就不显示
find "ok" c:\test.txt && echo 成功
```
## ||
||   顺序执行多条命令，当碰到执行正确的命令后将不执行后面的命令
```cmd
# 如果找不到"ok"字样，就显示"不成功"，找到了就不显示
find "ok" c:\test.txt || echo 不成功  
```
## |
```cmd
dir *.* /s/a | find /c ".exe"
dir *.* /s/a 2>&1 | find /c ".exe" 
```

# 重定向
## >
将当前命令输出以覆盖的方式重定向
```cmd
tasklist > p1.txt
tasklist 1> p1.txt  # 等同于：tasklist > p1.txt

 #输出结果（stdout）打印在屏幕上，错误信息（stderr）以覆盖的方式重定向到p1.txt中（注：bin目录不存在时，会输出错误信息）
dir bin 2> p1.txt 

 # 将错误信息（stderr）重定向到输出结果（stdout），然后将输出结果（stdout）以覆盖的方式重定向到p1.txt中（注：bin目录不存在时，会输出错误信息）
dir bin > p1.txt 2>&1 

 # 将输出结果（stdout）重定向到错误信息（stderr），然后将错误信息（stderr）以覆盖的方式重定向到p1.txt中（注：bin目录不存在时，会输出错误信息） 注：与上条命令结果一致
dir bin 2> p1.txt 1>&2 

# 屏幕上不打印tasklist的输出结果（stdout），错误信息（stderr）仍会打印
tasklist >nul   

# 屏幕上不打印命令的错误信息（stderr），输出结果（stdout）仍会打印（注：bin目录不存在时，会输出错误信息）
dir bin 2>nul  

#  将命令的错误信息（stderr）重定向到输出结果（stdout），然后不打印输出结果（stdout）【屏幕上错误信息（stderr）和输出结果（stdout）都不打印】（注：bin目录不存在时，会输出错误信息）
dir bin >nul 2>&1  

  # 将命令的输出结果（stdout）重定向到错误信息（stderr），然后不打印错误信息（stderr）【屏幕上错误信息（stderr）和输出结果（stdout）都不打印】（注：bin目录不存在时，会输出错误信息）
dir bin 2>nul 1>&2 
```

## >>
将当前命令输出以追加的方式重定向
```cmd 
# 将tasklist的输出结果（stdout）以追加的方式重定向到p2.txt文件中（注：tasklist的输出结果就不会打印到屏幕上了）
tasklist >> p2.txt
 
tasklist 1>> p2.txt  # 等同于：tasklist >> p2.txt

# 输出结果（stdout）打印在屏幕上，错误信息（stderr）以追加的方式重定向到p2.txt中（注：bin目录不存在时，会输出错误信息）
dir bin 2>> p2.txt 

# 将错误信息（stderr）重定向到输出结果（stdout），然后将输出结果（stdout）以追加的方式重定向到p2.txt中（注：bin目录不存在时，会输出错误信息）
dir bin >> p2.txt 2>&1 

# 将输出结果（stdout）重定向到错误信息（stderr），然后将错误信息（stderr）以追加的方式重定向到p2.txt中（注：bin目录不存在时，会输出错误信息） 注：与上条命令结果一致
dir bin 2>> p2.txt 1>&2
```

## <
 从文件中获得输入信息，而不是从屏幕上，一般用于date time label等需要等待输入的命令
 ```cmd
 date <temp.txt  // temp.txt中的内容为2005-05-01
 ```
 ## @
 @   命令修饰符  在执行命令前，不打印出该命令的内容
```cmd
@cd /d d:\me   // 执行该命令时，不打印出命令的内容：cd /d d:/me
```
## ,    
在某些特殊的情况下可以用来代替空格使用
```cmd
dir,c:\   // 相当于：dir c:\
```

## ;
当命令相同的时候,可以将不同的目标用;隔离开来但执行效果不变。如执行过程中发生错误则只返回错误报告但程序还是会继续执行
```cmd
dir c:\;d:\;e:\   // 相当于顺序执行：dir c:\    dir d:\     dir e:\
```

# 时间日期
## time
```cmd
time  # 显示或设置当前时间

time /t  # 显示当前时间

time   # 设置新的当前时间（格式：hh:mm:ss），直接回车则表示放弃设置
```
## date
```cmd
date /t  # 显示当前日期

date  # 设置新的当前日期（格式：YYYY/MM/DD），直接回车则表示放弃设置
```

# BAT
## 显示
```cmd
cls  # 清除屏幕
ver  # 显示当前windows系统的版本号
winver  # 弹框显示当前windows系统信息
hostname  # 显示当前机器名
vol  # 显示当前分区的卷标
label  # 显示当前分区的卷标，同时提示输入新卷标
label c:system  # 设置c盘的卷标为system
```
## echo
```cmd
 # 输出一个"回车换行"，空白行
echo. 

# 后续所有命令在执行前，不打印出命令的内容
echo off 

# 后续所有命令在执行前，打印出命令的内容
echo on   

#/ 输出123到终端屏幕
echo 123 

# 输出Hello World!!!到终端屏幕
echo "Hello World!!!"   

#每个命令运行结束，可以用这个命令行格式查看返回码；默认值为0，一般命令执行出错会设errorlevel为1
echo %errorlevel%   

# 输出test的字符串到当前目录中的p1.txt文件中（以覆盖的方式）
echo test > p1.txt 
```

```cmd
# 显示变量p代表的字符串，即aa1bb1aa2bb2
echo %p%

#显示变量p中第6个字符以后的所有字符，即aa2bb2
echo %p:~6% 

# 显示第6个字符以后的3个字符，即aa2
echo %p:~6,3% 

# 显示最后面的2个字符，即b2
echo %p:~-2%

# 显示除了最后2个字符以外的其它字符，即aa1bb1aa2b
echo %p:~0,-2%

# 用c替换变量p中所有的aa，即显示c1bb1c2bb2
echo %p:aa=c%

# 将变量p中的所有aa字符串置换为空，即显示1bb12bb2
echo %p:aa=% 

echo %p:*bb=c%
# 第一个bb及其之前的所有字符被替换为c，即显示c1aa2bb2
```

## set
```cmd
# 显示当前用户所有的环境变量
set  

# 查看path的环境变量值（准确的说是查看以path开头的环境变量）
set path 

#清空path变量
set path=   

# 将path变量设置为d:\execute（注：修改的path只会影响当前回话，也不会存储到系统配置中去；当前cmd窗口关闭，新设置的path也就不存在了
set path=d:\execute ）

# 在path变量中添加d:\execute（注：修改的path只会影响当前回话，也不会存储到系统配置中去；当前cmd窗口关闭，新设置的path也就不存在了）
set path=%path%;d:\execute  

# 设置变量p，并赋值为aa1bb1aa2bb2
set p=aa1bb1aa2bb2 
```

```cmd
# 设置变量p，赋值为 %p:*bb=c% ，即c1aa2bb2
set p=%p:*bb=c% 

# 设置p为数值型变量，值为39
set /a p=39 

# 支持运算符，有小数时用去尾法，39/10=3.9，去尾得3，p=3
set /a p=39/10 

 # 用 /a 参数时，在 = 后面的变量可以不加%直接引用
set /a p=p/10

# &运算要加引号。其它支持的运算符参见set/?
set /a p="1&0"
```

## path
```cmd
# 显示当前path变量的值
path 

# 清除所有搜索路径设置并指示cmd.exe只在当前目录中搜索
path ;

#将d:\xxx路径添加到path中
path d:\xxx;%PATH% 
```
```cmd
title 正在做命令行测试  # 修改当前cmd窗口的标题栏文字为正在做命令行测试

prompt orz:   # 将命令提示符修改为orz:

print 1.txt  #使用设置好的打印机来打印1.txt文本文件

call ff.bat   # 调用执行ff.bat脚本（ff.bat脚本执行完原脚本才会往下执行）

exit # 退出当前CMD实例
pause # 暂停批处理程序，并显示出：请按任意键继续....
```

## start
```cmd
start  # 运行某程序或命令

# 最大化的方式启动记事本
start /max notepad.exe

 # 最小化的方式启动计算器
start /min calc.exe 

# 最小化的方式启动Proxifier代理工具
start /min "" d:\Proxifier.exe  

# 启动一个cmd实例窗口，并运行tasklist
start  tasklist 

# 调用资源管理器打开f盘
start explorer f:\  

# 启动ie并打开www.qq.com网址
strat iexplore "www.qq.com" 

#启动开始执行ff.bat（启动ff.bat脚本后，原脚本继续执行，不会等ff.bat脚本执行完）
start ff.bat  
```

## color
设置当前cmd窗口背景色和前景色（前景色即为字体的颜色）
```cmd
color 02 # 将背景色设为黑色，将字体设为绿色
```

|代码| 颜色|代码| 颜色|
|:---|:---|:---|:---|
|0 | 黑色 |8 | 灰色|
|1 | 蓝色 |9 | 淡蓝色|
|2 | 绿色 |A | 淡绿色|
|3 | 浅绿色| B | 淡浅绿色|
|4 |红色 |C | 淡红色|
|5 | 紫色| D | 淡紫色|
|6 | 黄色|E | 淡黄色|
|7 | 白色|F | 亮白色|

-  设置DOS窗口颜色为9f，大小：200行 60列（若屏幕缓冲区大小的宽度w<200或高度h<60,最终DOS的窗口就会为w行，h列）

```cmd
mode con cols=200 lines=60 & color 9f   
```

## chcp  字符编码
936 -- GBK(一般情况下为默认编码)
437 -- 美国英语
65001 -- utf-8
1200 -- utf-16
1201 -- utf-16(Big-Endian)
12000 -- utf-32
12001 -- utf-32(Big-Endian)

```cmd 
# 设置当前命令行环境编码为GBK  执行完该命令后还需要将字体设置为点阵字体，才能真正将编码环境切成utf8
chcp  936 

# 设置当前命令行环境编码为utf8  执行完该命令后还需要将字体设置为Lucida Console，才能真正将编码环境切成utf8
chcp  65001  
```

## wmic 查看进程信息
```cmd
# 查看名为"buyticket.exe"所有进程命令行，exe全路径，PID及线程数
wmic process where Caption="buyticket.exe" get commandline,ExecutablePath,ProcessId,ThreadCount /value

# 查看名为"buyticket.exe"所有进程的exe全路径及当前打开的句柄数
wmic process where Caption="buyticket.exe" get ExecutablePath,HandleCount /value  

# 查看名为"buyticket.exe"所有进程的exe全路径、当前虚拟地址空间占用及物理内存工作集
wmic process where Caption="buyticket.exe" get ExecutablePath,VirtualSize,WorkingSetSize /value   
```

## shutdown 
```cmd
#关闭计算机
shutdown /s  

# 一小时后，关闭本地计算机
shutdown /s /t 3600

# 终止系统关闭
shutdown /a 

# 关闭并重启本地计算
shutdown /r 机

# 关闭并重启ip为192.168.1.166的计算机
shutdown /m 192.168.1.166 /r 
```
```cmd
# 关闭并重启计算机，重启后重新启动所有注册的应用程序
shutdown /g  

# 注销本地计算机
shutdown /l  

# 休眠本地计算机（强制正在运行的应用程序关闭，不前台警告用户）
shutdown /h /f 

 # 关闭计算机
shutdown /s
```

## regsvr32  注册或反注册com组件
```cmd
# 以无声的方式注册clock.ocx组件
regsvr32 /s clock.ocx  

# 卸载myCommon.dll组件
 regsvr32 /u myCommon.dll
```

## format  格式化磁盘
```cmd
# 以ntfs类型格式化J盘 【类型有:FAT、FAT32、exFAT、NTFS或UDF】
format J: /FS:ntfs   

#  以fat32类型快速格式化J盘
format J: /FS:fat32 /Q 
```
## chkfsk 检查磁盘并显示状态报告
```
chkdsk /f D:   # 检查磁盘D并显示状态报告；加参数/f表示同时会修复磁盘上的错误
```

## subset
subst   磁盘映射  -- 磁盘映射信息都保存在注册表以下键值中：HKEY_CURRENT_USER\Network

```cmd 
# 显示目前所有的映射
subst 

# 将\\com\software共享映射为本地z盘
subst z: \\com\software 

# 将e:\src映射为本地y盘
subst y: e:\src 

# 删除z盘映射
subst z: /d  
```

## cmdkey  
 凭据Credential（保存的用户名和密码）
```cmd
# 列出可用的凭据
cmdkey /list  

# 列出指定目标的凭据
cmdkey /list:10.12.190.82  

# 列出指定目标的凭据
cmdkey /list:Domain:target=10.12.190.82  

# 若target为10.12.190.82的凭据不存在，则添加；否则就将10.12.190.82凭据的用户名修改为LiLei，密码修改为123456
cmdkey /add:Domain:target=10.12.190.82 /user:LiLei /pass:123456  

# 删除指定目标的凭据
cmdkey /delete:Domain:target=10.12.190.82 
```

## cscript  执行vbs脚本
```cmd
# 执行mac.vbs脚本，显示本机mac地址
cscript /Nologo mac.vbs  
```

```vbs mac.vbs
Dim mc,mo
Set mc=GetObject("Winmgmts:").InstancesOf("Win32_NetworkAdapterConfiguration")
For Each mo In mc
If mo.IPEnabled=True Then
MsgBox "本机网卡MAC地址是: " & mo.MacAddress
Exit For
End If
Next
```

## powercfg  设置电源方案
```cmd
# 列出当前用户环境中的所有电源方案的GUID以及当前使用的是哪一个电源方案
powercfg -list   

# 查询GUID为8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c的电源方案的详细内容
powercfg -query 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c 

# 设置禁止休眠
powercfg -h off
```
```cmd
#  设置硬盘从不关闭
powercfg -change -disk-timeout-dc 0
powercfg -change -disk-timeout-ac 0

#  设置显示器从不关闭
powercfg -change -monitor-timeout-dc 0
powercfg -change -monitor-timeout-ac 0

# 设置从不进入待机
powercfg -change -standby-timeout-dc 0
powercfg -change -standby-timeout-ac 0

#  设置从不进入休眠
powercfg -change -hibernate-timeout-dc 0
powercfg -change -hibernate-timeout-ac 0
```
1. dc代表直流电源 即使用电池供电；ac代表交流电源 即直接连接电源
2. 后面数字为时间，单位为分钟；设置为0表示从不

## netsh advfirewall  设置防火墙
windows防火墙规则顺序：阻止规则的优先级高于允许规则

```cmd
#将防火墙当前的所有配置导出到d:\test\advfirewall.pol文件
netsh advfirewall export "d:\test\advfirewall.pol"  
# 将d:\test\advfirewall.pol文件中规则导入到防火墙中
netsh advfirewall import "d:\test\advfirewall.pol"  
# 将防火墙还原为默认策略
netsh advfirewall reset

# 关闭所有类型网络的防火墙（域网络【Domain】、家庭或工作的专用网络【Private】、公用网络都关闭【Public】）
netsh advfirewall set allprofiles state off

netsh advfirewall set allprofiles state on  # 开启所有类型网络的防火墙

#关闭当前类型网络的防火墙
netsh advfirewall set currentprofile state off 

# 开启当前类型网络的防火墙
netsh advfirewall set currentprofile state on 

# 开启域网络的防火墙
netsh advfirewall set domainprofile state on 

 # 关闭域网络的防火墙
netsh advfirewall set domainprofile state off

# 开启家庭或工作的专用网络的防火墙
netsh advfirewall set privateprofile state on 

# 关闭家庭或工作的专用网络的防火墙
netsh advfirewall set privateprofile state off  

# 开启公用网络的防火墙
netsh advfirewall set publicprofile state on 

 # 关闭公用网络的防火墙
netsh advfirewall set publicprofile state off 

#显示所有规则
netsh advfirewall firewall show rule name=all  

# 显示名为foxmail的所有规则
netsh advfirewall firewall show rule name=foxmail   
# 开启ping回显
netsh advfirewall firewall set rule name="文件和打印机共享(回显请求 - ICMPv4-In)" new enable=yes 

#  删除所有名为NiZhanBrowser的规则
netsh advfirewall firewall delete rule name=NiZhanBrowser 

# 删除所有名为NiZhanBrowser的入站规则
netsh advfirewall firewall delete rule name=NiZhanBrowser dir=in

# 删除所有名为NiZhanBrowser且操作为阻止的规则
netsh advfirewall firewall delete rule name=NiZhanBrowser action=block 

# 添加名为TCP-In-8888入站规则：允许TCP端口8888
netsh advfirewall firewall add rule name=TCP-In-8888 protocol=TCP localport=8888 dir=in action=allow  

# 添加名为TCP-In-8888入站规则：阻止TCP端口8888
netsh advfirewall firewall add rule name=TCP-In-8888 protocol=TCP localport=8888 dir=in action=block  

# 添加名为TCP-In-8888出站规则：允许TCP端口8888
netsh advfirewall firewall add rule name=TCP-In-8888 protocol=TCP localport=8888 dir=out action=allow  

# 添加名为TCP-In-8888出站规则：阻止TCP端口8888
netsh advfirewall firewall add rule name=TCP-In-8888 protocol=TCP localport=8888 dir=out action=block  

#  添加名为test1入站规则：允许TCP端口8888、远程IP地址在10.96.208.0/23,10.96.154.0/23区间、远程Port在1024-2048,2050-65535
netsh advfirewall firewall add rule name=test1 protocol=TCP localport=8888 remoteip=10.96.208.0/23,10.96.154.0/23 remoteport=1024-2048,2050-65535 dir=in action=allow 

# 添加名为test2入站规则：允许TCP端口8888、本地IP地址在10.46.50.32、本地Port在3702
netsh advfirewall firewall add rule name=test2 protocol=TCP localport=8888 localip=10.46.50.32 localport=3702 dir=in action=allow 

# 添加名为test3入站规则：允许TCP端口8888、程序路径为：D:\tools\test3.exe
netsh advfirewall firewall add rule name=test2 protocol=TCP localport=8888 program="D:\tools\test3.exe" dir=in action=allow 

```
注：netsh advfirewall firewall add rule ?可用来查看帮助信息

## schtasks  任务计划
```cmd
# 以较为详细易于阅读的格式显示本机所有任务计划信息
schtasks /query /fo LIST /v  

 # 创建一个名为Soda Build的任务计划：该任务计划每20分钟执行一下d:\check.vbs脚本
schtasks /create /sc minute /mo 20 /tn "Soda Build" /tr d:\check.vbs 

# 强制创建一个名为Soda Build的任务计划（不进行确认）：该任务计划每天凌晨2点06分执行一下D:\updateall.bat脚本
schtasks /create /tn "Soda Build" /tr D:\updateall.bat /sc daily /st 02:06 /f 

# 强制删除Soda Build名称的任务计划（不进行确认）
schtasks /delete /tn "Soda Build" /f 

#将名为Soda Build的任务计划的执行脚本修改为d:\check2.vbs
schtasks /change /tn "Soda Build" /tr d:\check2.vbs 

#执行名为Soda Build的任务计划
schtasks /run /tn "Soda Build" 

#终止执行名为Soda Build的任务计划
schtasks /end /tn "Soda Build" 
```

## net
```cmd
# 查看已经启动的服务
net start 

# 开启任务计划服务
net start "Task Scheduler"   

# 不询问，直接关闭任务计划服务
net stop "Task Scheduler" /y 

# 开启dns缓存服务
net start dnscache 

# 不询问，直接关闭dns缓存服务
net stop dnscache /y  

# 开启Remote Desktop Services服务
net start TermService  

# 不询问，直接关闭Remote Desktop Services服务
net stop TermService /y  

# 查看当前用户下的共享目录
net share  

#  取消名为workFile的共享状态
net share workFile /delete 

# 将c:\360Downloads设为共享，并取名为xxx
net share xxx=c:\360Downloads   

# 开启ipc$共享
net share ipc$ 

# 删除ipc$共享
net share ipc$ /del 

# 删除c盘共享
net share c$ /del 

# 建立192.168.1.166的ipc空链接
net use \\192.168.1.166\ipc$ " " /user:" "

# 直接登陆后建立192.168.1.166的ipc非空链接（用户名为administrator 密码为123456）
net use \\192.168.1.166\ipc$ "123456" /user:"administrator"  

# 直接登陆后映射192.168.1.166的c盘到本地为h盘（用户名为administrator 密码为123456）
net use h: \\192.168.1.166\c$ "123456" /user:"administrator"   

# 登陆后映射192.168.1.166的c盘到本地为h盘
net use h: \\192.168.1.166\c$   

# 删除ipc链接
net use \\192.168.1.166\ipc$ /del  

# 删除本地的h盘的映射
net use h: /del 

# 查看本地局域网内开启了哪些共享
net view 

# 查看192.168.1.166的机器上在局域网内开启了哪些共享
net view \\192.168.1.166 

# 查看本地机器的日期及时间
net time \\127.0.0.1  

# 查看本地机器的日期及时间
net time \\localhost   

# 查看192.168.1.166机器的日期及时间
net time \\192.168.1.166  

# 设置本地计算机时间与192.168.1.166主机的时间同步，加上参数/yes可取消确认信息
net time \\192.168.1.166 /set 

# 查看当前机器上的用户
net user  

# 查看当前机器上的Administrator用户的信息
net user Administrator  

# 启用Guest用户
net user Guest /active:yes  

# 新建一个名为dev，密码为123456的用户
net user dev 123456 /add   

# 把名为dev的用户添加到管理员用户组中，使其具有管理员权限
net localgroup administrators dev /add  

# 删除名为dev的用户
net user dev /del  
```

##  进程操作
```cmd
# 显示当前运行的进程信息（可查看PID）
tasklist  

#结束指定的进程
taskkill  

# 结束名为notepad.exe的进程
taskkill /im notepad.exe 

#  结束pid为1230、1241和1253的进程以及由它们启动起来的子进程
taskkill /pid 1230 /pid 1241 /pid 1253 /t 

# 强制结束有名为cmd.exe的进程以及由它启动起来的子进程
taskkill /f /im cmd.exe /t  
```

# 网络
```cmd
#  测试与baidu服务器的连接情况
ping baidu.com   

# 测试机器名为chen-pc0的连接情况
ping chen-pc0   

 # 测试与ip为220.181.111.86的连接情况
ping 220.181.111.86  

# 向qq.com发送10次65500字节的ping
ping -l 65500 -n 10 qq.com  

# 对当前主机执行6次ping操作（花费时间为5s）
ping -n 6 127.0.0.1 

 # 不断地测试baidu服务器的连接情况   【Ctrl+Pause Break：查看ping的统计信息；Ctrl+C：终止当前任务】
ping -t baidu.com 
```

```cmd 
# 查看本地ip地址等详细信息
ipconfig /all

# 显示本地dns缓存的内容
ipconfig /displaydns 

# 清除本地dns缓存的内容
ipconfig /flushdns

# 获取www.cnblogs.com的域名解析
nslookup www.cnblogs.com 

# 打印出www.cnblogs.com的域名解析所有记录
nslookup -d www.cnblogs.com

# 查看开启了哪些端口
netstat -a   

 # 查看端口的网络连接情况
netstat -n 

# 查看正在进行的工作
netstat -v   

# 查看tcp协议的使用情况
netstat -p tcp  

# 查看本机到达182.140.167.44的路由路径
tracert 182.140.167.44  

#显示出IP路由
route print  
```

# arp
arp   显示和修改地址解析协议(ARP)使用的“IP到mac”的地址转换表
```cmd
# 显示arp缓存表
arp -a  
```
at  计划任务（必须保证“Task Scheduler”服务启动   net start "task scheduler"）
```cmd
# 查看所有的计划任务
at 

# 停止所有任务计划（不需要确认）
at /delete /yes 

# 开启id为1的计划任
at 1 

# 停止id为1的计划任务（不需要确认）
at 1 /delete /yes  

# 到12:42 ，电脑会出现“ 系统关机 ”对话框，并默认 30 秒延时自动关机
at 12:42 shutdown –s –t30   

# 如果命令不是exe文件，必须在命令前加上cmd /c
at cmd /c dir > c:\test.out  

# 在每周六早上6点，电脑定时启动task.bat批处理文件
at 6:00AM /every:Saturday task.bat  

# 到12:00时，关闭名为chen的计算机
at \\chen 12:00 shutdown /r   

# 到12:00时，关闭ip为192.168.1.166的计算机
at \\192.168.1.166 12:00 shutdown /r 
```

#  文本处理 
```cmd
# 编辑config.ini文件（会进入edit字符编辑器；按alt，可以选择对应的菜单） win7 x64下没有该命令
edit config.ini  
```
find  文件中搜索字符串
```cmd
# 在1.txt文件中忽略大小写查找pid字符串，并带行号显示查找后的结果
find /N /I "pid" 1.txt 

# 只显示在1.txt文件中查找到exe字符串的次数
find /C "exe" 1.txt  

# 显示未包含1.txt文件中未包含exe字符串的行
find /V "exe" 1.txt

findstr  文件中搜索字符串

# 在1.txt文件中搜索hello或world
findstr "hello world" 1.txt  # 在1.txt文件中搜索hello或world

# 在1.txt文件中搜索hello world
findstr /c:"hello world" 1.txt 

# 在1.txt文件中搜索hello world，并在每行结果前打印出1.txt:   注：findstr只有在2个及以上文件中搜索字符串时才会打印出每个文件的文件名，nul表示一个空文件
findstr /c:"hello world" 1.txt nul  # 在1.txt文件中搜索hello world，并在每行结果前打印出1.txt:   注：findstr只有在2个及以上文件中搜索字符串时才会打印出每个文件的文件名，nul表示一个空文件

# 不区分大小写，在当前目录和所有子目录中的所有文件中的hello
findstr /s /i "Hello" *.*   # 不区分大小写，在当前目录和所有子目录中的所有文件中的hello

# 在1.txt中搜索以1个数字+1个小写字母开头子串的行
findstr  "^[0-9][a-z]" 1.txt  # 在1.txt中搜索以1个数字+1个小写字母开头子串的行
```

# 控制台命令窗口中一些技巧
在文件夹空白处按住Shift，然后右键弹出快捷菜单，可以看到“在此处打开命令行窗口”
命令参数的路径：要使用反斜杠`\`，不要使用正斜杠'/'   如：del d:\test2\file\my.txt
命令参数的路径：若存在空格，应使用双引号将路径引起来  如：del "d:\program files\file\my.txt"

文件及目录名中不能包含下列任何字符：`\ / : * ? " < > |`

`rem`   在批处理文件中添加注解，其后的命令不会被执行，但会回显
`::` 也可以起到rem的注释作用，且不会有回显
任何以冒号: 开头的字符行, 在批处理中都被视作标号（label）, 而直接忽略其后的所有内容
有效标号：冒号后紧跟一个以字母数字开头的字符串，goto语句可以识别
无效标号：冒号后紧跟一个非字母数字的一个特殊符号，goto无法识别的标号，可以起到注释作用，::常被用作注释符号