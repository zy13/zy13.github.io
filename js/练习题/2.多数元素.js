// 二分查找
function majorityElement(nums)  {
  var arr = nums
  var i = 0
  arr.sort()
  i = Math.floor(arr.length/2)
  return arr[i]
}