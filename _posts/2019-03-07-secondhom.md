---
title: 第二次作业
layout: post
order: 6
---

# 第二次作业读取表达式
**非常抱歉**本次作业我看漏了要更新个人日志的要求了...于是在7/11补一下

## 题目
```
	请实现一个operatorDefinition函数，函数接受两个参数的输入，第一个参数是字符串表示的运算符定义语句，第二参数使用字符串表示的仅包含运算符&与括号的表达式，要求返回按照运算符定义所计算的表达式的字符串结果。
	
	运算符是一个长度为3的字符串，其定义可能会使用到且仅可能会用到：
		⼀个运算符：+、-、*、/ 四个运算符中的⼀个，它们全部是表示整数运算；
		两个变量：x和y，x表示第一个参数，y表示第二个参数。
```

## 思路

题目和《数据结构与算法》中栈一章所学的中缀表达式求值算法很接近，唯一有区别的区别就是在题目中可能存在`y/x`,`y-x`这样的和中序表达式不一样的运算符。

但是把题目的表达式树写出来，其实还是对于左右节点的一种运算。

## 实现

回忆《算法》中关于中缀表达式求值一章算法，pseudo如下:
```python
let stackOper be a stack stores operator,
let stackValue be a stack stores value,
for element in expression:
	if element is a number
		stackValue.push(element)
	elif element is '('
		stackOper.push('(')
	elif element is ')'
		while stackOper.top() != '('
			stackValue.push(element.func(stackValue.pop(),stackValue.pop())
			stackOper.pop()
	elif element is an operator
		while element has lower precedence than stackOper.top()
			oper = stackOper.pop()
			stackValue.push(oper.func(stackValue.pop(),stackValue.pop())
		stackOper.push(element)
```

剩下的任务就是把这个伪码翻译成本题的js代码了，总体并不难，中间还是有些值得注意的地方。

1. 由于运算符都是`&`，优先级比较的步骤结果一致，因为从左往右运算，故而只会新加入的表达式总是会导致符号栈被运算成立（**我就是这个地方没考虑对，扣了3分**）

2. js中没有Stack类，但js数组本身就有`pop()`和`push()`方法，配合用`array[array.length - 1]`代替`top()`和`array.length === 0`代替`isEmpty()`,就能由js自带的数组建立一个Stack了。

3. `x-y` `x\y`这种表达式只需要把上述伪码中`oper.func`换一个方向即可

## 个人日志的写法

我现在是用jekyll动态生成静态日志页，再把静态日志页存储下来修改修改进行上传...比较绕，其实更好用个服务器专门来生成把

