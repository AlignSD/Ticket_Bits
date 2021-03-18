import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import Marketplace from '../abis/Marketplace.json'
import Main from './Main'
import Buyer from './Buyer'
import Seller from './Seller'
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';


// *****STATES*****
function TicketMarketPlace() {
  let [account, setAccountName] = useState('')
  // let [ticketCount, setTicketCount] = useState(0)
  let [tickets, setTickets] = useState([])
  let [loading, setLoading] = useState(true)
  let [userType, setUserType] = useState('')

  let [marketplaceState, setMarket] = useState()

  // *****Use Effect Function*****
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
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }
  }

  // *****Blockchain data function*****
  async function loadBlockchainData() {
    const web3 = window.web3
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
  // *****Load Ticketss function*****
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
  
  // *****Create ticket function*****
  function createTicket(name, price) {
    if (marketplaceState) {
      setLoading({ loading: true })
      marketplaceState.methods
        .createTicket(name, price)
        .send({ from: account })
        .once('receipt', (receipt) => {
          setLoading({ loading: false })
        })
    }
  }

  // *****Purchase ticket function*****
  function purchaseTicket(id, price) {
    if (marketplaceState) {
      setLoading({ loading: true })
      marketplaceState.methods
        .purchaseTicket(id)
        .send({ from: account, value: price })
        .once('receipt', (receipt) => {
          setLoading({ loading: false })
        })
    }
  }

  // implement code that inputs user accountid from auth0 and ticket owner's metamask account number

  // *****Styles functions*****
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    marginAutoContainer: {
      
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5
      
      
    },
  }));
  const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });
 
  const classes = useStyles();

  // *****table render funcion*****
  // This switch changes the component rendered based on what button is clicked
  const renderUserTable = () => {
    let result = null;

    switch ( userType ) {
      case  "Buyer":
        result = (<Buyer
          tickets={tickets}
          purchaseTicket={purchaseTicket}
        />);
          break;
      case "Seller":
        result = (<Seller
          tickets={tickets}
          createTicket={createTicket}
        />);
        break; 
      default: 
          userType = '';
          result =(<Main 
            tickets={tickets}
          />)
    }

    return result
  }

  return (

        <div>
          <div className={classes.marginAutoContainer}>
          <Grid container item={true} xs={4} align-content-xs-center='true'>
            <Grid item xs={4} className={classes.marginAutoContainer} >
            <MyButton  onClick={ () => { setUserType("Buyer") }}>Buyer</MyButton>
            </Grid>
            <Grid item xs={4} className={classes.marginAutoContainer} >
            <MyButton   onClick={ () => { setUserType("Seller") }}>Seller</MyButton>
            </Grid>
            <Grid item xs={4} className={classes.marginAutoContainer} >
            <MyButton  onClick={ () => { setUserType("") }}>Ticket Feed</MyButton>
            </Grid>
          </Grid>
          
          </div>
        <div className="row">
        <div className="container">
        {renderUserTable()}
        </div>
        </div>
        </div>
  )
}

export default TicketMarketPlace

