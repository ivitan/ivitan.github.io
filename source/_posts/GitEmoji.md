---
title: Git Commit Emoji
date: 2019-03-18 00:29:26
tags:
- Git
- Linux
- Termux
- Notes
categories:
- notes
author:
name: Vitan
enable_unread_badge: true
icon:
- /images/Git.png
---
Git Commit Emoji
<!--more-->
# Emoji-Log
## 配置
.bash/.zshrc
:	```bash
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

别名到 ~/.gitconfig
:	```bash
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
install
:	```bash
	npm i -g gitmoji-cli
	```
usage
:	```bash
	gitmoji --help
	gitmoji -c
	```

---

**Via**
- [OpenSource.com](https://opensource.com/article/19/2/emoji-log-git-commit-messages)
- [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli)
