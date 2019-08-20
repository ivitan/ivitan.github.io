---
title: Git 闯关游戏
date: 2018-02-10 21:09:24
tags:
- Git
- Linux
- Termux
toc: true
categories: notes
thumbnail: /images/Git.png
---
Git闯关游戏
<!--more-->
# 安装
```
apt install ruby
gem install githug
```

# 基本命令
`githug play` - 默认命令，检查是否过关

`githug hint` - 显示过关提示

`githug reset` - 重启本关，或者重启到指定的某关

`githug levels` - 显示关卡列表

## 第一关（Init）

紧接着，马上进入到了第一个关卡, 按照提示初始化这个这个 githug 文件夹为仓库。完成关卡可以通过调用 `githug play` 验证操作，成功则会进入下一个关卡

```
cd git_hug
git init
```
相关:
`cd` （Change Directory），跳转目录、切换路径。

`git init`在当前目录新建一个Git代码库



## 第二关（Config）

设置 Git 用户名和邮箱，为了不影响全局的配置，我设置的是仓库级别的。

```
git config [--global] user.name "[name]"
git config [--global] user.email "[email address]"
```
相关:

`git config git` 的设置文件为.gitconfig,他可以在全局配置（加上--global），也可以项目配置。

另：

`git config --lis`t 显示当前的git配置

`git config -e [--global]` 编辑git的配置文件

## 第三关 （Add）

使用 add 命令将 README 文件添加到 staging area.

```
git add .README
```
相关

`git add`将所有修改过的工作文件提交暂存区

将所有文件添加到暂存区`git add .`或者`git add -`A

git add .和git add -A的区别
- `git add .`会监控工作区的状态树，使它会把工作时的所有变化提交到暂存区，包括文件内容修改（modified）以及新文件（new），但不包括被删除的文件。
- `git add -u`（git add --update的缩写）仅监控已经被add的文件（即tracked file），他会将被修改的文件提交到暂存区。add -u不会提交新文件（untracked file）。
- `git add -A`（git add --all的缩写）是上面两个功能的合集。即包括修改的文件、删除的文件以及新文件。



## 第四关 （Commit）

提交 README 文件，记得每次 commit 使用 -m 参数加上备注是个好习惯
```
git commit -m 'message'
```
相关:

`git commit -m [message]`提交暂存区到仓库区;还可以提交暂存区的指定文件到仓库区`git commit [file1] [file2] ... -m [message]`。

同时，必须要写 Commit message(提交说明),否则就不允许提交。


- `git commit -a`提交工作区自上次commit之后的变化，直接到仓库区
- `git commit -v`提交时显示所有diff信息,-v参数表示可以看commit的差异
- `git commit --amend -m [message]`使用一次新的commit，替代上一次提交。如果代码没有任何新变化，则用来改写上一次commit的提交信息
- `git commit --amend [file1] [file2] ...`重做上一次commit，并包括指定文件的新变化

## 第五关（Clone)

克隆一个仓库，默认的文件夹名是远端的仓库名
```
git clone https://github.com/Gazler/cloneme
```
相关:

git clone支持多种协议，除了HTTP(s)以外，还支持SSH、Git、本地文件协议等，下面是一些例子。
```
git clone http[s]://example.com/path/to/repo.git/
git clone ssh://example.com/path/to/repo.git/
git clone git://example.com/path/to/repo.git/
git clone /opt/git/project.git
git clone file:///opt/git/project.git
git clone ftp[s]://example.com/path/to/repo.git/
git clone rsync://example.com/path/to/repo.git/
```
SSH协议的另一种写法

`git clone [user@]example.com:path/to/repo.git/`


## 第六关（Clone to folder）

同样是克隆一个仓库，不同的是可以指定一个文件夹名
```
git clone https://github.com/Gazler/cloneme my_cloned_repo
```
相关

`git clone `<版本库的网址> <本地目录名> 该命令会在本地主机生成一个目录。如果不指定目录名，则与远程主机的版本库同名。

## 第七关（Ignore)

忽略所有 .swp 后缀名的文件。这里使用 vim 编辑器打开 .gitignore，这个文件记录了 git 忽略文件的规则, 不会 vim 的同学可以用自己熟悉的编辑。

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fobpbvnwqlj20fr07kjt3.jpg)

```
touch .gitignore  
echo '*.swp'>>.gitignore
```

