---
title: oh-my-zsh 插件
date: 2018-03-17 00:08:26
tags:
- Linux
- ArchLinux
- Ubuntu
- Termux
toc: true
categories: Linux
thumbnail: /images/Bash.png
---
Oh-my-zsh插件
<!--more-->
# 使用方法
```
vim ~/.zshrc
//找到下面这句，添加相应的插件 插件之间用空格分隔
plugins=(git z zsh-syntax-highlighting zsh-autosuggestions)
//使配置文件生效
source ~/.zshrc
```

# Git 默认已开启
- 可以使用各种 git 命令缩写。比如
```
git add --all ===> gaa
git commit -m ===> gcmsg
```
- 看所有 git 命令缩写
```sh
cat ~/.oh-my-zsh/plugins/git/git.plugin.zsh
```

# autojump
- [Hithub Rpo](https://github.com/wting/autojump)
- 已经内置了，直接在` .zshrc` 配置文件添加即可。
- 目录间快速跳转,不用再一直 cd 了

## 使用
- 使用 ` autojump`  的缩写 `j`
- `cd` 命令进入` ~/user/github/Noye` 文件夹，下一次再想进入Notr 文件夹的时候,直接` j Note` 即可,或者只输入 Note 的一部分 Not 都行.
- 删除无效路径
  - `j --purge 无效路径`类似组件` Z` (也内置了,直接改配置文件即可)删除无效路径它的命令更短`z -x 无效路径`


# zscrh-syntax-highlighting
- [Github Rpo](https://github.com/zsh-users/zsh-syntax-highlighting)

- 作用:平常用的 `ls`  `cd` 等命令输入正确会绿色高亮显示，输入错误会显示其他的颜色。

## 安装
- 克隆项目
```sh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```
- 在 `~/.zshrc` 中配置
```sh
plugins=(zsh-syntax-highlighting)
```

# zsh-autosuggestions
输入命令时，会给出建议的命令

## 安装
- 克隆项目
```
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```
- 在 `~/.zshrc` 中配置
```sh
plugins=(zsh-autosuggestions)
```

# incr
- Ubuntu sudo
```sh
apt-get install zsh
```
- ArchLinux
```sh
yacman -S #!/usr/bin/env zsh
    ```
- 安装完成后执行：
```sh
chsh -s /bin/zsh
```

# 安装 oh my zsh
- 自动安装：
```
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```
- 手动安装：
```
git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
cp ~/.zshrc ~/.zshrc.orig
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
chsh -s /bin/zsh
```

## 下载 incr
:	[下载地址](http://mimosa-pudica.net/zsh-incremental.html)

- 代码摘录如下：
```
  # Incremental completion for zsh
  # by y.fujii <y-fujii at mimosa-pudica.net>, public domain


  autoload -U compinit
  zle -N self-insert self-insert-incr
  zle -N vi-cmd-mode-incr
  zle -N vi-backward-delete-char-incr
  zle -N backward-delete-char-incr
  zle -N expand-or-complete-prefix-incr
  compinit

  bindkey -M viins '^[' vi-cmd-mode-incr
  bindkey -M viins '^h' vi-backward-delete-char-incr
  bindkey -M viins '^?' vi-backward-delete-char-incr
  bindkey -M viins '^i' expand-or-complete-prefix-incr
  bindkey -M emacs '^h' backward-delete-char-incr
  bindkey -M emacs '^?' backward-delete-char-incr
  bindkey -M emacs '^i' expand-or-complete-prefix-incr

  unsetopt automenu
  compdef -d scp
  compdef -d tar
  compdef -d make
  compdef -d java
  compdef -d svn
  compdef -d cvs

  # TODO:
  #     cp dir/

  now_predict=0

  function limit-completion
  {
  	if ((compstate[nmatches] <= 1)); then
  		zle -M ""
  	elif ((compstate[list_lines] > 6)); then
  		compstate[list]=""
  		zle -M "too many matches."
  	fi
  }

  function correct-prediction
  {
  	if ((now_predict == 1)); then
  		if [[ "$BUFFER" != "$buffer_prd" ]] || ((CURSOR != cursor_org)); then
  			now_predict=0
  		fi
  	fi
  }

  function remove-prediction
  {
  	if ((now_predict == 1)); then
  		BUFFER="$buffer_org"
  		now_predict=0
  	fi
  }

  function show-prediction
  {
  	# assert(now_predict == 0)
  	if
  		((PENDING == 0)) &&
  		((CURSOR > 1)) &&
  		[[ "$PREBUFFER" == "" ]] &&
  		[[ "$BUFFER[CURSOR]" != " " ]]
  	then
  		cursor_org="$CURSOR"
  		buffer_org="$BUFFER"
  		comppostfuncs=(limit-completion)
  		zle complete-word
  		cursor_prd="$CURSOR"
  		buffer_prd="$BUFFER"
  		if [[ "$buffer_org[1,cursor_org]" == "$buffer_prd[1,cursor_org]" ]]; then
  			CURSOR="$cursor_org"
  			if [[ "$buffer_org" != "$buffer_prd" ]] || ((cursor_org != cursor_prd)); then
  				now_predict=1
  			fi
  		else
  			BUFFER="$buffer_org"
  			CURSOR="$cursor_org"
  		fi
  		echo -n "\e[32m"
  	else
  		zle -M ""
  	fi
  }

  function preexec
  {
  	echo -n "\e[39m"
  }

  function vi-cmd-mode-incr
  {
  	correct-prediction
  	remove-prediction
  	zle vi-cmd-mode
  }

  function self-insert-incr
  {
  	correct-prediction
  	remove-prediction
  	if zle .self-insert; then
  		show-prediction
  	fi
  }

  function vi-backward-delete-char-incr
  {
  	correct-prediction
  	remove-prediction
  	if zle vi-backward-delete-char; then
  		show-prediction
  	fi
  }

  function backward-delete-char-incr
  {
  	correct-prediction
  	remove-prediction
  	if zle backward-delete-char; then
  		show-prediction
  	fi
  }

  function expand-or-complete-prefix-incr
  {
  	correct-prediction
  	if ((now_predict == 1)); then
  		CURSOR="$cursor_prd"
  		now_predict=0
  		comppostfuncs=(limit-completion)
  		zle list-choices
  	else
  		remove-prediction
  		zle expand-or-complete-prefix
  	fi
  }
```

- 执行如下命令：
```
cd ~/.oh-my-zsh/plugins/
mkdir -p incr
cd incr
vim incr-0.2.zsh //（将代码复制粘贴到incr-0.2.zsh文件中）
chmod 777 incr-0.2.zsh
```

## 配置 .zshrc 文件
1. vim ~/.zshrc
末尾加入
2. ource ~/.oh-my-zsh/plugins/incr/incr*.zsh
3. source ~/.zshrc #使其立即生效
