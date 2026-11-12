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
- 不写 `commandline` 时 WT 会自动补成 `pwsh.exe`；但**需要带启动参数时（比如 `-NoLogo`）必须显式写**。写 `pwsh.exe` 而不是绝对路径，升级后不会失效。
- `profiles.defaults` 是对所有 profile 生效的公共项，字体、配色、透明度都放这里，别逐个 profile 写。
- 配色方案（colorScheme）走 WT 内置列表：`Campbell`、`One Half Dark`、`Solarized Dark`、`Dracula` 等。`colortool` 那套 conhost 时代的方案已经不需要了。
- `schemes` 数组可以自己加配色，字段是 `background`、`foreground`、`cursorColor` 加 `black/red/green/...` 十六个色位。
- 改完保存，WT 会热重载；**语法错误会导致整份配置被忽略**（界面会弹提示，别忽略它）。

### 关掉启动横幅（`PowerShell 7.7.0` / `Type 'help' to get help.`）

横幅是 `pwsh` **启动瞬间**打印的，早于 `$PROFILE` 加载，所以写进 profile 拦不住它（`Clear-Host` 也不行，会把首个提示符一起刷掉）。唯一正解是启动参数 `-NoLogo`。

**改哪份文件：**

```
%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json
```

```powershell
code "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json"
```

在 `profiles.list` 里**按 GUID 找** PowerShell 7 那一项（`name` 可能被改过，GUID 不会变）：

```json
"list": [
    {
        "commandline": "%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
        "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
        "name": "Windows PowerShell"
    },
    {
        "commandline": "pwsh.exe -NoLogo",
        "guid": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
        "name": "PowerShell 7"
    },
    {
        "commandline": "%SystemRoot%\\System32\\cmd.exe",
        "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
        "name": "命令提示符"
    }
]
```

**不想碰 JSON 的图形界面路径：**

1. `Ctrl + ,` 打开设置
2. 左侧列表点 **PowerShell 7**
3. 「常规」页里找到 **命令行 / Command line** 输入框
4. 填 `pwsh.exe -NoLogo`，右下角 **保存**

这个输入框改的就是上面那个 `commandline` 字段，两条路等价。

三个注意点：

- 只影响**新建的标签页**，已经开着的窗口不会变（配置本身是热重载的）。
- 从 **Win+R / 桌面快捷方式**直接起 `pwsh` 不经过 WT，横幅照样出现，得在快捷方式目标的命令行里也加 `-NoLogo`。
- Windows Terminal **Preview** 版的目录名是 `Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe`，别找错。

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
| 加了 `-NoLogo` 还是显示版本横幅 | 看的是旧标签页，或从快捷方式直接起的 pwsh | 新开标签页；快捷方式目标里也加 `-NoLogo` |
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

## 13. 一键部署脚本

上面所有步骤都固化成了 `Install-TerminalTheme.ps1`，适合换机器、重装系统、或者安利给同事。

```powershell
# 先看要做什么，不写任何文件
.\Install-TerminalTheme.ps1 -DryRun

# 正式执行
.\Install-TerminalTheme.ps1 -Theme paradox -Font Meslo
```

### 它做六件事

| 步骤 | 行为 | 幂等策略 |
| --- | --- | --- |
| 1 | 环境检查（winget 是否可用） | 只读 |
| 2 | 装 PowerShell 7 | 已有 `pwsh` 就跳过 |
| 3 | 装 oh-my-posh | 已有就跳过，`-Upgrade` 时才升级 |
| 4 | 装 Nerd 字体 | 注册表里查到字体族就跳过 |
| 5 | 写两份 `$PROFILE`（UTF-8 with BOM） | 内容一致则跳过 |
| 6 | 修补 WT `settings.json` | 逐项比对，全一致则完全不写 |

### 参数

| 参数 | 说明 |
| --- | --- |
| `-Theme` | 主题名，默认 `paradox`（脚本会自动转小写并校验渲染） |
| `-Font` | `Meslo` / `CaskaydiaCove` / `None`，默认 `Meslo` |
| `-DryRun` | 只打印，不落盘 |
| `-Upgrade` | 顺带升级 oh-my-posh |

### 几个设计上的取舍

