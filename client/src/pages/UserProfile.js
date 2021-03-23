import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
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
    "&:hover": {
      backgroundColor: "#3d4c65",
      boxShadow: "black",
    },
  },
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

export default function LayoutTextFields() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const classes = useStyles();

  // mongo states
  const [userProfile, setUserProfile] = useState({
    users: null,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  })

  console.log(userProfile.username);
  console.log(userProfile.users);
  // const [users, setUsers] = useState(null);
  // const [username, setUsername] = useState("");
	// const [email, setEmail] = useState("");
  // const [firstName, setFirstName ] = useState("");
	// const [lastName, setLastName] = useState("");
	useEffect(() => {
    console.log("sdhjkgsdhjkgsdfhjkgsdhjkfghjkdfg")
    axios
			.get("/api/users")
			.then((users) => setUserProfile(...userProfile, users))
			.catch((err) => console.log(err));
      authLoadProfile()
	}, []);

  function authLoadProfile() {
    console.log(user);
      if(user.email === null){
      axios
			.post("/api/users", {
				username: user.nickname,
				email: user.email,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
			})
    } else {
      return;
    }
  }
  // submit fields to mongodb
  function submitForm() {
		axios
			.put("/api/users/:id", {
				username: userProfile.username,
				email: user.email,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
			})
    }
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <Grid className={classes.contained}>
          <form>
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
              onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
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
              onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
            />
            <TextField
              id="outlined-margin-none"
              label="Username"
              style={{ padding: 6 }}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => setUserProfile({...userProfile, username: e.target.value})}
            />
          </div>
          </form>
          <hr />
          <hr />
          <Button onClick= {submitForm}size="large" variant="contained" color="primary" className={classes.btnMargin} type="sumbit">
            UPDATE PROFILE
          </Button>
      </Grid>
    )
  );
}