使用正则(glob 模式)匹配所有的 .swp 文件，然后保存并退出

```
.progile.yml
.gitignore
*.swp
```
相关:

忽略掉某个文件，需要修改.gitignore文件的方法。可以在你的用户目录下创建 `~/.gitignoreglobal` 文件中设置全局。

1. 需要执行 git config --global core.excludesfile ~/.gitignoreglobal来使得它生效。
- `*.a` 忽略所有 .a 结尾的文件
- `!lib.a` 但 lib.a 除外
-` /TODO `仅仅忽略项目根目录下的 TODO 文件，但不包括 subdir/TODO
- `build/` 忽略 build/ 目录下的所有文件
- `doo/*.txt` 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt

2. `.gitignore`只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。
正确的做法是在每个clone下来的仓库中手动设置不要检查特定文件的更改情况。
- `git update-index --assume-unchanged PATH` 在PATH处输入要忽略的文件。
- `git update-index --no-assume-unchanged PATH` 还原。

3. 另外 git 还提供了另一种` exclude `的方式来做同样的事情，不同的是 .gitignore 这个文件本身会提交到版本库中去，用来保存的是公共的需要排除的文件。
而` .git/info/exclude` 这里设置的则是你自己本地需要排除的文件。他不会影响到其他人。也不会提交到版本库中去。

## 第八关（Include

除了 `lib.a `文件，其他所有的 .a 后缀名的文件都忽略。和上一关的操作一样，修改 `.gitignore` 文件
```
echo '*.a'>>.gitignore
echo '!lib.a'>>.gitignore
```
其中 `#` 开头的是注释，用`*.a` 匹配所有 `.a` 文件，`!` 开头代表不要忽略
```
.profile.yml
.gitignore

# ignore all file with ".a" extensions expect "lib.a" file
*.a
!lib.a
```
## 第九关（Status)

查看所有处于` untracked `状态的文件。使用` git status` 查看当前仓库的状态，可以看到红色部分就是 `untracked` 状态的文件
```
git status
```
答案：`database.yml`

相关:`git status` 显示有变更的文件

## 第十关（Number of files committed）

其实就是查看处于 staged 状态的文件，图中黄色部分就是，所以个数就是2

```
git status
```

相关

`git status`命令可以列出当前目录所有还没有被git管理的文件和被git管理且被修改但还未提交(git commit)的文件。

- 命令中”Changes to be committed“中所列的内容是在Index中的内容，commit之后进入Git Directory。
- 命令中“Changed but not updated”中所列的内容是在Working Directory中的内容，add之后将进入Index。
- 命令中“Untracked files”中所列的内容是尚未被Git跟踪的内容，add之后进入Index

## 第十一关（rm）

有一个文件从硬盘中删除了，但是并未从 git 仓库中删除，找到它并从 git 仓库中删除。删除也是修改的一种，提交这个修改就好了
```
git status
git rm deleteme.rb
```

相关:
`git rm [file1] [file2] ...`删除工作区文件，并且将这次删除放入暂存区。

## 第十二关（rm cached）

讲一个新文件从 `staging area` 中删除。按照要求，不应该直接从硬盘上删除这个文件，只是从 Git 中删除而已。加上` --cache` 可以是文件只是从 `staging area` 中移除，不会真正的删除物理文件，如果要连这个物理文件也一起删除，请使用 `-f` 选项
```
git status
git rm --cached deleteme.rb
```

相关:

`git rm --cached [file]` 停止追踪指定文件，但该文件会保留在工作区。


## 第十三关（stash）

临时提交某个文件。这个操作在需要临时保存修改，而又不想提交的时候特别好用！而且 git 中维护了一个栈来保存，所以支持提交多次。如果需要恢复某次提交，使用 git stash apply 即可。
```
git status
git stash
git status
```
相关:

