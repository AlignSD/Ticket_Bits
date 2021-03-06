import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
  },
  contained: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    marginTop: 50,
    marginRight: "auto",
    marginBottom: 150,
    marginLeft: "auto",
    padding: 20,
    width: "100%",
    zIndex: 1,
  },
  buyButton:{
    color: "#ffffff",
    backgroundColor: "#000000",
    '&:hover': {
      backgroundColor: '#3d4c65',
      boxShadow: 'black',
    },
}});
// Loads buyer page thru ticketmarketplace
function Buyer(props) {

  const CoinbasePro = require('coinbase-pro');
  const publicClient = new CoinbasePro.PublicClient();

  const [ticker, setTicker] = useState();

useEffect(() => {

  setTicker()

}, setInterval([ticker], 500));


  publicClient.getProductTicker(
    'ETH-USD',
    (error, response, data, result) => {
      if (error) {
        console.log("You're a ticker")
      } else {
        console.log(response)
        console.log(data)

        console.log(data.price)
        result = JSON.stringify(data.price)
        console.log(result)
      }
      return setTicker(result)
    });

  const classes = useStyles();
  console.log(props);
  return (
      <div className={classes.contained}>
        <Grid container alignItems="center" className={classes.root}>
          {/* <Grid item xs={12} sm={12}> */}
            {/* <div id="content" style={{ zIndex: 1 }}> */}
              <h2 style={{ color: "black" }}>Buy Ticket {ticker}</h2>
              <Table className="table">
                <TableHead>
                  <TableRow>
                  <TableCell align="left">#</TableCell>
                  {/* <TableCell align="left">Event Image</TableCell> */}
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">Location</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Owner</TableCell>  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {console.log(props.tickets)}
                  {props.tickets.map((ticket, key) => {
                    return (
                      // <Grid container>
                        <TableRow key={key}>
                          <th scope="row">{ticket.id.toString()}</th>
                          {/* <TableCell>{ticket.imgHash}</TableCell> */}
                          <TableCell>{ticket.name}</TableCell>
                          <TableCell>
                            {window.web3.utils.fromWei(
                              ticket.price.toString(),
                              "Ether"
                            )}
                          </TableCell>
                          <TableCell>{ticket.startDate}</TableCell>
                          <TableCell>{ticket.location}</TableCell>
                          <TableCell>{ticket.description}</TableCell>
                          <TableCell>{ticket.owner}</TableCell>
                          <TableCell>
                            {!ticket.purchased ? (
                              <Button
                                className={classes.buyButton}
                                name={ticket.id}
                                value={ticket.price}
                                onClick={(event) => {
                                  props.purchaseTicket(
                                  ticket.id,
                                  ticket.price
                                  );
                                }}
                              >
                                Add to cart
                              </Button>
                            ) : null}
                          </TableCell>
                        </TableRow>
                      // </Grid>
                    );
                  })}
                </TableBody>
              </Table>
            {/* </div> */}
          {/* </Grid> */}
        </Grid>
      </div>
 
  );
}

export default Buyer;
