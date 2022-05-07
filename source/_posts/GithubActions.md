---
title: Hexo Github Actions
date: 2022-05-08 01:03:47
tags: Github
---

# Github Actions

## 生成 SSH Key
```ssh
ssh-keygen -t rsa -b 4096 -C "emal@gmail.com"
```

<!--more-->

## 添加 Key 到 GitHub

### 公钥

仓库 --> Secrets --> Actions --> New repository secert

Name: HEXO_DEPLOY_KEY
Value: id_rsa.pub 的值

## 私钥
仓库 --> Settings --> Deploy keys --> Add deploy key

Name: HEXO_DEPLOY_PUB
Value: id_rsa  的值

# 使用
```yaml
name: Hexo Deploy

on:
  push:
    branches: 
      - source

jobs:
  build: 
    runs-on: ubuntu-latest 
    name: auto deploy
    
    steps:
    - name: Setup Node.js 12.x
      uses: actions/setup-node@master
      with:
        node-version: "12.x"

    - name: Checkout Repository source branch
      uses: actions/checkout@v2
      with:
        ref: source

    - name: Generate Public Files
      run: |
        npm i
        npm install hexo-cli -g
        hexo clean && hexo generate

    - name: Deploy Hexo
      uses: peaceiris/actions-gh-pages@v3
      with:
        deploy_key: ${{ secrets.HEXO_DEPLOY_KEY }}
        external_repository: ivitan/ivitan.github.io
        publish_branch: master
        publish_dir: ./public
        commit_message: ${{ github.event.head_commit.message }}
        user_name: 'Vitan'
        user_email: 'vitan.me@gmail.com'
    ```