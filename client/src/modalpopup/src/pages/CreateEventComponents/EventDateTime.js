import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "2rem",
  },
  textField: {
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
        <Button size="large" variant="contained" className={classes.btnMargin}>
          CANCEL
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.btnMargin}
        >
          CREATE EVENT
        </Button>
      </div>
    </div>
  );
}
