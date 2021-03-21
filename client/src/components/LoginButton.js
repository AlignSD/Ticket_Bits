import React from "react";
import { Button, makeStyles, Toolbar } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  iconButton: {
    marginLeft: 20,
    paddingBottom: 6,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  logIn:{
    color: "#000000",
    backgroundColor: "#ffffff",
    '&:hover': {
      backgroundColor: '#3d4c65',
      boxShadow: 'black',
    }
  }
}));

function LoginButton(){

  const { loginWithRedirect } = useAuth0();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar>
        <Button 
            color="inherit"
            onClick={() => loginWithRedirect()}
            variant="contained"
          >
            Login
        </Button>
      </Toolbar>
    </div>
  );
};

export default LoginButton;
