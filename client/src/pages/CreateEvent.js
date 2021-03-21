import React, {useContext, useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {TicketsContext} from '../utils/TicketsContext'
import Grid from '@material-ui/core/Grid';
import web3 from 'web3';
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
      marginTop: 50,
      marginRight: "auto",
      marginBottom: 150,
      marginLeft: "auto",
      padding: 20,
      width: "100%",
      zIndex: 1,
    },
}));

export default function LayoutTextFields(props) {
  
  let {account, tickets, loading, userType, paypalState, marketplaceState, setAccountName, setTickets, setLoading, setUserType, setPaypalState, setMarket, setOpenPopup, eventModel, setEventModel} = useContext(TicketsContext)
  const classes = useStyles();
  // console.log(eventModel.methods.createEvent("test", 1, 1, 1, 1,"test","test2"))
  // console.log(eventModel.methods.)
  const [modelName, setModelName] = useState("")
  const [modelStart, setModelStart] = useState(0)
  const [modelEnd, setModelEnd] = useState(0)
  const [modelAmount, setModelAmount] = useState(0)
  const [modelPrice, setModelPrice] = useState(0)
  const [modelSummary, setModelSummary] = useState("")
  const [modelVenue, setModelVenue] = useState("")

  const createEventModel = [modelName.name , modelStart.start , modelEnd.end , modelAmount.amount , modelPrice.price , modelSummary.summary, modelVenue.venue]
  // .then()eventModel.methods.createEvent(createModelsState), console.log(eventModel.methods), console.log(createModelsState)}
  // eventModel.methods.createEvent(createModelsState); console.log(createModelsState)}
   // mongo states
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
  

  function toTimestamp(date) {
    return new Date(date).valueOf();
  }

  useEffect(() => {
		axios
			.get("/api/events")
			.then((events) => setEvents(events))
      
			.catch((err) => console.log(err));
      console.log(events, "events log");

	}, []);

  function submitForm() { 
		
    console.log(events, "events")
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
				alert("Event created successfully");
				window.location.reload();
			})
			.catch(function () {
				alert("Could not create Event. Please try again");
			});

	}
  

  return (
<<<<<<< HEAD
    <div className={classes.root}>
      <div className={classes.containerSm}>
            Basic Event Info
      <form autoComplete="off" noValidate  onSubmit = {(event) => { event.preventDefault();
          // let name = modelName;
          // let start = modelStart;
          // let end = modelEnd;
          // let totalTickets = modelAmount;
          // let price = modelPrice;
          // // const priceStr = parseInt(price)
          // const summary = modelSummary;
          // let location = modelVenue;
          // console.log(name, start, end, totalTickets, price, summary,location,"look at price here")
          
          const eventCheck = eventModel.methods.createEvent(modelName, (modelStart).toString, (modelEnd).toString, modelAmount, modelPrice, modelSummary, modelVenue).send({ from: account })
          console.log(eventCheck, "event check")
        }
        }
=======
    <Grid >
    <div className={classes.contained}  style={{position: 'absolute',
    zIndex: 1}}>
      <div>
           
      <form  autoComplete="off" noValidate  onSubmit = { (event) => { event.preventDefault();
          const name = modelName;
          const start = modelStart;
          const end = modelEnd;
          const totalTickets = modelAmount;
          const price = modelPrice;
          const priceStr = parseInt(price)
          const summary = modelSummary;
          const location = modelVenue;
          // console.log(name, start, end, totalTickets, price, summary,location,"look at price here")
          
          // const eventCheck = eventModel.methods.createEvent(name, start, end, totalTickets, price, summary,location).send({ from: account })
          // .once("receipt", (receipt) => {
          //   console.log(eventCheck, "event check")
          //   setLoading({ loading: false });
          
  }}
>>>>>>> d789d502f30bac8d094d5f0db9934aa8ab582179
          >

        <div style={{backgroundColor: "transparent"}} >
          <Typography gutterBottom variant="h4" component="h2">
            Create Event
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.paragraphText}>
            Name your event and tell the event-goers why they should come. Add
            details that highlight what makes it unique.
          </Typography>
          <TextField name= "Event Name" className="outlined-margin-none" id="EventName" label="Event Name *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"
            onChange ={(e) => setEvents({...events, eventName: e.target.value})}
          />
           <TextField className="outlined-margin-none" id="eventStart" label="Event Starts *" placeholder="mm/dd/yyyy" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"
<<<<<<< HEAD
            onChange = {(e)=> setModelStart({start: (e.target.value)})}
          />
          <TextField className="outlined-margin-none" id="eventEnd" label="Event Ends *" placeholder="mm/dd/yyyy" style={{ padding: 6 }} margin="normal" InputLabelProps={{  shrink: true, }} variant="outlined"
            onChange = {(e)=> setModelEnd({end: (e.target.value)})}
          />
           <TextField className="outlined-margin-none" id="totalTickets" label="Ticket Amount *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"
            onChange = {(e)=> setModelAmount({amount: (e.target.value)})}
          />
          <TextField className="outlined-margin-none" id="price" label="Ticket Price (US dollars) *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"
            onChange = {(e)=> setModelPrice({price: (e.target.value)})}
=======
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
>>>>>>> d789d502f30bac8d094d5f0db9934aa8ab582179
          />
          <TextField className="outlined-margin-none" id="outlined-full-width" label="Summary *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} multiline variant="outlined"
            onChange = {(e) => setEvents({...events,summary: e.target.value})}
          />
          <TextField className="outlined-margin-none" id="outlined-full-width" label="Venue Name *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" 
            onChange = {(e) => setEvents({...events,organizer: e.target.value})}
          />
                    <Button onClick= {submitForm}size="large" variant="contained" color="primary" className={classes.btnMargin} type="sumbit">
          CREATE EVENT
        </Button>
        </div>
        </form>
        </div>
        </div>
        </Grid>
         
  );
}
