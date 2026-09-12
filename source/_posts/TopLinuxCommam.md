---
title: Linux 高频命令
date: 2026-09-11 11:15:52
tags:
- Linux
categories:
- Linux
---
# Linux 高频命令

## 📄 文件查看和处理命令

| 常用命令 | 作用 |
| :--- | :--- |
| `cat file1` | 查看文件内容 |
| `cat -n file1` | 查看内容并标示行数 |
| `tac file1` | 从最后一行开始反向查看文件内容 |
| `head -2 file1` | 查看文件前两行 |
| `tail -2 file1` | 查看文件后两行 |
| `tail -f /log/msg` | 实时查看文件新增内容 |
| `more file1` | 分页查看长文件内容（仅支持正向翻页） |
| `less file1` | 分页查看长文件内容（支持正反双向翻页） |
| `grep code hello.txt` | 在文件hello.txt中查找关键词code |
| `grep ^sheep hello.txt` | 在文件hello.txt中查找以sheep开头的内容 |
| `grep [0-9] hello.txt` | 选择hello.txt文件中所有包含数字的行 |
| `sed 's/s1/s2/g' hello.txt` | 将hello.txt文件中的s1替换成s2 |
| `sed -e 's/s1//g' hello.txt` | 从文档中删除词汇s1并保留剩余内容 |
| `sed '/^$/d' hello.txt` | 从hello.txt文件中删除所有空白行 |
| `sed '/ *#/d; /^$/d' hello.txt` | 从hello.txt文件中删除所有注释和空白行 |
| `sed -e '1d' hello.txt` | 排除文件第一行输出内容 |
| `sed -n '/s1/p' hello.txt` | 查看只包含关键词"s1"的行 |
| `sed -e 's/ *$//' hello.txt` | 删除每一行最后的空白字符 |
| `sed -n '1,5p;5q' hello.txt` | 查看文件第1到第5行内容 |
| `sed -n '5p;5q' hello.txt` | 查看文件第5行内容 |
| `cat xxx.txt \| awk 'NR%2==1'` | 查看文件奇数行（已补全缺失的管道符） |
| `paste file1 file2` | 合并两个文件的内容（按行拼接） |
| `paste -d '+' file1 file2` | 合并两个文件的内容，中间用"+"区分 |
| `sort file1 file2` | 排序两个文件的内容 |
| `sort file1 file2 \| uniq` | 排序并去重（已补全缺失的管道符） |
| `sort file1 file2 \| uniq -u` | 排序并只显示唯一的行 |
| `sort file1 file2 \| uniq -d` | 排序并只显示重复的行 |
| `comm -1 file1 file2` | 比较两个文件，去除file1独有的内容 |
| `comm -2 file1 file2` | 比较两个文件，去除file2独有的内容 |
| `comm -3 file1 file2` | 比较两个文件，去除两文件共有的内容 |

## 🌐 网络和进程管理命令

| 常用命令 | 作用 |
| :--- | :--- |
| `ifconfig` | 查看网络接口属性 |
| `ifconfig eth0` | 查看eth0网卡的配置 |
| `ifconfig eth0 192.168.1.1 netmask 255.255.255.0` | 配置eth0静态IP地址 |
| `dhclient eth0` | 以DHCP模式启用eth0 |
| `ifup eth0` | 启用eth0网络设备 |
| `ifdown eth0` | 禁用eth0网络设备 |
| `route -n` | 查看路由表 |
| `route add -net 0/0 gw Gateway_IP` | 配置默认网关 |
| `route add -net 192.168.0.0 netmask 255.255.0.0 gw 192.168.1.1` | 配置静态路由到达192.168.0.0/16网络 |
| `route del 0/0 gw Gateway_IP` | 删除静态路由 |
| `netstat -lntp` | 查看所有监听端口 |
| `netstat -antp` | 查看已经建立的TCP连接 |
| `netstat -lutp` | 查看TCP/UDP的状态信息 |
| `iptables -L` | 查看iptables规则 |
| `hostname` | 查看主机名 |
| `host www.ivitan.cn` | 解析主机名对应的IP |
| `nslookup www.ivitan.cn` | 查询DNS记录，验证域名解析是否正常 |
| `ps -ef` | 查看所有进程 |
| `ps -ef \| grep vitan` | 查找特定进程（已补全缺失的管道符） |
| `kill -s name` | 按进程名终止指定进程 |
| `kill -s pid` | 按进程ID终止指定进程 |
| `top` | 实时显示进程状态与系统资源占用 |
| `vmstat 1 20` | 每1秒采集一次系统状态，共采集20次 |
| `iostat` | 查看磁盘IO读写与CPU使用情况 |
| `sar -u 1 10` | 查询CPU使用情况（1秒一次，共10次） |
| `sar -d 1 10` | 查询磁盘性能（1秒一次，共10次） |

