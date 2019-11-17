---
title: Hexo SEO 优化
tags:
  - Hexo 
categories:
  - Diary
author:
  - Vitan
enable_unread_badge: true
toc: true
thumbnail: /images/Hexo.png
date: 2019-09-06 09:13:41
---
Hexo SEO 优化
<!--more-->

# 添加站点地图
## 安装插件
```bash
npm install hexo-generator-sitemap --save
npm install hexo-generator-baidu-sitemap --save
```

## 配置
```bash _config.yml
#hexo sitemap
sitemap:
  path: sitemap.xml
baidusitemap:
  path: bdmap.xml
```

# 添加 robots
站点 source 下添加 `robots.txt`
```bash robots.txt
User-agent: *
Allow: /
Allow: /archives/
Allow: /categories/
Allow: /tags/
Allow: /about/

Disallow: /vendors/
Disallow: /js/
Disallow: /css/
Disallow: /fonts/
Disallow: /vendors/
Disallow: /fancybox/

Sitemap: https://vitan.me/sitemap.xml
Sitemap: https://vitan.me/bdmap.xml
```

# 添加到 Google
- 在 [Google Search Console](https://search.google.com/search-console) 添加站点地图
- 在 [百度](https://ziyuan.baidu.com/linksubmit/index) 添加站点地图