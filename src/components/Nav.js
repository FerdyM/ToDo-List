import React from 'react'
import { AppBar, Typography, Toolbar } from '@material-ui/core'

const Nav = () => {
    return (
        <AppBar position="static" theme="primary">
            <Toolbar>
                <Typography variant="h2">ToDoList</Typography>
            </Toolbar>
        </AppBar>
    )
}
export default Nav;