function myInstanceOf(o, consturct) {
  let proto = consturct.prototype,
    currentProto = o.__proto__
  while (true) {
    if (currentProto === null) return false
    if (currentProto === proto) return true
    currentProto = currentProto.__proto__
  }
}

console.log(myInstanceOf([], String))
