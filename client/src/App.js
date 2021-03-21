import React, { useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./components/Navbar";
import Loading from "./components/loading";
import Footer from "./components/footer";
import Buyer from './components/Buyer'
import Seller from './components/Seller'
import Grid from "@material-ui/core/Grid";
import TicketMarketPlace from './components/TicketMarketPlace';
import Home from "./views/home";
import Web3 from 'web3'
import ExternalApi from "./views/external-api";
import ProtectedRoute from "./auth/protected-route";
import CoinbaseAPI from "./CoinbaseAPI";
import CreateEvent from "./pages/CreateEvent"
import UserProfile from "./pages/UserProfile"
import Paypal from "./components/Paypal"
import {TicketsContext} from '../src/utils/TicketsContext'
import Marketplace from './abis/Marketplace.json'
import { makeStyles } from '@material-ui/core/styles';
import Matrix from "../src/components/MatrixRain"
import EventDetails from './pages/EventDetails'

const App = () => {
  let {account, tickets, loading, userType, marketplaceState, setAccountName, setTickets, setLoading, setMarket,eventModel, setEventModel} = useContext(TicketsContext)

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
      // Set marketplace state and load items into shop
      setMarket((marketplaceState = marketplace))
      const ticketCount = await marketplace.methods.ticketCount().call()
      loadTickets(ticketCount, marketplace);
      // const eventList = await eventfactory.methods.getDeployedEvents().call()
      // console.log(eventList)
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

  function createTotalTickets(total, name, price){
    console.log(total)
    console.log(name)
    console.log(price)
    console.log("totaltick")
    var i
    for(i=0; i<total; i++){
      createTicket(name, price);
    }
  }
  function createTicket(name, price) {
    console.log("ticket Test")
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
  const useStyles = makeStyles({
    logo: {
        height: 100
         },
    grid:{
        height: 75
    },
    chain:{
      color: '#ffffff',
      fontSize: "18px",
      marginLeft: "10px"
    },
    button:{
      height: 50
    },
    rain:{
      zIndex: -1,
      opacity: "10"
    },
    absolute:{
      position: "absolute",
      zIndex: 10

    },

  
  })

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
  const classes = useStyles();
  if (isLoading) {
    return <Loading/>;
  }

  return (
 <>
 <NavBar className={classes.absolute}/>
    <div id="app" style={{height: "100%"}} className="d-flex flex-column h-100">
      <div className="container flex-grow-1 " style={{position: "relative"}}>
        <Grid container >
        <Switch>
          <Route  exact path="/home" component={Home}/>
            <ProtectedRoute  exact path="/coinbaseAPI"><CoinbaseAPI/></ProtectedRoute>
            <ProtectedRoute  exact path="/profile" component={UserProfile} />
            <ProtectedRoute  exact path="/external-api" component={ExternalApi} />
            <ProtectedRoute  exact path='/TicketMarketPlace' component={TicketMarketPlace}/>
            <ProtectedRoute  exact path='/CreateEvent'><CreateEvent
                                                      eventModel = {eventModel}
                                                      setEventModel = {setEventModel}
                                                      createTicket={createTicket}
                                                      createTotalTickets={createTotalTickets}
            /></ProtectedRoute>
            <ProtectedRoute exact path='/EventDetails' component={EventDetails}></ProtectedRoute>
            <ProtectedRoute exact path='/CheckOut' component={Paypal}/>
            <ProtectedRoute exact path='/Buyer'><Buyer tickets={tickets} purchaseTicket={purchaseTicket} /></ProtectedRoute>
            <ProtectedRoute exact path='/Seller'><Seller tickets={tickets} createTicket={createTicket} createTotalTickets={createTotalTickets} /></ProtectedRoute>
        </Switch>
        </Grid>
        <Matrix className={classes.rain}>
      </Matrix>
      </div>
    </div>
  <Footer />
  </>
  );
};

export default App;