---
title: Batch 计划任务
tags:
  - Win
  - Batch
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2019-12-13 10:24:56
---
> Batch 计划任务

# 语法
```cmd
SCHTASKS /Create [/S system [/U username [/P [password]]]]
[/RU username [/RP password]] /SC schedule [/MO modifier] [/D day]
[/M months] [/I idletime] /TN taskname /TR taskrun [/ST starttime]
[/RI interval] [ {/ET endtime | /DU duration} [/K] [/XML xmlfile] [/V1]]
[/SD startdate] [/ED enddate] [/IT | /NP] [/Z] [/F] [/HRESULT] [/?]
```
<!--more-->

描述:允许管理员在本地或远程系统上创建计划任务。

```cmd
schtasks /create /tn TaskName /tr TaskRun /sc minute [/mo {1 - 1439}] [/st StartTime] [/sd StartDate] [/ed EndDate] [/s computer [/u [domain\]user /p password]] [/ru {[Domain\]User | "System"} [/rp Password]]
```

# 参数列表
|参数|含义|
|:---|:---|
|`/S  system `|指定要连接到的远程系统。如果省略这个系统参数，默认是本地系统。
|`/U  username ` | 指定应在其中执行 SchTasks.exe 的用户上下文。
| `/P  [password]` |指定给定用户上下文的密码。如果省略则提示输入。
| `/RU  username`  |    指定任务在其下运行的“运行方式”用户,帐户(用户上下文)。对于系统帐户，有效值是 ""、"NT AUTHORITY\SYSTEM" 或"SYSTEM"。对于 v2 任务，"NT AUTHORITY\LOCALSERVICE"和 "NT AUTHORITY\NETWORKSERVICE"以及常见的 SID 对这三个也都可用。
|`/RP  [password] ` |  指定“运行方式”用户的密码。要提示输入密码，值必须是 "*" 或无。系统帐户会忽略该密码。必须和 /RU 或 /XML 开关一起使用。
|`/RU/XML /SC schedule` | 指定计划频率。有效计划任务:  MINUTE、 HOURLY、DAILY、WEEKLY、 MONTHLY, ONCE, ONSTART, ONLOGON, ONIDLE, ONEVENT.
|`/MO  modifier` | 改进计划类型以允许更好地控制计划重复周期。有效值列于下面“修改者”部分中。
|` /D    days` |  指定该周内运行任务的日期。有效值:MON、TUE、WED、THU、FRI、SAT、SUN和对 MONTHLY 计划的 1 - 31(某月中的日期)。通配符“*”指定所有日期。
| `/M    months` |  指定一年内的某月。默认是该月的第一天。有效值: JAN、FEB、MAR、APR、MAY、JUN、JUL、 AUG、SEP、OCT、NOV  和 DEC。通配符 “*” 指定所有的月。
|`/I    idletime` |    指定运行一个已计划的 ONIDLE 任务之前要等待的空闲时间。有效值范围: 1 到 999 分钟。
|`/TN   taskname` |    以路径\名称形式指定对此计划任务进行唯一标识的字符串。
|`/TR   taskrun`  |    指定在这个计划时间运行的程序的路径和文件名。例如: C:\windows\system32\calc.exe
|`/ST   starttime`|    指定运行任务的开始时间。时间格式为 HH:mm (24 小时时间)，例如 14:30 表示 2:30 PM。如果未指定 /ST，则默认值为当前时间。/SC ONCE 必需有此选项。
|`/RI   interval` |    用分钟指定重复间隔。这不适用于计划类型: MINUTE、HOURLY、ONSTART, ONLOGON, ONIDLE, ONEVENT.有效范围: 1 - 599940 分钟。如果已指定 /ET 或 /DU，则其默认值为10 分钟。
| `/ET   endtime ` |    指定运行任务的结束时间。时间格式为 HH:mm (24 小时时间)，例如，14:50 表示 2:50 PM。这不适用于计划类型: ONSTART、ONLOGON, ONIDLE, ONEVENT.
| `/DU   duration `  |  指定运行任务的持续时间。 时间格式为 HH:mm。这不适用于 /ET 和 计划类型: ONSTART, ONLOGON, ONIDLE, ONEVENT.对于 /V1 任务，如果已指定 /RI，则持续时间默认值为1 小时。
|`/K `  | 在结束时间或持续时间终止任务。这不适用于计划类型: ONSTART、ONLOGON, ONIDLE, ONEVENT.必须指定 /ET 或 /DU。
|`/SD   startdate`  |  指定运行任务的第一个日期。格式为 yyyy/mm/dd。默认值为当前日期。这不适用于计划类型: ONCE、ONSTART, ONLOGON, ONIDLE, ONEVENT.
| `/ED   enddate `  |   指定此任务运行的最后一天的日期。格式是 yyyy/mm/dd。这不适用于计划类型:ONCE、ONSTART、ONLOGON、ONIDLE。
|`/EC   ChannelName` | 为 OnEvent 触发器指定事件通道。
|`/IT` |  仅有在 /RU 用户当前已登录且作业正在运行时才可以交互式运行任务。此任务只有在用户已登录的情况下才运行。
|`/NP `  |不储存任何密码。任务以给定用户的身份非交互的方式运行。只有本地资源可用。
|`/Z ` |  标记在最终运行完任务后删除任务。
|`/XML  xmlfile`  | 从文件的指定任务 XML 中创建任务。可以组合使用 /RU 和 /RP 开关，或者在任务 XML 已包含主体时单独使用 /RP。
|`/V1 ` |  创建 Vista 以前的平台可以看见的任务。不兼容 /XML。
| `/F` |   如果指定的任务已经存在，则强制创建任务并抑制警告。
|`/RL   level ` | 为作业设置运行级别。有效值为 LIMITED 和 HIGHEST。默认值为 LIMITED。
|`/DELAY delaytime ` | 指定触发触发器后延迟任务运行的等待时间。时间格式为mmmm:ss。此选项仅对计划类型ONSTART, ONLOGON, ONEVENT.
|`/HRESULT ` |  为获得更出色的故障诊断能力，处理退出代码将采用 HRESULT 格式。
| `/?` | 显示此帮助消息。

