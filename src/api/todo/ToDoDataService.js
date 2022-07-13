import axios from 'axios'
import { API_URL} from '../../Constants'




class ToDoDataService {
  
    retrieveAllTodos(name) {
        //console.log('executed service')
  
        return axios.get(`${API_URL}/users/${name}/todos`)
    }

    retrieveTodo(name, id) {
        //console.log('executed service')
      
        return axios.get(`${API_URL}/users/${name}/todos/${id}`);
    }

    deleteTodo(name,id) {
        //console.log('executed service')
     
        return axios.delete(`${API_URL}/users/${name}/todos/${id}`);
    }

    updateTodo(name, id, todo) {
        //console.log('executed service')
        console.log("updateTodo: " + JSON.stringify(todo))
        return axios.put(`${API_URL}/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo) {
        let url = `${API_URL}/users/${name}/todos`
        console.log("***** url: " +url)
        return axios.post(`${API_URL}/users/${name}/todos`, todo);
    }

    
}

export default new ToDoDataService()