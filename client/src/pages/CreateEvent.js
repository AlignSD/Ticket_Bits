import React, {useContext, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {TicketsContext} from '../utils/TicketsContext'
import web3 from 'web3'
import eventFactoryArtifact from "../abis/EventFactory.json"
import eventArtifact from "../abis/Event.json"


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
    margin: theme.spacing(1),
  },
}));

export default function LayoutTextFields(props) {
  
  
  let {account, tickets, loading, userType, paypalState, marketplaceState, eventFactoryState, setAccountName, setTickets, setLoading, setUserType, setPaypalState, setMarket, setOpenPopup, setEventFactory} = useContext(TicketsContext)

  const classes = useStyles();
  const [inputName, setInputName] = useState("")
  const [inputStart, setInputStart] = useState("")
  const [inputEnd, setInputEnd] = useState("")
  const [inputSupply, setInputSupply] = useState(0)
  const [inputTicketPrice, setInputTicketPrice] = useState(0)
  const [inputDescription, setInputDescription] = useState("")
  const [inputLocation, setInputLocation] = useState("")
  const [eventList, setEventList] = useState([])

  // let id = "";
  let event;

  let eventModel = {
    id: 0,
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    ticketPrice: 0,
    availableTickets: 0,
    eventTicketId: []
  }


  async function getEventID () {
    event = await eventFactoryState.;
    console.log(event)
  }

  async function createEvent () {
    if (eventFactoryState) {
      console.log(eventFactoryState, "eventFactoryState")

      console.log(eventFactoryState.methods
    .createEvent(inputName, inputStart, inputEnd, inputSupply, inputTicketPrice, inputDescription, inputLocation), "createEvent func")

     const eventsList = await eventFactoryState.methods.createEvent(
       inputName, 
       inputStart, 
       inputEnd, 
       inputSupply, 
       web3.utils.toWei(inputTicketPrice, "ether"), 
       inputDescription, 
       inputLocation)
       .send({ from: account }
        );

        return eventsList
      
    }
  }

  async function getEventList() {
    const eventCount = await eventFactoryState.methods.deployedEvents()
    let eventArr = [];
    for (var i = 1; i <= eventCount; i++){
    let events = await eventFactoryState.methods.deployedEvents(i).call();
    eventArr.push(events)
    }
    setEventList(eventArr)
  }


  return (
    <div className={classes.root}>
      <div className={classes.containerSm}>
      {/* {console.log(eventList)} */}
            Basic Event Info
      <form autoComplete="off" noValidate  onSubmit = {(event) => { event.preventDefault();
      console.log(inputName);
      console.log(inputStart);
      console.log(inputEnd);
      console.log(inputSupply);
      console.log(inputTicketPrice);
      console.log(inputDescription);
      console.log(inputLocation);
        createEvent();
        getEventList();  
          // const eventCheck = eventModel.methods.createEvent(name, start, end, totalTickets, price, summary,location).send({ from: account })
          // .once("receipt", (receipt) => {
          //   console.log(eventCheck, "event check")
          //   setLoading({ loading: false });
          // })
        }
        }
          >

        <div>
          <Typography gutterBottom variant="h4" component="h2">
            Basic Event Info
          </Typography>
          <Button size="large" variant="contained" color="primary" className={classes.btnMargin} type="sumbit">
          CREATE EVENT
        </Button>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.paragraphText}>
            Name your event and tell the event-goers why they should come. Add
            details that highlight what makes it unique.
          </Typography>
          <TextField name= "Event Name" className="outlined-margin-none" id="EventName" label="Event Name *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" 
            onChange = {(e)=> setInputName(e.target.value)}
          />
           <TextField className="outlined-margin-none" id="eventStart" label="Event Starts *" placeholder="mm/dd/yyyy" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" 
            onChange = {(e)=> setInputStart(e.target.value)}
          />
          <TextField className="outlined-margin-none" id="eventEnd" label="Event Ends *" placeholder="mm/dd/yyyy" style={{ padding: 6 }} margin="normal" InputLabelProps={{  shrink: true, }} variant="outlined" 
            onChange = {(e)=> setInputEnd(e.target.value)}
          />
           <TextField className="outlined-margin-none" id="totalTickets" label="Ticket Amount *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" 
            onChange = {(e)=> setInputSupply(e.target.value)}
          />
          <TextField className="outlined-margin-none" id="price" label="Ticket Price (US dollars) *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" 
            onChange = {(e)=> setInputTicketPrice(e.target.value)}
          />
          <TextField className="outlined-margin-none" id="outlined-full-width" label="Summary *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} multiline variant="outlined" 
            onChange = {(e)=> setInputDescription(e.target.value)}
          />
          <TextField className="outlined-margin-none" id="outlined-full-width" label="Venue Name *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"  
            onChange = {(e)=> setInputLocation(e.target.value)} 
          />
          <TextField id="outlined-full-width" label="Organizer *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"/>
          <TextField id="outlined-margin-none" label="Event Type *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" />
          <TextField id="outlined-margin-none" label="Category *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" />
          <TextField id="outlined-margin-none" label="Ticket Amount *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"/>
          <TextField id="outlined-margin-none" label="Ticket Price (US dollars) *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"/>
        </div>
        <hr />
        <div>
          <Typography gutterBottom variant="h4" component="h2">
            Event Location
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.paragraphText}>
            Help people in the area discover your event and let attendees know
            where to show up.
          </Typography>
          <TextField id="outlined-full-width" label="Venue Name *" style={{ padding: 6 }}  fullWidth margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" />
          <TextField id="outlined-full-width" label="Address *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"/>
          <TextField id="outlined-full-width" label="City *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"/>
          <TextField id="outlined-margin-none" label="State *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"/>
          <TextField id="outlined-margin-none" label="Zip Code *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"/>
        </div>
        <hr />
        <div>
          <Typography gutterBottom variant="h4" component="h2">
            Date &amp; Time
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.paragraphText}>
            Tell event-goers when your event starts and ends so they can make
            plans to attend.
          </Typography>
          <TextField id="outlined-margin-none" label="Event Starts *" placeholder="mm/dd/yyyy" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" />
          <TextField id="outlined-margin-none" label="Start Time *" placeholder="00:00" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"/>
          <TextField id="outlined-margin-none" label="Event Ends *" placeholder="mm/dd/yyyy" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" />
          <TextField id="outlined-margin-none" label="End Time *" placeholder="00:00" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" />
        </div>
        <hr />
        <div>
          <Typography gutterBottom variant="h4" component="h2">
            Event Description
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.paragraphText}>
            Add more details to your event like your schedule, sponsors, or
            featured guests.
          </Typography>
          <TextField id="outlined-full-width" label="Summary *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" multiline/>
        </div>
        <hr />
          <Typography gutterBottom variant="h4" component="h2">
            Event Image
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.paragraphText}
          >
            Upload your event flyer or photo.
          </Typography>
          <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file"
          />
          <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <hr />
         <Button size="large" variant="contained" className={classes.btnMargin}>
          CANCEL
        </Button>
        </form>
      </div>
    </div>
  );
}
