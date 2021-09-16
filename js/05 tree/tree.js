
// 栈
function Stack() {
  var items = []; // 存储数据

  // 压栈
  this.push = function (item) {
    items.push(item)
  }

  // 弹出元素
  this.pop = function (item) {
    return items.pop(item)
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

// 树

// 定义二叉树节点
var BinTreeNode = function(data) {
  this.data = data
  this.leftChild = null // 左孩子
  this.rightChild = null // 右孩子
  this.parentNode = null // 父节点
}

// 定义二叉树
/*
  广义表表达树：A(B(D,E(G,)),C(,F))
  思路分析
  - 遍历这个A(B(D,E(G,)),C(,F))#字符串，来建立一颗二叉树
  - 遇到左括号的时候，
    说明前面有一个节点，这个括号里的两个节点都是它的子节点，但是子节点后面还会有子节点，
    因此，我们需要一个先进后出的数据结构，把前面的节点保存下来，
    这样，栈顶就是当前要处理的两个节点的父节点。
  - 逗号分隔了左右子树，
    因此需要一个变量来标识遇到的是左子树还是右子数，
    假设这个变量为k, 遇到左括号的时候，k=1, 表示开始识别左子树，遇到逗号，k=2表示开始识别右子树
  - 遇到右括号
    说明一棵树结束了，那么栈顶的元素正是这课子树的根节点，执行pop方法出栈
*/
var BinaryTree = function() {
  var root = null // 根节点

  // 初始化二叉树
  this.init_tree = function(str) {
    var stack = new Stack()
    var k = 0 // 标识识别的是左子树还是右子树
    var new_node = null 

    for(var i = 0; i < str.length; i++) {
      var item = str[i]
      if (item === '#') {
        break
      }

      if(item === '(') {
        stack.push(new_node) // 将节点入栈
        k = 1 // 识别左子树
      } else if (item === ',') {
        k = 2 // 识别右子树
      } else if (item === ')') {
        stack.pop()
      } else {
        // 遇到数据，生成节点
        new_node = new BinTreeNode(item)
        if (root === null ) {
          root = new_node
        } else {
          // new_node是左孩子
          if (k === 1) {
            var top_item = stack.top()
            top_item.leftChild = new_node
            new_node.parentNode = top_item
          } else if (k === 2) {
            // 右孩子
            var top_item = stack.top()
            top_item.rightChild = new_node
            new_node.parentNode = top_item
          }
        }
      }
    }
  }

  // 返回根节点
  this.get_root = function() {
    return root
  }

  // 中序遍历
  this.in_order = function(node) {
    if (node === null) {
      return
    }
    // 甩锅给左子树
    this.in_order(node.leftChild)
    console.log(node.data);
    // 遍历右左子树，
    this.in_order( node.rightChild)
  }

  // 前序遍历
  this.pre_order = function(node) {
    if (node === null) {
      return
    }
    console.log(node.data);
    this.pre_order(node.leftChild)
    this.pre_order(node.rightChild)
  }

  // 后序遍历
  this.post_order = function(node) {
    if (node === null) {
      return
    }
    this.pre_order(node.leftChild)
    this.pre_order(node.rightChild)
    console.log(node.data);
  }

  // 节点数量
  var tree_node_count = function(node) {
    // 左子树的节点数量+右子树的节点数量+1
    if (node === null) {
      return 0
    }
    var left_node_count = tree_node_count(node.leftChild)
    var right_node_count = tree_node_count(node.rightChild)
    return left_node_count + right_node_count + 1
  }

  // 返回节点数量
  this.size = function() {
    return tree_node_count(root)
  }

  // 数的高度
  var tree_height = function(node) {
    if (node === null) {
      return 0
    }
    // 先计算左子树的高度
    var left_child_height = tree_height(node.leftChild)
    // 再计算右子树的高度
    var right_child_height = tree_height(node.rightChild)
    // 返回高度较高的树
    return Math.max(left_child_height, right_child_height) + 1
  }
  this.height = function() {
    return tree_height(root)
  }

  // 查找节点
  var find_node = function(node, data) {
    if (node === null) { 
      return null
    }
    // 当前节点的值等于data
    if (node.data === data) {
      return node
    } 
    // 先到左子树找
    var left_res = find_node(node.leftChild, data)
    // 如果找到节点
    if (left_res) {
      return left_res
    } 
    // 没找到，去右子树里找
    return find_node(node.rightChild, data)
  }
  this.find = function(data) {
    return find_node(root, data)
  }
}

var bt = new BinaryTree()
bt.init_tree('A(B(D,E(G,)),C(,F))#')
// 中序遍历
console.log('中序遍历');
bt.in_order(bt.get_root())
// 前序遍历
console.log('前序遍历');
bt.pre_order(bt.get_root())
// 后序遍历
console.log('后序遍历');
bt.in_order(bt.get_root())
console.log('节点数量', bt.size());
console.log('节点高度', bt.height());
console.log('查找节点', bt.find('C'));

// 练习
/*
  求一棵树的镜像
  - 对于一棵树，如果每个节点的左右子树互换位置，那么就变成了这棵树的镜像
  请实现mirror方法
*/
// 方法一
var mirror_1 = function(node) {
  if (node === null) {
    return 
  }
  // 互换位置
  var leftChild = node.leftChild
  node.leftChild = node.rightChild
  node.rightChild = leftChild

  mirror_1(node.leftChild)
  mirror_1(node.rightChild)
}

// 方法二
var mirror_2 = function(node) {
  if (node === null) {
    return 
  }
  var left = mirror_2(node.leftChild)
  var right = mirror_2(node.rightChild)
  node.leftChild = right
  node.rightChild = left
  return node
}

var bt = new BinaryTree()
bt.init_tree('A(B(D,E(G,)),C(,F))#')
var root_node = bt.get_root()
mirror_1(root_node)
console.log('数的镜像-中序遍历');
bt.in_order(root_node)


/*
  使用非递归遍历实现遍历方式
*/
var bt = new BinaryTree()
bt.init_tree('A(B(D,E(G,)),C(,F))#')
var root_node = bt.get_root()

function pre_order(node) {
  var stack = new Stack()
  var curr_node= node
  while(curr_node) {
    console.log(curr_node.data);
    // 如果有右子树，把右子树存起来
    if (curr_node.rightChild) {
      stack.push(curr_node.rightChild)
    }

    if (curr_node.leftChild) {
      curr_node = curr_node.leftChild
    } else {
      // 没有左子树, 取出右子树
      curr_node = stack.pop()
    }
  }
}

console.log('前序遍历');
pre_order(bt.get_root())
