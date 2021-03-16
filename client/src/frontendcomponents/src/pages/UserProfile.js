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
            Your Profile
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            Username: XXXXXX
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            Email: XXXXXX
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            First Name: XXXXXX
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            Last Name: XXXXXX
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            Street Address: XXXXXX
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            City/Town: XXXXXX
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            State: XXXXXX
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            Zip Code: XXXXXX
          </Typography>
        </div>
        <hr />
        <div>
          <Typography gutterBottom variant="h4" component="h2">
            Edit Profile
          </Typography>
          <TextField
            id="outlined-margin-none"
            label="First Name"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="Last Name"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="Email"
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
            Edit Address
          </Typography>
          <TextField
            id="outlined-margin-none"
            label="Street Address"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="City/Town"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="State"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-margin-none"
            label="Zip Code"
            style={{ padding: 6 }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <hr />
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.btnMargin}
        >
          UPDATE PROFILE
        </Button>
      </div>
    </div>
  );
}
