// 二叉搜索树
/*
  - 特点：左子树小于根节点，根节点小于右子树
  - 中序遍历，等于升序排序
  - 唯一性：关键字不重复，否则返回false
*/
var Term = function(key,value) {
  this.key = key
  this.value = value
}
// var TreeNode = function(data) {
//   this.data = data.key
//   this.value = data.value
//   this.leftChild = null
//   this.rightChild = null
//   this.parent = null
// }

var TreeNode = function(data) {
  this.data = data
  this.leftChild = null
  this.rightChild = null
  this.parent = null
}

function BinarySearchTree() {
  var root = null

  // 插入关键码
  var insert_data = function(node, data) {
    // 空树的情况
    if (!root) {
      root = new TreeNode(data)
      return true
    }
    

    // 小于，往左子树插入
    if (data < node.data) {
      if (node.leftChild) {
        return insert_data(node.leftChild, data)
      } else {
        var new_node = new TreeNode(data)
        node.leftChild = new_node
        new_node.parent = node
        return true
      }
    } else if (data > node.data) {
      // 大于，往右子树插入
      if (node.rightChild) {
        return insert_data(node.rightChild, data)
      } else {
        var new_node = new TreeNode(data)
        node.rightChild = new_node
        new_node.parent = node 
        return true
      }
    } else {
      // 等于，不允许有重复的关键码
      return false
    }
  }

  this.insert_data = function(data) {
    return insert_data(root, data)
  }

  // 搜索关键码
  var search_data = function(node, data) {
    if (node === null) {
      return null
    }
    if (node.data === data) {
      return node
    } else if (node.data > data) {
      return search_data(node.leftChild, data)
    } else {
      return search_data(node.rightChild, data)
    }
  }

  this.search_data = function(data) {
    return search_data(root, data)
  }

  var link_parent = function(parent, node, next_node) {
    // 删除的是根节点
    if (!parent) {
      root = next_node
      root.parent = null
    } else {
      // 删除的是左节点
      if (parent.leftChild && parent.leftChild.data === node.data) {
        parent.leftChild = next_node
      } else {
        // 删除的是右节点
        parent.rightChild = next_node
      }
    }
  }
  // 删除节点
  var remove_data = function(node, data) {
    if (!node) {
      return false
    }
    if (node.data < data) {
      return remove_data(data.leftChild, data)
    } else if (node.data > data) {
      return remove_data(data.rightChild, data)
    } else {
      // 同时有左右孩子
      if (node.leftChild && node.rightChild) {
        var temp = node.rightChild
        while(temp.leftChild) {
          temp = temp.leftChild
        }
        // 被删除的节点的值等于中序遍历下的第一个节点的值
        node.data = temp.data
        // 去右子树里删除中序遍历的第一个节点
        return remove_data(node.rightChild, temp.data)
      } else {
        var parent = node.parent
        // 只有右孩子
        if (!node.leftChild) {
          link_parent(parent, node, node.rightChild)
        } else {
          // 只有左孩子
          link_parent(parent, node, node.leftChild)
        }
        return true
      }
    }
  }
  this.remove = function(data) {
    return remove_data(root, data)
  }

  this.print = function() {
    console.log(root);
  }

  // 返回最小值
  var get_min = function(node) {
    if (!node) {
      return null
    }
    if (!node.leftChild) {
      return node.data
    } else {
      var temp = node.leftChild
      while(temp.leftChild) {
        temp = node.leftChild
      }
      return temp.data
    }
    
  }
  this.min = function() {
    return get_min(root)
  }

  // 返回最大值
  var get_max = function(node) {
    if (!node) {
      return null
    }
    if (!node.rightChild) {
      return node.data
    } else {
      var temp = node.rightChild
      while(temp.rightChild) {
        temp = temp.rightChild
      }
      return temp.data
    }
  }

  this.max = function() {
    return get_max(root)
  }
}

var bst = new BinarySearchTree()

bst.insert_data(9)
bst.insert_data(3)
bst.insert_data(19)

console.log(bst.min());
console.log(bst.max());

// 利用二叉搜索树实现一个简单的字典
function MyDict() {
  var bst = new BinarySearchTree()

  // 向字典添加key-value对
  this.set = function(key, value) {
    var term = new Term(key,value)
    bst.insert_data(term)
    bst.print()
  }
  // 获取
  this.get = function(key) {
    console.log();
    return bst.search_data(key).value
  }
  // 判断
  this.hasKey = function(key) {
    var node = bst.search_data(key)
    if (!node) {
      return false
    } 
    return true
  }
}
var md = new MyDict()
md.set('name', 'javascript')
md.set('age', 20)

// console.log(md.hasKey('class'));
// console.log(md.hasKey('age'));
// console.log(md.get('name'));
// console.log(md.get('age'));