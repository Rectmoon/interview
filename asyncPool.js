/**
 * @param {number} poolLimit 
 * @param {unknown[]} array 
 * @param {Function} iteratorFn
 * @returns {Promise}
 * @description Promise.all并发限制
 */
function asyncPool(poolLimit, array, iteratorFn) {
  const promises = []
  const executing = []
  let i = 0

  function next() {
    // 边界处理，array为空数组
    if (i === array.length) return Promise.resolve()

    // 每调一次enqueue，初始化一个promise
    const current = array[i]
    const p = Promise.resolve().then(() => iteratorFn(current, i, array))
    // promise执行完毕，从executing数组中删除
    const e = p.then(() => executing.splice(executing.indexOf(e), 1))
    i++

    // 放入promises数组
    promises.push(p)
    // 放入executing数组，表示正在执行的promise
    executing.push(e)

    // 使用Promise.rece，每当executing数组中promise数量低于poolLimit，就实例化新的promise并执行
    let r = Promise.resolve()
    if (executing.length >= poolLimit) {
      r = Promise.race(executing)
    }

    // 递归，直到遍历完array
    return r.then(() => next())
  }

  return next().then(() => Promise.all(promises))
}

// 从array第1个元素开始，初始化promise对象，同时用一个executing数组保存正在执行的promise
// 不断初始化promise，直到达到poolLimt
// 使用Promise.race，获得executing中promise的执行情况，当有一个promise执行完毕，继续初始化promise并放入executing中
// 所有promise都执行完了，调用Promise.all返回
const sleep = i => new Promise(resolve => setTimeout(() => {
  console.log(i)
  resolve(i)
}, i));

asyncPool(5, [1000, 5000, 3000, 2000, 1000], sleep).then(results => {
  console.log({ results })
});