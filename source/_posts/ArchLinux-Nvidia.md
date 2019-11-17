---
title: ArchLinux 显卡驱动
date: 2018-08-01 09:14:56
tags:
- Linux
- ArchLinux
categories: Linux
toc: true
thumbnail: /images/ArchLinux.png
enable_unread_badge: true
---
ArchLinux 双显卡驱动。
<!--more-->
# 安装
## Nvidia 和 xorg-xrandr
```sh
sudo pacman -S nvidia nvidia-settings xorg-xrandr
```
## 配置
获取显卡 PCI 地址
```sh
lspci | grep -E "VGA|3D"
```
地址转换
```sh
01:00.0 --> 1:0:0 # 转换示例
```
配置 xorg.conf
```
sudo vim /etc/X11/xorg.conf
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

# 各桌面配置 (Display Managers)
## SDDM (Plasma)
启动管理器编辑脚本
```sh
sudo vim /usr/share/sddm/scripts/Xsetup
```
- 添加
```sh
xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
```

## LightDM (Deepin)
配置
```sh
sudo vim /etc/lightdm/display_setup.sh
```

- 添加

```sh
#!/bin/sh
xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
```

- chmod 权限

```sh
chmod +x /etc/lightdm/display_setup.sh
```

配置脚本
```sh
sudo vim /etc/lightdm/lightdm.conf
```

- 添加

```sh
[Seat:*]
display-setup-script=/etc/lightdm/display_setup.sh
```

## GDM (Gnome)
创建两个新的 .desktop 文件

- /usr/share/gdm/greeter/autostart/optimus.desktop 下创建

```sh
sudo vim /usr/share/gdm/greeter/autostart/optimus.desktop
```
- 添加

```sh
[Desktop Entry]
Type=Application
Name=Optimus
Exec=sh -c "xrandr --setprovideroutputsource modesetting NVIDIA-0; xrandr --auto"
NoDisplay=true
X-GNOME-Autostart-Phase=DisplayServer
```

- /etc/xdg/autostart/optimus.desktop 下创建

```sh
sudo vim /etc/xdg/autostart/optimus.desktop
```

- 添加

```sh
[Desktop Entry]
Type=Application
Name=Optimus
Exec=sh -c "xrandr --setprovideroutputsource modesetting NVIDIA-0; xrandr --auto"
NoDisplay=true
X-GNOME-Autostart-Phase=DisplayServer
```

确保 GDM 使用 X 作为默认后端
- Gnome 默认使用 Wayland 作为后端，只有 Wayland 后端无法启动时才使用 Xorg 后端。
- 修改为 X

```sh
sudo vim /etc/gdm/custom.conf
```

- 取消以下注释

```sh
#WaylandEnable=false
```

解决错误提示

- 删除主用户 “gdm”，删除组 “gdm”

```sh
sudo userdel gdm
sudo groupdel gdm
```

GDM使用单独的 dconf 数据库来控制电源管理
- 通过将用户设置复制到 GDM 的 dconf 数据库，可以使 GDM 的行为与用户会话相同。

```sh
IFS=$'\n'; for x in $(sudo -u YOUR_USER gsettings list-recursively org.gnome.settings-daemon.plugins.power); do eval "sudo -u gdm dbus-launch gsettings set $x"; done; unset IFS
```

- 或者简单地禁用自动挂起(在电池上运行时，也可以用 ac 替换电池来禁用它)：

```sh
sudo -u gdm dbus-launch gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type 'nothing'
```
---
**参考**
- [NVIDIA Optimus](https://wiki.archlinux.org/index.php/NVIDIA_Optimus#Display_Managers)
- [GDM](https://wiki.archlinux.org/index.php/GDM#Use_Xorg_backend)