修改者: 按计划类型的 /MO 开关的有效值:

|参数|有效值|
|:---|:---|
|MINUTE|  1 到 1439 分钟|
|HOURLY|  1 - 23 小时|
|DAILY|  1 到 365 天|
|WEEKLY|  1 到 52 周|
|ONCE| 无修改者|
|ONSTART|无修改者|
|ONLOGON| 无修改者|
|ONIDLE| 无修改者|
|MONTHLY| 1 到 12，或FIRST, SECOND, THIRD, FOURTH, LAST, LASTDAY|
|ONEVENT|  XPath 事件查询字符串|

## 示例
1. 在远程机器 "ABC" 上创建计划任务 "doc"， "runasuser" 用户下运行 notepad.exe。

```cmd
SCHTASKS /Create /S ABC /U user /P password 
/RU runasuser /RP runaspassword /SC HOURLY /TN doc /TR notepad
```

2. 远程机器 "ABC" 上创建计划任务 "accountant"， 在指定的开始日期和结束日期之间的开始时间和结束时间内，每隔五分钟运行 calc.exe。

```cmd
SCHTASKS /Create /S ABC /U domain\user /P password 
/SC MINUTE /MO 5 /TN accountant /TR calc.exe /ST 12:00 
/ET 14:00 /SD 06/06/2006 /ED 06/06/2006 /RU runasuser /RP userpassword
```

3. 创建计划任务 "gametime"，在每月的第一个星期天运行“空当接龙”。

```cmd
SCHTASKS /Create /SC MONTHLY /MO first /D SUN 
/TN gametime /TR c:\windows\system32\freecell
```

