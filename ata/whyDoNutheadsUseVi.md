为什么要使用`vim`？
---

![](http://www.viemu.com/why-vi-img/vi-gang-sign.gif)

## 模块化编辑

### 示例1：绝妙的`.`命令

```
bool ProcessFunkyParam(int nitems, bool properly);
bool RecallClunkyItem(bool displace);
bool DisponseOfAllParams(int ntrials);
```

### 示例2：机智的区域

```
if (!entry.used && equivalent(entry.key(), qk.key) && (curcontext & entry.contexts))
```

### 示例5：缩进代码块

```
if (q.is_valid())
{
  while(q.it != q.strip.end())
  {
    char_t ch = *q.it;
    if (!ch.isspace())
  {
    return q.calc_pos();
  }
    ++q.it;
  }
}
```

在vim中粘贴自动缩进的代码：`]p`。
命令，缩进一个代码块：`>aB`

```
if (q.is_valid())
{
  while(q.it != q.strip.end())
  {
    char_t ch = *q.it;
    if (!ch.isspace())
  {
    return q.calc_pos();
  }
    ++q.it;
  }
}
```

## 英文原文

[http://www.viemu.com/a-why-vi-vim.html](http://www.viemu.com/a-why-vi-vim.html)

## 更多
[让Mac OS X应用可以模拟`vi`的插件](http://www.corsofamily.net/jcorso/vi/)
[IntelliJ IDEA Vi 插件](http://ideavim.sourceforge.net/)

## 相关软件

[SlickEdit](http://www.slickedit.com/)
[Crisp](http://www.crisp.com/)

## 参考词汇

1. touch-typing, touch-typist

