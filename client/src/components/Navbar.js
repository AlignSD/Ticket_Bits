
import React from "react";
import MainNav from "./main-nav";
import AuthNav from "./auth-nav";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  root: {
    background: "#686666",
  },
  container:{
    background: "#686666",
    position: 'sticky',
    zIndex: 5,
      opacity: 100,
      top: 0,
  },
  grid1:{
    marginTop: 15
  }

});

function NavBar(props){
  const classes = useStyles();
 
  return (
    <Container maxWidth={false} className={classes.container}>
      <nav className={classes.root}>  
          <div className="row">
          <Grid wrap-xs-nowrap="true" container direction="row">
            <Grid className={classes.grid1} item xs={6}>
          <MainNav
          props={props} />
          </Grid>
          <AuthNav purchaseTicket={props.purchaseTicket} />
          </Grid>
          </div>
      </nav>
    </Container>
  )};
export default NavBar;
