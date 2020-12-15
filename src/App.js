import React, { Component } from 'react'
import Header from './components/layout/Header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import './App.css';


//test

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => {
        return response.json()
      })
      .then(arr => {
        this.setState({
          todos: arr
        })
      })
  }

  //toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })})
  }
  
  //Delete Todo
  delTodo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE"
    })
      .then(response => {
        return response.json()
      })
      .then( res => 
        this.setState({ todos: [...this.state.todos.filter (todo => 
          todo.id !== id )]
        })
      )

    
  }

  addTodo = (title) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        title: title,
        completed: false
      })
    })
      .then(response => {
        return response.json()
      })
      .then(todoObj => {
        // console.log(todoObj)
        this.setState({ todos: [...this.state.todos, todoObj]})
      })
      .catch(console.log)

  }

  render() {
    console.log(this.state.todos)
    return (
      <div className="App">
        <Header />
        <AddTodo addTodo={this.addTodo}/>
        <Todos 
          todos={this.state.todos}
          markComplete={this.markComplete}
          delTodo={this.delTodo} 
        />
      </div>
    );
  }
}

export default App;
