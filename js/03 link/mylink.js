function LinkList() {
  // 定义节点
  var Node = function(data) {
    this.data = data
    this.next = null
  }
  var length = 0 // 长度
  var head = null // 头节点
  var tail = null // 尾节点

  // 添加一个新的节点，返回布尔值
  this.append = function(data) {
    var new_node = new Node(data)
    if (head === null) {
      head = new_node
      tail = new_node
    } else {
      tail.next = new_node
      tail = new_node
    }
    length += 1
    return true
  }

  // 打印整个链表
  this.print = function() {
    var curr_node = head
    while(curr_node) {
      console.log(curr_node.data);
      curr_node = curr_node.next
    }
  }

  // 在指定位置插入一个元素, 返回布尔值
  this.insert = function(index, data) {
    var new_node = new Node(data)
    
    // 插入的位置不合法
    if (index < 0 || index > length) {
      return false
    } else if (index === 0) {
      // 在链表头部插入
      new_node.next = head
      head = new_node
    } else if (index === length) {
      // 在链表尾部插入
      return this.append(data)
    } else {
      // 在链表中间插入
      var inset_index = 1
      var curr_node = head
      while(inset_index < index) {
        curr_node = curr_node.next
        inset_index += 1
      }
      var next_node = curr_node.next
      new_node.next = next_node      
      curr_node.next = new_node
    }
    length += 1
    return true
  }

  // 删除指定位置的节点, 返回被删除的节点
  this.remove = function(index) {
    var del_node = null
    var del_index = 0
    var pre_node = null // 要找到被删除节点的前一个节点
    var curr_node = head 

    // 删除节点的位置不合法
    if (index < 0 || index > length) {
      return false
    } 
    // 删除链表的第一个节点
    if (index === 0) {      
      del_node = head
      head = head.next
    } else {
      while(del_index < index) {
        pre_node = curr_node
        curr_node = curr_node.next 
        del_index += 1
      }
      del_node = curr_node
      pre_node.next = curr_node.next // 被删除节点的前一个节点指向被删除节点的后一个节点

      // 如果删除的是尾节点
      if (curr_node.next === null) {
        pre_node.next = null
        tail = pre_node
      }
    }

    length -= 1
    del_node.next = null
    return del_node
  }

  // 获取指定位置的节点，返回该节点
  this.get = function(index) {
    // 获取节点的位置不合法
    if (index < 0 || index > length) {
      return false
    }
    var curr_node = null
    var curr_index = 0
    curr_node = head
    while(curr_index < index) {
      curr_node = curr_node.next
      curr_index += 1
    }
    return curr_node.data
  } 

  // 返回指定元素所在的位置，如果链表没有，返回-1
  this.indexOf = function(data) {
    var curr_node = head
    var index = -1
    while(curr_node) {
      index += 1
      if (curr_node.data === data) {
        return index
      } else {
        curr_node = curr_node.next
      }
    }
    return -1
  }

  // 清楚链表
  this.clear = function() {
    length = 0
    head = null
    tail = null
  }

  // 返回尾节点
  this.tail = function () {
    return this.get(length - 1)
  }

  // 判断链表是否为空
  this.isEmpty = function() {
    return length === 0
  }

  // 删除尾部节点
  this.remove_tail = function() {
    return this.remove(length - 1)
  }

  // 删除头部节点
  this.remove_head = function() {
    return this.remove(0)
  }

  // 返回链表头节点的值
  this.head = function() {
    return head.data
  }

  // 返回链表尾节点的值
  this.tail = function() {
    return tail.data
  }

  // 返回链表大小
  this.length = function() {
    return length
  }
}

var l_list = new LinkList()
l_list.append(1)
l_list.append(2)
l_list.append(5)
l_list.print()
l_list.insert(1, 99)
l_list.insert(0, 88)
l_list.insert(5, 77)
console.log(l_list.remove(0));
console.log(l_list.remove(1));
console.log(l_list.remove(3));
console.log(123, l_list.get(0));
console.log('indexOf', l_list.indexOf(5));
l_list.print()

