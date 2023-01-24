import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import netflixImage from "../../assets/images/netflix.jpg";
import "./SignUp.css";
import { UserAuth } from "../../context/AuhtContext";
import Navbar from "../../components/navbar/Navbar";

// SignUp component for handling user sign up
function SignUp() {
  // State for email input
  const [email, setEmail] = useState("");
  // State for password input
  const [password, setPassword] = useState("");
  // State for error message
  const [error, setError] = useState("");
  // Getting the signUp method from the UserAuth context
  const { signUp } = UserAuth();
  // useNavigate hook for navigation
  const navigate = useNavigate();
  
  // Clearing the error message on email and password change
  useEffect(() => {
    setError("");
  }, [email, password]);
  
  // Handle submit method for handling form submission
  const handleSubmit = async (e) => {
    // Preventing default form submission
    e.preventDefault();
    try {
      // Calling the signUp method from the context and passing in email and password
      await signUp(email, password);
      
      //Navigating to login page after successful signup
      navigate('/login')
    } catch (error) {
      // Setting the error state with the error message
      setError(error.message)
      return
    }
  };

  return (
    <>
      <div className="signup-container">
        <img src={netflixImage} alt="/" />

        <div className="overlay">
          <div className="login-container">
            <div className="form-container">
              <h1>Sign Up</h1>
              {error ?<p style={{color:'red',padding:'0.5rem',}}>{error}</p>:null}
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  name="name"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
               
                />

                <input
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                
                />

                <button type="submit">Submit</button>
              </form>
              <div className="subscribe">
                <p>New to Netflix? </p>
                <Link to={"/login"}>Sign in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
