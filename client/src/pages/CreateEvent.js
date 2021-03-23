import React, { useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
   root: {
    backgroundColor: "white",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "2rem",
  },
  textField: {
    backgroundColor: "white",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  containerSm: {
    width: "60ch",
    marginLeft: "auto",
    marginRight: "auto",
  },
  paragraphText: {
    marginBottom: "3vh",
  },
  btnMargin: {
    marginBottom: 20,
    marginTop: 20,
    color: "#ffffff",
    backgroundColor: "#000000",
    '&:hover': {
      backgroundColor: '#3d4c65',
      boxShadow: 'black',
    }},
    contained: {
      backgroundColor: "#FFFFFF",
      borderRadius: 6,
      marginTop: "2%",
      marginRight: "auto",
      marginBottom: "15%",
      marginLeft: "auto",
      paddingTop: "20px",
      paddingRight: "20px",
      paddingLeft: "20px",
      width: "100%",
      zIndex: 1,
      position: 'absolute'
    }
   
}));

export default function LayoutTextFields(props) {
  const classes = useStyles();
  
   const [events, setEvents] = useState({
    eventName: "",
    eventStarts: 0,
    eventEnds: 0,
    ticketAmount: 0,
    ticketPrice: 0,
    summary: "",
    venueName: "",
    organizer: "",
    eventType: "",
    category: ""
   });

  useEffect(() => {
		axios
			.get("/api/events")
			.then((events) => setEvents(events))
      
			.catch((err) => console.log(err));
      console.log(events, "events log");

	}, []);

  function submitForm() {
    const ticketPrice = events.ticketPrice
    const name = events.eventName;
    const price = window.web3.utils.toWei(
      ticketPrice,
      "Ether");
    const total = events.ticketAmount;
    const startDate = events.eventStarts;
    const location = events.venueName;
    const description = events.summary;
		axios
			.post("/api/events", {
				eventName: events.eventName,
        eventStarts: events.eventStarts,
        eventEnds: events.eventEnds,
        ticketAmount: events.ticketAmount, 
        ticketPrice: events.ticketPrice, 
        summary: events.summary,
        venueName: events.venueName,
        organizer: events.organizer,
        eventType: events.eventType,
        category: events.category
			})
			.then(function () {
        props.createTicket( name, price, startDate, location, description)
      }
			)}

  return (
    <Grid className={classes.contained}  >
      <div>
      <form  autoComplete="off" noValidate  onSubmit = { (event) => { event.preventDefault();
    }}
          >
        <div style={{backgroundColor: "transparent"}} >
          <Typography gutterBottom variant="h4" component="h2">
            Create Event
          </Typography>
          <TextField name= "Event Name" className="outlined-margin-none" id="EventName" label="Event Name *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"
            onChange ={(e) => setEvents({...events, eventName: e.target.value})}
          />
           <TextField className="outlined-margin-none" id="eventStart" label="Event Starts *" placeholder="mm/dd/yyyy" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"
            onChange = {(e) => setEvents({...events,eventStarts: e.target.value})}
          />
          <TextField className="outlined-margin-none" id="eventEnd" label="Event Ends *" placeholder="mm/dd/yyyy" style={{ padding: 6 }} margin="normal" InputLabelProps={{  shrink: true, }} variant="outlined"
            onChange = {(e) => setEvents({...events,eventEnds: e.target.value})}
          />
           <TextField className="outlined-margin-none" id="totalTickets" label="Ticket Amount *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"
            onChange = {(e) => setEvents({...events,ticketAmount: e.target.value})}
          />
          <TextField className="outlined-margin-none" id="price" label="Ticket Price (US dollars) *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"
            onChange = {(e) => setEvents({...events,ticketPrice: e.target.value})}
          />
          <TextField className="outlined-margin-none" id="outlined-full-width" label="Summary *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} multiline variant="outlined"
            onChange = {(e) => setEvents({...events,summary: e.target.value})}
          />
          <TextField className="outlined-margin-none" id="outlined-full-width" label="Venue Name *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" 
            onChange = {(e) => setEvents({...events,venueName: e.target.value})}
          />
                    <Button onClick={submitForm} size="large" variant="contained" color="primary" className={classes.btnMargin} type="sumbit">
          CREATE EVENT
        </Button>
        </div>
        </form>
        </div>
        </Grid>
         
  );
}
