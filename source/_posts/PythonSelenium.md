---
title: Python Selenium
date: 2018-10-17 15:24:49
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
Python Selenium 基础使用。
<!--more-->
# 基本使用
```Python
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.keys import Keys
    from selenium.webdriver.support import expected_conditions as EC
    from selenium.webdriver.support.wait import WebDriverWait

    #创建Chrome浏览器对象browser
    browser = webdriver.Chrome()
    try:
        #用get方式访问百度首页
        browser.get('https://www.baidu.com')
        #通过id为‘kw’找到输入框input
        input = browser.find_element_by_id('kw')
        #调用该输入框的send_keys方法向输入框键入“Python”关键词
        input.send_keys('Python')
        #高用该输入框的send_keys方法向输入框按回车键
        input.send_keys(Keys.ENTER)
        #创建浏览器等待对象wait,等待时间10称
        wait = WebDriverWait(browser,10)
        #调用wait的until方法，直到ID为content_left（即搜索结果界面）元素出现
        wait.until(EC.presence_of_element_located((By.ID, 'content_left')))
        #打印输出浏览器当前的URL
        print(browser.current_url)
        #打印输出当前的cookies信息
        print(browser.get_cookies)
        #打印输出网页源代码
        print(browser.page_source)
    finally:
        #关闭浏览器
        browser.close()
```

## 声明浏览器对象
```Python
    from selenium import webdriver

    browser = webdriver.Chrome()
    browser = webdriver.Firefox()
    browser = webdriver.Edge()
    browser = webdriver.PhantomJS()
    browser = webdriver.Safari()
```

## 访问页面
```Python
    from selenium import webdriver

    #创建Chrome浏览器对象
    browser = webdriver.Chrome()
    #访问淘宝首页
    browser.get('https://taobao.com')
    #打印输出网页源代码
    print(browser.page_source)
    #关闭浏览器
    browser.close()
```

# 查找元素
## 单个
```Python
    from selenium import webdriver

    #创建Chrome浏览器对象
    browser = webdriver.Chrome()
    #访问淘宝首页
    browser.get('https://www.taobao.com')
    #通过id属性查找id为q的元素,即为搜索输入框,命名为input_first
    input_first = browser.find_element_by_id('q')
    #通过css选择器查找搜索输入框,命名为input_second
    input_second = browser.find_element_by_css_selector('#q')
    #通过xpath查找搜索输入框，命名为input_third
    input_third = browser.find_element_by_xpath('//*[@id="q"]')
    #打印输出以上三个查找结果
    print(input_first,input_second,input_third)
    #关闭浏览器
    browser.close()
```
```Python
    from selenium import webdriver
    from selenium.webdriver.common.by import By

    browser = webdriver.Chrome()
    browser.get('https://www.taobao.com')
    input_first = browser.find_element(By.ID, 'q')
    print(input_first)
    browser.close()
```

## 多个元素
```Python
    from selenium import webdriver

    #创建Chrome浏览器对象 browser
    browser = webdriver.Chrome()
    #get方式访问淘宝首页
    browser.get('https://www.taobao.com')
    #(多个元素用elements，须借助css_selector)查找淘宝首页左边导航条下面的class为service-bd的ul标签下面的名为li的多个标签
    lis = browser.find_elements_by_css_selector('.service-bd')
    #打印输出所有lis元素
    print(lis)
    #关闭浏览器
    browser.close()
```
```Python
    from selenium import webdriver
    from selenium.webdriver.common.by import By

    browser = webdriver.Chrome()
    browser.get('https://www.taobao.com')
    lis = browser.find_elements(By.CSS_SELECTOR, '.service-bd li')#作用同上
    print(lis)
    browser.close()
```

