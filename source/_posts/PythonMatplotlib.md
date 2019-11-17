---
title: Python Matplotlib 各种图
date: 2018-11-08 10:11:00
tags:
- Python
- Note
- WebCrawler
categories:
- Coding
- Python
author:
name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Python.png
---
Matplotlib 各种图
<!--more-->

# 垂直条形图
```Python
    # 导入绘图模块
    import matplotlib.pyplot as plt
    # 构建数据
    GDP = [12406.8,13908.57,9386.87,9143.64]

    # 中文乱码的处理
    plt.rcParams['font.sans-serif'] =['SimHei']
    plt.rcParams['axes.unicode_minus'] = False

    # 绘图
    plt.bar(range(4), GDP, align = 'center',color='steelblue', alpha = 0.8)
    # 添加轴标签
    plt.ylabel('GDP')
    # 添加标题
    plt.title('四个直辖市GDP大比拼')
    # 添加刻度标签
    plt.xticks(range(4),['北京市','上海市','天津市','重庆市'])
    # 设置Y轴的刻度范围
    plt.ylim([5000,15000])

    # 为每个条形图添加数值标签
    for x,y in enumerate(GDP):
        plt.text(x,y+100,'%s' %round(y,1),ha='center')
    plt.savefig('垂直条形图.png')
    # 显示图形
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0j1550lxj20c0080jre.jpg)

- 解析
    1. 由于matplotlib对中文的支持并不是很友好，所以需要提前对绘图进行字体的设置，即通过rcParams来设置字体，这里将字体设置为微软雅黑，同时为了避免坐标轴不能正常的显示负号，也需要进行设置；
    2. bar 函数指定了条形图的x轴、y轴值，设置x轴刻度标签为水平居中，条形图的填充色color为铁蓝色，同时设置透明度alpha为0.8；
    3. 添加y轴标签、标题、x轴刻度标签值，为了让条形图显示各柱体之间的差异，将y轴范围设置在5000~15000；
    4. 通过循环的方式，添加条形图的数值标签；

# 水平条形图
```Python
    # 导入绘图模块
    import matplotlib.pyplot as plt
    # 构建数据
    price = [39.5,39.9,45.4,38.9,33.34]

    # 中文乱码的处理
    plt.rcParams['font.sans-serif'] =['SimHei']
    plt.rcParams['axes.unicode_minus'] = False

    # 绘图
    plt.barh(range(5), price, align = 'center',color='steelblue', alpha = 0.8)
    # 添加轴标签
    plt.xlabel('价格')
    # 添加标题
    plt.title('不同平台书的最低价比较')
    # 添加刻度标签
    plt.yticks(range(5),['亚马逊','当当网','中国图书网','京东','天猫'])
    # 设置Y轴的刻度范围
    plt.xlim([32,47])

    # 为每个条形图添加数值标签
    for x,y in enumerate(price):
        plt.text(y+0.1,x,'%s' %y,va='center')
    plt.savefig('水平条形图.png')
    # 显示图形    
    plt.show()
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0j4ktleuj20c00800ss.jpg)

# 水平交错条形图
```Python
    # 导入绘图模块
    import matplotlib.pyplot as plt
    import numpy as np
    # 构建数据
    Y2016 = [15600,12700,11300,4270,3620]
    Y2017 = [17400,14800,12000,5200,4020]
    labels = ['北京','上海','香港','深圳','广州']
    bar_width = 0.45

    # 中文乱码的处理
    plt.rcParams['font.sans-serif'] =['SimHei']
    plt.rcParams['axes.unicode_minus'] = False

    # 绘图
    plt.bar(np.arange(5), Y2016, label = '2016', color = 'steelblue', alpha = 0.8, width = bar_width)
    plt.bar(np.arange(5)+bar_width, Y2017, label = '2017', color = 'indianred', alpha = 0.8, width = bar_width)
    # 添加轴标签
    plt.xlabel('Top5城市')
    plt.ylabel('家庭数量')
    # 添加标题
    plt.title('亿万财富家庭数Top5城市分布')
    # 添加刻度标签
    plt.xticks(np.arange(5)+bar_width,labels)
    # 设置Y轴的刻度范围
    plt.ylim([2500, 19000])

    # 为每个条形图添加数值标签
    for x2016,y2016 in enumerate(Y2016):
        plt.text(x2016, y2016+100, '%s' %y2016)

    for x2017,y2017 in enumerate(Y2017):
        plt.text(x2017+bar_width, y2017+100, '%s' %y2017)
    # 显示图例
    plt.legend()
    plt.savefig('水平交错条形图.png')
    # 显示图形
    plt.show()
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0jcakoz3j20c0080mxb.jpg)

# 垂直堆叠条形图
```Python
    # 导入模块
    import matplotlib.pyplot as plt
    import numpy as np
    import pandas as pd

    # 导入数据
    data = pd.read_excel('C:\\Users\\Administrator\\Desktop\\货运.xls')

    # 绘图
    plt.bar(np.arange(8), data.loc[0,:][1:], color = 'red', alpha = 0.8, label = '铁路', align = 'center')
    plt.bar(np.arange(8), data.loc[1,:][1:],  bottom = data.loc[0,:][1:], color = 'green', alpha = 0.8, label = '公路', align = 'center')
    plt.bar(np.arange(8), data.loc[2,:][1:],  bottom = data.loc[0,:][1:]+data.loc[1,:][1:], color = 'm', alpha = 0.8, label = '水运', align = 'center')
    plt.bar(np.arange(8), data.loc[3,:][1:],  bottom = data.loc[0,:][1:]+data.loc[1,:][1:]+data.loc[2,:][1:], color = 'black', alpha = 0.8, label = '民航', align = 'center')
    # 添加轴标签
    plt.xlabel('月份')
    plt.ylabel('货物量(万吨)')
    # 添加标题
    plt.title('2017年各月份物流运输量')
    # 添加刻度标签
    plt.xticks(np.arange(8),data.columns[1:])
    # 设置Y轴的刻度范围
    plt.ylim([0,500000])

    # 为每个条形图添加数值标签
    for x_t,y_t in enumerate(data.loc[0,:][1:]):
        plt.text(x_t,y_t/2,'%sW' %(round(y_t/10000,2)),ha='center', color = 'white')

    for x_g,y_g in enumerate(data.loc[0,:][1:]+data.loc[1,:][1:]):
        plt.text(x_g,y_g/2,'%sW' %(round(y_g/10000,2)),ha='center', color = 'white')

    for x_s,y_s in enumerate(data.loc[0,:][1:]+data.loc[1,:][1:]+data.loc[2,:][1:]):
        plt.text(x_s,y_s-20000,'%sW' %(round(y_s/10000,2)),ha='center', color = 'white')    

    # 显示图例
    plt.legend(loc='upper center', ncol=4)
    # 显示图形    
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0k3zz5g9j20b907utae.jpg)

