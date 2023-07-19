import React from 'react'
import "./SignIn.scss"
import logo from "./../../assets/image/logo.png"

function SignIn() {
    return (
        <div className='signin container'>
            <div className="wrapp">
                <img src={logo} alt="" />
                <form action="#">
                    <h2>Sign In</h2>
                    <input type="text" placeholder='Login' name='login' />
                    <input type="password" placeholder='Password' name='password' />
                    <button>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn