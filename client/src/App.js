<<<<<<< HEAD
import React, { useEffect, useState, useContext } from "react";
=======
import React from "react";
>>>>>>> 03bf4f72d64b31a0b6aef3e30ad66f378dcfec7e
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./components/Navbar";
import Loading from "./components/loading";
import Footer from "./components/footer";
// import NavBar from "./components/NavBar";
import TicketMarketPlace from './components/TicketMarketPlace';
import Home from "./views/home";
<<<<<<< HEAD
import Web3 from 'web3'
import Profile from "./views/profile";
=======
// import Profile from "./views/profile";
>>>>>>> 03bf4f72d64b31a0b6aef3e30ad66f378dcfec7e
import ExternalApi from "./views/external-api";
import ProtectedRoute from "./auth/protected-route";
import CoinbaseAPI from "./CoinbaseAPI";
// import Popup from './components/Popup'
import CreateEvent from "./pages/CreateEvent"
import UserProfile from "./pages/UserProfile"
import Paypal from "./components/Paypal"
<<<<<<< HEAD
import TicketsContextProvider from "./utils/TicketsContext"
import {TicketsContext} from '../src/utils/TicketsContext'
import Marketplace from './abis/Marketplace.json'

=======
// import TicketsContextProvider from "./utils/TicketsContext"
>>>>>>> 03bf4f72d64b31a0b6aef3e30ad66f378dcfec7e
// --- Post bootstrap -----

const App = () => {
  let {account, tickets, loading, userType, paypalState, marketplaceState, setAccountName, setTickets, setLoading, setUserType, setPaypalState, setMarket, setOpenPopup} = useContext(TicketsContext)

  useEffect(() => {
    // Update the document title using the browser API
    loadWeb3()
    loadBlockchainData()

  }, [])
  async function loadWeb3() {
    // If client is using a etherium browser we request the account tied to it
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      // Else if they're using a web3 browser
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      // Directs clients to install MetaMask
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async function loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts()
    let accountNum = accounts[0]
    // Change account state to equal accountNum
    setAccountName((account = accountNum))
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
  // Verify application is connected to the blockchain network
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address,
      )
      // Set marketplace state and load items into shop
      setMarket((marketplaceState = marketplace))
      const ticketCount = await marketplace.methods.ticketCount().call()
      loadTickets(ticketCount, marketplace); 
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }  
  }
  async function loadTickets(ticketCount, marketplace) {
    // We're pushing ticketarr into ticket to update the state when needed
    // if we push straight to ticket it causes an infinite loop
    let ticketArr = [];
    for (var i = 1; i <= ticketCount; i++) {
      const ticket = await marketplace.methods.tickets(i).call()
      ticketArr.push(ticket)
    }
    setTickets(ticketArr)
    setLoading((loading = false))
  } 
  const { isLoading } = useAuth0();

  // const apiKey = '3bb54333680d7672149c11bb6d783ccfe95329ecf2f5a7df443e0d323ea3db25';


  // var request = require('request');
  // request('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR&api_key=3bb54333680d7672149c11bb6d783ccfe95329ecf2f5a7df443e0d323ea3db25' , function (error, response, body) {
  //   console.log('error:', error);
  //   console.log('statusCode:', response && response.statusCode); 
  //   console.log('body:', body);
  // });

  if (isLoading) {
    return <Loading/>;
  }

  return (
 
    <div id="app" style={{height: "100%"}} className="d-flex flex-column h-100">
      <NavBar
    />
      <div className="container flex-grow-1">
        <Switch>
        <Route path="/" exact component={Home} />
          <ProtectedRoute path="/coinbaseAPI" component={CoinbaseAPI} />
          <ProtectedRoute path="/profile" component={UserProfile} />
          <ProtectedRoute path="/external-api" component={ExternalApi} />
          <ProtectedRoute exact path='/TicketMarketPlace' component={TicketMarketPlace}/>
          <ProtectedRoute exact path='/CreateEvent' component={CreateEvent}/>
          <ProtectedRoute exact path='/CheckOut' component={Paypal}/>



        </Switch>
  
        
        
      </div>
      <Footer />
    </div>
  );
};

export default App;