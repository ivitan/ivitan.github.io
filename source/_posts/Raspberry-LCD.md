---
title: RaspberryPi 安装屏幕触控驱动及设置分辨率
date: 2018-08-02 22:04:46
tags:
  - RaspberryPi
  - Linux
categories:
  - notes
author:
  name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/RaspberryPi.png
---
Raspberry Pi 屏幕触控驱动安装及分辨率设置。
<!--more-->
# 触摸驱动
## 下载链接
- [GitHub 中获取](https://github.com/goodtft/LCD-show)

# 安装(3.5寸为例)
## 修改 config 配置文件
1. 烧写系统完成后,将 `LCD-show.tar.gz` 拷贝到 TF 卡根目录,
2. 打开 TF 卡根目录的 `config.txt` 文件并在文件末端加入以下代码,保存并安全弹出 TF 卡:
```bash
hdmi_drive=2
hdmi_force_hotplug=1
hdmi_group=2
hdmi_mode=87
hdmi_cvt 480 320 60 6 0 0 0
```

## 配置
```shell
  cd /boot
  cp LCD-show.tar.gz ~
  cd ~
  sudo tar zxvf LCD-show.tar.gz
  cd LCD-show/
  sudo ./MPI3508_480_320-show
```

# 修改分辨率
- 终端输入

```sh
sudo vim /boot/config.txt
```

- 修改

```
hdmi_drive=2
hdmi_force_hotplug=1
hdmi_group=2
hdmi_mode=87
# 这里根据分辨率来设置
```
## 分辨率表
### CEA 分辨率(电视规格分辨率)

- CEA 规定的电视规格分辨率，这些分辨率的 `hdmi_group = 1`

```shell
  hdmi_mode=1    VGA
  hdmi_mode=2    480p  60Hz
  hdmi_mode=3    480p  60Hz  H
  hdmi_mode=4    720p  60Hz
  hdmi_mode=5    1080i 60Hz
  hdmi_mode=6    480i  60Hz
  hdmi_mode=7    480i  60Hz  H
  hdmi_mode=8    240p  60Hz
  hdmi_mode=9    240p  60Hz  H
  hdmi_mode=10   480i  60Hz  4x
  hdmi_mode=11   480i  60Hz  4x H
  hdmi_mode=12   240p  60Hz  4x
  hdmi_mode=13   240p  60Hz  4x H
  hdmi_mode=14   480p  60Hz  2x
  hdmi_mode=15   480p  60Hz  2x H
  hdmi_mode=16   1080p 60Hz
  hdmi_mode=17   576p  50Hz
  hdmi_mode=18   576p  50Hz  H
  hdmi_mode=19   720p  50Hz
  hdmi_mode=20   1080i 50Hz
  hdmi_mode=21   576i  50Hz
  hdmi_mode=22   576i  50Hz  H
  hdmi_mode=23   288p  50Hz
  hdmi_mode=24   288p  50Hz  H
  hdmi_mode=25   576i  50Hz  4x
  hdmi_mode=26   576i  50Hz  4x H
  hdmi_mode=27   288p  50Hz  4x
  hdmi_mode=28   288p  50Hz  4x H
  hdmi_mode=29   576p  50Hz  2x
  hdmi_mode=30   576p  50Hz  2x H
  hdmi_mode=31   1080p 50Hz
  hdmi_mode=32   1080p 24Hz
  hdmi_mode=33   1080p 25Hz
  hdmi_mode=34   1080p 30Hz
  hdmi_mode=35   480p  60Hz  4x
  hdmi_mode=36   480p  60Hz  4xH
  hdmi_mode=37   576p  50Hz  4x
  hdmi_mode=38   576p  50Hz  4x H
  hdmi_mode=39   1080i 50Hz  reduced blanking
  hdmi_mode=40   1080i 100Hz
  hdmi_mode=41   720p  100Hz
  hdmi_mode=42   576p  100Hz
  hdmi_mode=43   576p  100Hz H
  hdmi_mode=44   576i  100Hz
  hdmi_mode=45   576i  100Hz H
  hdmi_mode=46   1080i 120Hz
  hdmi_mode=47   720p  120Hz
  hdmi_mode=48   480p  120Hz
  hdmi_mode=49   480p  120Hz H
  hdmi_mode=50   480i  120Hz
  hdmi_mode=51   480i  120Hz H
  hdmi_mode=52   576p  200Hz
  hdmi_mode=53   576p  200Hz H
  hdmi_mode=54   576i  200Hz
  hdmi_mode=55   576i  200Hz H
  hdmi_mode=56   480p  240Hz
  hdmi_mode=57   480p  240Hz H
  hdmi_mode=58   480i  240Hz
  hdmi_mode=59   480i  240Hz H
  H means 16:9 variant (of a normally 4:3 mode).
  2x means pixel doubled (i.e. higher clock rate, with each pixel repeated twice)
  4x means pixel quadrupled (i.e. higher clock rate, with each pixel repeated four times)
```

### DMT分辨率(计算机显示器)
- 以下的英文计算机显示器使用的分辨率,这些分辨率的 `hdmi_group = 2`

```shell
  hdmi_mode=1    640x350   85Hz
  hdmi_mode=2    640x400   85Hz
  hdmi_mode=3    720x400   85Hz
  hdmi_mode=4    640x480   60Hz
  hdmi_mode=5    640x480   72Hz
  hdmi_mode=6    640x480   75Hz
  hdmi_mode=7    640x480   85Hz
  hdmi_mode=8    800x600   56Hz
  hdmi_mode=9    800x600   60Hz
  hdmi_mode=10   800x600   72Hz
  hdmi_mode=11   800x600   75Hz
  hdmi_mode=12   800x600   85Hz
  hdmi_mode=13   800x600   120Hz
  hdmi_mode=14   848x480   60Hz
  hdmi_mode=15   1024x768  43Hz  DO NOT USE
  hdmi_mode=16   1024x768  60Hz
  hdmi_mode=17   1024x768  70Hz
  hdmi_mode=18   1024x768  75Hz
  hdmi_mode=19   1024x768  85Hz
  hdmi_mode=20   1024x768  120Hz
  hdmi_mode=21   1152x864  75Hz
  hdmi_mode=22   1280x768        reduced blanking
  hdmi_mode=23   1280x768  60Hz
  hdmi_mode=24   1280x768  75Hz
  hdmi_mode=25   1280x768  85Hz
  hdmi_mode=26   1280x768  120Hz reduced blanking
  hdmi_mode=27   1280x800        reduced blanking
  hdmi_mode=28   1280x800  60Hz
  hdmi_mode=29   1280x800  75Hz
  hdmi_mode=30   1280x800  85Hz
  hdmi_mode=31   1280x800  120Hz reduced blanking
  hdmi_mode=32   1280x960  60Hz
  hdmi_mode=33   1280x960  85Hz
  hdmi_mode=34   1280x960  120Hz reduced blanking
  hdmi_mode=35   1280x1024 60Hz
  hdmi_mode=36   1280x1024 75Hz
  hdmi_mode=37   1280x1024 85Hz
  hdmi_mode=38   1280x1024 120Hz reduced blanking
  hdmi_mode=39   1360x768  60Hz
  hdmi_mode=40   1360x768  120Hz reduced blanking
  hdmi_mode=41   1400x1050       reduced blanking
  hdmi_mode=42   1400x1050 60Hz
  hdmi_mode=43   1400x1050 75Hz
  hdmi_mode=44   1400x1050 85Hz
  hdmi_mode=45   1400x1050 120Hz reduced blanking
  hdmi_mode=46   1440x900        reduced blanking
  hdmi_mode=47   1440x900  60Hz
  hdmi_mode=48   1440x900  75Hz
  hdmi_mode=49   1440x900  85Hz
  hdmi_mode=50   1440x900  120Hz reduced blanking
  hdmi_mode=51   1600x1200 60Hz
  hdmi_mode=52   1600x1200 65Hz
  hdmi_mode=53   1600x1200 70Hz
  hdmi_mode=54   1600x1200 75Hz
  hdmi_mode=55   1600x1200 85Hz
  hdmi_mode=56   1600x1200 120Hz reduced blanking
  hdmi_mode=57   1680x1050       reduced blanking
  hdmi_mode=58   1680x1050 60Hz
  hdmi_mode=59   1680x1050 75Hz
  hdmi_mode=60   1680x1050 85Hz
  hdmi_mode=61   1680x1050 120Hz reduced blanking
  hdmi_mode=62   1792x1344 60Hz
  hdmi_mode=63   1792x1344 75Hz
  hdmi_mode=64   1792x1344 120Hz reduced blanking
  hdmi_mode=65   1856x1392 60Hz
  hdmi_mode=66   1856x1392 75Hz
  hdmi_mode=67   1856x1392 120Hz reduced blanking
  hdmi_mode=68   1920x1200       reduced blanking
  hdmi_mode=69   1920x1200 60Hz
  hdmi_mode=70   1920x1200 75Hz
  hdmi_mode=71   1920x1200 85Hz
  hdmi_mode=72   1920x1200 120Hz reduced blanking
  hdmi_mode=73   1920x1440 60Hz
  hdmi_mode=74   1920x1440 75Hz
  hdmi_mode=75   1920x1440 120Hz reduced blanking
  hdmi_mode=76   2560x1600       reduced blanking
  hdmi_mode=77   2560x1600 60Hz
  hdmi_mode=78   2560x1600 75Hz
  hdmi_mode=79   2560x1600 85Hz
  hdmi_mode=80   2560x1600 120Hz reduced blanking
  hdmi_mode=81   1366x768  60Hz
  hdmi_mode=82   1080p     60Hz
  hdmi_mode=83   1600x900        reduced blanking
  hdmi_mode=84   2048x1152       reduced blanking
  hdmi_mode=85   720p      60Hz
  hdmi_mode=86   1366x768        reduced blanking
```