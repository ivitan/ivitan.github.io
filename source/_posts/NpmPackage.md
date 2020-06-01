---
title: 发布自己的 NPM 包
tags:
  - Node.Js
  - Linux
  - Windows
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-06-01 18:52:13
---
发布自己的 NPM 包

<!--more-->

# 注册 NPM 账号

在 https://www.npmjs.com/ 注册账户

# 添加本地用户

```
npm adduser
username:
password:
email:
```

检查

```
npm whoami
```

# 配置 package.json
```
{
  "name": "package_name",
  "version": "1.8.3",
  "description": "Package Descrption.",
  "keywords": [
    "hexo",
    "theme",
    "material design"
  ],
  "author": {
    "name": "Vitan",
    "email": "admin@vitan.me"
  },
  "license": "MIT",
  "repository": {
    "url": "git+https://github.com/ivitan/Project.git",
    "type": "git"
  }
}
```

# 发布
```
npm publish
```