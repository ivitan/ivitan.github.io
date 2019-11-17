---
title: Matplotlib 中文乱码
tags:
  - Python
  - Linux
  - ArchLinux
categories:
  - Diary
author:
  - Vitan
enable_unread_badge: true
toc: true
thumbnail: /images/Python.png
date: 2019-09-18 22:42:36
---
Linux 解决 matplotlib 中文乱码问题
<!--more-->

# 安装字体
- 安装中文字体，例如 SimHei

- 检测本机中文字体

```python
from matplotlib.font_manager import FontManager
import subprocess

fm = FontManager()
mat_fonts = set(f.name for f in fm.ttflist)
#print(mat_fonts)
output = subprocess.check_output('fc-list :lang=zh -f "%{family}\n"', shell=True)
#print( '*' * 10, '系统可用的中文字体', '*' * 10)
#print (output)
zh_fonts = set(f.split(',', 1)[0] for f in output.decode('utf-8').split('\n'))
available = mat_fonts & zh_fonts
print ('*' * 10, '可用的字体', '*' * 10)
for f in available:
     print (f)
```

# 配置字体
- 复制字体

```bash
sudo cp font.ttf /usr/share/fonts
sudo cp font.ttf /usr/lib/python3.7/site-packages/matplotlib/mpl-data/fonts
```

# 配置
```baah /usr/lib/python3.7/site-packages/matplotlib/mpl-data
sudo nvim matplotlibrc
```

- matplotlibrc

```bash
font.family     : sans-serif                                           
font.serif▏     : serif     

font.serif         : SimHei,Source Code Pro,DejaVu Serif, Bitstream Vera Serif, Computer Modern Roman, New Century Schoolbook, Century Schoolbook L, Utopia
font.sans-serif    : SimHei,Source Code Pro,DejaVu Sans, Bitstream Vera Sans, Computer Modern Sans Serif, Lucida Grande, Verdana, Geneva, Lucid, Arial, Helvetica
```

# 清楚缓存
```bash
rm -rf ~/.cache/matplotlib
```

# 使用
```bash
# 中文乱码的处理
from pylab import mpl
mpl.rcParams['font.sans-serif'] = ['Source Code Pro'] # 指定默认字体
mpl.rcParams['axes.unicode_minus'] = False # 解决保存图像是负号'-'显示为方块的问题
```


---
**参考资料**
- [Linux下解决matplotlib中文乱码的方法](https://segmentfault.com/a/1190000000621721)
