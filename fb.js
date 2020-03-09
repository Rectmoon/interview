const root = { name: 'root', render: () => [a, b, c] }

const a = { name: 'a', render: () => [a1] }
const a1 = { name: 'a1', render: () => [a2] }
const a2 = { name: 'a2', render: () => [a3] }
const a3 = { name: 'a3', render: () => [] }

const b = { name: 'b', render: () => [b1] }
const b1 = { name: 'b1', render: () => [] }

const c = { name: 'c', render: () => [] }

walk(root)

function walk(instance) {
  if (!instance) return
  console.log(instance.name)
  instance.render().map(walk)
}

// =============================================================================
// Fiber
// =============================================================================
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

class FiberNode {
  constructor(instance) {
    this.instance = instance
    this.parent = null
    this.sibling = null
    this.firstChild = null
  }
}

function connect(parent, children) {
  parent.firstChild = children.reduceRight((prev, current) => {
    const filberNode = new FiberNode(current)
    filberNode.parent = parent
    filberNode.sibling = prev
    return filberNode
  }, null)
  return parent.firstChild
}

function work(node) {
  console.log(node.instance.name)
  const childLists = node.instance.render()
  let child = null
  if (childLists.length > 0) {
    child = connect(node, childLists)
  }
  return child
}

function run(root) {
  let currentNode = root

  while (true) {
    const child = work(currentNode)
    // 如果有子节点
    if (child) {
      currentNode = child
      continue
    }

    // 如果没有相邻节点, 则返回到父节点
    while (!currentNode.sibling) {
      currentNode = currentNode.parent
      if (currentNode === root) {
        return
      }
    }

    // 相邻节点
    currentNode = currentNode.sibling
  }
}

run(new FiberNode(root))
