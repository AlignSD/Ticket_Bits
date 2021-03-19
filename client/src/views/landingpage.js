import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CrypticLogo from "../images/CrypticLogo.png";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import "./landingpage.css"
import App from "../App"
import { Route } from "react-router-dom";

const BootstrapButton = withStyles({
    root: {
        color: '#ffffff',
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '3px solid',
      lineHeight: 1.5,
      backgroundColor: '#000000',
      borderColor: '#ffffff',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#ffffff',
        color: "#000000",
        boxShadow: '#ffffff',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
  })(Button);

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
    }

})

function LandingPage() {
    const classes = useStyles();
    return(
    <Container>
    <Grid className={classes.logo}item xs={12}spacing={5} justify="center" alignItems="center" direction="row"/>
    <Grid container spacing={5} justify="center" alignItems="center" direction="row">
    <Grid item xs={3}/>
    <Grid item xs={6} justify="center" alignItems="center">
    <img src = {CrypticLogo} alt="cryptic logo"></img>
    </Grid>
    <Grid item xs={3}/>
    </Grid>
    <Grid className={classes.grid}item xs={12}spacing={5} justify="center" alignItems="center" direction="row"/>
    <Grid className={classes.grid} container spacing={5} justify="center" alignItems="center" direction="row">
    <Grid item xs={4}/>
    <BootstrapButton className={classes.button}onClick={()=> window.location = "/home"}><p className="font-face">Enter</p></BootstrapButton>
    <Grid/>
    <Grid  className={classes.chain}><p className="font-face">The Chain</p></Grid>
    </Grid>
    </Container>
    
    
    )};
  
  export default LandingPage;