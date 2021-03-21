import React, {
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import { TicketsContext } from "../utils/TicketsContext";
import Grid from "@material-ui/core/Grid";

export default function Paypal() {
  const { tickets } = useContext(TicketsContext);
  const convertTickets =  window.web3.utils.fromWei(
    tickets[0].price.toString(),
    "Ether"
  )
  console.log(convertTickets)
  const ticketName = tickets[0].name;
  const ticketValue = tickets[0].price;
  console.log(ticketName)
  console.log(ticketValue)
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
      console.log(tickets)

    window.paypal
      .Buttons({
        createOrder: (actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Ticket Bits Checkout",
                amount: {
                  currency_code: "USD",
                  value: convertTickets ,
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
    <Grid style={{ marginLeft: "10px", marginRight: "10px" }}>
      <div>
        <h1>Shopping Cart</h1>
        <div>{ticketName}</div>
        <div>{convertTickets}</div>
        <div ref={paypalRef}  />
      </div>
    </Grid>
  );
}