4. 在远程机器 "ABC" 创建计划任务 "report"，每个星期运行 notepad.exe。

```cmd
SCHTASKS /Create /S ABC /U user /P password /RU runasuser
/RP runaspassword /SC WEEKLY /TN report /TR notepad.exe
```

5. 在远程机器 "ABC" 创建计划任务 "logtracker"，每隔五分钟从指定的开始时间到无结束时间，运行 notepad.exe。将提示输入 /RP 密码。

```cmd
SCHTASKS /Create /S ABC /U domain\user /P password /SC MINUTE
/MO 5 /TN logtracker
/TR c:\windows\system32\notepad.exe /ST 18:30
/RU runasuser /RP
```

6. 创建计划任务 "gaming"，每天从 12:00 点开始到14:00 点自动结束，运行 freecell.exe。

```cmd
SCHTASKS /Create /SC DAILY /TN gaming /TR c:\freecell /ST 12:00
/ET 14:00 /K
```

7. 创建计划任务“EventLog”以开始运行 wevtvwr.msc只要在“系统”通道中发布事件 101

```cmd
SCHTASKS /Create /TN EventLog /TR wevtvwr.msc /SC ONEVENT
/EC System /MO *[System/EventID=101]
```

8. 文件路径中可以加入空格，但需要加上两组引号，一组引号用于 CMD.EXE，另一组用于 SchTasks.exe。用于 CMD的外部引号必须是一对双引号；内部引号可以是一对单引号或一对转义双引号:

```cmd
SCHTASKS /Create
/tr "'c:\program files\internet explorer\iexplorer.exe'
\"c:\log data\today.xml\"" ...
```

9. 令计划安全脚本 Sec.vbs 每 20 分钟运行一次。由于命令没有包含起始日期或时间，任务在命令完成 20 分钟后启动，此后每当系统运行它就每 20 分钟运行一次。请注意，安全脚本源文件位于远程计算机上，但任务在本地计算机上计划并执行。

```cmd
schtasks /create /sc minute /mo 20 /tn "Security Script" /tr \\central\data\scripts\sec.vbs
```

# 其他实例     
转载自:https://blog.csdn.net/lionzl/article/details/40896893
## schtasks create hourly
```cmd
schtasks /create /tn TaskName /tr TaskRun /sc hourly [/mo {1 - 365}] [/st StartTime] [/sd StartDate] [/ed EndDate] [/s computer [/u [domain\]user /p password]] [/ru {[Domain\]User | "System"} [/rp Password]]
```
计划命令在每小时过五分的时候运行。

1. 下面的命令将计划 MyApp 程序从午夜过后五分钟起每小时运行一次。因为忽略了 /mo 参数，命令使用了小时计划的默认值，即每 (1) 小时。如果该命令在 12:05 A.M 之后生成，程序将在第二天才会运行。

```cmd
schtasks /create /sc hourly /st 00:05:00 /tn "My App" /tr c:\apps\myapp.exe
```

计划命令每五小时运行一次

下面的命令计划 MyApp 程序从 2001 年 3 月的第一天起每五小时运行一次。它使用 /mo 参数来指定间隔时间，使用 /sd 参数来指定起始日期。由于命令没有指定起始时间，当前时间被用作起始时间。

```cmd
schtasks /create /sc hourly /mo 5 /sd 03/01/2001 /tn "My App" /tr c:\apps\myapp.exe
```

## schtasks create daily

```cmd
schtasks /create /tn TaskName /tr TaskRun /sc daily [/mo {1 - 365}] [/st StartTime] [/sd StartDate] [/ed EndDate] [/s computer [/u [domain\]user /p password]] [/ru {[Domain\]User | "System"} [/rp Password]]
```

计划任务每天运行一次

下面的范例计划 MyApp 程序在每天的 8:00 A.M. 运行一次，直到 2001 年 12 月 31 日结束。由于它忽略了 /mo 参数，所以使用默认间隔 1 来每天运行命令。

