function Queue() {
  var items = []

  // 添加元素
  this.enqueue = function(item) {
    items.push(item)
  }

  // 删除元素
  this.dequeue = function() {
    return items.shift()
  }

  // 返回队列头部元素
  this.head = function() {
    return items[0]
  }

  // 返回队列大小
  this.size = function() {
    return items.length
  }

  // 清除队列
  this.clear = function() {
    items = []
  }

  // 返回队列尾部元素
  this.tail = function() {
    return items[items.length - 1]
  }

  // 判空
  this.isEmpty = function() {
    return items.length === 0
  }
}

// 应用一 - 约瑟夫环
/*
  - 题目描述
  - 有一个数组a[100]存放 0 - 99，要求每隔两个数删除一个数，到末尾时循环至开头继续进行
  - 求最后一个被删掉的数

  - 思路分析
  前10个数是0 1 2 3 4 5 6 7 8 9，所谓每隔两个数删除一个数，其实就是把2 5 8删除掉，
  从0 到 99 每隔两个数删除掉一个数之后，到末尾时循环至开头继续进行
  用队列，先将这一百个数放入队列中，使用while循环，while终止的条件是队列里只有一个元素。
  使用index变量从0开始计数，算法步骤如下：
    - 从队列头部删除一个元素，index + 1
    - 如果index%3===0,就说明这个元素是需要删除的元素，否则不需要删除，并把它添加到队列的尾部
    
  不停地有元素被删除，最终队列只有一个元素，此时while循环终止，队列所剩元素就是最后一个被删除的元素
*/

function del_ring(arr_list) {
  // 把数组的元素放到队列中
  var queue = new Queue()
  for(var i = 0; i < arr_list.length; i++) {
    queue.enqueue(arr_list[i])
  }

  var index = 0
  while(queue.size() !== 1) {
    // 弹出一个元素
    var item = queue.dequeue()
    index += 1
    if(index%3 !== 0) {
      queue.enqueue(item)
    }
  }

  return queue.head()
}

// 准备好数据
var arr_list = []
for(var i = 0; i < 100; i++) {
  arr_list.push(i)
}

console.log(del_ring(arr_list));

// 应用二 - 斐波那契数列
/*
  题目描述
  - 数列的前两项是1 1， 此后的每一项都是该项前两项之和，即f(n) = f(n-1) + f(n-2)

  解题思路：
  先将两个1添加到队列中，之后使用while循环，用index计数，循环终止的条件是index < n - 2
  - 使用dequeue方法从队列头部删除一个元素，该元素为del_item
  - 使用head方法获得队列头部的元素，改元素为head_item
  - del_item + head_item = next_item, 将next_item放入队列中，只能从尾部添加
  - index+1
  当循环结束时，队列里面有两个元素，先用dequeue删除头部元素，剩下的那个元素就是我们想要的答案
*/

function fabonacci(n) {
  var queue = new Queue()
  var index = 0
  // 先放入斐波那契数列的前两个元素
  queue.enqueue(1)
  queue.enqueue(1)
  while(index < n - 2) {
    // 出队列一个元素
    var del_item = queue.dequeue()
    // 取队列头部一个元素
    var head_item = queue.head()
    // 计算下一个元素
    var next_item = del_item + head_item
    // 将计算结果放入队列
    queue.enqueue(next_item)
    index += 1
  }
  queue.dequeue()
  return queue.head()
}

console.log(fabonacci(1476));

// 应用三
/*
  用队列实现栈
  队列是先进先出，栈是先进后出，两者对数据的管理模式刚好是相反的，但是却可以用两个队列实现一个栈

  两个队列分别为queue_1,queue_2,实现思路如下：
  - push，实现push方法时，如果两个队列都为空，那么默认向queue_1添加数据，如果有一个不为空，那么向不为空的队列添加数据
  - top，两个队列，或者都为空，或者有一个不为空，只需要返回不为空的队列的尾部元素即可
  - pop，pop方法比较复杂，这个栈顶元素其实就是队列的尾部元素。每一个次做pop操作时，
    将不为空的队列里的元素一次删除并放入到另一个队列中直到遇到队列中只剩下一个元素，其余元素都跑到之前为空的队列中了
  在具体的实现中，我定义额外的两个变量，data_queue和empty_queue, data_queue始终指向那个不为空的队列，empty_queue始终指向那个为空的队列
*/
/**
 *
 *
 */
function QueueStack() {
  var queue_1 = new Queue()
  var queue_2 = new Queue()
  var data_queue = null // 放数据的队列
  var empty_queue = null // 空队列，备份使用

  var init_queue = function() {
    if (queue_1.isEmpty()) {
      data_queue = queue_2
      empty_queue = queue_1
      if (queue_2.isEmpty()) {
        data_queue = queue_1
        empty_queue = queue_2
      }
    } else {
      data_queue = queue_1
      empty_queue = queue_2
    }
  }

  // push方法
  this.push = function(item) {
    init_queue()
    data_queue.enqueue(item)
  }

  // top方法
  this.top = function() {
    init_queue()
    return data_queue.tail()
  }

  /*
    - pop方法思路
    - pop方法弹出栈顶元素，也就是队列的队尾元素
    - 但是队尾元素是不能删除的，可以把data_empty里的元素（除了队尾元素）都移到empty_data中
    - 最后移除data_queue队尾的元素并返回
    - data_queue和empty_queue交换了身份
  */
  this.pop = function() {
    init_queue()
    while(data_queue.size() > 1) {
      empty_queue.enqueue(data_queue.dequeue())
    }
    return data_queue.dequeue()
  }
}

