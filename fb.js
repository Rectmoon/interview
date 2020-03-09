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

/* 
在页面元素很多，且需要频繁刷新的场景下，React 15 会出现掉帧的现象
其根本原因，是大量的同步计算任务阻塞了浏览器的 UI 渲染。
默认情况下，JS 运算、页面布局和页面绘制都是运行在浏览器的主线程当中，他们之间是互斥的关系。如果 JS 运算持续占用主线程，页面就没法得到及时的更新。
当我们调用setState更新页面的时候，React 会遍历应用的所有节点，计算出差异，然后再更新 UI。整个过程是一气呵成，不能被打断的。
如果页面元素很多，整个过程占用的时机就可能超过 16 毫秒，就容易出现掉帧的现象。


解决主线程长时间被 JS 运算占用这一问题的基本思路，是将运算切割为多个步骤，分批完成。
也就是说在完成一部分任务之后，将控制权交回给浏览器，让浏览器有时间进行页面的渲染。等浏览器忙完之后，再继续之前未完成的任务。
旧版 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止。
而Fiber实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务。
实现方式是使用了浏览器的requestIdleCallback这一 API。
*/
