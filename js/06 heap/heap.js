/**
 * 最小堆原理
 * 堆数组调整为最小堆的过程，先保证局部是一个最小堆，然后从局部出发，逐步扩大，直到整棵树都调整为最小堆
 * 
 * 调整算法思路：
 * - 先查找所有的分支节点，
 * - 然后根据这些分支节点的索引从大到小依次进行调整，
 * - 每次调整时，从该分支节点向下进行调整，使得该分支节点和它的子孙节点构成一个最小堆
 * - 假设数组的大小为n, 则最后一个分支节点的索引为(n-2)/2, 第一个分支节点的索引为0。
 * 
 * 在局部进行调整时，
 * - 如果父节点的关键码小于等于两个子女中的最小关键码，说明不需要调整了
 * - 否则，将父节点和拥有最小关键码的子女进行位置互换，并继续向下比较调整
 *
 * @param {*} size
 */
 function MinHeap(size) {
  var heap = new Array(size) // 数组
  var curr_size = 0 // 当前堆的大小
  var max_size = size // 堆最大容量

  var shif_down = function(start, m) {
    // 从start这个位置开始，向下下滑跳转
    var parent_index = start // start就是当前这个局部的父节点
    var min_child_index = parent_index*2 + 1// 一定有左孩子，先让min_child_index等于左孩子

    while(min_child_index <= m) {
      // min_child_index是左孩子的索引，左孩子大于右孩子
      if(min_child_index < m && heap[min_child_index] > heap[min_child_index + 1]) {
        min_child_index = min_child_index + 1 // min_child_index永远指向值最小的那个孩子
      }

      // 父节点的值小于等于两个孩子的最小值
      if(heap[parent_index] <= heap[min_child_index]) {
        break // 循环结束，不需要调整
      } else {
        // 父节点和子节点的值互换
        // var temp = heap[parent_index]
        // heap[parent_index] = heap[min_child_index]
        // heap[min_child_index] = temp
        [heap[parent_index], heap[min_child_index]] = [heap[min_child_index], heap[parent_index]]
        parent_index = min_child_index
        min_child_index = min_child_index*2 + 1
      }
    }
  }

  // 传入一个数组，然后调整为一个最小堆
  this.init = function(arr) {
    curr_size = arr.length
    heap = new Array(arr.length)
    // 填充heap，目前还不是一个堆
    for(var i = 0; i < curr_size; i++) {
      heap[i] = arr[i]
    }
    var curr_post = Math.floor((curr_size-2)/2) // 堆的最后一个分支节点
    while(curr_post >= 0) {
      shif_down(curr_post, curr_size-1) // 局部自上向下下滑调整
      curr_post -= 1 // 调整下一个分支节点
    }
  }

  var shift_up = function(start) {
    var child_index = start // 当前节点是叶子节点
    var parent_index = Math.floor((child_index - 1) / 2) // 找到父节点

    while(child_index > 0) {
      // 父节点更小，就不用调整了
      if (heap[parent_index] <= heap[child_index]) {
        break
      } else {
        // 父节点和子节点互相交换
        [heap[parent_index],heap[child_index]] = [heap[child_index], heap[parent_index]]
        child_index = parent_index
        parent_index = Math.floor((child_index-1)/2)
      }
    }
  }

  // 插入一个新元素
  this.insert = function(item) {
    // 堆满了，不能再放元素了
    console.log(curr_size, max_size);
    if (curr_size === max_size) {
      return false
    }
    heap[curr_size] = item
    shift_up(curr_size)
    curr_size++
    return true
  }

  // 删除最小堆的最小值
  this.remove_min = function() {
    if (curr_size <= 0) {
      return null
    }
    var min_value = heap[0]
    heap[0] = heap[curr_size - 1]
    curr_size--
    shif_down(0, curr_size - 1)
    return min_value
  }

  this.print = function() {
    console.log(heap);
  }  

  this.get_min = function() {
    if (curr_size > 0) {
      return heap[0]
    }
    return null
  }

  this.size = function() {
    return curr_size
  }
}
// var arr = [53,17,78,9,45,65,87,23]
// var mp = new MinHeap(10)
// mp.init(arr)
// // mp.print()
// mp.insert(11)
// mp.print()

