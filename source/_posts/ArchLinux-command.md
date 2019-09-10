---
title: ArchLinux Pacman 命令
date: 2018-07-30 12:23:09
tags:
  - Linux
  - ArchLinux
categories:
  - notes
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/ArchLinux.png
---
pacman 软件包管理器
<!--more-->
# 使用
## 安装指定的包
安装或者升级单个软件包，或者一列软件包（包含依赖包）
```bash
pacman -S package_name1 package_name2 ...
```

用正则表达式安装多个软件包
```bash
pacman -S $(pacman -Ssq package_regex)
```
- [pacman/Tips and tricks](https://wiki.archlinux.org/index.php/Pacman/Tips_and_tricks)

选择仓库按照
```bash
pacman -S extra/package_name
```

安装多个含有相似名称的软件包，而并非整个包组或全部匹配的软件包
```bash
pacman -S plasma-{desktop,mediacenter,nm}
```

多层扩展
```bash
pacman -S plasma-{workspace{,-wallpapers},pa}
```

安装包组
```bash
pacman -S gnome
```
- [包组](https://wiki.archlinux.org/index.php/Creating_packages#Meta_packages_and_groups)


## 删除软件包
删除但保留依赖关系
```bash
pacman -R package_name
```

删除指定软件包，及其所有没有被其他已安装软件包使用的依赖关系
```bash
pacman -Rs package_name
```

删除软件包和所有依赖
```bash
pacman -Rsc package_name
```

删除但不删除依赖这个软件包的其他程序
```bash
pacman -Rdd package_name
```

## 升级软件包
升级整个系统
```bash
pacman -Syu
```

## 查询包数据库
1. pacman 使用 -Q 参数查询本地软件包数据库
```bash
pacman -Q --help
```

2. 使用 -S 参数来查询远程同步的数据库
```bash
pacman -S --help
```

3. pacman 可以在包数据库中查询软件包，查询位置包含了软件包的名字和描述
```bash
pacman -Ss string1 string2 ...
```

4. 有时，-s的内置正则会匹配很多不需要的结果，所以应当指定仅搜索包名，而非描述或其他子段，下面的命令就会返回很多不必要结果
```bash
pacman -Ss '^vim-'
```

5. 要查询已安装的软件包：
```bash
pacman -Qs string1 string2 ...
```
  
6. 按文件名查找软件库：
```bash
pacman -Fs string1 string2 ...
```
7. 显示软件包的详尽的信息：
```bash
pacman -Si package_name
```

8. 查询本地安装包的详细信息：
```bash
pacman -Qi package_name
```

9. 使用两个 -i 将同时显示备份文件和修改状态：
```bash
pacman -Qii package_name
```

10. 要获取已安装软件包所包含文件的列表：
```bash
pacman -Ql package_name
```

11. 查询远程库中软件包包含的文件：
```bash
pacman -Fl package_name
```

11. 检查软件包安装的文件是否都存在：
```bash
pacman -Qk package_name
```

12. 两个参数k将会执行一次更彻底的检查。 查询数据库获取某个文件属于哪个软件包：
```bash
pacman -Qo /path/to/file_name
```

13. 查询文件属于远程数据库中的哪个软件包：
```bash
pacman -Fo /path/to/file_name
```

14. 要罗列所有不再作为依赖的软件包(孤立orphans)：
```bash
pacman -Qdt
```

15. 要罗列所有明确安装而且不被其它包依赖的软件包：
```bash
pacman -Qet
```

16. 要显示软件包的依赖树：
```bash
pactree package_name
```

17. 检查一个安装的软件包被那些包依赖，可以使用 pkgtoolsAUR中的whoneeds:
```bash
whoneeds package_name
```
- 或者pactree中使用-r:
```bash
pactree -r package_name
```

## 数据库结构
pacman数据库通常位于 `/var/lib/pacman/sync`. 对于每一个在 `/etc/pacman.conf` 中指定的软件仓库， 这里都有一个一致的数据库。数据库文件夹里每个 `tar.gz` 文件都包含着一个仓库的软件包信息。例如which 包:
```
  % tree which-2.20-6
  which-2.20-6
  |-- depends
  `-- desc
```
- 这个 depends 项列出了该软件的依赖包， 而desc有该包的介绍，例如文件大小和MD5值 。

## 清理软件包缓存
 pacman 将下载的软件包保存在 `/var/cache/pacman/pkg/` 并且不会自动移除旧的和未安装版本的软件包，因此需要手动清理，以免该文件夹过于庞大。

使用内建选项即可清除未安装软件包的缓存：
```bash
pacman -Sc
```

- pacman 提供的 paccache 命令默认会删除近3个版本前的软件包

```bash
paccache -r
```
- Tip: 可以使用 pacman hooks 自动执行清理，这里是[参考示例](https://bbs.archlinux.org/viewtopic.php?pid=1694743#p1694743)。
- 也可以自己设置保留最近几个版本：

```bash
paccache -rk 1
```
清理所有未安装包的缓存文件
```bash
paccache -ruk0
```

# 其它命令
升级系统时安装其他软件包：
```bash
pacman -Syu package_name1 package_name2 ...
```

下载包而不安装它：
```bash
pacman -Sw package_name
```
安装一个本地包(不从源里下载）：
```
pacman -U /path/to/package/package_name-version.pkg.tar.xz
```

要将本地包保存至缓存，可执行：
```bash
pacman -U file://path/to/package/package_name-version.pkg.tar.xz
```

安装一个远程包（不在 pacman 配置的源里面）
```sh
pacman -U http://www.example.com/repo/example.pkg.tar.xz
```
- 要禁用 `-S`, `-U` 和 `-R` 动作，可以使用 `-p` 选项.

---
**Via**
- [Pacman](https://wiki.archlinux.org/index.php/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
