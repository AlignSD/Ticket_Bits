import React, {useContext } from 'react'
import Main from './Main'
import Buyer from './Buyer'
import Seller from './Seller'
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import Paypal from './Paypal'
import PaypalTest from "./PayPalTest"
import {TicketsContext} from '../../src/utils/TicketsContext'

// *****STATES*****
function TicketMarketPlace() {

  let {account, tickets, loading, userType, marketplaceState, setAccountName, setTickets, setLoading, setUserType, setMarket, setOpenPopup} = useContext(TicketsContext)

  // *****Use Effect Function*****



  
  // *****Create ticket function*****
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

  // implement code that inputs user accountid from auth0 and ticket owner's metamask account number

  // *****Styles functions*****
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    marginAutoContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 5,
    },
  }));
  const MyButton = styled(Button)({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  });
 
  const classes = useStyles();

  // *****table render funcion*****
  // This switch changes the component rendered based on what button is clicked
  const renderUserTable = () => {
    // checkCheckout();
    let result = null;

    switch (userType) {
      case "Buyer":
        result = <Buyer tickets={tickets} purchaseTicket={purchaseTicket} />;
        break;
      case "Seller":
        result = <Seller tickets={tickets} createTicket={createTicket} />;
        break;
      case "PaypalTest":
        result = (
          <PaypalTest tickets={tickets} purchaseTicket={purchaseTicket} />
        );
        break;
        case "Paypal":
        result = (
          <Paypal tickets={tickets} purchaseTicket={purchaseTicket} />
        );
        break;
      default:
        userType = "";
        result = <Main tickets={tickets} />;
    }

    return result;
  };

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
            <Grid item xs={4} className={classes.marginAutoContainer} >
            <MyButton  onClick={ () => { setOpenPopup(true) }}>Create Event</MyButton>
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

export default TicketMarketPlace;
