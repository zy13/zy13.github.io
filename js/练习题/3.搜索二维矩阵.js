var searchMatrix = function(matrix, target) {
  var col = matrix[0].length - 1 // 列
  var row = 0 // 行
  while(col >= 0 && row < matrix.length) {
    if (matrix[row][col] === target) {
      return true
    } else if (matrix[row][col] > target)  {
      col--
    } else if (matrix[row][col] < target) {
      row++
    }
  }
  return false
}
var matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]
var target = 5
console.log(searchMatrix(matrix,target));