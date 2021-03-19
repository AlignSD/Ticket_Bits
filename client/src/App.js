import React, { useEffect, useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./components/Navbar";
import Loading from "./components/loading";
import Footer from "./components/footer";
import Buyer from './components/Buyer'
import Seller from './components/Seller'
// import NavBar from "./components/NavBar";
import TicketMarketPlace from './components/TicketMarketPlace';
import Home from "./views/home";
import Web3 from 'web3'
import Profile from "./views/profile";
import ExternalApi from "./views/external-api";
import ProtectedRoute from "./auth/protected-route";
import CoinbaseAPI from "./CoinbaseAPI";
// import Popup from './components/Popup'
import CreateEvent from "./pages/CreateEvent"
import UserProfile from "./pages/UserProfile"
import Paypal from "./components/Paypal"
import TicketsContextProvider from "./utils/TicketsContext"
import {TicketsContext} from '../src/utils/TicketsContext'
import Marketplace from './abis/Marketplace.json'
import Event from './abis/Event.json'
import EventFactory from './abis/EventFactory.json'


const App = () => {
  let {account, tickets, loading, userType, paypalState, marketplaceState, setAccountName, setTickets, setLoading, setUserType, setPaypalState, setMarket, setOpenPopup, eventModel, setEventModel, setEvent, eventState, eventFactoryState, setEventFactory} = useContext(TicketsContext)

  useEffect(() => {
    // Update the document title using the browser API
    loadWeb3()
    loadBlockchainData()

  }, [userType])

    // *****This Function Loads Web3*****
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
      const event = new web3.eth.Contract(
        Event.abi,
        networkData.address,
      )
      console.log(event);
      const eventfactory = new web3.eth.Contract(
        EventFactory.abi,
        networkData.address,
      )
      console.log(eventfactory);
      // Set marketplace state and load items into shop
      setMarket((marketplaceState = marketplace))
      setEvent((eventState = event))
      setEventFactory((eventFactoryState = eventfactory))
      const ticketCount = await marketplace.methods.ticketCount().call()
      console.log(marketplace.methods, "marketplacemethods")
      loadTickets(ticketCount, marketplace);
      // const eventList = await eventfactory.methods.getDeployedEvents().call()
      // console.log(eventList)
      
      
      setEventModel((eventModel = eventfactory))
      console.log(eventModel)
      
      
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }  
  }

  // async getEventById(id)

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
  function createTicket(name, price) {
    if (marketplaceState) {
      setLoading({ loading: true })
      marketplaceState.methods
        .createTicket(name, price)
        .send({ from: account })
        .once("receipt", (receipt) => {
          setLoading({ loading: false });
        });
    }
  }

  // *****Purchase ticket function*****
  function purchaseTicket(id, price) {
    //Add setPaypalState to update shoping cart inventory and total value
    if (marketplaceState) {
      setLoading({ loading: true })
      marketplaceState.methods
        .purchaseTicket(id)
        .send({ from: account, value: price })
        .once("receipt", (receipt) => {
          setLoading({ loading: false });
        });
    }
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
      <NavBar/>
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={Home} />
            <ProtectedRoute path="/coinbaseAPI" component={CoinbaseAPI} />
            <ProtectedRoute path="/profile" component={UserProfile} />
            <ProtectedRoute path="/external-api" component={ExternalApi} />
            <ProtectedRoute exact path='/TicketMarketPlace' component={TicketMarketPlace}/>
            <ProtectedRoute exact path='/CreateEvent'><CreateEvent
                                                      eventModel = {eventModel}
                                                      setEventModel = {setEventModel}
            /></ProtectedRoute>
            <ProtectedRoute exact path='/CheckOut' component={Paypal}/>
            <ProtectedRoute exact path='/Buyer'><Buyer tickets={tickets} purchaseTicket={purchaseTicket} /></ProtectedRoute>
            <ProtectedRoute exact path='/Seller'><Seller tickets={tickets} createTicket={createTicket} /></ProtectedRoute>
        </Switch>
      </div>
    <Footer />
  </div>
  );
};

export default App;