# matplotlib(饼图)
## pie 函数参数解读
饼图的绘制可以使用matplotlib库中的pie函数
```Python
    plt.pie(x, explode=None, labels=None, colors=None,
        autopct=None, pctdistance=0.6, shadow=False,
        labeldistance=1.1, startangle=None,
        radius=None, counterclock=True, wedgeprops=None,
        textprops=None, center=(0, 0), frame=False)
```
---

|参数|说明|
|:---|:---|
|x|指定绘图的数据|
|explode|指定饼图某些部分的突出显示，即呈现爆炸式|
|labels|为饼图添加标签说明，类似于图例说明|
|colors|指定饼图的填充色|
|autopct|自动添加百分比显示，可以采用格式化的方法显示|
|pctdistance|设置百分比标签与圆心的距离|
|shadow|是否添加饼图的阴影效果|
|labeldistance|设置各扇形标签（图例）与圆心的距离|
|startangle|设置饼图的初始摆放角度|
|radius|设置饼图的半径大小|
|counterclock|是否让饼图按逆时针顺序呈现|
|wedgeprops|设置饼图内外边界的属性，如边界线的粗细、颜色等|
|textprops|设置饼图中文本的属性，如字体大小、颜色等|
|center|定饼图的中心点位置，默认为原点|
|frame|是否要显示饼图背后的图框，如果设置为True的话，需要同时控制图框x轴、y轴的范围和饼图的中心位置|

## 绘制
```Python
    # 导入第三方模块
    import matplotlib.pyplot as plt

    # 设置绘图的主题风格（不妨使用R中的ggplot分隔）
    plt.style.use('ggplot')

    # 构造数据
    edu = [0.2515,0.3724,0.3336,0.0368,0.0057]
    labels = ['中专','大专','本科','硕士','其他']

    explode = [0,0.1,0,0,0]  # 用于突出显示大专学历人群
    colors=['#9999ff','#ff9999','#7777aa','#2442aa','#dd5555'] # 自定义颜色

    # 中文乱码和坐标轴负号的处理
    plt.rcParams['font.sans-serif'] = ['SimHei']
    plt.rcParams['axes.unicode_minus'] = False

    # 将横、纵坐标轴标准化处理，保证饼图是一个正圆，否则为椭圆
    plt.axes(aspect='equal')

    # 控制x轴和y轴的范围
    plt.xlim(0,4)
    plt.ylim(0,4)

    # 绘制饼图
    plt.pie(x = edu, # 绘图数据
            explode=explode, # 突出显示大专人群
            labels=labels, # 添加教育水平标签
            colors=colors, # 设置饼图的自定义填充色
            autopct='%.1f%%', # 设置百分比的格式，这里保留一位小数
            pctdistance=0.8,  # 设置百分比标签与圆心的距离
            labeldistance = 1.15, # 设置教育水平标签与圆心的距离
            startangle = 180, # 设置饼图的初始角度
            radius = 1.5, # 设置饼图的半径
            counterclock = False, # 是否逆时针，这里设置为顺时针方向
            wedgeprops = {'linewidth': 1.5, 'edgecolor':'green'},# 设置饼图内外边界的属性值
            textprops = {'fontsize':12, 'color':'k'}, # 设置文本标签的属性值
            center = (1.8,1.8), # 设置饼图的原点
            frame = 1 )# 是否显示饼图的图框，这里设置显示

    # 删除x轴和y轴的刻度
    plt.xticks(())
    plt.yticks(())
    # 添加图标题
    plt.title('芝麻信用失信用户教育水平分布')
    plt.savefig('饼图.png')
    # 显示图形
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0jh2r431j20c00800t2.jpg)

# matplotlib(箱线图)
## boxplot函数的参数解读
```Python
    plt.boxplot(x, notch=None, sym=None, vert=None,
                whis=None, positions=None, widths=None,
                patch_artist=None, meanline=None, showmeans=None,
                showcaps=None, showbox=None, showfliers=None,
                boxprops=None, labels=None, flierprops=None,
                medianprops=None, meanprops=None,
                capprops=None, whiskerprops=None)
