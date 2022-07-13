import axios from 'axios'
import { API_URL} from '../../Constants'


class HelloWorldService {


    executeHelloWorldService() {
        let token = sessionStorage.getItem("token")
        return axios.get(`${API_URL}/hello-world`);
    }

    executeHelloWorldBeanService() {
        let token = sessionStorage.getItem("token")
        return axios.get(`${API_URL}/hello-world-bean`);
    }

    executeHelloWorldPathVariableService(name) {
        let token = sessionStorage.getItem("token")
        let config = {
            headers: {
               Authorization: "Bearer " + token
            }
         }
        return axios.get(`${API_URL}/hello-world/${name}`);
    }

    

}

export default new HelloWorldService()