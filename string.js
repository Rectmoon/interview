// 无重复字符的最长子串

function lengthOfLongestSubstring(str) {
  let result = 0,
    s = '',
    len = str.length

  for (let i = 0; i < len; i++) {
    const char = str.charAt(i)
    const index = s.indexOf(char)
    if (index === -1) {
      s += char
      result = result < s.length ? s.length : result
    } else {
      s = s.substr(index + 1) + char
    }
  }
  return result
}

console.log('result=', lengthOfLongestSubstring('abccdefd'))

// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效
/* 
  1.左括号全部入栈
  2.判断是否有左括号，没有直接返回false
  3.遇到左括号进行全部压栈
  4.如果遇到右括号则出栈，然后进行判断，不符合则返回
*/

function isValid(str) {
  const bracketMap = {
    '}': '{',
    ']': '[',
    ')': '('
  }
  const keys = Object.keys(bracketMap)
  const values = Object.values(bracketMap)
  const stack = []

  for (let i = 0, len = str.length; i < len; i++) {
    const char = str.charAt(i)
    if (values.includes(char)) {
      stack.push(char)
    } else if (keys.includes(char) && stack.pop() !== bracketMap[char]) {
      return false
    }
  }

  return stack.length === 0
}

console.log(isValid(`{1}`))
console.log(isValid(`}{1}`))

console.log(isValid(`{1}22{ [} ]`))
console.log(isValid(`{1}22{}[]`))
