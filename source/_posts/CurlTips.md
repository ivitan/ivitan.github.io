---
title: Curl 技巧
date: 2018-08-27 12:27:18
tags:
  - Linux
  - ArchLinux
  - Ubuntu
  - Win
categories:
  - notes
author:
  name: Vitan
enable_unread_badge: true
icon:
  - /images/Linux.png
---
# 技巧
## 查看版本号
命令
:   ```sh
    Curl --version
    ```
    - or
    ```sh
    Curl -v
    ```
    - 选项不仅会返回版本，还会返回当前版本中支持的协议和功能。

## 下载一个文件
命令
:   - 不指定文件名
    ```sh
    curl -O https://Vitan.me/file.tar.gz
    ```
    - 指定文件名
    ```sh
    curl -o newfile.tar.gz https://Vitan.me/file.tar.gz
    ```

## 下载多个文件
命令
:   ```sh
    curl -O https://Vitan.me/file.tar.gz -O https://Vitan.me/newfile.tar.gz
    ```
## 恢复中断下载
命令
:   ```sh
    curl -C --O https://Vitan.me/file.tar.gz
    ```

## 使用代理
命令
:   - 如果有 proxy.yourdomain.com 端口 8080 的代理服务器，请执行此操作。
    ```sh
    curl -x proxy.yourdomain.com:8080 -U user:password -O https://Vitan.me/file.tar.gz
    ```

## 查询 HTTP 标头
命令
:   ```sh
     curl -I www.vitan.me
    ```
    - HTTP 标头允许远程Web服务器发送有关自身的其他信息以及实际请求。这为客户提供了有关如何处理请求的详细信息。

## 从 FTP 服务器下载文件
命令
:   ```sh
     curl -u username:password -O ftp://yourftpserver/yourfile.tar.gz
     ```
## 上传文件到 FTP 服务器
命令
:   ```sh
    curl -u username:password -T file.tar.gz ftp://ftpserver
    ```

## 限制下载速率
命令
:   ```sh
    curl --limit-rate 100K https://Vitan.me/file.tar.gz -O
    ```
