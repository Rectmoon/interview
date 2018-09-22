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

// log打印
function log() {
  var args = Array.prototype.slice.call(arguments)
  args.unshift('hello')
  console.log.apply(console, args)
}
log(1, 2, 3)

// bind的问题
var x = 1
var fn = function() {
  console.log(this.x)
}

var obj1 = {
  x: 11
}
var obj2 = {
  x: 22
}
var obj3 = {
  x: 33
}
var f1 = fn.bind(obj1)
var f2 = fn.bind(obj1).bind(obj2)
var f3 = fn
  .bind(obj1)
  .bind(obj2)
  .bind(obj3)
f1() // 11
f2() // 11
f3() // 11
/**
 * Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
var f2 = fn.bind(obj1).bind(obj2)  相当于 F.bind(obj2)此时F不是fn
 * 
 * 
 * 
*/
