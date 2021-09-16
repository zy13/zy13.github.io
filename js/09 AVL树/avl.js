// AVL树
/*
  - 首先是一颗二叉搜索树
  - 左右子树的高度的绝对值不超高1，称为二叉搜索树
  
  平衡二叉树
  - 左单旋转（高度不变）：不平衡节点的平衡因子为2，其右孩子平衡因子为1
  - 右单旋转（高度不变）：不平衡节点的平衡因子为-2，其左孩子平衡因子为-1
  - 先左后右双旋转（）：不平衡节点的平衡因子为-2, 左孩子平衡因子为1
  - 先左后右双旋转（）：不平衡节点的平衡因子为2, 左孩子平衡因子为-1

  - insert方法
  - remove方法
  - Emmet插件功能
*/

// 实现一棵AVL树，实现insert方法（困难模式+）
var TreeNode = function(data) {
  this.data = data
  this.leftChild = null
  this.rightChild = null
  this.parent = null
}

function AvlTree() {
  var root = null

  var get_height = function(node) {
    var lh = 0
    var rh = 0
    var h = 0
    while(node.leftChild) {
      lh++
      node = node.leftChild
    }
    while(node.rightChild) {
      rh++
      node = node.rightChild
    }
    h = rh - lh
    return h
  }

  var insert = function(node, data) {   
    // 空树
    if (!root) {
      root = new TreeNode(data)
      return true
    }
    // 插入的节点小于根节点，往左子树找
    if(node.data > data) {
      if(node.leftChild) {
        return insert(node.leftChild, data)
      } else {
        var new_node = new TreeNode(data)
        node.leftChild = new_node
        new_node.parent = node
        return true
      }
    } else if (node.data < data) {
      // 插入的节点大于根节点，往右子树找
      if(node.rightChild) {
        return insert(node.rightChild, data)
      } else {
        var new_node = new TreeNode(data)
        node.rightChild = new_node
        new_node.parent = node
        // 插入节点后要判断平衡是否被破坏
        // 左单旋转：父节点平衡因子为2，右孩子平衡因子为1
        if (node.parent) {
          var h = get_height(node.parent)
          var rh = get_height(node.rightChild)
          if (h === 2 && rh === 1) {
            if (!node.parent.parent) {
              // 作为根节点
              var rightChild = root.rightChild
              rightChild.parent = null

              root.rightChild = rightChild.leftChild
              rightChild.leftChild = root
              root.parent = rightChild

              root = rightChild
            } else {
            }
          }
        }
        
        return true
      }
    } else {
      // 插入了重复的节点
      return false
    }
  }

  this.insert = function(data) {
    return insert(root, data)
  }


  this.print = function() {
    console.log(root);
  }
}

var avl = new AvlTree()
avl.insert(5)
avl.insert(6)
avl.insert(7)
avl.insert(8)
// avl.insert(9)
avl.print()