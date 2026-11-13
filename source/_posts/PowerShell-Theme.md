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
旧文写于 2020 年，三条核心命令全部失效。这篇按 2026 年的实际环境重写。

**四步搞定**：

| 步骤 | 做什么 | 命令 |
| --- | --- | --- |
| 1 | 装 PowerShell 7 | `winget install --id Microsoft.PowerShell -e` |
| 2 | 装 oh-my-posh | `winget install --id JanDeDobbeleer.OhMyPosh -e` |
| 3 | 装 Nerd 字体 | `oh-my-posh font install` |
| 4 | 写 `$PROFILE` | 见第 3 节 |

文中命令均在 PowerShell 7.7.0 + oh-my-posh 32.0.0 + `paradox` 主题下实测通过。

## 1. 装 PowerShell 7

```powershell
winget install --id Microsoft.PowerShell -e
```

Windows 自带的那个是 **Windows PowerShell 5.1**（`powershell.exe`），2016 年后只修 bug 不加功能。PowerShell 7（`pwsh.exe`）是独立安装的另一条线，两者并存不冲突。

装完先确认：

```powershell
pwsh -v      # 应该输出 7.x
```

## 2. 装 oh-my-posh 和字体

```powershell
winget install --id JanDeDobbeleer.OhMyPosh -e
oh-my-posh font install          # 交互式，选 Meslo 或 CaskaydiaCove
```

`oh-my-posh` 自 2021 年 v3 起**不再是 PowerShell 模块**，而是一个独立的 Go 程序。所以 `Install-Module oh-my-posh` 装到的是废弃版本，别再用了。

字体装完要**完全退出 Windows Terminal 再打开**（关标签页不算），否则字体列表里刷不出来。

### 字体下载失败（国内网络）

`oh-my-posh font install` 会去 GitHub 拉包，很可能超时。走镜像：

```powershell
curl.exe -L -o "$env:TEMP\Meslo.zip" "https://gh-proxy.com/https://github.com/ryanoasis/nerd-fonts/releases/download/v3.4.0/Meslo.zip"
```

解压后取 `MesloLGMNerdFont-*.ttf`（4 个），复制到 `%LOCALAPPDATA%\Microsoft\Windows\Fonts`，再写注册表：

```powershell
$dir = "$env:LOCALAPPDATA\Microsoft\Windows\Fonts"
$key = 'HKCU:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts'
Get-ChildItem "$env:TEMP\Meslo" -Filter 'MesloLGMNerdFont-*.ttf' | ForEach-Object {
    $style = $_.BaseName -replace '^MesloLGMNerdFont-','' -replace 'BoldItalic','Bold Italic'
    Copy-Item $_.FullName "$dir\$($_.Name)" -Force
    New-ItemProperty -Path $key -Name "MesloLGM Nerd Font $style (TrueType)" -Value "$dir\$($_.Name)" -PropertyType String -Force | Out-Null
}
```

不需要管理员权限。装完注销重登一次更保险。

## 3. 写 `$PROFILE`

### 路径

5.1 和 7 读的是**两个不同的文件**，只配一个另一个不生效：

| Shell | 路径 |
| --- | --- |
| PowerShell 7 | `%USERPROFILE%\Documents\PowerShell\Microsoft.PowerShell_profile.ps1` |
| 5.1 | `%USERPROFILE%\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` |

在对应 Shell 里执行 `$PROFILE` 会直接打印路径，别手拼。

### 模板

整段复制，改掉 `$ompTheme` 即可：

