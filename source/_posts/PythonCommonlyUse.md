---
title: 常用实现
date: 2019-01-23 20:45:35
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
常用实现
<!--more-->
## 九九乘法表
```python
	for i in range(1, 10):
    for j in range(1, i+1):
        print('{}x{}={}\t'.format(j, i, i*j), end='')
    print()
```

# 列出目录文件
- 路径下的所有文件和文件夹的路径
```pytyon
    path = '~/path'
    for i in os.listdir(path):
        print(os.path.join(path,i))
```

- 读取路径下的文本
```python
    def txt_processing(folder_path):
    folder_list = os.listdir(folder_path)

    # 遍历文件夹
    for folder in folder_list:
        new_folder_path = os.path.join(folder_path,folder) # 拼接路径
        files = os.listdir(new_folder_path) # 258/分类

        for file in files:
            # if j > 1000000000000000: # 要读的每个分类的文件个数
            #     break
            if not os.path.isdir(file):  # 判断是否是文件夹，不是文件夹才打开
                TxtPath = os.path.join(new_folder_path, file)
                with open(TxtPath,'r',encoding='UTF-8') as fp:
                    Txt = fp.read()
```
- 输出以 xxx 为后缀的文件
```python
    for i in os.listdir(filepath):
        path = os.path.join(fillepath,i)
    if path.endswith('.xxx'):
        print(path)
```

# 判断奇偶数
```python
    number = int(input('输入数字:'))
    if (num % 2 ) == 0:
        print('{}：是偶数'.format(number))
    else:
        print('{}：是奇数'.format(number))
```

# 字符串判断
```python
    str = "runoob.com"
    print(str.isalnum()) # 判断所有字符都是数字或者字母
    print(str.isalpha()) # 判断所有字符都是字母
    print(str.isdigit()) # 判断所有字符都是数字
    print(str.islower()) # 判断所有字符都是小写
    print(str.isupper()) # 判断所有字符都是大写
    print(str.istitle()) # 判断所有单词都是首字母大写，像标题
    print(str.isspace()) # 判断所有字符都是空白字符、\t、\n、\r
```

# 字符串到小写转换
```python
    str = 'vitan.me'
    # 把所有字符中的小写字母转换成大写字母
    print(str.upper())         
    # 把所有字符中的大写字母转换成小写字母
    print(str.lower())      
    # 把第一个字母转化为大写字母，其余小写
    print(str.capitalize())  
    # 把每个单词的第一个字母转化为大写，其余小写 
    print(str.title())     
```     