- **所有写入前都备份**，文件名带时间戳（`settings.json.bak-20260812-082942`），出问题直接覆盖回去。
- **字体有两条路**：先试 `oh-my-posh font install`，失败（GitHub 不通，退出码 70）自动降级到 gh 镜像下载 + 用户级注册表安装，全程不需要管理员。
- **WT 配置逐项比对**，已经是目标状态就一个字节都不写 —— 否则每次重跑都会用 `ConvertTo-Json` 把你手写的格式刷成机器格式。
- **主题名强制转小写**，并在结尾用 `oh-my-posh print primary` 真渲染一次，检查是否出现 `CONFIG NOT FOUND`。
- 脚本自己**必须存成 UTF-8 with BOM**，否则 5.1 会按 GBK 解析，中文字符串把引号吃掉，报一堆语法错误 —— 这个坑我踩过。

### 完整脚本

540 行，整段复制存成 `Install-TerminalTheme.ps1` 即可运行，不依赖其他文件。

```powershell
<#
.SYNOPSIS
    一键部署 Windows 终端外观：PowerShell 7 + oh-my-posh + Nerd Font + $PROFILE + Windows Terminal。

.DESCRIPTION
    把手工步骤固化，支持重复执行（幂等）：
      1. 检查/安装 PowerShell 7
      2. 检查/安装 oh-my-posh
      3. 检查/安装 Nerd Font（GitHub 不通时自动走镜像）
      4. 写入 5.1 与 7 两套 $PROFILE（UTF-8 with BOM）
      5. 修补 Windows Terminal settings.json（默认 profile、字体、配色、-NoLogo）
      6. 校验并输出汇总

    所有改动前都会备份，原文件不会直接丢。

.PARAMETER Theme
    oh-my-posh 主题名（内置名，如 paradox / atomic / jandedobbeleer）。默认 paradox。

.PARAMETER Font
    要安装的 Nerd Font 预设：Meslo / CaskaydiaCove / None。

.PARAMETER DryRun
    只打印将要做什么，不写任何文件。

.EXAMPLE
    .\Install-TerminalTheme.ps1 -DryRun

.EXAMPLE
    .\Install-TerminalTheme.ps1 -Theme paradox -Font Meslo
#>
#Requires -Version 5.1
[CmdletBinding()]
param(
    [string] $Theme = 'paradox',
    [ValidateSet('Meslo', 'CaskaydiaCove', 'None')]
    [string] $Font = 'Meslo',
    [switch] $DryRun,
    [switch] $Upgrade
)

$ErrorActionPreference = 'Stop'
$ProgressPreference    = 'SilentlyContinue'
$script:Summary        = New-Object System.Collections.ArrayList

# ============================================================
# 输出小工具
# ============================================================
function Write-Step {
    param([int] $No, [string] $Title)
    Write-Host ''
    Write-Host ("[{0}/6] {1}" -f $No, $Title) -ForegroundColor Cyan
}
function Write-Info { param([string] $Msg) Write-Host ("       {0}" -f $Msg) -ForegroundColor DarkGray }
function Write-Ok   { param([string] $Msg) Write-Host ("       OK  {0}" -f $Msg) -ForegroundColor Green }
function Write-Warn2{ param([string] $Msg) Write-Host ("       !!  {0}" -f $Msg) -ForegroundColor Yellow }
function Write-Item { param([string] $Msg) Write-Host ("       -   {0}" -f $Msg) -ForegroundColor DarkGray }

function Add-Summary {
    param([string] $Item, [string] $State, [string] $Note = '')
    [void]$script:Summary.Add([pscustomobject]@{
        Item  = $Item
        State = $State
        Note  = $Note
    })
}

function Test-Cmd {
    param([string] $Name)
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Backup-File {
    param([string] $Path)
    if (!(Test-Path $Path)) { return $null }
    $bak = '{0}.bak-{1}' -f $Path, (Get-Date -Format 'yyyyMMdd-HHmmss')
    Copy-Item $Path $bak -Force
    return $bak
}

# ============================================================
# [1/6] 环境
# ============================================================
Write-Step 1 '环境检查'
Write-Info ("Windows PowerShell {0} / {1}" -f $PSVersionTable.PSVersion, [Environment]::OSVersion.Version)
if (-not (Test-Cmd 'winget')) {
    Write-Warn2 'winget 不可用，安装步骤会跳过，需要手动准备 PowerShell 7 与 oh-my-posh'
} else {
    Write-Ok 'winget 可用'
}
if ($DryRun) {
    Write-Warn2 'DryRun 模式：只检查，不写入任何文件'
}

# ============================================================
# [2/6] PowerShell 7
# ============================================================
Write-Step 2 'PowerShell 7'
if (Test-Cmd 'pwsh') {
    $pwshVersion = (& pwsh -NoLogo -NoProfile -Command '$PSVersionTable.PSVersion.ToString()')
    Write-Ok ("已安装 {0}" -f $pwshVersion)
    Add-Summary 'PowerShell 7' '已存在' $pwshVersion
} elseif ($DryRun) {
    Write-Info '将执行：winget install --id Microsoft.PowerShell -e'
    Add-Summary 'PowerShell 7' '待安装' 'dry-run'
} elseif (Test-Cmd 'winget') {
    Write-Info '正在安装 PowerShell 7（约 100MB，需要几分钟）'
    & winget install --id Microsoft.PowerShell -e --accept-package-agreements --accept-source-agreements --disable-interactivity
    if (Test-Cmd 'pwsh') {
        Write-Ok 'PowerShell 7 安装完成'
        Add-Summary 'PowerShell 7' '已安装' ''
    } else {
        Write-Warn2 '安装后仍未找到 pwsh，请重开终端后手动重试'
        Add-Summary 'PowerShell 7' '失败' '未找到 pwsh'
    }
} else {
    Write-Warn2 '无 winget，跳过'
    Add-Summary 'PowerShell 7' '跳过' '无 winget'
}

# ============================================================
# [3/6] oh-my-posh
# ============================================================
Write-Step 3 'oh-my-posh'
if (Test-Cmd 'oh-my-posh') {
    $ompVersion = (& oh-my-posh --version)
    Write-Ok ("已安装 {0}" -f $ompVersion)
    if ($Upgrade -and -not $DryRun -and (Test-Cmd 'winget')) {
        Write-Info '尝试升级'
        & winget upgrade --id JanDeDobbeleer.OhMyPosh -e --accept-package-agreements --accept-source-agreements --disable-interactivity
    }
    Add-Summary 'oh-my-posh' '已存在' $ompVersion
} elseif ($DryRun) {
    Write-Info '将执行：winget install --id JanDeDobbeleer.OhMyPosh -e'
    Add-Summary 'oh-my-posh' '待安装' 'dry-run'
} elseif (Test-Cmd 'winget') {
    Write-Info '正在安装 oh-my-posh'
    & winget install --id JanDeDobbeleer.OhMyPosh -e --accept-package-agreements --accept-source-agreements --disable-interactivity
    if (Test-Cmd 'oh-my-posh') {
        Write-Ok 'oh-my-posh 安装完成'
        Add-Summary 'oh-my-posh' '已安装' ''
    } else {
        Write-Warn2 '安装失败，请重开终端后重试'
        Add-Summary 'oh-my-posh' '失败' ''
    }
} else {
    Write-Warn2 '无 winget，跳过'
    Add-Summary 'oh-my-posh' '跳过' '无 winget'
}

# 主题名大小写敏感，写错只会渲染 CONFIG NOT FOUND（不报错），这里先归一化
$Theme = $Theme.ToLowerInvariant()

# ============================================================
# [4/6] Nerd Font
# ============================================================
Write-Step 4 'Nerd 字体'

$fontSpecs = @{
    'Meslo'         = @{ Zip = 'Meslo.zip';        Prefix = 'MesloLGMNerdFont-';      Face = 'MesloLGM Nerd Font' }
    'CaskaydiaCove' = @{ Zip = 'CaskaydiaCove.zip'; Prefix = 'CaskaydiaCoveNerdFont-'; Face = 'CaskaydiaCove Nerd Font' }
}

function Test-FontInstalled {
    param([string] $Face)
    $keys = @(
        'HKCU:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts',
        'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts'
    )
    foreach ($k in $keys) {
        $names = (Get-ItemProperty $k -ErrorAction SilentlyContinue).PSObject.Properties.Name
        if ($names -match [regex]::Escape($Face)) { return $true }
    }
    return $false
}

$fontFace = 'MesloLGM Nerd Font'
if ($Font -ne 'None' -and $fontSpecs.ContainsKey($Font)) {
    $fontFace = $fontSpecs[$Font].Face
}

if ($Font -eq 'None') {
    Write-Info '按要求跳过'
    Add-Summary 'Nerd Font' '跳过' 'Font=None'
}
elseif (Test-FontInstalled -Face $fontFace) {
    Write-Ok ("{0} 已安装" -f $fontFace)
    Add-Summary 'Nerd Font' '已存在' $fontFace
}
elseif ($DryRun) {
    Write-Info ("将安装 {0}" -f $fontFace)
    Add-Summary 'Nerd Font' '待安装' 'dry-run'
}
else {
    $installed = $false

    # 首选：官方命令（走 GitHub Releases，国内常失败，退出码 70）
    if (Test-Cmd 'oh-my-posh') {
        Write-Info ("尝试 oh-my-posh font install {0}" -f $Font)
        & oh-my-posh font install $Font 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0 -and (Test-FontInstalled -Face $fontFace)) {
            $installed = $true
            Write-Ok '官方命令安装成功'
        } else {
            Write-Warn2 ("官方命令失败（exit={0}），改用镜像" -f $LASTEXITCODE)
        }
    }

    # 兜底：gh 镜像下载 + 用户级注册表安装（不需要管理员）
    if (-not $installed -and $fontSpecs.ContainsKey($Font)) {
        $spec   = $fontSpecs[$Font]
        $mirror = 'https://gh-proxy.com/https://github.com/ryanoasis/nerd-fonts/releases/download/v3.4.0/' + $spec.Zip
        $zip    = Join-Path $env:TEMP $spec.Zip
        $outDir = Join-Path $env:TEMP ('nerdfont-' + $Font)

        Write-Info ("镜像下载 {0}" -f $spec.Zip)
        & curl.exe -L --retry 3 --retry-delay 2 -s -o $zip $mirror
        if ((Test-Path $zip) -and (Get-Item $zip).Length -gt 10MB) {
            if (Test-Path $outDir) { Remove-Item $outDir -Recurse -Force }
            Expand-Archive -Path $zip -DestinationPath $outDir -Force

            $userFontDir = Join-Path $env:LOCALAPPDATA 'Microsoft\Windows\Fonts'
            if (!(Test-Path $userFontDir)) { New-Item -ItemType Directory -Path $userFontDir -Force | Out-Null }
            $regKey = 'HKCU:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts'

            $ttfs = Get-ChildItem $outDir -Recurse -Filter ($spec.Prefix + '*.ttf')
            foreach ($ttf in $ttfs) {
                $style = ($ttf.BaseName -replace ('^' + [regex]::Escape($spec.Prefix)), '')
                if ($style -eq 'BoldItalic') { $style = 'Bold Italic' }
                if ($style -eq 'Regular')    { $style = 'Regular' }
                $target = Join-Path $userFontDir $ttf.Name
                Copy-Item $ttf.FullName $target -Force
                New-ItemProperty -Path $regKey -Name ("{0} {1} (TrueType)" -f $spec.Face, $style) `
                    -Value $target -PropertyType String -Force | Out-Null
            }
            Remove-Item $zip -Force -ErrorAction SilentlyContinue
            Remove-Item $outDir -Recurse -Force -ErrorAction SilentlyContinue

            if ($ttfs.Count -gt 0) {
                $installed = $true
                Write-Ok ("用户级安装 {0} 个字体文件" -f $ttfs.Count)
                Write-Warn2 '首次安装后可能需要注销重登，字体才会被应用枚举到'
            }
        } else {
            Write-Warn2 '下载失败，请手动安装字体后重跑脚本'
        }
    }

    if ($installed) {
        Add-Summary 'Nerd Font' '已安装' $fontFace
    } else {
        Add-Summary 'Nerd Font' '失败' '需手动安装'
    }
}

