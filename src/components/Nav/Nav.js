import React, { Component } from 'react'
import { AppBar, Typography, Toolbar } from '@material-ui/core'

class Nav extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <AppBar position="static" theme="primary">
                <Toolbar>
                <Typography variant="h2">ToDoList</Typography>
                </Toolbar>
            </AppBar>
        )
    }
}
export default Nav;