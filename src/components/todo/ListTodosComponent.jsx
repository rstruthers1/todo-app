import React, { Component } from 'react'
import { DateTime } from "luxon";
import ToDoDataService from '../../api/todo/ToDoDataService'
import AuthenticationService from './AuthenticationService'
import { Checkbox } from 'react-input-checkbox';


let todoDateFormat = { ...DateTime.DATE_SHORT, weekday: 'long' };

class ListTodosComponent extends Component {


    constructor(props) {
        console.log('constructor')
        super(props)

        this.state = {
            todos:
                [
                ],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName();
        ToDoDataService.retrieveAllTodos(username)
            .then(response => {
                this.setState({
                    todos: response.data.map(todo => {
                        let targetDate = todo.targetDate != null ? DateTime.fromISO(todo.targetDate) : null;
                        let formattedTargetDate = targetDate != null ? targetDate.toLocaleString(todoDateFormat) : '';
                        return {
                            ...todo,
                            done: todo.done == null ? '' : todo.done.toString(),
                            targetDate: formattedTargetDate,
                        };
                    })
                });
            });
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        ToDoDataService.deleteTodo(username, id).then(
            response => {
                {
                    this.setState({
                        message: `Delete of todo ${id} successful`
                    })
                    this.refreshTodos()
                  
                }
            }
        )
    }

    updateTodoClicked(id) {
        console.log("Update clicked, id is: " + id)   
        this.props.navigate(`/todos/${id}`)
    }

    addTodoClicked() {
        console.log("Add clicked")   
        this.props.navigate(`/todos/-1`)
    }

    render() {
        console.log('render')
        return (
            <div>
                <h1 className="text-center">List Todos</h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{todo.targetDate}</td>
                                            <td>{todo.done === 'true' ? "Yes" : "No"}</td>
                                            <td><button className='btn btn-success' onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className='btn btn-warning' onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className='row'>
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
              
            </div>
        )
    }
}

export default ListTodosComponent