```powershell
# ==================== PATH 自愈 ====================
# VSCode / 计划任务等宿主继承的 PATH 是启动时的快照，新装的 Python、Node 看不到。
# 补回注册表用户 PATH 中缺失且存在的目录；必须插到最前，避开 WindowsApps 里的
# 0 字节幽灵别名（python.exe 这类空壳会以 9009 抢占命令）。
$__have = @($env:PATH -split ';' | Where-Object { $_ } | ForEach-Object { $_.TrimEnd('\') })
$__need = @()
foreach ($__e in ([Environment]::GetEnvironmentVariable('PATH', 'User') -split ';')) {
    if (-not $__e) { continue }
    $__x = [Environment]::ExpandEnvironmentVariables($__e).TrimEnd('\')
    if (-not (Test-Path -LiteralPath $__x)) { continue }
    if ($__have -contains $__x) { continue }
    $__need += $__x
    $__have += $__x
}
if ($__need.Count -gt 0) { $env:PATH = ($__need -join ';') + ';' + $env:PATH }
Remove-Variable __have, __need, __e, __x -ErrorAction SilentlyContinue

# ==================== oh-my-posh ====================
# 主题名区分大小写，写 Paradox 会渲染成 CONFIG NOT FOUND 且不报错
$ompTheme = 'paradox'

$ompExe = (Get-Command oh-my-posh.exe -ErrorAction SilentlyContinue).Source
if (-not $ompExe) {
    $ompExe = @(
        "$env:LOCALAPPDATA\Microsoft\WindowsApps\oh-my-posh.exe"
        "$env:LOCALAPPDATA\Programs\oh-my-posh\oh-my-posh.exe"
        "$env:ProgramFiles\oh-my-posh\oh-my-posh.exe"
        "$env:USERPROFILE\scoop\shims\oh-my-posh.exe"
    ) | Where-Object { Test-Path $_ } | Select-Object -First 1
    # prompt 函数内部用裸名调用，所以必须把目录补回 PATH，只换绝对路径不够
    if ($ompExe) { $env:PATH = (Split-Path $ompExe -Parent) + ';' + $env:PATH }
}

if ($ompExe) {
    if ($PSVersionTable.PSEdition -eq 'Core') {
        & $ompExe init pwsh --config $ompTheme | Invoke-Expression
    }
    else {
        # 5.1 必须用 powershell 这个 shell 名
        & $ompExe init powershell --config $ompTheme | Invoke-Expression
    }
}

# ==================== PSReadLine ====================
# 5.1 自带 2.0.0，没有 PredictionSource（2.2 才有），先探测再设
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
$psrl = (Get-Command Set-PSReadLineOption).Parameters
if ($psrl.ContainsKey('PredictionSource') -and -not [Console]::IsOutputRedirected) {
    try {
        Set-PSReadLineOption -PredictionSource History
        Set-PSReadLineOption -PredictionViewStyle ListView
    }
    catch { }
}

# ==================== 编码 ====================
$env:PYTHONIOENCODING = 'utf-8'

# 你自己的别名和函数加在这行下面
```

### 两个必踩的坑

**文件必须存成 UTF-8 with BOM。** 5.1 读无 BOM 的 UTF-8 会按 GBK 解析，中文乱码不算完，`@'...'@` 这类结构还可能直接语法报错。VS Code 右下角编码 → `Save with Encoding` → `UTF-8 with BOM`。

**主题名区分大小写。** `--config Paradox` 会渲染成 `CONFIG NOT FOUND`，但**退出码仍然是 0**，静默失败，光看报错发现不了。

## 4. Windows Terminal 配置

`Ctrl + ,` → 左下角「打开 JSON 文件」，实际路径：

```
%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json
```

```jsonc
{
  "defaultProfile": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",   // PowerShell 7
  "profiles": {
    "defaults": {
      "font": { "face": "MesloLGM Nerd Font", "size": 11 },
      "colorScheme": "One Half Dark",
      "opacity": 92,
      "useAcrylic": true,
      "padding": "8, 8, 8, 8"
    },
    "list": [
      { "guid": "{574e775e-4f2a-5b96-ac1e-a2962a402336}", "name": "PowerShell 7", "commandline": "pwsh.exe -NoLogo" }
    ]
  }
}
```

- `defaultProfile` 必须指向 PS7，否则每次开的是 5.1，会以为配置没生效。这是最高频的「不生效」原因。
- `-NoLogo` 用来关掉每次启动的 `PowerShell 7.7.0` 横幅。它由 `pwsh` 在 profile 加载**之前**打印，写进 `$PROFILE` 拦不住，只能加启动参数。
- 不写 `commandline` 时 WT 会自动补 `pwsh.exe`；需要带参数时才显式写。
- 改完热重载，新开标签页生效。JSON 语法错误会导致整份配置被忽略。

## 5. 排错

