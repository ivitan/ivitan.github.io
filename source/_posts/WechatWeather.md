---
title: Python 项目调用 Github Actions 中的 Secrets
tags:
  - Linux
  - Windows
  - Python
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2021-01-03 10:12:17
---

Python 项目调用 Github Actions 中的 Secrets

<!--morre-->

## 配置 Secret
> 设置好名为 `mySecret` 的 Secret 

```yml
name: 'GitHub Actions Demo'
 
on:
  push:
  schedule:
    - cron: '0 23 * * *'

jobs:
  Weather-daily:
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout'
        uses: actions/checkout@v2
      - name: 'Set up Python'
        uses: actions/setup-python@v1
        with:
          python-version: 3.7
      - name: 'Install requirements'
        run: | 
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      - name: 'Working'
        env:
          apiID: ${{ secrets.APIID }}
          appSecret: ${{ secrets.APPSECRET }}
          SCKEY: ${{ secrets.SCKEY }}
        run: python Demo.py
```

## Demo

```py
import os

mySecret = os.environ['mySecret']
print(mySecret)
```