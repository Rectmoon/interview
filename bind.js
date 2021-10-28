Function.prototype._bind = function (obj) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    )
  }

  var args = Array.prototype.slice.call(arguments, 1)
  var fn = this

  var Noop = function () {}

  var bound = function () {
    var params = Array.prototype.slice.call(arguments)
    fn.apply(this.constructor === fn ? this : obj, args.concat(params))
  }

  Noop.prototype = fn.prototype
  bound.prototype = new Noop()

  return bound
}

//====================================================
// TEST
//====================================================

var z = 0
var obj = {
  z: 1
}

function fn (x, y) {
  this.name = 'Rectmoon'
  console.log(this.z)
  console.log(x)
  console.log(y)
}

fn.prototype.age = 26

var bound = fn._bind(obj, 2)
var person = new bound(3) // undefined 2 3

bound(9)
console.log(person.age)

fn.prototype.age = 16
var person1 = new bound(4) // undefined 2 4
console.log(person1.age)
