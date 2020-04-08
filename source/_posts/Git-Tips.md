---
title: Git 使用 Tips
date: 2018-08-11 11:29:28
tags:
  - Git
  - Github
categories:
  - Diary
author:
  name: Vitan
toc: true
---
一些 Git 技巧。
<!--more-->
# Git Diff
- 将自己的分支和其他分支进行对比

```sh
git diff branch1 branch
```

- 对比暂存区和当前的 HEAD

```sh
git diff --cached
```
  - 普通的git diff命令默认对比的是没有加到索引中的文件。

# 恢复暂存区
如果已经将一些文件添加到暂存区后又后悔了，Git 提供了多个命令来实现这个功能，具体需要根据当时情况而定。

```sh
git rm path/to/file --cached
```
- 这个命令将文件从暂存区索引中删除，但是仍然会将文件保留在工作目录。这比直接使用完全删除文件会安全一点。

```sh
git rm file -f
```
# Git Reset
- 恢复已经提交的改动

```sh
git reset
```
  - 这个命令可以完成许多不同的行为，因此需要按照实际场景进行使用。

- 去除所有修改，包括索引中的内容和工作目录中的修改

```sh
git reset --hard
```
- 重置索引

```sh
git reset --mixed
```
  - 这也是git reset命令的默认行为。混合的重置会保留当前工作目录中的改动。

- 仅仅修改分支的 HEAD

```sh
git reset --soft
```

- 恢复到指定的提交版本。

 ```sh
git reset --hard COMMIT_ID
```
# Git Stash
- 临时保存未追踪的文件

``sh
git stash --include-untracked
```
- 列出临时储藏区中的内容

```sh
git stash list
```

# 历史记录
- 查看项目以及特定文件的变更情况

```sh
git log --graph --decorate --oneline
```
  - 它可以用于展示经过修饰的提交历史。

  ---
  - git log 命令可以显示 HEAD、所有提交的 ID 以及分支信息。有了这些信息之后
    - 显示更详细的信息
    
    ```sh
    git show COMMIT_ID/HEAD/BRANCH
    ```

- 查看谁对一个文件做了哪些改动

```sh
git blame path/to/file
```

- 对比当前 HEAD 和前两个提交

: ```sh
git diff HEAD HEAD~2
```
- 展示每个提交中更详细的更新信息，可以使用

```sh
git log --patch
```

- 查看包含关键字“apple”的提交

```sh
git log --grep apples --oneline
```
- 查看历史提交记录中两个点之间的提交历史

```sh
git log HEAD~5..HEAD^ --oneline
```
- 对于分支可以使用

```sh
git log branch_name..master --oneline
```

# 修复错误提交
- 删除前一次提交，并创建一个新的提交记录以替代之前的提交

```sh
git commit --amend
```

- 恢复一个有问题的提交

```sh
git revert COMMIT_ID
```
  - 会创建一个新的提交，让当前项目状态恢复到指定提交之前。
  - 如果我们在修复问题时出现了误操作，例如不小心删除了不应该删除的文件。我们还是可以从版本库中恢复回来，因为 git 保存了所有修改的版本，包括被移除的提交。git reflog命令就是用来实现这个功能的。

## 提交之前撤销 git add
- 移除一个文件

```sh
git reset <文件名>
```
- 所有文件
- 从暂存区移除所有没有提交的修改

```
git reset
```
## 撤销最近一次代码提交
- 提交了错误的文件或一开始就遗漏了某些东西。下面这三步操作可以帮助你解决这个问题。

```
git reset --soft HEAD~1
```
- 对工作文件进行必要的更改

```
git add -A .
git commit -c ORIG_HEAD
```
- 你执行第一个命令时，Git会将HEAD指针（pointer）后移到此前的一次提交，之后你才能移动文件或作必要的修改。
- 然后你就可以添加所有的修改，而且当你执行最后的命令时，Git会打开你的默认文本编辑器，其中会包含上一次提交时的信息。如果愿意的话，你可以修改提交信息，或者你也可以在最后的命令中使用-C而不是-c，来跳过这一步。

# 其他
- 修改已经提交的作者和邮箱

```sh
git commit --amend --author="vitan <ivitan95@gmail.com>" --no-edit
```

- 修改错误的提交信息
  - 必须确保没有对当前的代码库（working copy）做修改，否则这些修改也会随之一起提交。

```
git commit --amend -m ”YOUR-NEW-COMMIT-MESSAGE”
```
- 假如你已经将代码提交（git commit）推送（git push）到了远程分支，那么你需要通过下面的命令强制推送这次的代码提交。

```
git push <remote> <branch> --force
```

---
**Via**
- [Useful Git Tips and Commands](https://thecuriousdev.org/useful-git-tips-commands/)有改动
