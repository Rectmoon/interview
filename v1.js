!(function() {
  String.prototype.myIndexOf = function(s) {
    const len1 = this.length,
      len2 = s.length,
      diff = len1 - len2
    let i = 0
    while (i < diff) {
      i++
      if (this.substr(i, len2) === s) {
        return i
      }
    }
    return -1
  }

  String.prototype.myIndexOf2 = function(s) {
    const regexp = new RegExp(s)
    const result = regexp.exec(this)
    return result === null ? -1 : result.index
  }
})()

const s1 = 'hello'
const s2 = 'll'
const s3 = 'ell'
console.log(s1.myIndexOf(s2))
console.log(s1.myIndexOf(s3))

var b = 10

!(function b() {
  var b = 30
  console.log(b)
})()

console.log(b)

// =======================================
/* 
   == 比较规则， 如果左右两边数据类型不一样，则先转换为相同的数据类型再进行比较
   1. {} == {} 比较的是堆内存地址
   2. null == undefined / null !== undefined
   3. NaN 和 谁都不相等
   4. [123] == '123' 对象与字符串相比，先使用toString方法把对象转换为字符串再进行比较
   5. 剩余的所有情况在进行比较的时候，都是转换成数字（数据类型不一样）
      对象转数字：先转成字符串，然后转换为数字
      字符串转数字: 只要出现一个非数字字符, 结果都是NaN
      true => 1 / false => 0
      null => 0
      undefined => NaN

*/

const a1 = {
  n: 0,
  toString: function() {
    return ++this.n
  }
}
console.log(a1 == 1 && a1 == 2 && a1 == 3)

const a2 = [1, 2, 3]
a2.toString = a2.shift
console.log(a2 == 1 && a2 == 2 && a2 == 3)

let n = 0
Object.defineProperty(global, 'a3', {
  get() {
    return ++n
  }
})
console.log(a3 == 1 && a3 == 2 && a3 == 3)