```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc daily /st 08:00:00 /ed 12/31/2001
```

计划任务每隔一天运行一次

下面的范例计划 MyApp 程序从 2001 年 12 月 31 日起每隔一天在 1:00 P.M. (13:00) 运行。命令使用 /mo 参数来指定两 (2) 天的间隔。

```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc daily /mo 2 /st 13:00:00 /sd 12/31/2001
```

## schtasks create weekly

```cmd
schtasks /create /tn TaskName /tr TaskRun /sc weekly [/d {MON - SUN | *}] [/mo {1 - 52}] [/st StartTime] [/sd StartDate] [/ed EndDate] [/s computer [/u [domain\]user /p password]] [/ru {[Domain\]User | "System"} [/rp Password]]
```

计划任务每六周运行一次

下面的命令计划 MyApp 程序在远程计算机上每六周运行一次。该命令使用 /mo 参数来指定间隔。它也使用 /s 参数来指定远程计算机，使用 /ru 参数来计划任务以用户的 Administrator 帐户权限运行。因为忽略了 /rp 参数，SchTasks.exe 会提示用户输入 Administrator 帐户密码。

另外，因为命令是远程运行的，所以命令中所有的路径，包括到 MyApp.exe 的路径，都是指向远程计算机上的路径。

```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc weekly /mo 6 /s Server16 /ru Admin01
```


计划任务每隔一周在周五运行

下面的命令计划任务每隔一周在周五运行。它使用 /mo 参数来指定两周的间隔，使用 /d 参数来指定是一周内的哪一天。如计划任务在每个周五运行，要忽略 /mo 参数或将其设置为 1。

```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc weekly /mo 2 /d FRI
```

## schtasks create monthly
### 常规月计划语法

```cmd
schtasks /create /tn TaskName /tr TaskRun /sc monthly [/mo {FIRST | SECOND | THIRD | FOURTH | LAST | LASTDAY] [/d {MON - SUN | 1 - 31}] [/m {JAN - DEC[,JAN - DEC...] | *}] [/st StartTime] [/sd StartDate] [/ed EndDate] [/s computer [/u [domain\]user /p password]] [/ru {[Domain\]User | "System"} [/rp Password]] 
```

- 指定周的语法

```cmd
schtasks /create /tn TaskName /tr TaskRun /sc monthly /mo {FIRST | SECOND | THIRD | FOURTH | LAST} /d {MON - SUN} [/m {JAN - DEC[,JAN - DEC...] | *}] [/st StartTime] [/sd StartDate] [/ed EndDate] [/s computer [/u [domain\]user /p password]] [/ru {[Domain\]User | "System"} [/rp Password]] 
```

- Lastday 语法

```cmd
schtasks /create /tn TaskName /tr TaskRun /sc monthly /mo LASTDAY /m {JAN - DEC[,JAN - DEC...] | *} [/st StartTime] [/sd StartDate] [/ed EndDate] [/s computer [/u [domain\]user /p password]] [/ru {[Domain\]User | "System"} [/rp Password]] 
```

- 指定日期的语法

```cmd
schtasks /create /tn TaskName /tr TaskRun /sc monthly /d {1 - 31} [/m {JAN - DEC[,JAN - DEC...] | *}] [/st StartTime] [/sd StartDate] [/ed EndDate] [/s computer [/u [domain\]user /p password]] [/ru {[Domain\]User | "System"} [/rp Password]] 
```

#### 计划任务在每月的第一天运行

下面的命令计划 MyApp 程序在每月的第一天运行。因为默认修饰符是 none（即：没有修饰符），默认天是第一天，默认的月份是每个月，所以该命令不需要任何其它的参数。

```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc monthly
```

#### 计划任务在每月的最后一天运行

下面的命令计划 MyApp 程序在每月的最后一天运行。它使用 /mo 参数指定在每月的最后一天运行程序，使用通配符 (*) 与 /m 参数表明在每月的最后一天运行程序。