var q_stack = new QueueStack()

q_stack.push(1)
q_stack.push(2)
q_stack.push(3)
q_stack.push(4)
q_stack.push(5)
q_stack.push(6)

console.log(q_stack.top());
console.log(q_stack.pop());
console.log(q_stack.top());
console.log(q_stack.pop());
console.log(q_stack.pop());

// 应用四
/*
  - 打印杨辉三角

  杨辉三角的每一行，都依赖于上一行，
  假设在队列里存储第n-1行的数据，输出第n行时，只需要将队列里的数据依次出队列，进行计算得到下一行的数值并将计算所得放入到队列中

  计算方式：f[i][j]=f[i-1][j-1] + f[i-1][j], i代表行数，j代表列数，如果j=0或者j=1,则f[i][j]=1
  
  但是将计算所得放入队列中时，队列中存储的是两行数据，一部分是第n-1行，另一部分是刚刚计算出来的第n行数据，需要想办法将两行数据分隔开

  分开两行数据的方式有两种，
  第一种是使用for循环进行控制，在输出第5行时，其实只有5个数据可以输出，
  那么就可以用for循环控制调用enqueue的次数，循环5次后，队列里存储的就是计算好的第6行数据

  第二种是每一行的数据后面多存一个0，使用这个0作为分界点，如果enqueue返回的是0，那么说明这一行已经全部输出，此时，将这个0追加到队列的末尾
  
*/
function print_yanghui(n) {
  var queue = new Queue()
  queue.enqueue(1)
  for(var i = 1; i <= n; i++) {
    var line = ' '
    var pre = 0
    for(var j = 0; j < i; j++) {
      var cur = queue.dequeue()
      var next = cur + pre
      pre = cur
      queue.enqueue(next)
      line += cur + ' '
    }
    queue.enqueue(1)
    console.log(line);
  }
}
print_yanghui(8)

function print_yanghui2(n) {
  var queue = new Queue()
  queue.enqueue(1)
  queue.enqueue(0)
  for(var i = 1; i <= n; i++) {
    var line = ' '
    var pre = 0
    while(true) {
      var cur = queue.dequeue()
      if (cur === 0) {
        queue.enqueue(1)
        queue.enqueue(0)
        break
      } else {
        var next = pre + cur
        line += cur + ' ' 
        pre = cur
        queue.enqueue(next)
      }
    }
    console.log(line);
  }
}
print_yanghui2(8)

// 应用五
/*
  用两个栈实现一个队列
  栈是先进后出，队列是先进先出，但可以用两个栈来模拟一个队列，请实现enqueue, dequeue, head这三个方法   
*/

function Stack() {
  var items = []

   this.push  = function(item) {
     items.push(item)
   }

   this.pop = function() {
     return items.pop()
   }

   this.top = function() {
     return items[items.length - 1]
   }

   this.bottom = function() {
     return items[0]
   }

   this.isEmpty = function() {
     return items.length === 0
   }

   this.clear = function() {
     items = []
   }

   this.size = function() {
     return items.length
   }
}

function StackQueue() {
  var stack_1 = new Stack()
  var stack_2 = new Stack()

  this.enqueue = function(item) {
    stack_1.push(item)
  }

  this.dequeue = function() {
    while(!stack_1.isEmpty()) {
      stack_2.push(stack_1.pop())
    }
    if (!stack_2.isEmpty()) {
      return stack_2.pop()
    }
    return null
  }

  
}

var s_queue = new StackQueue()
s_queue.enqueue(1)
s_queue.enqueue(2)
s_queue.enqueue(3)

console.log(s_queue.dequeue());
console.log(s_queue.dequeue());
console.log(s_queue.head());

// 应用六
/*
  迷宫问题
  有一个二维数组
  var maze_array = [
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0]
  ]
  元素为0表示这个点可以通行，元素为1表示不可以通行，设置起点为maze_array[2][1], 终点是maze_array[3][5]
  请用程序计算这两个点是否相通，如果相通请输出两点之间的最短路径（从起始点到终点所经过的每一个点）

  思路分析
  从maze_array[2][1]这个点开始，把这个点能到达的邻近点都标记为1（表示与起始点距离为1），
  然后把标记为1的点能够达到的邻近点标记为2（表示与起始点距离为2），
  如此继续处理，知道到达终点，或者找不到可以达到的邻近点为止。标记后的结构图如下：
    [3, 2, 0, 0, 0, 0, 0],
    [2, 1, 0, 0, 0, 0, 0],
    [1, 0, 1, 2, 0, 0, 0],
    [2, 1, 2, 0, 0, 0, 0],
    [0, 2, 3, 4, 0, 8, 0],
    [0, 0, 0, 5, 6, 7, 8],
    [0, 0, 0, 6, 7, 8, 0]
  从起始点到终点，需要经过8个点，这个是最短的连同路劲，
  这时，要从终点开始反向寻找路劲，在终点的四周，一定存在一个点被标记为8，
  这个标记为8的点的四周一定存在一个点被标记为7，以此类推，最终找到标记为1的那个点，这个点的四周一定有一个点是起始点
*/
