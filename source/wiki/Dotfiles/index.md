---
layout: wiki
wiki: Dotfiles
title: Dotfiles
---

<div align="right">
<a href="#macos">macOS</a> · <a href="#windows">Windows</a> · <a href="#linux">Linux</a> · <a href="#scripts">Scripts</a>
</div>

# DotFiles

![](https://flat.badgen.net/badge/platform/macOS,Windows,Linux,Termux?list=|)

## Windows

![](https://cdn.jsdelivr.net/gh/ivitan/Picture@master/images/20200620100620.png)

### PowerShell

| Configurations                     | What I use                                                                                                                                                              |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prompt theme engine                | [oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh)                                                                                                              |
| Prompt theme                       | [SpencerTechy.psm1](./Windows/SpencerTechy.psm1)                                                                                                                        |
| Font                               | [JetBrains Mono Nerd Font](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/JetBrainsMono)、[Sarasa Gothic](https://github.com/be5invis/Sarasa-Gothic) |
| Color theme (for Windows Terminal) | [Snazzy](https://github.com/mbadolato/iTerm2-Color-Schemes/blob/master/windowsterminal/Snazzy.json)                                                                     |

Go to [oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh) for information on how to install. After installing, you can take a look at your oh-my-posh's profile with:

```PowerShell
$ThemeSettings
```

![](https://i.loli.net/2020/02/09/XqNatS79hdCyY1v.png)

We are looking for the directory where oh-my-posh stores all your themes. Navigate to that very directory, and put [SpencerTechy.psm1](./Windows/SpencerTechy.psm1) there. Now, you can enable this theme with:

```PowerShell
Set-Theme SpencerTechy
```

Also, here's my PowerShell configuration profile: [ps_profile.ps1](./Windows/ps_profile.ps1) for reference. I use:

- [`Get-ChildItemColor`](https://github.com/joonro/Get-ChildItemColor) for better colored `ls`
- `scoop` as Window's package manager

And I removed PowerShell's default alias of `curl` via:

```powershell
# Remove curl alias
If (Test-Path Alias:curl) {Remove-Item Alias:curl}
If (Test-Path Alias:curl) {Remove-Item Alias:curl}
```

See [ps_profile.ps1](./Windows/ps_profile.ps1) for detailed information.

### Windows Terminal

<h6>❗ You cannot use <code>colortool</code> to apply a theme to Windows Terminal. Instead, you'll need to manually add the theme (which is in <code>JSON</code>) to Windows Terminal's configuration.</h6>

- Dark variant - defined in Windows Terminal settings:

  ```json
  "requestedTheme" : "dark"
  ```

- Windows Terminal themes: [Windows Terminal Themes](https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/windowsterminal) at iTerm Color Schemes.

For more information, see [wt_profiles.json](./Windows/wt_profiles.json).

## Linux
### Termux (Andriod Terminal)
Config files: [`zshrc`](./Linux/Termux/zshrc)

```sh
bash -c "$(curl -fsSL https://raw.githubusercontent.com/ivitan/DotFiles/master/Scripts/Termux.sh)"
```

![](https://cdn.jsdelivr.net/gh/ivitan/Picture@master/imagesTermuxDotfile.png)

### Arch Linux WSL (for use on Windows)

Config files: [`wsl_zshrc`](./Windows/wsl_zshrc)

![](https://i.loli.net/2019/08/21/ZMhu2zobPDNWiYw.png)

<details>

### ArchLinux/Manjaro

- ZSH config files: [`arch_zshrc`](./Linux/ArchLinux/zshrc)
- Hyper config files: [`hyper.js`](./Linux/hyper.js)

![](https://i.loli.net/2018/12/31/5c29a4c819cab.png)

</details>

## macOS

### iTerm2

<h6>🔺WARNING: Please upgrade iTerm2 to the latest 3.3 version in order to achieve the customizable "Minimal Titlebar" and "Status bar".</h6>

![](https://i.loli.net/2019/08/16/DpztirnBE6yvqh7.png)

- Color Scheme: [manta.itermcolors](./macOS/manta.itermcolors)
- Set "Tab bar height (points) for minimal theme" to 22, under "Preference - Advanced".

  ![](https://i.loli.net/2019/08/16/dr7Kp2SvsW6xGDt.png)

- Set "Transparency" to near "Opaque", under "Preference - Profiles - Default - Window".

### Hyper

![](https://i.loli.net/2019/08/15/Nt9HMKlpJxLaE3Y.png)

Fully customized color scheme, see [hyper_macos.js](./macOS/hyper_macos.js)

- Shell: [Oh-My-Zsh](https://ohmyz.sh/)
- ZSH Themes: [Powerlevel10k](https://github.com/romkatv/powerlevel10k), [Pure](https://github.com/sindresorhus/pure)

<h6>🔺 NOTICE: Powerlevel10k can generate the same prompt as Pure given the right configuration options. But P10K is able to deal with large git repositories much much faster. See: <a href="https://gist.github.com/romkatv/7cbab80dcbc639003066bb68b9ae0bbf">romkatv/Pure style for Powerlevel10k.md</a></h6>

### Window Manager - yabai

![](https://i.loli.net/2019/08/15/PcK2W8JXs4xQgdw.png)

[Yabai](https://github.com/koekeishiya/yabai) - a macOS Tiling WM.

- [.yabairc](./macOS/yabairc)
- [.skhdrc](./macOS/skhdrc)

### Bitbar Scripts

**Bitbar**: put the output from any script or program in your macOS menu bar. Scripts I use are available at: [bitbar](./macOS/bitbar)

|                    Colorful battery                    |                       CPU Stats                        |
| :----------------------------------------------------: | :----------------------------------------------------: |
| ![](https://i.loli.net/2020/02/02/iC1olKmTRWfuBzb.png) | ![](https://i.loli.net/2020/02/02/k7cIl6vroGASYh9.png) |

## Scripts

<h6>Handy scripts for ricing screenshots.</h6>

### Neofetch

<h6>Fetch system information (with <code>--iterm2</code> option to display wallpaper.)</h6>

```shell
neofetch --iterm2
```

![](https://i.loli.net/2019/08/16/bDNKLBGAok65xZ9.png)

Depends on `imagemagick`, only works with Terminals who support displaying inline images.

### Colortest - [pablopunk/colortest](https://github.com/pablopunk/colortest)

<h6>Quickly show all your terminal colors</h6>

```shell
curl -s https://raw.githubusercontent.com/pablopunk/colortest/master/colortest | bash
```

![](https://i.loli.net/2019/08/16/rHUa3Qs6bDFv7LV.png)

### `color.sh` - [color.sh](./scripts/color.sh)

<h6>Minimal script to show terminal colors.</h6>

```shell
curl -s https://raw.githubusercontent.com/ivitan/UnixConfig/master/scripts/color.sh | bash
```

![](https://i.loli.net/2019/08/16/ZOnMBPUSQcIrsk5.png)

### 256 Color Test

<h6>Print out all 256 colors in your console. See: <a href="https://askubuntu.com/questions/821157/print-a-256-color-test-pattern-in-the-terminal/821163#821163">Print a 256-color test pattern in the terminal</a></h6>

```shell
curl -s https://gist.githubusercontent.com/HaleTom/89ffe32783f89f403bba96bd7bcd1263/raw/ | bash
```

![](https://i.loli.net/2019/08/16/ZzWE4xriOKXUB6e.png)

### ytop

<h6>Terminal based task manager.</h6>

GitHub: [cjbassi/ytop: Another TUI based system monitor, this time in Rust!](https://github.com/cjbassi/ytop)

![](https://i.loli.net/2019/08/16/7dyNAfjPQgeRsl3.png)

### tty-clock

<h6>Terminal based clock.</h6>

GitHub: [xorg62/tty-clock](https://github.com/xorg62/tty-clock)

![](https://i.loli.net/2019/08/16/eRdUtOZcIa31Gf2.png)

## Special Thanks
- [github/spencerwoo98](https://github.com/spencerwoo98)
- [elenapan/dotfiles](https://github.com/elenapan/dotfiles)
- [reddit/r/unixporn](https://www.reddit.com/r/unixporn/)

## This project base on [spencerwoo98/dotfiles](https://github.com/spencerwooo/dotfiles)

## License

This is published via the [MIT License](https://github.com/ivitan/DotFiles/blob/master/LICENSE).

---

[@Blog](https://ivitan.com/) · [@GitHub](https://github.com/ivitan)

---

![visitors](https://visitor-badge.glitch.me/badge?page_id=ivitan.DotFiles)