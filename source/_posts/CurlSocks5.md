---
title: Terminal Socks5 Proxy
date: 2019-05-14 22:17:52
tags:
  - Linux
categories:
  - notes
author:
  - Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Linux.png
---
Some Socks5 Proxy setting
<!--more-->
# Git
```bash
  git config --global http.proxy socks5://127.0.0.1:1080
  git config --global https.proxy socks5://127.0.0.1:1080
  git config --global --unset http.proxy
  git config --global --unset https.proxy
```

# Curl
```bash .curlrc
echo 'socks5 = "127.0.0.1:1080"' >> ~/.curlrc
```

- ALL_PROXY
```bash
export ALL_PROXY=socks5://127.0.0.1:1080
```

# Wget
```bash EVN Config
 xport http_proxy=http://127.0.0.1:1080
 xport http_proxy=httpS://127.0.0.1:1080
 ```
## .wgetrc
```bash ~/.wgetrc
https_proxy = http://127.0.0.1:8087/
http_proxy = http://127.0.0.1:8087/
ftp_proxy = http://127.0.0.1:8087/

# If you do not want to use proxy at all, set this to off.
use_proxy = on
```
-e
```bash
wget -c -r -np -k -L -p -e "http_proxy=http://127.0.0.1:1080" url
```

# Pip
```bash
sudo pacman -S proxychains
```
- vim /etc/proxychains.conf
```bash /etc/proxychains.conf
[ProxyList]
socks5  127.0.0.1 1080
```
- usage
```bash
proxychains pip install <package_name>
```

---
**参考**
- [为wget使用代理](https://my.oschina.net/u/2306127/blog/791258)
