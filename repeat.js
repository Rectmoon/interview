function getTheMost(str) {
  const o = str.split('').reduce((res, next) => {
    if (!res[next]) res[next] = 1
    else res[next]++
    return res
  }, {})
  const keys = Object.keys(o)
  const values = Object.values(o)
  const maxIndex = values.indexOf(Math.max.apply(null, values))
  const theMost = keys[maxIndex]
  const firstIndex = str.indexOf(theMost)
  return { theMost, firstIndex }
}

const str = 'abcfaaafaf'

const ob = getTheMost(str)

console.log(ob)
