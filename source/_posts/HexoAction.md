---
title: 利用 Github Action 自动部署 Hexo
tags:
  - Hexo
  - Linux
  - Windows
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-12-12 00:30:30
---
利用 Github Action 自动部署 Hexo。
<!--more-->

# Secrets

仓库下 Setting -> Secrets -> New repository secret 新建 Secrets

```sh Secret 名
HEXO_DEPLOY_PRI
```

# Actions

Hexo 目录下新建 .github\workflows\deploy.yml

```yml deploy.yml
# Actions 名称
name: Hexo Deploy

# 监听分支有提价时执行
on:
  push:
    branches: 
      - source

# 系统环境变量
env:
  TZ: Asia/Shanghai
  GIT_USER: Vitan
  GIT_EMAIL: vitan.me@gmail.com
  DEPLOY_REPO: ivitan/ivitan.github.io
  DEPLOY_BRANCH: master
  THEME_REPO: ivitan/indigo
  THEME_BRANCH: master

# 系统环境
jobs:
  build:
    name: Setup OS
    runs-on: ubuntu-latest
    strategy:
      matrix:
        os: [ubuntu-latest]
        node_version: [12.x]

    steps:
      - name: Checkout Repository source branch
        uses: actions/checkout@v2
        with:
          ref: source

      - name: Checkout Deploy Repo
        uses: actions/checkout@v2
        with:
          repository: ${{ env.DEPLOY_REPO }}
          ref: ${{ env.DEPLOY_BRANCH }}
          path: .deploy_git
      
      - name: Checkout Theme Repo
        uses: actions/checkout@v2
        with:
          repository: ${{ env.THEME_REPO }}
          ref: ${{ env.THEME_BRANCH }}
          path: themes/indigo

      - name: Setup Node.js ${{ matrix.node_version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node_version }}
      
      - name: Setup Deploy Private Key
        env:
          HEXO_DEPLOY_PRI: ${{secrets.HEXO_DEPLOY_PRI}}
        run: |
          mkdir -p ~/.ssh/
          echo "$HEXO_DEPLOY_PRI" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan github.com >> ~/.ssh/known_hosts

      - name: Setup Git Infomation
        run: | 
          git config --global user.name $GIT_USER
          git config --global user.email $GIT_EMAIL

      - name: Setup Hexo Dependencies
        run: |
          sudo timedatectl set-timezone $TZ
          npm install hexo-cli -g
          npm install
          wget https://github.com/ivitan/ivitan.github.io/releases/download/Pin/generator.js -O ./node_modules/hexo-generator-index/lib/generator.js

      - name: Deploy Hexo blog
        run: |
          hexo clean
          hexo generate
          hexo deploy
```