# 元素交互操作
## 对获取的元素调用交互方法
```Python
    from selenium import webdriver
    import time

    #创建chrome浏览器对象
    browser = webdriver.Chrome()
    #访问淘宝首页
    browser.get('https://www.taobao.com')
    #查找id为q的搜索输入框input
    input = browser.find_element_by_id('q')
    #调用input的send_keys函数向输入框输入关键字“OnePLus”
    input.send_keys('OnePlus')
    #当前浏览器暂停1S
    time.sleep(1)
    #清除输入框的内容
    input.clear()
    #调用input的send_keys再次输入 一加
    input.send_keys('一加')
    #查找class为btn-search的搜索按钮并命名为button 用find_element_by_class_name
    button = browser.find_element_by_class_name('btn-search')
    #调用click点击该按钮
    button.click()
```
- [更多操作](http://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.remote.webelement)

# 交互动作
## 将动作附加到动作链中串行执行
```python
    from selenium import webdriver
    from selenium.webdriver import ActionChains

    #创建chrome浏览器对象browser
    browser = webdriver.Chrome()
    #设置url为http://www.runoob.com/try/try.php?filename=jqueryui-api-droppable
    url = 'http://www.runoob.com/try/try.php?filename=jqueryui-api-droppable'
    #用get方式访问以上url
    browser.get(url)
    #在浏览器中切换定位到名为iframeResult的frame元素
    browser.switch_to.frame('iframeResult')
    #通过css选择器查找id为draggable的拖曳源，并命名为source
    source = browser.find_element_by_css_selector('#draggable')
    #通过css选择器查找id为droppable的代入源，并命名为target
    target = browser.find_element_by_css_selector('#droppable')
    #用ActionChains函数创建浏览器动作链对象actions
    actions = ActionChains(browser)
    #调用actions的drag_and_drop,设计将source放入target的动作
    actions.drag_and_drop(source,target)
    #调用perform执行该动作
    actions.perform()
    #关闭浏览器
    browser.close()
```
- [更多操作](http://selenium-python.readthedocs.io/api.html#module-selenium.webdriver.common.action_chains)

## 执行 JavaScript
```python
    from selenium import webdriver

    #创建chrome()浏览器对象browser
    browser = webdriver.Chrome()
    #get方式访问https://www.zhihu.com/explore网页
    browser.get('https://www.zhihu.com/explore')
    #利用execute_script执行js语句window.scrollTo(0, document.body.scrollHeight)
    browser.execute_script('window.scrollTo(0, document.body.scrollHeight)')
    ##利用execute_script执行js语句alert("To Bottom")警报信息,注意，execute_script('')里面的js加引号
    browser.execute_script('alert("To Bottom")')
```

# 获取元素信息
## 获取属性
```python
    from selenium import webdriver
    from selenium.webdriver import ActionChains

    #创建Chrome浏览器对象browser
    browser = webdriver.Chrome()
    #设置url为https://www.zhihu.com/explore
    url = 'https://www.zhihu.com/explore'
    #get方式访问以上网址
    browser.get(url)
    #查找id为zh-top-link-logo的元素并命名为logo(知乎logo)
    logo = browser.find_element_by_id('zh-top-link-logo')
    #打印输出此logo
    print(logo)
    #打印输出：用logo的get_attribute函数获得logo的class属性值
    print(logo.get_attribute('class'))
```

## 获取文本值

- 获取指定节点中的文本内容

```python
driver.find_element_by_xpath('').get_attribute('textContent') 
```

- 获取a的href(多个则遍历)

```python
broswer.find_element_by_css_selector('.houseListTitle a').get_attribute('href')
```

- 输入框的文本

```python
from selenium import webdriver

browser = webdriver.Chrome()
url = 'https://www.zhihu.com/explore'
browser.get(url)
#利用by_class_name查找class属性值为zu-top-add-question的输入框input
input = browser.find_element_by_class_name('zu-top-add-question')
#输出打印该输入框的文本（text）
print(input.text)
```

## 获取ID、位置、标签名、大小
```python
    from selenium import webdriver

    browser = webdriver.Chrome()
    #设置url为https://www.zhihu.com/explore
    url = 'https://www.zhihu.com/explore'
    #用get方式访问以上网址
    browser.get(url)
    #查找class属性值为zu-top-add-question的输入框input
    input = browser.find_element_by_class_name('zu-top-add-question')
    #打印输出input的id
    print(input.id)
    #打印输出input的位置location
    print(input.location)
    #打印输出input的标签名tag_name
    print(input.tag_name)
    #打印输出input的对象几何大小size
    print(input.size)
```
## Frame
```python
    import time
    from selenium import webdriver
    from selenium.common.exceptions import NoSuchElementException

    browser = webdriver.Chrome()
    url = 'http://www.runoob.com/try/try.php?filename=jqueryui-api-droppable'
    browser.get(url)
    browser.switch_to.frame('iframeResult')
    source = browser.find_element_by_css_selector('#draggable')
    print(source)
    try:
        logo = browser.find_element_by_class_name('logo')
    except NoSuchElementException:
        print('NO LOGO')
    browser.switch_to.parent_frame()
    logo = browser.find_element_by_class_name('logo')
    print(logo)
    print(logo.text)
```
# 等待
## 隐式等待
- 当使用了隐式等待执行测试的时候，如果 WebDriver 没有在 DOM 中找到元素，将继续等待，超出设定时间后则抛出找不到元素的异常, 换句话说，当查找元素或元素并没有立即出现的时候，隐式等待将等待一段时间再查找 DOM，默认的时间是 0

```python
    from selenium import webdriver

    browser = webdriver.Chrome()
    #利用implicitly_wait进行隐式等待，等待时间设置为10S
    browser.implicitly_wait(10)
    browser.get('https://www.zhihu.com/explore')
    input = browser.find_element_by_class_name('zu-top-add-question')
    print(input)
```

## 显式等待
- 显示等待则打指定等待不固定，具体时间受指定的元素出现或其他条件实现的时间限制

```python
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    ​
    #创建浏览器对象
    browser = webdriver.Chrome()
    #利用get方式访问淘宝首页
    browser.get('https://www.taobao.com')
    #创建浏览器等待对象wait，默认为10秒
    wait = WebDriverWait(browser,10)
    #创建input对象，利用wait.until函数直到id为q的元素加载完后,注意By.ID参数双括号
    input = wait.until(EC.presence_of_element_located((By.ID, 'q')))
    #创建button对象，利用wait.until直到class为btn-search
    button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '.btn-search')))
    #打印输出input,button
    print(input,button)
```

# 前进后退
```python
    import time
    from selenium import webdriver

    browser = webdriver.Chrome()
    #访问百度
    browser.get('https://www.baidu.com')
    #访问淘宝
    browser.get('https://www.taobao.com')
    #访问python主页https://www.python.org/(被GWF铁拳重创，故改为qq.com)
    browser.get('https://www.qq.com')
    #调用浏览器的back函数执行返回。问：返回到哪一个网页？
    browser.back()
    #当前休眠3s
    time.sleep(3)
    #浏览器前进。问，前进到哪一网页？
    browser.forward()
    #关闭浏览器
    browser.close()
```
# Cookies
```python
    from selenium import webdriver
    ​
    browser = webdriver.Chrome()
    browser.get('https://www.zhihu.com/explore')
    #get_cookies获取cookies并输出打印
    print(browser.get_cookies())
    print('------------------------------------------------------------------------------------------------------')
    #add_cookie（注意此cookie单词没有s）增加cookies{'name': 'name', 'domain': 'www.zhihu.com', 'value': 'germey'}
    browser.add_cookie({'name': 'name', 'domain': 'www.zhihu.com', 'value': 'germey'})
    #重新获取cookies并输出打印
    print(browser.get_cookies())
    print('------------------------------------------------------------------------------------------------------')
    #delete_all_cookies删除所有cookies
    browser.delete_all_cookies()
    #重新获取cookies并输出打印
    print(browser.get_cookies())
```

# 选项卡管理
```python
    import time
    from selenium import webdriver

    #创建浏览器对象
    browser = webdriver.Chrome()
    #访问淘宝
    browser.get('https://www.taobao.com')
    #打开新的选项卡（执行js语句 execute_script（'window.open()')
    browser.execute_script('window.open()')
    #打印输出当前浏览器对象browser.window_handles
    print(browser.window_handles)
    #切换到第2个选项卡,下标为1
    browser.switch_to.window(browser.window_handles[1])
    #访问 百度
    browser.get('https://www.baidu.com')
    #休眠1s
    time.sleep(1)
    #切换到第1个选项卡，下标为0
    browser.switch_to.window(browser.window_handles[0])
    #访问百度
    browser.get('https://www.vitan.me')
```

# 异常处理
## 未处理
```python
from selenium import webdriver
    ​
browser = webdriver.Chrome()
browser.get('https://www.baidu.com')
browser.find_element_by_id('hello')
```

## 处理后
```python
from selenium import webdriver
from selenium.common.exceptions import TimeoutException, NoSuchElementException

browser = webdriver.Chrome()
try:
    browser.get('https://www.baidu.com')
except TimeoutException:
    print('Time Out')
try:
    browser.find_element_by_id('hello')
except NoSuchElementException:
    print('No Element')
finally:
    browser.close()
```