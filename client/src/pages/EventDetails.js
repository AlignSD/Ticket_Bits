import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import EventCard from "../components/eventCard"




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
    height: 715,
    padding: 20,
    zIndex: 1
  }
}));



export default function EventDetails() {
  const [events, setEvents] = useState([]);
  getEventInfo()
  console.log("test")
   function getEventInfo(){
     console.log("test test")
    axios
    .get("/api/events")
    .then( res =>{
      const events = res.data;
      console.log(events);
      setEvents(events)
    })
  
  } 
 

  
  return(

    <EventCard
    events={events}/>
  
  )
}