// 应用一
// 基于链表实现Stack 和 Queue
function Stack() {
  var link_list = new LinkList()

  // 从栈顶添加元素
  this.push = function(data) {
    link_list.append(data)
  }

  // 从栈顶删除元素
  this.pop = function() {
    return link_list.remove_tail()
  }

  // 返回栈顶元素
  this.top = function() {
    return link_list.tail()
  }

  // 返回栈的大小
  this.size = function() {
    return link_list.length()
  }

  // 判空
  this.isEmpty = function() {
    return link_list.isEmpty()
  }

  // 清空栈
  this.clear = function() {
    return link_list.clear()
  }
}
function Queue() {
  var link_list = new LinkList()

  // 入队列
  this.enqueue = function(data) {
    link_list.append(data)
  }

  // 出队列
  this.dequeue = function() {
    return link_list.remove_head()
  }

  // 返回队首
  this.head = function() {
    return link_list.head()
  }

  // 返回队尾
  this.tail = function() {
    return link_list.tail()
  }

  // size
  this.size = function() {
    return link_list.length()
  }

  // clear
  this.clear = function() {
    return link_list.clear()
  }

  // 判空
  this.isEmpty = function() {
    return link_list.isEmpty()
  }
}

// 应用二
/*
  - 翻转链表

  
  使用迭代和递归两种方法翻转链表，下面的代码已经准备好上下文环境，
  请实现函数的reverse_iter和reverse_digui
  
  - 什么是迭代翻转
  链表中除了头节点和尾节点，让每一个节点的前一个节点变成当前节点下一个节点，下一个节点变成前一个节点
  头节点变成尾节点，尾节点变成头节点

  - 迭代翻转的思路分析
  在考虑算法的时候，多数情况下你考虑边界情况会让问题变得简单，但边界情况往往不具有普适性
  因此在尝试考虑中间的情况，假设链表中间的某个点为curr_node, 它的前一个节点是pre_node,后一个节点next_node
  现在把思路聚焦到这个curr_node节点上，只考虑在这个点上进行翻转，翻转方法如下：
  curr_node.next = pre_node 只需要这个简单的步骤就可以完成curr_node节点的翻转
  对于头节点来说，它没有上一个节点，pre_node=null,表示它的上一个节点是一个空间点

  在遍历的过程中，每完成一个节点的翻转，都让curr_node=next_node节点,找到下一个需要翻转的节点。
  同时，pre_node = curr_node也跟随curr_node一起向后滑动。
*/

// 迭代翻转
function reverse_iter(head) {
  // 空链表返回空值
  if (head === null) {
    return null
  }
  var pre_node = null // 头节点的前一个节点为空
  var curr_node = head // 当前要翻转的节点
  while(curr_node) {
    var next_node = curr_node.next // 下一个节点
    curr_node.next = pre_node // 对当前节点进行翻转

    pre_node = curr_node // pre_node向后滑动    
    curr_node = next_node // curr_node向后滑动
  }
  // 最后需要返回pre_node,当循环结束时，pre_node指向翻转前链表的最后一个节点
  return pre_node
}

var Node = function(data) {
  this.data = data
  this.next = null
}

var node1 = new Node(1)
var node2 = new Node(2)
var node3 = new Node(3)
var node4 = new Node(4)

node1.next = node2
node2.next = node3
node3.next = node4

function print(node) {
  var curr_node = node
  while(curr_node) {
    console.log(curr_node.data);
    curr_node = curr_node.next
  }
}

// print(node1)
// console.log(reverse_iter(node1));
// print(node4)