## 💽 磁盘和分区命令

| 常用命令 | 作用 |
| :--- | :--- |
| `fdisk -l` | 查看所有磁盘分区 |
| `swapon -s` | 查看所有交换分区 |
| `df -h` | 查看磁盘使用情况及挂载点（易读格式） |
| `df -hl` | 同上 |
| `du -sh /dir` | 查看指定目录的总大小 |
| `du -sk * \| sort -rn` | 降序显示当前目录下文件大小（已补全缺失的管道符） |
| `mount /dev/hda2 /mnt/hda2` | 挂载hda2分区到指定目录 |
| `mount -t ntfs /dev/sdc1 /mnt/usbhd1` | 挂载NTFS格式的磁盘分区 |
| `mount -o loop xxx.iso /mnt/cdrom` | 挂载ISO镜像文件 |
| `mount /dev/sda1 /mnt/usbdisk` | 挂载USB闪存设备 |
| `umount -v /dev/sda1` | 通过设备名卸载磁盘 |
| `umount -v /mnt/mymnt` | 通过挂载点卸载磁盘 |
| `fuser -km /mnt/hda1` | 强制卸载磁盘（慎用，会强制终止占用进程） |

## 📊 系统信息和性能查看命令

| 常用命令 | 作用 |
| :--- | :--- |
| `uname -a` | 查看内核/OS/CPU信息 |
| `uname -r` | 查看内核版本 |
| `uname -m` | 查看处理器架构 |
| `arch` | 查看处理器架构 |
| `hostname` | 查看计算机名 |
| `cat /proc/version` | 查看linux版本信息 |
| `cat /proc/cpuinfo` | 查看CPU详细信息 |
| `grep MemTotal /proc/meminfo` | 查看内存总量 |
| `grep MemFree /proc/meminfo` | 查看空闲内存量 |
| `free -m` | 查看内存用量和交换区用量（单位MB） |
| `cat /proc/interrupts` | 查看系统中断信息 |
| `cat /proc/loadavg` | 查看系统负载 |
| `uptime` | 查看系统运行时间、在线用户数、负载 |
| `env` | 查看系统的环境变量 |
| `lsusb -tv` | 查看系统USB设备信息 |
| `lspci -tv` | 查看系统PCI设备信息 |
| `lsmod` | 查看已加载的系统模块 |
| `who` | 显示当前登录系统的用户 |
| `who am i` | 显示当前用户登录时的用户名 |
| `whoami` | 显示当前用户名 |
| `date` | 显示系统日期时间 |
| `cal 2021` | 显示2021年日历表 |

## 🛠️ 系统服务命令

| 常用命令 | 作用 |
| :--- | :--- |
| `chkconfig --list` | 列出系统服务 |
| `service <服务名> status` | 查看某个服务（低版本Linux系统适用） |
| `systemctl status <服务名>` | 查看某个服务（systemd架构系统标准工具） |
| `service <服务名> start` | 启动某个服务（低版本Linux系统适用） |
| `systemctl start <服务名>` | 启动某个服务（systemd架构系统标准工具） |
| `service <服务名> stop` | 终止某个服务（低版本Linux系统适用） |
| `systemctl stop <服务名>` | 终止某个服务（systemd架构系统标准工具） |
| `service <服务名> restart` | 重启某个服务（低版本Linux系统适用） |
| `systemctl restart <服务名>` | 重启某个服务（systemd架构系统标准工具） |
| `systemctl enable <服务名>` | 开启服务自启动 |
| `systemctl disable <服务名>` | 关闭服务自启动 |

## 📦 打包和解压命令

