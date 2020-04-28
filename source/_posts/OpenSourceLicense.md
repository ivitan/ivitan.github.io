---
title: 开源协议
date: 2018-08-04 11:24:46
tags:
- Linux
- Android
- Windows
categories:
- Diary
author:
  name: Vitan
toc: true
---
> 几种常用的开源协议,更多的协议可以去[
Open Source Initiative](https://opensource.org/licenses/alphabetical)了解。

<!--more-->
# 两张图看懂各种开源协议
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1ftxjq8saxij20m80dw3zd.jpg)

- 限制
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1ftxjqhs2z8j20le09uac5.jpg)

# [GNU GPL](https://zh.wikipedia.org/zh/GNU%E5%AE%BD%E9%80%9A%E7%94%A8%E5%85%AC%E5%85%B1%E8%AE%B8%E5%8F%AF%E8%AF%81)

通用公共许可协议(GNU General Public License), GPL 保证了所有开发者的权利，同时为使用者提供了足够的复制，分发，修改的权利.

要求
- 修改后的源码也需要公开
- 版权及协议也要于此协议一致
- 修改后，需要在相应的文件做说明

允许
- 商用，分发，修改，专利授权，私用

禁止
- 禁止因使用等造成影响责任承担、也就是说免责申明
- 静止在软件分发传播过程中附加上原来没有的协议条款等

# [BSD协议](https://zh.wikipedia.org/zh-hans/BSD%E8%AE%B8%E5%8F%AF%E8%AF%81)
- 如果再发布的产品中含有源代码，则在源代码中必须带有原来代码中的BSD协议。
- 如果再发布的只是二进制类库/软件，则需要再类库/软件的文档和版权申明中包含原有代码中的BSD协议。
- 不可以用开源代码的作者/机构名字和原来产品的名字做市场推广。
- 在代码中保留作者提供的协议和版权信息

允许
- 商用、分发、修改、私用、附加协议

禁止
- 禁止承担责任，(免责申明)

# [Apache Licence 2.0](https://zh.wikipedia.org/zh-hans/Apache%E8%AE%B8%E5%8F%AF%E8%AF%81)
这是一个著名的非盈利开源组织Apache采用的协议，它励代码共享和尊重原作者的著作权，同时也允许代码修改，再发布(作为开源或商业软件)。

要求
- 在代码中保留作者提供的协议和版权信息
- 如果修改了代码，则必须在被修改的文件中进行说明。

允许
的权利商用、分发、修改、专利授权、私用、附加协议

禁止
- 禁止因使用等造成影响责任承担、也就是说免责申明
- 不能使用相应的商标。
---
- 提示：商业软件可以使用，也可以修改使用 Apache 协议的代码。

# [MIT](https://zh.wikipedia.org/zh/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89)
宽松简单且精要的一个协议。在适当标明来源及免责的情况下，它允许你对代码进行任何形式的使用,也就是原作者只想保留版权,而无任何其他了限制,而你必须在发行版里包含原许可协议的声明,无论你是以二进制发布的还是以源代码发布的。

要求
- 在代码中保留作者提供的协议和版权信息

允许
- 商用、分发、修改、私用、附加协议

禁止
- 禁止承担责任，(免责申明)
---
- 提示：商业软件可以使用，也可以修改MIT协议的代码，甚至可以出售MIT协议的代码。

# [LGPL](https://baike.baidu.com/item/LGPL)
其主要用于一些代码库，LGPL比起GPL它授予的权限较少，LGPL允许商业软件通过类库引用(link)方式使用LGPL类库而不需要开源商业软件的代码。因此使用LGPL协议的开源代码可以被商业软件作为类库引用并发布和销售。注意是以类库的形式使用，也就是说如果修改了源代码的话则也必须使用LGPL协议贡献源码出来。

要求
- 公开使用了LGPL部分的代码，其余部分不需要公开。
- 可以库引用的方式用于商业软件。
- 在代码中保留作者提供的协议和版权信息

允许
- 商用、分发、修改、专利授权、私用、附加协议

禁止
- 禁止承担责任，(免责申明)、
---
- 提示：商业软件可以使用，但不能修改 LGPL 协议的代码。
- GPL/LGPL都保障原作者的知识产权，避免有人利用开源代码复制并开发类似的产品。

> 更多内容详见 [ChooseLicense 附录](http://choosealicense.online/appendix/)

# 如何选择
- 选择合适的协议
![](https://ws1.sinaimg.cn/large/d71f8b2fgy1ftxjqepb31j20p90wi43t.jpg)
  - **一个网站 [ChooseLicense](http://choosealicense.online/)**

---
**参考**
- [十分钟理清常见的开源协议](https://juejin.im/post/5a0a745b51882531bb6c5389)
