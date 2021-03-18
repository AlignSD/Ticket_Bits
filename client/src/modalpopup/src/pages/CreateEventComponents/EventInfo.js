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
        <Button size="large" variant="contained" className={classes.btnMargin}>
          CANCEL
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.btnMargin}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
}
