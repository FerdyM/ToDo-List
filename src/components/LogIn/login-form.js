import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {TextField, Button} from '@material-ui/core'
import axios from 'axios'
import '../SignUp/stylesheet/SignUp.css'

const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: 'https://salty-brushlands-62535.herokuapp.com/'
})

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')
        
            api.post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/todolist'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }

    render() {
        if (this.state.redirectTo) {
            return (
                <Redirect to={{ pathname: this.state.redirectTo }}/>
            )
        } else {
            return (
                <div className="form-holder">
                    <h4>Log In</h4>
                    <form >
                        <div>
                            <TextField id="standard-basic" name="username" label="Username" value={this.state.username} onChange={this.handleChange} />
                        </div>
                        <div>
                            <TextField id="standard-basic" name="password" label="Password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <Button onClick={this.handleSubmit} variant="contained" color="primary">Submit</Button>
                    </form>
                </div>
            )
        }
    }
}

export default LoginForm
