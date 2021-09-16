// 分而治之
// 归并排序
// 合并两个有序数组
function merge1(arr1, arr2) {
  var merge_arr = []
  var i = 0
  var j = 0

  // 比较两个数组的元素
  while(i < arr1.length && i < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merge_arr.push(arr1[i])
      i++
    } else {
      merge_arr.push(arr2[j])
      j++
    }
  }

  // 数组一有剩余
  while(i < arr1.length) {
    merge_arr.push(arr1[i])
    i++
  }

  // 数组二有剩余
  while(j < arr2.length) {
    merge_arr.push(arr2[j])
    j++
  }
  console.log(merge_arr);
  return merge_arr
}

var arr1 = [1, 3, 5];
var arr2 = [2, 4, 6];
merge1(arr1, arr2)

// 分而治之
// 归并排序
// 合并两个有序数组
var merge2 = function(nums1,m,nums2,n) {
  var i = m - 1
  var j = n - 1
  var end = m+n - 1
  while(j >= 0) {
    nums1[end--] = (i >= 0 && nums1[i] > nums2[j]) ? nums1[i--] : nums2[j--]
  }
}
// var arr1 = [1, 3, 5];
// var arr2 = [2, 4, 6];
// merge1(arr1, arr2)

var merge3 = function(nums1,m,nums2,n) {
  var temp = new Array(m+n)
  var index = 0
  var i = 0
  var j = 0
  while(i < m && j < n) {
    if (nums1[i] <= nums2[j]) {
      temp[index++] = nums1[i++]
    } else {
      temp[index++] = nums2[j++]
    }
  }
  // 数组一有剩余
  while(i < m) {
    temp[index++] = nums1[i++]
  }

  // 数组二有剩余
  while(j < n) {
    temp[index++] = nums2[j++]
  }

  // 将数组的多余元素清除掉
  while(m+n<nums1.length) {
    nums1.shift()
  }
}

var nums1 = [1,2,3,0,0,0]
var nums2 = [2,5,6]
merge3(nums1,3,nums2,3)
console.log(nums1);