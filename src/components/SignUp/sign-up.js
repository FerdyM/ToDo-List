import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {TextField, Button, CircularProgress} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
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
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			usernameError: false,
			passwordError: false,
			confirmPasswordError: false,
			signUpError: false,
			loading: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
		this.handleSignUpError = this.handleSignUpError.bind(this)
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

	handleConfirmPasswordChange(event) {
		this.handleChange(event)
		setTimeout(() => {
			if (this.state.confirmPassword.length === 0) {
				this.setState({
					confirmPasswordError: false
				})
			} else if (this.state.confirmPassword !== this.state.password) {
				this.setState({
					confirmPasswordError: true
				})
			} else if (this.state.confirmPassword === this.state.password) {
				this.setState({
					confirmPasswordError: false
				})
			}
		}, 10);
	}

	handleSignUpError() {
		setTimeout(() => {
			this.setState({
				signUpError: false
			})
		}, 3000);
	}

	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()
		this.setState({
			loading: true,
		})
		if (this.state.password === this.state.confirmPassword) {
			api.post('/user/', {
				username: this.state.username,
				password: this.state.password
			})
				.then(response => {
					console.log(response)
					if (!response.data.errmsg) {
						console.log('successful signup')
						this.props.history.push('/login')
					} else {
						console.log('username already taken')
					}
				}).catch(error => {
					console.log('signup error: ')
					console.log(error)
					this.setState({
						signUpError: true,
						loading: false
					})
					this.handleSignUpError()
				})
		}
		//request to server to add a new username/password
	}


render() {
	return (
		<div className="form-holder">
			<Link to="/" className="back-link">
                    <ArrowBackIcon color="primary"/>
            </Link>
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
				<div>
					{this.state.confirmPasswordError ? (
						<TextField error helperText="Passwords must match" id="standard-basic" name="confirmPassword" label="Confirm Password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />  
					) : (
						<TextField id="standard-basic" name="confirmPassword" label="Confirm Password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
					)}
				</div>
				<Button onClick={this.handleSubmit} variant="contained" color="primary">Submit</Button>
				{this.state.signUpError ? (
					<Alert severity="error">There was an Error creating your account!</Alert>
				) : (
					<></>
				)}
				{this.state.loading ? (
					<div className="loading">
						<CircularProgress color="primary"/>
					</div>
				) : (
					<></>
				)}
			</form>
		</div>

	)
}
}

export default Signup
