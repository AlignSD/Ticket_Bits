import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import Main from "./Main";
import Buyer from "./Buyer";
import Seller from "./Seller";
import PaypalTest from "./PayPalTest";
import Paypal from "./Paypal";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";

function TicketMarketPlace() {
  let [account, setAccountName] = useState("");
  // let [ticketCount, setTicketCount] = useState(0)
  let [tickets, setTickets] = useState([]);
  let [loading, setLoading] = useState(true);
  let [userType, setUserType] = useState("");
  let [paypalState, setPaypalState] = useState({
    total: 0,
    checkoutList: [],
    isCheckout: false,
  });

  let [marketplaceState, setMarket] = useState();

  useEffect(() => {
    // Update the document title using the browser API

    loadWeb3();
    loadBlockchainData();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    console.log(account);
    let accountNum = accounts[0];
    setAccountName((account += accountNum));
    console.log(account);
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      setMarket((marketplaceState = marketplace));
      console.log(marketplaceState);

      const ticketCount = await marketplace.methods.ticketCount().call();

      console.log(ticketCount);
      // Load Products
      for (var i = 1; i <= ticketCount; i++) {
        const ticket = await marketplace.methods.tickets(i).call();
        console.log(ticket);
        setTickets((tickets) => [...tickets, ticket]);
        console.log(tickets);
      }
      console.log(tickets);
      setLoading((loading = false));
      console.log(loading);
      console.log(marketplace);
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  function createTicket(name, price) {
    if (marketplaceState) {
      console.log(account);
      setLoading({ loading: true });
      marketplaceState.methods
        .createTicket(name, price)
        .send({ from: account })
        .once("receipt", (receipt) => {
          setLoading({ loading: false });
        });
    }
  }
  const changeCheckout = () => {
    setPaypalState(true);
    console.log(paypalState);
  };
  // const checkCheckout = () => {
  //   if(paypalState.isCheckout === true){
  //     return(
  //       <Paypal tickets={tickets} purchaseTicket={purchaseTicket}/>
  //     )
  //   }
  // }

  // implement code that inputs user accountid from auth0 and ticket owner's metamask account number
  function purchaseTicket(id, price) {
    //Add setPaypalState to update shoping cart inventory and total value
    if (marketplaceState) {
      console.log(account);
      setLoading({ loading: true });
      marketplaceState.methods
        .purchaseTicket(id)
        .send({ from: account, value: price })
        .once("receipt", (receipt) => {
          setLoading({ loading: false });
        });
    }
  }
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
  const { isAuthenticated } = useAuth0();
  const classes = useStyles();

  const getUserInfo = () => {
    console.log();
  };
  // function onAdd(tickets, price) {
  //   setPaypalState({
  //     checkoutList: [...this.]
  //   })

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
      <div className="row"><button
              onClick={(event) => {
                setUserType("Paypal")
                changeCheckout();
              }}
            >
              Checkout
            </button></div>
      <div className={classes.marginAutoContainer}>
        <Grid container xs={4} align-content-xs-center>
          <Grid item xs={4} className={classes.marginAutoContainer}>
            <MyButton
              onClick={() => {
                setUserType("Buyer");
              }}
            >
              Buyer
            </MyButton>
          </Grid>
          <Grid item xs={4} className={classes.marginAutoContainer}>
            <MyButton
              onClick={() => {
                setUserType("Seller");
              }}
            >
              Seller
            </MyButton>
          </Grid>
          <Grid item xs={4} className={classes.marginAutoContainer}>
            <MyButton
              onClick={() => {
                setUserType("");
              }}
            >
              Ticket Feed
            </MyButton>
          </Grid>
          <Grid item xs={4} className={classes.marginAutoContainer}>
            <MyButton
              onClick={() => {
                setUserType("PaypalTest");
              }}
            >
              Checkout
            </MyButton>
          </Grid>
          <Grid item xs={4} className={classes.marginAutoContainer}>
          </Grid>
        </Grid>
      </div>
      <div className="row">
        <div className="container">{renderUserTable()}</div>
      </div>
    </div>
  );
}

export default TicketMarketPlace;
