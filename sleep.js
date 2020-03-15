class AsyncCotroller {
  constructor(name) {
    this.tasks = []
    const fn = () => {
      console.log(name)
      this.next()
    }
    this.tasks.push(fn)
    setTimeout(this.next.bind(this), 0)
  }

  sleepFirst(t) {
    console.time('sleepFirst')
    const fn = () => {
      setTimeout(() => {
        console.timeEnd('sleepFirst')
        this.next()
      }, t * 1000)
    }
    this.tasks.unshift(fn)
    return this
  }

  sleep(t) {
    console.time('sleep')
    const fn = () => {
      setTimeout(() => {
        console.timeEnd('sleep')
        this.next()
      }, t * 1000)
    }
    this.tasks.push(fn)
    return this
  }

  eat(dinner) {
    const fn = () => {
      console.log(dinner)
      this.next()
    }
    this.tasks.push(fn)
    return this
  }

  next() {
    const fn = this.tasks.shift()
    fn && fn()
  }
}

const a = new AsyncCotroller('jack')

a.sleep(2)
  .sleepFirst(3)
  .eat('lunch')
