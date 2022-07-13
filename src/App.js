import React, { Component } from 'react';
import './App.css';
import TodoApp from './components/todo/TodoApp'
import './bootstrap.css'

import { jwtInterceptor } from './components/todo/JwtInterceptor';

jwtInterceptor();

class App extends Component {
  render() {
    return (
      <div className="App">
         {/*<Counter/>*/}
         <TodoApp/>
      </div>
    );
  }
}

export default App;