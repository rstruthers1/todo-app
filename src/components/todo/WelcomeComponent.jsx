import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage: '',
            returnedError: false,
            errorMessage: ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
            <div className="container, text-center">
                <h1 className="text-center">Welcome!</h1>
                <div className="container" >
                {this.state.returnedError && <div className="alert alert-warning">{this.state.errorMessage}</div>}
                    Welcome {this.props.params.name}.
                    You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div className="container" >
                    <div>Click here to get a customized welcome message.</div>
                    <button onClick={this.retrieveWelcomeMessage}
                        className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>

            </div>
        )
    }

    retrieveWelcomeMessage() {
        console.log("name:")
        console.log(this.props.params.name)
        HelloWorldService.executeHelloWorldPathVariableService(this.props.params.name)
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({
            welcomeMessage: response.data.message,
            returnedError: false,
            errorMessage: ''
        })
    }

    handleError(error) {

        console.log(error.response)

        let errorMessage = '';

        if (error.message)
            errorMessage += error.message

        if (error.response && error.response.data) {
            errorMessage += ' ' + error.response.data.message
        }

        this.setState({
            welcomeMessage: '',
            returnedError: true,
            errorMessage: errorMessage
        })
    }

}


export default WelcomeComponent