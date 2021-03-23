import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    marginRight: "auto",
    marginBottom: 50,
    marginLeft: "auto",
    height: 715,
    padding: 20,
    zIndex: 1
  }
}));

export default function EventDetails(props) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEventInfo()
	}, []);

  function getEventInfo(){
    axios
    .get("/api/events")
    .then( res =>{
      const events = res.data;
      setEvents(events)
    })
  } 
 
  const classes = useStyles();
  
  return(
    <EventCard
    tickets={props.tickets} purchaseTicket={props.purchaseTicket}
      className={classes.contained}
      events={events}/>
  )
}