# ============================================================
# [5/6] $PROFILE（5.1 与 7 各一份，UTF-8 with BOM）
# ============================================================
Write-Step 5 '$PROFILE'

$profileTemplate = @'
# ============================================================
# 由 Install-TerminalTheme.ps1 生成
# 修改后重载： . $PROFILE
# ============================================================

# ==================== oh-my-posh ====================
# 主题名区分大小写，写 Paradox 会渲染成 CONFIG NOT FOUND；也可换成 json 绝对路径
$ompTheme = '{{THEME}}'

if ($PSVersionTable.PSEdition -eq 'Core') {
    oh-my-posh init pwsh --config $ompTheme | Invoke-Expression
}
else {
    # 5.1 必须用 powershell 这个 shell 名，写成 pwsh 拿到的是错误的初始化脚本
    oh-my-posh init powershell --config $ompTheme | Invoke-Expression
}

# 启动偏慢时，改用缓存模式（升级 omp 后需重新生成）：
# $ompInit = Join-Path $env:TEMP 'omp-init.ps1'
# if ($PSVersionTable.PSEdition -eq 'Core') { $ompShell = 'pwsh' } else { $ompShell = 'powershell' }
# oh-my-posh init $ompShell --config $ompTheme --print | Out-File $ompInit -Encoding utf8
# . $ompInit