| 常用命令 | 作用 |
| :--- | :--- |
| `zip xxx.zip file` | 压缩至zip包 |
| `zip -r xxx.zip file1 file2 dir1` | 将多个文件+目录压成zip包 |
| `unzip xxx.zip` | 解压zip包 |
| `tar -cvf xxx.tar file` | 创建非压缩tar包 |
| `tar -cvf xxx.tar file1 file2 dir1` | 将多个文件+目录打tar包 |
| `tar -tf xxx.tar` | 查看tar包的内容 |
| `tar -xvf xxx.tar` | 解压tar包 |
| `tar -xvf xxx.tar -C /dir` | 将tar包解压至指定目录 |
| `gzip filename` | 压缩文件 |
| `gzip -9 filename` | 最大程度压缩文件 |
| `gunzip xxx.gz` | 解压gzip压缩包 |
| `tar -cvfz xxx.tar.gz dir` | 创建gzip压缩包 |
| `tar -zxvf xxx.tar.gz` | 解压gzip压缩包 |
| `bzip2 filename` | 压缩文件 |
| `bunzip2 xxx.bz2` | 解压bz2压缩包 |
| `tar -cvfj xxx.tar.bz2 dir` | 创建bz2压缩包 |
| `tar -jxvf xxx.tar.bz2` | 解压bz2压缩包 |

## 👥 用户和用户组命令

| 常用命令 | 作用 |
| :--- | :--- |
| `groupadd group_name` | 创建用户组 |
| `groupmod -n new_name old_name` | 重命名用户组 |
| `groupdel group_name` | 删除用户组 |
| `useradd codesheep` | 创建用户 |
| `usermod -g group_name user_name` | 修改用户的主组 |
| `usermod -aG group_name user_name` | 将用户添加到附加组 |
| `usermod -s /bin/ksh -d /home/codepig -g dev codesheep` | 修改用户codesheep的登录Shell、主目录以及主组 |
| `userdel -r codesheep` | 删除用户（同步删除主目录） |
| `groups test` | 查看test用户所在的组 |
| `su - user_name` | 完整切换到目标用户环境 |
| `passwd` | 修改当前用户口令 |
| `passwd codesheep` | 修改指定用户的口令 |
| `w` | 查看活动用户 |
| `id codesheep` | 查看指定用户信息 |
| `last` | 查看用户登录日志 |
| `crontab -l` | 查看当前用户的计划任务 |
| `cut -d: -f1 /etc/passwd` | 查看系统所有用户 |
| `cut -d: -f1 /etc/group` | 查看系统所有组 |

## ⚡ 关机/重启/注销命令

| 常用命令 | 作用 |
| :--- | :--- |
| `shutdown -h now` | 即刻关机 |
| `shutdown -h 10` | 10分钟后关机 |
| `shutdown -h 11:00` | 11:00定时关机 |
| `shutdown -h +10` | 10分钟后关机 |
| `shutdown -c` | 取消预定的关机/重启任务 |
| `shutdown -r now` | 立即重启 |
| `shutdown -r 10` | 10分钟之后重启 |
| `shutdown -r 11:00` | 11:00定时重启 |
| `reboot` | 立即重启 |
| `init 6` | 重启 |
| `init 0` | 立刻关机 |
| `telinit 0` | 关机 |
| `poweroff` | 立刻关机 |
| `halt` | 关机 |
| `sync` | 将内存buff数据同步到磁盘 |
| `logout` | 退出当前登录Shell |

## 📥 包管理命令

### RPM 包管理（RedHat系发行版通用基础命令）

