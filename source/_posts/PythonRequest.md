---
title: Python Request 库基础使用
date: 2018-09-19 19:12:44
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
Python Request 
<!--more-->
# 实例引入
```Python
import requests

response = requests.get('https://www.baidu.com/')
print(type(response))
print(response.status_code)
print(type(response.text))
print(response.text)
print(response.cookies)
```

## 各种请求方式
```Python
import requests
requests.post('http://httpbin.org/post')
equests.put('http://httpbin.org/put')
requests.delete('http://httpbin.org/delete')
requests.head('http://httpbin.org/get')
requests.options('http://httpbin.org/get')
```

# 请求
## 基本 GET 请求
```py
import requests

response=requests.get('http://httpbin.org/get')
#用get方式访问http://httpbin.org/get网页
print(response.text)
#输出网页源代码
```

## 带参数 GET 请求

- ?

```Python
import requests
response=requests.get('http://httpbin.org/get?name=germey&age=22')
#以?name=germey&age=22方式在url后面添加参数信息
print(response.text)
#输出网页源代码
```

- params

```python
import requests
response=requests.get('http://httpbin.org/get',params={'name':'germery','age':22})
#设置 params 参数，以key:value方式{'name':''germery','age':22}
print(response.text)
#输出网页源代码
```

## 添加headers
```Python
import requests

headers={'User-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36'}
#设置headers变量为本机浏览器请求头的user-agent
response=requests.get('https://www.zhihu.com/explore',headers=headers)
#添加headers信息访问https://www.zhihu.com/explore
response.text
#输出网页源代码
```

## 基本POST请求
```Python
import requests

data={'name': 'germey', 'age': '22'}#设置data变量值为：{'name': 'germey', 'age': '22'}
response=requests.post('http://httpbin.org/post',data=data)
#以post方式，data=data访问http://httpbin.org/post
print(response.text)
#输出网页源代码
```

```Python
import requests

data={'name': 'germey', 'age': '22'}#设置data变量值为：{'name': 'germey', 'age': '22'}
headers={'User-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36'}
#设置headers变量为本机浏览器请求头的user-agent
#设置headers
response=requests.post('http://httpbin.org/post',headers=headers,data=data)
#添加data/headers信息以post方式访问http://httpbin.org/post
response.json()
#输出访问结果的json格式数据
```

# 响应
## reponse 属性
```Python
import requests

response = requests.get('http://www.jianshu.com')
print(type(response.status_code), response.status_code)
print(type(response.headers), response.headers)
print(type(response.cookies), response.cookies)
print(type(response.url), response.url)
```

## 状态码判断
```Python
import requests
response = requests.get('http://www.jianshu.com')
#用get方式访问简书网站http://www.jianshu.com
response.status_code

exit() if not response.status_code==200 else print('Request Successfully')
#对响应体状态码进行判断，如果返回状态码不为200，则结束当前运行，否则打印输出“Request Successfully”
```

# 高级操作
## 文件上传
```Python
import requests

files={'files':open('favicon.ico','rb')}
#设置files变量，其value值为操作系统open接口类型，对名为“favicon.ico”图片的二进制模式读取
response=requests.post('http://httpbin.org/post',files=files)
#以post方式上传该图片，即添加files=files参数
print(response.text)
#输出网页源代码
```

## 获取 cookie
```Python
import requests

response=requests.get('http://www.baidu.com/')
#get方式请求访问baidu
response.cookies
#输出cookies信息
for key,value in response.cookies.items():
#遍历所有cookies信息，以key=value形式输出
print(key+'='+value)
```

## 会话维持
### 模拟登录
```Python
import requests

requests.get('http://httpbin.org/cookies/set/number/123456789')
#用requests.get访问http://httpbin.org/cookies/set/number/123456789设置cookies信息
response=requests.get('http://httpbin.org/cookies')
#访问http://httpbin.org/cookies并将返回结果命名为response
response.cookies.items()
#输出以上response结果的网页源代码
#观察运行结果，思考为什么没法获取number：123456789的cookies数据？
```

- requests.Session()

```Python
import requests

s=requests.Session()
#利用requests创建一个Session对象s
s.get('http://httpbin.org/cookies/set/number/123456789')
#s调用get方法访问http://httpbin.org/cookies/set/number/123456789
response=s.get('http://httpbin.org/cookies')
#s调用get方法访问http://httpbin.org/cookies并将返回结果设置为response
print(response.text)
#输出网页源代码
 ```

## 证书验证
```Python
    import requests
    from requests.packages import urllib3
    urllib3.disable_warnings()
    #调用urllib3的disable_warnings
    response = requests.get('https://www.12306.cn',verify=False)
    #get方式访问https://www.12306.cn，verify设置为False
    print(response.status_code)
    #输出状态码
```

## 超时设置
```Python
    import requests
    from requests.exceptions import Timeout
    # from requests.exceptions import Timeout #导入异常包里的exceptions里面的ConnectTimeout

    try :
    #增加异常检测try exception,捕获异常后输出对应的异常类名
    response = requests.get('https://vitan.me',timeout=0.2)
    #尝试将timeou设置为0.2，是否会出现错误，并查看是什么异常
    print(response.status_code)

    except Timeout:
    #增加except语句，引入Timeout类
    print('TimeOut')
    #一旦捕获，输出显示Timeout信息
```
- [查看requests下的exceptions官方文档的网址](http://docs.python-requests.org/en/master/api/#exceptions)

## 认证设置
```python
    import requests
    r = requests.post('http://www.scholat.com', auth=('user','123456'))
    #利用post方式模拟登陆学者网（http://www.scholat.com），auth参数用户名为你在该网站的用户名与密码
    print(r.status_code)
    #输出显示响应状态码
```

## 异常处理
```python
    import requests
    from requests.exceptions import ReadTimeout, ConnectionError, RequestException#引入requests.exceptions下面的ReadTimeout, ConnectionError, RequestException类
    try:
    response = requests.get("http://httpbin.org/get", timeout = 0.02)
    print(response.status_code)
    except TimeoutError:
    #访问超时的异常类ReadTimeout 子类
    print('Timeout')
    except ConnectionError:
    print('Connection error')
    #网络不通时的异常类：ConnectionError尝试关闭网络，重新运行代码 父类
    except RequestException:
    print('Error')
```

# 解析 Json
## 基本
```Python
    import requests
    import json

    response=requests.get('http://httpbin.org/get')#get方式访问http://httpbin.org/get
    print(response.text)
    #输出网页源代码
    response.json
    #以json（dict数据结构）输出数据
    json.loads(response.text)
    #以json.loads函数输出json（dict数据结构）格式数据
    print(response.json())
    #打印输出response.json()返回结果的数据类型
```
