import React,{useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import netflixImage from '../../assets/images/netflix.jpg'
import {UserAuth} from '../../context/AuhtContext'
function Login() {
  const {signIn}=UserAuth()
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const navigate=useNavigate()
  const [error,setError]=useState('')

  useEffect(()=>{
 setError('')
  },[email,password])

  const handleLogin=async(e)=>{
    e.preventDefault()
    setError('')
    try{
      await signIn(email,password)
      navigate('/')
    }
    catch (error){
      setError(error.message)
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