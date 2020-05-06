import React from 'react'
import {Link} from 'react-router-dom'
export default function LandingPage() {
    return (
        <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}
