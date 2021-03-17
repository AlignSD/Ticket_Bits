import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

export default function LayoutTextFields() {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <div className={classes.containerSm}>
        <div>
          <Typography gutterBottom variant="h4" component="h2">
            Basic Event Info
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            Name your event and tell the event-goers why they should come. Add
            details that highlight what makes it unique.
          </Typography>
          <TextField
            id="outlined-full-width"
            label="Event Name *"
            style={{ padding: 6 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-full-width"
            label="Organizer *"
            style={{ padding: 6 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="Event Type *"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="Category *"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="Ticket Amount *"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="Ticket Price (US dollars) *"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <hr />
        <div>
          <Typography gutterBottom variant="h4" component="h2">
            Event Location
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            Help people in the area discover your event and let attendees know
            where to show up.
          </Typography>
          <TextField
            id="outlined-full-width"
            label="Venue Name *"
            style={{ padding: 6 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-full-width"
            label="Address *"
            style={{ padding: 6 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-full-width"
            label="City *"
            style={{ padding: 6 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="State *"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="Zip Code *"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <hr />
        <div>
          <Typography gutterBottom variant="h4" component="h2">
            Date &amp; Time
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            Tell event-goers when your event starts and ends so they can make
            plans to attend.
          </Typography>
          <TextField
            id="outlined-margin-none"
            label="Event Starts *"
            placeholder="mm/dd/yyyy"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="Start Time *"
            placeholder="00:00"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="Event Ends *"
            placeholder="mm/dd/yyyy"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="End Time *"
            placeholder="00:00"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <hr />
        <div>
          <Typography gutterBottom variant="h4" component="h2">
            Event Description
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            Add more details to your event like your schedule, sponsors, or
            featured guests.
          </Typography>
          <TextField
            id="outlined-full-width"
            label="Summary *"
            style={{ padding: 6 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            multiline
          />
        </div>
        <hr />
        <Typography gutterBottom variant="h4" component="h2">
          Event Image
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.paragraphText}
        >
          Upload your event flyer or photo.
        </Typography>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <hr />
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.btnMargin}
        >
          CREATE EVENT
        </Button>
        <Button size="large" variant="contained" className={classes.btnMargin}>
          CANCEL
        </Button>
      </div>
    </div>
  );
}
