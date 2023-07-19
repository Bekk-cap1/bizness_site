import React from 'react'
import logo from "./../../assets/image/logo.png"
import "./SignUp.scss"

function SignUp() {
  return (
    <div className='signup'>
      <div className="wrapp">
        <form action="#">
          <h2>Sign Up</h2>
          <input type="email" placeholder='Email' name='email' />
          <input type="text" placeholder='Login' name='login' />
          <input type="password" placeholder='Password' name='password' />
          <button>Sign Up</button>
        </form>
        <img src={logo} alt="" />
      </div>
    </div>
  )
}

export default SignUp