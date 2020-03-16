class Pubsub {
  constructor () {
    this.handlers = {}
    this.topId = -1
  }

  subscribe (topic, callback) {
    const handlers = this.handlers[topic] || []
    const token = (++this.topId).toString()
    handlers.push({ token, callback })
    this.handlers[topic] = handlers
    return token
  }

  unsubscribe (token) {
    for (const topic in this.handlers) {
      if (this.handlers[topic]) {
        for (let i = 0; i < this.handlers[topic].length; i++) {
          if (this.handlers[topic][i].token === token) {
            this.handlers[topic].splice(i, 1)
            return token
          }
        }
      }
    }
    return false
  }

  publish (topic, ...args) {
    const handlers = this.handlers[topic] || []
    handlers.forEach(handler => {
      handler.callback(topic, ...args)
    })
  }
}

const ps = new Pubsub()

const token = ps.subscribe('lzx', function (topic, data) {
  console.log(topic + ':' + data)
})

ps.publish('lzx', 'hello world')

console.log(token)

console.log(ps.unsubscribe(token))

ps.publish('lzx', 'hello world1')
