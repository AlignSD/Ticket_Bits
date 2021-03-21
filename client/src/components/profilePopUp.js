import React, { useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    padding: 20,
    zIndex: 1,
  },
  logOut:{
      margin: "5px",
    color: "#ffffff",
    backgroundColor: "#000000",
    '&:hover': {
      backgroundColor: '#3d4c65',
      boxShadow: 'black',
    },
}}));

export default function LayoutTextFields() {
    const { logout } = useAuth0();
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

  function userProfileInfo() {
    axios
			.get("/api/users")
			.then( res =>{
        const users = res.data;
        for (let i = 0; i < users.length; i++) {
          let newUser;
          if (users[i].email === user.email){
            console.log(users[i].email, user.email);
            newUser = users[i]
              setUserProfile(newUser)
          }
        }
      })
    }

	useEffect(() => {
    userProfileInfo()
  }, []);
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <Grid className={classes.contained}>
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
              <strong>Username:</strong> {userProfile.username}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
              <strong>Email:</strong> {userProfile.email}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
              <strong>First Name:</strong> {userProfile.firstName}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
              <strong>Last Name:</strong> {userProfile.lastName}
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
          <hr />
          <Grid>
          <Button
    className={classes.logOut}
    color="inherit"
    variant="contained"
    
      onClick={() =>
        logout({
          returnTo: window.location.origin,})}>
      Log Out
    </Button>
    <Button
    className={classes.logOut}
    color="inherit"
    variant="contained"
    
      onClick={() =>
       window.location = "/profile"}>
      Edit Info
    </Button>
    </Grid>
        
    </Grid>
    )
  );
}