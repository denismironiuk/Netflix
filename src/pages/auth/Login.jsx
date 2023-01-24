import React,{useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import netflixImage from '../../assets/images/netflix.jpg'
import {UserAuth} from '../../context/AuhtContext'

// This component renders the login page, allowing users to sign in to the application
function Login() {
//Retrieve the signIn method from the UserAuth context
const {signIn}=UserAuth()
// Use state to manage the email and password input fields
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
// useNavigate allows you to programmatically navigate to a different route
const navigate=useNavigate()
// Use state to manage any error messages
const [error,setError]=useState('')

// useEffect is used to reset error message when email or password changes
useEffect(()=>{
setError('')
},[email,password])

//Handles the login process when the form is submitted
const handleLogin=async(e)=>{
//prevent the page from refreshing
e.preventDefault()
//Reset any existing error messages
setError('')
try{
//Call the signIn method from the context, passing in the email and password
await signIn(email,password)
//If login is successful, navigate the user to the home page
navigate('/')
}
catch (error){
//if login is unsuccessful, set the error state with the error message
setError(error.message)
return
}

}
  return (
    <>
    <div className="signup-container">
      <img src={netflixImage} alt="/" />
      <div className="overlay">
        <div className="login-container ">
          <div className="form-container">
            <h1>Sign In</h1>
            {error ?<p style={{color:'red',padding:'0.5rem',}}>{error}</p>:null}
            <form onSubmit={handleLogin}>
              <input type="email" name="name" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>

              <input type="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>

              <button type='submit'>Submit</button>
            </form>
            <div className='subscribe'>
            <p>Already subsribed to Netflix? </p>
            <Link to={'/signup'}>Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Login