```

|参数|说明|
|:---|:---|
|x|指定要绘制箱线图的数据|
|notch|是否是凹口的形式展现箱线图，默认非凹口|
|sym|指定异常点的形状，默认为+号显示|
|vert|是否需要将箱线图垂直摆放，默认垂直摆放；
|whis|指定上下须与上下四分位的距离，默认为1.5倍的四分位差|
|positions|指定箱线图的位置，默认为[0,1,2…]|
|widths|指定箱线图的宽度，默认为0.5|
|patch_artist|是否填充箱体的颜色|
|meanline|是否用线的形式表示均值，默认用点来表示|
|showmeans|是否显示均值，默认不显示|
|showcaps|是否显示箱线图顶端和末端的两条线，默认显示|
|showbox|是否显示箱线图的箱体，默认显示|
|showfliers|是否显示异常值，默认显示|
|boxprops|设置箱体的属性，如边框色，填充色等|
|labels|为箱线图添加标签，类似于图例的作用|
|filerprops|设置异常值的属性，如异常点的形状、大小、填充色等|
|medianprops|设置中位数的属性，如线的类型、粗细等|
|meanprops|设置均值的属性，如点的大小、颜色等|
|capprops|设置箱线图顶端和末端线条的属性，如颜色、粗细等|
|whiskerprops|设置须的属性，如颜色、粗细、线的类型等|

## 绘制
```Python
    # 导入第三方模块
    import pandas as pd
    import matplotlib.pyplot as plt

    # 读取Titanic数据集
    titanic = pd.read_csv('titanic_train.csv')
    # 检查年龄是否有缺失
    any(titanic.Age.isnull())
    # 不妨删除含有缺失年龄的观察
    titanic.dropna(subset=['Age'], inplace=True)

    # 设置图形的显示风格
    plt.style.use('ggplot')

    # 设置中文和负号正常显示
    plt.rcParams['font.sans-serif'] = 'SimHei'
    plt.rcParams['axes.unicode_minus'] = False

    # 绘图：整体乘客的年龄箱线图
    plt.boxplot(x = titanic.Age, # 指定绘图数据
                patch_artist=True, # 要求用自定义颜色填充盒形图，默认白色填充
                showmeans=True, # 以点的形式显示均值
                boxprops = {'color':'black','facecolor':'#9999ff'}, # 设置箱体属性，填充色和边框色
                flierprops = {'marker':'o','markerfacecolor':'red','color':'black'}, # 设置异常值属性，点的形状、填充色和边框色
                meanprops = {'marker':'D','markerfacecolor':'indianred'}, # 设置均值点的属性，点的形状、填充色
                medianprops = {'linestyle':'--','color':'orange'}) # 设置中位数线的属性，线的类型和颜色
    # 设置y轴的范围
    plt.ylim(0,85)

    # 去除箱线图的上边框与右边框的刻度标签
    plt.tick_params(top='off', right='off')
    # 显示图形
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0khch6l1j20c00800sl.jpg)


```Python
    # 按舱级排序，为了后面正常显示分组盒形图的顺序
    titanic.sort_values(by = 'Pclass', inplace=True)

    # 通过for循环将不同仓位的年龄人群分别存储到列表Age变量中
    Age = []
    Levels = titanic.Pclass.unique()
    for Pclass in Levels:
        Age.append(titanic.loc[titanic.Pclass==Pclass,'Age'])

    # 绘图
    plt.boxplot(x = Age,
                patch_artist=True,
                labels = ['一等舱','二等舱','三等舱'], # 添加具体的标签名称
                showmeans=True,
                boxprops = {'color':'black','facecolor':'#9999ff'},
                flierprops = {'marker':'o','markerfacecolor':'red','color':'black'},
                meanprops = {'marker':'D','markerfacecolor':'indianred'},
                medianprops = {'linestyle':'--','color':'orange'})

    # 显示图形
    plt.show()
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0kkhvvshj20c0080747.jpg)

# matplotlib(直方图)
## hist函数的参数解读
```Python
plt.hist(x, bins=10, range=None, normed=False,
        weights=None, cumulative=False, bottom=None,
        histtype='bar', align='mid', orientation='vertical',
        rwidth=None, log=False, color=None,
        label=None, stacked=False)
```

|参数|说明|
|:---|:---|
|x|指定要绘制直方图的数据|
|bins|指定直方图条形的个数|
|range|指定直方图数据的上下界，默认包含绘图数据的最大值和最小值|
|normed|是否将直方图的频数转换成频率|
|weights|该参数可为每一个数据点设置权重|
|cumulative|是否需要计算累计频数或频率|
|bottom|可以为直方图的每个条形添加基准线，默认为0|
|histtype|指定直方图的类型，默认为bar，除此还有’barstacked’, ‘step’,  ‘stepfilled’|
|align|设置条形边界值的对其方式，默认为mid，除此还有’left’和’right’|
|orientation|设置直方图的摆放方向，默认为垂直方向|
|rwidth|设置直方图条形宽度的百分比|
|log|是否需要对绘图数据进行log变换|
|color|设置直方图的填充色|
|label|设置直方图的标签，可通过legend展示其图例|
|stacked|当有多个数据时，是否需要将直方图呈堆叠摆放，默认水平摆放|

## 一元直方图的绘制
```python
    # 导入第三方包
    import numpy as np
    import pandas as pd
    import matplotlib.pyplot as plt
    import matplotlib.mlab as mlab

    # 中文和负号的正常显示
    plt.rcParams['font.sans-serif'] = ['SimHei']
    plt.rcParams['axes.unicode_minus'] = False

    # 读取Titanic数据集
    titanic = pd.read_csv('titanic_train.csv')
    # 检查年龄是否有缺失any(titanic.Age.isnull())
    # 不妨删除含有缺失年龄的观察
    titanic.dropna(subset=['Age'], inplace=True)

    # 设置图形的显示风格
    plt.style.use('ggplot')
    # 绘图：乘客年龄的频数直方图
    plt.hist(titanic.Age, # 绘图数据
            bins = 20, # 指定直方图的条形数为20个
            color = 'steelblue', # 指定填充色
            edgecolor = 'k', # 指定直方图的边界色
            label = '直方图' )# 为直方图呈现标签

    # 去除图形顶部边界和右边界的刻度
    plt.tick_params(top='off', right='off')
    # 显示图例
    plt.legend()
    plt.savefig('直方图.png')
    # 显示图形
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0mm4l1gvj20c00803ye.jpg)

