import React from 'react'

export default class State extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    this.setState({ count: this.state.count + 1 })
    console.log(this.state.count) // 第 1 次 log

    this.setState({ count: this.state.count + 1 })
    console.log(this.state.count) // 第 2 次 log

    setTimeout(() => {
      this.setState({ count: this.state.count + 1 })
      console.log(this.state.count) // 第 3 次 log

      this.setState({ count: this.state.count + 1 })
      console.log(this.state.count) // 第 4 次 log
    }, 100)

    document.getElementById('div2').addEventListener('click', this.increment2)
  }

  increment1 = () => {
    // 合成事件中调用
    this.setState({ count: this.state.count + 1 })
    console.log('react event: ' + this.state.count)
    this.setState({ count: this.state.count + 1 })
    console.log('react event: ' + this.state.count)
    this.setState({ count: this.state.count + 1 })
    console.log('react event: ' + this.state.count)
  }

  increment2 = () => {
    // 原生事件中调用
    this.setState({ count: this.state.count + 1 })
    console.log('dom event: ' + this.state.count)
    this.setState({ count: this.state.count + 1 })
    console.log('dom event: ' + this.state.count)
    this.setState({ count: this.state.count + 1 })
    console.log('dom event: ' + this.state.count)
  }

  increment3 = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
    console.log('react event: ' + this.state.count)
    this.setState(prevState => ({ count: prevState.count + 1 }))
    console.log('react event: ' + this.state.count)
    this.setState(prevState => ({ count: prevState.count + 1 }))
    console.log('react event: ' + this.state.count)
  }

  render() {
    return (
      <div className="Example">
        <h2>couont: {this.state.count}</h2>
        <div id="div1" onClick={this.increment1} style={{ background: 'red' }}>
          合成事件1
        </div>
        <div id="div2" style={{ background: 'orange' }}>
          DOM事件
        </div>
        <div id="div3" onClick={this.increment3} style={{ background: 'blue' }}>
          合成事件2
        </div>
      </div>
    )
  }
}

/* 

  react为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，
  像在jsx中常见的onClick、onChange这些都是合成事件。


  setTimeout中调用以及原生事件中调用的话，是可以立马获取到最新的state的。
  根本原因在于，setState并不是真正意义上的异步操作，它只是模拟了异步的行为。
  React中会去维护一个标识（isBatchingUpdates），判断是直接更新还是先暂存state进队列。
  setTimeout以及原生事件都会直接去更新state，因此可以立即得到最新state。
  而合成事件和React生命周期函数中，是受React控制的，其会将isBatchingUpdates设置为 true，从而走的是类似异步的那一套。

  setState 只在合成事件和钩子函数中是"异步"的，在原生事件和 setTimeout 中都是同步的。
  setState的"异步"并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，
    只是合成事件和钩子函数的调用顺序在更新之前，
    导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的"异步"，
    当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
  setState 的批量更新优化也是建立在"异步"（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，
    在"异步"中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，
    如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

*/
