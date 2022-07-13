import React, { Component } from 'react'
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik';

import ToDoDataService from '../../api/todo/ToDoDataService'
import AuthenticationService from './AuthenticationService'

class TodoComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: props.params.id,
      description: "",
      targetDate: moment(new Date()).format('YYYY-MM-DD'),
      done: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    console.log("componentDidMount: state id: " + this.state.id)
    if (this.state.id == -1) {
      this.setState({
        done: false
      })
      console.log("returning")
      return
    }
    let username = AuthenticationService.getLoggedInUserName();
    ToDoDataService.retrieveTodo(username, this.state.id).then(
      response => {
        console.log(response.data)
        this.setState({
          description: response.data.description,
          targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
          done: response.data.done
        })
      }
    )
  }

  onSubmit(values) {
    console.log(values)
    let username = AuthenticationService.getLoggedInUserName();
    console.log("state id: " + this.state.id)
    if (this.state.id == -1) {
      ToDoDataService.createTodo(username, {
        id: this.state.id,
        description: values.description,
        targetDate: values.targetDate,
        done: values.done
      }).then(
        response => {
          console.log(response.data)
          this.props.navigate(`/todos`)
        }
      )
    } else {
      ToDoDataService.updateTodo(username, this.state.id, {
        id: this.state.id,
        description: values.description,
        targetDate: values.targetDate,
        done: values.done
      }).then(
        response => {
          console.log(response.data)
          this.props.navigate(`/todos`)
        }
      )
    }
  }

  validate(values) {
    let errors = {}
    if (!values.description) {
      errors.description = "Description is required"
    }
    else if (values.description.length < 5) {
      errors.description = "Description must have at least 5 characters"
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Target Date is invalid"
    }

    console.log("values.done: " + values.done)

    return errors
  }

  render() {
    let { description, targetDate, done } = this.state
    return (
      <div className="parent container d-flex justify-content-center align-items-center h-100">

        <div className="child container w-50">
          <h1 className="text-center">To Do</h1>

          <Formik
            initialValues={{ description, targetDate, done }}
            onSubmit={this.onSubmit}
            validate={this.validate}
            // validateOnChange={false}
            // validateOnBlur={false}
            enableReinitialize={true}

          >
            {
              (props) => (
                <Form>
                  <div className="form-group">
                    <ErrorMessage name="description" component="div" className='alert alert-danger' />
                    <fieldset className="form-group">
                      <label htmlFor="description">Description</label>
                      <Field className="form-control" type="text" name="description" />
                    </fieldset>
                  </div>
                  <div className="form-group">
                    <ErrorMessage name="targetDate" component="div"
                      className='alert alert-danger' />
                    <fieldset className="form-group">
                      <label htmlFor="targetDate">Target Date</label>
                      <Field className="form-control" type="date" name="targetDate" />
                    </fieldset>
                  </div>
                  <div class="form-check">
                    <Field type="checkbox" class="form-check-input" name="done" />
                    <label class="form-check-label" for="done">Done</label>
                  </div>
                  <button type="submit" className="btn btn-success">Save</button>
                </Form>
              )
            }
          </Formik>
        </div>
      </div>

    );
  }
}

export default TodoComponent