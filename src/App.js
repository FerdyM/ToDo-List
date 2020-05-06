import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import LoginForm from './components/login-form'
import Signup from './components/sign-up'
import ToDoList from './components/ToDoList/ToDoList'
import LandingPage from './components/LandingPage'
import axios from 'axios'
import './App.css'



class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get("/").then(response => {
      console.log("get user response")
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
      return (
        <BrowserRouter>
          <div className="App">
            <Route  
              exact
              path="/todolist"
              render={() => <ToDoList username={this.state.username} loggedIn={this.state.loggedIn} />}
            />
            <Route 
              exact
              path="/"
              component={LandingPage}
            />
            <Route
              exact
              path="/login"
              render={() => <LoginForm updateUser={this.updateUser}/>}
            />
            <Route
              exact
              path="/signup"
              render={() => <Signup/>}
            />
          </div>
        </BrowserRouter>
      );
  }
}

export default App;
