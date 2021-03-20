import React, {useContext, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {TicketsContext} from '../utils/TicketsContext'
import Grid from '@material-ui/core/Grid';
import web3 from 'web3'

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
  contained:{
    backgroundColor: "#ffffff",
    marginTop: 50,
    zIndex: 1
  },
  form: {
    padding: 25,

  }
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
  function toTimestamp(date) {
    return new Date(date).valueOf();
  }

  return (
    <Grid className={classes.contained}>
    <div className={classes.root}  style={{position: 'absolute',
    zIndex: 1}}>
      <div className={classes.form}>
           
      <form autoComplete="off" noValidate  onSubmit = {(event) => { event.preventDefault();
          const name = modelName;
          const start = modelStart;
          const end = modelEnd;
          const totalTickets = modelAmount;
          const price = modelPrice;
          const priceStr = parseInt(price)
          const summary = modelSummary;
          const location = modelVenue;
          console.log(name, start, end, totalTickets, price, summary,location,"look at price here")
          
          const eventCheck = eventModel.methods.createEvent(name, start, end, totalTickets, price, summary,location).send({ from: account })
          .once("receipt", (receipt) => {
            console.log(eventCheck, "event check")
            setLoading({ loading: false });
          })}}
          >

        <div style={{backgroundColor: "transparent"}}>
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
            onChange = {(e)=> setModelName({name: e.target.value})}
          />
           <TextField className="outlined-margin-none" id="eventStart" label="Event Starts *" placeholder="mm/dd/yyyy" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"
            onChange = {(e)=> setModelStart({start: parseInt(e.target.value, 0)})}
          />
          <TextField className="outlined-margin-none" id="eventEnd" label="Event Ends *" placeholder="mm/dd/yyyy" style={{ padding: 6 }} margin="normal" InputLabelProps={{  shrink: true, }} variant="outlined"
            onChange = {(e)=> setModelEnd({end: parseInt(e.target.value, 0)})}
          />
           <TextField className="outlined-margin-none" id="totalTickets" label="Ticket Amount *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"
            onChange = {(e)=> setModelAmount({amount: parseInt(e.target.value, 0)})}
          />
          <TextField className="outlined-margin-none" id="price" label="Ticket Price (US dollars) *" style={{ padding: 6 }} margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined"
            onChange = {(e)=> setModelPrice({price: parseInt(e.target.value, 0)})}
          />
          <TextField className="outlined-margin-none" id="outlined-full-width" label="Summary *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} multiline variant="outlined"
            onChange = {(e)=> setModelSummary({summary: e.target.value})}
          />
          <TextField className="outlined-margin-none" id="outlined-full-width" label="Venue Name *" style={{ padding: 6 }} fullWidth margin="normal" InputLabelProps={{ shrink: true, }} variant="outlined" 
            onChange = {(e)=> setModelVenue({venue: e.target.value})} 
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
    </Grid>
  );
}