```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc monthly /mo lastday /m *
```

#### 计划任务每三个月运行一次

下面的命令计划 MyApp 程序每三个月运行一次。.它使用 /mo 参数来指定间隔。

```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc monthly /mo 3
```

#### 计划任务在每月的第二个周日运行

下面的命令计划 MyApp 程序在每月的第二个周日运行。它使用 /mo 参数指定是每月的第二周，使用 /d 参数指定天。

```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc monthly /mo SECOND /d SUN
```

#### 计划任务在五月和六月的第 15 天运行。

下面的命令计划 MyApp 程序在五月 15 日和六月 15 日的 3:00 PM (15:00) 运行。它使用 /d 参数来指定日期，使用 /m 参数指定月份。它也使用 /st 参数来指定开始时间。

```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc monthly /d 15 /m MAY,JUN /st 15:00:00
```

## schtasks create once
```cmd
schtasks /create /tn TaskName /tr TaskRun /sc once /st StartTime /sd StartDate [/s computer [/u [domain\]user /p password]] [/ru {[Domain\]User | "System"} [/rp Password]]
```

### 计划任务运行一次

下面的命令计划 MyApp 程序在 2002 年 1 月 1 日午夜运行一次。它使用 /ru 参数指定以用户的 Administrator 帐户权限运行任务，使用 /rp 参数为 Administrator 帐户提供密码。

```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc once /st 00:00:00 /sd 01/01/2002 /ru Admin23 /rp p@ssworD1
```

## schtasks create onstart
```cmd
schtasks /create /tn TaskName /tr TaskRun /sc onstart [/sd StartDate] [/s computer [/u [domain\]user /p password]] [/ru {[Domain\]User | "System"} [/rp Password]]
```
### 计划任务在每次系统启动的时候运行

下面的命令计划 MyApp 程序在每次系统启动的时候运行，起始日期是 2001 年 3 月 15 日。
```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc onstart /sd 03/15/2001
```

## schtasks create onlogon
```cmd
schtasks /create /tn TaskName /tr TaskRun /sc onlogon [/sd StartDate] [/s computer [/u [domain\]user /p password]] [/ru {[Domain\]User | "System"} [/rp Password]]
```

### 计划任务在用户登录到远程计算机的时候运行

下面的命令计划批处理文件在用户（任何用户）每次登录到远程计算机上的时候运行。它使用 /s 参数指定远程计算机。因为命令是远程的，所以命令中所有的路径，包括批处理文件的路径，都指定为远程计算机上的路径。

```cmd
schtasks /create /tn "Start Web Site" /tr c:\myiis\webstart.bat /sc onlogon /s Server23
```

## schtasks create onidle
```cmd
schtasks /create /tn TaskName /tr TaskRun /sc onidle /iIdleTime [/sd StartDate] [/s computer [/u [domain\]user /p password]] [/ru {[Domain\]User | "System"} [/rp Password]]
```
### 计划某项任务在计算机空闲的时候运行

下面的命令计划 MyApp 程序在计算机空闲的时候运行。它使用必需的 /i 参数指定在启动任务之前计算机必需持续空闲十分钟。

```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc onidle /i 10
```

### 创建以 System 权限运行的任务

下面的命令计划 MyApp 程序以 NT Authority\System 帐户权限运行。在这个范例中，任务计划在每月的第一天运行，但对于以系统权限运行的任务可以使用所有的计划类型。

该命令使用 /ru "System" 参数指定系统安全上下文。因为系统任务不需要密码，所以忽略了 /rp 参数。

```cmd
schtasks /create /tn "My App" /tr c:\apps\myapp.exe /sc monthly /d 1 /ru "System"
```

作为响应，SchTasks.exe 显示一个信息性消息和一个成功消息。它不提示输入密码。信息：此任务将被创建于用户名下 ("NT AUTHORITY\SYSTEM")。 成功：计划任务 "My App" 已成功创建。 

