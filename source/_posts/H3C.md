---
title: H3C 交换机常用命令
tags:
  - Switch
  - Network
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-05-15 15:27:38
---
H3C 交换机常用命令
<!--more-->

# 常用命令
## 用户配置
```
<H3C>system-view

# 设置用户分级密码
[H3C]super password H3C 

# 删除用户分级密码
[H3C]undo super password 

# Web网管用户设置,1（缺省）为管理级用户,缺省admin,admin
[H3C]localuser bigheap 123456 1 

# 删除Web网管用户
[H3C]undo localuser bigheap 

# 只支持0
[H3C]user-interface aux 0 

# 设置超时为2分50秒,若为0则表示不超时,默认为5分钟
[H3C-Aux]idle-timeout 2 50 

# 恢复默认值
[H3C-Aux]undo idle-timeout 

# 只支持0和1
[H3C]user-interface vty 0 

# 设置超时为2分50秒,若为0则表示不超时,默认为5分钟
[H3C-vty]idle-timeout 2 50 

# 恢复默认值
[H3C-vty]undo idle-timeout 

# 设置telnet密码,必须设置
[H3C-vty]set authentication password 123456 

# 取消密码
[H3C-vty]undo set authentication password 

# 显示用户
[H3C]display users 

# 显示用户界面状态
[H3C]display user-interface 
```

## 系统IP配置

```
[H3C]vlan 20
[H3C]management-vlan 20

# 创建并进入管理VLAN
[H3C]interface vlan-interface 20 

#  删除管理VLAN接口
[H3C]undo interface vlan-interface 20

# 配置管理VLAN接口静态IP地址(缺省为192.168.0.234)
[H3C-Vlan-interface20]ip address 192.168.1.2 255.255.255.0 

# 删除IP地址
[H3C-Vlan-interface20]undo ip address

# 指定缺省网关(默认无网关地址)
[H3C-Vlan-interface20]ip gateway 192.168.1.1 
[H3C-Vlan-interface20]undo ip gateway

# 关闭接口
[H3C-Vlan-interface20]shutdown 

# 开启
[H3C-Vlan-interface20]undo shutdown 

# 显示管理VLAN接口IP的相关信息
[H3C]display ip 

#  查看管理VLAN的接口信息
[H3C]display interface vlan-interface 20

# 开启IP调试功能
<H3C>debugging ip 
<H3C>undo debugging ip
```

## DHCP客户端配置
```
# 管理VLAN接口通过DHCP方式获取IP地址
[H3C-Vlan-interface20]ip address dhcp-alloc 

# 取消
[H3C-Vlan-interface20]undo ip address dhcp-alloc 

# 显示DHCP客户信息
[H3C]display dhcp 

# 开启DHCP调试功能
<H3C>debugging dhcp-alloc 

<H3C>undo debugging dhcp-alloc
```

## 端口配置
```
[H3C]interface Ethernet0/3
[H3C-Ethernet0/3]shutdown

# 速率,可为10,100,1000和auto(缺省)
[H3C-Ethernet0/3]speed 100 

# 双工,可为half,full和auto(缺省) 光口和汇聚后不能配置
[H3C-Ethernet0/3]duplex full 

# 开启流控,默认为关闭
[H3C-Ethernet0/3]flow-control 

# 设置抑制广播百分比为20%,可取5,10,20,100,缺省为100
# 同时组播和未知单播也受此影响
[H3C-Ethernet0/3]broadcast-suppression 20 

# 内环测试
[H3C-Ethernet0/3]loopback internal 

# 外环测试,需插接自环头,必须为全双工或者自协商模式
[H3C-Ethernet0/3]loopback external 

# 设置链路的类型为trunk,可为access(缺省),trunk
[H3C-Ethernet0/3]port link-type trunk 

# 设置20为该trunk的缺省VLAN,默认为1(trunk线路两端的PVID必须一致)
[H3C-Ethernet0/3]port trunk pvid vlan 20 

# 将当前access端口加入指定的VLAN
[H3C-Ethernet0/3]port access vlan 20 

# 允许所有的VLAN通过当前的trunk端口,可多次使用该命令
[H3C-Ethernet0/3]port trunk permit vlan all 

# 设置以太端口为自动监测,normal(缺省)为直通线,across为交叉线
[H3C-Ethernet0/3]mdi auto 

# 将1-4口加入汇聚组,1为主端口,两端需要同时配置,
# 设置了端口镜像以及端口隔离的端口无法汇聚
[H3C]link-aggregation Ethernet 0/1 to Ethernet 0/4 

# 删除该汇聚组
[H3C]undo link-aggregation Ethernet 0/1 

# 配置端口汇聚模式为根据目的MAC地址进行负荷分担,
# 可选为 ingress,egress和both,缺省为both
[H3C]link-aggregation mode egress 

# 将该端口设置为镜像端口,必须先设置镜像端口,删除时必须先删除被镜像端口,
# 而且它们不能同在一个端口,该端口不能在汇聚组中,设置新镜像端口时,新取代旧,被镜像不变

[H3C]monitor-port Ethernet 0/2 
# 将端口3和4设置为被镜像端口,both为同时监控接收和发送的报文,
# inbound表示仅监控接收的报文,outbound表示仅监控发送的报文

[H3C]mirroring-port Ethernet 0/3 to Ethernet 0/4 both 
[H3C]display mirror
[H3C]display interface Ethernet 0/3

# 清除所有端口的统计信息
<H3C>reset counters 

# 显示端口汇聚信息
[H3C]display link-aggregation Ethernet 0/3 

# 诊断该端口的电路状况
[H3C-Ethernet0/3]virtual-cable-test 
```