- `git stash` 用于保存和恢复工作进度。
- `git stash` 保存当前的工作进度。会分别对暂存区和工作区的状态进行保存。
- `git stash list` 显示进度列表。
- `git stash pop` [--index] [<stash>] 如果不使用任何参数，会恢复最新保存的工作进度，并将恢复的工作进度从存储的工作进度列表中清除。
如果提供<stash>参数（来自git stash list显示的列表），则从该<stash>中恢复。恢复完毕 也将从进度列表中删除<stash>。选项--index除了恢复工作区的文件外，还尝试恢复暂存区。
- `git stash [save [--patch] [-k|--[no]keep-index] [-q|--quiet] [<message>]]` 这是第一条命令的完整版。
- 使用参数`--patch`会显示工作区和HEAD的差异，通过对差异文件的编辑决定在进度中最终要保存的工作区的内容，通过编辑差异文件可以在进度中排除无关内容。
- 使用`-k`或者`--keep-index`参数，在保存进度后不会将暂存区重置。默认会将暂存区和工作区强制重置。
- `git stash apply [--index] [<stash>]` 除了不删除恢复的进度之外，其余和git stash pop 命令一样。
- `git stash drop [<stash>]` 删除一个存储的进度。默认删除最新的进度。
-` git stash clear `删除所有存储的进度。
-` git stash branch <branchname> <stash>` 基于进度创建分支。



## 第十四关（Rename)

重命名文件。首先这个文件需要是已经是已追踪状态，才可以使用` git mv` 命令，操作完成后自动处于 `staging` 状态
```
git mv oldfile.txt newfile.txt
```
相关:`git mv` 重命名文件

## 第十五关（Restructure）

移动所有 `.html` 文件到 `src` 文件夹。`git mv` 后面的第二个参数可以接受文件或目录，如果是目录，则文件会直接放入目录内，可以使用正则（glob模式）匹配所有 `.html` 文件
```
mkdir src
git mv *.html src/
```
相关:

- mkdir(make directory) Mkdir 是一个用来在 Linux 系统下创建目录的命令。此命令属于内建命令。

- `mkdir test1` 默认情况下不带任何参数运行mkdir命令会在当前目录下创建目录。
- `mkdir test2[ test22 test222]` 创建多个目录。
- `mkdir -p test3/test33` 递归创建多个目录。例如创建的目录包含子目录，如果找不到父目录，那么这个参数会首先帮助创建父目录。
- `mkdir -m=r test4` 使用-m参数，给生成的新目录设置权限。参考：工作中常用Linux命令：mkdir命令
- `mkdir -v test5` 创建目录显示信息。

## 第十六关（Log）

找到最新的 commit 的 hash 值。使用 git log 查看历史提交记录, 找到最新的 commit 的 hash 值，记录下来用户回答问题
```
git log
```
答案为：`34b2fd7(commit`后 前7位)


这里是按照倒叙排列的，最新的在最前面，`commit` 关键字后面跟着的就是这个 `commit` 的` hash`值

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fobq12k0igj20fs03ft9a.jpg)

相关:

git log 显示当前分支的版本历史。
- ` git log --stat` 显示commit历史，以及每次commit发生变更的文件
- `git log -s [keyword]` 搜索提交历史，根据关键词
- `git log -p [file]` 显示指定文件相关的每一次diff
- `git log -5 --pretty --oneline` 显示过去5次提交
- `git log --follow [file`]
` git whatchanged [file]` 显示某个文件的版本历史，包括文件改名
- `git log [tag] HEAD --pretty-format:%s` 显示某个commit之后的所有变动，每个commit占据一行
- `git log [tag] HEAD --grep feature` 显示某个commit之后的所有变动，其“提交说明”必须符合搜索条件




## 第十七关（Tag）

为最新的 commit 打 `tag`。不加额外参数就是为当前 `commit` 记录` tag`, 当然可以为特定的 `commit` 打
```
git tag new_tag
```
相关:
- `git tag` 列出所有的tag，在控制台打印出当前仓库的所有标签
- `git tag [tag]` 新建一个tag在当前commit
- `git tag [tag] [commit]` 新建一个tag在指定commit
- `git tag d [tag]` 删除本地tag

## 第十八关（Push tags）

将所有本地 tag 都推送到远端。--tags 参数代表将所有的 tags 都推送到远端
```
git push --tags origin master
```
相关：

默认 `git push` 不会罢 tag 标签传送到远端服务器上，只有通过显示命令才能分享标签到远端仓库。
- ` git push origin [tagname] push` 单个 tag
- `git push [origin] --tags push` 所有 tag


## 第十九关（Commit amend）

某个文件在上次提交中遗漏了，在那次提交中补上这个文件。 其实，使用` git commit --amend` 会进入编辑界面修改备注信息，我这里直接 `:wq` 保存并退出
```
git status
git add forgotten_file.rb
git commit --amend -m 'message'
```
相关:

