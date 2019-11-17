---
title: 安居客二手房
date: 2018-12-23 15:44:51
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
enable_unread_badge: true
thumbnail: /images/Python.png
---
Scrapy anjuke.com 广州二手房数据(保存为 csv)
<!--more-->
# Spiders
```python
    # -*- coding: utf-8 -*-
    from scrapy import Spider,Request
    from anjuke.items import AnjukeItem

    class AnjukehouseSpider(Spider):
        name = 'anjukeHouse'
        allowed_domains = ['anjuke.com']
        start_urls = ['https://guangzhou.anjuke.com/sale/p1-rd1/#filtersort']

        def parse(self, response):
            # 所有房子URL
            urls = response.xpath('//div[@class="house-title"]/a/@href').extract()
            for url in urls:
                yield Request(url,callback=self.parse_detail)

            # 下一页
            next = response.xpath('//*[@id="content"]/div[4]/div[7]/a[7]/@href').extract()
            if next:
                next = response.urljoin(next[0])
                yield Request(next,callback=self.parse)

        def parse_detail(self,response):
            item = AnjukeItem()
            item['date'] = response.xpath('//span[@class="house-encode"]/text()').extract()[0].split()
            item['tittle'] = response.xpath('//h3[@class="long-title"]/text()').extract()
            item['price'] = response.xpath('//span[@class="light info-tag"]/em/text()').extract_first().split()

            houseInfo = response.xpath('//div[@class="houseInfo-content"]/text()').extract()
            item['huxing'] = houseInfo[2].strip().replace("\n","").replace("\t","").split()
            item['area'] = houseInfo[7].strip().split()
            item['built'] = houseInfo[9].strip().replace("\n", "").replace("\t", "").split()
            item['chaoxiang'] = houseInfo[10].strip().split()
            item['leixing'] = houseInfo[-8].strip().split()
            item['louceng'] = houseInfo[-7].strip().split()
            item['zhuangxiu'] = houseInfo[-6].strip().split()
            print(item)
        return item
```

## items
```python
    from scrapy import Item,Field

    class AnjukeItem(Item):
        # define the fields for your item here like:
        # name = scrapy.Field()
        tittle = Field()
        huxing = Field()
        area = Field()
        chaoxiang = Field()
        louceng = Field()
        price = Field()
        zhuangxiu = Field()
        leixing = Field()
        date = Field()
        built = Field()
```

## settings
```python
    BOT_NAME = 'anjuke'

    SPIDER_MODULES = ['anjuke.spiders']
    NEWSPIDER_MODULE = 'anjuke.spiders'

    # Obey robots.txt rules
    ROBOTSTXT_OBEY = False

    DOWNLOAD_DELAY = 3

    DEFAULT_REQUEST_HEADERS = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en',
        'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'max-age=0',
    }

    ITEM_PIPELINES = {
    'anjuke.pipelines.Pipeline_ToCSV': 300,
    }
```

## pipelines
```python
    import csv
    import os

    class Pipeline_ToCSV(object):

        def __init__(self):
            self.csvwriter = csv.writer(open('anjuke.csv', 'w'), delimiter=',')
            self.csvwriter.writerow(['date','tittle', 'price', 'huxing', 'area','built','chaoxiang','leibie','loucheng','zhuangxiu'])

        def process_item(self, item, ampa):
            rows = zip(item['date'],item['tittle'], item['price'],item['huxing'],item['area'],item['built'],item['chaoxiang'],item['leixing'],item['louceng'],item['zhuangxiu'])

            for row in rows:
                self.csvwriter.writerow(row)

            return item
```

# Selenium
```python
    #!/usr/bin/env python
    # -*- coding: utf-8 -*-
    # @Time    : 18-12-28 下午6:48
    # @Author  : Vitan
    # @File    : anjuke.py

    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from bs4 import  BeautifulSoup
    import pandas
    import time,random

    broswer = webdriver.Chrome()
    wait = WebDriverWait(broswer,10)
    houseInfo = []
    def get_urls():
        page_urls = []
        star_url = 'https://guangzhou.anjuke.com/sale/p'
        for i in range(1,51):
            url = star_url+str(i)
            page_urls.append(url)
        return page_urls

    def HouseUrl(url):
        time.sleep(random.random()*10)
        broswer.get(url)
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.curr')))
        urls = broswer.find_elements_by_css_selector('.houseListTitle') # a 标签
        house_urls = []
        for a in urls:
            urls = a.get_attribute('href')
            house_urls.append(urls)
        return house_urls

    def get_detail(url):
        time.sleep(random.random()*10)
        broswer.get(url)
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.houseInfoBox')))
        info = {}
        # info['标题'] = broswer.find_element_by_css_selector('.long-title').get_attribute('textContent')
        # info['总价'] = broswer.find_elements_by_css_selector('.basic-info span')[0].get_attribute('textContent')
        # info['户型'] = broswer.find_elements_by_css_selector('.basic-info span')[1].get_attribute('textContent')
        # info['面积'] = broswer.find_elements_by_css_selector('.basic-info span')[2].get_attribute('textContent')
        # info['单价'] = broswer.find_elements_by_css_selector('.houseInfo-content')[2].get_attribute('textContent')
        # info['朝向'] = broswer.find_elements_by_css_selector('.houseInfo-content')[7].get_attribute('textContent')
        # info['月供'] = broswer.find_elements_by_css_selector('.houseInfo-content')[8].get_attribute('textContent')
        # info['楼层'] = broswer.find_elements_by_css_selector('.houseInfo-content')[-7].get_attribute('textContent')
        # info['装修'] = broswer.find_elements_by_css_selector('.houseInfo-content')[-6].get_attribute('textContent')
        html = broswer.page_source
        soup = BeautifulSoup(html,'lxml')
        info['标题'] = soup.select('.long-title')[0].text
        info['总价'] = soup.select('.basic-info span')[0].text
        info['户型'] = soup.select('.basic-info span')[1].text
        info['面积'] = soup.select('.basic-info span')[2].text
        info['单价'] = soup.select('.houseInfo-content')[2].text
        info['朝向'] = soup.select('.houseInfo-content')[7].text
        info['月供'] = soup.select('.houseInfo-content')[8].text
        info['楼层'] = soup.select('.houseInfo-content')[-7].text
        info['装修'] = soup.select('.houseInfo-content')[-6].text
        k = ['标题','总价','户型','面积','单价','朝向','月供','楼层','装修']
        info_adj = dict(zip(k,list(info.values())))
        houseInfo.append(info_adj)
        print(houseInfo)
        return houseInfo

    def save_to_csv(houseInfo):
        df = pandas.DataFrame(houseInfo)
        df.to_csv('maoming.csv')

    def main():
        page_urls = get_urls()
        for url in page_urls:
            house_urls = HouseUrl(url)
            for url in house_urls:
                houseInfo=get_detail(url)
                save_to_csv(houseInfo)

    if __name__ == '__main__':
        main()
```
