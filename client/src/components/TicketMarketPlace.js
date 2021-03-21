import React, {useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {TicketsContext} from '../../src/utils/TicketsContext'

// *****STATES*****
function TicketMarketPlace() {

  let {account, marketplaceState,setLoading} = useContext(TicketsContext)
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
  const classes = useStyles();

  // *****table render funcion*****
  // This switch changes the component rendered based on what button is clicked
  const renderUserTable = () => {
    // checkCheckout();
    let result = null;
    return result;
  };

  return (
    <div  style={{position: 'absolute', zIndex: 1}}> 
      <div className={classes.marginAutoContainer}>
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
