---
title: 配置 PowerShell 主题
tags:
  - Windows
categories:
  - Coding
author:
  - Vitan
toc: true
date: 2020-06-04 09:25:32
---
旧文写于 2020 年，里面三条核心命令在今天全部失效。这篇按 2026 年的实际环境重写，覆盖从零安装到排错的完整流程。

文中所有命令都在下面这套环境里跑通过：

| 组件 | 版本 |
| --- | --- |
| PowerShell | 7.7.0（Core）+ 5.1.26100（Desktop） |
| oh-my-posh | 32.0.0 |
| Windows Terminal | 自带 `themes` 字段的新版 |
| 主题 | `paradox`（旧文的 Paradox） |
| 字体 | MesloLGM Nerd Font 3.4.0 |

## 0. 为什么必须重写

oh-my-posh 在 2021 年做了一次彻底的架构变更：从一个 **PowerShell 模块** 变成了一个 **独立的 Go 二进制程序**。PowerShell Gallery 上那个同名模块早就停在旧版本，装上也不能用。

于是旧文这三条命令，今天执行的结果是：

| 旧命令 | 现在的结果 |
| --- | --- |
| `Install-Module oh-my-posh` | 装到的是废弃的旧模块，导入即报错 |
| `Set-Theme Paradox` | `Set-Theme : 无法将"Set-Theme"项识别为 cmdlet` |
| `Import-Module Get-ChildItemColor` | 该模块多年未维护，PS7 下告警甚至报错 |
| `Get-PoshThemes` | 该 cmdlet 随模块一起消失 |
| `colortool -d OneHalfDark` | ConColortool 已废弃，Windows Terminal 有自己的配色方案 |

替代关系一句话说清：**`Set-Theme X` → `oh-my-posh init pwsh --config X`**。

## 1. 先理清四层结构

很多人配不明白，是因为把四件不同的事混成一件。一条漂亮的提示符由四层拼起来，各改各的：

| 层 | 由谁负责 | 改什么 |
| --- | --- | --- |
| 终端宿主 | Windows Terminal | 背景色、配色方案、字体、窗口外观 |
| Shell | PowerShell 7 | 语法、执行策略、`$PROFILE` |
| 提示符渲染器 | oh-my-posh | 显示哪些信息、用什么图标、什么颜色 |
| 字形字体 | Nerd Font | 让图标和特殊符号能"画出来" |

关键推论：

- **改了 oh-my-posh 主题但没装 Nerd Font → 满屏方框**，这不是主题坏了。
- **改了 Windows Terminal 配色但提示符没变 → 正常**，主题归 oh-my-posh 管。
- PS 5.1 和 PS 7 读的是**两个不同的 `$PROFILE`**，只配一个另一个不生效。

## 2. 环境检查

开一个 PowerShell 窗口，整段粘进去：

```powershell
"PowerShell : $($PSVersionTable.PSVersion)"
"pwsh       : " + (Get-Command pwsh -ErrorAction SilentlyContinue).Source
"oh-my-posh : " + (Get-Command oh-my-posh -ErrorAction SilentlyContinue).Source
"winget     : " + (Get-Command winget -ErrorAction SilentlyContinue).Source
"WT         : " + (Get-Command wt -ErrorAction SilentlyContinue).Source
"profile(5.1): $($PROFILE.CurrentUserCurrentHost)"
"profile(7)  : $([Environment]::GetFolderPath('MyDocuments'))\PowerShell\Microsoft.PowerShell_profile.ps1"
```

对照下面三种情况决定从哪一步开始：

- 没有 `pwsh` → 从第 3 步开始
- 有 `pwsh` 没有 `oh-my-posh` → 从第 4 步开始
- 两者都有、提示符没美化 → 从第 6 步开始

## 3. 第一步：安装 PowerShell 7

PowerShell 7 与系统自带的 5.1 **并存**，不会覆盖，命令分别是 `pwsh` 和 `powershell`。5.1 已经只做安全修复，新特性全在 7 上，没有理由不装。

```powershell
winget install --id Microsoft.PowerShell -e
```

备选方式：

```powershell
# 微软商店
winget install --id Microsoft.PowerShell --source msstore

# 或直接下载 MSI
# https://github.com/PowerShell/PowerShell/releases
```

装完**新开一个窗口**，验证：

```powershell
pwsh -NoLogo -Command '$PSVersionTable.PSVersion'
```

版本升级：

```powershell
winget upgrade --id Microsoft.PowerShell -e
```

