import React, { useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "2rem",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  // containerSm: {
  //   width: "60ch",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  // },
  paragraphText: {
    marginBottom: "2rem",
  },
  btnMargin: {
    margin: theme.spacing(1),
    color: "#ffffff",
    backgroundColor: "#000000",
    '&:hover': {
      backgroundColor: '#3d4c65',
      boxShadow: 'black',
    }
  },
  contained:{
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    marginTop: 50,
    marginRight: "auto",
    marginBottom: 50,
    marginLeft: "auto",
    padding: 20,
    zIndex: 1
  }
}));

export default function LayoutTextFields() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const classes = useStyles();

  // mongo states
  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	useEffect(() => {
		axios
			.get("/api/users")
			.then((users) => setUsers(users))
			.catch((err) => console.log(err));

	}, []);

  // submit fields to mongodb
  function submitForm() {
		if (username === "") {
			alert("Please fill the username field");
			return;
		}
		if (email === "") {
			alert("Please fill the email field");
			return;
		}
		axios
			.post("/api/users", {
				username: username,
				email: email,
			})
			.then(function () {
				alert("Account created successfully");
				window.location.reload();
			})
			.catch(function () {
				alert("Could not creat account. Please try again");
			});
	}
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <Grid className={classes.contained}>
      {/* form section is what sends values to mongodb */}
      <form onSubmit={submitForm}>
				<input
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					placeholder="Enter your username"
				/>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					placeholder="Enter your email address"
				/>
				<input type="submit" />
			</form>
      <div className={classes.root}>
        <div >
          <form>
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
              <strong>Username:</strong> {user.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
              <strong>Email:</strong> {user.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
              <strong>First Name:</strong> XXXXXX
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
              <strong>Last Name:</strong> XXXXXX
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
              <strong>Street Address:</strong> XXXXXX
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
              <strong>City/Town:</strong> XXXXXX
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
              <strong>State:</strong> XXXXXX
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
              <strong>Zip Code:</strong> XXXXXX
            </Typography>
          </div>
          </form>
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
    </Grid>
    )
  );
}
