// [1, 5, 9, 9] => [1, 6, 0, 0]
var arr = [3, 9, 9],
  i = arr.length - 1

while (true) {
  if (i == -1) {
    arr.unshift(0)
    i++
  }
  var v = arr[i] + 1
  if (v < 10) {
    arr[i] = v
    break
  } else {
    arr[i] = v - 10
    i--
  }
}

console.log(arr)

// 将数组中的0移动到末尾， 其他数值相对位置保持不变
var arr1 = [4, 0, 3, 0, 0, 5, 0, 6]

arr1.sort((a, b) => {
  if (a > 0 || a == b) return 0
  if (a == 0) return 1
  return -1
})
console.log(arr1)

// 数组随机洗牌
var data = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
if (!Array.prototype.shuffle) {
  Array.prototype.shuffle = function() {
    for (var j, x, i = this.length - 1; i >= 0; i--) {
      j = parseInt(Math.random() * i)
      x = this[i]
      this[i] = this[j]
      this[j] = x
    }
    return this
  }
}

console.log(data.shuffle())
