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
            usernameError: false,
            passwordError: false,
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUsernameChange(event) {
        this.handleChange(event)
        setTimeout(() => {
            if (this.state.username.length === 0) {
                this.setState({
                    usernameError: false
                })
            } else if (this.state.username.length < 6) {
                this.setState({
                    usernameError: true
                })
            } else {
                this.setState({
                    usernameError: false
                })
            }
        }, 10); 
    }

    handlePasswordChange(event) {
        this.handleChange(event)
        setTimeout(() => {         
            if (this.state.password === '') {
                this.setState({
                    passwordError: false
                })
            } else if (this.state.password.length < 6) {
                this.setState({
                    passwordError: true
                })
            } else {
                this.setState({
                    passwordError: false
                })
            }
        }, 10);
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
                    this.props.history.push('/todolist')
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
                            {this.state.usernameError ? (
                                <TextField error helperText="Username must be atleast 6 characters" id="standard-basic" name="username" label="Username" value={this.state.username} onChange={this.handleUsernameChange} />
                            ) : (
                                <TextField id="standard-basic" name="username" label="Username" value={this.state.username} onChange={this.handleUsernameChange} />
                            )}
                        </div>
                        <div>
                            {this.state.passwordError ? (
                                <TextField error helperText="Password must be atleast 6 characters" id="standard-basic" name="password" label="Password" value={this.state.password} onChange={this.handlePasswordChange} />  
                            ) : (
                                <TextField id="standard-basic" name="password" label="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                            )}
                        </div>
                        <Button onClick={this.handleSubmit} variant="contained" color="primary">Submit</Button>
                    </form>
                </div>
            )
        }
    }
}

export default LoginForm
