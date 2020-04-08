---
title: Hexo Post 模板
date: 2019-04-18 20:14:32
tags:
  - Hexo
categories:
  - Diary
author:
  - Vitan
toc: true
---
> 在新建文章时，Hexo 会根据 scaffolds 文件夹内相对应的文件来建立文件.
<!--more-->
```bash
hexo new photo "My Gallery"
```

在执行这行指令时，Hexo 会尝试在 scaffolds 文件夹中寻找 photo.md，并根据其内容建立文章，可以在模版中使用的变量：

- layout 文章的布局，可以取值post（默认值）或page，可以通过修改 _config.yml 中的 default_layout 参数来指定默认布局。
- title 文章的标题
- date 创建日期，文件的创建日期
- updated 修改日期，文件的修改日期
- comments 是否开启评论，默认值true
- tags 标签
- categories 分类
- permalink url中的名字，默认值文件名

# 模板
```bash
title: {{ title }}
date: {{ date }}
tags:
- Linux
categories:
- notes
author:
- Vitan
- /images/Hexo.svg
```
