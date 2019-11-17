---
title: Git Commit Emoji
date: 2019-03-18 00:29:26
tags:
- Git
- Linux
- Termux
- Notes
categories:
- Diary
author:
name: Vitan
toc: true
enable_unread_badge: true
thumbnail: /images/Git.png
---
Git Commit Emoji
<!--more-->
# Emoji
emoji                                   | emoji 代码                   | commit 说明
:--------                               | :--------                    | :--------
:tada: (庆祝)                           | `:tada:`                     | 初次提交
:sparkles: (火花)                       | `:sparkles:`                 | 引入新功能
:bookmark: (书签)                       | `:bookmark:`                 | 发行/版本标签
:bug: (bug)                             | `:bug:`                      | 修复 bug
:ambulance: (急救车)                    | `:ambulance:`                | 重要补丁
:globe_with_meridians: (地球)           | `:globe_with_meridians:`     | 国际化与本地化
:lipstick: (口红)                       | `:lipstick:`                 | 更新 UI 和样式文件
:clapper: (场记板)                      | `:clapper:`                  | 更新演示/示例
:rotating_light: (警车灯)               | `:rotating_light:`           | 移除 linter 警告
:wrench: (扳手)                         | `:wrench:`                   | 修改配置文件
:heavy_plus_sign: (加号)                | `:heavy_plus_sign:`          | 增加一个依赖
:heavy_minus_sign: (减号)               | `:heavy_minus_sign:`         | 减少一个依赖
:arrow_up: (上升箭头)                   | `:arrow_up:`                 | 升级依赖
:arrow_down: (下降箭头)                 | `:arrow_down:`               | 降级依赖
:zap: (闪电)<br>:racehorse: (赛马)      | `:zap:`<br>`:racehorse:`      | 提升性能
:chart_with_upwards_trend: (上升趋势图) | `:chart_with_upwards_trend:` | 添加分析或跟踪代码
:rocket: (火箭)                         | `:rocket:`                   | 部署功能
:white_check_mark: (白色复选框)         | `:white_check_mark:`         | 增加测试
:memo: (备忘录)                         | `:memo:`                     | 撰写文档
:hammer: (锤子)                         | `:hammer:`                   | 重大重构
:art: (调色板)                          | `:art:`                      | 改进代码结构/代码格式
:fire: (火焰)                           | `:fire:`                     | 移除代码或文件
:pencil2: (铅笔)                        | `:pencil2:`                  | 修复 typo
:construction: (施工)                   | `:construction:`               | 工作进行中
:construction_worker: (工人)            | `:construction_worker:`      | 添加 CI 构建系统
:green_heart: (绿心)                    | `:green_heart:`              | 修复 CI 构建问题
:lock: (锁)                             | `:lock:`                     | 修复安全问题
:whale: (鲸鱼)                          | `:whale:`                    | Docker 相关工作
:apple: (苹果)                          | `:apple:`                    | 修复 macOS 下的问题
:penguin: (企鹅)                        | `:penguin:`                  | 修复 Linux 下的问题
:checkered_flag: (旗帜)                 | `:checked_flag:`             | 修复 Windows 下的问题

---
**Via**
- [Git-commit-emoji](https://github.com/liuchengxu/git-commit-emoji-cn/blob/master/README.md)

# Emoji-Log
## 配置

```bash .bash/.zshrc
    #.# Better Git Logs.
    ### Using EMOJI-LOG (https://github.com/ahmadawais/Emoji-Log).
    # Git Commit, Add all and Push — in one step.
    function gcap() {
        git add . && git commit -m "$*" && git push
    }
    # NEW.
    function gnew() {
        gcap "📦 NEW: $@"
    }
    # IMPROVE.
    function gimp() {
        gcap "👌 IMPROVE: $@"
    }
    # FIX.
    function gfix() {
        gcap "🐛 FIX: $@"
    }
    # RELEASE.
    function grlz() {
        gcap "🚀 RELEASE: $@"
    }
    # DOC.
    function gdoc() {
        gcap "📖 DOC: $@"
    }
    # TEST.
    function gtst() {
        gcap "✅ TEST: $@"
    }
```

## 别名到 ~/.gitconfig
```bash
    # Git Commit, Add all and Push — in one step.
    cap = "!f() { git add .; git commit -m \"$@\"; git push; }; f"
    # NEW.
    new = "!f() { git cap \"📦 NEW: $@\"; }; f"
    # IMPROVE.
    imp = "!f() { git cap \"👌 IMPROVE: $@\"; }; f"
    # FIX.
    fix = "!f() { git cap \"🐛 FIX: $@\"; }; f"
    # RELEASE.
    rlz = "!f() { git cap \"🚀 RELEASE: $@\"; }; f"
    # DOC.
    doc = "!f() { git cap \"📖 DOC: $@\"; }; f"
    # TEST.
    tst = "!f() { git cap \"✅ TEST: $@\"; }; f"
```

# gitmoji-cli
## install
```bash
npm i -g gitmoji-cli
```
## usage
```bash
gitmoji --help
gitmoji -c
```

---

**Via**
- [OpenSource.com](https://opensource.com/article/19/2/emoji-log-git-commit-messages)
- [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli)
