---
title: Git Push 错误解决方法
date: 2018-04-13 16:49:24
tags:
- Git
- Linux
- Termux
toc: true
categories: notes
thumbnail: /images/Git.png
---
git push用法和常见问题分析
<!--more-->
# Git push
```git
git push origin test:master
// 提交本地test分支作为远程的master分支
git push origin test:test
// 提交本地test分支作为远程的test分支
```
如果想删除远程的分支呢？类似于上面，如果:左边的分支为空，那么将删除:右边的远程的分支。

```git
git push origin :test
// 刚提交到远程的test将被删除，但是本地还会保存的，不用担心
```
举个例子:
```git
git push origin  :origin/Android_HK_K501_77-W916
//由于:前面为空所以本来在服务器上面存在的分支origin/Android_HK_K501_77-W916和Android_HK_K501_77-W916
现在就只有一个了,因为分支origin/Android_HK_K501_77-W916被删除了,但是本地的还在
 git push ssh://git@dev.lemote.com/rt4ls.git master
 // 把本地仓库提交到远程仓库的master分支中
git remote add origin ssh://git@dev.lemote.com/rt4ls.git
git push origin master
```
这两个操作是等价的，第二个操作的第一行的意思是添加一个标记，让origin指向ssh://git@dev.lemote.com/rt4ls.git，也就是说你操 作origin的时候，实际上就是在操作ssh://git@dev.lemote.com/rt4ls.git。origin在这里完全可以理解为后者 的别名。

    注意：需要说明的是，默认情况下这条语句等价于提交本地的master仓库到远程仓库，并作为远程的master分支。
    如果想把本地的某个分支test提交到远程仓库，并作为远程仓库的master分支，或者作为另外一个名叫test的分支，那么可以这么做。

# 常见错误:
- 1.error:failed to push some refs to ...

当要push代码到git时，出现提示：
```
error:failed to push some refs to ...
Dealing with “non-fast-forward” errors
From time to time you may encounter this error while pushing:
git push origin master

To ../remote/

 ! [rejected]        master -> master (non-fast forward)

error: failed to push some refs to '../remote/'

To prevent you from losing history, non-fast-forward updates were rejected

Merge the remote changes before pushing again.  See the 'non-fast forward'

section of 'git push --help' for details.

```

问题（Non-fast-forward）的出现原因在于：git仓库中已经有一部分代码，所以它不允许你直接把你的代码覆盖上去。于是你有2个选择方式：

强推，即利用强覆盖方式用你本地的代码替代git仓库内的内容
```
git push -f
```
- 2. 先把git的东西fetch到你本地然后merge后再push
```git
git fetch
git merge
```
这2句命令等价于`git pull`

可是，这时候又出现了如下的问题：

上面出现的 [branch "master"]是需要明确(.git/config)如下的内容
```
[branch "master"]

    remote = origin

    merge = refs/heads/master
```
这等于告诉git2件事:
- 1，当你处于master branch, 默认的remote就是origin。
- 2，当你在master branch上使用git pull时，没有指定remote和branch，那么git就会采用默认的remote（也就是origin）来merge在master branch上所有的改变

如果不想或者不会编辑config文件的话，可以在bash上输入如下命令行：
```
git config branch.master.remote origin
git config branch.master.merge refs/heads/master
```
之后再重新git pull下。最后git push你的代码.

**参考**
- [CSDN-Renkangke](http://www.cnblogs.com/renkangke/archive/2013/05/31/conquerAndroid.html)
