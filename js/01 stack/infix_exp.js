// 使用栈，完成中序表达式转化成后序表达式

// 输入:["12", "+",	"3"]
// 输出:["12", "3", "+"]
// 
// 输入:["(","1","+","(","4","+","5","+","3",")","-","3",")","+","(","9","+","8",")"]
// 输出:[	'1',	'4',	'5',	'+',	'3',	'+',	'+',	'3', '-', '9', '8', '+', '+' ]
// 
// 输入:['(',	'1',	'+',	'(',	'4',	'+',	'5',	'+',	'3',	')',	'/',	'4',	'-',	'3',	')',	'+',	'(',	'6', '+', '8', ')', '*', '3']
// 输出:['1',	'4',	'5',	'+',	'3',	'+',	'4',	'/',	'+',	'3',	'-',	'6',	'8',	'+', '3', '*', '+']

/*
  思路
  1. 如果是数字,直接放入到postfix_lst中
  2. 遇到左括号入栈，遇到右括号,把栈顶元素弹出,直到遇到左括号
  3. 遇到运算符,把栈顶的运算符弹出,直到栈顶的运算符优先级小于当前运算符，把弹出的运算符加入到postfix_lst，当前的运算符入栈
  4. for循环结束后, 栈里可能还有元素,都弹出放入到postfix_lst中
*/

const {Stack} = require('./mystack')

var priority_map = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 3
}

function infix_exp_2_postfix_exp(exp) {
  var stack = new Stack() // 存储左括号
  var postfix_lst = [] // 存储后缀表达式

  for(var i = 0; i < exp.length; i ++) {
    var item = exp[i]
    // 如果是数字，直接放入到postfix_lst中
    if(!isNaN(item)) {
      postfix_lst.push(item)
    } else if (item === '(') {
      // 遇到左括号入栈
      stack.push(item)
    } else if (item === ')') {
      // 遇到右括号，把栈顶元素弹出，直到遇到右括号
      while(stack.top() !== '(') {
        postfix_lst.push(stack.pop())
      }
      stack.pop() // 左括号出栈
    } else {
      // 遇到运算符,把栈顶的运算符弹出,直到栈顶的运算符优先级小于当前运算符
      while(
        !stack.isEmpty() &&
        ['+','-','*','/'].includes(item) &&
        priority_map[stack.top()] >= priority_map[item]
      ) {
        // 把弹出的运算符加入到postfix_lst
        postfix_lst.push(stack.pop())
      }
      // 当前的运算符入栈
      stack.push(item)
    }
  }
}
// 12+3
console.log(infix_exp_2_postfix_exp(["12","+", "3"]));
// 2-3+2
console.log(infix_exp_2_postfix_exp(["2","-", "3", "+", "2"]));
// (1+(4+5+3)-3)+(9+8)
var exp = ["(","1","+","(","4","+","5","+","3",")","-","3",")","+","(","9","+","8",")"];
console.log(infix_exp_2_postfix_exp(exp))
// (1+(4+5+3)/4-3)+(6+8)*3
var exp = ['(', '1', '+', '(', '4', '+', '5', '+', '3', ')', '/', '4', '-', '3', ')', '+', '(', '6', '+', '8', ')', '*', '3']
console.log(infix_exp_2_postfix_exp(exp))
// 12+3*5
console.log(infix_exp_2_postfix_exp(["12","+", "3","*", "5"]))
// 12*3+5
console.log(infix_exp_2_postfix_exp(["12","*", "3","+", "5"]))