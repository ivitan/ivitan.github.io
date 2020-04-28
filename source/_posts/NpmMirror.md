---
title: 更换 Npm 源
tags:
- Node.Js
- Linux
- Windows
categories:
- Coding
author:
- Vitan
toc: true
date: 2020-04-28 08:02:08
---
> Npm 换源
<!--more-->

# 临时源
```node
npm --registry https://registry.npm.taobao.org install express
```

# 永久源
```node
npm config set registry https://registry.npm.taobao.org
```

# cnpm
```node
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

# 官方镜像
```node
npm config set registry https://registry.npmjs.org/
```

# 查看源地址
```node
npm config get registry
```