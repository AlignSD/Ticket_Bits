import React, { useRef, useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TicketsContext } from "../utils/TicketsContext";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  buyButton: {
    color: "#FFFFFF",
    width: "100%",
    backgroundColor: "#000000",
    "&:hover": {
      backgroundColor: "#3d4c65",
      boxShadow: "black",
    },
  },
  orderSum: {
    color: "#686666",
    fontSize: "1rem",
  },
  paypal: {
    marginTop: "1rem",
  }
}));

export default function Paypal(props) {
  const { addToCart, tickets } = useContext(TicketsContext);
  console.log(addToCart);
  const convertTickets = window.web3.utils.fromWei(
    addToCart.price.toString(),
    "Ether"
  );
  console.log(convertTickets);
  const ticketId = addToCart.id;
  const ticketName = addToCart.name;
  const ticketValue = addToCart.price;
  console.log(ticketName);
  console.log(ticketValue);
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    console.log(tickets);

    window.paypal
      .Buttons({
        createOrder: (actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Ticket Bits Checkout",
                amount: {
                  currency_code: "USD",
                  value: convertTickets,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log("ORDER", order);
        },
        onError: (err) => {
          setError(err);
          console.error("ERROR", err);
        },
      })
      .render(paypalRef.current);
  }, []);

  if (paidFor) {
    return <div>Thanks for making the purchase.</div>;
  }

  if (error) {
    return <div>Error in processing order. Please Retry again</div>;
  }

  return (
    <Grid style={{ padding: "10px" }}>
      <div>
        <Typography variant="h6" component="h6" className={classes.orderSum}>
            <strong>Order Summary</strong>
        </Typography>
        <hr />
        <div className={classes.orderSum}>{ticketName}</div>
        <div className={classes.orderSum}>{convertTickets}</div>
        <div className={classes.paypal} ref={paypalRef} />
      </div>

      <Button
        className={classes.buyButton}
        name={tickets.id}
        value={tickets.price}
        onClick={(event) => {
          props.purchaseTicket(ticketId, ticketValue);
        }}
      >
        Purchase with ETH
      </Button>
    </Grid>
  );
}