---
title: 低配服务器极简 Docker 容器部署笔记
date: 2026-04-28 21:15:42
tags:
- Linux
- Docker
- Web
categories:
- Diary
---

# 🚀 低配服务器极简部署笔记 (Moontvplus & OpenList)

## 一、环境准备

- 系统: Ubuntu 22.04 LTS (纯净版)
- 硬件: 2 vCPU / 900MB RAM / 30GB Disk
- 关键策略: 开启 Swap 虚拟内存、全 Docker 化、Nginx 反向代理、自动化 SSL。

  

## 二、核心部署步骤

### 1. 开启 2GB 虚拟内存

- 防止内存溢出导致容器崩溃。

```Bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 2. 安装基础环境
```Bash
sudo apt update && sudo apt upgrade -y
sudo apt install docker.io nginx python3-certbot-nginx -y
sudo systemctl enable --now docker nginx
```
### 3. 部署 Moontvplus (Upstash 云数据库版)
```Bash
sudo docker run -d --name orangetv --restart always \
  --log-opt max-size=5m --log-opt max-file=1 \
  -p 3000:3000 \
  -e USERNAME="admin" \
  -e PASSWORD="你的密码" \
  -e NEXT_PUBLIC_STORAGE_TYPE="upstash" \
  -e UPSTASH_URL="你的URL" \
  -e UPSTASH_TOKEN="你的TOKEN" \
   ghcr.io/mtvpls/moontvplus:latest
```

### 4. 部署 OpenList

- **注意：** 必须先处理目录权限，否则会报 502/Restarting 错误。
```Bash
# 创建目录并赋予权限
sudo mkdir -p /opt/openlist/data
sudo chmod -R 777 /opt/openlist/data

# 部署容器
sudo docker run -d --name openlist --restart always --user root \
  --log-opt max-size=5m --log-opt max-file=1 \
  -p 5244:5244 \
  -v /opt/openlist/data:/opt/openlist/data \
  -e PUID=0 -e PGID=0 -e TZ="Asia/Shanghai" \
  openlistteam/openlist:latest

# 重置 admin 密码命令
sudo docker exec -it openlist ./openlist admin set 你的新密码
```
## 三、网络与安全配置

### 1. Nginx 反向代理
- 创建配置

```Bash
sudo nano /etc/nginx/sites-available/media_srv`
```
```Nginx
server {
    listen 80;
    server_name tv.xxx.com; # 替换域名
    location / {
        proxy_pass http://127.0.0.1:3000;
        include proxy_params;
    }
}
server {
    listen 80;
    server_name pan.xxx.com; # 替换域名
    location / {
        proxy_pass http://127.0.0.1:5244;
        include proxy_params;
        client_max_body_size 0;
    }
}
```


- 启用配置

```Bash
sudo ln -s /etc/nginx/sites-available/media_srv /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```
### 2. 自动化 SSL 证书
```Bash
sudo certbot --nginx -d tv.xxx.com -d pan.xxx.com
# 过程中选择数字 "2" 以开启自动重定向 HTTPS
```

## 四、常用维护命令

|任务|命令|
|:--|:--|
|查看容器状态|docker ps|
|实时查看内存|docker stats
|查看系统资源|  free -h  |
|清理冗余镜像|docker system prune -f|
|测试证书续期|sudo certbot renew --dry-run|

## 五、避坑总结

1.  **权限问题**：OpenList 必须对挂载目录有写入权限，使用 `chmod 777` 和 `--user root` 是低配环境最稳妥方案。
2.  **502 错误**：通常是后端容器处于 `Restarting` 状态，请检查 `docker logs openlist`。
3.  **域名解析**：必须确保 GCP 防火墙已放行 80/443 端口，且域名 A 记录已生效。


## 六、更新容器镜像

### 1. 拉取最新镜像

```Bash
sudo docker pull ghcr.io/mtvpls/moontvplus:latest

```

### 2. 删除旧容器

```Baah
sudo docker pull ghcr.io/mtvpls/moontvplus:latest
```

### 3. 用同样的参数重新启动

```Bash
sudo docker run -d --name moontv-core \
  --restart on-failure \
  --log-opt max-size=5m --log-opt max-file=1 \
  -p 3000:3000 \
  -e USERNAME="admin" \
  -e PASSWORD="你的密码" \
  -e NEXT_PUBLIC_STORAGE_TYPE="upstash" \
  -e UPSTASH_URL="你的URL" \
  -e UPSTASH_TOKEN="你的TOKEN" \
  ghcr.io/mtvpls/moontvplus:latest
```

### 4. 🧹 更新后的清理

```Bash
sudo docker image prune -f
```