## 累计频率直方图
- 上图绘制的是年龄的频数直方图，从整体的分布来看，有点像正态分布，两边低中间高的倒钟形状。除此，我们还可以绘制累计频率直方图，并且设置5岁为组距，如下代码可以表示成：

```python
    # 绘图：乘客年龄的累计频率直方图
    plt.hist(titanic.Age, # 绘图数据
            bins = np.arange(titanic.Age.min(),titanic.Age.max(),5), # 指定直方图的组距
            normed = True, # 设置为频率直方图
            cumulative = True, # 积累直方图
            color = 'steelblue', # 指定填充色
            edgecolor = 'k', # 指定直方图的边界色
            label = '直方图' )# 为直方图呈现标签

    # 设置坐标轴标签和标题
    plt.title('乘客年龄的频率累计直方图')
    plt.xlabel('年龄')
    plt.ylabel('累计频率')

    # 去除图形顶部边界和右边界的刻度
    plt.tick_params(top='off', right='off')

    # 显示图例
    plt.legend(loc = 'best')
    plt.savefig('乘客年龄的累计频率直方图.png')
    # 显示图形
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0knyeutbj20c0080mx8.jpg)

# 正太分布图
- 通过累计频率直方图就可以快速的发现什么年龄段的人数占了多少比重，例如35岁以下的乘客占了7成，这种图的解读有点像帕累托图。为了测试数据集是否近似服从正态分布，需要在直方图的基础上再绘制两条线，一条表示理论的正态分布曲线，另一条为核密度曲线，目的就是比较两条曲线的吻合度，越吻合就说明数据越近似于正态分布。接下来我们就在直方图的基础上再添加两条曲线：

```python
    # 正太分布图
    plt.hist(titanic.Age, # 绘图数据
            bins = np.arange(titanic.Age.min(),titanic.Age.max(),5), # 指定直方图的组距
            normed = True, # 设置为频率直方图
            color = 'steelblue', # 指定填充色
            edgecolor = 'k') # 指定直方图的边界色

    # 设置坐标轴标签和标题
    plt.title('乘客年龄直方图')
    plt.xlabel('年龄')
    plt.ylabel('频率')

    # 生成正态曲线的数据
    x1 = np.linspace(titanic.Age.min(), titanic.Age.max(), 1000)
    normal = mlab.normpdf(x1, titanic.Age.mean(), titanic.Age.std())
    # 绘制正态分布曲线
    line1, = plt.plot(x1,normal,'r-', linewidth = 2)

    # 生成核密度曲线的数据
    kde = mlab.GaussianKDE(titanic.Age)
    x2 = np.linspace(titanic.Age.min(), titanic.Age.max(), 1000)
    # 绘制
    line2, = plt.plot(x2,kde(x2),'g-', linewidth = 2)

    # 去除图形顶部边界和右边界的刻度
    plt.tick_params(top='off', right='off')

    # 显示图例
    plt.legend([line1, line2],['正态分布曲线','核密度曲线'],loc='best')
    plt.savefig('正太分布图.png')
    # 显示图形
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0kp9cxanj20c0080jrt.jpg)

# 二元直方图的绘制
- 上面绘制的直方图都是基于所有乘客的年龄，如果想对比男女乘客的年龄直方图的话，我们可以通过两个hist将不同性别的直方图绘制到一张图内，具体代码如下：

```Python
    # 提取不同性别的年龄数据
    age_female = titanic.Age[titanic.Sex == 'female']
    age_male = titanic.Age[titanic.Sex == 'male']

    # 设置直方图的组距
    bins = np.arange(titanic.Age.min(), titanic.Age.max(), 2)
    # 男性乘客年龄直方图
    plt.hist(age_male, bins = bins, label = '男性', color = 'steelblue', alpha = 0.7)
    # 女性乘客年龄直方图
    plt.hist(age_female, bins = bins, label = '女性', alpha = 0.6)

    # 设置坐标轴标签和标题
    plt.title('乘客年龄直方图')
    plt.xlabel('年龄')
    plt.ylabel('人数')

    # 去除图形顶部边界和右边界的刻度
    plt.tick_params(top='off', right='off')

    # 显示图例
    plt.legend()
    plt.savefig('二元直方图.png')
    # 显示图形
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0krsx0j5j20c0080t8q.jpg)

# matplotlib(折线图)
## plot函数的参数解读
```python
plt.hist(x,y,linestyle,
    linewidth,color,marker,
    markersize,markeredgecolor,
    markerfactcolor,label,alpha)
