---
title: ArchLinux 安装及优化
date: 2018-07-27 9:08:49
tags:
- Linux
- ArchLinux
categories: Linux
toc: true
top: 102
---
> ArchLinux 安装及优化配置。

# 准备镜像
[下载 ISO](https://www.archlinux.org/download/) 并使用 [Rufus](https://rufus.ie/) 或其他工具烧录镜像制作启动盘。Linux 下推荐用 DD 模式,开机选择烧录好的U盘进行引导进入安装。

```sh
dd bs=4M if=/home/download/archlinux.iso of=/dev/sdX  status=progress && sync
```
<!--more-->

# 安装
## 进行联网
- WiFi 连接 

```sh
wifi-menu
```

- PPOE 连接

```sh
pppoe-setup
```

- ADSL 连接

```sh
systemctl start adsl
```

- 测试网络

```sh
ping www.vitan.me
```

## 更新系统时钟
```sh
timedatectl set-ntp true
```

## 更换国内源
将 China 开头一下两行剪切到 ustc 最第一行，技巧(光标在 China 下，按2后 dd 最后 p 粘贴)
```sh
vim /etc/pacman.d/mirrorlist
```

##  分区
### 分区方案

|分区|大小|类型|
|:---|:---|:---|
|boot  | 512M | EFI System        |
|swap  | 8G   | Linux Swap      |
| /    | 75G  | Linux filesystem |
| home | 65G  | Linux Homme |

### 查看启动模式
```sh
ls /sys/firmware/efi/efivars
```
如果提示不存在这个文件，那就说明我们的启动模式是 BIOS，否则就是 UEFI。BIOS 和 UEFI 的分区会有点不同，老铁们请移步查看 [archlinux wiki](https://wiki.archlinux.org/index.php/Installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

### MBR 分区(BIOS 分区)
```sh
cfdisk /dev/sdb # 进入分区
new # 新建分区，输入大小
type # 选择分区属性
write # 执行分区
```

### GPT 分区(UEFI 分区)
```sh
gdisk /dev/sdb #不同电脑设备不同
g # 建立gpt分区表:
n # 添加一个分区
提示让输入开始扇区(一个扇区512B，按自己要分区容量大小进行计算)
输入2048,回车
让输入结束扇区，由于一个扇区512B，要创建200M的分区,应该输入：+200M；
w 保存并退出；
lsblk # 查看分区列表
```

## 格式化
```sh
mkfs.vfat /dev/sdb1 # EFI分区  挂载在/mnt/boot/EFI
mkswap -f /dev/sdb2 # 格式化 swap
swapon /dev/sdb2  # swap分区
mkfs.ext4 /dev/sdb3 # /分区
mkfs.ext4 /dev/sdb4 # /home 分区
```

## 挂载分区
### BIOS 引导
```sh
mount /dev/sdb3 /mnt # 根分区挂载到 /mnt 目录
mkdir /mnt/home
mount /dev/sdb4 /mnt/home # home 分区
mkdir /mnt/boot # 在 /mnt 目录下新建 boot目录
mount /dev/sdb1 /mnt/boot #将boot分区挂载在刚创建的/mnt/boot目录
```

### UEFI 引导
```sh
mount /dev/sdb3 /mnt # /分区
mkdir /mnt/home
mount /dev/sdb4 /mnt/home # home 分区
mkdir -p /mnt/boot
mount /dev/sdb1 /mnt/boot # EFI 分区
```

## 安装基本操作系统
### 配置软件源
将清华源移到第一行

```sh
vim /etc/pacman.d/mirrorlist
```
更新源
```sh
pacman -Syy
```

### 基础包
安装系统到 `/dev/sdb2` 即挂载点 `/mnt`

```sh
pacstrap /mnt base linux linux-firmware base-devel
pacstrap /mnt NetworkManager vim
pacstrap /mnt base-devel # 开发基础包
```

### 配置基础系统
- 生成 fstab 文件

```sh
genfstab -U /mnt >> /mnt/etc/fstab
```

- 检查

```sh
cat /mnt/etc/fstab
```

## 切换到新系统
```sh
arch-chroot /mnt
```

## 时区
### 设置时区
```sh
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

### 硬件时间
```sh
hwclock --systohc
```

## 语言设置
`vim /etc/locale.gen` 反注释 `en_US.UTF-8` 和 `zh_CN.UTF-8`
```sh
#生成 locale
locale-gen 

# 配置 locale.conf
echo 'LANG=zh_CN.UTF-8'  > /etc/locale.conf
```

## 无线网络
安装相关包

```sh
pacman -S iw wpa_supplicant dialog net-tools networkmanager dhcpcd
```

设置网络工具开机自启

```sh
systemctl enable NetworkManager
systemctl enable dhcpcd
```

连接无线网络

```sh
wifi-menu
```

## 设置主机名
```sh
echo Vitan-ArchLinux >> /etc/hostname
```

## 账号密码设置
- 设置 root 密码

```sh
passwd
```

- 添加用户

```sh
useradd -m -G wheel vitan
passwd vitan # 修改密码
```

- sudo 权限

```sh
pacman -S sudo
vim /etc/sudoers
```

取消注释

```sh
%wheel ALL=(ALL) ALL
```

## 安装微码
- Intel CPU

```sh
pacman -S intel-ucode
```

- AMD CPU

```sh
pacman -S amd-ucode
```

## 安装引导程序（不能漏）
### UEFI 引导
```sh
pacman -S grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=ArchLinux
grub-mkconfig -o /boot/grub/grub.cfg
```
### BIOS 引导
注意第二条命令是安装系统的盘符，若安装在 /dev/sdb 就填 /dev/sdb，后不跟数数字
```sh
pacman -S grub
grub-install /dev/sdb
grub-mkconfig -o /boot/grub/grub.cfg
```

## 退出 chroot 重启 (笔记本跳过)
```sh
exit # 退回安装环境#
umount -R  /mnt # 卸载新分区
reboot # 重启
```

## 网络配置(重启后)
有线连接
```sh
systemctl enable dhcpcd
```

无线连接
```sh
pacman -S iw wpa_supplicant dialog netctl
```

ADSL 宽带连接
```sh
pacman -S rp-pppoe# pppoe-setup
```

## 重启不能联网
重启 dhcpcd
```sh
systemctl enable dhcpcd
```
继续输入
```sh
ip link
```
发现名称是ens33的网卡state 是down状态
```sh
ip link set ens33 up # ifconfig ens33 up
```

# 安装桌面环境
## Gnome 桌面
```sh
sudo pacman -S gnome #gnome桌面：
sudo pacman -S gnome-tweak-tool #安装gnome桌面优化工具
sudo pacman -S alacarte # 安装gnome桌面菜单编辑器
systemctl enable gdm #启用gnome窗口管理器服务
systemctl enable NetworkManager # 启用网络管理器服务
reboot
```

## Deepin 桌面
```sh
sudo pacman -S deepin
sudo pacman -S deepin-extra
sudo pacman S bash-completion
sudo pacman -S networkmanager
systemctl enable NetworkManager # 注意大小写
systemctl start NetworkManager
```
编辑
```sh
vim /etc/lightdm/lightdm.conf
```
修改如下
```sh
greeter-session=lightdm-deepin-greeter
```
执行
```sh
systemctl enable lightdm.service
```

## KDE Plasma 桌面
```sh
sudo pacman -S xorg
sudo pacman -S xf86-input-synaptics #触摸板驱动
sudo pacman -S ttf-dejavu wqy-microhei # 字体
sudo pacman -S plasma kde-applications # 桌面及基本应用
sudo pacman -S NetworkManager net-tools
sudo pacman -S kde-l10n-zh_cn # KDE 中文包
sudo pacman -S alsa-utils pulseaudio pulseaudio-alsa # 声音

systemctl enable sddm # 启用 sddm 显示管理器
systemctl enable NetworkManager # 启用网络管理
systemctl enable dhcpcd
```

# 后续优化
## 配置源
```sh
sudo vim /etc/pacman.conf
```
1. 首先去掉 multilib 中两行的注释
2. 在文档结尾处加入

```sh
[archlinuxcn]
SigLevel = Optional TrustAll
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

刷新pacman数据库
```sh
sudo pacman -Syy
```

## 驱动
### 声卡
```sh
sudo pacman -S alsautils pulseaudio pulseaudio-alsa
```

### 显卡
安装驱动
```sh
sudo pacman -S nvidia
sudo pacman -S nvidia-settings
```

启动管理器编辑脚本(Plasma 桌面有效)
```sh
sudo vim /usr/share/sddm/scripts/Xsetup
```

添加
```sh
xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
```

重启
```sh
reboot
```

获取显卡 PCI 地址
```sh
ispci | grep -E "VGA|3D"
```

地址转换
```sh
01:00.0 --> 1:0:0 # 转换示例
```

配置 xorg.conf
```sh
sudo vim /etc/X11/xorg.conf
# 确保 xorg 已安装
```

添加
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
# 必备软件
## 输入法
```sh
sudo pacman -S fcitx fcitx-configtool
sudo pacman -S fcitx-gtk2 fcitx-gtk3 fcitx-qt4 fcitx-qt5
sudo pacman -S fcitx-sogoupinyin
```

### 配置
```sh
vim ~/.xprofile
```
添加
```sh
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
```

桌面环境比较特殊，可能需要在 /etc/environmenet 后方也加入
```sh
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
```

安装输入法
```sh
sudo pacman -S fcitx-sogoupinyin
```
- 可选
1. fcitx-cloudpinyin 
2. fcitx-googlepinyin 
3. fcitx-libpinyin 
4. fcitx-sunpinyin
5. fcitx-sogoupinyin

## 字体
```sh
sudo pacman -S wqy-bitmapfont wqy-microhei \
wqy-zenhei adobe-source-code-pro-fonts \
adobe-source-han-sans-cn-fonts ttf-monaco
```
## 安装 yay 使用 aur
```sh
sudo pacman -S yay
```
- 以后可以使用 yay 安装aur中的软件了, yay 跟 pacman 使用方法一样.

## 工具和常用软件
工具
```sh
sudo pacman -S git net-tools tree vim
```

[微信QQ](https://vitan.me/2018/07/28/linux-WeChat-QQ/)

科学上网
```sh
sudo pacman -S shadowsocks-qt5 proxychains-ng
```
- Proxychains 实现终端下任意应用代理

WPS
```sh
sudo pacman -S ttf-wps-fonts
sudo pacman -S wps-office
```

Telegram
```sh
sudo pacman -S telegram-desktop
```
Google Chrome
```sh
sudo pacman -S google-chrome
```
网易云音乐
```sh
sudo pacman -S netease-cloud-music
```

MailSpring
```sh
yay -S mailspring
sudo pacman -S libsecret
```

迅雷
```sh
yay -S deepin-wine-thunderspeed
```

截图(Deppin)
```sh
yay -S deepin-screenshot
```

Docker
```sh
sudo pacman -S docker
sudo pacman -S docker-compose
```

Visual Studio Code
```sh
sudo pacman -S visual-studio-code-bin
```

---
**参考**
- [ArchLinux安装图文教程](https://blog.csdn.net/r8l8q8/article/details/76516523)
- [ArchLinux安装deepin桌面/常用软件流程文档](http://www.bilibili.com/read/cv123034)