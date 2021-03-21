import React, { Component, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// Event host sells tickets thru Seller component
// could be converted into a functional component if bored
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
  btnMargin: {
    marginTop: 20,
    color: "#ffffff",
    backgroundColor: "#000000",
    "&:hover": {
      backgroundColor: "#3d4c65",
      boxShadow: "black",
    },
  },
});
function Seller(props) {

  const [input, setInput] = useState({
    name: "",
    prce: ''
  })
  const classes = useStyles();
  console.log(props);

  return (
    <div className={classes.contained}>
      <div className={classes.root}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <div id="content" style={{ zIndex: 1 }}>
              <h1 style={{ color: "black" }}>Add Ticket</h1>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const name = input.name;
                  const price = window.web3.utils.toWei(
                    input.price,
                    "Ether");
                  props.createTicket(name, price);
                }}
              >
                <div className="form-group mr-sm-2">
                  <input
                    style={{ widith: "30%" }}
                    id="ticketName"
                    type="text"
                    className="form"
                    placeholder="Ticket Name"
                    required
                    onChange={(e) => setInput({...input, name: e.target.value})}
                  />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    style={{ widith: "30%" }}
                    id="ticketPrice"
                    type="text"
                    className="form"
                    placeholder="Ticket Price"
                    required
                    onChange={(e) => setInput({...input, price: e.target.value})}
                  />
                </div>
                <Button type="submit" className={classes.btnMargin}>
                  Add Ticket
                </Button>
              </form>
              <p>&nbsp;</p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Seller;
