// 只能除以整数
function BitMap(size) {
  var bit_arr = new Array(size) // 数组初始化
  var repeat_arr = new Array(size) // 存储重复的数据

  // 初始化
  for(var i = 0; i < size; i++) {
    bit_arr[i] = 0
  }

  // 添加元素：要判重
  this.addMember = function(member) {
    var arr_index = Math.floor(member/32)
    var bit_index = member%32 
    var value = bit_arr[arr_index] & 1<<bit_index // value非0说明元素已经存在
    // 已经存在的数存在repeat_arr中 
    if (bit_arr[arr_index] && value) {
      repeat_arr[arr_index] = repeat_arr[arr_index] | 1<<bit_index
    } else {
      bit_arr[arr_index] = bit_arr[arr_index] | 1<<bit_index
    }
  }

  // 判断元素是否存在
  this.isExist = function(member) {
    var arr_index = Math.floor(member/32)
    var bit_index = member%32 
    var value = bit_arr[arr_index] & 1<<bit_index
    if (value !== 0) {
      return true
    }
    return false
  }

  // 判断member是否重复出现
  this.isRepeat = function(member) {
    var arr_index = Math.floor(member / 32)
    var bit_index = member % 32
    var value = repeat_arr[arr_index] & 1<< bit_index  
    console.log(value);
    if (value !== 0) {
      return true
    }
    return false
  }
}

var arr1 = [1,4,6,8,9,10,15]
var arr2 = [6,14,9,2,0,7]
var arr3 = [1,3,4,5,7,4,8,9,2,9]
var arr = []
var bitmap = new BitMap(1)

for(var i = 0; i < arr3.length; i++) {
  bitmap.addMember(arr3[i])
}

for(var i = 0; i < arr3.length; i++) {
  if (!bitmap.isRepeat(arr3[i])) {
    arr.push(arr3[i])
  }
}

console.log(arr);

