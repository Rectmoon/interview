function add1(a, b) {
  if (arguments.length == 1) return x => a + x
  return a + b
}

console.log(add1(2, 3))
console.log(add1(2)(3))

function add2(x) {
  var res = x
  var tmp = function(y) {
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

function add3() {
  var ap = Array.prototype
  var _args = ap.slice.call(arguments)
  var tmp = function() {
    var inner = function() {
      _args = _args.concat(ap.slice.call(arguments))
      return inner
    }
    inner.toString = function() {
      return _args.reduce((a, b) => a + b)
    }
    return inner
  }
  return tmp.apply(null, _args)
}

console.log(add3(1, 2, 3, 4, 5).toString())
console.log(add3(1, 2, 3, 4)(5).toString())
console.log(add3(1)(2)(3)(4)(5).toString())
