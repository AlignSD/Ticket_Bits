import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  logo: {
      height: 200
       },
  grid:{
      height: 75
  },
  chain:{
    color: '#ffffff',
    fontSize: "18px",
    marginLeft: "10px"
  },
  button:{
    height: 50
  },
  footer:{
    opacity: 100,
    position: "sticky",
    bottom: 0,
    width: "100%",
    zIndex: 5, 
  }

})


function Footer() {
  const classes = useStyles();
  return(
    <div className={classes.footer}>
  <footer className="bg-dark p-3 text-center">
    <div className="logo" />
    <p>
      Ticket-Bits{" "}
      <a target="_blank" rel="noopener noreferrer" href="https://auth0.com">
        Link to some random place
      </a>
    </p>
  </footer>
  </div>
)};


export default Footer;
