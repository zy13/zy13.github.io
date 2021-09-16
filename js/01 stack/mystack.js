exports.Stack = Stack

function Stack() {
  var items = []; // 存储数据

  // 压栈
  this.push = function (item) {
    items.push(item)
  }

  // 弹出元素
  this.pop = function () {
    return items.pop()
  }

  // 返回栈顶元素
  this.top = function () {
    return items[items.length - 1]
  }

  // 判空
  this.isEmpty = function () {
    return items.length === 0
  }

  // 返回栈的大小
  this.size = function () {
    return items.length
  }

  // 清空栈
  this.clear = function () {
    items = []
  }
}

// 栈的应用一

// 下面的字符串中包含小括号，请编写一个函数判断字符串中的括号是否合法，所谓合法，就是括号成对出现
// sdf(ds(ew(we)rw)rwqq)qwewe		合法
// (sd(qwqw)sd(sd))			        合法
// ()()sd()(sd()fw))(	          不合法
/*
  实现思路：
  使用for循环遍历数组，对每一个元素进行如下操作
  - 遇到左括号，就把左括号压栈
  - 遇到右括号，栈判空，若空则没有与之对应的左括号，字符串不合法，若非空就移除栈顶元素，这对括号抵消
  for 循环结束之后，若栈是空的，说明所有左右括号都能抵消掉，如果栈非空，则说明缺少右括号，字符串括号不合法
*/

function is_legal_brackets(str) {
  var stack = new Stack()

  for(var i = 0; i < str.length; i++) {
    var item = str[i]
    // 遇到左括号入栈
    if (item === '(') {
      stack.push(item)
    } else if (item == ')') {
      // 遇到右括号，给栈判空
      if (stack.isEmpty()) {
        // 空栈则不合法
        return false
      } else {
        stack.pop() // 弹出左括号
      }
    }
  }
  // 如果栈为空，说明字符串合法
  return stack.isEmpty()
}
console.log(is_legal_brackets('sdf(ds(ew(we)rw)rwqq)qwewe'));
console.log(is_legal_brackets('(sd(qwqw)sd(sd))'));
console.log(is_legal_brackets('()()sd()(sd()fw))('));
console.log(is_legal_brackets("()()))"));

// 栈的应用二

// 逆波兰表达式，也叫后缀表达式，它将复杂表达式转换为可以依靠简单的操作得到计算结果的表达式
// 例如(a+b)*(c+d)转换为ab+cd+*
// 示例
// ["4",	"13",	"5",	"/",	"+"]	等价于 (4	+	(13	/	5))	=	6
// ["10",	"6",	"9",	"3",	"+",	"-11",	"*",	"/",	"*",	"17",	"+",	"5",	"+"]	等价于 ((10	*	(6	/	((9	+	3) * - 11))) + 17) + 5
// 后缀表达式：运算符在两个操作数后面，如 1 2 +, 3 4 5 +, 计算机使用的是后缀表达式，将中缀表达式转换为后缀表达式
// 中缀表达式：运算符在两个操作数中间，如 1 + 2, 3 + 4 + 5
/*
  后缀表达式运算规则
  - 遍历数组，直到遇到第一个运算符，取出运算符及其前两项元素当做操作数进行运算并返回结果
  - 运算结果放到数组中，取代前一个运算符和两个操作数的位置
  - 直到循环结束，剩下一个数组元素，即为最终的运算结果
  实现思路：
  使用for循环遍历数组，对每一个元素进行如下操作
  - 如果元素不是 + - * / 中的某一个，就压入栈中（或者如果是数字就压入栈中）
  - 如果是 + - * / 中的某一个，则从栈里连续弹出两个元素，并对两个元素进行计算，将计算结果压入栈中
  for循环结束之后，数组只剩一个元素，就是整个表达式的计算结果

  例如：["4",	"13",	"5",	"/",	"+"]
  4  入栈
  13 入栈
  5  入栈
  /  连续弹出a = 5, b = 13, 计算b/a = c, c入栈
  +  连续弹出c, d = 4, 计算 d + c = e, e入栈
*/

function calc_exp(exp) {
  var stack = new Stack()

  for(var i = 0; i < exp.length; i++) {
    var item = exp[i]
    if(['+','-','*','/'].includes(item)) {
      var val1 = stack.pop()
      var val2 = stack.pop()
      // 拼成表达式
      var exp_str = val2 + item + val1
      // 计算表达式并取整
      var res = parseInt(eval(exp_str))
      // 计算结果入栈
      stack.push(res.toString())
    } else {
      stack.push(item)
    }
  }
  
  return stack.pop()
}
console.log(calc_exp(["4",	"13",	"5",	"/",	"+"]));
console.log(calc_exp(["10",	"6",	"9",	"3",	"+",	"-11",	"*",	"/",	"*",	"17",	"+",	"5",	"+"]));