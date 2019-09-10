---
title: 解决 "npm err! cannot read property 'length' of undefined"
date: 2018-03-10 22:18:38
tags:
- Linux
- Termux
- Android
toc: true
categories: notes
thumbnail: /images/Bash.png
---
解决 Termux出现npm err! cannot read property 'length' of undefined 问题
<!--more-->
# 方法
- 复制以下内容

```js
(require('os').cpus() || { length: 1 }).length
```

- 编辑

```bash
vim ../usr/lib/node_modules/npm/node_modules/worker-farm/lib/farm.js
```

- 修改如下保存即可

![修改.jpg](https://s1.ax1x.com/2018/03/11/9WmxIA.jpg)

# 已知问题
- Npm 无法升级。
