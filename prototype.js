function Person(name) {
  this.name = name
}

Person.prototype.say = function() {
  console.log(this.name)
}

function _new(F, ...args) {
  // const o = Object.create(F.prototype)
  const o = {}
  o.__proto__ = F.prototype
  F.call(o, ...args)
  return o
}

const p1 = new Person('老王')
const p2 = _new(Person, '老李')
console.log(p1)
console.log(p2)
p2.say()
