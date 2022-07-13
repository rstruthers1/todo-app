import axios from 'axios'

import { API_URL} from '../../Constants'


class AuthenticationService {

    // executeBasicAuthenticationService(username, password) {
    //     return axios.get('http://localhost:9090/basicauth', 
    //         {headers: {authorization: this.createBasicAuthToken(username,password)}})
    // }

    executeJwtAuthenticationService(username, password) {
        return axios.post('http://localhost:9090/authenticate', {
            username,
            password
        })
    }

    // createBasicAuthToken(username,password) {
    //     return 'Basic ' +  window.btoa(username + ":" + password)
    // }

    registerSuccessfulLogin(username,password){
        //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
        //console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username)
        //this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
    }

    registerSuccessfulLoginForJwt(username,token) {
        sessionStorage.setItem('authenticatedUser', username)
        sessionStorage.setItem("token", token)
    }

    getJwtToken(token) {
        return  sessionStorage.getItem("token")
    }


    logout() {
        sessionStorage.removeItem('authenticatedUser');
        sessionStorage.removeItem('token');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) {
            return false
        }
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return ''
        return user
    }
}

export default new AuthenticationService()