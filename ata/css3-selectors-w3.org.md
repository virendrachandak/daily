# 选择器层级3
# W3C推荐版本 2011年9月29号
---

# 摘要

选择器是树(`tree`）的匹配模式（`pattern`），是能够用于选择`XML`文档中节点的几种技术之一。选择器针对`HTML`和`XML`的使用进行了优化，并为了在重要性能代码中可用而进行设计。

`CSS`（`Cascading Style Sheets`，层叠样式表）是一种描述屏幕、纸张、语音等设备上的`HTML`和`XML`文档（`document`）渲染的语言。CSS使用选择器来为文档中的元素绑定样式属性。

本文档描述了`CSS1`和`CSS2`中已经存在的选择器，并进一步介绍了`CSS3`中的新选择器以及可能需要的其他语言。

选择器使用如下函数定义：

`expression * element -> boolean`

即，给定一个元素和一个选择器，本规范定义了一个元素是否与选择器匹配。

这些表达式（`expression`）也可以用于，例如，选择一组元素集合，或者一组元素集合中的单个元素，通过使用表达式为子树中的所有元素求值。STTS（Simple Tree Transformation Sheets，简单树转换表），一种用于转换`XML`树的语言，用到了这样的机制。[[STTS3]](http://www.w3.org/TR/css3-selectors/#STTS3)

# 本文档的状态

略，总之已处于[Proposed Recommendation，推荐建议](http://www.w3.org/Consortium/Process/tr#RecsPR)状态。即，可以用于作为样式标准来实现了。

> `W3C`维护了与这份文档能够发型有关的[所有专利的公开列表](http://www.w3.org/2004/01/pp-impl/32061/status)。
> 以及一份单独的[实现报告](http://www.w3.org/Style/CSS/Test/CSS3/Selectors/20091025/reports/CR-ImpReport.html)，这份报告包含了一个测试套件和本规范的部分实现。

---

# 内容表
1. 介绍
  1.1. 依赖
  1.2. 术语
  1.3. 与CSS2的修改
2. 选择器
3. 大小写
4. 选择器语法
5. 选择器分组
6. 简单选择器
  6.1. 类型选择器
    6.1.1. 类型选择器和命名空间
  6.2. 通用选择器
    6.2.1. 通用选择器和命名空间
  6.3. 属性选择器
    6.3.1. 属性表现以及值选择器
    6.3.2. 子串匹配属性选择器
    6.3.3. 属性选择器和命名空间
    6.3.4. `DTD`的默认属性值
  6.4. 类选择
  6.5. `ID`选择器
  6.6. 伪类（Pseudo-classes）
    6.6.1. 动态伪类（Dynamic pseudo-classes）
      6.6.1.1. 链接伪类`::link`和`:visited`
      6.6.1.2. 用户动作伪类`:hover`，`:active`以及`:focus`
    6.6.2. 目标伪类`:target`
    6.6.3. 语言伪类`:lang`
    6.6.4. `UI`元素状态伪类
      6.6.4.1. `:enabled`和`:disabled`伪类
      6.6.4.2. `:checked`伪类
      6.6.4.3. `:indeterminate`伪类
    6.6.5 结构化伪类
      6.6.5.1. `:root`伪类
      6.6.5.2. `:nth-child()`伪类
      6.6.5.3. `:nth-last-child()`伪类
      6.6.5.4. `:nth-of-type()`伪类
      6.6.5.5. `:nth-last-of-type()`伪类
      6.6.5.6. `:first-child`伪类
      6.6.5.7. `:last-child`伪类
      6.6.5.8. `:first-of-type`伪类
      6.6.5.9. `:last-of-type`伪类
      6.6.5.10  `:only-child`伪类
      6.6.5.11  `:only-of-type`伪类
      6.6.5.12  `:empty`伪类
    6.6.6. 空（Blank）
    6.6.7. 否定（`negation`）伪类
  7.  伪元素
    7.1.  `::first-line`伪元素
      7.1.1. `CSS`中的第个格式化行定义
    7.2.  `::first-letter`伪元素
      7.2.1.  在`CSS`中的应用
    7.3.  空（Blank）
    7.4.  `::before`和`::after`伪元素
  8.  组合选择器（`combinators`）
    8.1.  子孙组合选择器（`descedant combinator`）
    8.2.  子组合选择器（`child combinator`）
    8.3.  兄弟组合选择器（`sibling combinator`）
      8.3.1.  相邻兄弟组合选择器（`adjacent sibling combinator`）
      8.3.2.  普通兄弟组合选择器（`general sibling combinator`）
  9.  计算选择的独特性（`specificity`）
  10. 选择器语法
    10.1  语法
    10.2  词法扫描器
  11. 性能分析
  12. 一致性和要求（`Conformance and requirements`）
  13. 测试 
  14. 致谢（略）
  15. 参考资料
    15.1. 标准参考资料
    15.2  非正式参考资料

---

# 1.介绍

选择器层级1和层级2分别是[`CSS1`](http://www.w3.org/TR/REC-CSS1)和[`CSS2`](http://www.w3.org/TR/CSS21/)规范中定义的选择器功能的子集。

## 1.1.依赖

本规范的一些功能只对`CSS`有效，或者对`CSS`有限制和规则。本规范根据`CSS2.1`（[CSS21](http://www.w3.org/TR/css3-selectors/#CSS21)）对这些内容进行了描述。

## 1.2. 术语

除了示例、注解以及显示标记为非规范的小节，其他所有文字都是规范的。

额外的属于在[[CSS21]](http://www.w3.org/TR/css3-selectors/#CSS21)的[`Definitions`](http://www.w3.org/TR/CSS21/conform.html#defs)中定义。文档源代码的示例和代码片段以`XML[[`XML10`]或者`HTML`[`HTML40`]]`语法的形式提供。

## 1.3.与CSS2的修改

本节是非规范的。

`CSS2`中选择器与本规范中选择器（`Selectors`）的不同主要有：

* 基本定义（选择器，选择器分组，简单选择器等）列表被修改；尤其是`CSS2`中的简单选择器现在被成为简单选择器序列，而术语`Simple selector（简单选择器）`现在用于指这个序列中的组件。
* 允许在元素类型选择器、通用选择器以及属性选择器中使用可选的命名空间组件。
* 引入了一个新的组合[选择器--`combinator`](http://www.w3.org/TR/css3-selectors/#general-sibling-combinators)。
* 新的简单选择器包括子串匹配属性选择器以及新的伪类。
* 新的伪元素，以及在伪元素中引用了`::`约定。
* 语法重写。
* 将在规范中增加性能分析，集成了选择器（`selectors`）以及各个规范实际支持的选择器集合的定义。
* 选择器现在是`CSS3`的一个模块，并且是一个单独的规范；其他规范现在可以不依赖`CSS`引用本文档。
* 规范有了自己的测试组件。

# 2. 选择器（`Selectors`）

本节是非规范的，只是下面小节的概述。

一个选择器（`Selector`）代表了一个结构。

3. 大小写
4. 选择器语法
5. 选择器分组
6. 简单选择器
  6.1. 类型选择器
    6.1.1. 类型选择器和命名空间
  6.2. 通用选择器
    6.2.1. 通用选择器和命名空间
  6.3. 属性选择器
    6.3.1. 属性表现以及值选择器
    6.3.2. 子串匹配属性选择器
    6.3.3. 属性选择器和命名空间
    6.3.4. `DTD`的默认属性值
  6.4. 类选择
  6.5. `ID`选择器
  6.6. 伪类（Pseudo-classes）
    6.6.1. 动态伪类（Dynamic pseudo-classes）
      6.6.1.1. 链接伪类`::link`和`:visited`
      6.6.1.2. 用户动作伪类`:hover`，`:active`以及`:focus`
    6.6.2. 目标伪类`:target`
    6.6.3. 语言伪类`:lang`
    6.6.4. `UI`元素状态伪类
      6.6.4.1. `:enabled`和`:disabled`伪类
      6.6.4.2. `:checked`伪类
      6.6.4.3. `:indeterminate`伪类
    6.6.5 结构化伪类
      6.6.5.1. `:root`伪类
      6.6.5.2. `:nth-child()`伪类
      6.6.5.3. `:nth-last-child()`伪类
      6.6.5.4. `:nth-of-type()`伪类
      6.6.5.5. `:nth-last-of-type()`伪类
      6.6.5.6. `:first-child`伪类
      6.6.5.7. `:last-child`伪类
      6.6.5.8. `:first-of-type`伪类
      6.6.5.9. `:last-of-type`伪类
      6.6.5.10  `:only-child`伪类
      6.6.5.11  `:only-of-type`伪类
      6.6.5.12  `:empty`伪类
    6.6.6. 空（Blank）
    6.6.7. 否定（`negation`）伪类
  7.  伪元素
    7.1.  `::first-line`伪元素
      7.1.1. `CSS`中的第个格式化行定义
    7.2.  `::first-letter`伪元素
      7.2.1.  在`CSS`中的应用
    7.3.  空（Blank）
    7.4.  `::before`和`::after`伪元素
  8.  组合选择器（`combinators`）
    8.1.  子孙组合选择器（`descedant combinator`）
    8.2.  子组合选择器（`child combinator`）
    8.3.  兄弟组合选择器（`sibling combinator`）
      8.3.1.  相邻兄弟组合选择器（`adjacent sibling combinator`）
      8.3.2.  普通兄弟组合选择器（`general sibling combinator`）
  9.  计算选择的独特性（`specificity`）
  10. 选择器语法
    10.1  语法
    10.2  词法扫描器
  11. 性能分析
  12. 一致性和要求（`Conformance and requirements`）
  13. 测试 
  14. 致谢（略）
  15. 参考资料
    15.1. 标准参考资料
    15.2  非正式参考资料

### 英文原文
[http://www.w3.org/TR/css3-selectors/](http://www.w3.org/TR/css3-selectors/)
