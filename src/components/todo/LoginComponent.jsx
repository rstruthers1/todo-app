import React, { Component } from "react";

import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    loginClicked(event) {
        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .then(
        //         response => {
        //             console.log(response.data)
        //             AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //             this.setState({ showSuccessMessage: true })
        //             this.setState({ hasLoginFailed: false })
        //             this.props.navigate(`/welcome/${this.state.username}`)
        //         }
        //     ).catch(
        //         response => {
        //             this.setState({ showSuccessMessage: false })
        //             this.setState({ hasLoginFailed: true })
        //         }
        //     )

        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
            .then(
                response => {
                    console.log("response.data: " + response.data)
                    AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token);
                    this.props.navigate(`/welcome/${this.state.username}`)
                   
                    
                }
            ).catch(
                response => {
                    this.setState({ showSuccessMessage: false })
                    this.setState({ hasLoginFailed: true })
                }
            )
    }

    render() {
        return (
            <div className="parent container d-flex justify-content-center align-items-center h-100">
                <div className="child container w-50">
                    <h1 className="text-center">Login</h1>
                    <div className="container">

                        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                        {this.state.showSuccessMessage && <div>Login Successful</div>}
                        <div className="form-group">
                            <label htmlFor="username">User Name:</label>
                            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Password:</label>
                            <input type="password" name="password" autoComplete="off" value={this.state.password}
                                onChange={this.handleChange} className="form-control" />
                        </div>
                        <button className="btn btn-success" onClick={this.loginClicked}>Login</button>

                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent