import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";



// Event host sells tickets thru Seller component
// could be converted into a functional component if bored
const useStyles = makeStyles({
  contained:{
    backgroundColor: "#ffffff",
    marginTop: 50,
    zIndex: 1,
    padding: 20
  },
  btnMargin: {
    marginTop: 20,
    color: "#ffffff",
    backgroundColor: "#000000",
    '&:hover': {
      backgroundColor: '#3d4c65',
      boxShadow: 'black',
    }
  

  },
  
})
function Seller(props) {
  const classes = useStyles();
    console.log(props);

    return (
      <Grid container className={classes.contained} alignItems="center" >
      <Grid item xs={12}>
      <div id="content"  style={{zIndex: 1}}>
        <h1 style={{color: "black"}}>Add Ticket</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.ticketName.value
          const price = window.web3.utils.toWei(this.ticketPrice.value.toString(), 'Ether')
          this.props.createTicket(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              style={{widith: "30%"}}
              id="ticketName"
              type="text"
              ref={(input) => { props.tickets.ticketName = input }}
              className="form"
              placeholder="Ticket Name"
              required />
          </div>
          <div  className="form-group mr-sm-2">
            <input
              style={{widith: "30%"}}
              id="ticketPrice"
              type="text"
              ref={(input) => { props.tickets.ticketPrice = input }}
              className="form"
              placeholder="Ticket Price"
              required />
          </div>
          <Button type="submit" className={classes.btnMargin}>Add Ticket</Button>
        </form>
        <p>&nbsp;</p>
      </div>
      </Grid>
      </Grid>
    );
  }


export default Seller;