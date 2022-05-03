---
layout: wiki
wiki: wnmp
title: wnmp
---

<p align="center" class="has-mb-6">
<img class="not-gallery-item" height="48" src="https://cdn.jsdelivr.net/gh/ivitan/Picture@master/imageslogo.svg">
<br>
<h2 align="center">WNMP</h2>
<p align="center">Windows + Nginx1.1 + PHP7.2 + MySql5.7</p>
</p>

## 结构
```
├─logs  ----------------- nginx日志目录 （必须有可写权限）
├─mysql  ---------------- mysql目录
│  ├─data  -------------- mysql数据库数据存储目录（必须有可写权限）
├─nginx   --------------- nginx目录
│  ├─conf  -------------- nginx配置目录
│  │  └─vhost ----------- 虚拟站点配置目录（自动加载里面的*.conf）
├─php ------------------- php7目录
├─temp  ----------------- nginx temp目录 （必须有可写权限）
└─web   ----------------- 配置站点主目录
    ├─testphp5  --------- 测试php5站点目录
    ├─testphp7  --------- 测试php7站点目录
    └─phpMyAdmin  ------- phpMyAdmin站点目录
```

## 使用
运行：Start.bat
停止：Stop.bat