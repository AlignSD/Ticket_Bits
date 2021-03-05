import React from 'react';
import Login from "../src/pages/login"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/pages/shanesStyle.css"

import './App.css';
// import LoginButton from "./components/LoginButton"
// import LogoutButton from './components/LogoutButton'
// import TicketMarketPlace from '../src/components/TicketMarketPlace'
// import Button from '@material-ui/core/Button'
// import { useAuth0 } from "@auth0/auth0-react";



function App() {
  return (
    <div className="shanesLogin text-white">      
      <Login/>
    </div>
  );
}

export default App;

  
  