```

|参数|说明|
|:---|:---|
|x|指定折线图的x轴数据|
|y|指定折线图的y轴数据|
|linestyle|指定折线的类型，可以是实线、虚线、点虚线、点点线等，默认文实线|
|linewidth|指定折线的宽度|
|marker|可以为折线图添加点，该参数是设置点的形状|
|markersize|设置点的大小|
|markeredgecolor|设置点的边框色|
|markerfactcolor|设置点的填充色|
|label|为折线图添加标签，类似于图例的作用|

# 一元折线图的绘制
```python
    # 导入模块
    import pandas as pd
    import matplotlib.pyplot as plt

    # 设置绘图风格
    plt.style.use('ggplot')
    # 设置中文编码和负号的正常显示
    plt.rcParams['font.sans-serif'] = 'SimHei'
    plt.rcParams['axes.unicode_minus'] = False

    # 读取需要绘图的数据
    article_reading = pd.read_excel('wechart.xlsx')
    # 取出8月份至9月28日的数据
    sub_data = article_reading.loc[article_reading.date >= '2017-08-01' ,:]

    # 设置图框的大小
    fig = plt.figure(figsize=(10,6))
    # 绘图
    plt.plot(sub_data.date, # x轴数据
             sub_data.article_reading_cnts, # y轴数据
             linestyle = '-', # 折线类型
             linewidth = 2, # 折线宽度
             color = 'steelblue', # 折线颜色
             marker = 'o', # 点的形状
             markersize = 6, # 点的大小
             markeredgecolor='black', # 点的边框色
             markerfacecolor='brown') # 点的填充色

    # 添加标题和坐标轴标签
    plt.title('公众号每天阅读人数趋势图')
    plt.xlabel('日期')
    plt.ylabel('人数')

    # 剔除图框上边界和右边界的刻度
    plt.tick_params(top = 'off', right = 'off')

    # 为了避免x轴日期刻度标签的重叠，设置x轴刻度自动展现，并且45度倾斜
    fig.autofmt_xdate(rotation = 45)

    # 显示图形
    plt.show()
```
- 由于x轴是日期型数据，当数据量一多的时候，就会导致刻度标签的重叠或拥挤，为了防止重叠的产生，我们需要让日期型的x轴刻度标签自动展现，从而避免重叠的现象

## 图形优化
```Python
    # 导入模块
    import matplotlib as mpl

    # 设置图框的大小
    fig = plt.figure(figsize=(10,6))
    # 绘图
    plt.plot(sub_data.date, # x轴数据
             sub_data.article_reading_cnts, # y轴数据
             linestyle = '-', # 折线类型
             linewidth = 2, # 折线宽度
             color = 'steelblue', # 折线颜色
             marker = 'o', # 点的形状
             markersize = 6, # 点的大小
             markeredgecolor='black', # 点的边框色
             markerfacecolor='steelblue') # 点的填充色

    # 添加标题和坐标轴标签
    plt.title('公众号每天阅读人数趋势图')
    plt.xlabel('日期')
    plt.ylabel('人数')

    # 剔除图框上边界和右边界的刻度
    plt.tick_params(top = 'off', right = 'off')

    # 获取图的坐标信息
    ax = plt.gca()
    # 设置日期的显示格式  
    date_format = mpl.dates.DateFormatter("%Y-%m-%d")  
    ax.xaxis.set_major_formatter(date_format)

    # 设置x轴显示多少个日期刻度
    #xlocator = mpl.ticker.LinearLocator(10)
    # 设置x轴每个刻度的间隔天数
    xlocator = mpl.ticker.MultipleLocator(5)
    ax.xaxis.set_major_locator(xlocator)

    # 为了避免x轴日期刻度标签的重叠，设置x轴刻度自动展现，并且45度倾斜
    fig.autofmt_xdate(rotation = 45)

    # 显示图形
```

# 多元折线图的绘制
- 如果你需要在一张图形中画上两条折线图，也很简单，只需要在代码中写入两次plot函数即可，其他都不需要改动了。具体可以参考下面的代码逻辑：

```python
    # 设置图框的大小
    fig = plt.figure(figsize=(10,6))

    # 绘图--阅读人数趋势
    plt.plot(sub_data.date, # x轴数据
             sub_data.article_reading_cnts, # y轴数据
             linestyle = '-', # 折线类型
             linewidth = 2, # 折线宽度
             color = 'steelblue', # 折线颜色
             marker = 'o', # 点的形状
             markersize = 6, # 点的大小
             markeredgecolor='black', # 点的边框色
             markerfacecolor='steelblue', # 点的填充色
             label = '阅读人数') # 添加标签

    # 绘图--阅读人次趋势
    plt.plot(sub_data.date, # x轴数据
             sub_data.article_reading_times, # y轴数据
             linestyle = '-', # 折线类型
             linewidth = 2, # 折线宽度
             color = '#ff9999', # 折线颜色
             marker = 'o', # 点的形状
             markersize = 6, # 点的大小
             markeredgecolor='black', # 点的边框色
             markerfacecolor='#ff9999', # 点的填充色
             label = '阅读人次') # 添加标签

    # 添加标题和坐标轴标签
    plt.title('公众号每天阅读人数和人次趋势图')
    plt.xlabel('日期')
    plt.ylabel('人数')

    # 剔除图框上边界和右边界的刻度
    plt.tick_params(top = 'off', right = 'off')

    # 获取图的坐标信息
    ax = plt.gca()
    # 设置日期的显示格式  
    date_format = mpl.dates.DateFormatter('%m-%d')  
    ax.xaxis.set_major_formatter(date_format)

    # 设置x轴显示多少个日期刻度
    #xlocator = mpl.ticker.LinearLocator(10)
    # 设置x轴每个刻度的间隔天数
    xlocator = mpl.ticker.MultipleLocator(3)
    ax.xaxis.set_major_locator(xlocator)

    # 为了避免x轴日期刻度标签的重叠，设置x轴刻度自动展现，并且45度倾斜
    fig.autofmt_xdate(rotation = 45)

    # 显示图例
    plt.legend()
    # 显示图形
    plt.show()