`git commit --amend` 合并缓存区的修改和最近的一次commit, 然后用生成的新的commit替换掉老的. 如果缓存区没有内容, 那么利用amend可以修改上一次commit的描述.

## 第二十关（Commit in feature）

 为提交指定一个未来的时间。
 ```
 git commit --date 2016.10.08 -m 'message'
 #或者
 git commit --date=05.01.2018T14:00:00
 ```
 相关:`git commit --date <date> `修改提交时间


## 第二十一关（Reset）

两个文件都被添加到了 staging area, 但是只想提交其中一个。使用 git reset 可以用仓库中的版本覆盖 `staging area` 的版本。
```
git status
git reset HEAD to_commit_second.rb
```
- `git reset `使用仓库中的版本覆盖 `staging area` 中的，如果 `working directory` 该文件没有其他修改，则 `staging area` 中的修改将应用到 `working directory` 中。反之`working directory` 中的版本将被保留，丢弃 `staging area `中的修改。
- `git checkout` 则是使用 `staging area` 的中的版本覆盖 `working directory`。

相关:
reset 命令移动 HEAD 到当前分支的一个 commit， 这可以用来撤销当前分支的一些 commit

- `git reset [-q] [commit] [--] <paths>` 第一种用法是不会重置引用的，即不会修改master文件。
- `git reset [--soft | --mixed | --hard | --merge | --keep] [-q] [<commit>]`
第二种用法不使用< paths > 则会重置引用，并且参数不同决定是否覆盖暂存区和工作区：
- `git reset -mixed` 此为默认方式，不带任何参数的git reset，会退到某个版本只保留源码，回退commit和index信息，staged snapshot 被更新， working directory 未被更改。
- `git reset -soft` 回退到某个版本，只回退了commit信息，staged snapshot 和 working directory 都未被改变 (建议在命令行执行后，再输入 git status 查看状态)
- `git reset -hard `彻底回退到某个版本，本地的源码也会变为上一个版本的内容，即staged snapshot 和 working directory 都将回退

例子：
```
#回退所有内容到上一版本 HEAD^的意思是最近一次的提交
git reset HEAD^
#回退a.py这个文件的版本到上一个版本
git reset HEAD^ a.py
#向前回退到第3个版本
git reset –soft HEAD~3
#将本地的状态回退到和远程的一样
git reset –hard origin/master
#回退到某个版本
git reset 38679ed
#回退到上一次提交的状态，按照某一次的commit完全反向的进行一次commit
git revert HEAD
```
## 第二十二关（Reset soft）

撤销上一次提交。
```
 git reset --soft HEAD^1
```
相关：
- `--soft` 参数将上一次的修改放入 staging area
- `--mixed `参数将上一次的修改放入 working directory
- `--hard` 参数直接将上一次的修改抛弃


## 第二十三关（Checkout file）

抛弃某一次的修改，使用上次提交的版本。checkout 和 reset 的区别参照第二十一关
```
git checkout config.rb
```
相关:
`git checkou`t 检出。

- 创建分支` git branch branchName`
- 切换分支`git checkout branchName`
- 上面两个命令可以合成一个命令 `git checkout -b branchName`

## 第二十四关（Remote）

查看远端仓库。其实可以不加`-v`参数，加这个参数只是可以将地址也一起输出(没想到下一关就是考察这个参数，平常习惯加这个参数了。)
```
git remote -v
```
答案：my_remote_repo

相关:
- `git remote` 不带参数，列出已经存在的远程分支
- `git remote -v --verbose` 列出详细信息，在每个名字后面
- `git clone -o jQuery https://github.com/jquery/jquery.git`
`git remote` 想用其他的主机名 需要用 git clone命令的 -o 选项指定
- `git remote show <主机名> `可以查看主机的详细信息
- `git remote add <主机名> <网址>` 添加远程主机
- `git remote rm <主机名>` 删除远程主机
- `git remore rename <原主机名> <新主机名>` 远程主机的改名
- `tail .git/config` 查看remote信息。

## 第二十五关（remote url）

查看远端仓库的 URL
 ```
 git remote -v
 ```
答案：`https://github.com/githug/not_a_repo`


## 第二十六关（pull）

