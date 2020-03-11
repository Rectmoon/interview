import React from 'react'
import ReactDOM from 'react-dom'
const buildClass = name => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      console.log(name + ' constructor')
    }
    componentWillMount() {
      console.log(name + ' componentWillMount')
    }
    componentDidMount() {
      console.log(name + ' componentDidMount')
    }
    componentWillUnmount() {
      console.log(name + ' componentWillUnmount')
    }
    componentWillReceiveProps(nextProps) {
      console.log(name + ' componentWillReceiveProps(nextProps)')
    }
    shouldComponentUpdate(nextProps, nextState) {
      console.log(name + ' shouldComponentUpdate(nextProps, nextState)')
      return true
    }
    componentWillUpdate(nextProps, nextState) {
      console.log(name + ' componentWillUpdate(nextProps, nextState)')
    }
    componentDidUpdate(prevProps, prevState) {
      console.log(name + ' componetDidUpdate(prevProps, prevState)')
    }
  }
}
class Child extends buildClass('Child') {
  render() {
    console.log('Child render')
    return <div>child</div>
  }
}
class Parent extends buildClass('Parent') {
  render() {
    console.log('Parent render')
    return <Child />
  }
}
ReactDOM.render(<Parent />, document.getElementById('root'))

/* 

  Parent constructor
  Parent componentWillMount
  Parent render
  Child constructor
  Child componentWillMount
  Child render
  Child componentDidMount
  Parent componentDidMount

  当执行render子组件的时候，才会进入子组件的生命周期，子组件的周期结束后，再回到上级的周期。
*/

/* 

  更新组件的两种方式
  1.主动更新：组件通过setState修改自己的状态。
  修改子组件的代码：

  class Child extends buildClass('Child') {
    render() {
      console.log('Child render')
      return (
        <button
          onClick={() => {
            this.setState({ data: 123 })
          }}
        >
          child
        </button>
      )
    }
  }

  Child shouldComponentUpdate(nextProps, nextState)
  Child componentWillUpdate(nextProps, nextState)
  Child render
  Child componetDidUpdate(prevProps, prevState)

  2.被动更新：父组件通过props把自己的state传递给子组件，父组件执行setState更新状态
  还原子组件的代码，修改父组件代码如下：
  class Parent extends buildClass('Parent'){
    render(){
        console.log('Parent render')
        return (
            <div>
                <Child />
                <button onClick={()=>{this.setState({data:123})}}>Parent</button>
            </div>
        )
    }
 }

  Parent shouldComponentUpdate(nextProps, nextState)
  Parent componentWillUpdate(nextProps, nextState)
  Parent render
  Child componentWillReceiveProps(nextProps)
  Child shouldComponentUpdate(nextProps, nextState)
  Child componentWillUpdate(nextProps, nextState)
  Child render
  Child componetDidUpdate(prevProps, prevState)
  Parent componetDidUpdate(prevProps, prevState)
*/
