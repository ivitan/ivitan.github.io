---
title: Markdown 表格
date: 2018-03-27 16:41:06
tags:
- Markdown
- Linux
- Ubuntu
- Termux
toc: true
categories: notes
thumbnail: /images/Markdown.png
---
Markdown 建表格。
<!--more-->
 # 单元格和表头
## 表头和其他行
- 使用` | `来分隔不同的单元格，使用 `- `来分隔表头和其他行：
```
name| ge
----|---
LearnShare|12
Mike|32
```
name|age
----|---
LearnShare|12
Mike| 32

- 为了美观，可以使用空格对齐不同行的单元格，并在左右两侧都使用 | 来标记单元格边界：
```
|name|age|
|----------|---|
|LearnShare|12|
|Mike|32|
```

|name|age|
|----------|---|
|LearnShare|12|
|Mike|32|

- 为了使 Markdown 更清晰，`|` 和` - `两侧需要至少有一个空格（最左侧和最右侧的 | 外就不需要了）。

## 对齐
在表头下方的分隔线标记中加入`:`，即可标记下方单元格内容的对齐方式：
- `:--- `代表左对齐
- `:--: `代表居中对齐
- `---: `代表右对齐

```
| left | center | right |
| :--- | :----: | ----: |
| aaaa | bbbbbb | ccccc |
| a    | b      | c     |
```

| left | center | right |
| :--- | :----: | ----: |
| aaaa | bbbbbb | ccccc |
| a    | b      | c     |                                      

---
如果不使用对齐标记，单元格中的内容默认左对齐；表头单元格中的内容会一直居中对齐（不同的实现可能会有不同表现）。

## 插入其他内容
表格中可以插入其他 Markdown 中的行内标记：
