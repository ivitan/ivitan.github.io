---
title: PySpider 马蜂窝网景点
date: 2018-11-06 15:27:09
tags:
- Python
- WebCrawler
categories:
- Coding
- Python
author:
  name: Vitan
toc: true
---
PySpider 马蜂窝景点信息
<!--more-->
# PySpider
```Python
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
# Created on 2018-11-06 11:52:31
# Project: PySpider_MaFengWo

from pyspider.libs.base_handler import *
import json
from pyspider.libs.utils import md5string
import re
from fake_useragent import UserAgent

default_headers = {
           'Accept':'application/json, text/javascript, */*; q=0.01',
           'Accept-Encoding':'gzip, deflate',
           'Accept-Language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
           'Connection':'keep-alive',
           'Content-Length':68,
           'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
           'Connection':'keep-alive',
           'Upgrade-Insecure-Requests':1,
           'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3100.0 Safari/537.36',
           'X-Requested-With':'XMLHttpRequest',
        }

class Handler(BaseHandler):
    crawl_config = {
        'headers':default_headers,
        'timeout':300,
        'proxy':'192.168.1.1:8080',
    }

    @every(minutes=24 * 60)
    def on_start(self):
        url = 'http://www.mafengwo.cn/jd/10088/gonglve.html'
        self.crawl(url,callback=self.get_index,fetch_type='js')

    def get_taskid(self, task):
        return md5string(task['url']+json.dumps(task['fetch'].get('data', '')))

    def get_index(self,response):
        url = 'http://www.mafengwo.cn/ajax/router.php'
        total = int(response.doc('.pi.pg-last').attr('data-page'))
        for i in range(1,total+1):
            data = {
                    'sAct':'KMdd_StructWebAjax|GetPoisByTag',
                    'iMddid':'10088',
                    ' iTagId':0,
                    'iPage':i
             }
            self.crawl(url,method='POST',data=data,callback=self.index_page)

    # 每一个回调detail_page的任务有效期是10天
    @config(age=10 * 24 * 60 * 60)
    def index_page(self, response):
        print(response.text)
        result = response.text.replace('\\','')
        print(result)
        pattern = re.compile('<a href="(.*?)" target=')
        urls = re.findall(pattern,result)
        for url in urls:
            mainurl = 'https://www.mafengwo.cn'
            self.crawl(mainurl + url, callback=self.detail_page,fetch_type='js')

    # 数字越大优先级越高
    @config(priority=2)
    def detail_page(self, response):
        return {
        "name": response.doc('h1').text(),
        "location":response.doc('.mhd > p').text(),
        "price":response.doc('.mod-detail dd > div').text(),
        "phone":response.doc('.tel > .content').text(),
        "visittime":response.doc('.item-time > .content').text(),
        "website":response.doc('.content > a').text(),

        }
```