拉取远端仓库。
```
git pull origin master
```
相关:
- git push origin master 的意思就是上传本地当前分支代码到master分支
其实可以指定分支，格式如下
- `git pull origin remote : local`
对应的推送的格式如下
- `git push origin local : remote`
需要注意的两个操作的分支顺序是相反的，记忆的方法很简单，拉取是从远端到本地，所以远端在前，而推送是从本地到远端，所以本地在前。

## 第二十七关（Remote add）

添加一个远端仓库
```
git remote add origin https://github.com/githug/githug
```

## 第二十八关（Push）

推送本地修改到远端
```
git rebase origin master
git push origin master
```
相关:
`git rebase`用于把一个分支的修改合并到当前分支。

## 第二十九关（Diff）
```
git diff app.rb
```
答案：26

相关：
- `git diff app.rb`查看文件改动
查看 `staging area` 和 `working directory` 中文件的差异。
- `git diff`: 查看 working directory 与 staging area 之间的差异
- `git diff --cached`: 查看 repository 与 staging area 之间的差异
- `git diff HEAD`: 查看 working directory 与 repository 之间的差异


## 第三十关（Blame）

查看某个文件的修改人。这个命令简直邪恶，锅终于有人背了！！！
```
git blame config.rb
```
答案：Spider Man

相关:
git blame得到整个文件的每一行的详细修改信息:包括SHA串,日期和作者。

## 第三十一关（Branch）

创建一个分支
```
git branch test_code
git branch
```

## 第三十二关（Checkout）

创建一个分支，并切换过去。其实，`git checkout -b my_branch` 就是创建一个分支，并切换过去，而且这种方法更方便，平常用的更多
```
git checkout -b my_branch
```

## 第三十三关（Checkout tag）

切换到某个特定的 tag
```
git tag
git checkout v1.2
```
相关:
标签可以针对某一时间点的版本做标记，常用于版本发布。

列出标签
- `Git tag` 在控制台打印出当前仓库的所有标签
- `git tag -l 'v0.1.*'` 搜索符合模式的标签
打标签 git标签分为两种类型：轻量标签和附注标签。轻量标签是指向提交对象的引用，标注标签则是仓库中的一个独立对象。建议使用附注标签。
- `git tag v0.1.2-light`创建轻量标签
- `git tag -a v0.1.2 -m "0.1.2`版本"创建附注标签
- `git tag -a v0.1.1 9fbc3d0 `给指定的commit打标签
切换到标签
- `git checkout [tagname] `查看标签信息
- `git show v0.1.2 `查看标签的版本信息
删除标签
- `git tag -d v0.1.2` 删除标签
标签发布 git push 不会将标签对象提交到git服务器，我们需要进行显示的操作：
- `git push origin v0.1.2 `将标签提交到git服务器
- `git push origin -tags `将本地所有标签一次性提交到git服务器


## 第三十四关（Checkout tag over branch）

切换到某个特定的分支，但是分支名和标签名重叠了
```
git checkout tags/v1.2
```
相关:
`git checkout tags/v1.2` 当标签和分支名相同时，需要指定标签检出

## 第三十五关（branch at）

根据一个特定的提交创建新分支

一种方法：
```
git branch test_branch HEAD^1
```
第二种方法：
```
git log
git branch test_branch -v 00740b4
```
找到第二条的id，输入前7位

## 第三十六关（delete branch）

删除一个分支
```
git branch -d delete_me
```

## 第三十七关（Push branch）

将分支推送到远端仓库
```
git branch
git push origin test_branch
```
相关:
- `git push origin master` 上面命令表示，将本地的master分支推送到origin主机的master分支。如果后者不存在，则会被新建。
- `git push origin :maste`r省略本地的分支名,则表示删除指定的远程分支，因为这等同与推送一个空的本地分支到远程分支。等同于：git push origin --delete master
- `git push origin `如果当前分支与远程分支直接存在追踪关系，则本地分支和远程分支都可以省略
- `git push` 如果当前分支只有一个追踪分支，那么主机名都可以省略
- `git push -u origin master` 如果当前分支和多个主机存在追踪关系，则可以使用 -u 选项指定一个默认主机，这样后面就可以不加任何参数使用 git push
- `git push --all origin `不管是否存在对应的远程分支，将本地的所有分支都推送到远程主机。
- `git push origin --tags git push` 不会推送标签（tag），除非使用 -tags 选项


## 第三十八关（merge）

