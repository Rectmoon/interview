function observe(obj) {
  if (!obj || typeof obj !== 'object') return
  new Observer(obj)
}

class Watcher {
  constructor(data, event, cb) {
    this.data = data
    this.event = event
    this.cb = cb
    this.value = this.init()
  }

  init() {
    Dep.target = this
    let value = this.data[this.event]
    Dep.target = null
    return value
  }

  update() {
    let value = this.data[this.event],
      oldValue = this.value
    if (value !== oldValue) {
      this.value = value
      this.cb.call(this.data, value, oldValue)
    }
  }
}

class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach(function(sub) {
      sub.update()
    })
  }
}

class Observer {
  constructor(data) {
    this.data = data
    Object.keys(this.data).forEach(k => {
      this.defineReactive(this.data, k, this.data[k])
      this.proxyKeys(k)
    })
  }

  defineReactive(data, key, value) {
    const dep = new Dep()
    observe(value)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        if (Dep.target) dep.addSub(Dep.target)
        return value
      },
      set: function(newValue) {
        if (newValue === value) return
        value = newValue
        console.log('属性' + key + '已经被监听了，现在值为：“' + newValue.toString() + '”')
        dep.notify()
      }
    })
  }

  proxyKeys(k) {
    Object.defineProperty(this, k, {
      enumberable: false,
      configurable: true,
      get: () => {
        return this.data[k]
      },
      set: function(newValue) {
        this.data[k] = newValue
      }
    })
  }

  on(event, cb) {
    new Watcher(this.data, event, cb)
  }
}

class Watcher {
  constructor(data, event, cb) {
    this.data = data
    this.event = event
    this.cb = cb
    this.value = this.init()
  }

  init() {
    Dep.target = this
    let value = this.data[this.event]
    Dep.target = null
    return value
  }

  update() {
    let value = this.data[this.event],
      oldValue = this.value
    if (value !== oldValue) {
      this.value = value
      this.cb.call(this.data, value, oldValue)
    }
  }
}

const o = new Observer({
  a: 1,
  b: 'b'
})

o.on('a', (newVal, oldVal) => {
  console.log(newVal, oldVal)
})

o.on('a', (newVal, oldVal) => {
  console.log('hello', newVal)
})

o.on('b', (newVal, oldVal) => {
  console.log(newVal, oldVal)
})

o.a = 22
o.a = 999
o.b = 'bbbb'
