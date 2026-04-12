---
title: Termux Install OpenClaw
date: 2026-04-12 16:44:01
tags:
- Termux
- Linux
- Android
categories:
- Diary
---
# Termux 安装 OpenClaw（龙虾）
## 获取存储权限
```BASH
termux-setup-storage 
```
## 脚本执行
```BASH
curl -O https://raw.githubusercontent.com/iyeoh88-svg/openclaw-android/main/install.sh
chmod +x install.sh
./install.shˋ
```
## 进入与配置
### 进入系统
```、BASH
proot-distro login debian --user openclaw 
```
### 配置聊天软件
```、BASH
openclaw onboard
```

### 启动网关
```BASH
openclaw gateway --verbose 
```
### 获取Token
新建Termux会话，执行
```BASH
 openclaw dashboard
  ```
  获取如：`http://localhost:18789/#token=xxx` 的地址后再次启动
  `start-claw`访问
