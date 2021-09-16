// 实现一个有min方法的栈
/*
  实现一个栈，除了常见的push，pop方法以外，提供一个min方法，返回栈里最小的元素，且时间复杂度为o(1)
*/

const { Stack } = require('./mystack.js')

function MinStack() {
  var data_stack = new Stack() // 存储数据
  var min_stack = new Stack() // 存储最小值

  // push方法
  this.push = function(item) {
    data_stack.push(item)

    // min_stack为空或栈顶元素大于item
    if(min_stack.isEmpty() || item < min_stack.top()) {
      min_stack.push(item)
    } 
  }
  // pop方法
  this.pop = function() {
    data_stack.pop()
    min_stack.pop()
  }
  // min方法
  this.min = function(item){
    return min_stack.pop()
  }
}

var minstack = new MinStack()
minstack.push(3)
minstack.push(6)
minstack.push(8)
console.log(minstack.min());

// es6
const min = Math.min(...[3,6,8])
console.log(min);