/*
 递归翻转
 递归翻转的思想，精髓之处在于甩锅，你做不到的事情，让别人去做，等别人做好了，你继续做
 - 甩锅一共分为四步：
  - 1. 明确函数的功能，既然是先让别人去做，那你得清楚地告诉他做什么。
      函数reverse_digui(head)完成的功能，是从head开始翻转链表，函数返回值是翻转后的头节点
  - 2. 正式甩锅，进行递归调用，就用翻转链表而言，甩锅方法如下：
      var new_head = reverse_digui(head.next)
      原本是翻转以head开头的链表，可是你不会啊，那就先让别人从head.next开始翻转链表，
      等他翻转完，得到的new_head就是翻转后的头节点
  - 3. 根据别人的结果，计算自己的结果
    第二步中，已经完成从head.next开始翻转，现在只需要把head连接到新链表上就可以了，新链表的尾节点是head.next,
    执行head.next.next = head, 这样，head就成了新聊表的尾节点了
  - 4. 找到终止递归的条件
    递归必须有终止条件，否则，就会进入到死循环，函数最终要返回新链表的头，而新链表头的正是旧链表的尾部，
    所以，遇到尾节点，直接返回尾节点，这就是递归终止的条件
*/
function reverse_digui(head) {
  // 空链表直接返回空
  if (head === null) {
    return null
  }
  // 遇到尾节点，直接返回尾节点
  if (head.next === null) { 
    return head
  }
  // 从头节点的下一个节点开始翻转
  var new_head = reverse_digui(head.next)
  head.next.next = head
  head.next = null
  return new_head
}
// print(reverse_digui(node4));

// 应用

/*
  从尾到头打印链表，不许翻转链表
  拿到一个链表，得到的是头节点，只有头节点以后的节点被打印了，才能打印头节点，这是一个甩锅事情
*/
function reverse_print(head) {
  if(head === null) {
    return null
  } else {
    reverse_print(head.next) // 甩锅
    console.log(11, head.data); // 后面的都打印完了，才打印自己的
  }
}
// reverse_print(node1)

/*
  合并两个有序链表 
  已知由两个有序链表（链表元素从小到大），请实现函数merge_link,将两个链表合并成一个有序链表，
  并返回新链表，原有的两个链表不要修改
*/

var node1 = new Node(1)
var node2 = new Node(4)
var node3 = new Node(9)
var node4 = new Node(2)
var node5 = new Node(5)
var node6 = new Node(6)
var node7 = new Node(10)
var node8 = new Node(10)
var node9 = new Node(3)

// link_list_1
node1.next = node2
node2.next = node3

// link_list_2
node4.next = node5
node5.next = node6
node6.next = node7
node7.next = node8
node8.next = node9

function merge_link(head1, head2) {
  var link_list = new LinkList()
  var curr_node = null // 记录需要循环的有序链表
  var insert_node = null // 记录直接插入的空链表的有序链表
  var min_head = null

  // 记录首节点较小的有序链表，以及需要循环的有序链表
  if (head1.data <= head2.data) {
    insert_node = head1
    curr_node = head2
  } else {
    insert_node = head2
    curr_node = head1
  }
  min_head = insert_node

  // 将较小的有序链表插入到空链表中，最后insert_node指向link_list的尾节点
  while (insert_node) {
    link_list.append(insert_node.data)
    insert_node = insert_node.next
  }

  // 循环curr_node，建节点有序地插入到link_list中
  // 记录节点插入的位置
  var index = 0
  while(curr_node) {
    // 如果curr_node点大于link_list的尾节点，直接插入
    if (curr_node.data >= link_list.tail()) {
      link_list.append(curr_node.data)
    } else {
      // 查找curr_node需要插入的位置
      var min = function(head) {
        console.log(index, curr_node.data, head.data, head.next);
        if (curr_node.data <= head.data) {
          // link_list.insert(index, curr_node.data)
        } else {
          index += 1
          min(head.next)
        }
      }
      min(min_head)
    }
    curr_node = curr_node.next
  }

  return link_list
}

console.log('========================');
merge_link(node1, node4).print()


// 查找单链表中的倒数第K个节点（k>0）
/*
  思路分析
  - 定义两个游标节点，一个快游标，一个慢游标，两个游标指向头节点;定义一个step标记，step = k
  - 快游标先走step步，每走一步，step减1，
  - 当循环结束时，如果step不等于0，说明单链表长度不够k，返回空节点
  - fast游标和step游标同时滑动，当快游标的下一个节点为空时，结束循环，返回慢游标 
*/

