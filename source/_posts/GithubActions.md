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
      - source # 触发分支：当 source 分支有更新时执行

# 【关键点】必须赋予 GITHUB_TOKEN 写入权限，否则无法推送代码
permissions:
  contents: write

jobs:
  build: 
    runs-on: ubuntu-latest
    name: auto deploy
    
    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4
      with:
        ref: source

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: "25"

    - name: Generate Public Files
      run: |
        npm install
        npx hexo clean
        npx hexo generate

    # 部署到当前仓库（使用 GITHUB_TOKEN）
    - name: Deploy Hexo
      uses: peaceiris/actions-gh-pages@v4
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_branch: master # 部署到当前仓库的 master 分支 (或者改为 gh-pages)
        publish_dir: ./public
        commit_message: ${{ github.event.head_commit.message }}
        user_name: 'yourname'
        user_email: 'yourname@mail.com'
```