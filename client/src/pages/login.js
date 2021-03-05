import React from 'react';

// import './App.css';
// import LoginButton from "./components/LoginButton"
// import LogoutButton from './components/LogoutButton'
import TicketMarketPlace from '../components/TicketMarketPlace'
import Button from '@material-ui/core/Button'
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../pages/shanesStyle.css"
import Logo from "../pages/Images/scripted_Tickets.png"


function Login() {
  const { loginWithRedirect } = useAuth0();
  const {isAuthenticated} = useAuth0();
  console.log(isAuthenticated)
  if (isAuthenticated === false){
  return (
    <div>
      
      <br></br>

      <div className="container shanesLogin jubotron">
        <img className="img-fluid" src={Logo}></img>
      <div>

      <Button variant="contained" color="primary">
      <a onClick={() => loginWithRedirect()}>Log In</a>
      </Button>
      
      </div>
      </div>
    </div>
  )}
  else { return(
    <TicketMarketPlace/>
  )
  }
}

export default Login;