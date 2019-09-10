---
title: Python 时间日期处理
date: 2018-10-22 14:40:50
tags:
    - Python
    - WebCrawler
    - Note
categories:
  - notes
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Python.png
---
Python DateTime 时间日期处理.
<!--more-->
# DateTime
## 获取当前 DateTime
```Python
from datetime timport datetime
datetime.datetime.now()
```

## 获取当天 date
```Python
datetime.date.today()
```

## 获取明天/前N天
```Python
# 明天
atetime.date.today() + datetime.timedelta(days=1)
# 前N天
datetime.datetime.now()
datetime.datetime.now() - datetime.timedelta(days=3)
```

## 获取当天开始和结束时间
```Python
datetime.datetime.combine(datetime.date.today(), datetime.time.min)
datetime.datetime.combine(datetime.date.today(), datetime.time.max)
```

## 获取两个 datetime 的时间差
```Python
now = datetime.now()
end = datetime.strptime('2018-10-25 22:00','%Y-%m-%d %H:%M')
time = end - now
print(time.days,'天')
```
## 获取本周/本月/上月最后一天

- 本周最后一天

```Python
import datetime
today = datetime.date.today()
sunday = today + datetime.timedelta(6 - today.weekday())
sunday
```

- 本月最后一天

```Python
import calendar
today = datetime.date.today()
last_day_num = calendar.monthrange(today.year, today.month)
last_day = datetime.date(today.year, today.month, last_day_num)
last_day
```

- 上月最后一天

```Python
import datetime
today = datetime.date.today()
first = datetime.date(day=1, month=today.month, year=today.year)
lastMonth = first - datetime.timedelta(days=1)
```
# 转换
## datetime <=> string

- datetime -> string

```Python
import datetime
datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
```

- string -> datetime

```Python
import datetime
datetime.datetime.strptime("2018-10-22 12:50:46", "%Y-%m-%d %H:%M:%S")
```

## datetime <=> timetuple

- datetime -> timetuple

```Python
import datetime
datetime.datetime.now().timetuple()
```

- timetuple -> datetime

```Python
timetuple => timestamp => datetime [看后面datetime<=>timestamp]
```

## datetime <=> date

- datetime -> date

```Python
import datetime
datetime.datetime.now().date()
```

- date -> datetime

```Python
datetime.date.today()
today = datetime.date.today()
datetime.datetime.combine(today, datetime.time())
datetime.datetime.combine(today, datetime.time.min)
```
## datetime <=> timestamp

- datetime -> timestamp

```Python
now = datetime.datetime.now()
timestamp = time.mktime(now.timetuple())
timestamp
```
## timestamp -> datetime
````Python
datetime.datetime.fromtimestamp(1421077403.0)
```

---
**Via**
- [PYTHON-基础-时间日期处理小结](http://www.wklken.me/posts/2015/03/03/python-base-datetime.html)
