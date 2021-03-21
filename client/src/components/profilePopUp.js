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
    color: "black",
    marginLeft: "10px",
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
    zIndex: 1,
  },
  logOut:{
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
  function authLoadProfile() {
    axios
          .post("/api/users", {
              username: user.nickname,
              email: user.email,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
          })
  }

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
    authLoadProfile()
  }, []);
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <Grid className={classes.contained}>
         
              <Grid item>
            <Typography
            
              variant="h5"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
            {userProfile.username}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.paragraphText}
            >
            {userProfile.email}
            </Typography>
            </Grid>
        
          <Grid >
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
    </Grid>
    <br></br>
    <Grid>
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
        
    </Grid>
    )
  );
}