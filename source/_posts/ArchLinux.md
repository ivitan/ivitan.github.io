---
title: ArchLinux 安装记录
date: 2018-07-27 9:08:49
tags:
- Linux
- ArchLinux
categories: notes
icon:
- /images/ArchLinux.png
enable_unread_badge: true
---
# 准备
镜像
:	- [下载 ISO](https://www.archlinux.org/download/)
	- 使用 [Rufus](https://rufus.ie/) 烧录镜像
		- Linux 下推荐用 DD模式,开机选择烧录好的U盘进行引导
		```shell
		dd bs=4M if=/path/to/archlinux.iso of=/dev/sdX  status=progress && sync
		```

# 安装步骤
进行联网
:	1. 连接 WiFi
	```sh
wifi-menu
	```
	2. PPOE 连接
	```sh
	pppoe-setup
	```
	3. ADSL 连接
	```sh
	systemctl start adsl
	```
测试网络
:	```sh
	ping www.vitan.me
	```
## 同步时间
执行
:	```sh
	timedatectl set-ntp true
	```
## 更换国内源
将 China 开头一下两行剪切到 ustc 最上面
:	```sh
	vim /etc/pacman.d/mirrorlist
	```
	- 技巧(光标在 China 下，按2后 dd 最后 p 粘贴)

# 分区
方案
:	|分区|大小|类型|
	|:---|:---|:---|
	| /    | 75G  | linuxfilesystem |
	| home | 65G  | linuxfilesystem |
	|swap  | 8G   | Linux swap     |
	|boot  | 512M | EFI系统         |

## 建立 GPT 分区表
命令
:	```sh
	fdisk /dev/sdb #不同电脑设备不同,进入fdisk交互界面：
	g # 建立gpt分区表:
	n # 添加一个分区
	提示让输入开始扇区(一个扇区512B，按自己要分区容量大小进行计算)
	输入2048,回车
	让输入结束扇区，由于一个扇区512B，要创建200M的分区,应该输入：+200M；
	w 保存并退出；
	lsblk # 查看分区列表
	```
## MBR 分区
命令
:	```sh
	cfdisk /dev/sdb # 进入分区
	new # 新建分区，输入大小
	type # 选择分区属性
	write # 执行分区
	```

## 格式化
命令
:	```sh
	mkfs.vfat  /dev/sdax # efi分区  挂载在/mnt/boot/EFI
	mkfs.ext4  /dev/sdax # /,/home 两个分区
	mkswap -f /dev/sdax # 格式化swap
	swapon /dev/sdax  # swap分区
	```
挂载分区
:	```sh
	swapon /dev/sddb6 # swap 分区
	mount /dev/sdb3 /mnt # /分区
	mkdir /mnt/home
	mount /dev/sdb4 /mnt/home # home 分区
	mkdir /mnt/boot
	mkdir /mnt/boot/EFI
	mount /dev/sdb5 /mnt/boot/EFI # EFI 分区
	```

# 安装基本操作系统
## 安装系统
基础包
:	```sh
	pacstrap /mnt base # 基础包
	pacstrap /mnt base-devel # 开发基础包
	```

## 配置基础系统
生产 fstab
:	```sh
	genfstab -U /mnt >> /mnt/etc/fstab
	```
检查
:	```sh
	cat /mnt/etc/fstab
	```
## 切换到新系统
arch-chroot
:	```sh
	arch-chroot /mnt
	```

## 时区
设置时区
:	```sh
	ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
	```

硬件时间
:	```sh
	hwclock --systohc --utc
	```

## 语言设置
设置
:	```sh
	pacman -S vim
	vim  /etc/locale.gen
	# 反注释（删掉前面的#） en_US.UTF-8 UTF-8 zh_CN.UTF-8 UTF-8
	```
	- 生成 locale
	```sh
	locale-gen
	```
	- 设置 locale.conf
	```sh
	echo 'LANG=zh_CN.UTF-8'  > /etc/locale.conf
	```

## 无线网络链接
安装相关
:	```sh:
	pacman -S iw wpa_supplicant dialog
	```
	
## root 用户设置密码
命令
:	```sh
	passwd
	```
	- 添加用户
	```sh
	useradd -m -g users -s /bin/bash 用户名
	passwd 用户名 # 修改密码
	```
	- sudo 权限
	```sh
	nano /etc/sudoers
	```
	- 在 root ALL=(ALL) ALL 下面添加
	```sh
	用户名 ALL=(ALL) ALL
	```

## 安装微码
命令
:	```sh
	pacman -S intel-ucode
	```

## 安装引导程序（不能漏）
步骤
:	```sh
	pacman -S grub efibootmgr
	grub-install --target=x86_64-efi --efi-directory=/boot/EFI --bootloader-id=ArchLinux
	grub-mkconfig -o /boot/grub/grub.cfg
	```
## 退出 chroot 重启 (笔记本跳过)
步骤
:	```sh
	exit # 退回安装环境#
	umount -R  /mnt # 卸载新分区
	reboot # 重启
	```

## 网络配置(重启后)
有线连接
:	```sh
	systemctl enable dhcpcd
	```

无线连接：
:	```sh
	pacman -S iw wpa_supplicant dialog
	```

ADSL 宽带连接
:	```sh
	pacman -S rp-pppoe# pppoe-setup
	```

## 重启不能联网
重启 dhcpcd
:	```
	systemctl enable dhcpcd
	```
	- 继续输入 ip link
	- 发现名称是ens33的网卡state 是down状态
	```sh
	ip link set ens33 up(ifconfig ens33 up 也可以)
	```

# 安装桌面环境
## Gnome 桌面
执行
:	```sh
	pacman -S gnome #gnome桌面：
	pacman -S gnome-tweak-tool #安装gnome桌面优化工具
	pacman -S alacarte # 安装gnome桌面菜单编辑器
	systemctl enable gdm #启用gnome窗口管理器服务
	systemctl enable NetworkManager # 启用网络管理器服务
	reboot
	```

## Deepin 桌面
执行
:	```sh
	pacman -S deepin
	pacman -S deepin-extra
	pacman S bash-completion
	pacman -S networkmanager
	systemctl enable NetworkManager # 注意大小写
	systemctl start NetworkManager
	```
	- 编辑
	```
	vim /etc/lightdm/lightdm.conf
	```
	- 修改如下
	```sh
	greeter-session=lightdm-deepin-greeter
	```
	- 执行
	```sh
	systemctl enable lightdm.service
	```

## KDE Plasma 桌面
步骤
:	```sh
	pacman -S xorg
	pacman -S xf86-input-synaptics
	pacman -S ttf-dejavu wqy-microhei # 字体
	pacman -S plasma kde-applications
	systemctl enable sddm # 启用 sddm 显示管理器
	pacman -S NetworkManager net-tools
	systemctl enable NetworkManager # 启用网络管理
	systemctl enable dhcpcd
	pacman -S kde-l10n-zh_cn # KDE 中文包
	```

# 后续优化
## 包源
配置源
:	```sh
	sudo vim /etc/pacman.conf
	```
	1. 首先去掉 multilib 中两行的注释
	2. 在文档结尾处加入
	```sh
	[archlinuxcn]
	SigLevel = Optional TrustAll
	Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
	```
	- 保存退出
	- 刷新pacman数据库
	```sh
	sudo pacman -Syy
	```
## 驱动
### 声卡
安装
:	```sh
	pacman -S alsautils pulseaudio pulseaudio-alsa
	```

### 显卡
安装
:	```sh
	pacman -S nvidia
	pacman -S nvidia-settings
	```

启动管理器编辑脚本(Plasma 桌面有效)
:	```sh
	vim /usr/share/sddm/scripts/Xsetup
	```
	- 添加
	```sh
	xrandr --setprovideroutputsource modesetting NVIDIA-0
	xrandr --auto
	```
	- 重启
	```sh
	reboot
	```
获取显卡 PCI 地址
:	```sh
	ispci | grep -E "VGA|3D"
	```
地址转换
:	```sh
	01:00.0 --> 1:0:0 # 转换示例
	```
配置 xorg.conf
:	```sh
	sudo vim /etc/X11/xorg.conf
	# 确保 xorg 已安装
	```
	- 添加
	```sh
	Section "Module"
		Load "modesetting"
	EndSection

	Section "Device"
		Identifier "nvidia'"
		Driver "nvidia"
		BusID "1:0:0"
		Option "AllowEmptyInitialConfiguration"
	EndSection
	```
## 输入法
安装
:	```sh
	sudo pacman -S fcitx fcitx-configtool
	sudo pacman -S fcitx-gtk2 fcitx-gtk3 fcitx-qt4 fcitx-qt5
	sudo pacman -S fcitx-sogoupinyin
	```
配置
:	```sh
 	vim ~/.xprofile
 	```
	- 添加
	```sh
	export GTK_IM_MODULE=fcitx
	export QT_IM_MODULE=fcitx
	export XMODIFIERS="@im=fcitx"
	```
	- 桌面环境比较特殊，可能需要在 /etc/environmenet 后方也加入
	```sh
	export GTK_IM_MODULE=fcitx
	export QT_IM_MODULE=fcitx
	export XMODIFIERS="@im=fcitx"
	```

安装输入法
:	```sh
	sudo pacman -S fcitx-sogoupinyin
	```
		- 可选
		1. fcitx-cloudpinyin 
		2. fcitx-googlepinyin 
		3. fcitx-libpinyin 
		4. fcitx-sunpinyin
		5. fcitx-sogoupinyin

## 安装 yay 使用 aur
执行
:	```sh
	sudo pacman -S yay
	```
	- 以后可以使用 yay 安装aur中的软件了, yay 跟 pacman 使用方法一样.


---
**参考**
- [ArchLinux安装图文教程](https://blog.csdn.net/r8l8q8/article/details/76516523)
- [ArchLinux安装deepin桌面/常用软件流程文档](http://www.bilibili.com/read/cv123034)