### 创建运行多个程序的任务

每个任务只能运行一个程序。但是可以创建一个运行多个程序的批处理文件，然后计划一个任务来运行该批处理文件。下面的过程说明了这个方法：

1. 创建一个启动要运行程序的批处理文件。

在这个范例中创建了一个启动“事件查看器”(Eventvwr.exe) 和“系统监视器”(Perfmon.exe) 的批处理文件。
* 启动文本编辑器，例如“记事本”。
* 键入每个程序的名称和指向可执行文件的完全合格的路径。在这种情况下，文件包含有下列语句。

```cmd MyApp.bat
C:\Windows\System32\Eventvwr.exe
C:\Windows\System32\Perfmon.exe
```
2. 使用 SchTasks.exe 创建一个运行 MyApps.bat 的任务。

下面的命令创建了 Monitor 任务，每当有人登录它就运行。它使用 /tn 参数命名任务，使用 /tr 参数运行 MyApps.bat。它使用 /sc 参数来指明 OnLogon 计划类型，使用 /ru 参数指定 Administrator 帐户。
```cmd
chtasks /create /tn Monitor /tr C:\MyApps.bat /sc onlogon /ru Reskit\Administrator
```
该命令的结果是，每当用户登录到计算机，任务就启动“事件查看器”和“系统监视器”。

### 更改计划任务

更改一个或多个下列任务属性。

* 任务运行的程序 (/tr)。
* 任务运行的用户帐户 (/ru)。
* 用户帐户的密码 (/rp)。

语法
```cmd
schtasks /change /tn TaskName [/s computer [/u [domain\]user /p password]] [/tr TaskRun] [/ru [Domain\]User | "System"] [/rp Password]
```

|参数|含义|
|:---|:---|
|`/tn TaskName`| 标识要更改的任务。输入任务名|
|`/s Computer`| 指定远程计算机的名称或 IP 地址（带有或者没有反斜杠）。默认值是本地计算机|
|`/u [domain\]user`| 使用特定用户帐户的权限运行命令。默认情况下，使用已登录到运行 SchTasks 的计算机上的用户的权限运行命令|
| `/p password`| 指定在 /u 参数中指定的用户帐户的密码。如果使用 /u 参数，则需要该参数|
| `/tr TaskRun`| 更改任务运行的程序。输入可执行文件、脚本文件或批处理文件的完全合格的路径和文件名。如果忽略了路径，SchTasks.exe 假定文件在 Systemroot\System32 目录下指定的程序替换任务最初运行的程序|
| `/ru [Domain\]User "System"`| 更改用于任务的用户帐户。 [domain\]User  指定用户帐户"System" or " 指定为操作系统所使用的 NT Authority\System 帐户。在更改用户帐户的时候，必须也要更改用户密码。如果命令带有 /ru 参数，但没有 /rp 参数，SchTasks.exe 提示要求输入新的密码而且不显示键入的文本。任务以不需要密码的 NT Authority\System 帐户权限运行，SchTasks.exe 不会提示输入密码|
|`/p Password`| 更改用于任务的帐户密码。输入新的密码|
| `/?` |在命令提示符显示帮助|

注释

* XOX /tn 和 /s 参数标识该任务。/tr、/ru 和 /rp 参数指定可以更改的任务属性。
* 使用 change 操作的命令必须至少更改一个任务属性。
* NT Authority\System 帐户没有交互式登录权限。用户看不到以系统权限运行的程序，不能与其交互。

### 更改任务运行的程序

下面的命令将 Virus Check 任务运行的程序由 VirusCheck.exe 更改为 VirusCheck2.exe。此命令使用 /tn 参数标识任务，使用 /tr 参数指定任务的新程序。（不能更改任务名称。）

```cmd
schtasks /change /tn "Virus Check" /tr C:\VirusCheck2.exe
```