function reverse_find(head, k) {
  var fast = head // 快游标
  var slow = head // 慢游标
  var step = k // 步数

  // 快游标先走k步
  while(step > 0 && fast) {
    fast = fast.next
    step -= 1
  }

  // step不等于0，说明链表长度不够k,返回空
  if (step !== 0) {
    return null
  } 

  // 快游标和慢游标同时向前滑动，快游标走到最后时循环结束，此时慢游标所走的步数就是所求的节点
  while(fast && slow) {
    fast = fast.next
    slow = slow.next
  }

  return slow.data
}

var Node = function(data) {
  this.data = data
  this.next = null
}
var node1 = new Node(1)
var node2 = new Node(2)
var node3 = new Node(3)
var node4 = new Node(4)
var node5 = new Node(5)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5

console.log(reverse_find(node1, 5));

// 查找单链表的中间节点
/**
 * 定义两个游标节点，一个快游标一个慢游标，
 * - 快游标每次走两步，慢游标每次走一步
 * - 当快游标走到头时，慢游标就走到了中间节点
 */
function find_middle(head) {
  var fast = head
  var slow = head
  while(fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow.data
}
console.log('middle', find_middle(node1));

// 实现双向链表
/**
 * 和单链表不同的是，双向链表的每个节点多出一个pre指针域，指向它的前驱节点
 * 下面是双向链表的定义，请实现append, insert,  remove这三个方法
 *
 */
function Double_Link() {
  var Node = function(data) {
    this.data = data // 数据
    this.next = null // 后继指针
    this.pre = null // 前驱指针
  }

  var head = null // 头节点
  var tail = null // 尾节点
  var length = 0 // 长度

  // 在链表尾部插入节点
  this.append = function(data) {
    var node = new Node(data)
    if (length === 0) {
      head = node
      tail = node
    } else {
      node.pre = tail
      tail.next = node
      tail = node
    }
    length += 1
    return true
  }

  // 获取指定位置的节点
  this.get_node = function(index) {
    // 非法获取
    if (index < 0 || index >= length) {
      return null
    }

    var curr_node = head
    var node_index = index
    while(node_index-- > 0) {
      curr_node = curr_node.next
    }
    return curr_node
  }

  // 在链表指定位置插入节点
  this.insert = function(index, data) {
    var node = new Node(data)
    // 插入位置不合法
    if (index < 0 || index > length) {
      return null
    } 
    // 在头节点插入
    if (index === 0) {
      node.next = head
      head.pre = node
      head = node
    } else if (index === length) {
      return this.append(data)
    } else {
      var pre_node = this.get_node(index - 1)
      // 四个指针指向的变化
      node.next = pre_node.next
      node.next.pre = node
      pre_node.next = node
      node.pre = pre_node
    }
    length += 1
    return true
  }

  // 在指定位置删除节点，返回删除的节点
  this.remove = function(index) {
    var del_node = null
    // 插删除位置不合法
    if (index < 0 || index >= length) {
      return null
    } 
    // 删除头节点
    if (index === 0) {      
      head.next.pre = null
      del_node = head
      head = head.next
    } else {
      var pre_node = this.get_node(index - 1)
      del_node = pre_node.next
      if (del_node.next === null) {
        pre_node.next = null
        tail = pre_node
      } else {
        pre_node.next = del_node.next
        del_node.next.pre = pre_node
      }
    }
    length -= 1
    return del_node.data
  }

  // 打印双链表
  this.print = function() {
    var str = ' '
    var curr_node = head
    while(curr_node) {
      str += curr_node.data + ' '
      curr_node = curr_node.next
    }
    console.log(str);
  }
}

var double_link = new Double_Link()
double_link.append(1)
double_link.append(2)
double_link.append(3)
double_link.append(4)
double_link.print()
double_link.insert(0, 6)
double_link.print()
double_link.insert(1, 7)
double_link.print()
double_link.insert(5, 8)
double_link.print()
double_link.remove(6)
double_link.print()