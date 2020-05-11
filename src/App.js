import React, {Component} from 'react';
import { Route } from 'react-router-dom'
import LoginForm from './components/LogIn/login-form'
import Signup from './components/SignUp/sign-up'
import ToDoList from './components/ToDoList/ToDoList'
import LandingPage from './components/LandingPage/LandingPage'
import axios from 'axios'
import './App.css'



const api = axios.create({
  withCredentials: true,
  headers: {
      'Content-Type': 'application/json'
  },
  baseURL: process.env.REACT_APP_DEVSERVER
})

class App extends Component {
  constructor(props) {
    super(props)
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
    this.setState({
      loggedIn: userObject.loggedIn,
      username: userObject.username
    })
  }

  getUser() {
    api.get("/").then(response => {
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
          <div className="App">
            <Route  
              exact
              path="/todolist"
              render={() => <ToDoList username={this.state.username} loggedIn={this.state.loggedIn} updateUser={this.updateUser}/>}
            />
            <Route 
              exact
              path="/"
              component={LandingPage}
            />
            <Route
              exact
              path="/login"
              render={() => <LoginForm {...this.props} updateUser={this.updateUser}/>}
            />
            <Route
              exact
              path="/signup"
              render={() => <Signup {...this.props} />}
            />
          </div>
      );
  }
}

export default App;
