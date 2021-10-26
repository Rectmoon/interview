Function.prototype._call = function (obj) {
  obj = obj ? Object(obj) : window

  var args = []

  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']')
  }

  obj.fn = this
  var result = eval('obj.fn(' + args + ')')
  delete obj.fn
  return result
}

Function.prototype._apply = function (obj, arr) {
  obj = obj ? Object(obj) : window

  obj.fn = this
  var result

  if (!arr) {
    result = obj.fn()
  } else {
    var args = []

    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']')
    }

    result = eval('obj.fn(' + args + ')')
  }

  delete obj.fn
  return result
}

//====================================================
// ES6
//====================================================

// ES6 call
Function.prototype.call_ = function (obj) {
  obj = obj ? Object(obj) : window
  obj.fn = this
  // 利用拓展运算符直接将arguments转为数组
  let args = [...arguments].slice(1)
  let result = obj.fn(...args)

  delete obj.fn
  return result
}

// ES6 apply
Function.prototype.apply_ = function (obj, arr) {
  obj = obj ? Object(obj) : window
  obj.fn = this
  let result
  if (!arr) {
    result = obj.fn()
  } else {
    result = obj.fn(...arr)
  }

  delete obj.fn
  return result
}

//====================================================
// TEST
//====================================================

var name = '时间跳跃'
var obj = {
  name: 'Rectmoon'
}

function fn (a, b, c) {
  console.log(a + b + c + this.name)
}

fn._call(obj, 'a', 2, 3)
fn.call_(obj, '666', '777', '888')
fn._apply(obj, ['我的', '名字', '是'])
fn.apply_(obj, ['111', '222', '333'])
