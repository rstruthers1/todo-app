import React, { Component } from 'react';
import CounterButton from './CounterButton'
 
class Counter extends Component {

    constructor() {
        super()
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this)
    }

    increment(by) { // Update state
        this.setState(
            (prevState) => {
            return {counter: prevState.counter + by}
        })
    }

  render() {
    return (
      <div className="App">
       <CounterButton incrementMethod={this.increment}/>
       <CounterButton by={5} incrementMethod={this.increment}/>
       <CounterButton by={10} incrementMethod={this.increment}/>
       <span>{this.state.counter}</span>
      </div>
    );
  }
}

export default Counter