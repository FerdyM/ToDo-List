import React, { Component } from 'react'
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'
import axios from 'axios'
import './stylesheet/Nav.css'

class Nav extends Component {
    // constructor(props) {
    //     super(props)

    //     this.updateUser = this.updateUser.bind(this)
    // }


    logout() {
        console.log('goonk')
        axios.post('/user/logout').then(() => {
            let userObject = {
                loggedIn: false,
                username: null
            }
           this.props.updateUser(userObject)
        })
    }

    render () {
        return (
            <>
                <AppBar position="static" theme="primary">
                    <Toolbar>
                        <Typography variant="h2">{this.props.username}'s  ToDoList</Typography>
                    </Toolbar>
                        <Button id="nav-button" variant="contained" onClick={() => this.logout()}>Logout</Button>
                </AppBar>
            </>
        )
    }
}
export default Nav;