> 后面所有命令默认在 `pwsh`（7）里执行。只有明确标注 5.1 的地方才用 `powershell`。

## 4. 第二步：安装 oh-my-posh

```powershell
winget install --id JanDeDobbeleer.OhMyPosh -e
```

备选方式：

```powershell
# Scoop（如果你已经用 Scoop 管开发工具）
scoop install main/oh-my-posh

# 官方安装脚本
Set-ExecutionPolicy Bypass -Scope Process -Force
irm https://ohmyposh.dev/install.ps1 | iex

# Chocolatey
choco install oh-my-posh
```

验证与升级：

```powershell
oh-my-posh --version
winget upgrade --id JanDeDobbeleer.OhMyPosh -e
```

如果报 `无法将"oh-my-posh"项识别为 cmdlet`，说明 PATH 没刷新，**新开窗口**即可；再不行检查 `C:\Users\<你>\AppData\Local\Microsoft\WindowsApps` 是否在 PATH 里。

顺手关掉启动时的升级提示（会联网，能省几十毫秒）：

```powershell
oh-my-posh disable notice
```

## 5. 第三步：安装 Nerd 字体

这一步不做，后面全是方框。

```powershell
oh-my-posh font install            # 交互式列表，方向键选择
oh-my-posh font list               # 只看不装
```

推荐三选一：

| 字体 | 适用 |
| --- | --- |
| `Meslo`（MesloLGM Nerd Font） | oh-my-posh 官方默认搭配，图标最全 |
| `CaskaydiaCove`（Cascadia Code 改版） | 有编程连字，Windows 原生味道 |
| `Sarasa Term SC`（更纱黑体） | **中文注释/路径对齐最好**，Nerd 版本叫 `Sarasa Term SC Nerd Font` |

