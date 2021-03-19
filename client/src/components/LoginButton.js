import React from "react";
import { Button, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
}));

const LoginButton = () => {

  const { loginWithRedirect } = useAuth0();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      
        <Toolbar>
          
          <Button 
            color="inherit"
            onClick={() => loginWithRedirect()}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          
          <IconButton edge="start" className={classes.iconButton}>
            <a href="/" style={{ color: `white` }}>
              <AccountCircleIcon fontSize="medium" />
              <span style={{ fontSize: 14 }}>darthvader</span>
            </a>
          </IconButton>

          <IconButton edge="start" className={classes.iconButton}>
            <a href="/" style={{ color: `white` }}>
              <ShoppingCartIcon fontSize="medium" />
              <span style={{ fontSize: 14 }}>CHECKOUT</span>
            </a>
          </IconButton>

        </Toolbar>
      
    </div>
  );
};

export default LoginButton;