// 应用
// 排序
function MinHeap1(size) {
  var curr_size = 0 // 当前堆得大小
  var max_size = size // 堆得最大存储量
  var heap = new Array(size)

  // 局部由上向下调整
  var shift_down = function(start, m) {
    // 从start这个位置开始，向下下滑跳转
    var parent_index = start // start就是当前这个局部的父节点
    var min_child_index = parent_index*2 + 1// 一定有左孩子，先让min_child_index等于左孩子

    while(min_child_index <= m) {
      // min_child_index是左孩子的索引，左孩子大于右孩子
      if(min_child_index < m && heap[min_child_index] > heap[min_child_index + 1]) {
        min_child_index = min_child_index + 1 // min_child_index永远指向值最小的那个孩子
      }

      // 父节点的值小于等于两个孩子的最小值
      if(heap[parent_index] <= heap[min_child_index]) {
        break // 循环结束，不需要调整
      } else {
        // 父节点和子节点的值互换
        // var temp = heap[parent_index]
        // heap[parent_index] = heap[min_child_index]
        // heap[min_child_index] = temp
        [heap[parent_index], heap[min_child_index]] = [heap[min_child_index], heap[parent_index]]
        parent_index = min_child_index
        min_child_index = min_child_index*2 + 1
      }
    }
  }
  // 堆初始化
  this.init = function(arr) {
    curr_size = arr.length
    heap = new Array(curr_size)
    // 填充heap,目前还不是一个堆
    for(var i = 0; i < curr_size; i++) {
      heap[i] = arr[i]
    }

    var curr_pos = Math.floor((curr_size-2)/2)// 最后一个分支节点
    while(curr_pos >= 0) {
      shift_down(curr_pos, curr_size - 1)
      curr_pos -= 1
    }
  }

  // 局部由下向上调整
  var shift_up = function(start) {
    var parent_index = Math.floor((start - 1)/2) // 父节点
    var child_index = start
    while(child_index > 0) {
      if (heap[parent_index] <= heap[child_index]) {
        break
      } else {
        [heap[parent_index], heap[child_index]] = [heap[child_index], heap[parent_index]]
        child_index = parent_index
        parent_index = Math.floor((child_index - 1)/2)        
      }
    }
  }

  // 插入元素
  this.insert = function(item) {
    // 堆满了，不能再放入元素了
    if (curr_size === max_size) {
      return false
    }
    heap[curr_size] = item    
    shift_up(curr_size)
    curr_size++
    return true
  }

  // 打印堆数组
  this.print = function() {
    console.log(heap);
  }

  // 删除堆顶元素
  this.remove_min = function() {
    if (curr_size <= 0) {
      return null
    }
    var min_value = heap[0]
    heap[0] = heap[curr_size - 1]
    curr_size--
    shift_down(0, curr_size-1)
    return min_value
  }

  // 求堆的大小
  this.size = function() {
    return curr_size
  }

  // 获取堆顶元素
  this.get_min = function() {
    return heap[0]
  }
}

var arr = [53, 17, 78, 9, 45, 65, 87, 23];
var min_heap = new MinHeap1(10)
min_heap.init(arr)
// console.log('最小堆');
// min_heap.print()

var sort_arr = []
for(var i = 0; i < arr.length; i++) {
  sort_arr.push(min_heap.remove_min())
}
// console.log(123, sort_arr);



// Top K 问题
var arr = [53, 17, 78, 9, 45, 65, 87, 23];
var min_heap = new MinHeap1(10)
min_heap.init(arr.slice(0,3))
// min_heap.print()
for(var i = 3; i < arr.length; i++) {
  if (arr[i] >= min_heap.get_min()) {
    min_heap.remove_min()
    min_heap.insert(arr[i])
  }
}
// min_heap.print()

// 课后作业
// 实现最大堆
function Max_Heap(size) {
  var curr_size = 0 // 当前堆的大小
  var max_size = size // 堆的最大存储量
  var heap = new Array(size)

  var shift_down = function(start, m) {
    var parent_index = start // 父节点
    var max_child_index = parent_index*2 + 1 // 左孩子
    while(max_child_index <= m) {
      // 查出较大孩子节点
      if (max_child_index < m && heap[max_child_index] < heap[max_child_index + 1]) {
        max_child_index += 1
      }
      // 父节点比左右孩子都大，循环结束，不需要调整
      if (heap[parent_index] >= heap[max_child_index]){
        break
      } else {
        [heap[parent_index], heap[max_child_index]] = [heap[max_child_index],heap[parent_index]]
        parent_index = max_child_index
        max_child_index = max_child_index*2 + 1
      }
    }
  }
  
  // 初始化堆
  this.init = function(arr) {
    curr_size = arr.length
    heap = new Array(curr_size)

    if (curr_size >= max_size) {
      return false
    }

    for(var i=0;i<curr_size;i++) {
      heap[i] = arr[i]
    }

    // 局部调整对大堆
    var pos_index = Math.floor((curr_size-2)/2)
    while(pos_index >= 0) {
      shift_down(pos_index, curr_size - 1)
      pos_index -= 1
    }
  }

  var shift_up = function(start) {
    var child_index = start
    var parent_index = Math.floor((child_index-2)/2)
    while(parent_index >= 0) {
      if(heap[parent_index] >= heap[child_index]) {
        break
      } else {
        [heap[parent_index], heap[child_index]] = [heap[child_index], heap[parent_index]]
        child_index = parent_index
        parent_index = Math.floor((child_index-1)/2)
      }
    }
  }

  // 插入元素
  this.insert = function(item) {
    // 堆已经满了，无法插入元素
    if (curr_size === max_size) {
      return false
    }
    heap[curr_size] = item
    shift_up(curr_size)
    curr_size++
    return true
  }

  // 删除堆顶元素
  this.remove_max = function() {
    var max_value = heap[0]
    heap[0] = heap[curr_size-1]
    curr_size--
    shift_down(0, curr_size-1)
    return max_value
  }

  // 获取堆顶元素
  this.get_max = function() {
    return heap[0]
  }
  
  // 打印堆
  this.print = function() {
    console.log('最大堆：', heap);
  }
}
var arr = [53, 17, 78, 9, 45, 65, 87, 23];
var max_heap = new Max_Heap(10)
max_heap.init(arr)
max_heap.insert(24)
max_heap.remove_max()
max_heap.print()

// 用最大堆排序
var arr = [53, 17, 78, 9, 45, 65, 87, 23];
var max_heap = new Max_Heap(10)
max_heap.init(arr)

var sort_arr = []
for(var i = 0; i<arr.length;i++) {
  sort_arr.push(max_heap.remove_max())
}
console.log(sort_arr);

// 用最大堆实现TOP k， 即获取最小的k个数
var arr = [53, 17, 78, 9, 45, 65, 87, 23];
var max_heap = new Max_Heap(10)
max_heap.init(arr.slice(0,3))

for(var i=3;i<arr.length;i++) {
  if (arr[i] < max_heap.get_max()) {
    max_heap.remove_max()
    max_heap.insert(arr[i])
  }
}
max_heap.print()

