import axios from 'axios'

import { API_URL} from '../../Constants'


const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
const TOKEN_SESSION_ATTRIBUTE_NAME = 'token'

class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    registerSuccessfulLoginForJwt(username,token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, token)
    }

    getJwtToken(token) {
        return  sessionStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME)
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) {
            return false
        }
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }
}

export default new AuthenticationService()