```
# matplotlib(散点图)
## scatter函数的参数解读
```python
    lt.scatter(x, y, s=20,
                c=None, marker='o',
                cmap=None, norm=None,
                vmin=None, vmax=None,
                alpha=None, linewidths=None,
                edgecolors=None)
```

|参数|说明|
|:---|:---|
|x|指定散点图的x轴数据|
|y|指定散点图的y轴数据|
|s|指定散点图点的大小，默认为20，通过传入新的变量，实现气泡图的绘制|
|c|指定散点图点的颜色，默认为蓝色|
|marker|指定散点图点的形状，默认为圆形|
|cmap|指定色图，只有当c参数是一个浮点型的数组的时候才起作用|
|norm|设置数据亮度，标准化到0~1之间，使用该参数仍需要c为浮点型的数组|
|vmin、vmax|亮度设置，与norm类似，如果使用了norm则该参数无效|
|alpha|设置散点的透明度|
|linewidths|设置散点边界线的宽度|
|edgecolors|设置散点边界线的颜色|

# 一般散点图的绘制
```python
    # 导入模块
    import pandas as pd
    import matplotlib.pyplot as plt

    # 设置绘图风格
    plt.style.use('ggplot')
    # 设置中文编码和负号的正常显示
    plt.rcParams['font.sans-serif'] = 'SimHei'
    plt.rcParams['axes.unicode_minus'] = False

    # 读入数据
    cars = pd.read_csv('cars.csv')

    # 绘图
    plt.scatter(cars.speed, # x轴数据为汽车速度
                cars.dist, # y轴数据为汽车的刹车距离
                s = 30, # 设置点的大小
                c = 'steelblue', # 设置点的颜色
                marker = 's', # 设置点的形状
                alpha = 0.9, # 设置点的透明度
                linewidths = 0.3, # 设置散点边界的粗细
                edgecolors = 'red' # 设置散点边界的颜色
                )

    # 添加轴标签和标题plt.title('汽车速度与刹车距离的关系')
    plt.xlabel('汽车速度')
    plt.ylabel('刹车距离')

    # 去除图边框的顶部刻度和右边刻度
    plt.tick_params(top = 'off', right = 'off')

    plt.savefig('一般散点图.png')
    # 显示图形
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0mqe23jgj20c0080q2w.jpg)

# 分组散点图的绘制
```Python
    # 读取数据
    iris = pd.read_csv('iris.csv')

    # 设置中文编码和负号的正常显示
    plt.rcParams['font.sans-serif'] = 'SimHei'
    plt.rcParams['axes.unicode_minus'] = False

    # 自定义颜色
    colors = ['steelblue', '#9999ff', '#ff9999']

    # 三种不同的花品种
    Species = iris.Species.unique()

    # 通过循环的方式，完成分组散点图的绘制
    for i in range(len(Species)):
        plt.scatter(iris.loc[iris.Species == Species[i], 'Petal.Length'],
                    iris.loc[iris.Species == Species[i], 'Petal.Width'],
                    s = 35, c = colors[i], label = Species[i])

    # 添加轴标签和标题
    plt.title('花瓣长度与宽度的关系')
    plt.xlabel('花瓣长度')
    plt.ylabel('花瓣宽度')

    # 去除图边框的顶部刻度和右边刻度
    plt.tick_params(top = 'off', right = 'off')
    # 添加图例
    plt.legend(loc = 'upper left')
    plt.savefig('分组散点图.png')
    # 显示图形
    plt.show()
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0mt6kcxgj20c0080q35.jpg)

# 气泡图的绘制
 ```python
    # 导入第三方包
    import numpy as np

    # 设置中文编码和负号的正常显示
    plt.rcParams['font.sans-serif'] = 'SimHei'
    plt.rcParams['axes.unicode_minus'] = False

    # 读取数据
    sales = pd.read_excel('sales.xlsx')

    # 绘制气泡图
    plt.scatter(sales.finish_ratio,
                sales.profit_ratio,
                c = 'steelblue',
                s = sales.tot_target/30,
                edgecolor = 'black')

    # 改变轴刻度的显示方式（百分比形式）
    plt.xticks(np.arange(0,1,0.1), [str(i*100)+'%' for i in np.arange(0,1,0.1)])
    plt.yticks(np.arange(0,1,0.1), [str(i*100)+'%' for i in np.arange(0,1,0.1)])

    # 设置x轴和y轴的数值范围
    plt.xlim(0.2, 0.7)
    plt.ylim(0.25, 0.85)

    # 添加轴标签和标题
    plt.title('完成率与利润率的关系')
    plt.xlabel('完成率')
    plt.ylabel('利润率')

    # 去除图边框的顶部刻度和右边刻度
    plt.tick_params(top = 'off', right = 'off')
    # 显示图形
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0mvachvuj20c0080dg0.jpg)

