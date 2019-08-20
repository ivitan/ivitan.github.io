---
title: 解决 Win10 与 Linux 时间不一致
date: 2018-08-03 10:03:49
tags:
  - Linux
  - ArchLinux
  - Ubuntu
  - Win
categories:
  - notes
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Note.png
---
解决 Win10 与 Linux 时间不一致
<!--more-->
# 原因
## UTC 与 GMT
1. UTC即Universal Time Coordinated，协调世界时（世界统一时间）
2. GMT 即Greenwich Mean Time，格林尼治平时

## 原因
- Windows 把计算机硬件时间当作本地时间(local time)，所以在Windows系统中显示的时间跟BIOS中显示的时间是一样的。
- Linux/Unix/Mac把计算机硬件时间当作 UTC， 所以在Linux/Unix/Mac系统启动后在该时间的基础上，加上电脑设置的时区数（ 比如我们在中国，它就加上“8” ），因此，Linux/Unix/Mac系统中显示的时间总是比Windows系统中显示的时间快8个小时。
- 所以，当你在Linux/Unix/Mac系统中，把系统现实的时间设置正确后，其实计算机硬件时间是在这个时间上减去8小时，所以当你切换成Windows系统后，会发现时间慢了8小时。就是这样个原因。

# 解决方法
## 方法一
- 把 Linux 计算机硬件时间改成系统显示的时间，即禁用 UTC
```sh
timedatectl set-local-rtc 1 --adjust-system-clock
```

## 方法二
- 修改 Windows 对硬件时间的对待方式，让 Windows把硬件时间当作 UTC.
```sh
Reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```
---
**Via**
- [滑稽](https://www.zhihu.com/question/46525639)
