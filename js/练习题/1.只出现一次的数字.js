// 方法一
var singleNumber1 = function(nums) {
  var i = 1
  var sum = arr[0]
  while(i < arr.length) {
    sum ^= arr[i]
    i++
  }
};

var singleNumber2 = function(nums) {
  var i = 0
  var s = new Set()
  while(i < arr.length) {
    if (s.has(arr[i])) {
      s.delete(arr[i])
    } else {
      s.add(arr[i])
    }
    i++
  }
  return [...s][0]
}

singleNumber2([2,2,1])
singleNumber2([4,1,2,1,2])