合并分支。为了简化分支模型，可以使用 `rebase` 代替，后续关卡会遇到。
```
git merge feature
```
相关:
`git merge`合并分支

## 第三十九关（fetch）

获取远端的修改，但是并不合并到当前分支。其实，`git pull` 就是 `git fetch` 和 `git merge` 组成的。
```
git fetch origin
```
相关:
`git fetch origin master `取回origin主机的master分支

## 第四十关（rebase）

```
git checkout feature
git rebase master
```
相关：
- 其实不知道怎么翻译 git rebase 这个命令。大概意思是从某个提交分化出两个分支，然后其中一个分支需要将另一个分支的修改合并过来，但是又不想在提交记录上留下两个分支合并的痕迹，只留下一个分支以前后顺序记录两边的修改。
- `git rebase` 一个分支的所有修改在另一个分支上重新应用一遍，所以在提交记录上看，会发现一个分支的所有提交在另一个分支之前或者之后。然后删除另一个被合并的分支，保持分支简洁。
- `git rebase master feature `表示将 `feature` 上的修改在 `master` 上重新应用一遍
- git rebase 命令主要用在从上游分支获取commit信息，并有机的将当前分支和上游分支进行合并

`git rebase [-i | --interactive] [options] [--onto ] []`

`git rebase [-i | --interactive] [options] –onto –root []`

`git rebase –continue | –skip | –abort`

## 第四十一关（rebase_onto）

将版本库未打包的松散对象打包
```
git rebase --onto master wrong_branch
```
相关:
`git rebase --onto A B C A `代表的是你实际想要将切片放到哪个分支，B代表切片开始分支（一定要注意的问题是 B 的开闭问题，这里 rebase --onto 的机制是左开右闭）。

`git rebase --onto A B~1 temp` 如果想要保留A和C的历史，就需要先在切片的末尾建立一个分支temp。这就代表把B到c之间的历史移到了A上，并且当前temp分支的历史状态就是窝想要的。

## 第四十二关（repack）

应用某一个提交的修改。
```
git repack -d
```
相关:
g`it repack [-a] [-A] [-d] [-f] [-F] [-l] [-n] [-q] [-b] [--window=<n>] [--depth=<n>]`

`git repack -d `包装后，如果新创建的包使一些现有的包冗余，删除多余的包。同时运行 `git prune-packed` 去除多余的松散对象文件。

## 第四十三关 （cherry-pick

```
git branch
git log new-feature
$git cherry-pick ca32a6da
```
相关:
`Git cherry-pick` 可以选择某一个分支中的一个或几个commit来进行操作

`git grep`支持各种条件搜索及正则表达式，平时用的不多，但感觉功能强大。

## 第四十四关（grep）

```
git grep TODO
```
相关:
- `git grep` 查找git库里面的某段文字
- `git grep xmmap` 查看git里面这个仓库里每个使用 ‘xmmap’ 函数的地方。
- `git grep -n xmmap` 显示行号。
- `git grep --name-only xmmap` 只显示文件名。
- `git grep -c xmmap` 查看每个文件里有多少行匹配内容（line matches）。
- `git grep xmmap v1.5.0` 查找git仓库里某个特定版本里的内容，在命令行末尾加上表签名（tag reference）。
- `git grep -e '#define' --and -e SORT_DIRENT` 组合搜索条件：查找在仓库的哪些地方定义了‘SORT_DIRENT’。
- `git grep --all-match -e '#define' -e SORT_DIRENT `进行或条件搜索。

## 第四十五关（rename commit）

重命名提交。当涉及提交修改时，应该想到 `git rebase -i` 命令，它接受可以一个参数（提交的哈希值），它将罗列出此提交之后的所有提交，然后可以对个个提交做对应的操作。
```
git log master
git rebase -i HEAD~2
```
查看历史提交记录，看到需要修改的为倒数第二个，进入编辑页面，将需要改动的行的·改为·。保存退出后在弹出的第二个窗口里修改拼写错误 `commmit` 改为 `commit`

## 第四十六关（squash）

合并多个提交。
```
git rebase -i HEAD~4
```
将后三个改为s


为新的提交修改备注

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fobqvy1midj20fu07b0tz.jpg)

## 第四十七关（merge squash）

