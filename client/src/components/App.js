import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Main from './Main'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import TicketMarketPlace from './TicketMarketPlace'


function App() {
  return (
    <div>
      <TicketMarketPlace />
    </div>
  );
}

export default App;

  
  
