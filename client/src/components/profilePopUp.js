import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  paragraphText: {
    color: "black",
  },
  btnMargin: {
    margin: theme.spacing(1),
    color: "#FFFFFF",
    backgroundColor: "#000000",
    "&:hover": {
      backgroundColor: "#3d4c65",
      boxShadow: "black",
    },
  },
  contained: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    zIndex: 1,
    borderColor: "#000000",
    padding: 10,
  },
  logOut: {
    width: "100%",
    marginTop: 15,
    color: "#FFFFFF",
    backgroundColor: "#000000",
    "&:hover": {
      backgroundColor: "#3d4c65",
      boxShadow: "black",
    },
  },
}));

export default function LayoutTextFields() {
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(" aeraeraraer");
  const classes = useStyles();

  // mongo states
  const [userProfile, setUserProfile] = useState({
    users: null,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  function authLoadProfile() {
    console.log(user.email);
    setUserProfile({
      ...userProfile,
      username: user.nickname,
      email: user.email,
    });
    // if(userProfile.email === ''){
    //   setUserProfile({...userProfile,
    //     username: user.nickname,
    //     email: user.email

    //   })
    axios.post("/api/users", {
      username: userProfile.username,
      email: userProfile.email,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
    });
    // } else {
    //   return;
    // }
  }

  function userProfileInfo() {
    axios.get("/api/users").then((res) => {
      const users = res.data;
      for (let i = 0; i < users.length; i++) {
        let newUser;
        if (users[i].email === user.email) {
          console.log(users[i].email, user.email);
          newUser = users[i];
          setUserProfile(newUser);
        }
      }
    });
  }

  useEffect(() => {
    userProfileInfo();
    authLoadProfile();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <Grid className={classes.contained}>
        <Grid item>
          <Typography
            variant="h6"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            Hello, {userProfile.username}!
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className={classes.paragraphText}
          >
            <em>{userProfile.email}</em>
          </Typography>
        </Grid>

        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="normal"
        >
          <Grid item>
            <Button
              className={classes.logOut}
              color="inherit"
              variant="contained"
              onClick={() =>
                logout({
                  returnTo: window.location.origin,
                })
              }
            >
              Log Out
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.logOut}
              color="inherit"
              variant="contained"
              onClick={() => (window.location = "/profile")}
            >
              View Profile
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  );
}