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
			confirmPassword: ''
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
					<TextField id="standard-basic" name="username" label="Standard" value={this.state.username} onChange={this.handleChange} />
				</div>
				<div>
					<TextField id="standard-basic" name="password" label="Standard" value={this.state.password} onChange={this.handleChange} />
				</div>
				<Button onClick={this.handleSubmit} variant="contained" color="primary">Submit</Button>
			</form>
		</div>

	)
}
}

export default Signup
