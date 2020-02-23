// 扁平数组转树形结构

const input = [
  { id: 1, name: '超级管理', parentId: 0 },
  { id: 2, name: '用户管理', parentId: 1 },
  { id: 3, name: '部门管理', parentId: 1 },
  { id: 4, name: '日志管理', parentId: 1 },
  { id: 5, name: '操作用户', parentId: 2 },
  { id: 6, name: '查看用户', parentId: 2 },
  { id: 7, name: '操控部门', parentId: 3 },
  { id: 8, name: '查看部门', parentId: 3 }
]

function main(list) {
  const treeMap = list.reduce((res, next) => {
    res[next.id] = next
    return res
  }, {})
  return list.reduce(function(res, next) {
    const parent = treeMap[next.parentId]
    if (!parent) {
      res.push(next)
    } else {
      parent.children ? parent.children.push(next) : (parent.children = [next])
    }
    return res
  }, [])
}