中文环境下我更推荐 Sarasa：等宽汉字不会被挤成半角，中英混排不会错位。它不在 `font install` 列表里时，去 [Sarasa Gothic Releases](https://github.com/be5invis/Sarasa-Gothic/releases) 下载 `Sarasa-TTC-*.7z`，解压后全选字体右键"安装"。

装完字体**必须重启 Windows Terminal**（不是新开标签页，是退出进程），否则字体列表里看不到。

### 国内网络：`font install` 下载失败怎么办

`oh-my-posh font install` 是从 GitHub Releases 拉包，国内大概率超时（表现：一条输出都没有，退出码 `70`）。`winget install DEVCOM.JetBrainsMonoNerdFont` 同理，它的安装包 URL 也指向 GitHub。

两个可用的绕行方式：

**方式一：走 gh 镜像下载**（实测可用，107MB 约 33 秒）

```powershell
# 镜像前缀 + 原始 Release 地址
curl.exe -L -o "$env:TEMP\Meslo.zip" `
  "https://gh-proxy.com/https://github.com/ryanoasis/nerd-fonts/releases/download/v3.4.0/Meslo.zip"

Expand-Archive "$env:TEMP\Meslo.zip" -DestinationPath "$env:TEMP\MesloFonts" -Force
```

**方式二：装到当前用户（不需要管理员）**

解压后在解压目录里跑，只装 `MesloLGM Nerd Font` 这一族（4 个文件，约 11MB，别把 72 个全装进去）：

```powershell
$fontDir = "$env:LOCALAPPDATA\Microsoft\Windows\Fonts"
$key     = 'HKCU:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts'
if (!(Test-Path $fontDir)) { New-Item -ItemType Directory -Path $fontDir -Force | Out-Null }

Get-ChildItem "$env:TEMP\MesloFonts" -Recurse -Filter 'MesloLGMNerdFont-*.ttf' | ForEach-Object {
    $style = ($_.BaseName -replace '^MesloLGMNerdFont-','')
    if ($style -eq 'BoldItalic') { $style = 'Bold Italic' }
    $target = Join-Path $fontDir $_.Name
    Copy-Item $_.FullName $target -Force
    New-ItemProperty -Path $key -Name "MesloLGM Nerd Font $style (TrueType)" `
                     -Value $target -PropertyType String -Force | Out-Null
}
```

这就是 Windows 安装"仅为当前用户"字体的等价做法：文件放进用户字体目录 + HKCU 注册表登记。

⚠️ 这样装的字体有时**需要注销重登一次**才会被应用枚举到（字体缓存是在登录时建的）。重启 WT 后如果还是方框，注销重登即可。

### 在 Windows Terminal 里指定字体

打开设置（`Ctrl + ,`）→ 左下角"打开 JSON 文件"，在 `profiles.defaults` 里加：

```json
"profiles": {
  "defaults": {
    "font": {
      "face": "MesloLGM Nerd Font",
      "size": 11
    }
  }
}
```

写成 `defaults` 就对所有 profile 生效。想只给 PowerShell 7 单独设，就写到 `list` 里那个 GUID 为 PowerShell 的条目下。

## 6. 第四步：写 `$PROFILE`

### 路径别搞错

| Shell | `$PROFILE` 实际路径 |
| --- | --- |
| PowerShell 7（pwsh） | `C:\Users\<你>\Documents\PowerShell\Microsoft.PowerShell_profile.ps1` |
| Windows PowerShell 5.1 | `C:\Users\<你>\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` |

`$PROFILE` 还有几个变体（`CurrentUserAllHosts`、`AllUsersAllHosts`），日常只用 `CurrentUserCurrentHost` 就够。想跨 5.1 / 7 共用一份配置，就写 `CurrentUserAllHosts` 那个。

### 创建并打开

```powershell
if (!(Test-Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
notepad $PROFILE
```

### 最小可用版（先跑通这个）

```powershell
oh-my-posh init pwsh --config jandedobbeleer | Invoke-Expression
```

保存后重载：

```powershell
. $PROFILE
```

提示符变了就说明链路通了。**注意 shell 名要和 Shell 对上**：

- `pwsh` 里用 `oh-my-posh init pwsh ...`
- 5.1 里必须用 `oh-my-posh init powershell ...`（写成 pwsh 会拿到错误的初始化脚本）

## 7. 主题怎么选

新版把几十个主题**内置在 exe 里**，不需要下载 json 文件，直接写名字：

```powershell
oh-my-posh init pwsh --config jandedobbeleer | Invoke-Expression   # 默认风格，信息全
oh-my-posh init pwsh --config paradox          | Invoke-Expression   # 两行 powerline，旧文同款
oh-my-posh init pwsh --config atomic           | Invoke-Expression   # 极简
oh-my-posh init pwsh --config montys           | Invoke-Expression
oh-my-posh init pwsh --config powerlevel10k_rainbow | Invoke-Expression
```

> ⚠️ **主题名区分大小写**，而且写错不会报错：`--config Paradox`（大写 P）会渲染成 `CONFIG NOT FOUND` 这一串字，退出码依然是 `0`，很难察觉。一律用小写。

不想改配置文件也能预览效果：

```powershell
oh-my-posh print primary --config paradox
```

完整主题清单与在线预览：[ohmyposh.dev/docs/themes](https://ohmyposh.dev/docs/themes)。

### 旧文的 `Set-Theme Paradox` 对应哪个

就是现在的 `paradox`，老主题在 v3 全部迁成了 json，名字和视觉都保留了。两行结构、powerline 箭头、蓝色 `❯` 收尾都对得上：

```powershell
oh-my-posh init pwsh --config paradox | Invoke-Expression
```

它一共 6 个 powerline 段，加一行独立的提示符行：

| 段 | 背景色 | 前景色 | 内容 | 出现条件 |
| --- | --- | --- | --- | --- |
| root | `#ffe9aa` | `#100e23` | ⚡ | 仅管理员窗口 |
| session | `#ffffff` | `#100e23` | `user@host` | 总是 |
| path | `#91ddff` | `#100e23` | `~ › WorkBuddy` | 总是 |
| git | `#95ffa4` | `#193549` | 分支名 | 在 git 仓库里 |
| python | `#906cff` | `#100e23` | 版本号 / venv 名 | 检测到 Python |
| status | `#ff8080` | `#ffffff` | ✓ / ✗ | 上条命令的退出状态 |

第二行是 `"newline": true` 加一个 `text` 段：`❯`，颜色 `#007ACC`。

`git`、`python`、`status` 三段是按条件出现的，所以在普通目录里只看得到白底和浅蓝底两段，别以为配置没生效。

### 把主题导出成自己的 json

想要微调（改颜色、加 segment），就导出再改 —— **注意要带 `--config` 指定导哪个主题**，不带的话导出的是当前默认配置：

```powershell
oh-my-posh config export --config paradox --output "$env:USERPROFILE\.config\oh-my-posh\paradox.omp.json"
```

导完把配置指向文件本身，之后改 json 就生效（改内置名是改不动的，内置主题编译在 exe 里）：

```powershell
$ompTheme = "$env:USERPROFILE\.config\oh-my-posh\paradox.omp.json"
```

图形化编辑：

```powershell
oh-my-posh config edit      # 用 $env:EDITOR 指定的编辑器打开
```

### 一个必加的 segment：瞬时提示符

命令执行完后，历史输出的提示符折叠成一行，屏幕干净很多。在主题 json 顶层加：

```json
"transient_prompt": {
  "template": "{{ .Shell }} ❯ ",
  "foreground": "#9aa5b1",
  "background": "transparent"
}
```

> 注意：旧教程里的 `Enable-PoshTransientPrompt` 这个 cmdlet 也已经不存在了，现在纯配置驱动。

## 8. 完整 `$PROFILE` 模板

把旧文自带的别名、函数都保留并修正了两个 bug（`Set-Alias grlz grlz` 自引用、curl 别名重复删除），直接复制：

```powershell
# ==================== oh-my-posh ====================
# 主题名区分大小写，写 Paradox 会渲染成 CONFIG NOT FOUND；也可换成 json 绝对路径
$ompTheme = 'paradox'

if ($PSVersionTable.PSEdition -eq 'Core') {
    oh-my-posh init pwsh --config $ompTheme | Invoke-Expression
}
else {
    # 5.1 必须用 powershell 这个 shell 名，写成 pwsh 拿到的是错误的初始化脚本
    oh-my-posh init powershell --config $ompTheme | Invoke-Expression
}

# 启动偏慢时，改用缓存模式（快 100~200ms，升级 omp 后需重新生成）：
# $ompInit = Join-Path $env:TEMP 'omp-init.ps1'
# if ($PSVersionTable.PSEdition -eq 'Core') { $ompShell = 'pwsh' } else { $ompShell = 'powershell' }
# oh-my-posh init $ompShell --config $ompTheme --print | Out-File $ompInit -Encoding utf8
# . $ompInit

# ==================== 编码 ====================
$env:PYTHONIOENCODING = 'utf-8'
# 5.1 下建议保留，PS7 一般不需要
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# ==================== 模块 ====================
Import-Module Terminal-Icons -ErrorAction Ignore
Import-Module posh-git       -ErrorAction Ignore   # 可选，omp 自带 git segment

# ==================== PSReadLine ====================
# 5.1 自带 2.0.0：没有 PredictionSource / PredictionViewStyle（2.2 才加入），所以要探测
$psrl = (Get-Command Set-PSReadLineOption).Parameters

Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
Set-PSReadLineOption -EditMode Windows

if ($psrl.ContainsKey('PredictionSource')) {
    Set-PSReadLineOption -PredictionSource History
    Set-PSReadLineOption -PredictionViewStyle ListView
}

# ==================== 基础别名 ====================
Set-Alias open Invoke-Item
Set-Alias ll   Get-ChildItem
Set-Alias code Vscode

# ==================== 自定义函数 ====================
function GoBack      { Set-Location .. }
function GitStat     { git status }
function Vscode      { code . }
function GetMyIp     { curl -L https://tool.lu/ip }        # PS7 有真 curl；5.1 会自动选 Invoke-WebRequest
function UpdateScoop { scoop update; scoop update * }      # 没装 scoop 就删掉这行和对应别名
function HexoServe   { hexo clean; hexo g; hexo s }

function GitLogPretty {
    git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --all
}

# ==================== Git 快捷提交 ====================
# 用法：gadd 修改说明 / gcap 提交说明
function GitAdd { git add .; git commit -m "⚡ ADD: $args" }
function GitCap { git add .; git commit -m "$args"; git push }

function GitNew { GitCap "📦 NEW: $args" }
function GitImp { GitCap "👌 IMPROVE: $args" }
function GitFix { GitCap "🐛 FIX: $args" }
function GitRlz { GitCap "🚀 RELEASE: $args" }
function GitDoc { GitCap "📖 DOC: $args" }
function GitTst { GitCap "✅ TEST: $args" }

# ==================== 函数对应的别名 ====================
Set-Alias ..   GoBack
Set-Alias glola GitLogPretty
Set-Alias gst   GitStat
Set-Alias myip  GetMyIp
Set-Alias suu   UpdateScoop
Set-Alias vitan HexoServe
Set-Alias gadd  GitAdd
Set-Alias gcap  GitCap
Set-Alias gnew  GitNew
Set-Alias gimp  GitImp
Set-Alias gfix  GitFix
Set-Alias grlz  GitRlz      # 旧文这里写成了 Set-Alias grlz grlz，自引用会报错
Set-Alias gdoc  GitDoc
Set-Alias gtst  GitTst
```

### 两个坑提前说

1. **文件编码必须 UTF-8**。5.1 读无 BOM 的 UTF-8 会把 emoji 变成乱码（旧文里那个 `<F0><9F><93><A6>` 就是这个原因）。用记事本另存为时选 "UTF-8 with BOM"，PS7 则 UTF-8 无 BOM 也可以。
2. **执行策略**。如果重载时报"禁止运行脚本"：

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### 让 5.1 也用上

5.1 的 `$PROFILE` 路径不同，别复制错：

```powershell
# 在 powershell（不是 pwsh）里执行
if (!(Test-Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
code $PROFILE
```

上面这份模板**本身就是版本自适应的**（靠 `$PSVersionTable.PSEdition` 和参数探测两个判断），所以同一份内容可以直接放到两个路径，5.1 和 7 都能跑，不用维护两套。

两个路径，别复制错：

| Shell | 路径 |
| --- | --- |
| PowerShell 7 | `C:\Users\<你>\Documents\PowerShell\Microsoft.PowerShell_profile.ps1` |
| Windows PowerShell 5.1 | `C:\Users\<你>\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` |

```powershell
# 在 powershell（不是 pwsh）里执行
if (!(Test-Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
code $PROFILE           # 或 notepad $PROFILE
```

5.1 特有的两个注意点：

1. **文件必须存成 UTF-8 with BOM**，否则配置里的 emoji（`⚡ 📦 🚀`）会变成乱码。
2. **想要 5.1 也有历史预测（灰色补全）**，得把 PSReadLine 升级到 ≥ 2.2（自带的是 2.0.0）：

```powershell
Install-Module PSReadLine -Scope CurrentUser -Force
```

装完 `Get-Module PSReadLine -ListAvailable` 应该能看到 2.3.x，模板里的 `ContainsKey('PredictionSource')` 探测会自动放行那两行设置。

## 9. Windows Terminal 侧配置

`Ctrl + ,` → 左下角"打开 JSON 文件"，文件实际位置：

```
%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json
```

改之前先备份（改坏了能回滚）：

```powershell
Copy-Item ".\settings.json" ".\settings.json.bak" -Force
```

一份可直接用的最小配置（保留原有 `keybindings`、`newTabMenu` 不动即可）：

```json
{
  "defaultProfile": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
  "profiles": {
    "defaults": {
      "font": { "face": "MesloLGM Nerd Font", "size": 11 },
      "colorScheme": "One Half Dark",
      "opacity": 92,
      "useAcrylic": true,
      "padding": "8, 8, 8, 8",
      "scrollbarState": "hidden"
    },
    "list": [
      {
        "guid": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
        "hidden": false,
        "name": "PowerShell 7"
      }
    ]
  },
  "schemes": [],
  "themes": []
}
```

常用 profile 的固定 GUID（手写 JSON 时靠它指认，别自己编）：

| Shell | GUID |
| --- | --- |
| PowerShell 7 | `{574e775e-4f2a-5b96-ac1e-a2962a402336}` |
| Windows PowerShell 5.1 | `{61c54bbd-c2c6-5271-96e7-009a87ff44bf}` |
| 命令提示符 | `{0caa0dad-35be-5f56-a8ff-afceeeaa6101}` |

要点：

- **`defaultProfile` 一定要指向 PowerShell 7**，否则你每次开的是 5.1，会怀疑配置没生效（这是最高频的"配置不生效"原因）。
- 只写 `guid` + `name` 就够，`commandline` 会让 WT 自动补成 `pwsh.exe`；自己写死路径反而在升级后容易失效。
- `profiles.defaults` 是对所有 profile 生效的公共项，字体、配色、透明度都放这里，别逐个 profile 写。
- 配色方案（colorScheme）走 WT 内置列表：`Campbell`、`One Half Dark`、`Solarized Dark`、`Dracula` 等。`colortool` 那套 conhost 时代的方案已经不需要了。
- `schemes` 数组可以自己加配色，字段是 `background`、`foreground`、`cursorColor` 加 `black/red/green/...` 十六个色位。
- 改完保存，WT 会热重载；**语法错误会导致整份配置被忽略**（界面会弹提示，别忽略它）。

## 10. 性能与进阶

**感觉提示符卡顿**，按顺序试：

```powershell
oh-my-posh disable notice     # 关升级检查（联网）
oh-my-posh cache clear        # 清缓存后重建
oh-my-posh debug              # 打印每个 segment 的耗时，直接看出谁是元凶
```

`oh-my-posh debug` 是最有效的：它会列出每个 segment 的渲染毫秒数，`git`、`sysinfo`、`spotify` 这类 segment 最容易拖慢。把不用的从主题 json 里删掉即可。

**其它常用命令**：

```powershell
oh-my-posh config export --output ./theme.omp.json   # 导出当前配置
oh-my-posh config edit                               # 编辑
oh-my-posh get shell                                 # 当前 shell 名
oh-my-posh get width                                 # 终端宽度
oh-my-posh toggle <segment>                          # 临时开关某个 segment
```

**想在 Claude Code / Copilot CLI 的状态栏也用它**（v32 新增能力）：`oh-my-posh claude`、`oh-my-posh copilot` 会直接渲染成对应 CLI 的状态栏文本。

## 11. 排错对照表

| 症状 | 原因 | 处理 |
| --- | --- | --- |
| 满屏方框 `□■` | 字体不是 Nerd Font，或 WT 没重启 | `oh-my-posh font install` 后退出 WT 重开，确认 `font.face` 写对 |
| `Set-Theme 无法识别` | 在跑旧教程的模块命令 | 删掉，改 `oh-my-posh init pwsh --config X \| Invoke-Expression` |
| `找不到与参数名称"PredictionSource"匹配的参数` | 5.1 自带 PSReadLine 2.0.0，该参数 2.2 才有 | 用模板里的 `ContainsKey` 探测写法，或 `Install-Module PSReadLine -Scope CurrentUser -Force` |
| 提示符显示 `CONFIG NOT FOUND` | 主题名打错或大小写不对（`Paradox`） | 改全小写 `paradox`；此错误**不报异常**、退出码仍为 0 |
| `oh-my-posh 无法识别` | PATH 未刷新 | 新开窗口；检查 `WindowsApps` 在 PATH |
| 提示符有颜色但图标是问号 | 字体装了但没选中（选中的是普通版） | 字体名要带 `Nerd Font` 后缀 |
| 中文变成乱码 | 5.1 编码 + 文件无 BOM | 另存为 UTF-8 with BOM，或改用 PS7 |
| 配置改了没反应 | 改的是另一个 `$PROFILE` | 打印 `$PROFILE` 确认路径，注意 5.1 / 7 分离 |
| WT 开出来还是老界面 | `defaultProfile` 指向 5.1 | 把默认 profile 改成 PowerShell 7 |
| 重载报"禁止运行脚本" | 执行策略 | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| 启动明显变慢 | segment 太多或联网检查 | `oh-my-posh debug` 定位 + `disable notice` + 用 `--print` 缓存 |

## 12. 旧文命令迁移速查

| 2020 版 | 2026 版 |
| --- | --- |
| `Install-Module oh-my-posh` | `winget install --id JanDeDobbeleer.OhMyPosh -e` |
| `Import-Module oh-my-posh` | 删除（不再是模块） |
| `Set-Theme Paradox` | `oh-my-posh init pwsh --config paradox \| Invoke-Expression` |
| `Get-PoshThemes` | `oh-my-posh print primary --config <名字>` 或官网主题库 |
| `Import-Module Get-ChildItemColor` | `Import-Module Terminal-Icons` |
| `Set-Alias ls Get-ChildItemColorFormatWide` | 用 `Terminal-Icons`，`ls` 保持原生 |
| `Enable-PoshTransientPrompt` | 主题 json 里加 `transient_prompt` 块 |
| `scoop install colortool` + `colortool -d` | Windows Terminal `colorScheme` |
| 手动下载 Nerd Font 解压 | `oh-my-posh font install` |
| `Import-Module posh-git` | 可选保留，omp 自带 git segment |

## 13. 参考

- oh-my-posh 官网：[ohmyposh.dev](https://ohmyposh.dev)
- 主题库：[ohmyposh.dev/docs/themes](https://ohmyposh.dev/docs/themes)
- 仓库：[github.com/JanDeDobbeleer/oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh)
- Nerd Fonts：[nerdfonts.com](https://www.nerdfonts.com)
- Sarasa Gothic：[github.com/be5invis/Sarasa-Gothic](https://github.com/be5invis/Sarasa-Gothic/releases)
- PowerShell 7 发布页：[github.com/PowerShell/PowerShell/releases](https://github.com/PowerShell/PowerShell/releases)
