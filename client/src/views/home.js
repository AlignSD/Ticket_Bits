import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CrypticLogo from "../images/CrypticLogo.png";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import "./landingpage.css"
import "./home.css"
import ScriptTag from "react-script-tag"

const useStyles = makeStyles({
  logo: {
      height: 100
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
  rain:{
    zIndex: 0,
    opacity: "10"
  },
  contained:{
    zIndex: 1,
    opacity: 100
  }

})




function Home(){ 
  const classes = useStyles();
return( 
  
 
  
 
   <Grid spacing={5} justify="center" alignItems="center">
  <Grid className={classes.logo}item xs={12}spacing={5} justify="center" alignItems="center" direction="row"/>
  <Grid spacing={5} justify="center" alignItems="center" direction="row">
  <Grid item xs={3}/>
  <Grid className={classes.contained} item xs={6} justify="center" alignItems="center">
  <img src = {CrypticLogo} alt="cryptic logo"></img>
  </Grid>
  <Grid item xs={3}/>
  </Grid>
  </Grid>
 


)};

export default Home;
