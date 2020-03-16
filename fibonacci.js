function fibonacci (n) {
  if (n <= 1) return n

  let i = 1,
    pre = 0,
    current = 1,
    result = 0

  while (i++ < n) {
    result = pre + current
    pre = current
    current = result
  }

  return result
}

console.log(fibonacci(2))
console.log(fibonacci(3))
console.log(fibonacci(4))
console.log(fibonacci(5))
console.log(fibonacci(6))