将某个分支上的所有修改都应用成一个提交。默认修改都将进入暂存区
```
git status
git merge --squash long-feature-branch
git commit -m 'message
```
相关:
`--squash` 选项的含义是：本地文件内容与不使用该选项的合并结果相同，但是不提交、不移动 HEAD ,因此需要一条额外的commit命令。其效果相当于将 another 分支上的多个 commit 合并成一个，放在当前分支上，原来的 commit 历史则没有拿过来。

## 第四十八关(reorder()

重新排列提交顺序。
```
git log
git rebase -i HEAD~2
```
查看历史记录发现提交顺序错误，将前两行顺序调换。

## 第四十九关(bisect)

使用 `git log` 查看所有的提交记录，太长我就不全贴出来了，找到最开始的提交`git bisect start master f608824888b83`
```
git log --reverse -p prog.rb
git bisect start master f6088248
git bisect run make test
```
查看最初一次为正确提交，得到版本号。执行完毕后日志里找到 “is the first bad commit” ,得到 18ed2ac。

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fobqyexrrfj20g90a60uy.jpg)

`git bisect start master f608824888b83`中，master 是有 bug 的节点，`f608824888b83 `是没有 bug 的节点。

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fobr0w8f7yj20g90m8q62.jpg)

相关:
- `git bisect start`
- `git bisect good fb088248`
- `git bisect bad master`
- `git bisect run make test`
- `git bisect reset` 回到之前执行 `git bisect start` 的状态。

# 第五十关（Stage lines）

其实，提交文件的部分修改这种需求平时还是比较常见的，不过平时都是用 Source Tree 来操作的，但是看到这题之后，好像又开启了一扇大门。
```
git status
git add -p feature.rb
git diff
git status
```
输入i编辑提交内容，删除第二个。

## 第五十一关（Find old branch）

git reflog 可以列出所有的操作记录，所以找到之前忘记的信息并不是什么难事
```
git reflog
git checkout solve_world_hunger
```
相关:
- `reflog` 是 git 用来记录引用变化的一种机制。
- `git reflog` 命令可以对 git 误操作进行数据恢复。

## 第五十二关（Revert）

与 `reset` 不同的是，`revert` 只会撤销当前的 `commit`，而之后的 `commit` 操作的修改还会保留，但是`reset` 还会将之后的所有` commit` 操作的修改全部退回 `staging area `或丢弃。
```
git log
git revert HEAD^1
```
相关:

修复提交文件中的错误：
- `git reset --hard HEAD` 把工作目录中所有未提交的内容清空。
- `git checkout `恢复一个文件
- `git revert HEAD` 撤销一次提交

## 第五十三关（Restore）

根据之前的经验，`git reflog` 可以查看所有的操作记录，所以只要能找到误操作之前的 `commit id`，一样能够恢复现场。
```
git reflog
git checkout bdbe33d
```
相关:

恢复已修改的文件：

## 第五十四关（Conflict）

冲突处理在平常的协同工作中真是再常见不过了，需要注意的是存在冲突的文件是在 `working directory` 中的，在解决完冲突之后需要添加到 `staging area` 并提交。
```
git branch
git merge mybranch
vim poem.txt
git add poem.txt
git commit -m 'message
```
相关：

其实冲突解决完成的图片丢失了，只能口述了。

`<<<<<<< HEAD` 到 `=======` 之间的内容代表 `master` 分支的修改，`=======` 到 `>>>>>> mybranch` 之间的内容代表 `mybranch` 分支的修改，保留 `mybranch` 分支的修改，删除`master` 分支的修改即可，当然这些特殊符号所在行也要一并删除。

![](https://ws1.sinaimg.cn/large/d71f8b2fgy1fobr4vbhrwj20fu04ut90.jpg)

## 第五十五关（Submodule）

`submodule `是一个很方便的将一个仓库分解成多个子模块的命令，特别是项目比较大且依赖其他 Git 项目的时候，比如 `Cocos2d-x`。虽然好用，但是门槛也相对高点，如果维护好 `submodule `还是需要好好研究一下。
```
git submodule add http://github.com/jackmaney/githug-include-me
```
相关:
- `git submodule add` 子模块仓库地址 路径

## 第五十六关（Contribute）

其实到这里已经可以算是通关，如果感兴趣的话可以到 GitHub 为这个项目贡献代码。


参考：
[Ryeeeeee](http://ryeeeeee.com/2016/01/04/Githug-Guide/)
[风花花](https://www.jianshu.com/p/e8e6358e81e0)
