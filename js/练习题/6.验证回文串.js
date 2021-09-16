
var isPalindrome1 = function(s) {
  var i = 0
  var j = s.length - 1
  var regexp = /[a-zA-Z0-9]/
  while(i<j) {
    // 过滤掉非不符合要求的字符
    while(i<j && !regexp.test(s[i])) {
      i++
    }
    while(i<j && !regexp.test(s[j])) {
      j--
    }
    // 符合要求的两个字符不相等
    if (s[i].toLowerCase() !== s[j].toLowerCase()) {
      return false
    }
    i++
    j--
  }
  return true
};
var str1 = 'A man, a plan, a canal: Panama'
var str2 = 'race a car'
// console.log(isPalindrome1(str1));

var isPalindrome2 = function(s) {
  var actual = s.replace(/[^a-zA-Z0-9]/g,'').split('')
  var rev = s.replace(/[^a-zA-Z0-9]/g,'').split('').reverse()
  return actual.join('').toLowerCase() == rev.join('').toLowerCase()
}
// console.log(333, isPalindrome2(str1));