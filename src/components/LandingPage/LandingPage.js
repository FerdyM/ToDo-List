import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core'
import './stylesheet/LandingPage.css'

function LandingPage() {
    return (
        <div className="container">
            <h2>You need to login or sign up to use the To-Do List</h2>
            <div className="link-container">
                <Link to="/login"><Button size="large" variant="contained" color="primary">Login</Button></Link>
                <Link to="/signup"><Button  size="large" variant="contained" color="primary">Sign Up</Button></Link>
            </div>
        </div>
    )
}

export default LandingPage;
