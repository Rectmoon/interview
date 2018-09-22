class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(event, cb) {
    let cbs = this.events[event] || []
    cbs.push(cb)
    this.events[event] = cbs
    return this
  }

  off(event, cb) {
    let cbs = this.events[event]
    this.events[event] = cbs && cbs.filter(fn => fn !== cb)
    return this
  }

  once(event, cb) {
    let f = (...args) => {
      cb.apply(this, args)
      this.off(event, f)
    }
    this.on(event, f)
    return this
  }

  emit(...args) {
    const event = args[0],
      params = [].slice.call(args, 1),
      cbs = this.events[event]
    cbs.forEach(cb => cb.apply(this, params))
    return this
  }
}

let e = new EventEmitter()
function a() {
  console.log('a')
}
function b() {
  console.log('b')
}
function c() {
  console.log('c')
}
function d(...a) {
  console.log('d', ...a)
}

e.on('test', a)
e.once('test1', b)
e.emit('test')
e.emit('test')
e.emit('test1')
e.emit('test1')

console.log(e)