# 散点图+线性回归线
```Python
    # 导入第三方模块
    from sklearn.linear_model import LinearRegression

    # 散点图
    plt.scatter(cars.speed, # x轴数据为汽车速度
                cars.dist, # y轴数据为汽车的刹车距离
                s = 30, # 设置点的大小
                c = 'black', # 设置点的颜色
                marker = 'o', # 设置点的形状
                alpha = 0.9, # 设置点的透明度
                linewidths = 0.3, # 设置散点边界的粗细
                label = '观测点'
                )

    # 建模
    reg = LinearRegression().fit(cars.speed.reshape(-1,1), cars.dist)
    # 回归预测值
    pred = reg.predict(cars.speed.reshape(-1,1))

    # 绘制回归线
    plt.plot(cars.speed, pred, linewidth = 2, label = '回归线')

    # 添加轴标签和标题
    plt.title('汽车速度与刹车距离的关系')
    plt.xlabel('汽车速度')
    plt.ylabel('刹车距离')

    # 去除图边框的顶部刻度和右边刻度
    plt.tick_params(top = 'off', right = 'off')
    # 显示图例
    plt.legend(loc = 'upper left')
    # 显示图形
    plt.show()
```
# matplotlib(雷达图)
```Python
    # 导入第三方模块
    import numpy as np
    import matplotlib.pyplot as plt

    # 中文和负号的正常显示
    plt.rcParams['font.sans-serif'] = 'SimHei'
    plt.rcParams['axes.unicode_minus'] = False

    # 使用ggplot的绘图风格
    plt.style.use('ggplot')

    # 构造数据
    values = [3.2,2.1,3.5,2.8,3]
    feature = ['个人能力','QC知识','解决问题能力','服务质量意识','团队精神']

    N = len(values)
    # 设置雷达图的角度，用于平分切开一个圆面
    angles=np.linspace(0, 2*np.pi, N, endpoint=False)

    # 为了使雷达图一圈封闭起来，需要下面的步骤
    values=np.concatenate((values,[values[0]]))
    angles=np.concatenate((angles,[angles[0]]))

    # 绘图
    fig=plt.figure()
    # 这里一定要设置为极坐标格式
    ax = fig.add_subplot(111, polar=True)
    # 绘制折线图
    ax.plot(angles, values, 'o-', linewidth=2)
    # 填充颜色
    ax.fill(angles, values, alpha=0.25)
    # 添加每个特征的标签
    ax.set_thetagrids(angles * 180/np.pi, feature)
    # 设置雷达图的范围
    ax.set_ylim(0,5)
    # 添加标题
    plt.title('活动前后员工状态表现')
    # 添加网格线
    ax.grid(True)
    # 显示图形
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0m6gdokgj20c0080aai.jpg)

# 多条线的雷达图
```python
    # 导入第三方模块
    import numpy as np
    import matplotlib.pyplot as plt

    # 中文和负号的正常显示
    plt.rcParams['font.sans-serif'] = 'SimHei'
    plt.rcParams['axes.unicode_minus'] = False

    # 使用ggplot的绘图风格
    plt.style.use('ggplot')

    # 构造数据
    values = [3.2,2.1,3.5,2.8,3]
    values2 = [4,4.1,4.5,4,4.1]
    feature = ['个人能力','QC知识','解决问题能力','服务质量意识','团队精神']

    N = len(values)
    # 设置雷达图的角度，用于平分切开一个圆面
    angles=np.linspace(0, 2*np.pi, N, endpoint=False)
    # 为了使雷达图一圈封闭起来，需要下面的步骤
    values=np.concatenate((values,[values[0]]))
    values2=np.concatenate((values2,[values2[0]]))
    angles=np.concatenate((angles,[angles[0]]))

    # 绘图
    fig=plt.figure()
    ax = fig.add_subplot(111, polar=True)
    # 绘制折线图
    ax.plot(angles, values, 'o-', linewidth=2, label = '活动前')
    # 填充颜色
    ax.fill(angles, values, alpha=0.25)
    # 绘制第二条折线图
    ax.plot(angles, values2, 'o-', linewidth=2, label = '活动后')
    ax.fill(angles, values2, alpha=0.25)

    # 添加每个特征的标签
    ax.set_thetagrids(angles * 180/np.pi, feature)
    # 设置雷达图的范围
    ax.set_ylim(0,5)
    # 添加标题
    plt.title('活动前后员工状态表现')

    # 添加网格线
    ax.grid(True)
    # 设置图例
    plt.legend(loc = 'best')
    # 显示图形
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0m7o9accj20c0080mxt.jpg)

# pygal模块则提供了更加简单的雷达图函数
```python
    # 导入第三方模块
    import pygal

    # 调用Radar这个类，并设置雷达图的填充，及数据范围
    radar_chart = pygal.Radar(fill = True, range=(0,5))
    # 添加雷达图的标题
    radar_chart.title = '活动前后员工状态表现'
    # 添加雷达图各顶点的含义
    radar_chart.x_labels = ['个人能力','QC知识','解决问题能力','服务质量意识','团队精神']

    # 绘制两条雷达图区域
    radar_chart.add('活动前', [3.2,2.1,3.5,2.8,3])
    radar_chart.add('活动后', [4,4.1,4.5,4,4.1])

    # 保存图像
    radar_chart.render_to_file('radar_chart.svg')
```
# matplotlib(面积图)
## stackplot函数语法及参数含义
```python
stackplot(x,*args,**kargs)
```

|参数|说明|
|:---|:---|
|x|指定面积图的x轴数据|
|*args|为可变参数，可以接受任意多的y轴数据，即各个拆分的数据对象|
|**kargs|为关键字参数，可以通过传递其他参数来修饰面积图，如标签、颜色|

---

- 可用的关键字参数：

