var foo = { n: 1, x: 1 }
var bar = foo
foo.x = foo = { n: 2 }

console.log(foo.x)
console.log(bar)

/* 
  foo = {n:1, x: 1};
  bar = foo; //bar = {n:1, x: 1}
  foo.x = 1; 
  foo.x = (foo = {n:2});

1. 先为foo添加x属性,这里的foo还是{n:1, x: 1}
2. 遇到第一个'=',准备为x赋值
3. '='优先级最低,先计算右边表达式的值
4. 执行foo = {n:1},并将结果赋值给x
最终foo的引用指向了{n:2}
而bar的引用没变，始终指向原来的{n:1, x: 1}, 最终变为{ n: 1, x: { n: 2 } }, 这就是最后bar引用的值
*/

function a() {
  var o1 = (o2 = 5)
}
a()
// console.log(o1) // not defined
console.log(o2) // 5
