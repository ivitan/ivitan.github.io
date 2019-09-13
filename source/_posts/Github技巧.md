---
title: Github 隐藏的技巧
date: 2018-07-17 13:39:22
tags: 
- Github
- Git
categories: notes
toc: true
permalink: GithubTips
enable_unread_badge: true
thumbnail: /images/Github.png
---
Github 中隐藏了很多可以提高效率的小技巧。
<!--more-->
# 快捷键
## 全站中

```
s 定位到搜索框
? 展示当前页面可用的快捷键
g+n 查看通知
```

## 库快捷键
```
g+c 到代码库首页
g+i 查看 issue
g+p 查看 PR
g+w 查看 Wiki
```

## 浏览代码
```
t 激活查找文件模式
l 定位到行
w 切换分支或tag
y 将 URL 展开成正则形式
i 显示或隐藏 diff 中的评论
```
## issues
```
c 创建一个 issue
/ 定位到 issue 搜索框
l 过滤或编辑标签
m 过滤或编辑 milestone
a 过滤或编辑 assignee
r 在回复中引用鼠标选中的文本
```

## 通知
```
e l y 标记为已读
shift m 将帖子静音

```
# 仓库中
## PR
```
r 在回复中引用鼠标选中的文本
o+enter 打开 issue
```
## Network Graph
```
方向键和 hjkl 与 Vim 中一样
shift + 方向键或 hjkl 行动到头
```

# URL 后添加
## 忽略空格: ?w=1
在任意的 diff URL 添加`?w=1`用来整理缩进
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1ftctuu01vrj20f005kaac.jpg)

## 查看某个作者的提交历史
在 URL 中添加 `?author=username`例如：
```bash
https://github.com/rails/rails/commits/master?author=snowtraces
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1ftcu02qcwoj20cp0kota4.jpg)

## 比较版本
使用类似如下的 URL 比较分支
```sh
https://github.com/qutang/hexo-theme-cutie/compare/master...v2.1
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1ftcu7572zej20um05aq3i.jpg)
- 也可以使用一下格式
```bash
https://github.com/rails/rails/compare/master@{1.day.ago}...master
https://github.com/rails/rails/compare/master@{2014-10-04}...master
```
- 和派生仓库比较，加上派生仓库名作前缀即可
```bash
https://github.com/iVitan/hexo-theme-cutie/compare/master...qutang:master
```

## 高亮行
在 URL 中加上`#L10`可以高亮第10行,或者你也可以直接点击行数。
```sh
https://github.com/iVitan/hexo-theme-cutie/blob/master/_config.yml#L10
```
- 多行高亮同样支持。你可以使用类似`#L10-L20`格式，或者在按住 shift 的同时点击
```bash
https://github.com/iVitan/hexo-theme-cutie/blob/master/_config.yml#L10-L20
```
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1ftcuhwdriaj20fc08ft8x.jpg)

## 合并请求的 diff 和 patch
可以在 URL 后添加`.diff`和`.patch`以对应的模式查看合并请求

# 快速引用
## 引用评论
- 可以选中别人的评论文字，然后按 `r`，这些内容会以引用的形式被复制在文本框中
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1ftcukae70tg20m80a7nfn.jpg)

# 任务列表
## To Do
在工单或合并请求中，你可以使用任务列表语法：
```bash
- [ ] Be awesome
- [ ] Do stuff
- [ ] Sleep
```
- 勾选之后，会更新 Markdown
```bash
- [x] Be awesome
- [x] Do stuff
- [ ] Sleep
```
# 嵌入 GitHub
- 网页上面嵌入你自己的GitHub仓库页面
```
<iframe src="https://ghbtns.com/github-btn.html?user=ivitan&amp;repo=ivitan.github.io&amp;type=watch&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="156px" height="30px"></iframe>
<iframe src="https://ghbtns.com/github-btn.html?user=ivitan&amp;repo=ivitan.github&amp;type=fork&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="156px" height="30px"></iframe>
```
-  <iframe src="https://ghbtns.com/github-btn.html?user=ivitan&amp;repo=ivitan.github.io&amp;type=watch&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="156px" height="30px"></iframe>
-  <iframe src="https://ghbtns.com/github-btn.html?user=ivitan&amp;repo=ivitan.github.io&amp;type=fork&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="156px" height="30px"></iframe>

# 设置项目语言
GitHub 会根据相关文件代码的数量来自动识别你这个项目，如果你需要自己指定项目语言，可以在项目的根目录下添加如下`.gitattributes`文件
```bash
*.html linguist-language=Python
```

---
**参考**
- [关于Git和Github你不知道的十件事](http://www.kuqin.com/shuoit/20151010/348440.html)
- [少有人知的 GitHub 使用技巧](https://segmentfault.com/a/1190000000475547)
- [GitHub 使用小技巧](https://blog.csdn.net/neilol/article/details/46568611)
