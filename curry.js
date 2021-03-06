function add1 (a, b) {
  if (arguments.length == 1) return x => a + x
  return a + b
}

console.log(add1(2, 3))
console.log(add1(2)(3))

function add2 (x) {
  var res = x
  var tmp = function (y) {
    res += y
    return tmp
  }
  tmp.toString = () => res

  return tmp
}

console.log(add2(1)(2)(3).toString())
console.log(add2(1)(2)(3)(4).toString())

console.log(add2(1, 2, 3, 4, 5).toString())
console.log(add2(1, 2, 3, 4)(5).toString())

function add3 () {
  var ap = Array.prototype
  var _args = ap.slice.call(arguments)
  var tmp = function () {
    var inner = function () {
      _args = _args.concat(ap.slice.call(arguments))
      return inner
    }
    inner.toString = function () {
      return _args.reduce((a, b) => a + b)
    }
    return inner
  }
  return tmp.apply(null, _args)
}

console.log(add3(1, 2, 3, 4, 5).toString())
console.log(add3(1, 2, 3, 4)(5).toString())
console.log(add3(1)(2)(3)(4)(5).toString())

function sum (a, b, c) {
  return a + b + c
}

function curry (fn) {
  const argsList = [...arguments].splice(1)

  return function () {
    const newArgsList = argsList.concat([...arguments])
    if (newArgsList.length < fn.length) {
      // 如果接收的参数还没有到达函数参数的个数继续收集参数
      return curry.apply(this, [fn, ...newArgsList])
    } else {
      return fn.apply(this, newArgsList)
    }
  }
}
const sumAll = curry(sum)

console.log(sum.length)
console.log(sumAll(1)(2)(3)) // 6
console.log(sumAll(1)(2, 3)) // 6