|参数|说明|
|:---|:---|
|labels|以列表的形式传递每一块面积图包含的标签，通过图例展现|
|colors|设置不同的颜色填充面积图|

```python
    # ========== Python3 + Jupyter ========== #
    # 导入第三方模块
    import pandas as pd
    import numpy as np
    import matplotlib.pyplot as plt

    # 设置图形的显示风格
    plt.style.use('ggplot')
    # 设置中文和负号正常显示
    plt.rcParams['font.sans-serif'] = 'SimHei'
    plt.rcParams['axes.unicode_minus'] = False

    # 读取数据
    transport = pd.read_excel('transport.xls')
    # 窥探数据框的前5行
    transport.head()

    # 折线图的x变量值，即Jan（一月份）到Aug（八月份）8个值
    N = np.arange(transport.shape[1]-1)

    # 绘制拆分的折线图
    labels = transport.Index
    channel = transport.columns[1:]

    for i in range(transport.shape[0]):
        plt.plot(N, # x坐标
                 transport.loc[i,'Jan':'Aug'], # y坐标
                 label = labels[i], # 添加标签
                 marker = 'o', # 给折线图添加圆形点
                 linewidth = 2 # 设置线的宽度
                )

    # 添加标题和坐标轴标签
    plt.title('2017年各运输渠道的运输量')
    plt.ylabel('运输量(万吨)')
    # 修改x轴的刻度标签
    plt.xticks(N,channel)

    # 剔除图框上边界和右边界的刻度
    plt.tick_params(top = 'off', right = 'off')

    # 显示图例（即显示label的效果）  
    plt.legend(loc = 'best')  
    # 显示图形
    plt.show()
```

- 这就是绘制分组的折线图思想，虽然折线图能够反映各个渠道的运输量随月份的波动趋势，但无法观察到1月份到8月份的各自总量。接下来我们看看面积图的展现。

```python
    x = N
    # 将铁路运输、公路运输和水路运输各月的值提取出来，存储到y1~y3
    # 千万千万记得，提取出数据框的一列时，需要将序列的数据类型进行强制转换，否则会报错
    y1 = transport.loc[0,'Jan':'Aug'].astype('int')
    y2 = transport.loc[1,'Jan':'Aug'].astype('int')
    y3 = transport.loc[2,'Jan':'Aug'].astype('int')

    # 定义各区块面积的含义
    colors = ['#ff9999','#9999ff','#cc1234']

    # 绘制面积图
    plt.stackplot(x, # x轴
                  y1,y2,y3, # 可变参数，接受多个y
                  labels = labels, # 定义各区块面积的含义
                  colors = colors # 设置各区块的填充色
                 )

    # 添加标题和坐标轴标签
    plt.title('2017年各运输渠道的运输量')
    plt.ylabel('累积运输量(万吨)')

    # 修改x轴的刻度
    plt.xticks(N,channel)

    # 剔除图框上边界和右边界的刻度
    plt.tick_params(top = 'off', right = 'off')

    # 显示图例（即显示labels的效果）  
    plt.legend(loc = 'upper left')
    # 显示图形
    plt.show()
```

# matplotlib(树地图)
## squarify.plot函数
```python
squarify.plot(sizes,
        norm_x=100,
        norm_y=100,
        color=None,
        label=None,
        value=None,
        alpha,
        **kwargs)
```

|参数|说明|
|:---|:---|
|sizes|指定离散变量各水平对应的数值，即反映树地图子块的面积大小|
|norm_x|默认将x轴的范围限定在0-100之内|
|norm_y|默认将y轴的范围限定在0-100之内|
|color|自定义设置树地图子块的填充色|
|label|为每个子块指定标签|
|value|为每个子块添加数值大小的标签|
|alpha|设置填充色的透明度|
|**kwargs|关键字参数，与条形图的关键字参数类似，如设置边框色、边框粗细等|

```python
    # 导入第三方包
    import matplotlib.pyplot as plt
    import squarify

    #中文及负号处理办法
    plt.rcParams['font.sans-serif'] = 'SimHei'
    plt.rcParams['axes.unicode_minus'] = False

    # 创建数据
    name = ['国内增值税','国内消费税','企业所得税','个人所得税',
            '进口增值税、消费税','出口退税','城市维护建设税',
            '车辆购置税','印花税','资源税','土地和房税','车船税烟叶税等']
    income = [3908,856,801,868,1361,1042,320,291,175,111,414,63]
            
    # 绘图
    colors = ['steelblue','#9999ff','red','indianred',
              'green','yellow','orange']
              plot = squarify.plot(sizes = income, # 指定绘图数据
                         label = name, # 指定标签
                         color = colors, # 指定自定义颜色
                         alpha = 0.6, # 指定透明度
                         value = income, # 添加数值标签
                         edgecolor = 'white', # 设置边界框为白色
                         linewidth =3 # 设置边框宽度为3
                        )
              # 设置标签大小
    plt.rc('font', size=8)
    # 设置标题大小
    plot.set_title('2017年8月中央财政收支情况',fontdict = {'fontsize':15})

    # 去除坐标轴
    plt.axis('off')
    # 去除上边框和右边框刻度
    plt.tick_params(top = 'off', right = 'off')
    # 显示图形
    plt.show()
```

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fx0miksd7jj20c0080jro.jpg)

# 数据文件
[链接提取码: u6rg](https://pan.baidu.com/s/1hMRJAz0OvsAtYhsbjY4njw)

---

- 作者：天痕坤
- [原文](https://blog.csdn.net/kun1280437633/article/details/80841364)
