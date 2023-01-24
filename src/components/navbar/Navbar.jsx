import React from "react";
import { Await, Link } from "react-router-dom";
import "./Navbar.css";
import {UserAuth} from '../../context/AuhtContext'

function Navbar() {
  const {user,logOut}=UserAuth()
  // console.log(user.email)

  const handleLogout=async()=>{
try{
  await logOut()
}
catch(error){
  console.log(error)
}
  }
  return (
    <div className="navbar-container">
      <Link to="/">
        <h1>NETFLIX</h1>
      </Link>
      {user?.email ? (<div>
        <Link to={"/account"}>
          <button className="signout-button">Account</button>
        </Link>
          <button onClick={handleLogout} className="signin-button">Log out</button>
       
        
      </div>):(<div>
        <Link to={"/login"}>
          <button className="signin-button">Sign In</button>
        </Link>
        <Link to={"/signup"}>
          <button className="signout-button">Sigh Up</button>
        </Link>
      </div>)}
     
    </div>
  );
}

export default Navbar;
