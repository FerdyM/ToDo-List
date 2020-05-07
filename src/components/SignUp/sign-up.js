import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {TextField, Button} from '@material-ui/core'
import axios from 'axios'
import './stylesheet/SignUp.css'

const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: 'https://salty-brushlands-62535.herokuapp.com/'
})

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			usernameError: false,
			passwordError: false,
			confirmPassword: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
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
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		api.post('/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					window.location = '/login'
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
	return (
		<div className="form-holder">
			<h4>Sign up</h4>
			<form >
				<div>
					{this.state.usernameError ? (
						<TextField error helperText="Username must be atleast 6 characters" id="standard-basic" name="username" label="Username" value={this.state.username} onChange={this.handleUsernameChange} />
					) : (
						<TextField color="green" id="standard-basic" name="username" label="Username" value={this.state.username} onChange={this.handleUsernameChange} />
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

export default Signup
