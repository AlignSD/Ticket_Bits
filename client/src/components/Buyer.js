import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    contained:{
      backgroundColor: "#ffffff",
      marginTop: 50,
      zIndex: 1
    }
})
// Loads buyer page thru ticketmarketplace
function Buyer(props) {
    
  const classes = useStyles();
    console.log(props);
    return (
      <Grid container className={classes.contained} alignItems="center" >
        <Grid item xs={12}>
      <div id="content" style={{zIndex: 1,
      backgroundColor: "white"}}>
        <h2 style={{color: "black"}}>Buy Ticket</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="ticketList">
            { props.tickets.map((ticket, key) => {
              return(
                <Grid container>
                <tr key={key}>
                  <th scope="row">{ticket.id.toString()}</th>
                  <td>{ticket.name}</td>
                  <td>{window.web3.utils.fromWei(ticket.price.toString(), 'Ether')}</td>
                  <td>{ticket.owner}</td>
                  <td>
                   { !ticket.purchased
                    ? <button className="buyButton text-dark font-weight-bold rounded btn-success" 
                      name={ticket.id}
                      value={ticket.price} 
                        onClick={(event) => {
                          props.purchaseTicket(event.target.name, event.target.value)
                        } }
                      >
                        Buy
                        </button>
                        : null
                    }
                    </td>
                </tr>
                </Grid>
              )
            })}
          </tbody>
        </table>
      </div>
      
      </Grid>
      </Grid>
    );
  }

export default Buyer;