import React from 'react';

// import './App.css';
// import LoginButton from "./components/LoginButton"
// import LogoutButton from './components/LogoutButton'
import TicketMarketPlace from '../components/TicketMarketPlace'
import Button from '@material-ui/core/Button'
import { useAuth0 } from "@auth0/auth0-react";



function Login() {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(isAuthenticated)
  if (isAuthenticated === false){
  return (
    <div>      
      <Button href="#" variant="contained" color="primary">
      <a onClick={() => loginWithRedirect()}>Log In</a>;
      </Button>
     
    </div>
  )}
  else { return(
    <TicketMarketPlace/>
  )
  }
}

export default Login;