| 症状 | 原因 | 处理 |
| --- | --- | --- |
| 满屏方框 | 字体不是 Nerd Font，或 WT 没重启 | 装字体后退出 WT 重开；字体名要带 `Nerd Font` 后缀 |
| `Set-Theme` 识别不了 | 在跑旧教程 | 改成 `oh-my-posh init pwsh --config X \| Invoke-Expression` |
| 提示符是 `CONFIG NOT FOUND` | 主题名大小写错 | 改全小写；此错误不报异常、退出码为 0 |
| `找不到 PredictionSource 参数` | 5.1 自带 PSReadLine 2.0.0 | 用模板里的 `ContainsKey` 探测，或 `Install-Module PSReadLine -Scope CurrentUser -Force` |
| 加了 `-NoLogo` 还有横幅 | 看的是旧标签页 | 新开标签页；从快捷方式直起 pwsh 的也要加 |
| VSCode 终端里 `oh-my-posh` / `python` 找不到，WT 正常 | VSCode 进程的 PATH 是启动快照 | 模板里的 PATH 自愈段；或完全退出 VSCode 重开 |
| `python` 能"找到"但报 9009 | 命中了 WindowsApps 的 0 字节幽灵别名 | 真 Python 目录插到 PATH 最前，或在「应用执行别名」里关掉 |
| 中文乱码 | 5.1 编码 + 无 BOM | 存成 UTF-8 with BOM，或改用 PS7 |
| 改配置没反应 | 改的是另一个 `$PROFILE` | 打印 `$PROFILE` 确认路径 |
| 启动慢 | segment 太多或联网检查 | `oh-my-posh debug` 看每个 segment 耗时；`oh-my-posh disable notice` |

## 6. 旧文命令对照

