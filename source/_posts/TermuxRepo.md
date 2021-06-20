---
title: Termux 的 Bintray 库已关闭，解决办法
tags:
  - Linux
  - Termux
categories:
  - Diary
author:
  - Vitan
toc: true
date: 2021-06-20 15:18:28
---
Bintray 库已关闭，如何解决？

<!--more-->
# 问题
由于 Bintray 库已关闭，所以安装是提示 403

```
Ign:2 https://dl.bintray.com/grimler/game-packages-24 games InRelease
Ign:3 https://dl.bintray.com/grimler/science-packages-24 science InRelease
Err:4 https://dl.bintray.com/grimler/game-packages-24 games Release
  403  Forbidden
Err:5 https://dl.bintray.com/grimler/science-packages-24 science Release
  403  Forbidden
Get:1 https://grimler.se/termux-packages-24 stable InRelease [13.1 kB]
Get:6 https://grimler.se/termux-packages-24 stable/main all Packages [21.6 kB]
Get:7 https://grimler.se/termux-packages-24 stable/main aarch64 Packages [269 kB]
Reading package lists... Done
E: The repository 'https://dl.bintray.com/grimler/game-packages-24 games Release' does not have a Release file.
N: Metadata integrity can't be verified, repository is disabled now.
N: Possible cause: repository is under maintenance or down (wrong sources.list URL?).
E: The repository 'https://dl.bintray.com/grimler/science-packages-24 science Release' does not have a Release file.
N: Metadata integrity can't be verified, repository is disabled now.
N: Possible cause: repository is under maintenance or down (wrong sources.list URL?).
```

# 解决办法

## 换源清华

```
termux-change-repo
```

## 更新缓存

```
apt upgrade
pkg upgrade
```