# ==================== 编码 ====================
$env:PYTHONIOENCODING = 'utf-8'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# ==================== 模块 ====================
# 没装就静默跳过，不往 $Error 里塞垃圾
Import-Module Terminal-Icons -ErrorAction Ignore
Import-Module posh-git       -ErrorAction Ignore

# ==================== PSReadLine ====================
# 5.1 自带 2.0.0：没有 PredictionSource / PredictionViewStyle（2.2 才加入），所以要探测
$psrl = (Get-Command Set-PSReadLineOption).Parameters

Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
Set-PSReadLineOption -EditMode Windows

if ($psrl.ContainsKey('PredictionSource')) {
    Set-PSReadLineOption -PredictionSource History
    Set-PSReadLineOption -PredictionViewStyle ListView
}

# ==================== 自定义函数 ====================
function GoBack      { Set-Location .. }
function GitStat     { git status }
function Vscode      { code . }
function GetMyIp     { curl.exe -L https://tool.lu/ip }
function UpdateScoop { scoop update; scoop update * }
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

# ==================== 别名（放在函数之后，避免前向引用） ====================
Set-Alias open  Invoke-Item
Set-Alias ll    Get-ChildItem
Set-Alias code  Vscode
Set-Alias ..    GoBack
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
Set-Alias grlz  GitRlz
Set-Alias gdoc  GitDoc
Set-Alias gtst  GitTst
'@

$profileContent = $profileTemplate.Replace('{{THEME}}', $Theme)

$profileWritten = $false
$docs         = [Environment]::GetFolderPath('MyDocuments')
$profilePaths = @(
    (Join-Path $docs 'WindowsPowerShell\Microsoft.PowerShell_profile.ps1'),  # 5.1
    (Join-Path $docs 'PowerShell\Microsoft.PowerShell_profile.ps1')           # 7
)

foreach ($path in $profilePaths) {
    $dir = Split-Path $path -Parent
    if (!(Test-Path $dir)) {
        if ($DryRun) { Write-Info ("将创建目录 {0}" -f $dir); continue }
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    if ($DryRun) {
        Write-Info ("将写入 {0}" -f $path)
        continue
    }

    # 内容一致就不动，避免每次重跑都刷一遍文件时间戳
    $existing = ''
    if (Test-Path $path) { $existing = [IO.File]::ReadAllText($path).TrimStart([char]0xFEFF) }
    if ($existing -eq $profileContent) {
        Write-Info ("{0} 内容一致，跳过" -f (Split-Path $path -Leaf))
        continue
    }

    $bak = Backup-File -Path $path
    if ($bak) { Write-Info ("已备份 {0}" -f (Split-Path $bak -Leaf)) }

    # 必须 UTF-8 with BOM：5.1 读无 BOM 的 UTF-8 会把 emoji 弄成乱码
    [IO.File]::WriteAllText($path, $profileContent, (New-Object System.Text.UTF8Encoding($true)))
    Write-Ok ("写入 {0}" -f $path)
    $profileWritten = $true
}
$profileState = '无需改动'
if ($DryRun) { $profileState = '待写入' }
elseif ($profileWritten) { $profileState = '已写入' }
Add-Summary '$PROFILE' $profileState '2 份（5.1 + 7）'

# ============================================================
# [6/6] Windows Terminal settings.json
# ============================================================
Write-Step 6 'Windows Terminal 配置'

$wtCandidates = @(
    (Join-Path $env:LOCALAPPDATA 'Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json'),
    (Join-Path $env:LOCALAPPDATA 'Packages\Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe\LocalState\settings.json'),
    (Join-Path $env:LOCALAPPDATA 'Microsoft\Windows Terminal\settings.json')
)
$wtPath = $wtCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

$ps7Guid  = '{574e775e-4f2a-5b96-ac1e-a2962a402336}'

function Set-ObjProp {
    param($Object, [string] $Name, $Value)
    if ($Object.PSObject.Properties.Name -contains $Name) { $Object.$Name = $Value }
    else { $Object | Add-Member -NotePropertyName $Name -NotePropertyValue $Value }
}

if (-not $wtPath) {
    Write-Warn2 '没找到 Windows Terminal 的 settings.json，跳过'
    Add-Summary 'Windows Terminal' '跳过' '未找到配置'
}
elseif ($DryRun) {
    Write-Info ("将修补 {0}" -f $wtPath)
    Write-Info ("默认 profile -> {0}，字体 -> {1}" -f $ps7Guid, $fontFace)
    Add-Summary 'Windows Terminal' '待修补' 'dry-run'
}
else {
    $json    = Get-Content $wtPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $changed = $false

    if (-not $json.profiles) { Set-ObjProp $json 'profiles' ([pscustomobject]@{}); $changed = $true }
    if (-not $json.profiles.defaults) { Set-ObjProp $json.profiles 'defaults' ([pscustomobject]@{}); $changed = $true }
    if (-not $json.profiles.list) { Set-ObjProp $json.profiles 'list' @(); $changed = $true }

    # 默认 profile 指向 PowerShell 7
    if ($json.defaultProfile -ne $ps7Guid) {
        Set-ObjProp $json 'defaultProfile' $ps7Guid
        $changed = $true
    }

    # 公共外观
    $defaults = $json.profiles.defaults
    if ($Font -ne 'None') {
        if (-not $defaults.font) { Set-ObjProp $defaults 'font' ([pscustomobject]@{}); $changed = $true }
        if ($defaults.font.face -ne $fontFace) { Set-ObjProp $defaults.font 'face' $fontFace; $changed = $true }
        if ($defaults.font.size -ne 11) { Set-ObjProp $defaults.font 'size' 11; $changed = $true }
    }

    $appearance = @(
        @('colorScheme', 'One Half Dark'),
        @('opacity', 92),
        @('useAcrylic', $true),
        @('padding', '8, 8, 8, 8')
    )
    foreach ($kv in $appearance) {
        $prop = $defaults.PSObject.Properties[$kv[0]]
        if (-not $prop -or $prop.Value -ne $kv[1]) {
            Set-ObjProp $defaults $kv[0] $kv[1]
            $changed = $true
        }
    }

    # PowerShell 7 profile：存在则补 -NoLogo，不存在则新增
    $ps7Profile = $json.profiles.list | Where-Object { $_.guid -eq $ps7Guid } | Select-Object -First 1
    if ($ps7Profile) {
        if ($ps7Profile.commandline -ne 'pwsh.exe -NoLogo') {
            Set-ObjProp $ps7Profile 'commandline' 'pwsh.exe -NoLogo'
            $changed = $true
        }
        if ($ps7Profile.hidden -ne $false) { Set-ObjProp $ps7Profile 'hidden' $false; $changed = $true }
    } else {
        $newProfile = [pscustomobject]@{
            commandline = 'pwsh.exe -NoLogo'
            guid        = $ps7Guid
            hidden      = $false
            name        = 'PowerShell 7'
        }
        Set-ObjProp $json.profiles 'list' (@($json.profiles.list) + $newProfile)
        $changed = $true
    }

    if (-not $changed) {
        Write-Info '配置已是目标状态，跳过写入'
        Add-Summary 'Windows Terminal' '无需改动' ''
    } else {
        $bak = Backup-File -Path $wtPath
        Write-Info ("已备份 {0}" -f (Split-Path $bak -Leaf))

        # 不带 BOM 写回：带 BOM 的 json 某些 WT 版本会解析失败
        $jsonText = $json | ConvertTo-Json -Depth 32
        [IO.File]::WriteAllText($wtPath, $jsonText, (New-Object System.Text.UTF8Encoding($false)))
        Write-Ok '已更新 settings.json（WT 会热重载，新标签页生效）'
        Add-Summary 'Windows Terminal' '已更新' 'defaultProfile -> PS7'
    }
}

# ============================================================
# 校验
# ============================================================
Write-Host ''
Write-Host '校验' -ForegroundColor Cyan

if ($DryRun) {
    Write-Info 'DryRun 跳过校验'
} else {
    if (Test-Cmd 'oh-my-posh') {
        $rendered = & oh-my-posh print primary --config $Theme --plain 2>&1 | Out-String
        if ($rendered -match 'CONFIG NOT FOUND') {
            Write-Warn2 ("主题 '{0}' 不存在（可能拼错或大小写不对）" -f $Theme)
            Add-Summary '主题渲染' '失败' 'CONFIG NOT FOUND'
        } else {
            Write-Ok ("主题 {0} 渲染正常" -f $Theme)
            Add-Summary '主题渲染' 'OK' $Theme
        }
    }

    foreach ($path in $profilePaths) {
        if (Test-Path $path) {
            $bytes = [IO.File]::ReadAllBytes($path)[0..2]
            $hasBom = ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)
            Write-Ok ("{0}  存在 / BOM={1}" -f (Split-Path (Split-Path $path -Parent) -Leaf), $hasBom)
        } else {
            Write-Warn2 ("{0} 缺失" -f $path)
        }
    }

    if ($wtPath -and (Test-Path $wtPath)) {
        try {
            $check = Get-Content $wtPath -Raw -Encoding UTF8 | ConvertFrom-Json
            Write-Ok ("settings.json 解析正常，defaultProfile={0}" -f $check.defaultProfile)
        } catch {
            Write-Warn2 'settings.json 解析失败，请用备份恢复'
        }
    }
}

# ============================================================
# 汇总
# ============================================================
Write-Host ''
Write-Host '汇总' -ForegroundColor Cyan
$script:Summary | Format-Table -AutoSize | Out-String -Width 120 | Write-Host

Write-Host '生效方式：' -ForegroundColor Cyan
Write-Host '  当前窗口  . $PROFILE' -ForegroundColor DarkGray
Write-Host '  新开标签  完全退出 Windows Terminal 后重开（字体需要进程重启才能枚举）' -ForegroundColor DarkGray
Write-Host '  字体异常  注销重登一次' -ForegroundColor DarkGray
```

### 从网页复制时别忘了 BOM

上面这段直接粘进 VS Code 存盘，默认是 **UTF-8 无 BOM**，5.1 会按 GBK 解析、中文全乱并报一堆「意外的标记」。两种修法：

**VS Code**：右下角编码 → `Save with Encoding` → `UTF-8 with BOM`。

**已经有文件了**，跑一次就地转换：

```powershell
$p = '.\Install-TerminalTheme.ps1'
$txt = [IO.File]::ReadAllText($p, (New-Object System.Text.UTF8Encoding($false)))
[IO.File]::WriteAllText($p, $txt, (New-Object System.Text.UTF8Encoding($true)))

# 核对前三字节，应为 EF BB BF
([IO.File]::ReadAllBytes($p)[0..2] | ForEach-Object { $_.ToString('X2') }) -join ' '
```

存好后先 `-DryRun` 跑一遍确认无误，再正式执行。

## 14. 参考

- oh-my-posh 官网：[ohmyposh.dev](https://ohmyposh.dev)
- 主题库：[ohmyposh.dev/docs/themes](https://ohmyposh.dev/docs/themes)
- 仓库：[github.com/JanDeDobbeleer/oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh)
- Nerd Fonts：[nerdfonts.com](https://www.nerdfonts.com)
- Sarasa Gothic：[github.com/be5invis/Sarasa-Gothic](https://github.com/be5invis/Sarasa-Gothic/releases)
- PowerShell 7 发布页：[github.com/PowerShell/PowerShell/releases](https://github.com/PowerShell/PowerShell/releases)
