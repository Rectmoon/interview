const URL_REGEXP = /^(?:(https?|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)(?:\/[^/?#]+)?(\?[^#]+)?(#.+)?$/i

const u1 = 'https://www.baidu.com'
const u2 = 'https://www.baidu.com/index.html'
const u3 = 'https://www.baidu.com/index.html?a=1&b=2'
const u4 = 'http://localhost.com.cn/index.html?a=1&b=2'

console.log(URL_REGEXP.exec(u4))

// 六位正则, 同时包含数字、大小写字母
const regexp = /(?![0-9]+$)(?!^[a-z0-9]+$)(?!^[A-Z0-9]+$)(?!^[a-zA-Z]+$)^[a-zA-Z0-9]{6,16}$/
console.log(regexp.test('11111222'))
console.log(regexp.test('aaaaaaa'))
console.log(regexp.test('aaaaaaA'))
console.log(regexp.test('aaaaaaA123'))

// 1 ~ 10位数字、字母、下划线, 必须包含下划线
console.log('===============')
const regexp2 = /(?!^[a-zA-Z0-9]+$)^\w{1,10}$/
console.log(regexp2.test(00000))
console.log(regexp2.test('abcde'))
console.log(regexp2.test('aAZ056_'))

// 数字、字母、下划线，必须包含_
console.log('===============')
const regexp3 = /(?=_)\w+/
console.log(regexp3.test(00000))
console.log(regexp3.test('666655sss'))
console.log(regexp3.test('aaa__'))
