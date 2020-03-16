const arr = [1, 2, [3, 4, [5, 6]]]

const res1 = arr.flat(Infinity)

const res2 = arr
  .toString()
  .split(',')
  .map(n => ~~n)

const res3 = JSON.stringify(arr)
  .replace(/(\[|\])/g, '')
  .split(',')
  .map(n => ~~n)

const reduceFlat = arr =>
  arr.reduce(
    (res, next) => res.concat(Array.isArray(next) ? reduceFlat(next) : next),
    []
  )
const res4 = reduceFlat(arr)

console.log(res1)
console.log(res2)
console.log(res3)
console.log(res4)

const A = [
  'D1',
  'D2',
  'D3',
  'A1',
  'A2',
  'A3',
  'C1',
  'C2',
  'C3',
  'B1',
  'B2',
  'B3'
]
const B = ['B', 'C', 'D', 'A']

let n = 0
for (let i = 0, len = B.length; i < len; i++) {
  let vb = B[i]
  for (let j = 0, len = A.length; j < len; j++) {
    let va = A[j]
    va.includes(vb) && (n = j)
  }
  A.splice(n + 1, 0, vb)
}
console.log(A)

!(function () {
  const result = {
    1: 100,
    3: 300,
    6: 600
  }

  const res = new Array(12).fill(null).map((v, i) => result[i + 1] || v)
  console.log(res)
})()

!(function () {
  Array.prototype.rotate = function (k) {
    if (k < 0 || k === 0 || k === this.length) return this
    if (k > this.length) k = k % this.length
    let i = 0
    while (i++ < k) {
      this.unshift(this.pop())
    }
    return this
    // return this.slice(-k).concat(this.slice(0, this.length - k))
    // return [...this.splice(this.length - k), ...this]
  }

  const arr = [1, 2, 3, 4, 5, 6, 7]
  console.log(arr.rotate(2))
})()

!(function () {
  // 滑动窗口最大值
  function maxInWindows (a, size) {
    const arr = []
    if (a.length == 0 || size <= 0) return arr
    if (size === 1) return a

    const len = a.length - size + 1
    let max
    for (let i = 0; i < len; i++) {
      max = Math.max.apply(null, a.slice(i, i + size))
      arr[i] = max
    }
    return arr
  }

  const a = [2, 3, 4, 2, 6, 2, 5, 1]
  console.log(maxInWindows(a, 3))

  function swap (arr, i, j) {
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  // 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分
  function reOrderArray (arr) {
    if (Array.isArray(arr)) {
      let start = 0
      let end = arr.length - 1
      while (start < end) {
        while (arr[start] % 2 === 1) {
          start++
        }
        while (arr[end] % 2 === 0) {
          end--
        }
        if (start < end) {
          swap(arr, start, end)
        }
      }
    }
    return arr
  }

  console.log(reOrderArray(a))

  const a1 = [2, 3, 4, 2, 6, 2, 5, 1]

  // 偶数和偶数之间的相对位置不变
  function reOrderArray1 (arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (arr[j] % 2 == 0 && arr[j + 1] % 2 != 0) {
          swap(arr, j, j + 1)
        }
      }
    }
    return arr
  }

  console.log(reOrderArray1(a1))

  const a2 = [2, 3, 4, 2, 6, 2, 5, 1]

  function reOrderArray2 (arr) {
    const result = [],
      len = arr.length
    let j = 0
    for (let i = 0; i < len; i++) {
      if (arr[i] % 2 !== 0) {
        result[j] = arr[i]
        j++
      }
    }

    for (let i = 0; i < len; i++) {
      if (arr[i] % 2 === 0) {
        result[j] = arr[i]
        j++
      }
    }
    return result
  }

  console.log(reOrderArray2(a2))
})()

!(function () {
  function maximumProduct (arr) {
    const len = arr.length
    if (len < 3) return false
    arr.sort((a, b) => a - b)
    return Math.max(
      arr[len - 1] * arr[len - 2] * arr[len - 3],
      arr[len - 1] * arr[0] * arr[1]
    )
  }

  const a1 = [1, 5, 2, 3]
  const a2 = [1, 5, 2, 3, -10, -20]

  console.log(maximumProduct(a1))
  console.log(maximumProduct(a2))
})()