| 2020 版 | 现在 |
| --- | --- |
| `Install-Module oh-my-posh` | `winget install --id JanDeDobbeleer.OhMyPosh -e` |
| `Set-Theme Paradox` | `oh-my-posh init pwsh --config paradox` |
| `Get-PoshThemes` | 已随模块消失，改看[官网主题库](https://ohmyposh.dev/docs/themes) |
| `Import-Module Get-ChildItemColor` | `Install-Module Terminal-Icons` |
| `colortool -d xxx` | Windows Terminal 设置里直接选 `colorScheme` |

## 7. 一键脚本

上面所有步骤固化成了 `Install-TerminalTheme.ps1`，重装系统或换机器时直接跑：

```powershell
.\Install-TerminalTheme.ps1 -DryRun      # 先看要做什么
.\Install-TerminalTheme.ps1              # 执行
.\Install-TerminalTheme.ps1 -Upgrade     # 顺带升级 oh-my-posh
```

幂等设计：已装的东西跳过，profile 内容一致则跳过，WT 配置逐项比对、无变化零写入。

脚本本身也必须存成 **UTF-8 with BOM**，否则 5.1 解析中文注释时会报一屏「意外的标记」。

### 完整脚本

点开复制，存成 `Install-TerminalTheme.ps1` 就能跑。**必须存成 UTF-8 with BOM**，否则 5.1 解析中文注释会报错。

<details>
<summary>展开查看完整脚本（603 行）</summary>

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

# ==================== PATH 自愈 ====================
# 宿主进程（VSCode / 计划任务 / SSH / 远程会话）的 PATH 是它「启动那一刻」的快照。
# 之后新装的工具（Python、Node、JDK…）只写进了注册表，这些进程看不到，症状是：
#   Windows Terminal 里 python 正常，VSCode 内置终端报「不是内部或外部命令」。
# 下面把注册表用户 PATH 里缺失、且真实存在的目录补回来。
#
# 必须插到「最前」而不是追加到末尾：%LOCALAPPDATA%\Microsoft\WindowsApps 下常有
# 0 字节的 python.exe 应用执行别名（幽灵别名，运行直接返回 9009），若真 Python
# 排在它后面，命令会被这个空壳抢走。
$__have = @($env:PATH -split ';' | Where-Object { $_ } | ForEach-Object { $_.TrimEnd('\') })
$__need = @()
foreach ($__e in ([Environment]::GetEnvironmentVariable('PATH', 'User') -split ';')) {
    if (-not $__e) { continue }
    $__x = [Environment]::ExpandEnvironmentVariables($__e).TrimEnd('\')
    if (-not (Test-Path -LiteralPath $__x)) { continue }
    if ($__have -contains $__x) { continue }
    $__need += $__x
    $__have += $__x
}
if ($__need.Count -gt 0) {
    $env:PATH = ($__need -join ';') + ';' + $env:PATH
    try {
        (@('time=' + (Get-Date).ToString('yyyy-MM-dd HH:mm:ss'), 'host=' + $Host.Name, 'ps=' + $PSVersionTable.PSVersion, 'prepended=') + $__need + @('full=') + ($env:PATH -split ';')) |
            Set-Content -Path (Join-Path $env:TEMP 'profile-path-heal.log') -Encoding UTF8
    }
    catch { }
}
Remove-Variable __have, __need, __e, __x -ErrorAction SilentlyContinue

# ==================== oh-my-posh ====================
# 主题名区分大小写，写 Paradox 会渲染成 CONFIG NOT FOUND；也可换成 json 绝对路径
$ompTheme = '{{THEME}}'

# 定位可执行文件。Windows Terminal 继承的 PATH 里有 %LOCALAPPDATA%\Microsoft\WindowsApps，
# 但 VSCode / 计划任务 / SSH 继承下来的 PATH 可能没有 → 直接写 oh-my-posh 会报「术语不被识别」
$ompExe = (Get-Command oh-my-posh.exe -ErrorAction SilentlyContinue).Source
if (-not $ompExe) {
    $ompExe = @(
        "$env:LOCALAPPDATA\Microsoft\WindowsApps\oh-my-posh.exe"   # winget / Microsoft Store
        "$env:LOCALAPPDATA\Programs\oh-my-posh\oh-my-posh.exe"
        "$env:ProgramFiles\oh-my-posh\oh-my-posh.exe"
        "$env:USERPROFILE\scoop\shims\oh-my-posh.exe"
    ) | Where-Object { Test-Path $_ } | Select-Object -First 1

    if ($ompExe) {
        $ompDir = Split-Path $ompExe -Parent
        # 必须补回 PATH：init 生成的 prompt 函数是用裸名 oh-my-posh.exe 调用的
        $env:PATH = $ompDir + ';' + $env:PATH
        # 留一份现场，方便查这个宿主到底缺了哪些路径
        try {
            "host=$($Host.Name) / $($PSVersionTable.PSVersion) / $ompExe`nPATH=`n" + (($env:PATH -split ';') -join "`n") |
                Set-Content (Join-Path $env:TEMP 'omp-profile-fallback.log') -Encoding UTF8
        }
        catch { }
    }
}

if ($ompExe) {
    if ($PSVersionTable.PSEdition -eq 'Core') {
        & $ompExe init pwsh --config $ompTheme | Invoke-Expression
    }
    else {
        # 5.1 必须用 powershell 这个 shell 名，写成 pwsh 拿到的是错误的初始化脚本
        & $ompExe init powershell --config $ompTheme | Invoke-Expression
    }
}
else {
    Write-Host '[profile] 没找到 oh-my-posh，提示符保持默认。装好后重开窗口即可：' -ForegroundColor Yellow
    Write-Host '          winget install --id JanDeDobbeleer.OhMyPosh -e' -ForegroundColor DarkGray
}

# 启动偏慢时，改用缓存模式（升级 omp 后需重新生成）：
# $ompInit = Join-Path $env:TEMP 'omp-init.ps1'
# if ($PSVersionTable.PSEdition -eq 'Core') { $ompShell = 'pwsh' } else { $ompShell = 'powershell' }
# & $ompExe init $ompShell --config $ompTheme --print | Out-File $ompInit -Encoding utf8
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

if ($psrl.ContainsKey('PredictionSource') -and -not [Console]::IsOutputRedirected) {
    # 输出被重定向、或宿主不支持虚拟终端时（IDE 内置终端偶尔如此）会抛异常，忽略即可
    try {
        Set-PSReadLineOption -PredictionSource History -ErrorAction Stop
        Set-PSReadLineOption -PredictionViewStyle ListView -ErrorAction Stop
    }
    catch { }
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

</details>

## 参考

- [oh-my-posh 官方文档](https://ohmyposh.dev/docs/)
- [Nerd Fonts 官网](https://www.nerdfonts.com/)
- [Windows Terminal 文档](https://aka.ms/terminal-documentation)
