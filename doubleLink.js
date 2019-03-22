class Node {
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}

class DoubleLink {
  constructor() {
    this.size = 0
    this.head = null
  }

  getHead() {
    return this.head
  }

  insertHead(el) {
    let node = new Node(el)
    this.size++
    if (this.head == null) {
      node.prev = node
      node.next = node
      this.head = node
    } else {
      let h = this.head
      node.next = h
      h.prev = node
      node.prev = h.next
      h.next = node
    }
  }
}

var link = new DoubleLink() //实例化一个对象

link.insertHead('d')
link.insertHead('e')
link.insertHead('f')

console.log(link.getHead())