## VLAN 配置
```
[H3C]vlan 2

# 删除除缺省VLAN外的所有VLAN,缺省VLAN不能被删除
[H3C]undo vlan all 

# 将4到7号端口加入到VLAN2中,此命令只能用来加access端口,
# 不能用来增加trunk或者hybrid端口
[H3C-vlan2]port Ethernet 0/4 to Ethernet 0/7 

# 打开VLAN内端口隔离特性,不能二层转发,默认不启用该功能
[H3C-vlan2]port-isolate enable 

# 设置4为VLAN2的隔离上行端口,用于转发二层数据,只能配置一个上行端口,
# 若为trunk,则建议允许所有VLAN通过,隔离不能与汇聚同时配置
[H3C-Ethernet0/4]port-isolate uplink-port vlan 2 

# 显示所有VLAN的详细信息
[H3C]display vlan all 

# S1550E支持基于端口的VLAN,通过创建不同的user-group来实现,
# 一个端口可以属于多个user-group,不属于同一个user-group的端口不能互相通信, 
# 最多支持50个user-group

# 创建user-group 20,默认只存在user-group 1
[H3C]user-group 20 

# 将4到7号端口加入到VLAN20中,初始时都属于user-group 1中
[H3C-UserGroup20]port Ethernet 0/4 to Ethernet 0/7 


# 显示user-group 20的相关信息
[H3C]display user-group 20 
```

# Work 常用

- 进入特权模式

```
sys
```

- 进入端口

```
int e0/0/端口号 
int e1/0/端口号
```

- 打开/关闭自动获取mac

```
mac-address max-mac-count 1
mac-address max-mac-count 0
```

- 查找 mac
  
```
dis mac-address | include aebe
```

- 查看 Vlan 的 arp

```
dis arp vlan 216
```

- 查看端口目前 vlan

```
dis th
```
- 关闭/启用端口

```
shutdown
un shutdown
```
- 查看端口获取mac：

```
dis mac-address vlan 00
```
- mac绑定端口：

```
mac-address static 0000-0000-0000 vlan 00
```

- 退出：quit
- 保存：save
- 取消：undo

# 命令

- 查看Linux下查看端口状态

```
netstat -an|grep -E "6002|6003"
```
- 显示当前配置

```
display current-configuration
```
- 显示arp信息

```
dis arp
```
- 显示mac列表信息

```
dis mac-address
```
- 显示端口信息

```
display interface
```
- 进入系统视图

```
system-view

```
-  打开路由器的telnet功能

```
[H3C]telnet server enable
```
- 设置允许同时配置路由器的用户数

```
[H3C]configure-user count 5
```
- 添加本地用户(此处为telnet用户登录时使用的用户名)

```
[H3C]local-user telnet
```
- 设置telnet用户登录时所使用的密码

```
[H3C-luser-telnet]password simple h3c
```
- 设置本地用户的服务类型(此处为telnet)

```
[H3C-luser-telnet]service-type telnet
```
- 设置本地用户的服务级别

```
[H3C-luser-telnet]level 3
```
- 退出本地用户视图

```
[H3C-luser-telnet]quit
```
- 进入用户视图

```
[H3C]user-interface vty 0 4
```
- 选择“scheme”认证方式

```
[H3C-ui-vty0-4]authentication-mode scheme
```
- 进入某个端口

```
[H3C] interface serial 3/0
```
- 为该端口设置ip

```
[H3C-Serial3/0]ip address 200.1.1.1 255.255.255.0
```
- 对该端口进行复位

```
[H3C-Serial3/0]undo shutdown
```
- 添加一条静态路由

```
[H3C]ip route-static 192.168.1.0 255.255.255.0 192.168.0.1
```
- 添加一条默认路由

```
[H3C]ip route-static 0.0.0.0  0.0.0.0  192.168.0.1
```
- 保存配置文件

```
[H3C]save
```
- 查看某端口的状态

```
[H3C]display interface GigabitEthernet 0/0
```

- 创建vlan

```
[H3C]vlan 10
```
- 将某个端口加入到vlan中

```
[H3C-vlan100]port ethernet 0/1
```
- 创建vlan虚拟口

```
[H3C]interface vlan-interface 1
```
- 配置ip地址

```
[H3C-Vlan-interface100]ip address 192.168.1.4  255.255.255.0
```

- 将端口类型设置为trunk

```    
[H3C]port  link-type trunk
```

- 设置trunk口允许所有vlan通过(需要执行save保存)

```
[H3C]port  trunk permit vlan all 
```
注意：Trunk 可以收发多个vlan的报文，用于交换机与交换机之间的互连

- 关闭端口

```
[H3C-GigabitEthernet1/1/1]shutdown
```

- 设置端口备注

```
[H3C-Ethernet1/0/15]description 测试数据
```