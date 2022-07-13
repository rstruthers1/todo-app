import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Counter.css'

// Class Component
class CounterButton extends Component {
    // Define the initial state in a constructor
    // state => 0

    constructor() {
        super()
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this)
    }

    render() {
        return (
            <div className="counter">
                <button onClick={this.increment}>+{this.props.by}</button>
                <span className="count">{this.state.counter}</span>
            </div>
        );
    }

    increment() { // Update state
        this.setState({
            counter: this.state.counter + this.props.by
        })
        this.props.incrementMethod(this.props.by);
    }
}

CounterButton.defaultProps = {
    by: 1
}

CounterButton.propTypes = {
    by: PropTypes.number
}

export default CounterButton