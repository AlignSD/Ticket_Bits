import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: "white",
      display: "flex",
      flexWrap: "wrap",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
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
    eventName: {
      marginBottom: 10,
    },
    eventLocation: {
      opacity: 0.54,
      marginBottom: 10,
    },
    eventInfo: {
      lineHeight: 1.5,
    },
    contained:{
      backgroundColor: "#FFFFFF",
      borderRadius: 6,
      marginTop: 50,
      marginRight: "auto",
      marginBottom: 50,
      marginLeft: "auto",
      height: "33.33%",
      padding: 20,
      zIndex: 1
    },
    overall:{
        borderRadius: 6,
        marginRight: "auto",
        marginBottom: 50,
        marginLeft: "auto",
        height: "33.33%",
        padding: 20,
        zIndex: 1

    }
  }));


  export default function eventCard(props){
      console.log(props)
      const events = props.events
       const classes = useStyles();
       console.log(events)
      


       return(
        <div className={classes.overall}>
            {events.map((events, index) => (
                <div className={classes.contained}>
        <div key={index} className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <img
                src="https://images.discotech.me/artists/8afa7b3a-6d68-467c-805d-04b538dee1d1.jpg"
                alt=""
                className="img-fluid"
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography variant="h3" className={classes.eventName}>
              <strong>{events.eventName}</strong>
              </Typography>
              <Typography variant="h5" className={classes.eventLocation}>
                {events.venueName}
              </Typography>
              <Typography variant="body1" className={classes.eventInfo}>
              <strong>Start:</strong> {events.eventStarts}
              </Typography>
              <Typography variant="body1" className={classes.eventInfo}>
              <strong>End:</strong> {events.eventsEnd}
              </Typography>
              <Typography variant="body1" className={classes.eventInfo}>
              <strong>Available Tickets:</strong> {events.ticketAmount}
              </Typography>
              <Typography variant="body1" className={classes.eventInfo}>
              <strong>Ticket Price:</strong> {events.ticketPrice}
              </Typography>
              <hr />
              <Typography
                variant="body1"
                color="textSecondary"
                component="p"
                className={classes.paragraphText}
              >
                <strong>Description:</strong>
                {events.summary}
              </Typography>
              <Grid container>
                <Grid xs={4}></Grid>
                <Grid xs={4}></Grid>
              <Grid item xs={4} alignContent={'flex-end'} alignItems={'flex-end'}>
              <Button
            size="large"
            variant="contained"
            className={classes.btnMargin}
          >
            Buy Ticket
          </Button>
          </Grid>
            </Grid>
            </Grid>
          </Grid>
          <hr />
        </div>
        </div>
            ))}
      </div>
    
       )
  }