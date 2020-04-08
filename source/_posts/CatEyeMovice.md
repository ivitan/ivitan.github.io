---
title: 猫眼电影 Top100
date: 2018-10-23 13:09:38
tags:
  - WebCrawler
  - Python
  - Note
categories:
  - Coding
author:
  name: Vitan
toc: true
---
猫眼电影 Top100
<!--more-->
# 思路
1. 获取单页网页源代码并返回源代码
2. 解析单页网页源代码，提取 title、actor、time、score 等数据并存储为生成器
3. 将生成器里每一部电影的数据写入txt文档中
4. 研究第 1-10 页 url 的规律，构建 url，调用 1、2、3 步骤


# 步骤
获取单页网页源代码并返回源代码
```Python
    import requests
    import re
    import json
    from requests.exceptions import RequestException

    def get_one_page(url):
        headers = {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36'}
        try:
            response = requests.get(url,headers = headers)
            if response.status_code == 200:
                html = response.text
                return html
            return None
        except RequestException:
            return None
```

- 打印第一页源码

```Python
print(get_one_page('http://maoyan.com/board/4'))
```

解析单页网页源代码，提取title、actor、time、score数据并存储为生成器
```Python
    def parse_one_page(html):
        pattern = re.compile('<dd>.*?board-index.*?>(\d+)</i>'
        + '.*?<p.*?title="(.*?)".*?</p>.*?star">(.*?)</p>'
        + '.*?releasetime">(.*?)</p>.*?integer">(.*?)'
        + '<.*?fraction">(.*?)</i>',re.S)
        movies = re.findall(pattern,html)
        for item in movies:
            yield{
                '排名':item[0],
                '电影名':item[1],
                '主演':item[2].strip()[3:],
                '上映时间':item[3][5:],
                '评分':item[4]+item[5]
            }
```

> 注意一下，这里需要用 yield，而不是return。yield函数返回的是一个生成器（一种特殊的迭代器，可以用for循环进行遍历）
> 如果用return，那么在第一轮循环结束就会跳出，只能获取到一部影片的信息

将生成器数据写入 txt 文档
```Python
    def write_to_txt(content):
        # 采用 append 追加模式，字符集为utf8
        with open('movies.txt','a',encoding='utf8') as f:
            # 采用json的dumps方法来初始化字符串
            f.write(json.dumps(content,ensure_ascii=False) + '\n')
            f.close()
```

研究第1-10页
```Python
    # 第1-10页url
    for i in range(0,10):
        url = 'https://maoyan.com/board/4?offset=' + str(i * 10)
        # 构建 url，调用1、2、3步骤
        html = get_one_page(url)
        movies= parse_one_page(html)
        for item in movies:
            write_to_txt(item)
```

## 多线程保持为 txt
- 第一步

```Python
    import requests
    import re
    import json
    from multiprocessing import Pool
    from requests.exceptions import RequestException

    def get_one_page(url):
        headers = {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36'}
        try:
            response = requests.get(url,headers = headers)
            if response.status_code == 200:
                html = response.text
                return html
            return None
        except RequestException:
            return None
```

- 第二步

```Python
    def main(offset):
        url = 'http://maoyan.com/board/4?offset=' + str(offset)
        html = get_one_page(url)
        for item in parse_one_page(html):
            print(item)
            write_to_txt(item)

    if __name__ == '__main__':
        pool = Pool() # 多线程
        pool.map(main, [i*10 for i in range(10)])
        pool.close()
        pool.join()
```

# 保持为 CSV
## 单线程
```Python
    import requests
    import re
    import json
    import pandas
    from requests.exceptions import RequestException

    def get_one_page(url):
        headers = {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36'}
        response = requests.get(url,headers = headers)
        html = response.text
        return html

    def parse_one_page(html):
        pageary = []
        pattern = re.compile('<dd>.*?board-index.*?>(\d+)</i>'
        + '.*?<p.*?title="(.*?)".*?</p>.*?star">(.*?)</p>'
        + '.*?releasetime">(.*?)</p>.*?integer">(.*?)'
        + '<.*?fraction">(.*?)</i>',re.S)
        movies = re.findall(pattern,html)
        for item in movies:
            dict = {
                '电影名':item[0],
                '主演':item[1].strip()[3:],
                '上映时间':item[2][5:],
                '评分':item[3]+item[4]
            }
            pageary.append(dict)
        return pageary

    ary = []
    for i in range(0,10):
        url = 'https://maoyan.com/board/4?offset=' + str(i * 10)
        html = get_one_page(url)
        pageary = parse_one_page(html)
        ary = ary + pageary
    df = pandas.DataFrame(ary)
    df.to_csv('movies.csv')
```

## 多线程
```Python
    import requests
    import re
    import json
    import pandas
    from multiprocessing import Pool
    from requests.exceptions import RequestException

    def get_one_page(url):
        headers = {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36'}
        try:
            response = requests.get(url,headers = headers)
            if response.status_code == 200:
                html = response.text
                return html
            return None
        except RequestException:
            return None

    def parse_one_page(html):
        pageary = []
        pattern = re.compile('<dd>.*?board-index.*?>(\d+)</i>'
        + '.*?<p.*?title="(.*?)".*?</p>.*?star">(.*?)</p>'
        + '.*?releasetime">(.*?)</p>.*?integer">(.*?)'
        + '<.*?fraction">(.*?)</i>',re.S)
        movies = re.findall(pattern,html)
        for item in movies:
            dict = {
                '排名':item[0],
                '电影名':item[1],
                '主演':item[2].strip()[3:],
                '上映时间':item[3][5:],
                '评分':item[4]+item[5]
            }
            pageary.append(dict)
        return pageary

    def write_to_csv(pageary):
        ary = []
        ary = ary + pageary
        df = pandas.DataFrame(ary)
        df.to_csv('movies.csv')

    def main(offset):
        url = 'https://maoyan.com/board/4?offset=' + str(offset)
        pageary = parse_one_page(html)
        write_to_csv(ary)

    if __name__ == '__main__':
        pool = Pool()
        pool.map(main, [i*10 for i in range(10)])
        pool.close()
        pool.join()
```
