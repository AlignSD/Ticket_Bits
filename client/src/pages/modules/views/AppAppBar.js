import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import Button from '@material-ui/core/Button';
import { useAuth0 } from "@auth0/auth0-react";



const styles = (theme) => ({
  title: {
    fontSize: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: toolbarStyles(theme).root,
  
  // toolbar: {
  //   justifyContent: 'space-around',
  // },

  left: {
    flex: 0,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 3,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  center: {
    flex: 1.5,
    display: 'flex',
    justifyContent: 'flex-start',
    
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  LeftLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
    
    
  },

  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const { classes } = props;
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>

        <div className={classes.left}/>
          <Link 
            variant="h6"
            underline="none"
            className={clsx(classes.linkSecondary)}
            href="/TicketMarketPlace"
          >
          {"Marketplace"}
          </Link>

        <div className={classes.center} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={(classes.title)}
            href="/"
          >
            {'Ticket-Bits'}
          </Link>
          

            
          
          
          <div className={classes.right}>
            {/* <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              
            >
              
              {'Sign Out'}
            </Link> */}
            <Button variant="contained" color="primary">
      <a onClick={() => loginWithRedirect()}>Log In</a>
      </Button>
              <Button variant="contained" color="primary">
      <a onClick={() => logout({ returnTo: window.location.origin })}>Log Out</a>
      </Button>
              
            {/* <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              href="/SignUp"
            >
              {'Sign Up'}
            </Link> */}

            
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);