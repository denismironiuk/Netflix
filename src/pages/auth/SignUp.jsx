import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import netflixImage from "../../assets/images/netflix.jpg";
import "./SignUp.css";
import { UserAuth } from "../../context/AuhtContext";
import Navbar from "../../components/navbar/Navbar";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setError("");
  }, [email, password]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
     
    if(password.length<8){
      setError('Password must be 8')
    }


    try {
      await signUp(email, password);
      
      navigate("/");
    } catch (error) {
      console.log(error.message)
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
