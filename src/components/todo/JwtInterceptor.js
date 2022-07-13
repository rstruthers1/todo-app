import axios from 'axios';

import AuthenticationService from './AuthenticationService'

export function jwtInterceptor() {
    axios.interceptors.request.use(request => {
        const isLoggedIn = AuthenticationService.isUserLoggedIn()
        const token = AuthenticationService.getJwtToken()
        if (isLoggedIn) {
            request.headers.common.Authorization = `Bearer ${token}`;
        }

        return request;
    });
}