| 常用命令 | 作用 |
| :--- | :--- |
| `rpm -qa` | 查看已安装的rpm包 |
| `rpm -q pkg_name` | 查询指定rpm包 |
| `rpm -qf filename` | 查看某个文件属于哪个包 |
| `rpm -qi pkg_name` | 查看包的详细信息 |
| `rpm -ql pkg_name` | 查看包安装了哪些文件 |
| `rpm -qc pkg_name` | 查看已安装rpm包提供的配置文件 |
| `rpm -qd pkg_name` | 查询包提供的文档 |
| `rpm -q --whatprovides xxx` | 显示xxx功能由哪个包提供 |
| `rpm -q --whatrequires xxx` | 显示xxx功能被哪个程序包依赖 |
| `rpm -qR pkg_name` | 查询包的依赖关系 |
| `rpm -q --changelog xxx` | 显示xxx包的更改记录 |
| `rpm -ivh xxx.rpm` | 安装rpm包 |
| `rpm -ivh --test xxx.rpm` | 测试安装rpm包 |
| `rpm -ivh --nodeps xxx.rpm` | 安装rpm包时忽略依赖关系 |
| `rpm -Uvh pkg_name` | 升级rpm包（未安装则自动安装） |
| `rpm -Fvh pkg_name` | 升级已安装的rpm包 |
| `rpm -e xxx` | 卸载程序包 |
| `rpm -V pkg_name` | RPM包详细信息校验 |

### YUM 包管理（RedHat系发行版：CentOS、RHEL等适用）

| 常用命令 | 作用 |
| :--- | :--- |
| `yum repolist enabled` | 显示可用的源仓库 |
| `yum search pkg_name` | 搜索软件包 |
| `yum list` | 显示所有程序包 |
| `yum list installed` | 查看当前系统已安装包 |
| `yum list updates` | 查看可以更新的包列表 |
| `yum check-update` | 查看可升级的软件包 |
| `yum install pkg_name` | 下载并安装软件包（自动处理依赖） |
| `yum install --downloadonly pkg_name` | 只下载软件包不安装 |
| `yum update` | 更新所有软件包 |
| `yum update pkg_name` | 升级指定软件包 |
| `yum deplist pkg_name` | 列出软件包依赖关系 |
| `yum remove pkg_name` | 删除软件包 |
| `yum clean all` | 清除所有缓存 |
| `yum clean packages` | 清除缓存的软件包 |
| `yum clean headers` | 清除缓存的header |

### DPKG 包管理（Debian系发行版通用基础命令）

| 常用命令 | 作用 |
| :--- | :--- |
| `dpkg -l` | 查看系统中已安装deb包 |
| `dpkg -l pkg_name` | 显示包的大致信息 |
| `dpkg -s pkg_name` | 查看包的详细信息 |
| `dpkg -L pkg_name` | 查看deb包安装的文件 |
| `dpkg -c xxx.deb` | 列出deb包的内容 |
| `dpkg --unpack xxx.deb` | 解开deb包的内容 |
| `dpkg -i xxx.deb` | 安装或更新deb包（需手动解决依赖） |
| `dpkg -r pkg_name` | 移除deb包（保留配置） |
| `dpkg -P pkg_name` | 移除deb包且不保留配置 |

### APT 软件工具（Debian系发行版：Ubuntu、Debian等适用）

| 常用命令 | 作用 |
| :--- | :--- |
| `apt-cache search pkg_name` | 搜索程序包 |
| `apt-cache show pkg_name` | 获取包的概览信息 |
| `apt-get update` | 更新包索引信息 |
| `apt-get install pkg_name` | 安装/升级软件包（自动处理依赖） |
| `apt-get upgrade` | 更新已安装软件包 |
| `apt-get remove pkg_name` | 卸载软件（不包括配置） |
| `apt-get purge pkg_name` | 卸载软件（包括配置） |
| `apt-get clean` | 清理缓存 |

## 💡 核心注意事项

* **命令版本适配**：`service`命令多用于低版本Linux系统，`systemctl`是systemd架构系统的标准服务管理工具，需根据系统版本选择。
* **包管理体系差异**：
  * RPM/YUM体系适用于RedHat系发行版（CentOS、RHEL等），DPKG/APT体系适用于Debian系发行版（Ubuntu、Debian等），二者命令不互通。
  * YUM/APT可自动处理包依赖，RPM/DPKG基础命令需手动解决依赖问题，复杂环境建议使用上层工具。
* **高风险操作提示**：强制卸载磁盘、kill进程、删除系统包类命令执行前需确认操作对象，避免误删核心组件导致业务受损。
* **性能排查技巧**：`vmstat`、`iostat`、`sar` 三类命令搭配使用可实现系统性能的多维度全面排查。
* **日常优化建议**：定期执行包管理缓存清理命令。
Linux_Commands_CheatSheet.md
目前显示的是“Linux_Commands_CheatSheet.md”。