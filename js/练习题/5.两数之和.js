var twoSum = function(nums, target) {
  var i = nums.length - 1 // 从数组后面开始
  var j = 0 // 从数组前面开始
  var dis = 0 // 插值是否在数组中
  while(i < nums.length) {
    dis = target-nums[i]
    j = nums.findIndex(val => val === dis)
    if (j === -1 || i === j) {
      i--      
    } else {
      break
    }
  }
  return [j,i]
};
var nums = [3,1,2,5]
// console.log(twoSum(nums, 3));
var arr = [7,8,9,1,7,9,8]